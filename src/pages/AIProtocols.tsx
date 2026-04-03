import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Copy,
  CheckCheck,
  Brain,
  TrendingUp,
  Package,
  Megaphone,
  Zap,
  Network,
  Building2,
  ChevronRight,
  BarChart2,
} from 'lucide-react';

// ─── Company Hierarchy ───────────────────────────────────────────────────────

const subsidiaries = [
  { name: 'Taste Table', tag: '@tastetable · Food & Flavor', color: 'text-orange-400 border-orange-700/50 bg-orange-900/20' },
  { name: 'Health Is Wealth Store', tag: 'Supplements · keatontyler-20', color: 'text-green-400 border-green-700/50 bg-green-900/20' },
  { name: 'DJ Ty Motion', tag: '@djtymotion · Music & Lifestyle', color: 'text-blue-400 border-blue-700/50 bg-blue-900/20' },
  { name: 'Venice Beats Music', tag: '@venicebeatsmusic · Music', color: 'text-cyan-400 border-cyan-700/50 bg-cyan-900/20' },
  { name: 'Comedy Landmark', tag: '@comedian_landmark · Comedy', color: 'text-yellow-400 border-yellow-700/50 bg-yellow-900/20' },
  { name: 'Aw Hell Naw', tag: '@awhellnaw247 · Comedy', color: 'text-red-400 border-red-700/50 bg-red-900/20' },
  { name: 'Clips Up 247', tag: '@clipsup247 · Clips', color: 'text-purple-400 border-purple-700/50 bg-purple-900/20' },
  { name: "They're Here 247", tag: '@theyrehere247 · Viral', color: 'text-gray-400 border-gray-600/50 bg-gray-800/20' },
];

// ─── Agent Definitions ────────────────────────────────────────────────────────

interface Agent {
  id: number;
  agentId: string;
  title: string;
  role: string;
  icon: React.ReactNode;
  badge: string;
  accentColor: string;
  borderColor: string;
  scope: string;
  prompt: string;
}

const agents: Agent[] = [
  {
    id: 1,
    agentId: 'FC-AGENT-01',
    title: 'Market Intelligence Agent',
    role: 'Market Breakdown System',
    icon: <TrendingUp className="w-5 h-5" />,
    badge: 'Market Intel',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-700/50 bg-blue-900/20',
    scope: 'FlavorCrave.com → Taste Table + Health Is Wealth Store',
    prompt: `You are the Market Intelligence Agent for FlavorCrave.com — the parent company operating Taste Table (food & flavor discovery) and Health Is Wealth Store (premium supplements & superfoods). Your analysis informs strategy across all connected companies.

Analyze the combined market opportunity across FlavorCrave's portfolio: functional food & beverage, flavor innovation, and health & wellness supplements. Use only specific, data-backed insights. No generic statements.

Deliver exactly four structured sections:

1. Market sizing: TAM, SAM, and SOM with estimated dollar values and assumptions — broken out per vertical (Taste Table / Health Is Wealth Store) and rolled up to the FlavorCrave parent level.

2. Top 5 demand trends: each as a one-line headline + two-sentence explanation. Flag which subsidiary is most exposed to each trend.

3. Top 5 underserved opportunities: specific gaps that cut across the food-flavor-wellness intersection — not broad categories.

4. Follow the money: 3–5 areas where VC, PE, or acquirer capital is actively flowing in functional food, flavor tech, and supplement DTC.

Format each section with a bold heading, then concise bullet points. Total output: under 600 words.`,
  },
  {
    id: 2,
    agentId: 'FC-AGENT-02',
    title: 'Problem Prioritization Agent',
    role: 'Problem Prioritization Engine',
    icon: <Brain className="w-5 h-5" />,
    badge: 'Problem Discovery',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-700/50 bg-purple-900/20',
    scope: 'FlavorCrave.com → All Portfolio Companies',
    prompt: `You are the Problem Prioritization Agent for FlavorCrave.com — the parent company overseeing Taste Table and Health Is Wealth Store.

List the top 10 problems across FlavorCrave's industry intersection: functional food discovery, flavor-driven wellness, and supplement retail.

For each problem, score it on three dimensions:
- Urgency (1–10): how painful/time-sensitive it is right now across the portfolio
- Willingness to pay (1–10): how likely buyers are to spend money to solve it today
- Growth trajectory: 'rising fast', 'stable', or 'declining'

Also add a 'Complaint signal' column: yes/no for whether this problem surfaces frequently in reviews, forums, or sales calls.

Add a final column: 'Best Owner' — which FlavorCrave company (Taste Table, Health Is Wealth Store, or FlavorCrave Parent) is best positioned to solve it.

Output as a table with these exact columns:
| # | Problem | Urgency | WTP | Trend | Complaint signal | Best Owner | Why it ranks here |

Sort by combined Urgency + WTP score, highest first.`,
  },
  {
    id: 3,
    agentId: 'FC-AGENT-03',
    title: 'Offer Architect Agent',
    role: 'Offer Creation Framework',
    icon: <Package className="w-5 h-5" />,
    badge: 'Offer Design',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-700/50 bg-orange-900/20',
    scope: 'FlavorCrave.com → Taste Table + Health Is Wealth Store',
    prompt: `You are the Offer Architect Agent for FlavorCrave.com — the parent company operating Taste Table and Health Is Wealth Store.

Create a high-converting cross-brand offer for: helping food-curious and health-conscious consumers discover premium flavors and clean, science-backed supplements in one trusted ecosystem — so they stop guessing what to eat and how to supplement, and start building a lifestyle that tastes good and performs better.

Structure the output exactly like a landing page, with these labeled sections in order:

1. Headline: one bold, benefit-driven statement that bridges flavor and wellness
2. ICP: who this is for (age, lifestyle, situation, pain level) — unified across both Taste Table and Health Is Wealth Store customers
3. Value proposition: the core transformation in one sentence — specific to FlavorCrave's cross-brand promise
4. Offer components: what's included across both brands (deliverables, bundles, bonuses, format)
5. Pricing tiers: name, price, and what changes at each tier (low / mid / premium) — including cross-brand bundle option
6. Guarantee: specific risk-reversal language the customer sees
7. Competitive edge: 3 reasons the FlavorCrave ecosystem beats single-brand alternatives

Keep each section tight. No filler. Write it as if it will go directly onto the FlavorCrave.com parent landing page.`,
  },
  {
    id: 4,
    agentId: 'FC-AGENT-04',
    title: 'Distribution Command Agent',
    role: 'Distribution Domination Plan',
    icon: <Megaphone className="w-5 h-5" />,
    badge: '30-Day Growth',
    accentColor: 'text-yellow-400',
    borderColor: 'border-yellow-700/50 bg-yellow-900/20',
    scope: 'FlavorCrave.com → Portfolio-Wide Distribution',
    prompt: `Act as a senior growth strategist reporting to FlavorCrave.com — the parent company operating Taste Table (food & flavor) and Health Is Wealth Store (supplements & superfoods).

Build a realistic 30-day cross-company distribution plan. Target audience: health-conscious food lovers aged 22–45 who care about what they eat, how it tastes, and how it makes them feel. Monthly budget across the portfolio: $2,000–$5,000.

Deliverables:
1. Top 5 acquisition channels: ranked by cost-efficiency for this combined audience — note whether each channel is best for Taste Table, Health Is Wealth Store, or both.

2. Content format per channel: one specific format that works on each (short-form video, cold email sequence, SEO article). Include one cross-brand collaboration format.

3. Weekly execution calendar: what happens in weeks 1, 2, 3, and 4 — showing how both brands coordinate under FlavorCrave's direction.

4. Organic vs paid split: recommended % allocation for the parent company vs per subsidiary, with rationale.

5. Leverage plays: 2–3 tactics that multiply reach without proportionally more effort — prioritize cross-subsidiary synergies (bundle partnerships, content repurposing across brands, virality hooks that reference the full FlavorCrave ecosystem).

Be specific and realistic. Output as a numbered system with clear section headers.`,
  },
  {
    id: 5,
    agentId: 'FC-AGENT-05',
    title: 'Content Syndication Agent',
    role: 'Viral Content Engine',
    icon: <Zap className="w-5 h-5" />,
    badge: 'Content Strategy',
    accentColor: 'text-green-400',
    borderColor: 'border-green-700/50 bg-green-900/20',
    scope: 'FlavorCrave.com → Taste Table + Health Is Wealth Store',
    prompt: `You are the Content Syndication Agent for FlavorCrave.com — the parent company operating Taste Table and Health Is Wealth Store.

Create a viral content strategy for the FlavorCrave ecosystem: a brand universe where premium flavor meets functional health — helping people eat better, feel better, and live better.

Deliver four components:

1. Hook bank: 10 high-converting hooks (not 20, prioritize quality). Each hook should work for either Taste Table, Health Is Wealth Store, or both. For each, label:
   - Which brand it leads with (Taste Table / Health Is Wealth / FlavorCrave parent)
   - Which emotional trigger it uses: fear of missing out, social status, curiosity, or controversy

2. Content format matrix: a table with these columns:
| Format | Platform | Brand | Ideal length | Why it spreads | Example title |

Include 6–8 formats across at least 3 platforms. Show how content flows from parent brand down to subsidiaries.

3. Shareability audit: for each format, answer 'What makes someone forward/repost this?' in one sentence.

4. Repeatable content system: a weekly template for the full FlavorCrave portfolio — how many posts per brand, which formats, and how content cross-promotes between Taste Table and Health Is Wealth Store without audience fatigue.

Output with bold section headers. Write hooks in the authentic voice of the food-meets-wellness niche, not generic marketing copy.`,
  },
  {
    id: 7,
    agentId: 'FC-AGENT-07',
    title: 'Scale Architecture Agent',
    role: 'The Scale System',
    icon: <BarChart2 className="w-5 h-5" />,
    badge: 'Scale Roadmap',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-700/50 bg-cyan-900/20',
    scope: 'FlavorCrave.com → Full Portfolio 12-Month Scale Plan',
    prompt: `You are the Scale Architecture Agent for FlavorCrave.com — the parent company operating Taste Table (food & flavor discovery) and Health Is Wealth Store (premium supplements & superfoods), with additional brands to be connected over time.

Give me a plan to scale FlavorCrave.com to $1M ARR across the full portfolio within 12 months.

Business description: FlavorCrave.com is the parent marketing company overseeing Taste Table (flavor-driven food discovery and curated product drops) and Health Is Wealth Store (clean supplements and superfoods DTC). The ecosystem targets health-conscious food lovers aged 22–45. Current stage: early revenue, lean founding team. Primary bottleneck: systematizing cross-brand operations and scaling acquisition without burning budget on channels that don't compound.

Structure the output as a phased execution roadmap with these four phases:

Phase 1 – Stabilize (Month 1–2): what to systematize and document before scaling
- Focus on FlavorCrave parent operations + both subsidiaries
- SOPs, brand voice, cross-brand offer alignment, CRM setup

Phase 2 – Automate (Month 3–4): top 3 processes to automate across the portfolio, with specific tool recommendations
- Cover: order/fulfillment, content distribution, lead nurturing
- Name the exact tools (not categories)

Phase 3 – Delegate (Month 5–8): what to hire for first, in order, with rough cost per role
- Prioritize roles that serve both Taste Table and Health Is Wealth Store
- Include freelance vs. full-time recommendation per role

Phase 4 – Scale (Month 9–12): the growth lever (channel, product, or partnership) that unlocks the next revenue tier
- Be specific to FlavorCrave's food-meets-wellness positioning
- Identify the one bet that compounds across all connected companies

Also include:
- Top 3 bottlenecks that will appear at each phase transition (specific to a multi-brand parent company)
- One leading metric to track per phase (not vanity metrics — revenue-predictive only)

Output as a structured roadmap with phase headers. No generic list.`,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const AIProtocols = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Page Header ── */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-orange-900/40 text-orange-300 border-orange-700 text-xs tracking-widest uppercase">
            Multi-Agent AI Protocols
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            FlavorCrave<span className="text-orange-400">.com</span>
          </h1>
          <p className="text-gray-300 text-lg font-medium mb-1">Parent Company AI Command Center</p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Six high-direction AI agents operating at the FlavorCrave parent level — running
            market intelligence, problem discovery, offer design, distribution, content
            syndication, and full-portfolio scale planning across 7 TikTok channels and all connected companies.
          </p>
        </div>

        {/* ── Company Hierarchy Map ── */}
        <div className="mb-10 rounded-xl border border-gray-700 bg-gray-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              Portfolio Structure
            </span>
          </div>

          {/* Parent */}
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-5 h-5 text-orange-400" />
            <div>
              <span className="text-white font-semibold">FlavorCrave.com</span>
              <Badge className="ml-2 text-[10px] bg-orange-900/40 text-orange-300 border-orange-700">
                Head Company
              </Badge>
            </div>
          </div>

          {/* Subsidiaries */}
          <div className="ml-7 space-y-2">
            {subsidiaries.map((sub) => (
              <div key={sub.name} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <Badge variant="outline" className={`text-xs ${sub.color}`}>
                  {sub.name}
                </Badge>
                <span className="text-gray-500 text-xs">{sub.tag}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-600 font-mono">
            All agents report to FlavorCrave.com and push intelligence down to connected companies.
          </p>
        </div>

        {/* ── Agent Cards ── */}
        <div className="space-y-6">
          {agents.map((agent) => (
            <Card
              key={agent.agentId}
              className="bg-gray-900/60 border border-gray-700 hover:border-gray-500 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${agent.borderColor} ${agent.accentColor}`}>
                      {agent.icon}
                    </div>
                    <div>
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className="text-xs text-gray-600 font-mono">{agent.agentId}</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${agent.borderColor} ${agent.accentColor}`}
                        >
                          {agent.badge}
                        </Badge>
                      </div>
                      <CardTitle className={`text-lg font-bold ${agent.accentColor}`}>
                        {agent.title}
                      </CardTitle>
                      <p className="text-xs text-gray-500 mt-0.5">{agent.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Network className="w-3 h-3 text-gray-600" />
                        <span className="text-[10px] text-gray-600 font-mono">{agent.scope}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white shrink-0"
                    onClick={() => copyToClipboard(agent.prompt, agent.agentId)}
                  >
                    {copied === agent.agentId ? (
                      <>
                        <CheckCheck className="w-4 h-4 mr-1 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Prompt
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-black/50 rounded-lg p-4 font-mono leading-relaxed border border-gray-800/80">
                  {agent.prompt}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="mt-12 rounded-xl border border-gray-800 bg-gray-900/30 p-6 text-center">
          <p className="text-gray-400 text-sm font-medium mb-1">
            FlavorCrave.com — Multi-Agent AI Operating System
          </p>
          <p className="text-gray-600 text-xs mb-3">
            Each agent prompt is pre-configured for the FlavorCrave parent company with scope across
            Taste Table and Health Is Wealth Store. Paste into ChatGPT, Claude, or any AI tool to
            run strategic intelligence at the portfolio level.
          </p>
          <a
            href="https://www.tiktok.com/@djtymotion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs"
            aria-label="TikTok @DjTymotion"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
            @DjTymotion
          </a>
        </div>

      </div>
    </div>
  );
};

export default AIProtocols;
