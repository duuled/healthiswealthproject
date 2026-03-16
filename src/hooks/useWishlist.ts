import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

type WishlistItem = Tables<'wishlist_items'>;

interface AddWishlistParams {
  shopify_product_id: string;
  shopify_handle: string;
  product_title: string;
  product_image?: string;
  product_price?: string;
}

export function useWishlist() {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!user) { setItems([]); return; }
    setIsLoading(true);
    const { data } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setItems(data ?? []);
    setIsLoading(false);
  };

  useEffect(() => { fetchWishlist(); }, [user]);

  const addToWishlist = async (params: AddWishlistParams) => {
    if (!user) { toast.error('Sign in to save items to your wishlist.'); return; }

    const { error } = await supabase
      .from('wishlist_items')
      .upsert({ user_id: user.id, ...params }, { onConflict: 'user_id,shopify_product_id' });

    if (error) {
      toast.error('Failed to add to wishlist.');
      return;
    }
    toast.success('Added to wishlist!');
    fetchWishlist();
  };

  const removeFromWishlist = async (shopify_product_id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', user.id)
      .eq('shopify_product_id', shopify_product_id);

    if (!error) {
      setItems(prev => prev.filter(i => i.shopify_product_id !== shopify_product_id));
      toast.success('Removed from wishlist.');
    }
  };

  const isInWishlist = (shopify_product_id: string) =>
    items.some(i => i.shopify_product_id === shopify_product_id);

  return { items, isLoading, addToWishlist, removeFromWishlist, isInWishlist };
}
