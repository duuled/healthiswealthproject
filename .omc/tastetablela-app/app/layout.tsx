import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Taste Table LA — The Real LA Food Scene',
    template: '%s | Taste Table LA',
  },
  description:
    'Your plug for the real LA food scene. No Yelp. No tourists. Just spots your city actually eats at — hidden gems, neighborhood guides, and honest reviews.',
  keywords: [
    'LA food',
    'Los Angeles restaurants',
    'hidden gems LA',
    'Koreatown food',
    'Boyle Heights tacos',
    'Leimert Park soul food',
    'local LA eats',
    'best tacos LA',
  ],
  metadataBase: new URL('https://tastetablela.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Taste Table LA',
    title: 'Taste Table LA — The Real LA Food Scene',
    description:
      'Your plug for the real LA food scene. No tourists allowed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taste Table LA — The Real LA Food Scene',
    description: 'Your plug for the real LA food scene. No tourists allowed.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-[#0d0d0d] text-[#f5f5f5] font-sans antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
