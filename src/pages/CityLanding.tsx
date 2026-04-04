import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Star, CheckCircle, XCircle, ArrowRight, Leaf, Heart, Zap, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCityData, ALL_CITY_SLUGS } from '@/data/geoData';
import { useSEO } from '@/hooks/useSEO';

const BASE_DOMAIN = 'https://healthiswealth.live';

export function CityLanding() {
  const { city } = useParams<{ city: string }>();
  const data = getCityData(city || '');

  if (!data) {
    // If city not found, redirect to home
    return <Navigate to="/" replace />;
  }

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Health Is Wealth',
      description: `Premium wellness supplements serving the ${data.name} community`,
      url: `${BASE_DOMAIN}/wellness/${data.slug}`,
      areaServed: {
        '@type': 'City',
        name: data.name,
        containedInPlace: {
          '@type': 'State',
          name: data.state,
        },
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.latitude,
        longitude: data.longitude,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.name,
        addressRegion: data.stateCode,
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-310-303-4808',
        contactType: 'Customer Service',
        email: 'healthiswealth@healthiswealth.live',
        areaServed: data.stateCode,
        availableLanguage: 'English',
      },
      sameAs: [
        'https://www.instagram.com/aisearchblog/',
        'https://aisearchblog.wordpress.com/',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.seo.title,
      description: data.seo.description,
      url: `${BASE_DOMAIN}/wellness/${data.slug}`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Wellness Guides', item: `${BASE_DOMAIN}/wellness` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${data.name} Wellness`,
            item: `${BASE_DOMAIN}/wellness/${data.slug}`,
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Best Health Food Stores in ${data.name}`,
      description: `Our top recommended wellness and health food stores in ${data.name}, ${data.stateCode}`,
      itemListElement: data.localStores.map((store, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'LocalBusiness',
          name: store.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: store.address,
            addressLocality: data.name,
            addressRegion: data.stateCode,
            addressCountry: 'US',
          },
          description: store.description,
        },
      })),
    },
  ];

  useSEO({
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    canonicalUrl: `/wellness/${data.slug}`,
    ogTitle: data.seo.title,
    ogDescription: data.seo.description,
    schema,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-yellow-500 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium text-sm uppercase tracking-widest">
              {data.name}, {data.stateCode}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {data.seo.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {data.seo.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold">
              <Link to="/supplements">
                Shop Supplements <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/">
                Free Power 5 Recipe
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* City Wellness Culture */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Wellness in {data.name}
            </h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">{data.wellnessDescription}</p>
          <div className="flex flex-wrap gap-2">
            {data.neighborhoods.map((n) => (
              <Badge key={n} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                <MapPin className="w-3 h-3 mr-1" /> {n}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Power 5 Supplements Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm font-medium uppercase tracking-widest">
                Delivered to {data.name}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Power 5 Superfoods
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Premium ancient superfoods shipped directly to {data.name}. No subscription required.
              Free shipping on orders over $50.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {[
              { name: 'Moringa', benefit: '90+ nutrients', icon: '🌿' },
              { name: 'Shilajit', benefit: 'Himalayan vitality', icon: '⚡' },
              { name: 'Chaga', benefit: 'Immune support', icon: '🍄' },
              { name: 'Neem', benefit: 'Anti-inflammatory', icon: '🌱' },
              { name: 'Amla', benefit: '4x Vitamin C', icon: '🫐' },
            ].map((item) => (
              <Card key={item.name} className="bg-gray-900 border-gray-800 text-center">
                <CardContent className="pt-6 pb-4">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-bold text-white text-sm">{item.name}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.benefit}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8">
              <Link to="/supplements">
                Shop All Supplements <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Local Store Guide */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-yellow-400" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Best Health Stores in {data.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Our vetted recommendations for local supplements & superfoods
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {data.localStores.map((store, index) => (
              <Card
                key={store.name}
                className={`border ${
                  store.recommended
                    ? 'bg-gray-900 border-green-700'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white text-lg">{store.name}</h3>
                        {store.recommended && (
                          <Badge className="bg-green-600 text-white text-xs">
                            <Star className="w-3 h-3 mr-1" /> Recommended
                          </Badge>
                        )}
                        {index === 0 && (
                          <Badge className="bg-yellow-600 text-white text-xs">#1 Pick</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{store.neighborhood}</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">{store.address}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{store.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">Pros</div>
                      <ul className="space-y-1">
                        {store.pros.map((pro) => (
                          <li key={pro} className="flex items-center gap-2 text-gray-300 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {store.cons && store.cons.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wider">Cons</div>
                        <ul className="space-y-1">
                          {store.cons.map((con) => (
                            <li key={con} className="flex items-center gap-2 text-gray-300 text-sm">
                              <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Why {data.name} Locals Choose Health Is Wealth Online
            </h2>
            <p className="text-gray-400">
              Even with great local stores, ordering direct saves you time and money.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6 text-green-400" />, title: 'Purity Tracked', desc: 'Every batch tested. No fillers, no shortcuts.' },
              { icon: <Zap className="w-6 h-6 text-yellow-400" />, title: 'Same-Day Ship', desc: 'Order by 2pm for same-day fulfillment.' },
              { icon: <Leaf className="w-6 h-6 text-green-400" />, title: 'Ancient Sources', desc: 'Direct from Himalayan and African farms.' },
              { icon: <Heart className="w-6 h-6 text-red-400" />, title: 'Satisfaction', desc: '30-day satisfaction guarantee on all orders.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-gray-400 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Wellness Guides for Other Cities</h2>
          <div className="flex flex-wrap gap-2">
            {ALL_CITY_SLUGS.filter((s) => s !== data.slug).map((slug) => {
              const cityName = slug
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
              return (
                <Link key={slug} to={`/wellness/${slug}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400 transition-colors"
                  >
                    <MapPin className="w-3 h-3 mr-1" /> {cityName}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-gray-300 mb-8">
            Trusted by health-conscious communities in {data.name} and across the US.
            Free Power 5 smoothie recipe with every order.
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-6 text-lg">
            <Link to="/supplements">
              Shop Now — Free Shipping Over $50 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
