import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius, fontSize, fontWeight } from '@/theme';
import { getProductByHandle } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { ShopStackParamList } from '@/navigation';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route }: Props) {
  const { handle } = route.params;
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductByHandle(handle);
        setProduct(data);
        if (data?.variants?.edges?.[0]) {
          setSelectedVariant(data.variants.edges[0].node);
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    })();
  }, [handle]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Product not found</Text>
        <Text style={styles.errorDesc}>{error}</Text>
      </View>
    );
  }

  const images = product.images?.edges ?? [];
  const variants = product.variants?.edges ?? [];
  const price = selectedVariant?.price ?? product.priceRange?.minVariantPrice;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      Alert.alert('Unavailable', 'Please select a variant.');
      return;
    }
    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    Alert.alert('Added to Cart', `${product.title} has been added to your cart.`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Image gallery */}
        {images.length > 0 ? (
          <View>
            <Image
              source={{ uri: images[activeImage]?.node?.url }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            {images.length > 1 && (
              <ScrollView
                horizontal
                style={styles.thumbStrip}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: spacing.md, gap: spacing.sm }}
              >
                {images.map((img: any, i: number) => (
                  <TouchableOpacity key={i} onPress={() => setActiveImage(i)}>
                    <Image
                      source={{ uri: img.node.url }}
                      style={[styles.thumb, activeImage === i && styles.thumbActive]}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        ) : (
          <View style={[styles.heroImage, styles.imagePlaceholder]}>
            <Text style={{ fontSize: 60 }}>🛍</Text>
          </View>
        )}

        <View style={styles.body}>
          {/* Title & price */}
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>
            {price?.currencyCode} {parseFloat(price?.amount ?? '0').toFixed(2)}
          </Text>

          {/* Variant picker */}
          {variants.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Select Option</Text>
              <View style={styles.variantGrid}>
                {variants.map(({ node: v }: any) => (
                  <TouchableOpacity
                    key={v.id}
                    style={[
                      styles.variantChip,
                      selectedVariant?.id === v.id && styles.variantChipActive,
                      !v.availableForSale && styles.variantChipDisabled,
                    ]}
                    onPress={() => v.availableForSale && setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                  >
                    <Text
                      style={[
                        styles.variantChipText,
                        selectedVariant?.id === v.id && styles.variantChipTextActive,
                      ]}
                    >
                      {v.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          {product.description ? (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>About this product</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          ) : null}

          {/* Features */}
          <View style={styles.featuresCard}>
            {[
              { icon: '🔬', text: 'Lab-tested for purity & potency' },
              { icon: '🌿', text: 'Natural, non-GMO ingredients' },
              { icon: '✅', text: 'Third-party quality verified' },
              { icon: '📦', text: 'Fast, tracked shipping' },
            ].map((f) => (
              <View key={f.text} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky add-to-cart footer */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceLabel}>Price</Text>
          <Text style={styles.footerPriceValue}>
            {price?.currencyCode} {parseFloat(price?.amount ?? '0').toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  errorIcon: { fontSize: 40, marginBottom: spacing.md },
  errorTitle: { color: colors.foreground, fontSize: fontSize.xl, fontWeight: fontWeight.bold, marginBottom: spacing.sm },
  errorDesc: { color: colors.mutedForeground, fontSize: fontSize.base, textAlign: 'center' },

  heroImage: {
    width,
    height: 320,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbStrip: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbActive: {
    borderColor: colors.accent,
  },

  body: {
    padding: spacing.xl,
  },
  title: {
    color: colors.foreground,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    lineHeight: 32,
    marginBottom: spacing.sm,
  },
  price: {
    color: colors.accent,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
  },

  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },

  variantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  variantChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  variantChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '22',
  },
  variantChipDisabled: {
    opacity: 0.4,
  },
  variantChipText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  variantChipTextActive: {
    color: colors.accent,
    fontWeight: fontWeight.bold,
  },

  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.base,
    lineHeight: 24,
  },

  featuresCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  featureText: {
    color: colors.foreground,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    flex: 1,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  footerPrice: {
    flex: 1,
  },
  footerPriceLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  footerPriceValue: {
    color: colors.accent,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  addBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flex: 1,
    alignItems: 'center',
  },
  addBtnText: {
    color: colors.accentForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
});
