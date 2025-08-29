import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  type: string;
}

export const ProductCard = ({ name, price, image, type }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group bg-card border-border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="sm"
            className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black backdrop-blur-sm"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            QUICK VIEW
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-grunge text-muted-foreground uppercase tracking-wider">
            {type}
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-foreground mb-3">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-grunge font-semibold text-xl text-accent">
            {price}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-black"
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </Card>
  );
};