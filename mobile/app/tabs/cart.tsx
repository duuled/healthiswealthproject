import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCartStore } from '@/stores/cartStore';
import { createCheckout } from '@/lib/shopify';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const url = await createCheckout(
        items.map(i => ({ variantId: i.variantId, quantity: i.quantity })),
      );
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Checkout Error', 'Unable to open checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>⊡</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some wellness products to get started.</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => router.push('/shop')}
            activeOpacity={0.85}
          >
            <Text style={styles.shopBtnText}>Browse Shop</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Cart</Text>
        <TouchableOpacity onPress={() => Alert.alert('Clear Cart', 'Remove all items?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', style: 'destructive', onPress: clearCart },
        ])}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={i => i.variantId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
            ) : (
              <View style={[styles.itemImage, styles.imagePlaceholder]} />
            )}

            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              {item.variantTitle !== 'Default Title' && (
                <Text style={styles.itemVariant}>{item.variantTitle}</Text>
              )}
              <Text style={styles.itemPrice}>
                ${parseFloat(item.price.amount).toFixed(2)}
              </Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.variantId, item.quantity - 1)}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.variantId, item.quantity + 1)}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeItem(item.variantId)}
            >
              <Text style={styles.removeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({totalItems()})</Text>
              <Text style={styles.summaryValue}>${totalPrice().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Calculated at checkout</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice().toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleCheckout}
              disabled={isCheckingOut}
              activeOpacity={0.85}
            >
              {isCheckingOut ? (
                <ActivityIndicator color="#1A1A1A" />
              ) : (
                <Text style={styles.checkoutBtnText}>Checkout via Shopify →</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.checkoutNote}>
              Secure checkout powered by Shopify
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  clearText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '600',
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    gap: 12,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    flexShrink: 0,
  },
  imagePlaceholder: {
    backgroundColor: '#F3F4F6',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 20,
    marginBottom: 2,
  },
  itemVariant: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: 10,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    padding: 4,
    marginTop: 2,
  },
  removeBtnText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },

  summary: {
    marginTop: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  checkoutBtn: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutBtnText: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  checkoutNote: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
  },
  shopBtn: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
  },
  shopBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
