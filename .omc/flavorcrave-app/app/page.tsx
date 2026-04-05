'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getFeaturedRecipes, RECIPE_CATEGORIES } from '../src/data/recipes';
import type { Recipe } from '../src/data/recipes';

const DISPLAY_CATEGORIES = RECIPE_CATEGORIES.filter((c) => c !== 'All');

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="recipe-card group block">
      {/* Image placeholder */}
      <div className="recipe-card-image">
        <div className="recipe-card-image-placeholder min-h-[180px]">
          <span className="opacity-60 text-xs">{recipe.cuisine}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="category-badge">{recipe.category}</span>
          <span className="text-xs text-gray-400 font-medium capitalize">
            {recipe.difficulty}
          </span>
        </div>

        <h3 className="font-serif font-bold text-lg leading-snug text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
          {recipe.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {recipe.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium border-t border-gray-100 pt-3">
          <span>Prep {recipe.prepTime}m</span>
          <span className="text-gray-200">|</span>
          <span>Cook {recipe.cookTime}m</span>
          <span className="text-gray-200">|</span>
          <span>Serves {recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' }),
      });
      const data = (await res.json()) as { success: boolean; message: string };
      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: '#2a0e00' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">
          Free Download
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Get 30 Free Weeknight Recipes
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          30 dinners your family will actually eat — with technique notes, cultural context, and zero guesswork.
        </p>

        {status === 'success' ? (
          <div className="bg-green-900/40 border border-green-500/30 rounded-2xl px-8 py-6 text-green-300 font-medium">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="email-input flex-1"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending…' : 'Send Me the Ebook'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm mt-3">{message}</p>
        )}

        <p className="text-gray-600 text-xs mt-4">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  {
    icon: '🔪',
    title: 'Real Techniques',
    description:
      'Every recipe explains the WHY behind each step. You will understand what you are doing — not just follow instructions blind.',
  },
  {
    icon: '🌍',
    title: 'Cultural Roots',
    description:
      'Every dish comes with its story. Where it came from, who made it, and why it matters. Food without context is just calories.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Real Families',
    description:
      'These recipes are tested in real home kitchens, sized for real households, and built to fit a real weeknight schedule.',
  },
] as const;

export default function HomePage() {
  const featured = getFeaturedRecipes(6);

  return (
    <div>
      {/* ─── Hero ───────────────────────────────────────────── */}
      <section
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ backgroundColor: 'var(--deep-brown)' }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 70%, #E8602C 0%, transparent 50%), radial-gradient(circle at 70% 30%, #7a3210 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-6">
            Soul Food · Caribbean · West African
          </p>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            The recipes your grandma never wrote down —
            <span style={{ color: 'var(--orange)' }}> finally documented.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Authentic soul food, Caribbean &amp; West African recipes for busy families.
            With real technique, real cultural context, and ingredients you can actually find.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes" className="btn-primary text-base px-8 py-4">
              Browse Recipes →
            </Link>
            <Link href="/free-recipes" className="btn-secondary text-base px-8 py-4 text-white border-white hover:bg-white hover:text-gray-900">
              Get the Free Ebook
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Category Strip ─────────────────────────────────── */}
      <section
        className="py-6 border-b border-orange-100 sticky top-16 z-40"
        style={{ backgroundColor: 'var(--warm-cream)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {DISPLAY_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                className="category-pill whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Recipes ───────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Start Cooking
            </p>
            <h2
              className="section-heading"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Featured Recipes
            </h2>
            <p className="section-subheading max-w-xl mx-auto">
              Tried, documented, and explained — so you cook with confidence.
            </p>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">Recipes coming soon.</p>
          )}

          <div className="text-center mt-10">
            <Link href="/recipes" className="btn-primary inline-flex">
              View All Recipes →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why The Flavor Crave ───────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f9ede0' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="section-heading"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Why The Flavor Crave?
            </h2>
            <p className="section-subheading max-w-xl mx-auto">
              There are a lot of recipe sites. Here is what makes this one different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-serif font-bold text-xl mb-3"
                  style={{ color: 'var(--deep-brown)', fontFamily: 'var(--font-playfair), serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Email Capture ──────────────────────────────────── */}
      <EmailCapture />
    </div>
  );
}
