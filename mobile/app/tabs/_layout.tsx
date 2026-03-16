import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useCartStore } from '@/stores/cartStore';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '⌂',
    Shop: '⚘',
    Supplements: '❋',
    Cart: '⊡',
    Profile: '◉',
  };
  return (
    <View style={tabStyles.iconWrap}>
      <Text style={[tabStyles.icon, focused && tabStyles.iconFocused]}>
        {icons[name] ?? '•'}
      </Text>
      <Text style={[tabStyles.label, focused && tabStyles.labelFocused]} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const totalItems = useCartStore(s => s.totalItems());
  return (
    <View style={tabStyles.iconWrap}>
      <View>
        <Text style={[tabStyles.icon, focused && tabStyles.iconFocused]}>⊡</Text>
        {totalItems > 0 && (
          <View style={tabStyles.badge}>
            <Text style={tabStyles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
          </View>
        )}
      </View>
      <Text style={[tabStyles.label, focused && tabStyles.labelFocused]}>Cart</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    paddingTop: 4,
    minWidth: 50,
  },
  icon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  iconFocused: {
    color: '#D4AF37',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  labelFocused: {
    color: '#D4AF37',
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Shop" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="supplements"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Supplements" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
