import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, Star } from 'lucide-react';
import tshirtImage from '@/assets/starspring-tshirt.jpg';
import hoodieImage from '@/assets/starspring-hoodie.jpg';
import flannelImage from '@/assets/starspring-flannel.jpg';

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const products = [
    {
      name: 'STARSPRING ESSENTIAL TEE',
      price: '$35',
      image: tshirtImage,
      type: 'T-Shirts',
      category: 'TEES'
    },
    {
      name: 'STARSPRING PREMIUM HOODIE',
      price: '$65',
      image: hoodieImage,
      type: 'Hoodies',
      category: 'HOODIES'
    },
    {
      name: 'STARSPRING GRUNGE FLANNEL',
      price: '$55',
      image: flannelImage,
      type: 'Shirts',
      category: 'SHIRTS'
    },
    // Adding more mock products
    {
      name: 'STARSPRING OVERSIZED TEE',
      price: '$40',
      image: tshirtImage,
      type: 'T-Shirts',
      category: 'TEES'
    },
    {
      name: 'STARSPRING ZIP HOODIE',
      price: '$70',
      image: hoodieImage,
      type: 'Hoodies',
      category: 'HOODIES'
    },
    {
      name: 'STARSPRING BUTTON DOWN',
      price: '$60',
      image: flannelImage,
      type: 'Shirts',
      category: 'SHIRTS'
    }
  ];

  const categories = ['ALL', 'TEES', 'HOODIES', 'SHIRTS'];

  const filteredProducts = selectedCategory === 'ALL' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Star className="w-8 h-8 text-accent fill-current" />
            <h1 className="grunge-text text-5xl md:text-6xl text-foreground">
              SHOP
            </h1>
            <Star className="w-8 h-8 text-accent fill-current" />
          </div>
          
          <p className="font-grunge text-lg text-muted-foreground max-w-2xl mx-auto">
            Minimalist designs. Maximum impact. Every piece crafted for those who understand 
            that true style comes from within.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-grunge text-sm">FILTER BY:</span>
            </div>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-accent text-black font-grunge font-semibold"
                    : "border-border text-foreground hover:border-accent hover:text-accent font-grunge"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                image={product.image}
                type={product.type}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-grunge text-lg text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="grunge-text text-3xl md:text-4xl text-foreground mb-6">
            STAY IN THE LOOP
          </h2>
          
          <p className="font-grunge text-lg text-muted-foreground mb-8">
            Be the first to know about new drops, exclusive designs, and the journey of StarSpring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground font-grunge focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button
              className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black backdrop-blur-sm font-grunge font-semibold px-6"
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};