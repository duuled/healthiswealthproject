import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

type Tab = 'orders' | 'wishlist' | 'settings';

export default function ProfileScreen() {
  const { user, profile, signOut, updateProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [city, setCity] = useState(profile?.city ?? '');
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator color="#D4AF37" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.authPrompt}>
          <Text style={styles.authIcon}>◉</Text>
          <Text style={styles.authTitle}>Your Account</Text>
          <Text style={styles.authSub}>
            Sign in to track orders, save items, and manage your profile.
          </Text>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.signInBtnText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push('/auth/register')}
            activeOpacity={0.85}
          >
            <Text style={styles.registerBtnText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ full_name: fullName, phone, city });
      Alert.alert('Saved', 'Profile updated successfully.');
    } catch {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  };

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'orders', label: 'Orders', icon: '📦' },
    { key: 'wishlist', label: 'Wishlist', icon: '♡' },
    { key: 'settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* User Banner */}
        <View style={styles.banner}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>
              {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerName}>{profile?.full_name || 'Wellness Member'}</Text>
            <Text style={styles.bannerEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tab, activeTab === t.key && styles.tabActive]}
              onPress={() => setActiveTab(t.key)}
            >
              <Text style={styles.tabIcon}>{t.icon}</Text>
              <Text style={[styles.tabLabel, activeTab === t.key && styles.tabLabelActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {activeTab === 'orders' && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptySub}>Your order history will appear here.</Text>
              <TouchableOpacity
                style={styles.browseBtn}
                onPress={() => router.push('/shop')}
              >
                <Text style={styles.browseBtnText}>Start Shopping</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'wishlist' && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>♡</Text>
              <Text style={styles.emptyTitle}>No saved items</Text>
              <Text style={styles.emptySub}>Save products to your wishlist while browsing.</Text>
              <TouchableOpacity
                style={styles.browseBtn}
                onPress={() => router.push('/shop')}
              >
                <Text style={styles.browseBtnText}>Browse Products</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'settings' && (
            <View style={styles.settingsForm}>
              <Text style={styles.settingsTitle}>Profile & Settings</Text>

              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Jane Doe"
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="Venice"
                placeholderTextColor="#9CA3AF"
              />

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
                disabled={isSaving}
                activeOpacity={0.85}
              >
                {isSaving ? (
                  <ActivityIndicator color="#1A1A1A" />
                ) : (
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  authPrompt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  authIcon: { fontSize: 56, marginBottom: 16 },
  authTitle: { fontSize: 26, fontWeight: '800', color: '#1A1A1A', marginBottom: 8 },
  authSub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  signInBtn: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  signInBtnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 0.5 },
  registerBtn: {
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  registerBtnText: { color: '#1A1A1A', fontSize: 15, fontWeight: '700' },

  banner: {
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  bannerInfo: { flex: 1 },
  bannerName: { fontSize: 16, fontWeight: '700', color: '#fff' },
  bannerEmail: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  signOutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#374151',
  },
  signOutText: { color: '#9CA3AF', fontSize: 12, fontWeight: '600' },

  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#D4AF37' },
  tabIcon: { fontSize: 18 },
  tabLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF' },
  tabLabelActive: { color: '#D4AF37' },

  content: { padding: 16 },

  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 6 },
  emptySub: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  browseBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseBtnText: { color: '#1A1A1A', fontSize: 13, fontWeight: '800' },

  settingsForm: { gap: 4 },
  settingsTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A1A',
    backgroundColor: '#F9FAFB',
  },
  saveBtn: {
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: { color: '#1A1A1A', fontSize: 15, fontWeight: '800' },
});
