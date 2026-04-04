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
  Truck,
  Youtube,
  Radio,
  Music2,
  Pin,
  ShoppingBag
} from 'lucide-react';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import { Badge } from '@/components/ui/badge';

// ─── Network config (module scope — not re-created per render) ────────────────

type Platform = 'tiktok' | 'youtube' | 'instagram' | 'linkedin' | 'x' | 'blog' | 'rapchat' | 'pinterest' | 'offerup';

const PLATFORM_CONFIG: Record<Platform, { buildUrl: (h: string) => string; icon: JSX.Element; sublabel: (h: string) => string }> = {
  tiktok:    { buildUrl: h => `https://www.tiktok.com/@${h}`,          icon: <TikTokIcon className="w-5 h-5 text-white" />,    sublabel: h => `@${h}` },
  youtube:   { buildUrl: h => `https://www.youtube.com/@${h}`,         icon: <Youtube className="w-5 h-5 text-white" />,       sublabel: h => `@${h}` },
  instagram: { buildUrl: h => `https://www.instagram.com/${h}/`,       icon: <Instagram className="w-5 h-5 text-white" />,     sublabel: h => `@${h}` },
  linkedin:  { buildUrl: h => `https://www.linkedin.com/in/${h}`,      icon: <Linkedin className="w-5 h-5 text-white" />,      sublabel: _ => 'LinkedIn' },
  x:         { buildUrl: h => `https://x.com/${h}`,                    icon: <Twitter className="w-5 h-5 text-white" />,       sublabel: h => `@${h}` },
  blog:      { buildUrl: h => `https://${h}/`,                         icon: <Radio className="w-5 h-5 text-white" />,         sublabel: _ => 'WordPress Blog' },
  rapchat:   { buildUrl: h => `https://rapch.at/${h}`,                 icon: <Music2 className="w-5 h-5 text-white" />,        sublabel: _ => 'Rapchat' },
  pinterest: { buildUrl: h => `https://pin.it/${h}`,                   icon: <Pin className="w-5 h-5 text-white" />,           sublabel: _ => 'Pinterest' },
  offerup:   { buildUrl: h => `https://offerup.co/profile/${h}`,       icon: <ShoppingBag className="w-5 h-5 text-white" />,   sublabel: _ => 'OfferUp' },
};

interface Channel { handle: string; label: string; platform: Platform; color: string; }

const NETWORK_CHANNELS: Channel[] = [
  { handle: 'comedian_landmark',        label: 'Comedy Landmark',      platform: 'tiktok',    color: 'from-yellow-500/20 to-pink-500/20 border-yellow-700/30' },
  { handle: 'awhellnaw247',             label: 'Aw Hell Naw',          platform: 'tiktok',    color: 'from-red-500/20 to-gray-800/40 border-red-700/30' },
  { handle: 'djtymotion',               label: 'DJ Ty Motion',         platform: 'tiktok',    color: 'from-blue-600/20 to-purple-600/20 border-blue-700/30' },
  { handle: 'tastetable',               label: 'Taste Table',          platform: 'tiktok',    color: 'from-orange-500/20 to-amber-500/20 border-orange-700/30' },
  { handle: 'venicebeatsmusic',         label: 'Venice Beats',         platform: 'tiktok',    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-700/30' },
  { handle: 'clipsup247',               label: 'Clips Up 247',         platform: 'tiktok',    color: 'from-green-500/20 to-teal-500/20 border-green-700/30' },
  { handle: 'theyrehere247',            label: "They're Here 247",     platform: 'tiktok',    color: 'from-gray-600/20 to-slate-700/20 border-gray-600/30' },
  { handle: 'beatsbythemotion',         label: 'Beats By The Motion',  platform: 'youtube',   color: 'from-red-600/20 to-red-900/20 border-red-700/30' },
  { handle: 'tymotionvsl',              label: 'Ty Motion VSL',        platform: 'instagram', color: 'from-pink-500/20 to-purple-600/20 border-pink-700/30' },
  { handle: 'awhecknaw247',             label: 'Aw Heck Naw 247',      platform: 'instagram', color: 'from-red-500/20 to-orange-600/20 border-red-700/30' },
  { handle: 'time_for_action567',       label: 'Time For Action',      platform: 'instagram', color: 'from-emerald-500/20 to-teal-600/20 border-emerald-700/30' },
  { handle: 'keaton-tyler-8b3b10b7',   label: 'Keaton Tyler',         platform: 'linkedin',  color: 'from-blue-700/20 to-blue-900/20 border-blue-800/30' },
  { handle: 'ktylermotion',             label: 'K Tyler Motion',       platform: 'x',         color: 'from-gray-700/20 to-black/40 border-gray-600/30' },
  { handle: 'liveliveradio.wordpress.com', label: 'Live Live Radio',   platform: 'blog',      color: 'from-violet-600/20 to-indigo-700/20 border-violet-700/30' },
  { handle: 'MTgUWcUQ21b',             label: 'Rapchat',              platform: 'rapchat',   color: 'from-yellow-500/20 to-orange-500/20 border-yellow-700/30' },
  { handle: '3arJRwuv0',               label: 'Pinterest (Pins)',      platform: 'pinterest', color: 'from-rose-600/20 to-red-700/20 border-rose-700/30' },
  { handle: '5jWrvLJNu',               label: 'Pinterest (Board)',     platform: 'pinterest', color: 'from-rose-500/20 to-pink-700/20 border-rose-600/30' },
  { handle: 'tymotion-',               label: 'OfferUp Shop',         platform: 'offerup',   color: 'from-teal-500/20 to-green-600/20 border-teal-700/30' },
];
import blueSpirulinaImage from '@/assets/blue-spirulina-lemonade-craving.jpg';
import manukaHoneyImage from '@/assets/manuka-honey-drizzle.jpg';
import logoImage from '@/assets/health-is-wealth-logo.jpg';
import amlaPowderImage from '@/assets/amla-powder-vitamin-c.jpg';
import moringaLeafImage from '@/assets/moringa-leaf-powder.jpg';

import usWellnessMoringaImage from '@/assets/us-wellness-moringa.jpg';
import smoothieRecipeImage from '@/assets/power-5-smoothie-recipe.png';
import purityTrackedVideo from '@/assets/purity-tracked-video.mp4';
import cacaoVideo from '@/assets/cacao-video.mp4';
import parsleyVideo from '@/assets/parsley-video.mp4';
import acaiBowlVideo from '@/assets/acai-bowl-video.mp4';
import purityTrackedPoster from '@/assets/purity-tracked-hero.png';
import AdBanner from '@/components/AdBanner';
import { subscribeEmail } from '@/lib/newsletter';

export const Home = () => {
  const [email, setEmail] = useState('');
  const [contactStatus, setContactStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const heroVideos = [purityTrackedVideo, cacaoVideo, parsleyVideo, acaiBowlVideo];

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video montage rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroVideos.length]);

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


  // Power of 5 - Elite Wellness Products
  const powerOf5Products = [
    {
      id: 'p6',
      name: 'Blue Spirulina Lemonade Powder',
      price: '$19.99',
      originalPrice: '$24.99',
      benefits: ['Powerful antioxidants', 'Natural detox support', 'Anti-inflammatory', 'Rich in phycocyanin'],
      usage: 'Mix 1 teaspoon with cold water, lemon juice, and honey for a vibrant superfood lemonade',
      category: 'IMMUNITY',
      description: 'Pure organic blue spirulina powder — transform your lemonade into a stunning antioxidant-rich superfood drink.',
      detailedDescription: 'Our Blue Spirulina Lemonade Powder is extracted from Arthrospira platensis and delivers a concentrated dose of phycocyanin — one of nature\'s most powerful antioxidants. This vibrant blue superfood powder turns ordinary lemonade into an Instagram-worthy wellness drink packed with anti-inflammatory compounds, protein, and essential nutrients. No fishy taste, just pure blue magic.',
      shopLink: 'https://www.amazon.com/dp/B0FH8C8WZL?tag=keatontyler-20',
      image: blueSpirulinaImage,
      rating: 4.7,
      reviews: 1230,
      features: [
        '100% pure blue spirulina',
        'No fishy taste or smell',
        'Rich in phycocyanin',
        'USDA organic certified',
        'Vegan & gluten-free',
        'Perfect for lemonades & smoothies'
      ],
      scientificBacking: 'Phycocyanin, the blue pigment in spirulina, has been clinically studied for its potent antioxidant and anti-inflammatory properties, supporting cellular health and immune function.',
      verifiedQuality: true,
      fastShipping: true
    },
    {
      id: 'p1',
      name: 'Organic Amla Powder - Vitamin C Powerhouse',
      price: '$13.99',
      originalPrice: '$15.99',
      benefits: ['4x more Vitamin C than oranges', 'Natural antioxidant boost', 'Hair & skin health', 'Iron absorption support'],
      usage: 'Add 1 teaspoon to smoothies, juices, or water daily',
      category: 'IMMUNITY',
      description: 'Pure, lab-tested organic Amla powder from India - the ultimate natural source of Vitamin C and antioxidants.',
      detailedDescription: 'This premium organic Amla powder contains 4 times more Vitamin C than oranges and has been used for centuries in Ayurvedic medicine. Rich in iron, calcium, and phosphorus, this superfood supports immune function, enhances iron absorption, and promotes healthy hair and skin.',
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
      verifiedQuality: true,
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
      detailedDescription: 'This premium organic moringa powder from Micro Ingredients contains 92 essential nutrients including protein, calcium, iron, and fiber.',
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
      scientificBacking: 'Moringa has been extensively studied for its nutritional density and anti-inflammatory compounds.',
      verifiedQuality: true,
      fastShipping: true
    },
    {
      id: 'p5',
      name: 'Premium Manuka Honey MGO 850+',
      price: '$49.99',
      originalPrice: '$59.99',
      benefits: ['Medical-grade antibacterial', 'Immune system boost', 'Digestive wellness', 'Natural wound healing'],
      usage: 'Take 1 teaspoon daily or add to warm tea, smoothies, and recipes',
      category: 'IMMUNITY',
      description: 'Certified high-grade Manuka honey with MGO 850+ for powerful antibacterial and immune-boosting benefits.',
      detailedDescription: 'This premium Manuka Honey is sourced from New Zealand and certified with an MGO rating of 850+, one of the highest grades available. Rich in methylglyoxal, this medical-grade honey delivers powerful antibacterial, anti-inflammatory, and immune-boosting properties. Lab-tested and AMHA certified for authenticity.',
      shopLink: 'https://www.amazon.com/dp/B01HYIT7PO?tag=keatontyler-20',
      image: manukaHoneyImage,
      rating: 4.6,
      reviews: 2890,
      features: [
        'MGO 850+ certified',
        'AMHA certified authentic',
        'Raw & unpasteurized',
        'Non-GMO & lab-tested',
        'From New Zealand',
        'Medical grade quality'
      ],
      scientificBacking: 'Manuka honey contains methylglyoxal (MGO), which has been clinically proven to have potent antibacterial properties and supports wound healing and immune function.',
      verifiedQuality: true,
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
      description: '1 LB certified organic moringa powder with no stems - just pure, potent leaf nutrition.',
      detailedDescription: 'U.S. Wellness Naturals delivers premium moringa powder made exclusively from leaves (no stems) for maximum potency.',
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
        'Premium quality choice'
      ],
      scientificBacking: 'Moringa leaves contain the highest concentration of nutrients, and this stem-free powder ensures maximum bioavailability.',
      verifiedQuality: true,
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
      {/* Hero Section - Video Montage */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        {/* Video Montage - stacked with crossfade */}
        {heroVideos.map((video, index) => (
          <video
            key={index}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              index === activeVideo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Centered CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide text-center leading-tight">
            Purity You Can Trust
          </h1>
          <p className="text-white/80 text-base md:text-lg tracking-[0.15em] uppercase font-light">
            We take care in our products.
          </p>
          <a
            href="/supplements"
            className="mt-4 bg-white/95 hover:bg-white text-black text-[13px] font-medium tracking-[0.15em] uppercase px-10 py-4 transition-all duration-300 hover:shadow-lg"
          >
            Learn More
          </a>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-10 left-0 right-0 text-center z-10">
          <p className="text-white/60 text-xs tracking-[0.25em] uppercase font-light">
            Premium Wellness · Venice, California
          </p>
        </div>
      </section>

      <AdBanner />

      {/* Featured Promo Video */}
      <section className="py-16 bg-card/40 border-y border-border/50">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            Now Promoting
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Watch Our Latest Drop
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Follow <a href="https://www.tiktok.com/@djtymotion" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@DjTymotion</a> for daily wellness finds, supplement reviews, and exclusive deals.
          </p>
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 w-full max-w-[560px] aspect-video">
              <iframe
                src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Ffb.watch%2FGfQw5210Lv%2F%3Fmibextid%3DwwXIfr&show_text=false&width=560&mute=0"
                width="100%"
                height="100%"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title="Health Is Wealth - Featured Ad"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/supplements"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Shop the Products
            </a>
            <a
              href="https://www.tiktok.com/@djtymotion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
              Follow @DjTymotion
            </a>
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
                Founded in West Los Angeles, Health is Wealth serves customers worldwide – we're a global movement toward sustainable wellness and environmental responsibility.
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
                    <strong className="text-foreground">Based in West Los Angeles,</strong> we witnessed people worldwide struggling with expensive healthcare costs while neglecting preventive wellness. We realized that investing in your health today truly is the greatest wealth you can build for tomorrow.
                  </p>
                  <p>
                    <strong className="text-foreground">Our founders believed</strong> that everyone, everywhere deserves access to high-quality, affordable supplements that not only improve personal health but also support our planet's wellbeing. We're not just selling products – we're building a global community of conscious consumers who understand that health and environmental stewardship go hand in hand.
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

      {/* Workout Catering Preview Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-primary/5">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="glow-text">Workout Catering Preview</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience our revolutionary approach to fitness and wellness – where premium supplements meet personalized workout nutrition plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Fuel Your Fitness Journey
              </h3>
              <p className="text-lg text-muted-foreground">
                Health is Wealth isn't just about supplements – we're pioneering a complete wellness ecosystem. Our workout catering service combines our elite Power of 5 supplements with customized nutrition plans designed specifically for your fitness goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Pre & Post-Workout Nutrition</h4>
                    <p className="text-muted-foreground">Optimized smoothie recipes and supplement timing to maximize your performance and recovery.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Personalized Plans</h4>
                    <p className="text-muted-foreground">Tailored supplement stacks and meal timing based on your workout intensity and goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Holistic Approach</h4>
                    <p className="text-muted-foreground">Combining our environmental mission with fitness – sustainable wellness for you and the planet.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="px-8 py-4">
                  <a href="/supplements">
                    Explore Supplements
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" className="px-8 py-4">
                  Get Custom Plan
                  <Mail className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-primary/20">
                <video 
                  controls 
                  className="w-full h-auto"
                  poster={purityTrackedPoster}
                >
                  <source src={purityTrackedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
            </div>
          </div>

          <div className="mt-12 p-8 bg-background/50 backdrop-blur rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
              Our Niche: Where Supplements Meet Performance
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Leaf className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Clean Supplements</h4>
                <p className="text-sm text-muted-foreground">Premium, natural ingredients that fuel your body without compromising health or environment.</p>
              </div>
              <div>
                <Zap className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Fitness Optimization</h4>
                <p className="text-sm text-muted-foreground">Science-backed nutrition timing and supplement stacks for peak athletic performance.</p>
              </div>
              <div>
                <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Lifestyle Integration</h4>
                <p className="text-sm text-muted-foreground">Seamlessly integrate wellness into your daily routine, from workout to recovery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section id="directory" className="section-padding">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Shop Smart: Local Wellness Directory</h2>
            <p className="text-wellness max-w-3xl mx-auto">
              Based in West LA, we've done the local research. Here are our recommendations for Los Angeles area shoppers.
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
              Carefully selected for maximum potency and results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-6 py-3 text-lg bg-primary/20 text-primary border-primary">
                ⭐ Elite Wellness Products ⭐
              </Badge>
              <Button asChild variant="outline" className="px-6 py-3">
                <a href="/supplements">
                  View All Supplements
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
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
                    alt={`${product.name} premium supplement`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                     {product.verifiedQuality && (
                       <Badge variant="secondary" className="bg-emerald-500 text-white">
                         Quality Verified
                       </Badge>
                     )}
                    {product.fastShipping && (
                      <Badge variant="secondary">
                        <Truck className="w-3 h-3 mr-1" />
                         Fast Shipping
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
                    <a href="https://healthiswealthstore-p8wk2.myshopify.com/" target="_blank" rel="noopener noreferrer">
                      Shop Now - {product.price}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-2">
                    ✓ Fast shipping • ✓ 30-day returns
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA to explore more */}
          <div className="text-center mt-16">
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Want to See Our Complete Supplement Collection?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover dozens more premium supplements including adaptogens, immune boosters, and longevity formulas - all curated for maximum wellness impact.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <a href="/supplements">
                  Browse All Supplements
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Power 5 Smoothie Recipe Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="px-6 py-3 text-lg bg-secondary/20 text-secondary border-secondary mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Featured Recipe
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="glow-text">The Power 5 Health Smoothie</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your mornings with our signature superfood blend - combining all 5 elite supplements into one powerful wellness drink!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={smoothieRecipeImage} 
                alt="Power 5 Health Smoothie recipe with Moringa, Neem, Chaga, and Shilajit superfoods"
                className="w-full rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-primary" />
                  Why This Recipe Works
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Energy & Vitality:</strong> Moringa powder provides sustained energy throughout your day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Anti-Inflammatory:</strong> Neem powder helps reduce inflammation naturally</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Immune Support:</strong> Chaga mushroom strengthens your body's defenses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Mineral-Rich:</strong> Shilajit provides essential trace minerals for vitality</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-primary/10 border-primary">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-3 text-primary" />
                  Get All the Ingredients
                </h3>
                <p className="text-muted-foreground mb-4">
                  All ingredients featured in this recipe are available in our Power of 5 collection above. Start your wellness journey today!
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="default">
                    <a href="#supplements" onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('supplements');
                    }}>
                      View Power of 5
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/supplements">
                      Shop All Supplements
                    </a>
                  </Button>
                </div>
              </Card>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  💡 <strong>Pro Tip:</strong> Blend this smoothie every morning for 30 days and experience the transformative power of consistent wellness!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Join the Health Is Wealth Community</h2>
            <p className="text-wellness mb-6">
              Ready to start your wellness journey? Connect with us globally from our West LA headquarters!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <a href="/supplements">
                  <Leaf className="mr-2 w-5 h-5" />
                  Explore All Products
                </a>
              </Button>
              <Button asChild variant="default" size="lg">
                <a href="#contact" onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}>
                  <Mail className="mr-2 w-5 h-5" />
                  Get Free Wellness Plan
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Get Your Free Wellness Plan!</h3>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                setContactLoading(true);
                const result = await subscribeEmail(email, 'home');
                setContactStatus(result);
                setContactLoading(false);
                if (result.success) setEmail('');
              }}>
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
                    onChange={(e) => { setEmail(e.target.value); setContactStatus(null); }}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
                    required
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
                <Button type="submit" disabled={contactLoading} className="btn-primary w-full">
                  {contactLoading ? 'Submitting...' : 'Get My Free Plan!'}
                </Button>
                {contactStatus && (
                  <p className={`text-sm text-center ${contactStatus.success ? 'text-green-600' : 'text-red-500'}`}>
                    {contactStatus.message}
                  </p>
                )}
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <span>healthiswealth@healthiswealth.live</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <span>1-310-303-4808</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <span>1078 Princeton Dr, Marina Del Rey, CA 90292</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  <a href="https://www.tiktok.com/@djtymotion" target="_blank" rel="noopener noreferrer" aria-label="TikTok @DjTymotion">
                    <Button variant="outline" size="sm" className="p-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
                    </Button>
                  </a>
                  <a href="https://www.instagram.com/tymotionvsl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @tymotionvsl">
                    <Button variant="outline" size="sm" className="p-2">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/@beatsbythemotion" target="_blank" rel="noopener noreferrer" aria-label="YouTube @beatsbythemotion">
                    <Button variant="outline" size="sm" className="p-2">
                      <Youtube className="w-4 h-4" />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/keaton-tyler-8b3b10b7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Keaton Tyler">
                    <Button variant="outline" size="sm" className="p-2">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </a>
                  <a href="https://x.com/ktylermotion" target="_blank" rel="noopener noreferrer" aria-label="X @ktylermotion">
                    <Button variant="outline" size="sm" className="p-2">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </a>
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

      {/* The Network Section */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-3 font-medium">
              FlavorCrave Empire
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              The Network
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              18 properties. 9 platforms. One empire. Follow every channel across the full FlavorCrave portfolio.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {NETWORK_CHANNELS.map((channel) => {
              const config = PLATFORM_CONFIG[channel.platform];
              return (
                <a
                  key={channel.handle}
                  href={config.buildUrl(channel.handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br border ${channel.color} hover:scale-105 transition-transform duration-200 text-center`}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{channel.label}</p>
                    <p className="text-white/50 text-xs mt-0.5">{config.sublabel(channel.handle)}</p>
                  </div>
                </a>
              );
            })}
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
                <a href="https://aisearchblog.wordpress.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">
                  Check Out Our Daily Health News
                </a>
                <a href="https://healthiswealth.live" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">
                  Visit HealthIsWealth.live
                </a>
                <a href="https://liveliveradio.wordpress.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">
                  Live Live Radio — News &amp; Culture
                </a>
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
                <a href="/privacy-policy" className="block text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
                <a href="/terms-of-service" className="block text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
                <a href="/disclaimer" className="block text-sm text-muted-foreground hover:text-primary">
                  Disclaimer
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Health Is Wealth. Made with ❤️ for the West LA community.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.tiktok.com/@djtymotion" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="TikTok @DjTymotion">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
              </a>
              <a href="https://www.youtube.com/@beatsbythemotion" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube @beatsbythemotion">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/tymotionvsl/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram @tymotionvsl">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/keaton-tyler-8b3b10b7" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn Keaton Tyler">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/ktylermotion" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="X @ktylermotion">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://aisearchblog.wordpress.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Newsletter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.5 12c0-1.19.254-2.318.7-3.342l3.86 10.58A8.504 8.504 0 013.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117A8.457 8.457 0 0112 20.5zm1.076-12.474c.512-.027.973-.08.973-.08.458-.054.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.238-.108-2.238-.108-.458-.026-.512.675-.054.702 0 0 .434.053.892.08l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.054.404-.728-.054-.702 0 0-1.376.108-2.265.108-.16 0-.347-.004-.542-.01A8.468 8.468 0 0112 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.728-1.427 1.51 0 .7.404 1.292.835 1.994.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.647 2.748l-.848 2.833-3.067-9.128zm3.924 11.6l2.594-7.5c.485-1.212.646-2.18.646-3.044 0-.313-.02-.603-.058-.878A8.467 8.467 0 0120.5 12a8.504 8.504 0 01-3.5 6.876z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 animate-in slide-in-from-bottom">
          <Button 
            asChild 
            size="lg" 
            className="shadow-2xl hover:scale-105 transition-transform bg-primary text-primary-foreground"
          >
            <a href="/supplements">
              <Leaf className="mr-2 w-5 h-5" />
              Shop Supplements
            </a>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="shadow-xl hover:scale-105 transition-transform bg-background"
          >
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}>
              <Mail className="mr-2 w-5 h-5" />
              Get Free Plan
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};