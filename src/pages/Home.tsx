import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import tshirtImage from '@/assets/starspring-tshirt.jpg';
import hoodieImage from '@/assets/starspring-hoodie.jpg';
import flannelImage from '@/assets/starspring-flannel.jpg';

export const Home = () => {
  const products = [
    {
      name: 'STARSPRING TEE',
      price: '$35',
      image: tshirtImage,
      type: 'Essential Tee'
    },
    {
      name: 'STARSPRING HOODIE',
      price: '$65',
      image: hoodieImage,
      type: 'Premium Hoodie'
    },
    {
      name: 'STARSPRING FLANNEL',
      price: '$55',
      image: flannelImage,
      type: 'Grunge Flannel'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="hero-glow absolute inset-0 opacity-20" />
        
        <div className="text-center space-y-8 z-10">
          {/* Main Logo/Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Star className="w-12 h-12 text-accent fill-current animate-pulse" />
              <h1 className="grunge-text text-6xl md:text-8xl text-foreground">
                ST★RSPRING
              </h1>
              <Star className="w-12 h-12 text-accent fill-current animate-pulse" />
            </div>
            
            <p className="font-grunge text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Born from late nights and big dreams. Made for those who refuse to settle. 
              Every piece tells a story of ambition, hustle, and reaching for something greater.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black backdrop-blur-sm font-grunge font-semibold px-8"
            >
              SHOP NOW
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Link to="/mission">
              <Button
                variant="outline"
                size="lg"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background font-grunge font-semibold px-8"
              >
                THE STORY
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Drop Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="grunge-text text-4xl md:text-6xl text-foreground mb-6">
              LATEST DROP
            </h2>
            <p className="font-grunge text-lg text-muted-foreground max-w-2xl mx-auto">
              Minimalist designs with maximum impact. Each piece crafted for those who 
              understand that less is more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                image={product.image}
                type={product.type}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-black font-grunge font-semibold px-8"
            >
              VIEW ALL PRODUCTS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h3 className="grunge-text text-3xl md:text-4xl text-foreground">
              FROM LA TO THE WORLD
            </h3>
            <p className="font-grunge text-lg text-muted-foreground leading-relaxed">
              Started by a 16-year-old kid from Los Angeles with nothing but a dream and 
              determination to make it out. Every design represents the hustle, the late nights, 
              and the unwavering belief that greatness comes from never settling.
            </p>
            <Link to="/mission">
              <Button
                size="lg"
                className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black backdrop-blur-sm font-grunge font-semibold px-8 mt-6"
              >
                READ THE FULL STORY
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};