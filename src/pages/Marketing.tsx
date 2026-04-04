import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DollarSign, Copy, CheckCheck, TrendingUp,
  Target, Zap, ChevronRight, BarChart2, ExternalLink
} from 'lucide-react';
import { TikTokIcon } from '@/components/icons/TikTokIcon';

// ─── $40 Budget Promotion Plan ────────────────────────────────────────────────

const BUDGET_TOTAL = 40;

const BUDGET_ALLOCATION = [
  {
    platform: 'TikTok Spark Ads',
    channel: '@djtymotion or @tastetable',
    amount: 20,
    color: 'from-pink-600 to-red-500',
    border: 'border-pink-700/40',
    accent: 'text-pink-400',
    icon: <TikTokIcon className="w-4 h-4" />,
    why: 'Lowest CPM in social media right now — $0.50–$2.00 CPM vs Meta\'s $8–15. Spark Ads boost your existing organic video, so the algorithm already knows it converts.',
    howTo: [
      '1. Go to TikTok Ads Manager → Create Campaign → Reach/Traffic',
      '2. Pick your best organic video (highest watch-time or comments)',
      '3. Set audience: 22–42, US, interests: Health, Wellness, Fitness, Food',
      '4. Budget: $20 over 5 days ($4/day)',
      '5. Destination: healthiswealth.live/links?utm_source=tiktok_spark&utm_medium=paid&utm_campaign=promo40',
    ],
    expectedReturn: '10,000–40,000 impressions · 200–800 link clicks · Est. 5–20 email signups',
    cta: 'https://ads.tiktok.com',
  },
  {
    platform: 'Meta (Facebook + Instagram)',
    channel: 'Boost existing Facebook video',
    amount: 15,
    color: 'from-blue-600 to-indigo-600',
    border: 'border-blue-700/40',
    accent: 'text-blue-400',
    icon: <span className="text-sm">📘</span>,
    why: 'You already have the Meta Pixel installed on the site (ID: 2074486173113331). Boosting the existing Facebook promo video retargets site visitors AND reaches lookalike audiences — the most efficient $15 you can spend.',
    howTo: [
      '1. Go to Facebook Business Suite → Boost Post',
      '2. Select the promo video (fb.watch/GfQw5210Lv)',
      '3. Audience: Lookalike from website visitors (Pixel data)',
      '4. Interests: Supplements, Natural Health, Wellness, TikTok creators',
      '5. Budget: $15 over 3 days ($5/day)',
      '6. Destination: healthiswealth.live/supplements?utm_source=facebook&utm_medium=paid&utm_campaign=promo40',
    ],
    expectedReturn: '3,000–8,000 impressions · 50–150 link clicks · Est. 2–8 email signups',
    cta: 'https://business.facebook.com',
  },
  {
    platform: 'Pinterest Promoted Pin',
    channel: 'Wellness supplement pin',
    amount: 5,
    color: 'from-rose-600 to-red-600',
    border: 'border-rose-700/40',
    accent: 'text-rose-400',
    icon: <span className="text-sm">📌</span>,
    why: 'Pinterest users have the highest purchase intent of any social platform — 83% say Pinterest helps them find new products. $5 gets your pin in front of wellness shoppers actively looking to buy.',
    howTo: [
      '1. Go to Pinterest Ads → Create Ad → Traffic campaign',
      '2. Select your existing wellness pin',
      '3. Interest targeting: Natural Health, Supplements, Healthy Eating, Wellness',
      '4. Budget: $5 over 5 days ($1/day)',
      '5. Destination: healthiswealth.live/supplements?utm_source=pinterest&utm_medium=paid&utm_campaign=promo40',
    ],
    expectedReturn: '2,000–5,000 impressions · 20–60 link clicks · Est. 1–4 email signups',
    cta: 'https://ads.pinterest.com',
  },
];

// ─── Content Calendar ─────────────────────────────────────────────────────────

const WEEKLY_CONTENT = [
  {
    day: 'Day 1',
    label: 'MON',
    color: 'bg-blue-900/30 border-blue-700/40',
    tasks: [
      { channel: '@djtymotion', type: 'TikTok', action: 'Post: "What I eat when I\'m producing in the studio" — show the supplement stack', tag: 'Launch Spark Ad here' },
      { channel: '@tastetable', type: 'TikTok', action: 'Post: Moringa smoothie recipe with Blue Spirulina color reveal' },
      { channel: 'LinkedIn', type: 'Post', action: '"The FlavorCrave Network — 18 properties, one mission. Here\'s what we\'re building."' },
    ],
  },
  {
    day: 'Day 2',
    label: 'TUE',
    color: 'bg-green-900/30 border-green-700/40',
    tasks: [
      { channel: '@awhellnaw247', type: 'TikTok', action: 'Post: Comedy hook → wellness punchline (top-of-funnel traffic driver)' },
      { channel: '@tymotionvsl', type: 'Instagram Reel', action: 'Repurpose best TikTok — same video, Reel format' },
      { channel: 'Facebook', type: 'Boost', action: 'Launch $15 Facebook boost on promo video', tag: 'Run ad' },
    ],
  },
  {
    day: 'Day 3',
    label: 'WED',
    color: 'bg-yellow-900/30 border-yellow-700/40',
    tasks: [
      { channel: '@venicebeatsmusic', type: 'TikTok', action: 'Post: "The beat I play during my morning supplement stack" — product in frame' },
      { channel: '@comedian_landmark', type: 'TikTok', action: 'Post: Comedy hook about supplements — link in bio to /links' },
      { channel: 'Email list', type: 'Broadcast', action: 'Send first email: Power 5 Smoothie Recipe + supplement links with UTM' },
    ],
  },
  {
    day: 'Day 4',
    label: 'THU',
    color: 'bg-purple-900/30 border-purple-700/40',
    tasks: [
      { channel: '@clipsup247', type: 'TikTok', action: 'Clip: Best 7-second moment from any of this week\'s videos' },
      { channel: 'Pinterest', type: 'Promoted Pin', action: 'Launch $5 Pinterest promoted pin on supplement board', tag: 'Run ad' },
      { channel: '@awhecknaw247', type: 'Instagram', action: 'Story: Poll — "Which supplement do you want to try first?" (Moringa vs Shilajit)' },
    ],
  },
  {
    day: 'Day 5',
    label: 'FRI',
    color: 'bg-orange-900/30 border-orange-700/40',
    tasks: [
      { channel: '@theyrehere247', type: 'TikTok', action: 'Post: Viral-format clip — trending audio + supplement reveal' },
      { channel: '@time_for_action567', type: 'Instagram', action: 'Post: "5 reasons I switched to natural supplements" — affiliate links in bio' },
      { channel: 'X @ktylermotion', type: 'Tweet', action: 'Thread: "I spent $40 promoting The FlavorCrave Network. Here\'s what happened." (live results)' },
    ],
  },
];

// ─── UTM Link Builder ─────────────────────────────────────────────────────────

const UTM_PRESETS = [
  { label: 'TikTok Spark Ad → /links', url: 'https://healthiswealth.live/links?utm_source=tiktok_spark&utm_medium=paid&utm_campaign=promo40&utm_content=djtymotion' },
  { label: 'Facebook Boost → /supplements', url: 'https://healthiswealth.live/supplements?utm_source=facebook&utm_medium=paid&utm_campaign=promo40&utm_content=promo_video' },
  { label: 'Pinterest Pin → /supplements', url: 'https://healthiswealth.live/supplements?utm_source=pinterest&utm_medium=paid&utm_campaign=promo40&utm_content=wellness_pin' },
  { label: 'TikTok Organic → /links', url: 'https://healthiswealth.live/links?utm_source=tiktok&utm_medium=organic&utm_campaign=flavorcrave_network' },
  { label: 'Instagram Bio → /links', url: 'https://healthiswealth.live/links?utm_source=instagram&utm_medium=organic&utm_campaign=flavorcrave_network' },
  { label: 'Email Broadcast → /supplements', url: 'https://healthiswealth.live/supplements?utm_source=email&utm_medium=welcome_seq&utm_campaign=flavorcrave_network' },
];

// ─── Hooks Bank ───────────────────────────────────────────────────────────────

const HOOKS = [
  { hook: '"The supplement that Marina Del Rey wellness people are obsessed with — and it costs $12."', platform: 'TikTok/Instagram', type: 'FOMO' },
  { hook: '"I stopped buying pre-workout and started doing this instead. Here\'s what happened in 30 days."', platform: 'TikTok', type: 'Story' },
  { hook: '"POV: You just discovered the superfood stack that changes everything."', platform: 'TikTok/Reels', type: 'POV' },
  { hook: '"Why I produce beats at 6am and what I take to make it happen."', platform: '@djtymotion', type: 'Personal' },
  { hook: '"Aw hell naw you\'ve been paying $80 for this when you can get the same thing for $14."', platform: '@awhellnaw247', type: 'Comedy' },
  { hook: '"The wellness routine nobody talks about — because it actually works."', platform: 'Instagram', type: 'Curiosity' },
  { hook: '"I tested 5 superfoods for 30 days. Here\'s the one that actually changed my energy."', platform: 'All channels', type: 'Authority' },
  { hook: '"This $13 powder has 4x more Vitamin C than oranges. I\'m not kidding."', platform: 'TikTok/Pinterest', type: 'Fact' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Marketing = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const spent = BUDGET_ALLOCATION.reduce((s, a) => s + a.amount, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-green-900/40 text-green-300 border-green-700 text-xs tracking-widest uppercase">
            Marketing Command Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            The FlavorCrave Network
          </h1>
          <p className="text-muted-foreground text-lg">
            $40 promotion · 18 channels · 5-day campaign
          </p>
        </div>

        {/* ── Budget Overview ── */}
        <div className="mb-10 rounded-xl border border-green-700/40 bg-green-900/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-bold tracking-widest uppercase text-sm">$40 Budget Breakdown</span>
            </div>
            <Badge className="bg-green-900/40 text-green-300 border-green-700">
              ${spent} allocated · ${BUDGET_TOTAL - spent} remaining
            </Badge>
          </div>

          {/* Budget bar */}
          <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-0.5">
            {BUDGET_ALLOCATION.map((a) => (
              <div
                key={a.platform}
                className={`bg-gradient-to-r ${a.color} transition-all`}
                style={{ width: `${(a.amount / BUDGET_TOTAL) * 100}%` }}
              />
            ))}
          </div>

          {/* Platform cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BUDGET_ALLOCATION.map((a) => (
              <div key={a.platform} className={`border ${a.border} bg-black/30 rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {a.icon}
                    <span className={`text-sm font-semibold ${a.accent}`}>{a.platform}</span>
                  </div>
                  <span className="text-white font-bold text-lg">${a.amount}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{a.channel}</p>
                <p className="text-xs text-muted-foreground/70 mb-3 leading-relaxed">{a.why}</p>
                <div className="space-y-1 mb-3">
                  {a.howTo.map((step, i) => (
                    <p key={i} className="text-xs text-muted-foreground">{step}</p>
                  ))}
                </div>
                <div className="bg-black/40 rounded-lg p-2 mb-3">
                  <p className="text-xs text-green-400">{a.expectedReturn}</p>
                </div>
                <a
                  href={a.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs ${a.accent} hover:opacity-80`}
                >
                  Launch on platform <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── UTM Tracking Links ── */}
        <div className="mb-10 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-accent" />
            <span className="font-semibold">Tracked Campaign Links</span>
            <Badge variant="outline" className="text-xs">All UTM tagged</Badge>
          </div>
          <div className="space-y-2">
            {UTM_PRESETS.map((preset) => (
              <div key={preset.label} className="flex items-center justify-between gap-3 bg-black/20 rounded-lg px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{preset.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{preset.url}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 h-7 px-2"
                  onClick={() => copy(preset.url, preset.label)}
                >
                  {copied === preset.label
                    ? <CheckCheck className="w-3 h-3 text-green-400" />
                    : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5-Day Content Calendar ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-accent" />
            <span className="font-semibold text-foreground">5-Day Campaign Calendar</span>
            <Badge variant="outline" className="text-xs">18 channels · all organic + paid</Badge>
          </div>
          <div className="space-y-3">
            {WEEKLY_CONTENT.map((day) => (
              <div key={day.day} className={`border ${day.color} rounded-xl p-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">{day.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{day.day}</span>
                </div>
                <div className="space-y-2 ml-13">
                  {day.tasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-accent">{task.channel}</span>
                        <span className="text-xs text-muted-foreground mx-1">·</span>
                        <span className="text-xs text-muted-foreground">{task.type}</span>
                        {task.tag && (
                          <span className="ml-2 text-[10px] bg-green-900/40 text-green-400 border border-green-700/40 px-1.5 py-0.5 rounded-full">
                            {task.tag}
                          </span>
                        )}
                        <p className="text-xs text-foreground/80 mt-0.5">{task.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hooks Bank ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-accent" />
            <span className="font-semibold text-foreground">Hooks Bank</span>
            <Badge variant="outline" className="text-xs">Copy → paste into TikTok/caption</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HOOKS.map((h, i) => (
              <div key={i} className="border border-border rounded-xl p-4 bg-card group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px]">{h.type}</Badge>
                  <span className="text-[10px] text-muted-foreground">{h.platform}</span>
                </div>
                <p className="text-sm text-foreground mb-3 leading-relaxed">{h.hook}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs"
                  onClick={() => copy(h.hook, `hook-${i}`)}
                >
                  {copied === `hook-${i}`
                    ? <><CheckCheck className="w-3 h-3 text-green-400 mr-1" />Copied</>
                    : <><Copy className="w-3 h-3 mr-1" />Copy Hook</>}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Expected ROI ── */}
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
          <TrendingUp className="w-6 h-6 text-accent mx-auto mb-3" />
          <h3 className="font-bold text-lg text-foreground mb-2">$40 Campaign — Expected Return</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold text-accent">15K–53K</p>
              <p className="text-xs text-muted-foreground">Total impressions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">270–1,010</p>
              <p className="text-xs text-muted-foreground">Link clicks tracked</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">8–32</p>
              <p className="text-xs text-muted-foreground">New email subscribers</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Each email subscriber = est. $30–50 LTV via affiliate commissions over 12 months.
            <br />
            <strong className="text-foreground">$40 in → $240–$1,600 out over time.</strong>
          </p>
        </div>

      </div>
    </div>
  );
};
