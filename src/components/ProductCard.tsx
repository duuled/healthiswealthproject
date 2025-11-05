import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product variant not available");
      return;
    }

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(`${node.title} added to cart`);
  };

  return (
    <Link to={`/product/${node.handle}`}>
      <Card className="group bg-card border-border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 cursor-pointer">
        <div className="relative overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-80 bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="sm"
              className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              VIEW PRODUCT
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-display font-bold text-lg text-foreground mb-3 line-clamp-2">
            {node.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-grunge font-semibold text-xl text-accent">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-black"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};