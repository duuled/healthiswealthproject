import Link from 'next/link';
import SpotCard from '@/components/SpotCard';
import {
  getHiddenGems,
  getSpotsByNeighborhood,
  NEIGHBORHOODS,
} from '@/data/spots';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taste Table LA — The Real LA Food Scene',
  description:
    'Your plug for the real LA food scene. No Yelp. No tourists. Just spots your city actually eats at. Hidden gems, neighborhood guides, and honest reviews across Koreatown, Boyle Heights, Leimert Park, and beyond.',
};

const CUISINES = [
  'Mexican',
  'Korean',
  'Soul Food',
  'Caribbean',
  'Salvadoran',
  'Nigerian',
  'BBQ',
  'Seafood',
];

const PREVIEW_NEIGHBORHOODS: Array<{ name: string; emoji: string }> = [
  { name: 'Koreatown', emoji: '🥩' },
  { name: 'Boyle Heights', emoji: '🌮' },
  { name: 'Leimert Park', emoji: '🍗' },
  { name: 'Inglewood', emoji: '🔥' },
  { name: 'East LA', emoji: '🦐' },
  { name: 'Compton', emoji: '🍔' },
  { name: 'Pico-Union', emoji: '🫓' },
  { name: 'Crenshaw', emoji: '🍖' },
  { name: 'Highland Park', emoji: '🍜' },
  { name: 'MacArthur Park', emoji: '🌽' },
  { name: 'Jefferson Park', emoji: '🥘' },
  { name: 'Watts', emoji: '🍳' },
];

export default function HomePage() {
  const hiddenGems = getHiddenGems(3);
  const ktownSpots = getSpotsByNeighborhood('Koreatown').slice(0, 1);
  const boyleSpots = getSpotsByNeighborhood('Boyle Heights').slice(0, 1);

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden noise-overlay min-h-[92vh] flex items-center">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
            style={{ background: '#FF4B2B' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 blur-[80px]"
            style={{ background: '#FF4B2B' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-4xl">
            <p className="section-label mb-6 animate-fade-up">
              Los Angeles Food Discovery
            </p>

            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8 animate-fade-up"
              style={{ animationDelay: '0.05s' }}
            >
              The real{' '}
              <span style={{ color: '#FF4B2B' }}>LA</span>
              <br />
              food scene.
            </h1>

            <p
              className="text-xl sm:text-2xl text-[#a3a3a3] max-w-xl leading-relaxed mb-10 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              No Yelp. No tourists. Just spots your city{' '}
              <em className="text-[#f5f5f5] not-italic font-semibold">
                actually
              </em>{' '}
              eats at.
            </p>

            {/* Search bar */}
            <form
              action="/spots"
              method="GET"
              className="flex flex-col sm:flex-row gap-3 max-w-xl animate-fade-up"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="relative flex-1">
                <select
                  name="neighborhood"
                  className="input-dark appearance-none pr-10 cursor-pointer w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Filter by neighborhood
                  </option>
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] pointer-events-none">
                  ▾
                </span>
              </div>
              <div className="relative flex-1">
                <select
                  name="cuisine"
                  className="input-dark appearance-none pr-10 cursor-pointer w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Filter by cuisine
                  </option>
                  {CUISINES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] pointer-events-none">
                  ▾
                </span>
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">
                Find Spots →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Neighborhood Strip ────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-[#0d0d0d] py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4 text-center">Browse by Neighborhood</p>
        </div>
        <div className="scroll-container px-4 sm:px-8 lg:px-12">
          {PREVIEW_NEIGHBORHOODS.map(({ name, emoji }) => (
            <Link
              key={name}
              href={`/neighborhood/${name.toLowerCase().replace(/\s+/g, '-')}`}
              className="neighborhood-pill shrink-0"
            >
              <span className="mr-1.5">{emoji}</span>
              {name}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Hidden Gems ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-3">Hidden Gems</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Spots your city knows.
              <br />
              <span className="text-[#a3a3a3]">Tourist lists don&apos;t.</span>
            </h2>
          </div>
          <Link
            href="/spots?filter=hidden"
            className="hidden sm:inline-flex text-sm font-semibold text-[#FF4B2B] hover:text-[#e63c20] transition-colors"
          >
            See all hidden gems →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hiddenGems.map((spot) => (
            <SpotCard key={spot.slug} spot={spot} />
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link href="/spots?filter=hidden" className="btn-secondary text-sm">
            See all hidden gems →
          </Link>
        </div>
      </section>

      <div className="divider-glow mx-auto max-w-7xl" />

      {/* ─── By Neighborhood Preview ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <p className="section-label mb-3">By Neighborhood</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Know your block.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Koreatown preview */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#FF4B2B] uppercase tracking-wider mb-1">
                  Koreatown
                </p>
                <h3 className="text-xl font-bold text-[#f5f5f5]">
                  K-town eats different.
                </h3>
              </div>
              <Link
                href="/neighborhood/koreatown"
                className="text-sm text-[#a3a3a3] hover:text-[#FF4B2B] transition-colors"
              >
                Full guide →
              </Link>
            </div>
            <div className="p-6 space-y-4">
              {ktownSpots.map((spot) => (
                <Link
                  key={spot.slug}
                  href={`/spots/${spot.slug}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#f5f5f5] group-hover:text-[#FF4B2B] transition-colors">
                      {spot.name}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">
                      {spot.cuisine} · {spot.price}
                    </p>
                  </div>
                  {spot.isHidden && (
                    <span className="local-pick-badge text-[10px]">
                      🔥 Local
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Boyle Heights preview */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#FF4B2B] uppercase tracking-wider mb-1">
                  Boyle Heights
                </p>
                <h3 className="text-xl font-bold text-[#f5f5f5]">
                  Taco capital of the world.
                </h3>
              </div>
              <Link
                href="/neighborhood/boyle-heights"
                className="text-sm text-[#a3a3a3] hover:text-[#FF4B2B] transition-colors"
              >
                Full guide →
              </Link>
            </div>
            <div className="p-6 space-y-4">
              {boyleSpots.map((spot) => (
                <Link
                  key={spot.slug}
                  href={`/spots/${spot.slug}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#f5f5f5] group-hover:text-[#FF4B2B] transition-colors">
                      {spot.name}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">
                      {spot.cuisine} · {spot.price}
                    </p>
                  </div>
                  {spot.isHidden && (
                    <span className="local-pick-badge text-[10px]">
                      🔥 Local
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/neighborhood" className="btn-secondary">
            Browse all neighborhoods →
          </Link>
        </div>
      </section>

      <div className="divider-glow mx-auto max-w-7xl" />

      {/* ─── Submit CTA ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,75,43,0.12) 0%, rgba(255,75,43,0.04) 100%)',
            border: '1px solid rgba(255,75,43,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] opacity-20 blur-[60px] rounded-full"
              style={{ background: '#FF4B2B' }}
            />
          </div>
          <div className="relative">
            <p className="section-label mb-4">Community Driven</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Know a spot we missed?
            </h2>
            <p className="text-lg text-[#a3a3a3] mb-8 max-w-lg mx-auto">
              Put us on. If it&apos;s real, we&apos;ll add it. No chain restaurants.
              No tourist traps. Just the block.
            </p>
            <Link href="/submit" className="btn-primary">
              Submit a Spot →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Email / PDF Map CTA ───────────────────────────────────── */}
      <section
        id="food-map"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-4">Free for Subscribers</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get the LA Food Map.
            </h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-3">
              Our curated PDF map of{' '}
              <strong className="text-[#f5f5f5]">50+ real LA food spots</strong>{' '}
              by neighborhood. Usually{' '}
              <span className="line-through text-[#6b6b6b]">$9</span> — free when
              you subscribe.
            </p>
            <ul className="space-y-2 text-sm text-[#a3a3a3] mb-8">
              {[
                'Organized by neighborhood with addresses',
                'Must-order dish per spot',
                'Price range + hours',
                'Hidden gems your friends don\'t know about',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-[#FF4B2B] text-base leading-none">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p className="text-lg font-semibold text-[#f5f5f5] mb-6">
              Get the free LA Food Map PDF
            </p>
            <form
              action="/api/subscribe"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email-map"
                  className="block text-sm font-medium text-[#a3a3a3] mb-2"
                >
                  Your email
                </label>
                <input
                  id="email-map"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input-dark"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send me the map ($9 value, free) →
              </button>
              <p className="text-xs text-center text-[#6b6b6b]">
                No spam. Unsubscribe anytime. Just real LA food content.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
