import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://theflavorcrave.com'),
  title: {
    default: 'The Flavor Crave',
    template: '%s | The Flavor Crave',
  },
  description:
    'Authentic soul food, Caribbean, and West African recipes. The recipes your grandma never wrote down — finally documented.',
  openGraph: {
    type: 'website',
    siteName: 'The Flavor Crave',
    title: 'The Flavor Crave',
    description:
      'Authentic soul food, Caribbean, and West African recipes. The recipes your grandma never wrote down — finally documented.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Flavor Crave — Authentic Soul Food, Caribbean, and West African Recipes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Flavor Crave',
    description:
      'Authentic soul food, Caribbean, and West African recipes. The recipes your grandma never wrote down.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const NAV_LINKS = [
  { href: '/recipes', label: 'Recipes' },
  { href: '/category/soul-food', label: 'Soul Food' },
  { href: '/category/caribbean', label: 'Caribbean' },
  { href: '/category/west-african', label: 'West African' },
  { href: '/category/budget', label: 'Budget Meals' },
  { href: '/free-recipes', label: 'Free Ebook', highlight: true },
] as const;

function SiteNav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-orange-900/20"
      style={{ backgroundColor: 'var(--deep-brown)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-tight text-white hover:text-orange-400 transition-colors"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            The Flavor Crave
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--orange)' }}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile: just the ebook CTA */}
          <div className="lg:hidden">
            <Link
              href="/free-recipes"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--orange)' }}
            >
              Free Ebook
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer
      className="border-t border-orange-900/20 py-12"
      style={{ backgroundColor: 'var(--deep-brown)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p
              className="font-serif text-xl font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              The Flavor Crave
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              The recipes your grandma never wrote down — finally documented.
              Authentic soul food, Caribbean, and West African recipes for busy families.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Explore
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Affiliate Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <p className="text-xs text-gray-600 mt-6">
              &copy; {new Date().getFullYear()} The Flavor Crave. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID ?? 'ca-pub-YOUR_ADSENSE_ID';

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google AdSense — replace placeholder with real publisher ID */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
