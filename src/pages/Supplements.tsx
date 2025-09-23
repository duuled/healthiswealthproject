import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Star, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  CheckCircle,
  Award,
  Truck
} from 'lucide-react';

export const Supplements = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const supplements = [
    {
      id: 1,
      name: 'Berberine Phytosome Complex',
      price: '$59.95',
      originalPrice: '$69.95',
      benefits: ['Metabolic support', 'Heart health', 'Blood sugar management', 'Enhanced absorption'],
      usage: 'Take 1-2 capsules daily with meals for optimal results',
      category: 'METABOLIC',
      description: 'Advanced berberine formula with phytosome technology for superior bioavailability and enhanced absorption. Supports healthy metabolism and cardiovascular function.',
      detailedDescription: 'This premium berberine supplement utilizes cutting-edge phytosome technology to deliver enhanced bioavailability compared to standard berberine. Each serving provides 550mg of highly absorbable berberine complex that supports healthy glucose metabolism, cardiovascular function, and overall metabolic wellness.',
      shopLink: 'https://amzn.to/4gDJKk1',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
      rating: 4.8,
      reviews: 1247,
      features: [
        'Enhanced Phytosome Technology',
        '550mg per serving',
        '120 vegetarian capsules',
        'Gluten-free & Non-GMO',
        'Third-party tested',
        'Made in USA'
      ],
      scientificBacking: 'Clinical studies show berberine can help maintain healthy blood sugar levels already within normal range and support cardiovascular health.',
      bestseller: true,
      fastShipping: true
    },
    {
      id: 2,
      name: 'Premium Manuka Honey',
      price: '$24.99',
      originalPrice: '$29.99',
      benefits: ['Immunity boost', 'Natural energy', 'Antibacterial properties', 'Digestive support'],
      usage: 'Add 1-2 teaspoons to morning tea, smoothies, or take directly',
      category: 'IMMUNITY',
      description: 'Raw, unprocessed Manuka honey with high MGO content for maximum therapeutic benefits and immune system support.',
      detailedDescription: 'Sourced from pristine New Zealand landscapes, this premium Manuka honey contains active compounds that provide natural antibacterial properties and immune system support. Perfect for busy West LA professionals seeking natural wellness solutions.',
      shopLink: 'https://amazon.com/dp/B01K0PKS5M',
      image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8da?w=600',
      rating: 4.6,
      reviews: 892,
      features: [
        'MGO 550+ certified',
        'Raw & unprocessed',
        'Single-origin New Zealand',
        'Glass jar packaging',
        'Traceable source',
        '12oz premium size'
      ],
      scientificBacking: 'Manuka honey has been studied for its unique antibacterial properties and potential immune system benefits.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 3,
      name: 'Black Seed Oil Capsules',
      price: '$19.95',
      originalPrice: '$24.95',
      benefits: ['Energy boost', 'Inflammation support', 'Heart health', 'Antioxidant properties'],
      usage: 'Take 2 capsules daily before breakfast with water',
      category: 'ENERGY',
      description: 'Cold-pressed black seed oil capsules providing sustained energy and comprehensive wellness support throughout your day.',
      detailedDescription: 'Premium black seed oil extracted using cold-press methods to preserve the active compounds. Rich in thymoquinone and essential fatty acids that support energy metabolism and overall vitality.',
      shopLink: 'https://amazon.com/dp/B075QBQZPX',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
      rating: 4.7,
      reviews: 654,
      features: [
        'Cold-pressed extraction',
        '500mg per capsule',
        '120 soft gel capsules',
        'High thymoquinone content',
        'No artificial additives',
        'Easy to swallow'
      ],
      scientificBacking: 'Black seed oil has been traditionally used for centuries and modern research supports its antioxidant and wellness properties.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 4,
      name: 'Organic Sea Moss Gel',
      price: '$32.99',
      originalPrice: '$39.99',
      benefits: ['92 essential minerals', 'Gut health support', 'Digestive wellness', 'Natural energy'],
      usage: 'Add 2 tablespoons to smoothies or take directly daily',
      category: 'DIGESTIVE',
      description: 'Wildcrafted sea moss gel packed with 92 essential minerals for comprehensive nutritional support and digestive wellness.',
      detailedDescription: 'Sustainably harvested from pristine ocean waters, this organic sea moss gel provides a complete spectrum of minerals and nutrients. Perfect for supporting digestive health and filling nutritional gaps in modern diets.',
      shopLink: 'https://amazon.com/dp/B08T1WZXZD',
      image: 'https://images.unsplash.com/photo-1609501676725-7186f674e2c2?w=600',
      rating: 4.5,
      reviews: 423,
      features: [
        'Wildcrafted & organic',
        '92 essential minerals',
        'Raw preparation',
        'Glass jar packaging',
        'No preservatives',
        '16oz premium size'
      ],
      scientificBacking: 'Sea moss is naturally rich in iodine, potassium, and other minerals essential for thyroid function and overall health.',
      bestseller: false,
      fastShipping: true
    }
  ];

  const categories = ['ALL', 'METABOLIC', 'IMMUNITY', 'ENERGY', 'DIGESTIVE'];

  const filteredSupplements = selectedCategory === 'ALL' 
    ? supplements 
    : supplements.filter(supplement => supplement.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Elite Wellness Essentials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our carefully curated collection of premium natural supplements, scientifically backed and quality tested for optimal wellness results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Quality Guaranteed
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Truck className="w-4 h-4 mr-2" />
                Fast Shipping
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Third-Party Tested
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="font-semibold"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredSupplements.map((supplement) => (
              <Card key={supplement.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary">
                <div className="relative">
                  <img 
                    src={supplement.image} 
                    alt={`${supplement.name} premium supplement bottle`}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {supplement.bestseller && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                    {supplement.fastShipping && (
                      <Badge variant="secondary">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast Ship
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {supplement.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{supplement.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(supplement.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {supplement.rating} ({supplement.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{supplement.price}</div>
                      {supplement.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">{supplement.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {supplement.detailedDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {supplement.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary" />
                      Premium Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {supplement.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-primary" />
                      Usage Instructions
                    </h4>
                    <p className="text-sm text-muted-foreground">{supplement.usage}</p>
                  </div>

                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Leaf className="w-4 h-4 mr-2 text-primary" />
                      Scientific Backing
                    </h4>
                    <p className="text-sm text-muted-foreground">{supplement.scientificBacking}</p>
                  </div>

                  <Button asChild className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90">
                    <a href={supplement.shopLink} target="_blank" rel="noopener noreferrer">
                      Shop Now - {supplement.price}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ✓ Free shipping on orders over $35 • ✓ 30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose Our Supplements?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Third-party tested for purity and potency</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Natural & Pure</h3>
              <p className="text-muted-foreground">Sourced from premium natural ingredients</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Science-Backed</h3>
              <p className="text-muted-foreground">Formulated based on clinical research</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};