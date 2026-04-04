import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, X } from 'lucide-react';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { getCityData } from '@/data/geoData';

export function GeoRedirectBanner() {
  const geo = useGeoLocation();
  const [dismissed, setDismissed] = useState(false);

  if (geo.loading || dismissed || !geo.slug) return null;

  const cityData = getCityData(geo.slug);
  if (!cityData) return null;

  return (
    <div className="bg-green-900/80 border-b border-green-700 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
          <p className="text-sm text-green-100">
            <span className="font-semibold">Looks like you're in {geo.city || cityData.name}!</span>
            {' '}We have a local wellness guide for {cityData.name}.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to={`/wellness/${geo.slug}`}
            className="text-sm font-semibold text-white bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
          >
            View Guide <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-green-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
