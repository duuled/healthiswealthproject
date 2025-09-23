import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Heart, 
  Star, 
  MapPin, 
  Shield, 
  Zap, 
  Brain,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  CheckCircle,
  X,
  Truck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/wellness-hero-image.jpg';
import mentalWellnessImage from '@/assets/mental-wellness-image.jpg';
import logoImage from '@/assets/health-is-wealth-logo.jpg';
import amlaPowderImage from '@/assets/amla-powder-vitamin-c.jpg';
import moringaLeafImage from '@/assets/moringa-leaf-powder.jpg';
import kuliKuliMoringaImage from '@/assets/kuli-kuli-moringa.jpg';
import usWellnessMoringaImage from '@/assets/us-wellness-moringa.jpg';

export const Home = () => {
  const [email, setEmail] = useState('');

  const localStores = [
    {
      name: 'Rainbow Acres',
      location: 'West LA',
      address: '2122 Pico Blvd, Santa Monica, CA 90405',
      pros: ['Affordable prices', 'Fresh seamoss', 'Quality honey', 'Friendly staff'],
      cons: ['Limited parking'],
      recommended: true,
      description: 'Our top pick for affordable, quality supplements in West LA!'
    },
    {
      name: 'Whole Foods Market',
      location: 'Venice',
      address: '13488 Maxella Ave, Marina del Rey, CA 90292',
      pros: ['Wide selection', 'Organic options', 'Convenient location'],
      cons: ['Higher prices', 'Can get crowded'],
      recommended: true,
      description: 'Good backup option with reliable quality'
    },
    {
      name: 'Erewhon',
      location: 'Various',
      address: 'Multiple locations',
      pros: ['Trendy atmosphere', 'Premium products'],
      cons: ['Extremely overpriced', 'Unnecessary markup', 'Hype over value'],
      recommended: false,
      description: 'Skip this overpriced spot – your wallet will thank you!'
    }
  ];

  const affirmations = [
    "I am enough, and my West LA journey is unfolding beautifully.",
    "Every breath I take fills me with peace and strength in Santa Monica.",
    "I release stress and embrace calm, thriving in Venice and beyond.",
    "My mind is a sanctuary of positivity, growing stronger each day in Malibu.",
    "I deserve joy and balance, right here in West LA's vibrant energy."
  ];

  // Power of 5 - Elite Amazon Products
  const powerOf5Products = [
    {
      id: 'p1',
      name: 'Organic Amla Powder - Vitamin C Powerhouse',
      price: '$13.99',
      originalPrice: '$15.99',
      benefits: ['4x more Vitamin C than oranges', 'Natural antioxidant boost', 'Hair & skin health', 'Iron absorption support'],
      usage: 'Add 1 teaspoon to smoothies, juices, or water daily',
      category: 'IMMUNITY',
      description: 'Pure, lab-tested organic Amla powder from India - the ultimate natural source of Vitamin C and antioxidants.',
      detailedDescription: 'This premium organic Amla powder contains 4 times more Vitamin C than oranges and has been used for centuries in Ayurvedic medicine. Rich in iron, calcium, and phosphorus, this superfood supports immune function, enhances iron absorption, and promotes healthy hair and skin. Perfect for those seeking a natural, potent source of Vitamin C.',
      shopLink: 'https://amzn.to/42atVvr',
      image: amlaPowderImage,
      rating: 4.5,
      reviews: 349,
      features: [
        'Lab tested for purity',
        'Gluten-free & Non-GMO',
        '1.25 LB bulk bag',
        '100% raw & natural',
        'From sustainable farms',
        'USDA organic certified'
      ],
      scientificBacking: 'Amla has been scientifically proven to be one of the richest natural sources of Vitamin C and contains powerful antioxidants that support immune system function.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p2',
      name: 'Micro Ingredients Organic Moringa Powder',
      price: '$29.99',
      originalPrice: '$34.99',
      benefits: ['92 essential nutrients', 'Natural energy boost', 'Immune system support', 'Anti-inflammatory properties'],
      usage: 'Mix 1 tablespoon in smoothies, tea, or water daily',
      category: 'ENERGY',
      description: '2-pound organic moringa leaf powder packed with vitamins, minerals, and antioxidants for comprehensive wellness support.',
      detailedDescription: 'This premium organic moringa powder from Micro Ingredients contains 92 essential nutrients including protein, calcium, iron, and fiber. Known as the "miracle tree," moringa provides natural energy, supports immune function, and offers powerful anti-inflammatory benefits. Perfect for adding nutritional density to your daily routine.',
      shopLink: 'https://amzn.to/4nPp5w4',
      image: moringaLeafImage,
      rating: 4.4,
      reviews: 4086,
      features: [
        'USDA organic certified',
        '2 pounds bulk size',
        'Rich in antioxidants',
        'Vegan & gluten-free',
        'Third-party tested',
        'Sustainability certified'
      ],
      scientificBacking: 'Moringa has been extensively studied for its nutritional density and anti-inflammatory compounds, making it one of the most nutrient-dense plants on Earth.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p3',
      name: 'Kuli Kuli Moringa Superfood Powder',
      price: '$18.61',
      originalPrice: '$22.99',
      benefits: ['More antioxidants than kale', 'Complete protein source', 'Natural detox support', 'Sustained energy'],
      usage: 'Add to smoothies, yogurt, or mix with water daily',
      category: 'ENERGY',
      description: 'Premium moringa leaf powder that packs more nutrition than kale, turmeric, and matcha combined.',
      detailedDescription: 'Kuli Kuli sources the highest quality moringa leaves to create this nutrient-dense superfood powder. With more antioxidants than kale and more protein than most plants, this moringa powder provides sustained energy and comprehensive nutritional support. Each serving delivers essential amino acids, vitamins, and minerals.',
      shopLink: 'https://www.amazon.com/dp/B07FYP5NXK/ref=cm_sw_r_as_gl_api_gl_i_BMBCMYMXFJ3PHK2YFJBD?linkCode=ml1&tag=keatontyler-20&linkId=80ebe2a13df56716bf749ab07b79e230',
      image: kuliKuliMoringaImage,
      rating: 4.3,
      reviews: 1420,
      features: [
        '100% pure USDA certified',
        'Non-GMO moringa powder',
        '10.6 oz single pack',
        'Complete amino acid profile',
        'Sustainably sourced',
        'Women-owned business'
      ],
      scientificBacking: 'Clinical studies show moringa contains more anti-inflammatory power, antioxidants, protein, calcium, iron, and fiber compared to kale, turmeric, and matcha.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p4',
      name: 'U.S. Wellness Naturals Moringa Powder',
      price: '$21.99',
      originalPrice: '$26.99',
      benefits: ['100% pure leaf powder', 'Raw from India', 'Resealable packaging', 'Versatile superfood'],
      usage: 'Perfect for smoothies, drinks, tea, and recipes',
      category: 'ENERGY',
      description: '1 LB certified organic moringa powder with no stems - just pure, potent leaf nutrition in a convenient resealable bag.',
      detailedDescription: 'U.S. Wellness Naturals delivers premium moringa powder made exclusively from leaves (no stems) for maximum potency. This 100% certified organic powder is raw-processed in India to preserve all nutrients. The convenient 1-pound resealable bag makes it perfect for daily use in smoothies, beverages, and recipes.',
      shopLink: 'https://amzn.to/47XJA4Y',
      image: usWellnessMoringaImage,
      rating: 4.4,
      reviews: 4092,
      features: [
        '100% certified organic',
        'Pure leaf NO stems',
        '1 LB (16oz) size',
        'Raw from India',
        'Resealable bag',
        'Amazon\'s Choice'
      ],
      scientificBacking: 'Moringa leaves contain the highest concentration of nutrients, and this stem-free powder ensures maximum bioavailability of vitamins, minerals, and antioxidants.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p5',
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
      amazonVerified: true,
      fastShipping: true
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 wellness-gradient opacity-30" />
        <img 
          src={heroImage} 
          alt="Natural wellness supplements with West LA landmarks" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="relative z-10 text-center container-padding max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <img 
              src={logoImage} 
              alt="Health Is Wealth bitten leaf logo with money sign" 
              className="w-16 h-16 mr-4 leaf-animation" 
            />
            <div>
              <h1 className="heading-primary">
                Invest in Your Health with Health Is Wealth in West LA!
              </h1>
              <p className="text-xl text-primary font-semibold mt-2">
                Affordable wellness for busy professionals and students
              </p>
            </div>
          </div>
          
          <p className="text-wellness max-w-4xl mx-auto mb-8">
            Discover our <span className="glow-text">Power of 5</span> elite supplements plus affordable wellness essentials for busy professionals 
            and students in Venice, Santa Monica, Malibu, and more!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold halo-glow">
              West LA Trusted
            </span>
            <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold">
              Budget-Friendly Health
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => scrollToSection('supplements')}
              variant="outline"
              className="text-lg px-8 py-4"
            >
              View Preview
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button asChild className="btn-secondary text-lg px-8 py-4">
              <a href="/supplements">
                Shop All Supplements
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="supplements" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="glow-text">Our Mission: Health is Wealth</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-xl font-semibold text-foreground">
                Born in Los Angeles, Health is Wealth is more than just a supplement brand – we're a movement toward sustainable wellness and environmental responsibility.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="flex items-center mb-4">
                    <Leaf className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-2xl font-bold text-foreground">Environmental Commitment</h3>
                  </div>
                  <p className="text-muted-foreground">
                    We believe that true health extends beyond our bodies to our planet. Every product we recommend supports sustainable farming practices, eco-friendly packaging, and companies that share our vision of a healthier Earth. When you choose Health is Wealth, you're not just investing in your wellness – you're contributing to environmental preservation.
                  </p>
                </Card>

                <Card className="p-8 bg-gradient-to-br from-secondary/5 to-primary/5">
                  <div className="flex items-center mb-4">
                    <Heart className="w-8 h-8 text-secondary mr-3" />
                    <h3 className="text-2xl font-bold text-foreground">Longevity Through Nature</h3>
                  </div>
                  <p className="text-muted-foreground">
                    We guide you toward healthy alternatives that promote longevity and vitality. Our carefully curated supplements are selected not just for their immediate benefits, but for their ability to support long-term wellness. We help you make informed decisions that lead to a longer, healthier, more vibrant life.
                  </p>
                </Card>
              </div>

              <div className="mt-12 p-8 bg-muted/30 rounded-xl">
                <h3 className="text-2xl font-bold text-center mb-6 text-foreground">Why We Started Health is Wealth</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">In Los Angeles,</strong> we witnessed too many people struggling with expensive healthcare costs while neglecting preventive wellness. We realized that investing in your health today truly is the greatest wealth you can build for tomorrow.
                  </p>
                  <p>
                    <strong className="text-foreground">Our founders believed</strong> that everyone deserves access to high-quality, affordable supplements that not only improve personal health but also support our planet's wellbeing. We're not just selling products – we're building a community of conscious consumers who understand that health and environmental stewardship go hand in hand.
                  </p>
                  <p>
                    <strong className="text-foreground">Every recommendation we make</strong> is thoroughly researched, environmentally conscious, and designed to help you live not just longer, but better. We believe that when you feel good, you do good – for yourself, your community, and the environment.
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Join the Health is Wealth Movement</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Together, we're proving that the best investment you can make is in your health – and our planet's future.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Badge className="px-6 py-3 text-lg bg-primary/20 text-primary border-primary">
                    <Leaf className="w-4 h-4 mr-2" />
                    Sustainable Choices
                  </Badge>
                  <Badge className="px-6 py-3 text-lg bg-secondary/20 text-secondary border-secondary">
                    <Heart className="w-4 h-4 mr-2" />
                    Longevity Focused
                  </Badge>
                  <Badge className="px-6 py-3 text-lg bg-primary/20 text-primary border-primary">
                    <Shield className="w-4 h-4 mr-2" />
                    Quality Guaranteed
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section id="directory" className="section-padding">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Shop Smart: West LA Wellness Directory</h2>
            <p className="text-wellness max-w-3xl mx-auto">
              We've done the research so you don't have to. Here's where to shop and where to skip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localStores.map((store, index) => (
              <Card key={index} className={`${
                store.recommended 
                  ? 'border-secondary bg-secondary/10' 
                  : 'border-destructive bg-destructive/10'
              } transition-shadow duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{store.name}</h3>
                    {store.recommended ? (
                      <CheckCircle className="w-6 h-6 text-secondary" />
                    ) : (
                      <X className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{store.location}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{store.address}</p>
                  <p className="text-sm mb-4">{store.description}</p>

                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-secondary text-sm">Pros:</h4>
                      <ul className="text-sm text-muted-foreground">
                        {store.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-secondary mr-2" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-destructive text-sm">Cons:</h4>
                      <ul className="text-sm text-muted-foreground">
                        {store.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-3 h-3 bg-destructive rounded-full mr-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Disclaimer:</strong> Recommendations based on affordability and quality for busy West LA residents. 
              Visit stores and compare for yourself!
            </p>
          </div>
        </div>
      </section>

      {/* The Power of 5 Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">THE POWER OF 5</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              The 5 most powerful health supplements that will transform your wellness journey. 
              Carefully selected from Amazon's top-rated products for maximum potency and results.
            </p>
            <div className="flex justify-center">
              <Badge className="px-6 py-3 text-lg bg-primary/20 text-primary border-primary">
                ⭐ Amazon's Most Trusted Wellness Products ⭐
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {powerOf5Products.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary relative">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground font-bold">
                    #{index + 1} POWER PICK
                  </Badge>
                </div>
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={`${product.name} premium supplement from Amazon`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {product.amazonVerified && (
                      <Badge variant="secondary" className="bg-orange-500 text-white">
                        Amazon Verified
                      </Badge>
                    )}
                    {product.fastShipping && (
                      <Badge variant="secondary">
                        <Truck className="w-3 h-3 mr-1" />
                        Prime
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {product.detailedDescription}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center text-sm">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {product.benefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-center text-xs">
                          <CheckCircle className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full h-10 text-sm font-semibold bg-primary hover:bg-primary/90">
                    <a href={product.shopLink} target="_blank" rel="noopener noreferrer">
                      Shop on Amazon - {product.price}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-2">
                    ✓ Amazon Prime shipping • ✓ 30-day returns
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Join the Health Is Wealth Community</h2>
            <p className="text-wellness">
              Ready to start your affordable wellness journey in West LA? Let's connect!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Get Your Free Wellness Plan!</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your wellness goals..."
                  />
                </div>
                <Button className="btn-primary w-full">
                  Get My Free Plan!
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <span>info@health-is-wealth.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <span>West LA Mental Health Hotline: 1-800-854-7771</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <span>Serving West LA, Venice, Santa Monica, Marina del Rey, Westchester, and Malibu</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="p-2">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-card/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Newsletter Signup</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe for West LA Wellness Deals and Tips!
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="btn-primary">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/80 border-t border-border py-12">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={logoImage} 
                  alt="Health Is Wealth logo" 
                  className="w-8 h-8 mr-2" 
                />
                <span className="font-bold text-lg">Health Is Wealth</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Affordable wellness for West LA communities. Investing in your health shouldn't break the bank.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('supplements')} className="block text-sm text-muted-foreground hover:text-primary">
                  Supplements
                </button>
                <button onClick={() => scrollToSection('directory')} className="block text-sm text-muted-foreground hover:text-primary">
                  Store Directory
                </button>
                <button onClick={() => scrollToSection('mental-health')} className="block text-sm text-muted-foreground hover:text-primary">
                  Mental Health
                </button>
                <button onClick={() => scrollToSection('fitness')} className="block text-sm text-muted-foreground hover:text-primary">
                  Fitness Plans
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Areas We Serve</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>West LA</p>
                <p>Venice</p>
                <p>Santa Monica</p>
                <p>Marina del Rey</p>
                <p>Westchester</p>
                <p>Malibu</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary">
                  Disclaimer
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Health Is Wealth. Made with ❤️ for the West LA community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};