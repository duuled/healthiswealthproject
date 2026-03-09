# Health Is Wealth — Mobile App

React Native + Expo mobile app for the Health Is Wealth Store.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Expo SDK 52 / React Native 0.76 |
| Navigation | React Navigation 6 (bottom tabs + native stack) |
| Data fetching | TanStack React Query 5 |
| Cart state | Zustand 5 + AsyncStorage persistence |
| Commerce | Shopify Storefront API (same GraphQL queries as web) |
| Language | TypeScript |

## Screens

| Tab | Screens |
|---|---|
| Home | Landing page with hero, categories, benefits, testimonials |
| Shop | Product grid (Shopify) → Product Detail (variants, add to cart) |
| Cart | Cart items, qty controls, Shopify checkout (opens in browser) |
| Mission | Brand story, pillars, quality promise |

## Getting Started

```bash
cd mobile
npm install
npm start        # Expo dev server
npm run ios      # iOS simulator
npm run android  # Android emulator
```

> Requires Expo Go on your device or an iOS/Android simulator.

## Project Structure

```
mobile/
├── App.tsx               # Root: QueryClientProvider + NavigationContainer
├── src/
│   ├── theme.ts          # Design tokens (colors, spacing, typography)
│   ├── navigation/       # Tab + stack navigators
│   ├── screens/          # HomeScreen, ShopScreen, ProductDetailScreen, CartScreen, MissionScreen
│   ├── components/       # ProductCard
│   ├── lib/shopify.ts    # Shopify Storefront API (ported from web)
│   └── stores/           # Zustand cart store (AsyncStorage instead of localStorage)
├── app.json              # Expo config
└── package.json
```

## Key Differences from the Web App

- `localStorage` → `@react-native-async-storage/async-storage` for cart persistence
- `react-router-dom` → `@react-navigation/native` (bottom tabs + stacks)
- Tailwind CSS → `StyleSheet.create()` with shared design tokens from `src/theme.ts`
- `sonner` toasts → `Alert.alert()` for native alerts
- Checkout opens via `Linking.openURL()` (Shopify web checkout in browser)
- No shadcn/ui — pure React Native components

## Environment

The Shopify credentials are the same as the web app and are embedded in `src/lib/shopify.ts`.
To move them to env vars, use `expo-constants` with `app.config.js`.
