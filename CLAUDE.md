# CLAUDE.md — Health Is Wealth Store

Comprehensive guide for AI assistants working on this codebase.

---

## Project Overview

**Health Is Wealth Store** is a React e-commerce web application selling health supplements and promoting a wellness lifestyle. It integrates Shopify as the product/commerce backend and Supabase for auth/data services.

- **Framework**: React 18 + Vite 5 (SWC compiler)
- **Language**: TypeScript (relaxed strictness — see below)
- **Styling**: Tailwind CSS 3 + shadcn/ui component library
- **State**: Zustand (cart), TanStack React Query (server state)
- **Commerce**: Shopify Storefront API (GraphQL)
- **Backend**: Supabase (auth, database)
- **Routing**: React Router DOM v6
- **Package Manager**: npm (also has bun.lockb — prefer npm)

---

## Repository Structure

```
healthiswealthstore/
├── src/
│   ├── assets/            # Static images and videos (hero, products, smoothies)
│   ├── components/
│   │   ├── ui/            # 55 shadcn/ui primitives (auto-generated, avoid editing directly)
│   │   ├── Header.tsx     # Fixed nav with scroll-aware transparency + cart
│   │   ├── ProductCard.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Navigation.tsx
│   │   ├── AdBanner.tsx
│   │   ├── CookieConsent.tsx
│   │   └── StarBackground.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx # Mobile breakpoint hook (768px)
│   │   └── use-toast.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts  # Supabase client (reads env vars)
│   │       └── types.ts   # Auto-generated DB types
│   ├── lib/
│   │   ├── shopify.ts     # Shopify Storefront API client + GraphQL queries
│   │   └── utils.ts       # cn() helper (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Home.tsx       # Landing page (~48KB) — hero, videos, product showcase
│   │   ├── Supplements.tsx # Product catalog (~44KB)
│   │   ├── Shop.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Mission.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   ├── Disclaimer.tsx
│   │   └── NotFound.tsx
│   ├── stores/
│   │   └── cartStore.ts   # Zustand cart with localStorage persistence
│   ├── App.tsx            # Root: providers + BrowserRouter + routes
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles + Tailwind directives
├── public/                # Static public assets
├── supabase/
│   └── config.toml        # Supabase project config
├── index.html             # Entry HTML — SEO meta, Schema.org, AdSense, Meta Pixel
├── package.json
├── vite.config.ts         # Vite config: port 8080, path alias @/
├── tailwind.config.ts     # Custom theme: fonts, CSS vars, dark mode via class
├── tsconfig.json          # Path alias @/* → ./src/*
└── components.json        # shadcn/ui config
```

---

## Development Commands

```bash
# Start development server (localhost:8080)
npm run dev

# Production build
npm run build

# Development build (unminified)
npm run build:dev

# Preview production build locally
npm run preview

# Lint (ESLint)
npm run lint
```

> There is **no test framework** configured (no Jest, Vitest, etc.). Do not add test scripts without discussing with the team.

---

## Routing

Defined in `src/App.tsx` using React Router v6:

| Path | Component |
|------|-----------|
| `/` | `Home` |
| `/supplements` | `Supplements` |
| `/shop` | `Shop` |
| `/product/:handle` | `ProductDetail` |
| `/mission` | `Mission` |
| `/privacy-policy` | `PrivacyPolicy` |
| `/terms-of-service` | `TermsOfService` |
| `/disclaimer` | `Disclaimer` |
| `*` | `NotFound` |

---

## Key Integrations

### Shopify Storefront API (`src/lib/shopify.ts`)

- **Store**: `healthiswealthstore-p8wk2.myshopify.com`
- **API Version**: `2025-07`
- **Auth**: Storefront API token (hardcoded in the file — do not expose publicly)
- **Transport**: REST fetch with GraphQL body

Key functions:
- `getProducts()` — fetches full product catalog with variants, pricing, images
- `getProductByHandle(handle)` — single product lookup
- `createStorefrontCheckout(items)` — creates a Shopify checkout cart, returns URL

Errors surface via `sonner` toast notifications.

### Supabase (`src/integrations/supabase/client.ts`)

- Client initialized from environment variables
- Persistence: localStorage, auto-refresh tokens enabled
- DB types are auto-generated in `supabase/types.ts` — do not edit manually

### Cart State (`src/stores/cartStore.ts`)

Zustand store with `persist` middleware (localStorage key: `cart-store`):
- `items: CartItem[]`
- `checkoutUrl: string | null`
- `isLoading: boolean`
- `addItem(product, variantId, quantity)` — calls Shopify to create/update checkout
- `updateQuantity(variantId, quantity)`
- `removeItem(variantId)`
- `clearCart()`

---

## Environment Variables

These must be present for the app to function. They are read via Vite's `import.meta.env`:

```
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon key>
VITE_SUPABASE_PROJECT_ID=<project-id>
```

> The Shopify Storefront token and store URL are currently hardcoded in `src/lib/shopify.ts`. If moving them to env vars, use `VITE_SHOPIFY_STORE_DOMAIN` and `VITE_SHOPIFY_STOREFRONT_TOKEN`.

---

## Styling Conventions

- **Utility-first**: Use Tailwind classes directly in JSX. Avoid custom CSS unless necessary.
- **Class merging**: Always use the `cn()` helper from `src/lib/utils.ts` when conditionally combining classes.
- **Dark mode**: Configured via Tailwind's `class` strategy (add `dark` class to `<html>`).
- **Custom theme**: Colors are defined as CSS variables in `src/index.css` and referenced in `tailwind.config.ts`. Use semantic tokens (`bg-background`, `text-foreground`, etc.) over raw colors.
- **Fonts**: `font-sans` → Open Sans, `font-heading` → Roboto (configured in Tailwind theme).
- **Responsive**: Mobile-first. Use `sm:`, `md:`, `lg:` prefixes. Mobile breakpoint in `use-mobile.tsx` is 768px.

---

## Component Conventions

### shadcn/ui (`src/components/ui/`)

- These are generated components — add new ones via the shadcn CLI or copy from the shadcn registry.
- **Do not directly modify** shadcn primitives unless applying a project-wide style override.
- Config is in `components.json` (style: `default`, base color: `slate`, CSS variables: enabled).

### Custom Components

- Place in `src/components/` (not in `ui/`).
- Keep components focused and composable.
- Import path alias `@/` maps to `src/` — always use this over relative paths that traverse multiple directories.

---

## TypeScript Configuration

TypeScript is configured with **relaxed strictness** to prioritize development speed:

- `strict`: false
- `noImplicitAny`: false
- `strictNullChecks`: false
- `noUnusedLocals`: false
- `noUnusedParameters`: false

This means TypeScript errors are not blocking. However, write correct types when adding new code — avoid `any` unless necessary.

---

## SEO & Analytics (index.html)

The `index.html` contains critical SEO infrastructure — be careful when editing:

- Open Graph + Twitter Card meta tags
- Schema.org structured data (Recipe, LocalBusiness, Organization, WebSite)
- Google AdSense integration
- Meta Pixel (Facebook tracking)
- Pinterest meta tags
- Canonical URL and sitemap reference

> Do not remove or break existing meta tags. Add new structured data schemas as additional `<script type="application/ld+json">` blocks.

---

## State Management Patterns

- **Server state**: Use TanStack React Query (`useQuery`, `useMutation`) for Shopify API calls and Supabase queries.
- **Client/UI state**: Use React `useState` / `useReducer` for component-local state.
- **Global client state**: Use Zustand stores (currently only `cartStore`). Add new stores in `src/stores/`.
- **Forms**: React Hook Form + Zod for validation.

---

## Common Patterns

### Adding a new page

1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add nav link in `src/components/Header.tsx` and `src/components/Navigation.tsx` if needed

### Adding a new shadcn/ui component

```bash
npx shadcn@latest add <component-name>
```

This adds the component to `src/components/ui/`.

### Fetching Shopify products

```tsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";

const { data: products, isLoading } = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});
```

### Using the cart store

```tsx
import { useCartStore } from "@/stores/cartStore";

const { items, addItem, removeItem } = useCartStore();
```

---

## Assets

- Images and videos live in `src/assets/` and are imported directly in components.
- Product images are served from Shopify's CDN (URLs returned by the API).
- Hero videos are local `.mp4` files bundled with the app.

---

## Lovable Integration

This project was built with and is synced to [Lovable](https://lovable.dev). Changes pushed to the `master` branch sync back to Lovable. Keep this in mind when making structural changes — Lovable generates code using the `lovable-tagger` dev dependency (tags components with data attributes in development).

---

## Things to Avoid

- **Do not run `git push --force`** on `master`.
- **Do not edit `src/components/ui/`** files manually unless applying intentional global overrides.
- **Do not edit `src/integrations/supabase/types.ts`** manually — regenerate via Supabase CLI.
- **Do not add test frameworks** without discussion — the project has no testing setup.
- **Do not introduce `any` types** unless truly necessary for third-party interop.
- **Do not inline styles** (`style={{...}}`) when Tailwind classes can accomplish the same thing.
- **Do not commit `.env`** with real credentials to public branches.
