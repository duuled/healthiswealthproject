'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Explore', href: '/spots' },
  { label: 'Neighborhoods', href: '/neighborhood' },
  { label: 'Hidden Gems', href: '/spots?filter=hidden' },
  { label: 'Submit a Spot', href: '/submit' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-[#0d0d0d]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: '#FF4B2B' }}
            >
              TasteTable
            </span>
            <span className="text-xl font-bold tracking-tight text-[#f5f5f5]">
              LA
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    link.label === 'Submit a Spot'
                      ? 'btn-primary text-sm py-2 px-4 ml-2'
                      : isActive
                      ? 'text-[#FF4B2B] bg-[#FF4B2B]/10'
                      : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-[#f5f5f5] transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#f5f5f5] transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#f5f5f5] transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1 bg-[#0d0d0d]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  link.label === 'Submit a Spot'
                    ? 'mt-2 text-center text-white font-semibold rounded-lg py-3'
                    : isActive
                    ? 'text-[#FF4B2B] bg-[#FF4B2B]/10'
                    : 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-white/5'
                }`}
                style={
                  link.label === 'Submit a Spot'
                    ? { background: '#FF4B2B' }
                    : undefined
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
