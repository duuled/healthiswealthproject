# Taste Table LA

**Your plug for the real LA food scene. No tourists allowed.**

Live: [tastetablela.vercel.app](https://tastetablela.vercel.app)

---

## What This Is

Taste Table LA is a hyper-local food discovery site for LA locals. No Yelp lists. No Eater roundups. No tourist traps. Just spots the neighborhoods actually eat at — organized by community, cuisine, and price.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Font | Space Grotesk (Google Fonts) |
| Hosting | Vercel |

---

## Project Structure

```
app/
  page.tsx                  # Homepage — hero, hidden gems, email capture
  layout.tsx                # Root layout — nav, footer, fonts
  globals.css               # Tailwind base + dark theme CSS vars
  spots/
    page.tsx                # Full spots directory with filters
  neighborhood/
    page.tsx                # Neighborhood index grid
    [neighborhood]/
      page.tsx              # Individual neighborhood guide
  submit/
    page.tsx                # Community spot submission form
  api/
    submit-spot/
      route.ts              # POST endpoint for spot submissions

src/
  components/
    Nav.tsx                 # Sticky nav with mobile hamburger
    Footer.tsx              # Footer with neighborhood links
    SpotCard.tsx            # Reusable spot card component
  data/
    spots.ts                # Data layer — all spots + utility functions
```

---

## Deploy to Vercel

### One-click deploy

```bash
# 1. Clone or download this folder
# 2. Install dependencies
npm install

# 3. Copy env file
cp .env.example .env.local
# Fill in your values (newsletter API, Notion, etc.)

# 4. Run locally
npm run dev
# → http://localhost:3000

# 5. Deploy to Vercel
npx vercel --prod
```

### Vercel environment variables

Add these in your Vercel project dashboard under Settings → Environment Variables:

- `NEWSLETTER_API_KEY`
- `NEWSLETTER_LIST_ID`
- `NEWSLETTER_PROVIDER`
- `NOTION_API_KEY` (for spot submission logging)
- `NOTION_SUBMISSIONS_DB_ID`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_SITE_URL`

---

## How to Add Spots

All spots live in `src/data/spots.ts` in the `SPOTS` array. Each spot follows the `FoodSpot` interface.

**Adding a new spot:**

```typescript
{
  slug: 'my-spot-name',               // URL-safe, unique
  name: 'My Spot Name',
  neighborhood: 'Koreatown',          // Must be a valid Neighborhood type
  cuisine: 'Korean',                  // Must be a valid Cuisine type
  price: '$',                         // '$' | '$$' | '$$$'
  mustOrder: ['Dish 1', 'Dish 2'],    // 2-3 specific dishes
  localSecret: 'The insider tip...',  // One specific insider detail
  vibe: '1-sentence vibe description.',
  bestFor: ['late night', 'cash only'],
  address: '123 Main St, LA, CA 90000',
  hours: 'Mon-Sun 11AM-10PM',
  instagramHandle: 'myspot',          // Optional, no @ symbol
  isHidden: true,                     // true = Hidden Gem badge
  addedBy: 'Your name or handle',
  tags: ['tag1', 'tag2'],
  excerpt: 'SEO description, 155 chars max.',
  publishedAt: '2024-01-01',
}
```

**Style rules:**
- `mustOrder`: Specific dish names, not categories ("Birria tacos", not "the tacos")
- `localSecret`: One concrete insider tip with a real detail
- `vibe`: One sentence, sensory details, no "amazing" or "great vibes"
- `excerpt`: Under 155 characters for SEO previews

---

## Monetization

### PDF Map ($9 / free for subscribers)

The email capture on the homepage leads to `/api/subscribe`. When integrated:
1. User subscribes → added to your email list
2. Automation sends the PDF map (hosted on your email provider or a CDN)
3. PDF contains 50+ spots with addresses, must-orders, and price tiers

**To build the PDF map:**
1. Add your 50+ spots to `spots.ts`
2. Use a PDF generation tool (Canva, Figma export, or `@react-pdf/renderer`)
3. Host the PDF on Vercel Blob, S3, or your email provider
4. Wire up the `/api/subscribe` endpoint to your email tool

### Google AdSense

1. Apply for AdSense once you hit ~5K monthly sessions
2. Add the AdSense script to `app/layout.tsx`
3. Food traffic typically earns $12-25 RPM — scale sessions via Pinterest and TikTok

### OpenTable / Resy Affiliate

1. Sign up for the OpenTable affiliate program
2. Add booking links to individual spot pages (`/spots/[slug]`)
3. Earn per reservation booked through your links

---

## Adding Pages

### New neighborhood guide
Neighborhoods are auto-generated via the dynamic route at `app/neighborhood/[neighborhood]/page.tsx`. Add spots with a new `neighborhood` value to `spots.ts` and add the neighborhood to the `NEIGHBORHOODS` array.

### New spot detail page
Create `app/spots/[slug]/page.tsx` with `generateStaticParams()` pulling from `getAllSpots()`. Use `getSpotBySlug(slug)` to fetch data.

---

## Brand Voice Quick Reference

- **Do:** Name specific streets, specific dishes, specific prices
- **Do:** Center the culture behind the food (immigrant-owned, community-rooted)
- **Do:** Call out tourist traps by name
- **Don't:** Write vague praise ("amazing ambiance", "great vibes")
- **Don't:** Write from a tourist perspective
- **Don't:** List a spot without a specific dish and price

Full brand guide: `.agents/skills/brand-tastetablela/SKILL.md`
