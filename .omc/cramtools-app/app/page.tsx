import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-lg tracking-tight">
                CramTools
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/tool-match"
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              >
                ToolMatch
              </Link>
              <Link
                href="/prompt-lab"
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              >
                PromptLab
              </Link>
              <a
                href="https://cramtools.dev/blog"
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              >
                Blog
              </a>
              <Link
                href="/tool-match"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#3b1f7a]/30 border border-[#7c3aed]/30 rounded-full px-4 py-1.5 text-sm text-[#a78bfa] font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse"></span>
            Powered by Claude Opus 4.6
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            AI tools that{" "}
            <span className="text-[#7c3aed]">actually save time.</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            No hype. Just leverage. Discover the exact AI stack for your
            workflow, then sharpen every prompt you write.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tool-match"
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg shadow-lg shadow-purple-900/30"
            >
              Find My AI Stack
            </Link>
            <Link
              href="/prompt-lab"
              className="border border-[#2a2a2a] hover:border-[#7c3aed] bg-[#111111] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg"
            >
              Sharpen My Prompts
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ToolMatch Card */}
          <Link href="/tool-match" className="group block">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 h-full hover:border-[#7c3aed]/50 transition-all hover:bg-[#111111]/80 hover:shadow-xl hover:shadow-purple-900/10">
              <div className="w-14 h-14 rounded-2xl bg-[#3b1f7a]/50 border border-[#7c3aed]/20 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-[#7c3aed]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold">ToolMatch</h2>
                <span className="text-xs bg-[#7c3aed]/20 text-[#a78bfa] px-2 py-0.5 rounded-full font-medium border border-[#7c3aed]/20">
                  AI Recommender
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Describe your job and biggest time wasters. Claude analyzes your
                workflow and recommends the exact AI tools you need — with
                pricing, trade-offs, and honest ratings.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#7c3aed]">✓</span>
                  Personalized tool stack for your exact workflow
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7c3aed]">✓</span>
                  Real pricing, no fluff
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7c3aed]">✓</span>
                  Copy-paste ready tool list
                </li>
              </ul>
              <div className="flex items-center gap-2 text-[#7c3aed] font-semibold text-sm group-hover:gap-3 transition-all">
                Find my AI stack
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* PromptLab Card */}
          <Link href="/prompt-lab" className="group block">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 h-full hover:border-[#7c3aed]/50 transition-all hover:bg-[#111111]/80 hover:shadow-xl hover:shadow-purple-900/10">
              <div className="w-14 h-14 rounded-2xl bg-[#3b1f7a]/50 border border-[#7c3aed]/20 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-[#7c3aed]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold">PromptLab</h2>
                <span className="text-xs bg-[#7c3aed]/20 text-[#a78bfa] px-2 py-0.5 rounded-full font-medium border border-[#7c3aed]/20">
                  Prompt Optimizer
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Paste any weak prompt and get 3 battle-tested variations back.
                Concise, detailed, and chain-of-thought — plus an explanation of
                exactly what was wrong.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#7c3aed]">✓</span>3 optimized
                  variations per prompt
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7c3aed]">✓</span>
                  Explains exactly what was wrong
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7c3aed]">✓</span>
                  One-click copy for each variation
                </li>
              </ul>
              <div className="flex items-center gap-2 text-[#7c3aed] font-semibold text-sm group-hover:gap-3 transition-all">
                Sharpen my prompts
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Social proof / trust strip */}
      <section className="border-t border-[#2a2a2a] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-8">
            Built for
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm font-medium">
            {[
              "Freelance Writers",
              "Solopreneurs",
              "Marketers",
              "Developers",
              "Agency Owners",
              "Students",
            ].map((role) => (
              <span
                key={role}
                className="bg-[#111111] border border-[#2a2a2a] px-4 py-2 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#7c3aed] flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="text-gray-500 text-sm">
              CramTools © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a
              href="https://cramtools.dev"
              className="hover:text-gray-400 transition-colors"
            >
              cramtools.dev
            </a>
            <span>|</span>
            <span>Powered by Claude Opus 4.6</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
