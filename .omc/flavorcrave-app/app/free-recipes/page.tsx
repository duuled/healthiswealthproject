'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getFeaturedRecipes } from '../../src/data/recipes';

const BENEFITS = [
  {
    icon: '⚡',
    text: '30 dinners ready in 45 minutes or less — built for real weeknight schedules',
  },
  {
    icon: '💰',
    text: 'Every recipe tested under $15 per serving — stretch your grocery budget further',
  },
  {
    icon: '🌍',
    text: 'Rooted in Black, Caribbean, and West African culinary tradition — food with real cultural context',
  },
  {
    icon: '🔪',
    text: 'Technique notes in every recipe — understand what you are doing, not just follow steps',
  },
  {
    icon: '🖨️',
    text: 'Print-ready format included — put it on the fridge, take it to the store',
  },
  {
    icon: '👨‍👩‍👧',
    text: 'Family-tested, picky-eater approved — real households, not test kitchen idealism',
  },
] as const;

export default function FreeRecipesPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const previewRecipes = getFeaturedRecipes(3);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'free-recipes-page' }),
      });

      const data = (await res.json()) as { success: boolean; message: string };

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: 'var(--deep-brown)' }}
      >
        <div className="max-w-lg">
          <div className="text-6xl mb-6">📬</div>
          <h1
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Check your email — your free ebook is on its way!
          </h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            We just sent 30 Weeknight Dinners Your Family Will Actually Eat straight to your inbox. Check your spam folder if it does not show up in a few minutes.
          </p>
          <Link href="/recipes" className="btn-primary inline-flex">
            Browse More Recipes →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--warm-cream)' }}>
      {/* ─── Hero ──────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: 'var(--deep-brown)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Free Download
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            30 Weeknight Dinners Your Family Will Actually Eat
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Soul food, Caribbean, and West African weeknight dinners — with technique notes, cultural context, and no guesswork. Enter your email and get the full ebook free.
          </p>
        </div>
      </section>

      {/* ─── Benefits + Form ────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div>
            <h2
              className="font-serif text-2xl font-bold mb-8"
              style={{ color: 'var(--deep-brown)', fontFamily: 'var(--font-playfair), serif' }}
            >
              What you get inside:
            </h2>
            <ul className="space-y-5">
              {BENEFITS.map((benefit) => (
                <li key={benefit.text} className="flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{benefit.icon}</span>
                  <p className="text-gray-700 leading-relaxed">{benefit.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
            <h3
              className="font-serif text-2xl font-bold mb-2"
              style={{ color: 'var(--deep-brown)', fontFamily: 'var(--font-playfair), serif' }}
            >
              Get your free copy
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Instant delivery to your inbox. No spam. Unsubscribe any time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-800 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span style={{ color: 'var(--orange)' }}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-800 transition-colors"
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending…' : 'Send Me the Free Ebook →'}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              By submitting you agree to receive email from The Flavor Crave.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Recipe Previews (Locked) ──────────────── */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: '#f9ede0' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="font-serif text-2xl md:text-3xl font-bold"
              style={{ color: 'var(--deep-brown)', fontFamily: 'var(--font-playfair), serif' }}
            >
              A taste of what is inside
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              3 of 30 recipes — unlock all 30 free with your email above
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewRecipes.map((recipe) => (
              <div key={recipe.slug} className="relative recipe-card overflow-hidden">
                {/* Gradient placeholder */}
                <div
                  className="w-full min-h-[160px] flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3d1a00 0%, #7a3210 50%, #e8602c 100%)',
                  }}
                >
                  <span className="text-white/60 text-xs">{recipe.cuisine}</span>
                </div>

                {/* Blurred content overlay */}
                <div className="p-5 relative">
                  <div className="filter blur-sm select-none pointer-events-none">
                    <span className="category-badge">{recipe.category}</span>
                    <h3 className="font-serif font-bold text-lg mt-2 mb-1 text-gray-900">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{recipe.excerpt}</p>
                  </div>

                  {/* Unlock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px] rounded-b-2xl">
                    <span className="text-2xl mb-2">🔒</span>
                    <Link
                      href="#form"
                      className="btn-primary text-sm px-5 py-2"
                      onClick={() => {
                        document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Unlock All 30 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
