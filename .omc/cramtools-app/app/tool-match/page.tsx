"use client";

import { useState } from "react";
import Link from "next/link";

interface AITool {
  name: string;
  category: string;
  why_you_need_it: string;
  monthly_cost: string;
  affiliate_link_placeholder: string;
  rating_out_of_10: number;
}

interface ToolMatchResult {
  tools: AITool[];
  summary: string;
  estimated_monthly_cost_total: string;
  pro_tip: string;
}

const ROLES = [
  "Freelance Writer",
  "Solopreneur",
  "Marketer",
  "Developer",
  "Agency Owner",
  "Student",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <div
          key={star}
          className={`w-1.5 h-3 rounded-sm ${
            star <= rating ? "bg-[#7c3aed]" : "bg-[#2a2a2a]"
          }`}
        />
      ))}
      <span className="text-gray-400 text-xs ml-1">{rating}/10</span>
    </div>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  return (
    <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#7c3aed]/30 transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">{tool.name}</h3>
          <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 px-2 py-0.5 rounded-full mt-1 inline-block">
            {tool.category}
          </span>
        </div>
        <span className="text-[#a78bfa] font-semibold text-sm whitespace-nowrap">
          {tool.monthly_cost}
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {tool.why_you_need_it}
      </p>
      <div className="flex items-center justify-between">
        <StarRating rating={tool.rating_out_of_10} />
        <a
          href={tool.affiliate_link_placeholder}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 border border-[#7c3aed]/20 text-[#a78bfa] px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          Get {tool.name} →
        </a>
      </div>
    </div>
  );
}

export default function ToolMatchPage() {
  const [role, setRole] = useState<string>("");
  const [useCase, setUseCase] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ToolMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role || !useCase.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tool-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useCase, role }),
      });

      if (!response.ok) {
        const errData = await response.json() as { error: string };
        throw new Error(errData.error ?? "Request failed");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      if (accumulated.includes("__ERROR__:")) {
        const msg = accumulated.split("__ERROR__:")[1]?.trim() ?? "Unknown error";
        throw new Error(msg);
      }

      // Strip markdown code fences if present
      const raw = accumulated.trim();
      const jsonText = raw.startsWith("```")
        ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
        : raw;

      const parsed = JSON.parse(jsonText) as ToolMatchResult;
      setResult(parsed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function copyStackToClipboard() {
    if (!result) return;
    const lines = [
      `My AI Stack (via CramTools.dev)`,
      `Role: ${role}`,
      ``,
      ...result.tools.map(
        (t) =>
          `• ${t.name} (${t.category}) — ${t.monthly_cost}\n  ${t.why_you_need_it}\n  Rating: ${t.rating_out_of_10}/10\n  ${t.affiliate_link_placeholder}`
      ),
      ``,
      `Total estimated cost: ${result.estimated_monthly_cost_total}`,
      ``,
      `Pro tip: ${result.pro_tip}`,
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
              <span className="text-sm text-[#a78bfa] font-medium bg-[#3b1f7a]/20 px-3 py-1 rounded-full border border-[#7c3aed]/20">
                ToolMatch
              </span>
              <Link
                href="/prompt-lab"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                PromptLab
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3">
            Find Your AI Stack
          </h1>
          <p className="text-gray-400 text-lg">
            Tell Claude about your work. Get a personalized AI tool
            recommendation with real pricing and honest trade-offs.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 mb-8"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                What&apos;s your role?
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#7c3aed] transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select your role...
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="useCase"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Describe your typical workday and biggest time wasters
              </label>
              <textarea
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                required
                rows={6}
                maxLength={2000}
                placeholder="Example: I write SEO blog posts for SaaS companies. My biggest time wasters are research, finding stats, and reformatting content for LinkedIn. I spend 3+ hours per article on research alone, and I struggle to repurpose content quickly across formats."
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#7c3aed] transition-colors resize-none placeholder-gray-600 leading-relaxed"
              />
              <p className="text-gray-600 text-xs mt-1.5 text-right">
                {useCase.length}/2000
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !role || !useCase.trim()}
            className="mt-6 w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all text-lg"
          >
            {isLoading ? "Analyzing your workflow..." : "Find My AI Stack →"}
          </button>
        </form>

        {/* Loading state */}
        {isLoading && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-12 text-center">
            <div className="w-12 h-12 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg font-medium">
              Claude is analyzing your workflow...
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Using adaptive reasoning to find your ideal stack
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
          <div className="space-y-6">
            {/* Summary banner */}
            <div className="bg-[#3b1f7a]/20 border border-[#7c3aed]/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2 text-[#a78bfa]">
                Your Stack Analysis
              </h2>
              <p className="text-gray-300 leading-relaxed">{result.summary}</p>
              {result.pro_tip && (
                <div className="mt-4 pt-4 border-t border-[#7c3aed]/20">
                  <p className="text-sm text-gray-400">
                    <span className="text-[#7c3aed] font-semibold">
                      Pro tip:{" "}
                    </span>
                    {result.pro_tip}
                  </p>
                </div>
              )}
            </div>

            {/* Tool cards grid */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                Recommended Tools ({result.tools.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>

            {/* Cost summary + save button */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                  Estimated Monthly Cost
                </p>
                <p className="text-3xl font-extrabold text-white mt-1">
                  {result.estimated_monthly_cost_total}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Based on recommended plans. Costs may vary.
                </p>
              </div>
              <button
                onClick={copyStackToClipboard}
                className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white font-medium px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4 text-green-400"
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
                      className="w-4 h-4"
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
                    Save My Stack
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
