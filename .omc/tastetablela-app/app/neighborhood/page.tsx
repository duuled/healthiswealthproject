import Link from 'next/link';
import { NEIGHBORHOODS, getSpotsByNeighborhood } from '@/data/spots';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LA Food by Neighborhood — Taste Table LA',
  description:
    'Explore the real LA food scene neighborhood by neighborhood. Koreatown, Boyle Heights, Leimert Park, Inglewood, and beyond — no tourist picks, just local spots.',
};

const NEIGHBORHOOD_EMOJIS: Record<string, string> = {
  Koreatown: '🥩',
  'Boyle Heights': '🌮',
  'Leimert Park': '🍗',
  'East LA': '🦐',
  Inglewood: '🔥',
  Crenshaw: '🍖',
  Compton: '🍔',
  'Pico-Union': '🫓',
  'MacArthur Park': '🌽',
  'Highland Park': '🍜',
  'Jefferson Park': '🥘',
  Watts: '🍳',
};

const NEIGHBORHOOD_DESCRIPTIONS: Record<string, string> = {
  Koreatown: 'KBBQ smoke, Korean fried chicken, and 24/7 energy on Vermont and 6th.',
  'Boyle Heights': 'Taco capital. Birria, tacos de canasta, and street carts that never sleep.',
  'Leimert Park': 'Soul food, Caribbean kitchens, and community-rooted cooking on Degnan Blvd.',
  'East LA': 'Seafood tostadas, carnitas trucks, and the best tacos in the 323.',
  Inglewood: 'Jerk spots, suya grills, and Jamaican kitchens the city hasn\'t caught up to yet.',
  Crenshaw: 'Wing spots, fish plates, and neighborhood cooking with deep roots.',
  Compton: 'Classic LA fast food joints and old-school comfort spots that never changed.',
  'Pico-Union': 'Pupuserias, Guatemalan kitchens, and Central American cooking at its most honest.',
  'MacArthur Park': 'Elote carts, Salvadoran vendors, and street food 24/7 around the lake.',
  'Highland Park': 'Filipino kitchens, birria spots, and a food scene before the gentrification.',
  'Jefferson Park': 'Neighborhood barbecue, home cooking, and spots that have been here forever.',
  Watts: 'Old-school spots, community kitchens, and the real south LA food story.',
};

export default function NeighborhoodIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-14">
        <p className="section-label mb-3">Explore LA</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Know your neighborhood.
        </h1>
        <p className="text-[#a3a3a3] text-lg max-w-xl leading-relaxed">
          Every hood has its spot. Explore block-by-block food guides written by
          locals, not algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {NEIGHBORHOODS.map((neighborhood) => {
          const spots = getSpotsByNeighborhood(neighborhood);
          const slug = neighborhood.toLowerCase().replace(/\s+/g, '-');
          const emoji = NEIGHBORHOOD_EMOJIS[neighborhood] ?? '🍽';
          const description = NEIGHBORHOOD_DESCRIPTIONS[neighborhood] ?? '';

          return (
            <Link
              key={neighborhood}
              href={`/neighborhood/${slug}`}
              className="spot-card p-6 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs text-[#6b6b6b] font-medium">
                  {spots.length} spot{spots.length !== 1 ? 's' : ''}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#f5f5f5] group-hover:text-[#FF4B2B] transition-colors duration-200 mb-2">
                {neighborhood}
              </h2>

              <p className="text-sm text-[#6b6b6b] leading-relaxed line-clamp-2">
                {description}
              </p>

              <div className="mt-4 text-xs font-semibold text-[#FF4B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explore guide →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
