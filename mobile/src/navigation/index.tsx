import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/theme';
import { useCartStore } from '@/stores/cartStore';

import HomeScreen from '@/screens/HomeScreen';
import ShopScreen from '@/screens/ShopScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import CartScreen from '@/screens/CartScreen';
import MissionScreen from '@/screens/MissionScreen';

// ─── Type declarations ────────────────────────────────────────────────────────

export type ShopStackParamList = {
  ShopList: undefined;
  ProductDetail: { handle: string; title: string };
};

export type RootTabParamList = {
  Home: undefined;
  Shop: undefined;
  Cart: undefined;
  Mission: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const ShopStack = createNativeStackNavigator<ShopStackParamList>();

// ─── Icons ────────────────────────────────────────────────────────────────────

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '⌂',
    Shop: '◫',
    Cart: '⊡',
    Mission: '♥',
  };
  return (
    <Text style={{ fontSize: 20, color: focused ? colors.accent : colors.mutedForeground }}>
      {icons[name]}
    </Text>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
  return (
    <View>
      <TabIcon name="Cart" focused={focused} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Shop stack (Shop list → Product detail) ─────────────────────────────────

function ShopNavigator() {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontWeight: '700', color: colors.foreground },
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <ShopStack.Screen
        name="ShopList"
        component={ShopScreen}
        options={{ title: 'Shop' }}
      />
      <ShopStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </ShopStack.Navigator>
  );
}

// ─── Root tab navigator ───────────────────────────────────────────────────────

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.mutedForeground,
          tabBarLabelStyle: styles.tabLabel,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.foreground,
          headerTitleStyle: { fontWeight: '700', color: colors.foreground },
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Cart') return <CartTabIcon focused={focused} />;
            return <TabIcon name={route.name} focused={focused} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen
          name="Shop"
          component={ShopNavigator}
          options={{ headerShown: false, title: 'Shop' }}
        />
        <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'My Cart' }} />
        <Tab.Screen name="Mission" component={MissionScreen} options={{ title: 'Our Mission' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    height: 60,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.accent,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.accentForeground,
    fontSize: 9,
    fontWeight: '700',
  },
});
