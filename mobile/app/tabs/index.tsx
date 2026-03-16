import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    icon: '❋',
    title: 'Premium Supplements',
    desc: 'Curated wellness products backed by science and nature.',
  },
  {
    icon: '⚘',
    title: 'Plant-Based Power',
    desc: 'Moringa, Ashwagandha, Sea Moss — nature\'s finest superfoods.',
  },
  {
    icon: '◎',
    title: 'Community Driven',
    desc: 'Built by a 16-year-old from Venice Beach who believes in real health.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Maria K.',
    text: 'The sea moss gummies changed my energy levels completely. I feel like a different person!',
    rating: 5,
  },
  {
    name: 'Jordan T.',
    text: 'Finally a brand that keeps it real. No fluff, just quality supplements.',
    rating: 5,
  },
  {
    name: 'Alex R.',
    text: 'Moringa powder in my smoothies every morning. Game changer.',
    rating: 5,
  },
];

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, source: 'mobile', is_active: true }, { onConflict: 'email' });

    setIsLoading(false);
    if (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } else {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>WELLNESS · STRENGTH · COMMUNITY</Text>
          <Text style={styles.heroTitle}>HEALTH IS{'\n'}WEALTH</Text>
          <Text style={styles.heroSub}>
            Premium supplements and apparel for those who invest in their wellbeing.
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => router.push('/shop')}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimaryText}>SHOP NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => router.push('/supplements')}
              activeOpacity={0.85}
            >
              <Text style={styles.btnOutlineText}>SUPPLEMENTS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Health Is Wealth?</Text>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Shop */}
        <TouchableOpacity
          style={styles.ctaBanner}
          onPress={() => router.push('/shop')}
          activeOpacity={0.88}
        >
          <Text style={styles.ctaTitle}>Power of 5 Bundle</Text>
          <Text style={styles.ctaSub}>Moringa · Ashwagandha · Sea Moss · Berberine · Shilajit</Text>
          <Text style={styles.ctaLink}>Shop Now →</Text>
        </TouchableOpacity>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Our Community Says</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsRow}>
            {TESTIMONIALS.map((t, i) => (
              <View key={i} style={styles.testimonialCard}>
                <Text style={styles.testimonialStars}>{'★'.repeat(t.rating)}</Text>
                <Text style={styles.testimonialText}>"{t.text}"</Text>
                <Text style={styles.testimonialName}>— {t.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Newsletter */}
        <View style={styles.newsletter}>
          <Text style={styles.newsletterTitle}>Join the Movement</Text>
          <Text style={styles.newsletterSub}>
            Get wellness tips, new drops, and exclusive discounts.
          </Text>
          {subscribed ? (
            <View style={styles.subscribedBox}>
              <Text style={styles.subscribedText}>You're in! Welcome to the community. ✓</Text>
            </View>
          ) : (
            <View style={styles.newsletterForm}>
              <TextInput
                style={styles.newsletterInput}
                placeholder="your@email.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.newsletterBtn}
                onPress={handleSubscribe}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                <Text style={styles.newsletterBtnText}>{isLoading ? '…' : 'Subscribe'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  hero: {
    backgroundColor: '#1A1A1A',
    padding: 32,
    paddingTop: 48,
    paddingBottom: 48,
    alignItems: 'center',
  },
  heroEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 12,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 4,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 16,
  },
  heroSub: {
    color: '#D1D5DB',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: width * 0.75,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  btnPrimaryText: {
    color: '#1A1A1A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  btnOutlineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  featureIcon: {
    fontSize: 28,
    marginTop: 2,
  },
  featureText: { flex: 1 },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },

  ctaBanner: {
    marginHorizontal: 24,
    backgroundColor: '#D4AF37',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  ctaSub: {
    fontSize: 12,
    color: '#4B3D0A',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  ctaLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: 1,
  },

  testimonialsRow: { marginHorizontal: -24 },
  testimonialCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 18,
    width: 260,
    marginLeft: 24,
    marginRight: 8,
  },
  testimonialStars: {
    color: '#D4AF37',
    fontSize: 14,
    marginBottom: 8,
  },
  testimonialText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  testimonialName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  newsletter: {
    backgroundColor: '#1A1A1A',
    margin: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  newsletterTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  newsletterSub: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  newsletterForm: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#374151',
  },
  newsletterBtn: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  newsletterBtnText: {
    color: '#1A1A1A',
    fontWeight: '800',
    fontSize: 13,
  },
  subscribedBox: {
    backgroundColor: '#064E3B',
    borderRadius: 8,
    padding: 14,
    width: '100%',
    alignItems: 'center',
  },
  subscribedText: {
    color: '#6EE7B7',
    fontSize: 14,
    fontWeight: '600',
  },
});
