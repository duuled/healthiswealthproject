import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getSpotBySlug,
  getSpotsByNeighborhood,
  getAllSpots,
  type FoodSpot,
} from '@/data/spots';
import SpotCard from '@/components/SpotCard';
import ShareButton from '@/components/ShareButton';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSpots().map((spot) => ({ slug: spot.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const spot = getSpotBySlug(params.slug);
  if (!spot) return { title: 'Spot Not Found' };

  return {
    title: `${spot.name} — ${spot.neighborhood} | TasteTable LA`,
    description: spot.excerpt,
    openGraph: {
      title: `${spot.name} — ${spot.neighborhood}`,
      description: spot.excerpt,
      url: `https://tastetablela.vercel.app/spots/${spot.slug}`,
    },
    alternates: {
      canonical: `https://tastetablela.vercel.app/spots/${spot.slug}`,
    },
  };
}

function neighborhoodSlug(neighborhood: string): string {
  return neighborhood.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function localBusinessSchema(spot: FoodSpot) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: spot.name,
    description: spot.excerpt,
    address: {
      '@type': 'PostalAddress',
      streetAddress: spot.address,
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    servesCuisine: spot.cuisine,
    priceRange: spot.price,
    openingHours: spot.hours ?? '',
    url: `https://tastetablela.vercel.app/spots/${spot.slug}`,
  };
}

export default function SpotPage({ params }: Props) {
  const spot = getSpotBySlug(params.slug);
  if (!spot) notFound();

  const neighborhoodSl = neighborhoodSlug(spot.neighborhood);
  const relatedSpots = getSpotsByNeighborhood(spot.neighborhood)
    .filter((s) => s.slug !== spot.slug)
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(spot)) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-8">
          <Link href="/" className="hover:text-[#FF4B2B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/neighborhood/${neighborhoodSl}`}
            className="hover:text-[#FF4B2B] transition-colors"
          >
            {spot.neighborhood}
          </Link>
          <span>/</span>
          <span className="text-[#a3a3a3]">{spot.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            {spot.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#FF4B2B]/10 text-[#FF4B2B] text-sm font-semibold px-3 py-1.5 rounded-full border border-[#FF4B2B]/25">
              {spot.neighborhood}
            </span>
            <span className="bg-white/5 text-[#a3a3a3] text-sm font-medium px-3 py-1.5 rounded-full border border-white/[0.06]">
              {spot.cuisine}
            </span>
            <span className="bg-white/5 text-white text-sm font-bold px-3 py-1.5 rounded-full border border-white/[0.06]">
              {spot.price}
            </span>
            {spot.isHidden && (
              <span className="bg-[#FF4B2B]/10 text-[#FF4B2B] text-sm font-semibold px-3 py-1.5 rounded-full border border-[#FF4B2B]/20">
                🔥 Hidden Gem
              </span>
            )}
          </div>
        </header>

        {/* Must Order */}
        <section className="mb-10">
          <h2 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-[0.15em] mb-4">
            Must Order — These are non-negotiable.
          </h2>
          <ol className="space-y-3">
            {spot.mustOrder.map((dish, i) => (
              <li key={dish} className="flex items-start gap-4">
                <span className="text-2xl font-black text-[#FF4B2B] leading-none mt-0.5 tabular-nums w-6 shrink-0">
                  {i + 1}
                </span>
                <span className="text-lg text-white font-medium">{dish}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Local Secret */}
        <section className="mb-10">
          <div className="bg-[#1a1510] border border-[#c17c00]/25 rounded-xl p-6">
            <p className="text-xs font-bold text-[#c17c00] uppercase tracking-[0.15em] mb-3">
              🔒 The Local Secret
            </p>
            <p className="text-[#f5d88a] text-base leading-relaxed">{spot.localSecret}</p>
          </div>
        </section>

        {/* Vibe */}
        <section className="mb-10">
          <p className="text-xl text-[#a3a3a3] italic text-center leading-relaxed">
            &ldquo;{spot.vibe}&rdquo;
          </p>
        </section>

        {/* Best For tags */}
        {spot.bestFor.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-[0.15em] mb-4">
              Best For
            </h2>
            <div className="flex flex-wrap gap-2">
              {spot.bestFor.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-[#a3a3a3] bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Address + Hours */}
        <section className="mb-10">
          <div className="bg-[#141414] border border-white/[0.06] rounded-xl p-6 space-y-3">
            <div>
              <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-[0.15em] mb-1">
                Address
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(spot.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a3a3a3] hover:text-[#FF4B2B] transition-colors text-sm"
              >
                {spot.address}
              </a>
            </div>
            {spot.hours && (
              <div>
                <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-[0.15em] mb-1">
                  Hours
                </p>
                <p className="text-[#a3a3a3] text-sm">{spot.hours}</p>
              </div>
            )}
          </div>
        </section>

        {/* Added By */}
        <section className="mb-12">
          <p className="text-sm text-[#6b6b6b]">
            Added by{' '}
            <span className="text-[#a3a3a3] font-medium">{spot.addedBy}</span>
            {' '}— a real local.
          </p>
        </section>

        {/* More in Neighborhood */}
        {relatedSpots.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">
              More in {spot.neighborhood}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSpots.map((s) => (
                <SpotCard key={s.slug} spot={s} />
              ))}
            </div>
            <div className="mt-6">
              <Link
                href={`/neighborhood/${neighborhoodSl}`}
                className="text-sm text-[#FF4B2B] hover:underline font-medium"
              >
                See all {spot.neighborhood} spots →
              </Link>
            </div>
          </section>
        )}

        {/* Share */}
        <section className="border-t border-white/[0.06] pt-10">
          <p className="text-sm text-[#6b6b6b] uppercase tracking-widest font-semibold mb-4">
            Put your people on →
          </p>
          <ShareButton spotName={spot.name} slug={spot.slug} />
        </section>

      </div>
    </>
  );
}
