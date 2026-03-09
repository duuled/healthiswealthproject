import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, radius, fontSize, fontWeight } from '@/theme';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { ShopStackParamList } from '@/navigation';

type ShopNav = NativeStackNavigationProp<ShopStackParamList, 'ShopList'>;

interface Props {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: Props) {
  const navigation = useNavigation<ShopNav>();
  const addItem = useCartStore((s) => s.addItem);
  const { node } = product;

  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = () => {
    if (!firstVariant) {
      Alert.alert('Unavailable', 'This product has no available variants.');
      return;
    }
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    Alert.alert('Added!', `${node.title} added to your cart.`);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ProductDetail', { handle: node.handle, title: node.title })}
    >
      {image ? (
        <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderIcon}>🛍</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {node.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {node.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </Text>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
            <Text style={styles.addBtnText}>+ Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    flex: 1,
    margin: spacing.sm / 2,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.surfaceElevated,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
  },
  body: {
    padding: spacing.md,
  },
  title: {
    color: colors.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.accent,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  addBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  addBtnText: {
    color: colors.accentForeground,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
});
