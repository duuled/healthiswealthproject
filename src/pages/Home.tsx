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
      name: 'Premium Honey',
      price: 'From $12',
      benefits: 'Immunity boost, natural energy, antioxidants',
      usage: 'Add to morning tea or smoothies',
      category: 'IMMUNITY',
      description: 'Raw, unprocessed honey perfect for busy West LA professionals'
    },
    {
      name: 'Black Seed Oil',
      price: 'From $18',
      benefits: 'Energy, inflammation support, heart health',
      usage: 'Take 1 tsp daily before breakfast',
      category: 'ENERGY',
      description: 'Cold-pressed black seed oil for sustained energy throughout your day'
    },
    {
      name: 'Sea Moss Gel',
      price: 'From $25',
      benefits: 'Gut health, 92 minerals, digestive support',
      usage: 'Add to smoothies or take 2 tbsp daily',
      category: 'DIGESTIVE',
      description: 'Wildcrafted sea moss gel packed with essential minerals'
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
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary">
                <CardContent className="p-6">
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

                  <Button className="btn-primary w-full">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
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

      {/* Health Advice Section */}
      <section id="health-advice" className="section-padding bg-card/30">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Free Health Tips for West LA Lifestyles</h2>
            <p className="text-wellness max-w-3xl mx-auto">
              Practical wellness advice tailored to your busy West LA life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Morning Energy Boost</h3>
              </div>
              <p className="text-wellness mb-4">
                Start your Santa Monica commute right: Add 1 tsp of black seed oil to your morning routine 
                for sustained energy without the coffee crash.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Take on empty stomach</li>
                <li>• Wait 30 minutes before eating</li>
                <li>• Perfect before Venice Beach workouts</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-secondary mr-3" />
                <h3 className="text-xl font-semibold">Gut Health for Stress</h3>
              </div>
              <p className="text-wellness mb-4">
                Marina del Rey professionals: Combat work stress by adding seamoss to your daily smoothie. 
                Your gut health affects your mood!
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 2 tbsp daily in smoothies</li>
                <li>• Rich in 92 essential minerals</li>
                <li>• Supports digestive health</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-success mr-3" />
                <h3 className="text-xl font-semibold">Immunity for Students</h3>
              </div>
              <p className="text-wellness mb-4">
                Westchester students: Keep your immune system strong during finals with raw honey. 
                Natural antibacterial properties keep you healthy.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 1 tbsp in warm water daily</li>
                <li>• Local honey helps with allergies</li>
                <li>• Great in tea or smoothies</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 text-accent mr-3" />
                <h3 className="text-xl font-semibold">Focus & Clarity</h3>
              </div>
              <p className="text-wellness mb-4">
                Malibu remote workers: Combine all three supplements for optimal brain function. 
                Natural nootropics without the side effects.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Morning: Black seed oil</li>
                <li>• Midday: Seamoss smoothie</li>
                <li>• Evening: Honey tea</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Mental Health Section */}
      <section id="mental-health" className="section-padding">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Nourish Your Mind with Health Is Wealth in West LA!</h2>
            <p className="text-xl text-primary font-semibold mb-8">
              Free Mental Wellness Tips and Affirmations for Busy Lives in Santa Monica, Venice, and Beyond!
            </p>
            <img 
              src={mentalWellnessImage} 
              alt="Peaceful meditation scene with calming wellness auras" 
              className="mx-auto rounded-lg shadow-lg mb-8 wave-effect"
            />
          </div>

          {/* Mental Health Advice */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Mental Health Advice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Take Short Breaks</h4>
                <p className="text-sm text-wellness">
                  Step away for 5 minutes every hour. Walk along Venice Beach or sip tea in Malibu—small pauses recharge your mind!
                </p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Practice Gratitude</h4>
                <p className="text-sm text-wellness">
                  Jot down 3 things you're thankful for daily (e.g., a sunny Santa Monica morning or a supportive friend). It shifts your focus to positivity.
                </p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Breathe Deeply</h4>
                <p className="text-sm text-wellness">
                  Try a 1-minute breathing exercise—inhale for 4 seconds, hold for 4, exhale for 4. Perfect for a quick reset during a hectic day in Marina del Rey.
                </p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Connect Locally</h4>
                <p className="text-sm text-wellness">
                  Reach out to a friend in Westchester or join a West LA community group. Human connection boosts mental resilience.
                </p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Limit Screen Time</h4>
                <p className="text-sm text-wellness">
                  Set boundaries on devices—replace scrolling with a nature walk or meditation to ease stress.
                </p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Additional Resources</h4>
                <p className="text-sm text-wellness">
                  Explore free apps like Headspace or contact the West LA Mental Health Hotline at <strong>1-800-854-7771</strong>. Check for mindfulness workshops in Santa Monica!
                </p>
              </Card>
            </div>
          </div>

          {/* Mental Health Affirmations */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8">Daily Affirmations for West LA Warriors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {affirmations.map((affirmation, index) => (
                <div key={index} className="affirmation-card">
                  <p className="text-lg font-medium text-foreground">"{affirmation}"</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Your Mental Wellness Journey – Sign Up for Weekly Tips!
              </Button>
            </div>
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