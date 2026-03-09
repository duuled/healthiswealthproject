import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { colors, spacing, radius, fontSize, fontWeight } from '@/theme';
import { RootTabParamList } from '@/navigation';

type HomeNav = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const { width } = Dimensions.get('window');

const BENEFITS = [
  { icon: '🌿', title: 'Pure Ingredients', desc: 'Lab-tested, organic, non-GMO supplements' },
  { icon: '⚡', title: 'Maximum Potency', desc: 'High-absorption formulas for real results' },
  { icon: '🛡️', title: 'Quality Guaranteed', desc: 'Third-party verified purity & safety' },
  { icon: '🚀', title: 'Fast Shipping', desc: 'Quick delivery to your door' },
];

const CATEGORIES = [
  { icon: '💪', label: 'Immunity', color: '#4ade80' },
  { icon: '⚡', label: 'Energy', color: '#f5ab00' },
  { icon: '🧠', label: 'Focus', color: '#818cf8' },
  { icon: '❤️', label: 'Heart Health', color: '#f87171' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeNav>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>🌿 Premium Wellness</Text>
        </View>
        <Text style={styles.heroTitle}>
          Health Is{'\n'}
          <Text style={styles.heroAccent}>Wealth</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Supercharge your body with nature's most potent ingredients.
          Science-backed, purity-tested, results-driven.
        </Text>

        <View style={styles.heroButtons}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.primaryBtnText}>Shop Now →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate('Mission')}
          >
            <Text style={styles.secondaryBtnText}>Our Mission</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <View style={styles.statsBar}>
        {[
          { value: '50K+', label: 'Customers' },
          { value: '4.8★', label: 'Rating' },
          { value: '100%', label: 'Natural' },
        ].map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Goal</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.label}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Shop')}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={[styles.categoryLabel, { color: cat.color }]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Benefits ──────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        {BENEFITS.map((b) => (
          <View key={b.title} style={styles.benefitRow}>
            <View style={styles.benefitIcon}>
              <Text style={styles.benefitIconText}>{b.icon}</Text>
            </View>
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>{b.title}</Text>
              <Text style={styles.benefitDesc}>{b.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* ── CTA banner ────────────────────────────────────────────────────── */}
      <View style={styles.ctaBanner}>
        <Text style={styles.ctaTitle}>Ready to transform{'\n'}your health?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands who have elevated their wellness journey.
        </Text>
        <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Shop')}>
          <Text style={styles.ctaBtnText}>Explore All Products →</Text>
        </TouchableOpacity>
      </View>

      {/* ── Testimonial ───────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What People Say</Text>
        {[
          {
            name: 'Marcus T.',
            text: 'The moringa powder is incredible — I feel more energetic and focused every single day.',
            stars: 5,
          },
          {
            name: 'Alicia R.',
            text: 'Amla powder changed my skin and immunity. I will never go back to synthetic vitamins.',
            stars: 5,
          },
        ].map((t) => (
          <View key={t.name} style={styles.testimonialCard}>
            <Text style={styles.testimonialStars}>{'★'.repeat(t.stars)}</Text>
            <Text style={styles.testimonialText}>"{t.text}"</Text>
            <Text style={styles.testimonialName}>— {t.name}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },

  // Hero
  hero: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.accent + '44',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  heroBadgeText: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  heroTitle: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.extrabold,
    color: colors.foreground,
    lineHeight: 46,
    marginBottom: spacing.md,
  },
  heroAccent: {
    color: colors.accent,
  },
  heroSubtitle: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flex: 1,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: colors.accentForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  secondaryBtn: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: colors.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },

  // Stats
  statsBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statValue: {
    color: colors.accent,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  statLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    marginTop: 2,
  },

  // Sections
  section: {
    padding: spacing.xl,
    paddingBottom: 0,
  },
  sectionTitle: {
    color: colors.foreground,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
  },

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryLabel: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },

  // Benefits
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitIconText: {
    fontSize: 22,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    color: colors.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  benefitDesc: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: 18,
  },

  // CTA Banner
  ctaBanner: {
    margin: spacing.xl,
    backgroundColor: colors.accent + '18',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accent + '44',
    padding: spacing.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    color: colors.foreground,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  ctaBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  ctaBtnText: {
    color: colors.accentForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },

  // Testimonials
  testimonialCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  testimonialStars: {
    color: colors.accent,
    fontSize: fontSize.base,
    marginBottom: spacing.sm,
  },
  testimonialText: {
    color: colors.foreground,
    fontSize: fontSize.base,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  testimonialName: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
