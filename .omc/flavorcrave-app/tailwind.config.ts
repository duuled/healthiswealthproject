import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#E8602C',
          50: '#fef3ee',
          100: '#fde4d3',
          200: '#fbc5a5',
          300: '#f89d6d',
          400: '#f46b32',
          500: '#E8602C',
          600: '#c94e1f',
          700: '#a83d1a',
          800: '#8a3019',
          900: '#722a17',
        },
        'deep-brown': '#1a0a00',
        'warm-cream': '#FDF6EC',
        'rich-green': '#2D5016',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #7a3210 100%)',
        'card-gradient-soul':
          'linear-gradient(135deg, #3d1a00 0%, #7a3210 50%, #e8602c 100%)',
        'card-gradient-caribbean':
          'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #d97706 100%)',
        'card-gradient-african':
          'linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #fbbf24 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
