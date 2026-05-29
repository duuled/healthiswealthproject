import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NEIGHBORHOODS, getSpotsByNeighborhood, type Neighborhood } from '@/data/spots';
import SpotCard from '@/components/SpotCard';

interface Props {
  params: { neighborhood: string };
}

// Maps kebab-case slug → Neighborhood display name
const SLUG_TO_NEIGHBORHOOD: Record<string, Neighborhood> = {
  'koreatown': 'Koreatown',
  'boyle-heights': 'Boyle Heights',
  'leimert-park': 'Leimert Park',
  'east-la': 'East LA',
  'inglewood': 'Inglewood',
  'crenshaw': 'Crenshaw',
  'compton': 'Compton',
  'pico-union': 'Pico-Union',
  'macarthur-park': 'MacArthur Park',
  'highland-park': 'Highland Park',
  'jefferson-park': 'Jefferson Park',
  'watts': 'Watts',
};

const NEIGHBORHOOD_GUIDES: Record<Neighborhood, string> = {
  'Koreatown': "Koreatown doesn't sleep. The best Korean food outside Seoul — KBBQ until 2am, gamja-tang at midnight, and a food culture that laughs at last call. If you haven't eaten here after midnight, you haven't eaten in LA.",
  'Boyle Heights': "Mexican culinary capital of Los Angeles. Generational taquerias that have been on the same corner since your parents were born. Mariachi culture, cabeza tacos at 3am, handmade tortillas slapping on the comal since 7am. The east side doesn't need your validation.",
  'Leimert Park': "Black LA's cultural heart. Soul food that's been passed down through kitchens, not restaurants. Jazz in the air, oxtail on the plate, community in every room. This neighborhood feeds people — physically and spiritually.",
  'East LA': "East side pride. The spots nobody outside the neighborhood talks about — carnitas, birria, seafood trucks that have been on the same corner for 20 years. Family spots that don't need a sign because everyone already knows where they are.",
  'Inglewood': "Overlooked and criminally underrated. Caribbean, soul food, Nigerian, and Jamaican spots that have been grinding quietly while the rest of the city slept on them. Post-Super Bowl, the neighborhood is popping — but the real spots have been here.",
  'Compton': "Real comfort food. BBQ, tacos, burgers — nothing fancy and everything delicious. The kind of neighborhood where the food has zero pretension and maximum flavor. Locals know. Pass it on.",
  'Pico-Union': "Central American city within a city. Pupusas made to order, tamales wrapped in banana leaves, horchata de morro from a grandmother who's been at the same spot since the 80s. The most underwritten food neighborhood in Los Angeles.",
  'MacArthur Park': "Street food mecca. Salvadoran vendors, Mexican carts, champurrado on winter mornings. The kind of place where food culture lives on the sidewalk, not in a storefront. Come hungry, bring cash, explore slowly.",
  'Highland Park': "Northeast LA's gentrification front line. Old-school taquerias vs. new pour-over coffee shops — we stick to the old school. Adobada spots that have outlasted three waves of displacement and still charge $3 a taco.",
  'Crenshaw': "Roscoe's adjacent, soul food legacy, neighborhood anchors. The kind of strip where a jerk chicken spot and a soul food plate house exist side-by-side and neither one has ever posted to Instagram. Community restaurants that feed communities.",
  'Watts': "Ancestral soul food and community restaurants. The kind of place where the owner knows your name by the second visit and asks about your family on the third. Watts has been feeding people right since long before anyone was paying attention.",
  'Jefferson Park': "Quiet block spots, family-owned, hidden in plain sight. Jefferson Park is the neighborhood that doesn't need press — the regulars handle marketing. Friday fish fries, candied yams, Southern plates that go back generations.",
};

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_NEIGHBORHOOD).map((slug) => ({ neighborhood: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const neighborhood = SLUG_TO_NEIGHBORHOOD[params.neighborhood];
  if (!neighborhood) return { title: 'Neighborhood Not Found' };

  return {
    title: `${neighborhood} Food Guide — Real LA Spots | TasteTable LA`,
    description: NEIGHBORHOOD_GUIDES[neighborhood].slice(0, 155),
    openGraph: {
      title: `${neighborhood} Food Guide — Real LA Spots`,
      description: NEIGHBORHOOD_GUIDES[neighborhood].slice(0, 155),
      url: `https://tastetablela.vercel.app/neighborhood/${params.neighborhood}`,
    },
    alternates: {
      canonical: `https://tastetablela.vercel.app/neighborhood/${params.neighborhood}`,
    },
  };
}

export default function NeighborhoodPage({ params }: Props) {
  const neighborhood = SLUG_TO_NEIGHBORHOOD[params.neighborhood];
  if (!neighborhood) notFound();

  const spots = getSpotsByNeighborhood(neighborhood);
  const guide = NEIGHBORHOOD_GUIDES[neighborhood];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-8">
        <Link href="/" className="hover:text-[#FF4B2B] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/neighborhood" className="hover:text-[#FF4B2B] transition-colors">
          Neighborhoods
        </Link>
        <span>/</span>
        <span className="text-[#a3a3a3]">{neighborhood}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
          {neighborhood}
        </h1>
        <p className="text-lg text-[#a3a3a3] leading-relaxed max-w-2xl">{guide}</p>
        <p className="mt-4 text-sm text-[#6b6b6b] font-medium">
          {spots.length} spot{spots.length !== 1 ? 's' : ''} documented
        </p>
      </header>

      {/* Spot grid */}
      {spots.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {spots.map((spot) => (
            <SpotCard key={spot.slug} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="bg-[#141414] border border-white/[0.06] rounded-xl p-10 text-center mb-16">
          <p className="text-[#a3a3a3] text-lg">
            We&apos;re still documenting spots here. Check back soon — or be the first to submit one.
          </p>
        </div>
      )}

      {/* Submit CTA */}
      <div className="border border-white/[0.06] rounded-xl p-8 bg-[#141414]">
        <h2 className="text-xl font-bold text-white mb-2">
          Know a spot we missed?
        </h2>
        <p className="text-[#a3a3a3] mb-5 text-sm">
          Every spot on this list was submitted by someone who actually eats there. If there&apos;s a real {neighborhood} gem we don&apos;t have yet, put us on.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 bg-[#FF4B2B] hover:bg-[#e63c20] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
        >
          Submit a spot
        </Link>
      </div>

    </div>
  );
}
