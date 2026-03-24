import { Button } from '@/components/ui/button';
import { Heart, Target, Zap, Leaf, Shield, Brain, Users, Baby, Salad } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Mission = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Leaf className="w-10 h-10 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              OUR MISSION
            </h1>
            <Leaf className="w-10 h-10 text-primary" />
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 tracking-wide">
            Empowering Every Body — From Our Roots to Your Table
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Health Is Wealth — And We Mean It
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                At <strong className="text-foreground">Health Is Wealth</strong>, we started with one belief that changed everything: your health is the most valuable thing you'll ever own. Born out of a deep passion for organic, homegrown remedies sourced from premium suppliers around the world, we set out to build more than a brand — we're building a movement. A movement that puts clean, natural nutrition back into the hands of everyday people.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We cater to the entire community — families, fitness enthusiasts, vegans, and especially parents looking to give their children the healthiest start possible. We believe every person, regardless of age or lifestyle, deserves access to supplements and superfoods that are pure, potent, and free from harmful chemicals. That's why every product we carry is organic, third-party tested, and handpicked by our team.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Innovation is at the heart of what we do. From our signature <strong className="text-foreground">Blue Spirulina Lemonade</strong> to our carefully curated "Power of 5" lineup, we're constantly exploring new recipes and formulations that make healthy living exciting, delicious, and accessible. We don't just sell supplements — we create experiences that inspire you to rethink what wellness can taste and feel like.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a vegan looking for plant-based nutrition, a parent searching for safe and natural options for your kids, or someone who simply wants to feel their absolute best — Health Is Wealth is your trusted partner. We source only from premium, sustainable farms and producers who share our commitment to purity and the planet. Every powder, every capsule, every blend we offer has been personally tested and approved by our team before it ever reaches your door.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                This isn't a trend for us. This is a lifestyle. And we're here to walk this journey with you — one nutrient, one recipe, one healthier day at a time. Welcome to the family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
            WHAT WE STAND FOR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                PREMIUM ORGANIC SOURCES
              </h3>
              <p className="text-muted-foreground">
                Every product is sourced from trusted organic farms and premium suppliers worldwide. USDA certified, third-party tested, zero compromises on purity.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Salad className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                VEGAN & PLANT-BASED
              </h3>
              <p className="text-muted-foreground">
                Proudly vegan-friendly across our entire lineup. Clean, plant-powered nutrition that aligns with your values and fuels your body naturally.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Baby className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                SAFE FOR THE WHOLE FAMILY
              </h3>
              <p className="text-muted-foreground">
                From toddlers to grandparents, our products are formulated with safety and gentleness in mind. Give your children the nutrients they need without the worry.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                INNOVATIVE RECIPES
              </h3>
              <p className="text-muted-foreground">
                Blue Spirulina Lemonade is just the beginning. We're constantly developing creative, delicious ways to make superfoods part of your daily routine.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                COMMUNITY FIRST
              </h3>
              <p className="text-muted-foreground">
                We exist to serve our community. Every recommendation, every recipe, every product is chosen with you and your family's wellbeing at the center.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Leaf className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                HOMEGROWN REMEDIES
              </h3>
              <p className="text-muted-foreground">
                Rooted in traditional, time-tested natural remedies passed down through generations — now backed by modern science and available to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            JOIN THE WELLNESS MOVEMENT
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Explore our handpicked collection of organic supplements, superfood powders, and innovative wellness recipes. From our Power of 5 lineup to our Blue Spirulina Lemonade, every product has been personally tested and proven to deliver real results — for you, your family, and your future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/supplements">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                EXPLORE THE POWER OF 5
              </Button>
            </Link>
            
            <a href="https://healthiswealthstore-p8wk2.myshopify.com/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold px-8"
              >
                VISIT OUR SHOPIFY STORE
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
