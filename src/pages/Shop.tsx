import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";
import { subscribeEmail } from "@/lib/newsletter";

export const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(50);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    const result = await subscribeEmail(email, 'shop');
    setNewsletterStatus(result);
    setNewsletterLoading(false);
    if (result.success) setEmail("");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-6xl font-bold mb-6 text-foreground">
            SHOP
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium supplements and wellness products
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">No products found</h2>
            <p className="text-muted-foreground mb-8">
              Create your first product by telling me what you want to sell and the price!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-lg border border-border">
          <h2 className="font-display text-3xl font-bold mb-4 text-center text-foreground">
            JOIN OUR WELLNESS COMMUNITY
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Subscribe to receive exclusive offers and wellness tips
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setNewsletterStatus(null); }}
              className="flex-1 bg-background border-border"
              required
            />
            <Button type="submit" disabled={newsletterLoading} className="bg-accent text-black hover:bg-accent/90">
              {newsletterLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
            </Button>
          </form>
          {newsletterStatus && (
            <p className={`mt-3 text-sm text-center ${newsletterStatus.success ? 'text-green-600' : 'text-red-500'}`}>
              {newsletterStatus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
