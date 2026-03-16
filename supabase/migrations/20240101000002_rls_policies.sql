-- Health Is Wealth Store - Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages     ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────────
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ─────────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────
CREATE POLICY "newsletter_insert_public" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "newsletter_select_own" ON public.newsletter_subscribers
  FOR SELECT USING (
    email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "newsletter_update_own" ON public.newsletter_subscribers
  FOR UPDATE USING (
    email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  );

-- ─────────────────────────────────────────────────
-- WISHLIST ITEMS
-- ─────────────────────────────────────────────────
CREATE POLICY "wishlist_select_own" ON public.wishlist_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "wishlist_insert_own" ON public.wishlist_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishlist_delete_own" ON public.wishlist_items
  FOR DELETE USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────
CREATE POLICY "orders_select_own" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "orders_insert_own" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────────
-- PRODUCT REVIEWS
-- ─────────────────────────────────────────────────
CREATE POLICY "reviews_select_approved" ON public.product_reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "reviews_select_own" ON public.product_reviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "reviews_insert_authed" ON public.product_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_update_own" ON public.product_reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────
-- CONTACT MESSAGES
-- ─────────────────────────────────────────────────
CREATE POLICY "contact_insert_public" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "contact_select_own" ON public.contact_messages
  FOR SELECT USING (
    email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  );
