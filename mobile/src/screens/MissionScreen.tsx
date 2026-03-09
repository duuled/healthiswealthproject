import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight } from '@/theme';

const PILLARS = [
  {
    icon: '🌿',
    title: 'Pure & Natural',
    desc: 'We source only the cleanest, most potent natural ingredients from sustainable farms worldwide.',
  },
  {
    icon: '🔬',
    title: 'Science-Backed',
    desc: 'Every product is backed by peer-reviewed research and third-party lab testing for purity.',
  },
  {
    icon: '🌍',
    title: 'Sustainability',
    desc: 'We partner with ethical suppliers and eco-conscious manufacturers to protect our planet.',
  },
  {
    icon: '❤️',
    title: 'Community',
    desc: 'Your health journey matters. We are with you every step of the way.',
  },
];

const TEAM_BELIEFS = [
  'Real food, real nutrients — not synthetic shortcuts.',
  'Transparency in every ingredient and process.',
  'Wellness is a lifestyle, not a quick fix.',
  'Every body deserves access to quality supplements.',
];

export default function MissionScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Our Purpose</Text>
        <Text style={styles.heroTitle}>
          We believe{' '}
          <Text style={styles.heroAccent}>health is the greatest wealth</Text>
          {' '}you can own.
        </Text>
        <Text style={styles.heroSubtitle}>
          Founded on the principle that nature provides the most powerful medicine,
          Health Is Wealth Store curates only the finest organic supplements for
          your body, mind, and spirit.
        </Text>
      </View>

      {/* Pillars */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Stand For</Text>
        {PILLARS.map((p) => (
          <View key={p.title} style={styles.pillarCard}>
            <Text style={styles.pillarIcon}>{p.icon}</Text>
            <View style={styles.pillarText}>
              <Text style={styles.pillarTitle}>{p.title}</Text>
              <Text style={styles.pillarDesc}>{p.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Story */}
      <View style={styles.storyCard}>
        <Text style={styles.storyLabel}>Our Story</Text>
        <Text style={styles.storyText}>
          Health Is Wealth Store was born out of frustration with an industry full of
          misleading labels, synthetic fillers, and empty promises. Our founders set out
          to build something different — a store where every single product earns its place
          through rigorous quality standards, third-party testing, and transparent sourcing.
        </Text>
        <Text style={styles.storyText}>
          We started with the "Power of 5" — five of nature's most studied superfoods —
          and have grown into a curated marketplace of wellness essentials trusted by
          thousands of customers across the country.
        </Text>
      </View>

      {/* Beliefs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Believe</Text>
        {TEAM_BELIEFS.map((belief) => (
          <View key={belief} style={styles.beliefRow}>
            <Text style={styles.beliefBullet}>✦</Text>
            <Text style={styles.beliefText}>{belief}</Text>
          </View>
        ))}
      </View>

      {/* Quality promise */}
      <View style={styles.promiseCard}>
        <Text style={styles.promiseTitle}>The Quality Promise</Text>
        <View style={styles.promiseGrid}>
          {[
            { icon: '🧪', label: 'Lab Tested' },
            { icon: '🌱', label: 'Organic' },
            { icon: '🚫', label: 'No GMOs' },
            { icon: '✅', label: 'Verified' },
          ].map((item) => (
            <View key={item.label} style={styles.promiseBadge}>
              <Text style={styles.promiseBadgeIcon}>{item.icon}</Text>
              <Text style={styles.promiseBadgeLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => Linking.openURL('mailto:hello@healthiswealthstore.com')}
        >
          <Text style={styles.contactBtnText}>📧  hello@healthiswealthstore.com</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contactBtn, { marginTop: spacing.sm }]}
          onPress={() => Linking.openURL('https://healthiswealthstore.com')}
        >
          <Text style={styles.contactBtnText}>🌐  healthiswealthstore.com</Text>
        </TouchableOpacity>
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

  hero: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.foreground,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    lineHeight: 40,
    marginBottom: spacing.md,
  },
  heroAccent: {
    color: colors.accent,
  },
  heroSubtitle: {
    color: colors.mutedForeground,
    fontSize: fontSize.base,
    lineHeight: 24,
  },

  section: {
    padding: spacing.xl,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.foreground,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
  },

  pillarCard: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'flex-start',
  },
  pillarIcon: {
    fontSize: 28,
    width: 40,
    textAlign: 'center',
    marginTop: 2,
  },
  pillarText: {
    flex: 1,
  },
  pillarTitle: {
    color: colors.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  pillarDesc: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },

  storyCard: {
    margin: spacing.xl,
    marginTop: spacing.sm,
    backgroundColor: colors.accent + '14',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accent + '33',
    padding: spacing.xl,
    gap: spacing.md,
  },
  storyLabel: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  storyText: {
    color: colors.foreground,
    fontSize: fontSize.base,
    lineHeight: 26,
  },

  beliefRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  beliefBullet: {
    color: colors.accent,
    fontSize: fontSize.base,
    marginTop: 2,
  },
  beliefText: {
    color: colors.foreground,
    fontSize: fontSize.base,
    lineHeight: 24,
    flex: 1,
  },

  promiseCard: {
    margin: spacing.xl,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  promiseTitle: {
    color: colors.foreground,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  promiseGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  promiseBadge: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  promiseBadgeIcon: {
    fontSize: 28,
  },
  promiseBadgeLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  contactBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  contactBtnText: {
    color: colors.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
});
