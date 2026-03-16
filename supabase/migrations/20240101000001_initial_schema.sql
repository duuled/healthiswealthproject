-- Health Is Wealth Store - Initial Supabase Schema
-- Run this migration in the Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────
-- PROFILES (linked to auth.users)
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email        TEXT UNIQUE NOT NULL,
  full_name    TEXT,
  avatar_url   TEXT,
  phone        TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city         TEXT,
  state        TEXT,
  zip_code     TEXT,
  country      TEXT DEFAULT 'US',
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─────────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  subscribed_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_active      BOOLEAN DEFAULT TRUE NOT NULL,
  source         TEXT DEFAULT 'website' NOT NULL  -- 'website' | 'mobile' | 'popup'
);

-- ─────────────────────────────────────────────────
-- WISHLIST ITEMS
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  shopify_product_id   TEXT NOT NULL,
  shopify_handle       TEXT NOT NULL,
  product_title        TEXT NOT NULL,
  product_image        TEXT,
  product_price        TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, shopify_product_id)
);

-- ─────────────────────────────────────────────────
-- ORDERS (synced from Shopify webhooks or client)
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  shopify_order_id      TEXT UNIQUE NOT NULL,
  shopify_order_number  INTEGER,
  status                TEXT DEFAULT 'pending' NOT NULL, -- pending|confirmed|shipped|delivered|cancelled
  total_price           DECIMAL(10,2),
  currency              TEXT DEFAULT 'USD',
  line_items            JSONB,
  shipping_address      JSONB,
  created_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─────────────────────────────────────────────────
-- PRODUCT REVIEWS
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  shopify_product_id    TEXT NOT NULL,
  shopify_handle        TEXT NOT NULL,
  rating                INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title                 TEXT,
  body                  TEXT,
  is_verified_purchase  BOOLEAN DEFAULT FALSE NOT NULL,
  is_approved           BOOLEAN DEFAULT FALSE NOT NULL,
  created_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─────────────────────────────────────────────────
-- CONTACT MESSAGES
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT,
  message     TEXT NOT NULL,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_read     BOOLEAN DEFAULT FALSE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─────────────────────────────────────────────────
-- AUTO-CREATE PROFILE ON SIGNUP
-- ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────────
-- AUTO-UPDATE updated_at TIMESTAMPS
-- ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
