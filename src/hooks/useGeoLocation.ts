import { useState, useEffect } from 'react';

export interface GeoLocation {
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  slug: string | null;
}

const CITY_SLUGS: Record<string, string> = {
  'Los Angeles': 'los-angeles',
  'New York': 'new-york',
  'New York City': 'new-york',
  'Miami': 'miami',
  'Atlanta': 'atlanta',
  'Houston': 'houston',
  'Chicago': 'chicago',
  'Dallas': 'dallas',
  'Phoenix': 'phoenix',
  'Seattle': 'seattle',
  'San Francisco': 'san-francisco',
  'Denver': 'denver',
  'Austin': 'austin',
  'Nashville': 'nashville',
  'Charlotte': 'charlotte',
};

function getCitySlug(city: string | null): string | null {
  if (!city) return null;
  return CITY_SLUGS[city] || city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function useGeoLocation(): GeoLocation {
  const [geo, setGeo] = useState<GeoLocation>({
    city: null,
    region: null,
    country: null,
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
    slug: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function detectLocation() {
      // 1. Try browser geolocation first (more accurate, requires permission)
      if ('geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 3600000, // cache for 1 hour
            });
          });

          const { latitude, longitude } = position.coords;

          // Reverse geocode using a free API
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              null;
            const region = data.address?.state || null;
            const country = data.address?.country_code?.toUpperCase() || null;

            if (!cancelled) {
              setGeo({
                city,
                region,
                country,
                latitude,
                longitude,
                loading: false,
                error: null,
                slug: getCitySlug(city),
              });
            }
            return;
          } catch {
            // reverse geocoding failed, fall through to IP
          }
        } catch {
          // user denied or timeout, fall through to IP
        }
      }

      // 2. Fall back to IP-based geolocation (no permission needed)
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (!cancelled) {
          const city = data.city || null;
          setGeo({
            city,
            region: data.region || null,
            country: data.country_code || null,
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            loading: false,
            error: null,
            slug: getCitySlug(city),
          });
        }
      } catch (err) {
        if (!cancelled) {
          setGeo((prev) => ({ ...prev, loading: false, error: 'Location unavailable' }));
        }
      }
    }

    detectLocation();
    return () => { cancelled = true; };
  }, []);

  return geo;
}
