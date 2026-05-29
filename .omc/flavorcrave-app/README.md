# The Flavor Crave

Authentic soul food, Caribbean, and West African recipes — built on Next.js 14 App Router.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Language:** TypeScript 5 (strict mode, zero `any` types)
- **Fonts:** Inter (body) + Playfair Display (headings) via Google Fonts
- **Deployment:** Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Create your local env file
cp .env.example .env.local
# Edit .env.local with your real values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Set environment variables in the Vercel dashboard:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_ADSENSE_ID` | [Google AdSense](https://www.google.com/adsense/) → Account → Publisher ID |
| `KLAVIYO_API_KEY` | [Klaviyo](https://www.klaviyo.com/) → Account → API Keys |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://theflavorcrave.com` |

4. Deploy. Vercel auto-deploys on every push to `main`.

---

## Adding Amazon Affiliate Links

The recipe data layer uses ASIN placeholder strings to mark every ingredient that could carry an affiliate link. Search for `[ASIN_` across the codebase to find all placeholders.

```
grep -r "\[ASIN_" src/data/
```

Each placeholder looks like `[ASIN_CAST_IRON]`. Replace with your real affiliate URL:

```ts
// Before
asinPlaceholder: '[ASIN_CAST_IRON]'

// After — add an affiliateUrl field to RecipeIngredient
affiliateUrl: 'https://www.amazon.com/dp/B00006JSUA?tag=flavorcrave-20'
```

Then update the recipe ingredient rendering component to wrap the ingredient name in an `<a>` tag when `affiliateUrl` is present.

**Disclosure:** Add `rel="nofollow sponsored"` to all affiliate links and include a visible affiliate disclosure on recipe pages (required by FTC guidelines).

---

## Adding Mediavine (Ad Network)

Mediavine requires **50,000 sessions/month** to apply.

When you hit that threshold:

1. Apply at [mediavine.com](https://www.mediavine.com/apply/).
2. Once approved, replace the Google AdSense `<Script>` tag in `app/layout.tsx` with the Mediavine script snippet they provide.
3. Remove the `NEXT_PUBLIC_ADSENSE_ID` env var and add the Mediavine site ID instead.
4. Mediavine handles ad placement automatically — no manual ad unit placement needed.

**RPM comparison:** AdSense typically earns $3–8 RPM for food content. Mediavine typically earns $15–35 RPM. The jump in revenue at 50K sessions is significant.

---

## Project Structure

```
flavorcrave-app/
├── app/
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts          # Email capture API endpoint
│   ├── free-recipes/
│   │   └── page.tsx              # Lead magnet / ebook landing page
│   ├── recipes/
│   │   └── page.tsx              # Recipe index with category filters
│   ├── globals.css               # Tailwind + custom CSS variables
│   ├── layout.tsx                # Root layout, nav, footer, AdSense
│   └── page.tsx                  # Homepage
├── src/
│   ├── data/
│   │   └── recipes.ts            # Recipe data, TypeScript interfaces, helper functions
│   ├── components/               # Shared components (empty — add as needed)
│   └── lib/                      # Utilities (empty — add as needed)
├── .env.example                  # Environment variable reference
├── next.config.js
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Adding New Recipes

All recipe data lives in `src/data/recipes.ts`. Add new entries to the `RECIPES` array following the `Recipe` interface. The full set of required fields is documented via TypeScript — the compiler will catch any missing fields.

```ts
// src/data/recipes.ts
export const RECIPES: Recipe[] = [
  // ... existing recipes ...
  {
    slug: 'your-new-recipe-slug',
    title: 'Your Recipe Title',
    // ... rest of fields
  },
];
```

---

## Adding New Route Pages

### Category pages

Create `app/category/[slug]/page.tsx` and use `getRecipesByCategory()` from `src/data/recipes.ts`.

### Individual recipe pages

Create `app/recipes/[slug]/page.tsx` and use `getRecipeBySlug(slug)` from `src/data/recipes.ts`. Generate static params with `generateStaticParams()` using `getAllRecipes()`.

---

## SEO Notes

- Every recipe has a `seoKeyword` field — use it as the `<title>` and primary H1.
- `excerpt` is capped at 155 chars — use it directly as the meta description.
- `headline` is the keyword-rich H1 — separate from the display `title`.
- Schema.org `Recipe` structured data should be added to individual recipe pages for rich results in Google Search.

---

## License

Private — all rights reserved.
