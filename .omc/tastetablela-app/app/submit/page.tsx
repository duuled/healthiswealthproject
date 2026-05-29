'use client';

import { useState, type FormEvent } from 'react';

const NEIGHBORHOODS = [
  'Koreatown',
  'Boyle Heights',
  'Leimert Park',
  'East LA',
  'Inglewood',
  'Crenshaw',
  'Compton',
  'Pico-Union',
  'MacArthur Park',
  'Highland Park',
  'Jefferson Park',
  'Watts',
] as const;

const CUISINES = [
  'Mexican',
  'Korean',
  'Soul Food',
  'Caribbean',
  'Japanese',
  'Ethiopian',
  'Salvadoran',
  'Vietnamese',
  'Peruvian',
  'Halal',
  'BBQ',
  'Seafood',
  'Nigerian',
  'Southern',
  'Filipino',
  'Other',
] as const;

interface FormState {
  spotName: string;
  neighborhood: string;
  cuisine: string;
  address: string;
  dish1: string;
  dish2: string;
  dish3: string;
  localSecret: string;
  yourName: string;
  igHandle: string;
}

const INITIAL_STATE: FormState = {
  spotName: '',
  neighborhood: '',
  cuisine: '',
  address: '',
  dish1: '',
  dish2: '',
  dish3: '',
  localSecret: '',
  yourName: '',
  igHandle: '',
};

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/submit-spot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotName: form.spotName,
          neighborhood: form.neighborhood,
          cuisine: form.cuisine,
          address: form.address,
          mustOrder: [form.dish1, form.dish2, form.dish3].filter(Boolean),
          localSecret: form.localSecret,
          yourName: form.yourName || undefined,
          igHandle: form.igHandle || undefined,
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm(INITIAL_STATE);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-6">✅</div>
        <h1 className="text-3xl font-black text-white mb-4">You&apos;re on the list.</h1>
        <p className="text-lg text-[#a3a3a3] mb-6">
          We&apos;ll check it out. Every spot gets visited before it goes live — takes time, but that&apos;s the standard.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-[#FF4B2B] hover:underline font-medium"
        >
          Submit another spot
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          Put Us On
        </h1>
        <p className="text-lg text-[#a3a3a3] leading-relaxed">
          Every spot on this list was submitted by someone who actually eats there. Add yours.
        </p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Spot name */}
        <div>
          <label htmlFor="spotName" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
            Spot Name *
          </label>
          <input
            id="spotName"
            name="spotName"
            type="text"
            required
            value={form.spotName}
            onChange={handleChange}
            placeholder="e.g. Tacos El Rey"
            className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
          />
        </div>

        {/* Neighborhood + Cuisine row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
              Neighborhood *
            </label>
            <select
              id="neighborhood"
              name="neighborhood"
              required
              value={form.neighborhood}
              onChange={handleChange}
              className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm appearance-none"
            >
              <option value="" disabled>Select neighborhood</option>
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cuisine" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
              Cuisine *
            </label>
            <select
              id="cuisine"
              name="cuisine"
              required
              value={form.cuisine}
              onChange={handleChange}
              className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm appearance-none"
            >
              <option value="" disabled>Select cuisine</option>
              {CUISINES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
            Address *
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={form.address}
            onChange={handleChange}
            placeholder="Street address, Los Angeles, CA"
            className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
          />
        </div>

        {/* Must Order dishes */}
        <div>
          <label className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
            Must Order Dishes *
          </label>
          <p className="text-xs text-[#6b6b6b] mb-3">What do you order every single time?</p>
          <div className="space-y-3">
            {(['dish1', 'dish2', 'dish3'] as const).map((field, i) => (
              <input
                key={field}
                name={field}
                type="text"
                required={i === 0}
                value={form[field]}
                onChange={handleChange}
                placeholder={i === 0 ? 'Dish #1 (required)' : `Dish #${i + 1} (optional)`}
                className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
              />
            ))}
          </div>
        </div>

        {/* Local Secret */}
        <div>
          <label htmlFor="localSecret" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
            Local Secret *
          </label>
          <p className="text-xs text-[#6b6b6b] mb-3">The thing only regulars know. Off-menu items, timing tips, what to ask for.</p>
          <textarea
            id="localSecret"
            name="localSecret"
            required
            rows={4}
            value={form.localSecret}
            onChange={handleChange}
            placeholder="e.g. 'Ask for the off-menu suya special on Thursdays...'"
            className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm resize-none"
          />
        </div>

        {/* Optional info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="yourName" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
              Your Name
            </label>
            <input
              id="yourName"
              name="yourName"
              type="text"
              value={form.yourName}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
            />
          </div>
          <div>
            <label htmlFor="igHandle" className="block text-sm font-semibold text-[#a3a3a3] mb-2 uppercase tracking-wider">
              Your IG Handle
            </label>
            <input
              id="igHandle"
              name="igHandle"
              type="text"
              value={form.igHandle}
              onChange={handleChange}
              placeholder="@optional"
              className="w-full bg-[#141414] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#FF4B2B]/50 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Error */}
        {status === 'error' && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
            Something went wrong. Try again — or slide into our DMs.
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#FF4B2B] hover:bg-[#e63c20] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-lg transition-colors"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit This Spot'}
        </button>

        {/* Brand note */}
        <p className="text-xs text-[#6b6b6b] text-center leading-relaxed">
          We visit every spot before adding it. Takes time, but that&apos;s the standard.
        </p>
      </form>

    </div>
  );
}
