import type { Metadata } from 'next';
import Link from 'next/link';
import { getHiddenGems } from '@/data/spots';
import SpotCard from '@/components/SpotCard';

export const metadata: Metadata = {
  title: "Hidden Gems — Spots We're Not Supposed to Tell You About | TasteTable LA",
  description:
    "These spots don't have influencer photos, don't appear on top-10 lists, and rely entirely on word of mouth. That's the point.",
  openGraph: {
    title: "Hidden Gems — Spots We're Not Supposed to Tell You About",
    description:
      "These spots don't have influencer photos, don't appear on top-10 lists, and rely entirely on word of mouth.",
    url: 'https://tastetablela.vercel.app/hidden-gems',
  },
  alternates: {
    canonical: 'https://tastetablela.vercel.app/hidden-gems',
  },
};

export default function HiddenGemsPage() {
  const gems = getHiddenGems();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16">

      {/* Header */}
      <header className="mb-12 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-[#FF4B2B] uppercase tracking-[0.15em]">
            🔥 Hidden Gems
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
          The Spots We&apos;re Not Supposed to Tell You About
        </h1>
        <p className="text-lg text-[#a3a3a3] leading-relaxed">
          These are the spots that don&apos;t have influencer photos, don&apos;t appear on top-10
          lists, and rely entirely on word of mouth. That&apos;s the point.
        </p>
        <p className="mt-3 text-sm text-[#6b6b6b]">
          {gems.length} spots documented
        </p>
      </header>

      {/* Warning banner */}
      <div className="bg-[#FF4B2B]/8 border border-[#FF4B2B]/20 rounded-xl p-5 mb-12">
        <p className="text-sm text-[#f5d88a] leading-relaxed">
          <strong className="text-[#FF4B2B]">Real talk:</strong> Every spot here was submitted by someone who eats there regularly. No PR, no sponsored placements, no influencer packages. If it&apos;s on this list, it&apos;s because locals keep going back.
        </p>
      </div>

      {/* Grid */}
      {gems.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {gems.map((spot) => (
            <SpotCard key={spot.slug} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="bg-[#141414] border border-white/[0.06] rounded-xl p-10 text-center mb-16">
          <p className="text-[#a3a3a3]">
            We&apos;re still uncovering hidden gems. Check back soon.
          </p>
        </div>
      )}

      {/* Submit CTA */}
      <div className="border border-[#FF4B2B]/20 rounded-xl p-8 bg-[#1a0a08]">
        <h2 className="text-xl font-bold text-white mb-2">
          Found a hidden gem?
        </h2>
        <p className="text-[#a3a3a3] mb-5 text-sm">
          If you know a spot that deserves to be on this list — cash only, no Yelp page, the kind of place the neighborhood keeps to itself — submit it. We&apos;ll check it out.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 bg-[#FF4B2B] hover:bg-[#e63c20] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
        >
          Submit a hidden gem
        </Link>
      </div>

    </div>
  );
}
