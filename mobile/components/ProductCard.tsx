import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  product: ShopifyProduct;
}

export function ProductCard({ product }: Props) {
  const addItem = useCartStore(s => s.addItem);
  const imageUrl = product.images.edges[0]?.node.url;
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant?.price ?? product.priceRange.minVariantPrice;

  const handleAddToCart = () => {
    if (!firstVariant) return;
    addItem({
      variantId: firstVariant.id,
      productId: product.id,
      productHandle: product.handle,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      image: imageUrl,
      quantity: 1,
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/product/${product.handle}`)}
      activeOpacity={0.9}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>
          ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
        </Text>

        <TouchableOpacity style={styles.btn} onPress={handleAddToCart} activeOpacity={0.8}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
  },
  imagePlaceholder: {
    backgroundColor: '#F3F4F6',
  },
  body: {
    padding: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 13,
    color: '#D4AF37',
    fontWeight: '700',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
