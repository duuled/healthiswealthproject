# Health Is Wealth — Mobile App

A full-featured React Native / Expo mobile app for the Health Is Wealth store, connected to Supabase and Shopify.

## Tech Stack

- **Expo** ~52 with Expo Router (file-based navigation)
- **React Native** 0.76
- **Supabase JS** for auth + database
- **Zustand** for cart state (persisted via AsyncStorage)
- **TanStack React Query** for server-state caching
- **Shopify Storefront API** for product catalog + checkout

## Features

| Feature | Details |
|---|---|
| Home | Hero, features, testimonials, newsletter signup |
| Shop | Full product catalog from Shopify with search |
| Supplements | Curated Power of 5 collection with category filter |
| Cart | Add/remove/update quantities, Shopify checkout via browser |
| Product Detail | Image carousel, variant selection, add to cart |
| Auth | Supabase sign in / sign up (modal screens) |
| Profile | Orders, wishlist, profile settings |

## App Structure

```
mobile/
├── app/
│   ├── _layout.tsx          Root layout (providers)
│   ├── (tabs)/
│   │   ├── _layout.tsx      Bottom tab navigator
│   │   ├── index.tsx        Home
│   │   ├── shop.tsx         Shop
│   │   ├── supplements.tsx  Supplements
│   │   ├── cart.tsx         Cart
│   │   └── profile.tsx      Profile / Auth
│   ├── product/
│   │   └── [handle].tsx     Product detail
│   └── auth/
│       ├── login.tsx        Sign in (modal)
│       └── register.tsx     Register (modal)
├── components/
│   └── ProductCard.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── supabase.ts          Supabase client
│   └── shopify.ts           Shopify Storefront API
├── stores/
│   └── cartStore.ts         Zustand cart (AsyncStorage)
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for development)

### Installation

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press:
- `i` — iOS simulator
- `a` — Android emulator
- `w` — Web browser

### Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build APK (Android)
eas build --platform android --profile preview

# Build IPA (iOS)
eas build --platform ios --profile preview
```

## Supabase Setup

The app connects to the same Supabase project as the web app.
Run the migrations in `supabase/migrations/` against your Supabase project before launching:

1. Go to https://supabase.com/dashboard/project/kagjweasrjvxxjptulvp/sql
2. Run `20240101000001_initial_schema.sql`
3. Run `20240101000002_rls_policies.sql`

## Shopify

Products are fetched from the Shopify Storefront API.
Checkout opens the Shopify checkout URL in the device browser.
