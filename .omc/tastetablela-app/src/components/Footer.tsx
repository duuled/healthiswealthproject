import Link from 'next/link';
import { NEIGHBORHOODS } from '@/data/spots';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-2xl font-bold" style={{ color: '#FF4B2B' }}>
                TasteTable
              </span>
              <span className="text-2xl font-bold text-[#f5f5f5]">LA</span>
            </Link>
            <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-xs">
              Your plug for the real LA food scene. No tourists allowed.
            </p>
            <p className="text-xs text-[#6b6b6b] mt-6 italic border-l-2 border-[#FF4B2B]/40 pl-3">
              No influencer lists. Just real spots.
            </p>
          </div>

          {/* Neighborhoods */}
          <div>
            <p className="section-label mb-4">Neighborhoods</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NEIGHBORHOODS.map((neighborhood) => (
                <li key={neighborhood}>
                  <Link
                    href={`/neighborhood/${neighborhood.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-[#a3a3a3] hover:text-[#FF4B2B] transition-colors duration-150"
                  >
                    {neighborhood}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <p className="section-label mb-4">Explore</p>
            <ul className="space-y-2">
              {[
                { label: 'All Spots', href: '/spots' },
                { label: 'Hidden Gems', href: '/spots?filter=hidden' },
                { label: 'Submit a Spot', href: '/submit' },
                { label: 'Get the LA Food Map', href: '/#food-map' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a3a3a3] hover:text-[#FF4B2B] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-glow mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b6b6b]">
          <p>
            &copy; {new Date().getFullYear()} Taste Table LA. All rights reserved.
          </p>
          <p className="text-center">
            Built for Boyle Heights, K-town, Leimert, Inglewood, and everyone
            else who actually lives here.
          </p>
        </div>
      </div>
    </footer>
  );
}
