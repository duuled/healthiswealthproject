"use client";

import { useState } from "react";
import Link from "next/link";

interface PromptVariation {
  name: string;
  prompt: string;
  why_it_works: string;
}

interface PromptLabResult {
  original_issues: string[];
  variations: PromptVariation[];
  key_improvements: string[];
}

const VARIATION_STYLES: Record<
  string,
  { icon: string; color: string; border: string; badge: string }
> = {
  Concise: {
    icon: "⚡",
    color: "text-yellow-400",
    border: "border-yellow-400/20",
    badge: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  },
  Detailed: {
    icon: "📋",
    color: "text-blue-400",
    border: "border-blue-400/20",
    badge: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  },
  "Chain-of-Thought": {
    icon: "🧠",
    color: "text-green-400",
    border: "border-green-400/20",
    badge: "bg-green-400/10 text-green-400 border-green-400/20",
  },
};

function VariationCard({ variation }: { variation: PromptVariation }) {
  const [copied, setCopied] = useState(false);
  const style = VARIATION_STYLES[variation.name] ?? {
    icon: "✨",
    color: "text-[#a78bfa]",
    border: "border-[#7c3aed]/20",
    badge: "bg-[#7c3aed]/10 text-[#a78bfa] border-[#7c3aed]/20",
  };

  function copyPrompt() {
    navigator.clipboard.writeText(variation.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className={`bg-[#111111] border border-[#2a2a2a] hover:${style.border} rounded-2xl p-6 transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{style.icon}</span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${style.badge}`}
          >
            {variation.name}
          </span>
        </div>
        <button
          onClick={copyPrompt}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Prompt code block */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 mb-4 relative group">
        <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
          {variation.prompt}
        </pre>
      </div>

      {/* Why it works */}
      <div className="bg-[#0a0a0a]/50 rounded-xl p-4 border border-[#1a1a1a]">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Why it works
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {variation.why_it_works}
        </p>
      </div>
    </div>
  );
}

export default function PromptLabPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PromptLabResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/prompt-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context }),
      });

      const data = await response.json() as PromptLabResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-lg tracking-tight">
                CramTools
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/tool-match"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ToolMatch
              </Link>
              <span className="text-sm text-[#a78bfa] font-medium bg-[#3b1f7a]/20 px-3 py-1 rounded-full border border-[#7c3aed]/20">
                PromptLab
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Prompt Lab</h1>
          <p className="text-gray-400 text-lg">
            Paste any weak prompt and get 3 optimized versions back — concise,
            detailed, and chain-of-thought — with an explanation of exactly
            what was wrong.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 mb-8"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Paste your prompt here
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                rows={10}
                maxLength={3000}
                placeholder="Paste any prompt that isn't working well for you. For example: 'Write me a blog post about AI tools'"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#7c3aed] transition-colors resize-none placeholder-gray-600 leading-relaxed font-mono text-sm"
              />
              <p className="text-gray-600 text-xs mt-1.5 text-right">
                {prompt.length}/3000
              </p>
            </div>

            <div>
              <label
                htmlFor="context"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                What&apos;s this prompt for?{" "}
                <span className="text-gray-600 font-normal">(optional)</span>
              </label>
              <input
                id="context"
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                maxLength={300}
                placeholder="e.g. ChatGPT, Claude, Midjourney / Writing a cold email / Generating product descriptions"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#7c3aed] transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="mt-6 w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all text-lg"
          >
            {isLoading ? "Optimizing your prompt..." : "Optimize My Prompt →"}
          </button>
        </form>

        {/* Loading state */}
        {isLoading && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-12 text-center">
            <div className="w-12 h-12 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg font-medium">
              Claude is analyzing your prompt...
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Generating 3 optimized variations
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-2xl p-6 mb-8">
            <p className="text-red-400 font-medium">Something went wrong</p>
            <p className="text-red-300/70 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-8">
            {/* Original Issues */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-red-400">⚠</span> What was wrong with
                your original prompt
              </h2>
              <ul className="space-y-2">
                {result.original_issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-red-400/70 mt-0.5 flex-shrink-0">
                      ✕
                    </span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Improvements */}
            {result.key_improvements && result.key_improvements.length > 0 && (
              <div className="bg-[#3b1f7a]/10 border border-[#7c3aed]/20 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 text-[#a78bfa]">
                  Key improvements applied
                </h2>
                <ul className="space-y-2">
                  {result.key_improvements.map((improvement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-400 text-sm"
                    >
                      <span className="text-[#7c3aed] mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variation Cards */}
            <div>
              <h2 className="text-xl font-bold mb-5">
                3 Optimized Variations
              </h2>
              <div className="space-y-5">
                {result.variations.map((variation) => (
                  <VariationCard key={variation.name} variation={variation} />
                ))}
              </div>
            </div>

            {/* Try another CTA */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                  setPrompt("");
                  setContext("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4"
              >
                Optimize another prompt
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
