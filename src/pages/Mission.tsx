import { Button } from '@/components/ui/button';
import { Star, Heart, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Mission = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Star className="w-10 h-10 text-accent fill-current" />
            <h1 className="grunge-text text-5xl md:text-7xl text-foreground">
              THE STORY
            </h1>
            <Star className="w-10 h-10 text-accent fill-current" />
          </div>
          
          <p className="font-grunge text-xl text-accent mb-8">
            From LA Streets to Global Dreams
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12 space-y-8">
            <div className="space-y-6">
              <h2 className="grunge-text text-3xl md:text-4xl text-foreground">
                Born from Nothing, Building Everything
              </h2>
              
              <p className="font-grunge text-lg text-muted-foreground leading-relaxed">
                My name is behind StarSpring Apparel, and I'm just a 16-year-old Black kid from 
                Los Angeles with a vision that's bigger than my circumstances. Growing up in a city 
                where dreams are born and broken every day, I learned early that if you want something, 
                you don't wait for permission—you create it yourself.
              </p>

              <p className="font-grunge text-lg text-muted-foreground leading-relaxed">
                StarSpring isn't just a clothing brand. It's proof that age doesn't define your 
                potential, your zip code doesn't determine your destination, and your current situation 
                doesn't dictate your future story. Every late night spent designing, every dollar saved, 
                every rejection faced—it all led to this moment.
              </p>

              <p className="font-grunge text-lg text-muted-foreground leading-relaxed">
                The name "StarSpring" represents two things: the stars we reach for when everyone 
                says we can't, and the spring—the resilience to bounce back harder every time we fall. 
                This brand is for the dreamers, the hustlers, the ones who refuse to accept "that's 
                just how it is" as an answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="grunge-text text-4xl md:text-5xl text-center text-foreground mb-16">
            WHAT WE STAND FOR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Target className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="font-display font-bold text-xl text-foreground mb-4">
                AUTHENTICITY
              </h3>
              <p className="font-grunge text-muted-foreground">
                Real stories, real struggles, real success. No fake narratives, just genuine hustle.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Zap className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="font-display font-bold text-xl text-foreground mb-4">
                RESILIENCE
              </h3>
              <p className="font-grunge text-muted-foreground">
                Every setback is a setup for a comeback. We turn obstacles into opportunities.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="font-display font-bold text-xl text-foreground mb-4">
                COMMUNITY
              </h3>
              <p className="font-grunge text-muted-foreground">
                Lifting others as we climb. Success means nothing if we can't bring others with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="grunge-text text-3xl md:text-4xl text-foreground mb-8">
            JOIN THE MOVEMENT
          </h2>
          
          <p className="font-grunge text-lg text-muted-foreground mb-8 leading-relaxed">
            When you wear StarSpring, you're not just wearing clothes—you're wearing a statement. 
            A statement that says you believe in the power of dreams, the strength of determination, 
            and the beauty of never giving up.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button
                size="lg"
                className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black backdrop-blur-sm font-grunge font-semibold px-8"
              >
                SHOP THE COLLECTION
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="lg"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-grunge font-semibold px-8"
            >
              FOLLOW OUR JOURNEY
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};