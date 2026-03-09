// Design tokens matching the web app's dark theme
export const colors = {
  background: '#0d0d0d',
  surface: '#141414',
  surfaceElevated: '#1e1e1e',
  border: '#2a2a2a',
  accent: '#f5ab00',       // hsl(45, 100%, 51%) — gold
  accentForeground: '#0d0d0d',
  green: '#82c67a',        // hsl(122, 31%, 72%) — wellness green
  foreground: '#fafafa',
  mutedForeground: '#8a9dc0',
  error: '#ef4444',
  white: '#ffffff',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 38,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};
