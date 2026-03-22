import { Button } from '@/components/ui/button';
import { Star, Heart, Target, Zap, Leaf, Shield, Brain } from 'lucide-react';
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
            Elevating Wellness, One Nutrient at a Time
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Your Health Is Your Greatest Investment
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                At <strong className="text-foreground">Health Is Wealth</strong>, we believe that true prosperity starts from within. Founded in Venice, California, our brand was born from a simple yet powerful truth: without your health, nothing else matters. We're on a mission to make premium, organic wellness accessible to everyone — not just the elite few.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We know how overwhelming the supplement market can be. That's why we've done the research for you. Every product we recommend is carefully vetted for purity, potency, and real results. From organic moringa and amla powder to adaptogenic mushroom blends, our curated "Power of 5" lineup delivers the essential nutrients your body craves — without the fillers, artificial additives, or inflated price tags.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our customers come to us looking for a healthier alternative — clean supplements packed with the right vitamins, minerals, and organic compounds that support immunity, energy, mental clarity, and long-term vitality. We stand behind every product we feature because we use them ourselves. These aren't trends — they're time-tested, science-backed solutions that genuinely work.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're just starting your wellness journey or you're a seasoned health enthusiast looking for trusted sources, Health Is Wealth is here to guide you. We partner with top-rated, third-party tested brands so you can shop with confidence knowing exactly what's going into your body. Your trust is everything to us, and we earn it every single day.
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
                QUALITY YOU CAN TRUST
              </h3>
              <p className="text-muted-foreground">
                Every product is USDA organic certified, third-party tested, and free from artificial additives. We never compromise on purity.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                SCIENCE-BACKED RESULTS
              </h3>
              <p className="text-muted-foreground">
                We only recommend supplements with proven scientific backing. No hype, no gimmicks — just nutrients that deliver real, measurable benefits.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                ACCESSIBLE WELLNESS
              </h3>
              <p className="text-muted-foreground">
                Premium health shouldn't break the bank. We find the best organic supplements at prices that respect your budget and your body.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Leaf className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                PLANET-FRIENDLY
              </h3>
              <p className="text-muted-foreground">
                We prioritize sustainably sourced ingredients and eco-friendly packaging. Your wellness journey should never come at the planet's expense.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                LONGEVITY FOCUSED
              </h3>
              <p className="text-muted-foreground">
                We're not about quick fixes. Our recommendations support long-term health, vitality, and a life lived to its fullest potential.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="font-bold text-xl text-foreground mb-4">
                REAL COMMUNITY
              </h3>
              <p className="text-muted-foreground">
                Join thousands who've transformed their health with us. We're building a global movement where wellness is a lifestyle, not a luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            START YOUR WELLNESS JOURNEY TODAY
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Explore our handpicked collection of organic supplements, superfood powders, and natural wellness products. Every product we feature has been personally tested, thoroughly researched, and proven to deliver results. Your body deserves the best — and we're here to help you find it.
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
            
            <a href="https://n4qdra-r1.myshopify.com/" target="_blank" rel="noopener noreferrer">
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
