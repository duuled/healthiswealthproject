'use client';

import { useState, type FormEvent } from 'react';

const NEIGHBORHOOD_LIST = [
  'Koreatown', 'Boyle Heights', 'Leimert Park', 'East LA', 'Inglewood',
  'Crenshaw', 'Compton', 'Pico-Union', 'MacArthur Park', 'Highland Park',
  'Jefferson Park', 'Watts',
];

export default function MapPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined, source: 'map-page' }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">

      {/* Hero */}
      <header className="mb-12 text-center">
        <div className="inline-block bg-[#FF4B2B]/10 border border-[#FF4B2B]/20 text-[#FF4B2B] text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-6">
          Free Download
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-5">
          The TasteTable LA<br />Food Map
        </h1>
        <p className="text-lg sm:text-xl text-[#a3a3a3] leading-relaxed max-w-xl mx-auto">
          50+ real local spots. Zero tourist traps. One PDF you&apos;ll actually use.
        </p>
      </header>

      {/* Value props */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: '📍', label: 'Organized by neighborhood', sub: 'All 12 neighborhoods covered' },
          { icon: '🍽️', label: 'Must-order items per spot', sub: 'No guessing what to get' },
          { icon: '🖨️', label: 'Print-ready PDF', sub: 'Works offline, no app needed' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#141414] border border-white/[0.06] rounded-xl p-5 text-center"
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
            <p className="text-xs text-[#6b6b6b]">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Neighborhoods included */}
      <div className="bg-[#141414] border border-white/[0.06] rounded-xl p-6 mb-12">
        <h2 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-[0.15em] mb-4">
          Neighborhoods Covered
        </h2>
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOOD_LIST.map((n) => (
            <span
              key={n}
              className="text-xs text-[#a3a3a3] bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.06]"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing + CTA */}
      <div className="bg-[#1a0a08] border border-[#FF4B2B]/20 rounded-2xl p-8 sm:p-10 text-center">
        {status === 'success' ? (
          <div>
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-2xl font-black text-white mb-3">
              Check your email — the map is on its way.
            </h2>
            <p className="text-[#a3a3a3] text-sm">
              Drop back for new spot updates. We add to the map as we find spots worth adding.
            </p>
          </div>
        ) : (
          <>
            {/* Price */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl text-[#6b6b6b] line-through font-bold">$9</span>
              <span className="text-4xl font-black text-white">FREE</span>
              <span className="text-sm text-[#a3a3a3]">with email signup</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Get the map. Eat better.
            </h2>
            <p className="text-sm text-[#a3a3a3] mb-8 max-w-md mx-auto">
              Enter your email and we&apos;ll send you the PDF instantly. We&apos;ll also let you know when we add new spots.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name (optional)"
                className="w-full bg-[#0d0d0d] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-[#0d0d0d] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
              />
              {status === 'error' && (
                <p className="text-sm text-red-400">
                  Something went wrong. Try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#FF4B2B] hover:bg-[#e63c20] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-lg transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Send Me the Map →'}
              </button>
            </form>

            <p className="text-xs text-[#6b6b6b] mt-5">
              No spam. Just the map, and updates when we add spots worth knowing about.
            </p>
          </>
        )}
      </div>

    </div>
  );
}
