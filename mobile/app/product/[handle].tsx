import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getProductByHandle } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const addItem = useCartStore(s => s.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator color="#D4AF37" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.notFoundText}>Product not found.</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const variants = product.variants.edges.map(e => e.node);
  const selectedVariant = variants.find(v => v.id === selectedVariantId) ?? variants[0];
  const images = product.images.edges.map(e => e.node);
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    if (!selectedVariant.availableForSale) {
      Alert.alert('Out of Stock', 'This variant is currently unavailable.');
      return;
    }

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productHandle: product.handle,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      image: images[0]?.url,
      quantity: 1,
    });

    Alert.alert('Added to Cart', `${product.title} has been added to your cart.`, [
      { text: 'Continue Shopping' },
      { text: 'View Cart', onPress: () => router.push('/cart') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        {/* Image Carousel */}
        {images.length > 0 && (
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={e => {
                setCurrentImage(Math.round(e.nativeEvent.contentOffset.x / width));
              }}
            >
              {images.map((img, i) => (
                <Image
                  key={i}
                  source={{ uri: img.url }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {images.length > 1 && (
              <View style={styles.dots}>
                {images.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, i === currentImage && styles.dotActive]}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.details}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>
            ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
          </Text>

          {/* Variants */}
          {product.options.map(option => (
            option.values.length > 1 && (
              <View key={option.name} style={styles.optionGroup}>
                <Text style={styles.optionLabel}>{option.name}</Text>
                <View style={styles.optionValues}>
                  {option.values.map(val => {
                    const matchingVariant = variants.find(v =>
                      v.selectedOptions.some(o => o.name === option.name && o.value === val),
                    );
                    const isSelected = selectedVariant?.selectedOptions.some(
                      o => o.name === option.name && o.value === val,
                    );
                    const isAvailable = matchingVariant?.availableForSale ?? false;

                    return (
                      <TouchableOpacity
                        key={val}
                        style={[
                          styles.optionChip,
                          isSelected && styles.optionChipSelected,
                          !isAvailable && styles.optionChipUnavailable,
                        ]}
                        onPress={() => matchingVariant && setSelectedVariantId(matchingVariant.id)}
                        disabled={!isAvailable}
                      >
                        <Text
                          style={[
                            styles.optionChipText,
                            isSelected && styles.optionChipTextSelected,
                            !isAvailable && styles.optionChipTextUnavailable,
                          ]}
                        >
                          {val}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )
          ))}

          {/* Add to Cart */}
          <TouchableOpacity
            style={[
              styles.addToCartBtn,
              !selectedVariant?.availableForSale && styles.addToCartDisabled,
            ]}
            onPress={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
            activeOpacity={0.85}
          >
            <Text style={styles.addToCartText}>
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>

          {/* Description */}
          {product.description && (
            <View style={styles.descSection}>
              <Text style={styles.descLabel}>About This Product</Text>
              <Text style={styles.descText}>{product.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },

  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },

  productImage: {
    width,
    height: width,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  dotActive: {
    backgroundColor: '#D4AF37',
    width: 16,
  },

  details: { padding: 20 },

  productTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 30,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#D4AF37',
    marginBottom: 24,
  },

  optionGroup: { marginBottom: 20 },
  optionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  optionValues: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  optionChipSelected: {
    borderColor: '#1A1A1A',
    backgroundColor: '#1A1A1A',
  },
  optionChipUnavailable: {
    opacity: 0.4,
  },
  optionChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  optionChipTextSelected: {
    color: '#fff',
  },
  optionChipTextUnavailable: {
    textDecorationLine: 'line-through',
  },

  addToCartBtn: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
  },
  addToCartDisabled: {
    backgroundColor: '#E5E7EB',
  },
  addToCartText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  descSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 20,
  },
  descLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  descText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 24,
  },

  notFoundText: { fontSize: 16, color: '#6B7280' },
  backLink: { fontSize: 14, color: '#D4AF37', fontWeight: '600' },
});
