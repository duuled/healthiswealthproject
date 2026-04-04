import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CITY_DATA } from '@/data/geoData';
import { useSEO } from '@/hooks/useSEO';
import { useGeoLocation } from '@/hooks/useGeoLocation';

const BASE_DOMAIN = 'https://healthiswealth.live';

export function WellnessHub() {
  const geo = useGeoLocation();

  useSEO({
    title: 'Local Wellness Guides by City | Health Is Wealth',
    description:
      'Find the best health food stores and premium supplements in your city. Expert wellness guides for Los Angeles, New York, Miami, Atlanta, Houston, Chicago & more US cities.',
    keywords:
      'wellness supplements by city, health food stores near me, local wellness guide, organic supplements USA, moringa near me, superfood supplements delivery',
    canonicalUrl: '/wellness',
    ogTitle: 'Local Wellness Guides — Find the Best Health Stores Near You',
    ogDescription:
      'City-by-city wellness guides with local store recommendations and premium supplement delivery. Find your city.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Health Is Wealth — City Wellness Guides',
      description: 'Curated wellness guides for major US cities with local store recommendations and supplement delivery',
      url: `${BASE_DOMAIN}/wellness`,
      hasPart: Object.values(CITY_DATA).map((city) => ({
        '@type': 'WebPage',
        name: `${city.name} Wellness Guide`,
        url: `${BASE_DOMAIN}/wellness/${city.slug}`,
        description: city.seo.description,
      })),
    },
  });

  const cities = Object.values(CITY_DATA);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium text-sm uppercase tracking-widest">City Wellness Guides</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Find Your City's Best Wellness Resources
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Local health food store guides + premium supplements delivered anywhere in the US.
            We've done the research so you don't have to.
          </p>
          {geo.slug && !geo.loading && (
            <div className="mb-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold">
                <Link to={`/wellness/${geo.slug}`}>
                  <MapPin className="mr-2 w-4 h-4" />
                  View Your City Guide
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* City Grid */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by City</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cities.map((city) => (
              <Link key={city.slug} to={`/wellness/${city.slug}`}>
                <Card className="bg-gray-900 border-gray-800 hover:border-green-600 transition-all cursor-pointer group h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
                          {city.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{city.state}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-700 text-gray-500 text-xs">
                        {city.localStores.length} stores
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {city.seo.intro}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {city.neighborhoods.slice(0, 3).map((n) => (
                        <Badge key={n} className="bg-gray-800 text-gray-500 text-xs border-0">
                          {n}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-xs font-medium mt-4 group-hover:gap-2 transition-all">
                      View Guide <ArrowRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-black text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Don't see your city?</h2>
          <p className="text-gray-400 mb-6">
            We ship premium wellness supplements to every city in the US. Order online and get
            your Power 5 superfoods delivered in 2–5 business days.
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold">
            <Link to="/supplements">
              Shop All Supplements <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
