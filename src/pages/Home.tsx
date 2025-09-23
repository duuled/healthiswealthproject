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
  Dumbbell,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  CheckCircle,
  X
} from 'lucide-react';
import heroImage from '@/assets/wellness-hero-image.jpg';
import mentalWellnessImage from '@/assets/mental-wellness-image.jpg';
import logoImage from '@/assets/health-is-wealth-logo.jpg';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [email, setEmail] = useState('');

  const supplements = [
    {
      name: 'Premium Manuka Honey',
      price: '$24.99',
      benefits: 'Immunity boost, natural energy, antibacterial properties',
      usage: 'Add to morning tea or smoothies',
      category: 'IMMUNITY',
      description: 'Raw, unprocessed Manuka honey perfect for busy West LA professionals',
      amazonLink: 'https://amazon.com/dp/B01K0PKS5M',
      isTikTok: false,
      image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8da?w=400'
    },
    {
      name: 'Black Seed Oil Capsules',
      price: '$19.95',
      benefits: 'Energy, inflammation support, heart health',
      usage: 'Take 2 capsules daily before breakfast',
      category: 'ENERGY',
      description: 'Cold-pressed black seed oil capsules for sustained energy throughout your day',
      amazonLink: 'https://amazon.com/dp/B075QBQZPX',
      isTikTok: false,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
    },
    {
      name: 'Organic Sea Moss Gel',
      price: '$32.99',
      benefits: 'Gut health, 92 minerals, digestive support',
      usage: 'Add to smoothies or take 2 tbsp daily',
      category: 'DIGESTIVE',
      description: 'Wildcrafted sea moss gel packed with essential minerals',
      amazonLink: 'https://amazon.com/dp/B08T1WZXZD',
      isTikTok: false,
      image: 'https://images.unsplash.com/photo-1609501676725-7186f674e2c2?w=400'
    },
    {
      name: 'TikTok Viral Chlorophyll Drops',
      price: '$16.99',
      benefits: 'Detoxification, energy boost, clear skin',
      usage: 'Add 15 drops to water daily',
      category: 'DETOX',
      description: '🎵 TikTok Favorite! Liquid chlorophyll drops for that viral "green water" trend',
      amazonLink: 'https://amazon.com/dp/B08XXZKJYG',
      isTikTok: true,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400'
    },
    {
      name: 'TikTok Famous Ashwagandha Gummies',
      price: '$22.95',
      benefits: 'Stress relief, better sleep, mood support',
      usage: 'Take 2 gummies daily',
      category: 'STRESS',
      description: '🎵 TikTok Viral! Stress-busting gummies loved by influencers and health enthusiasts',
      amazonLink: 'https://amazon.com/dp/B089QQ7YPH',
      isTikTok: true,
      image: 'https://images.unsplash.com/photo-1607635662717-f50b1077cdf6?w=400'
    },
    {
      name: 'TikTok Trending Collagen Powder',
      price: '$29.99',
      benefits: 'Skin health, joint support, hair growth',
      usage: 'Mix 1 scoop in coffee or smoothie',
      category: 'BEAUTY',
      description: '🎵 TikTok Must-Have! Marine collagen powder for that glow-up everyone\'s talking about',
      amazonLink: 'https://amazon.com/dp/B07QGXKQZZ',
      isTikTok: true,
      image: 'https://images.unsplash.com/photo-1609107200150-9cc025d56d52?w=400'
    }
  ];

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

  const fitnessPlans = [
    {
      title: '15-Minute HIIT for Students',
      description: 'Perfect for busy college schedules in Westchester',
      duration: '15 min',
      level: 'Beginner',
      exercises: ['Jumping jacks', 'Push-ups', 'Squats', 'Burpees']
    },
    {
      title: 'Professional\'s Yoga Flow',
      description: 'Stress relief for Marina del Rey workers',
      duration: '20 min',
      level: 'All levels',
      exercises: ['Sun salutations', 'Warrior poses', 'Downward dog', 'Meditation']
    },
    {
      title: 'Beach Workout Malibu Style',
      description: 'Take advantage of our beautiful coastline',
      duration: '30 min',
      level: 'Intermediate',
      exercises: ['Sand sprints', 'Beach volleyball', 'Ocean swimming', 'Yoga on sand']
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
            Affordable honey, black seed oil, and seamoss, plus expert advice for busy professionals 
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

          <Button 
            onClick={() => scrollToSection('supplements')}
            className="btn-secondary text-lg px-8 py-4"
          >
            Explore Wellness Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Supplements Section */}
      <section id="supplements" className="section-padding bg-card/30">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Your Affordable Natural Supplements</h2>
            <p className="text-wellness max-w-3xl mx-auto">
              Skip the overpriced trends and invest in proven wellness solutions that fit your budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supplements.map((supplement, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary ${
                supplement.isTikTok ? 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={supplement.image} 
                      alt={`${supplement.name} product preview`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {supplement.isTikTok && (
                      <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-full text-xs font-bold">
                        TikTok Viral
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Leaf className="w-8 h-8 text-secondary mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{supplement.name}</h3>
                      <p className="text-primary font-bold">{supplement.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{supplement.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Benefits:</strong> {supplement.benefits}</p>
                    <p className="text-sm"><strong>Usage:</strong> {supplement.usage}</p>
                  </div>

                  <Button asChild className="btn-primary w-full">
                    <a href={supplement.amazonLink} target="_blank" rel="noopener noreferrer">
                      Shop on Amazon
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
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

      {/* Fitness Plans Section */}
      <section id="fitness" className="section-padding bg-card/30">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Fitness Plans for Your Busy West LA Schedule</h2>
            <p className="text-wellness max-w-3xl mx-auto">
              Quick, effective workouts designed for West LA lifestyles. Boost with our supplements for maximum results!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fitnessPlans.map((plan, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Dumbbell className="w-8 h-8 text-primary mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        {plan.duration}
                      </span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {plan.level}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-wellness mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Exercises:</h4>
                  <ul className="space-y-1">
                    {plan.exercises.map((exercise, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <CheckCircle className="w-3 h-3 text-secondary mr-2" />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <p><strong>Pro Tip:</strong> Take black seed oil 30 minutes before your workout for enhanced energy and endurance!</p>
                </div>
                
                <Button className="btn-secondary w-full mt-4">
                  Download Plan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
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