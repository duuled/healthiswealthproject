import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, CheckCheck, Brain, TrendingUp, Package, Megaphone, Zap } from 'lucide-react';

interface Protocol {
  id: number;
  title: string;
  icon: React.ReactNode;
  badge: string;
  prompt: string;
}

const protocols: Protocol[] = [
  {
    id: 1,
    title: 'The Market Breakdown System',
    icon: <TrendingUp className="w-5 h-5" />,
    badge: 'Market Intelligence',
    prompt: `Analyze the market for the Health & Wellness Supplements industry. Use only specific, data-backed insights. No generic statements.

Deliver exactly four structured sections:

1. Market sizing: TAM, SAM, and SOM with estimated dollar values and your assumptions

2. Top 5 demand trends: each as a one-line headline + two-sentence explanation

3. Top 5 underserved opportunities: specific gaps, not broad categories

4. Follow the money: 3–5 areas where VC, PE, or acquirer capital is actively flowing

Format each section with a bold heading, then concise bullet points. Total output: under 600 words.`,
  },
  {
    id: 2,
    title: 'The Problem Prioritization Engine',
    icon: <Brain className="w-5 h-5" />,
    badge: 'Problem Discovery',
    prompt: `List the top 10 problems in the Health & Wellness Supplements industry.

For each problem, score it on three dimensions:
- Urgency (1–10): how painful/time-sensitive it is right now
- Willingness to pay (1–10): how likely buyers are to spend money to solve it today
- Growth trajectory: 'rising fast', 'stable', or 'declining'

Also add a 'Complaint signal' column: yes/no for whether this problem surfaces frequently in reviews, forums, or sales calls.

Output as a table with these exact columns:
| # | Problem | Urgency | WTP | Trend | Complaint signal | Why it ranks here |

Sort by combined Urgency + WTP score, highest first.`,
  },
  {
    id: 3,
    title: 'The Offer Creation Framework',
    icon: <Package className="w-5 h-5" />,
    badge: 'Offer Design',
    prompt: `Create a high-converting offer for: helping health-conscious consumers find trusted, science-backed, and affordable supplements without wading through misleading labels or low-quality products.

Structure the output exactly like a landing page, with these labeled sections in order:

1. Headline: one bold, benefit-driven statement
2. ICP: who this is for (age, role, situation, pain level)
3. Value proposition: the core transformation in one sentence
4. Offer components: what's included (deliverables, bonuses, format)
5. Pricing tiers: name, price, and what changes at each tier (low / mid / premium)
6. Guarantee: specific risk-reversal language the customer sees
7. Competitive edge: 3 reasons this beats the obvious alternatives

Keep each section tight. No filler. Write it as if it will go directly onto a real landing page.`,
  },
  {
    id: 4,
    title: 'The Distribution Domination Plan',
    icon: <Megaphone className="w-5 h-5" />,
    badge: '30-Day Growth',
    prompt: `Act as a senior growth strategist.

Build a realistic 30-day distribution plan for: Health Is Wealth Store — a curated health & wellness supplement brand targeting health-conscious adults aged 25–45, selling premium supplements and superfoods online, with a rough monthly budget of $1,000–$3,000.

Deliverables:
1. Top 5 acquisition channels: ranked by cost-efficiency for this specific audience
2. Content format per channel: one specific format that works on each (short-form video, cold email sequence, SEO article)
3. Weekly execution calendar: what happens in weeks 1, 2, 3, and 4 (not day-by-day)
4. Organic vs paid split: recommended % allocation and rationale
5. Leverage plays: 2–3 tactics that multiply reach without proportionally more effort (partnerships, repurposing, virality hooks)

Be specific and realistic. Skip tactics that require a large team or $50k+ budget. Output as a numbered system with clear section headers.`,
  },
  {
    id: 5,
    title: 'The Viral Content Engine',
    icon: <Zap className="w-5 h-5" />,
    badge: 'Content Strategy',
    prompt: `Create a viral content strategy for: Health & Wellness Supplements — specifically for an online store helping people discover clean, effective superfoods and supplements that actually work.

Deliver four components:
1. Hook bank: 10 high-converting hooks (not 20, prioritize quality). For each, label which emotional trigger it uses: fear of missing out, social status, curiosity, or controversy.

2. Content format matrix: a table with these columns:
| Format | Platform | Ideal length | Why it spreads | Example title |

Include 6–8 formats across at least 3 platforms.

3. Shareability audit: for each format, answer 'What makes someone forward/repost this?' in one sentence.

4. Repeatable content system: a simple weekly template showing how many posts, which formats, and what rotation keeps the audience engaged without burnout.

Output with bold section headers. Write the hooks in the voice of the health & wellness niche, not generic marketing language.`,
  },
];

export const AIProtocols = () => {
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-900/40 text-green-300 border-green-700">
            SaaS AI Protocols
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            High-Direction AI Protocols
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready-to-use AI prompt frameworks built for the Health &amp; Wellness industry.
            Copy any protocol directly into ChatGPT, Claude, or your AI tool of choice.
          </p>
        </div>

        {/* Protocol Cards */}
        <div className="space-y-6">
          {protocols.map((protocol) => (
            <Card
              key={protocol.id}
              className="bg-gray-900/60 border border-gray-700 hover:border-green-600/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-900/40 text-green-400">
                      {protocol.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 font-mono">
                          Protocol {protocol.id.toString().padStart(2, '0')}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-green-700/50 text-green-400"
                        >
                          {protocol.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl">
                        {protocol.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-700/50 text-green-400 hover:bg-green-900/30 hover:text-green-300"
                    onClick={() => copyToClipboard(protocol.prompt, protocol.id)}
                  >
                    {copied === protocol.id ? (
                      <>
                        <CheckCheck className="w-4 h-4 mr-1" />
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
                <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-black/40 rounded-lg p-4 font-mono leading-relaxed border border-gray-800">
                  {protocol.prompt}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            These protocols are pre-filled for the Health &amp; Wellness Supplements niche.
            Paste them into any AI assistant to generate market research, offers, growth plans, and content strategies instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIProtocols;
