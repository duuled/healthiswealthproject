import Link from 'next/link';
import type { FoodSpot } from '@/data/spots';

interface SpotCardProps {
  spot: FoodSpot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <Link
      href={`/spots/${spot.slug}`}
      className="group block rounded-xl bg-[#1a1a1a] border border-white/[0.06] hover:bg-[#222] hover:border-[#FF4B2B]/30 transition-all duration-200 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top row: price + hidden badge */}
      <div className="flex items-center justify-between px-5 pt-5 pb-0">
        <span className="text-xs font-semibold text-[#FF4B2B] tracking-wider uppercase">
          {spot.price}
        </span>
        {spot.isHidden && (
          <span className="flex items-center gap-1 text-xs font-semibold bg-[#FF4B2B]/10 text-[#FF4B2B] px-2.5 py-1 rounded-full border border-[#FF4B2B]/20">
            🔥 Hidden Gem
          </span>
        )}
      </div>

      {/* Spot name */}
      <div className="px-5 pt-3">
        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#FF4B2B] transition-colors">
          {spot.name}
        </h3>
      </div>

      {/* Neighborhood + cuisine badges */}
      <div className="flex flex-wrap gap-2 px-5 pt-2">
        <span className="text-xs font-medium bg-[#FF4B2B]/10 text-[#FF4B2B] px-2.5 py-1 rounded-full border border-[#FF4B2B]/20">
          {spot.neighborhood}
        </span>
        <span className="text-xs font-medium bg-white/5 text-[#a3a3a3] px-2.5 py-1 rounded-full border border-white/[0.06]">
          {spot.cuisine}
        </span>
      </div>

      {/* Must Order preview */}
      {spot.mustOrder.length > 0 && (
        <div className="px-5 pt-3">
          <p className="text-xs text-[#6b6b6b] uppercase tracking-wider font-semibold mb-1.5">
            Must Order
          </p>
          <ul className="space-y-0.5">
            {spot.mustOrder.slice(0, 2).map((dish) => (
              <li key={dish} className="text-sm text-[#a3a3a3] flex items-start gap-1.5">
                <span className="text-[#FF4B2B] mt-0.5 shrink-0">→</span>
                <span>{dish}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Best For tags */}
      {spot.bestFor.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pt-3 pb-5">
          {spot.bestFor.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#6b6b6b] bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
