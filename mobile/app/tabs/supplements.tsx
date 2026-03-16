import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const CATEGORIES = ['All', 'Immunity', 'Energy', 'Joint Health', 'Adaptogens'];

const SUPPLEMENTS = [
  {
    id: '1',
    name: 'Moringa Leaf Powder',
    category: 'Immunity',
    description: 'Nature\'s multivitamin — packed with vitamins A, C, E, calcium, and protein. Supports immunity and energy.',
    benefits: ['Immune Support', 'Energy Boost', 'Anti-Inflammatory'],
    icon: '🌿',
    color: '#ECFDF5',
    textColor: '#064E3B',
  },
  {
    id: '2',
    name: 'Ashwagandha Root',
    category: 'Adaptogens',
    description: 'An ancient adaptogen that helps your body manage stress and boosts testosterone and fertility.',
    benefits: ['Stress Relief', 'Testosterone', 'Sleep Quality'],
    icon: '🌱',
    color: '#FEF3C7',
    textColor: '#78350F',
  },
  {
    id: '3',
    name: 'Sea Moss Gummies',
    category: 'Immunity',
    description: 'Contains 92 of the 102 minerals your body needs. Supports thyroid, digestion, and skin health.',
    benefits: ['92 Minerals', 'Thyroid Health', 'Skin Glow'],
    icon: '🌊',
    color: '#EFF6FF',
    textColor: '#1E3A8A',
  },
  {
    id: '4',
    name: 'Berberine Complex',
    category: 'Energy',
    description: 'Clinically studied compound that supports healthy blood sugar levels and metabolic health.',
    benefits: ['Blood Sugar', 'Metabolism', 'Heart Health'],
    icon: '💛',
    color: '#FFFBEB',
    textColor: '#92400E',
  },
  {
    id: '5',
    name: 'Pure Shilajit',
    category: 'Energy',
    description: 'Himalayan resin rich in fulvic acid and 80+ minerals. Enhances energy, cognition, and longevity.',
    benefits: ['Fulvic Acid', 'Brain Clarity', 'Longevity'],
    icon: '🏔️',
    color: '#F5F3FF',
    textColor: '#4C1D95',
  },
  {
    id: '6',
    name: 'Astragalus Extract',
    category: 'Adaptogens',
    description: 'Traditional Chinese herb that activates telomerase, supporting cellular aging and immune function.',
    benefits: ['Anti-Aging', 'Immune Defense', 'Energy'],
    icon: '✨',
    color: '#FFF1F2',
    textColor: '#881337',
  },
  {
    id: '7',
    name: 'Magnesium Glycinate',
    category: 'Energy',
    description: 'The most bioavailable form of magnesium. Essential for 300+ enzymatic reactions in the body.',
    benefits: ['Sleep', 'Muscle Recovery', 'Mood'],
    icon: '💊',
    color: '#F0FDF4',
    textColor: '#14532D',
  },
  {
    id: '8',
    name: 'Joint Support Formula',
    category: 'Joint Health',
    description: 'Glucosamine, chondroitin, and turmeric blend for joint comfort and mobility.',
    benefits: ['Joint Comfort', 'Mobility', 'Anti-Inflammatory'],
    icon: '🦴',
    color: '#FFF7ED',
    textColor: '#7C2D12',
  },
];

export default function SupplementsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? SUPPLEMENTS
    : SUPPLEMENTS.filter(s => s.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>POWER OF 5 COLLECTION</Text>
          <Text style={styles.title}>Elite Wellness{'\n'}Supplements</Text>
          <Text style={styles.subtitle}>
            Scientifically curated. Nature-powered. Life-changing.
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.categoryChipText, activeCategory === cat && styles.categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Supplement Cards */}
        <View style={styles.cards}>
          {filtered.map(supp => (
            <View key={supp.id} style={[styles.card, { backgroundColor: supp.color }]}>
              <View style={styles.cardTop}>
                <Text style={styles.cardIcon}>{supp.icon}</Text>
                <View style={styles.cardMeta}>
                  <Text style={[styles.cardCategory, { color: supp.textColor }]}>
                    {supp.category}
                  </Text>
                  <Text style={styles.cardName}>{supp.name}</Text>
                </View>
              </View>

              <Text style={styles.cardDesc}>{supp.description}</Text>

              <View style={styles.benefitsRow}>
                {supp.benefits.map(b => (
                  <View key={b} style={[styles.benefitChip, { borderColor: supp.textColor + '40' }]}>
                    <Text style={[styles.benefitText, { color: supp.textColor }]}>{b}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.shopBtn}
                onPress={() => router.push('/shop')}
                activeOpacity={0.85}
              >
                <Text style={styles.shopBtnText}>Shop Now →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#1A1A1A',
    padding: 28,
    paddingTop: 32,
  },
  eyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 20,
  },

  categoriesScroll: { marginTop: 16 },
  categoriesContent: { paddingHorizontal: 16, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1A1A1A',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#D4AF37',
  },

  cards: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 4,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  cardIcon: { fontSize: 36 },
  cardMeta: { flex: 1 },
  cardCategory: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 22,
  },
  cardDesc: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 14,
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  benefitChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  benefitText: {
    fontSize: 11,
    fontWeight: '600',
  },
  shopBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  shopBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
