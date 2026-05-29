'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SpotCard from '@/components/SpotCard';
import { getAllSpots, NEIGHBORHOODS, CUISINES } from '@/data/spots';
import type { Neighborhood, Cuisine } from '@/data/spots';

function SpotsContent() {
  const searchParams = useSearchParams();
  const [activeNeighborhood, setActiveNeighborhood] =
    useState<Neighborhood | 'All'>('All');
  const [activeCuisine, setActiveCuisine] = useState<Cuisine | 'All'>('All');
  const [hiddenOnly, setHiddenOnly] = useState(false);

  // Read URL params on mount
  useEffect(() => {
    const neighborhood = searchParams.get('neighborhood') as Neighborhood | null;
    const cuisine = searchParams.get('cuisine') as Cuisine | null;
    const filter = searchParams.get('filter');

    if (neighborhood && NEIGHBORHOODS.includes(neighborhood)) {
      setActiveNeighborhood(neighborhood);
    }
    if (cuisine && (CUISINES as string[]).includes(cuisine)) {
      setActiveCuisine(cuisine as Cuisine);
    }
    if (filter === 'hidden') {
      setHiddenOnly(true);
    }
  }, [searchParams]);

  const allSpots = getAllSpots();

  const filteredSpots = useMemo(() => {
    return allSpots.filter((spot) => {
      if (activeNeighborhood !== 'All' && spot.neighborhood !== activeNeighborhood)
        return false;
      if (activeCuisine !== 'All' && spot.cuisine !== activeCuisine)
        return false;
      if (hiddenOnly && !spot.isHidden) return false;
      return true;
    });
  }, [allSpots, activeNeighborhood, activeCuisine, hiddenOnly]);

  return (
    <>
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <p className="section-label mb-3">Explore All Spots</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Every real spot.
          <br />
          <span className="text-[#a3a3a3]">Zero tourist picks.</span>
        </h1>
        <p className="text-[#6b6b6b] text-lg">
          {filteredSpots.length} spot
          {filteredSpots.length !== 1 ? 's' : ''} found
          {activeNeighborhood !== 'All' ? ` in ${activeNeighborhood}` : ''}
          {activeCuisine !== 'All' ? ` · ${activeCuisine}` : ''}
          {hiddenOnly ? ' · Hidden gems only' : ''}
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 border-y border-white/5 bg-[#0d0d0d]/95 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Neighborhood filter */}
          <div className="scroll-container">
            <button
              className={`neighborhood-pill shrink-0 ${
                activeNeighborhood === 'All' ? 'active' : ''
              }`}
              onClick={() => setActiveNeighborhood('All')}
            >
              All Neighborhoods
            </button>
            {NEIGHBORHOODS.map((n) => (
              <button
                key={n}
                className={`neighborhood-pill shrink-0 ${
                  activeNeighborhood === n ? 'active' : ''
                }`}
                onClick={() => setActiveNeighborhood(n)}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Cuisine + hidden toggle row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <div className="scroll-container shrink-0">
              <button
                className={`neighborhood-pill shrink-0 text-xs ${
                  activeCuisine === 'All' ? 'active' : ''
                }`}
                onClick={() => setActiveCuisine('All')}
              >
                All Cuisines
              </button>
              {CUISINES.map((c) => (
                <button
                  key={c}
                  className={`neighborhood-pill shrink-0 text-xs ${
                    activeCuisine === c ? 'active' : ''
                  }`}
                  onClick={() => setActiveCuisine(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              className={`shrink-0 ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                hiddenOnly
                  ? 'bg-[#FF4B2B] text-white'
                  : 'text-[#a3a3a3] border border-white/10 hover:border-[#FF4B2B]/30'
              }`}
              onClick={() => setHiddenOnly(!hiddenOnly)}
            >
              🔥 Hidden Gems Only
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredSpots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <SpotCard key={spot.slug} spot={spot} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🤷</p>
            <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">
              No spots found
            </h3>
            <p className="text-[#6b6b6b] mb-6">
              Try a different neighborhood or cuisine filter.
            </p>
            <button
              className="btn-secondary"
              onClick={() => {
                setActiveNeighborhood('All');
                setActiveCuisine('All');
                setHiddenOnly(false);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function SpotsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-[#6b6b6b]">
          Loading spots...
        </div>
      }
    >
      <SpotsContent />
    </Suspense>
  );
}
