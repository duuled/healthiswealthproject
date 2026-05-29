import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Check, Star, ArrowRight, ChevronDown, Clock,
  Leaf, Zap, Brain, Heart, Award, Users, TrendingUp, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── COUNTDOWN TIMER ─────────────────────────────────────── */
const useCountdown = (minutes: number) => {
  const end = useRef(Date.now() + minutes * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  useEffect(() => {
    const stored = sessionStorage.getItem('funnelCountdown');
    if (stored) end.current = parseInt(stored);
    else sessionStorage.setItem('funnelCountdown', end.current.toString());
    const tick = setInterval(() => {
      const remaining = Math.max(0, Math.round((end.current - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(tick);
  }, []);
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  return { m, s, expired: timeLeft === 0 };
};

/* ─── DATA ────────────────────────────────────────────────── */
const BENEFITS = [
  { icon: Zap, title: 'All-Day Energy', desc: 'No crash. No jitters. Sustained mitochondrial fuel from moringa + amla.' },
  { icon: Shield, title: 'Immune Fortress', desc: 'Sea moss (92 minerals) + amla vitamin C + manuka honey build a wall.' },
  { icon: Brain, title: 'Mental Clarity', desc: 'Phycocyanin from blue spirulina crosses the blood-brain barrier. Focus sharpens.' },
  { icon: Heart, title: 'Gut Healed', desc: 'Manuka MGO 263+ repairs gut lining + feeds beneficial bacteria.' },
  { icon: Leaf, title: 'Deep Detox', desc: 'Chlorophyll + antioxidants from 5 superfoods flush systemic inflammation.' },
];

const TESTIMONIALS = [
  {
    name: 'Marcus T.',
    location: 'Los Angeles, CA',
    stars: 5,
    text: 'I dropped 3 coffees a day in 2 weeks. The energy from this stack is different — smooth, not spiked. I\'ve referred 4 people already.',
    result: 'Coffee-free in 14 days',
  },
  {
    name: 'Amara J.',
    location: 'Atlanta, GA',
    stars: 5,
    text: 'My skin cleared in 3 weeks. I\'ve been fighting breakouts for years and nobody told me it was inflammation and gut health. This fixed both.',
    result: 'Skin clear in 21 days',
  },
  {
    name: 'DeShawn K.',
    location: 'Chicago, IL',
    stars: 5,
    text: '90 days in. Lost 14 lbs, sleep improved, gym performance is up. I\'ve been recommending this to every man I know over 30.',
    result: '14 lbs down in 90 days',
  },
  {
    name: 'Sofia R.',
    location: 'Miami, FL',
    stars: 5,
    text: 'As a nurse I\'m skeptical of everything. I researched every ingredient before buying. The science is legit. Been on it for 4 months.',
    result: 'Science-verified by RN',
  },
];

const FAQS = [
  {
    q: 'How long before I see results?',
    a: 'Most people notice improved energy and digestion in 7–14 days. Skin, immunity, and deep cellular changes typically appear between 3–6 weeks of consistent daily use.',
  },
  {
    q: 'Is this safe to take together?',
    a: 'Yes. All 5 superfoods are whole-food-based, not pharmaceutical. They have been used together in traditional wellness protocols for centuries and work synergistically.',
  },
  {
    q: 'Do I need to change my diet?',
    a: 'No. The Power 5 works as a daily supplement to your current routine. Results improve with better diet, but significant benefits occur with no other changes.',
  },
  {
    q: 'What\'s the money-back guarantee?',
    a: 'We stand behind the Power 5 with a 30-day satisfaction guarantee. If you follow the protocol and don\'t notice a difference, contact us for a full refund.',
  },
  {
    q: 'Can I take this with medication?',
    a: 'If you take blood thinners, thyroid medication, or have a chronic condition, consult your doctor first. Sea moss has significant iodine content that can affect thyroid medication.',
  },
];

const POWER5_PRODUCTS = [
  { name: 'Blue Spirulina Lemonade', dose: '½ tsp daily', benefit: 'Antioxidants + brain clarity', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Organic Moringa Powder', dose: '1 tsp daily', benefit: 'Clean energy + 90+ nutrients', color: 'from-emerald-500/20 to-green-500/20' },
  { name: 'Amla Powder (Vitamin C)', dose: '1 tsp daily', benefit: 'Immune shield + collagen', color: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'Manuka Honey MGO 263+', dose: '1 tbsp daily', benefit: 'Gut armor + antibacterial', color: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Sea Moss Gummies', dose: '2 gummies daily', benefit: '92 minerals + thyroid support', color: 'from-purple-500/20 to-pink-500/20' },
];

/* ─── STICKY BUY BAR ──────────────────────────────────────── */
const StickyBuyBar = ({ scrolled, onCTA }: { scrolled: boolean; onCTA: () => void }) => (
  <div className={`fixed bottom-0 left-0 right-0 z-[80] transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
    <div className="bg-background/98 backdrop-blur-md border-t border-primary/30 shadow-2xl px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-bold">Power 5 Bundle — Limited Offer</p>
          <p className="text-xs text-muted-foreground">Save 20% · Free shipping · 30-day guarantee</p>
        </div>
        <Button onClick={onCTA} className="w-full sm:w-auto font-bold gap-2 px-6">
          Get the Bundle <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
);

/* ─── FAQ ITEM ────────────────────────────────────────────── */
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
          {a}
        </div>
      )}
    </div>
  );
};

/* ─── MAIN PAGE ───────────────────────────────────────────── */
export const FunnelPage = () => {
  const { m, s } = useCountdown(18);
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">

      {/* ── ANNOUNCEMENT BAR ────────────────────────────────── */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs font-semibold tracking-wide">
        ⚡ LIMITED OFFER — Bundle saves 20% · Offer expires in{' '}
        <span className="font-black">{m}:{s}</span> · Free shipping over $50
      </div>

      {/* ── HERO / VSL SECTION ──────────────────────────────── */}
      <section className="px-4 py-14 sm:py-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-secondary/20 text-foreground rounded-full px-4 py-1.5 text-xs font-semibold mb-5 uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5 text-secondary-foreground" />
          Backed by 3,000 Years of Wellness Tradition
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 font-[Playfair_Display]">
          The 5 Superfoods That Will{' '}
          <span className="text-primary">Change Everything</span>{' '}
          About How You Feel
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          More energy. Stronger immunity. Clearer mind. Healthier gut.
          The <strong className="text-foreground">Power 5 Protocol</strong> uses ancient superfoods
          validated by modern science to transform how your body performs — starting in 7 days.
        </p>

        {/* Social Proof Row */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
            </div>
            <span className="text-sm font-semibold">4.9/5</span>
            <span className="text-sm text-muted-foreground">(847 reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span><strong className="text-foreground">5,000+</strong> active users</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span><strong className="text-foreground">30-day</strong> guarantee</span>
          </div>
        </div>

        {/* VSL Placeholder */}
        <div className="relative bg-black rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto mb-10 shadow-2xl border border-border group cursor-pointer">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary-foreground border-b-[10px] border-b-transparent ml-1" />
            </div>
            <p className="text-white font-semibold text-lg">Watch: The Power 5 Protocol Explained</p>
            <p className="text-white/60 text-sm mt-1">3 minutes · No fluff</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/80 to-secondary/20" />
          {/* Placeholder thumbnail text */}
          <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            WATCH THIS FIRST
          </div>
        </div>

        {/* Primary CTA */}
        <div ref={ctaRef}>
          <Button
            size="lg"
            className="text-lg font-black px-10 py-6 gap-3 shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => window.location.href = '/shop'}
          >
            Get the Power 5 Bundle — Save 20%
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Free shipping · 30-day money back · Ships within 2 business days
          </p>
        </div>
      </section>

      {/* ── PROBLEM AGITATION ───────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 font-[Playfair_Display]">
            Does This Sound Familiar?
          </h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Most people feel this way and think it's "just aging." It's not.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'You need 2–3 coffees just to feel "normal"',
              'You get sick every time the season changes',
              'Your energy crashes hard in the afternoon',
              'Brain fog makes focus feel impossible',
              'You sleep 7–8 hours and still wake up tired',
              'Your gut is constantly bloated or inflamed',
              'You\'ve tried supplements that "didn\'t work"',
              'You feel like your body is working against you',
            ].map(pain => (
              <div key={pain} className="flex items-start gap-3 bg-card border border-border rounded-lg p-3">
                <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <span className="text-sm">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm max-w-xl mx-auto">
            These aren't lifestyle issues. They're <strong className="text-foreground">nutritional gaps</strong> — the
            essential minerals, vitamins, and phytonutrients your body is starving for. The Power 5 fills them.
          </p>
        </div>
      </section>

      {/* ── THE POWER 5 ─────────────────────────────────────── */}
      <section className="py-14 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-[Playfair_Display]">
          Meet the Power 5
        </h2>
        <p className="text-center text-muted-foreground mb-10 text-sm max-w-xl mx-auto">
          Five superfoods. One protocol. Each one exceptional alone.
          Together, they create a nutritional synergy that's greater than the sum of the parts.
        </p>
        <div className="space-y-4">
          {POWER5_PRODUCTS.map((p, i) => (
            <div key={p.name} className={`bg-gradient-to-r ${p.color} border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
              <div className="w-9 h-9 bg-background rounded-full flex items-center justify-center font-black text-primary text-sm shrink-0">
                0{i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.benefit}</p>
              </div>
              <div className="text-xs font-semibold bg-background/60 px-3 py-1.5 rounded-full border border-border shrink-0">
                {p.dose}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-primary/8 border border-primary/25 rounded-xl p-5 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">
            🧪 The Synergy Advantage
          </p>
          <p className="text-sm text-muted-foreground">
            Amla's vitamin C triples moringa's iron absorption. Manuka's prebiotics amplify sea moss's gut benefits.
            Blue spirulina's antioxidants protect the other 4 from oxidative degradation.
            This isn't random — this is nutritional engineering.
          </p>
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────── */}
      <section className="bg-muted/20 border-y border-border py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-[Playfair_Display]">
            What You'll Experience
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">
            Week 1 through Month 3 — here's the transformation timeline.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-5">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold mb-4 text-center">Expected Results Timeline</h3>
            <div className="space-y-3">
              {[
                { period: 'Days 1–7', result: 'Improved digestion, better sleep quality, reduced bloating' },
                { period: 'Weeks 2–3', result: 'Noticeable energy increase, reduced afternoon crash, mental clarity' },
                { period: 'Week 4', result: 'Skin improvements, stronger immune response, sustained daily energy' },
                { period: 'Month 2+', result: 'Deep cellular benefits: inflammation reduction, hormonal balance, weight optimization' },
              ].map(({ period, result }) => (
                <div key={period} className="flex gap-3 items-start">
                  <span className="text-xs font-black text-primary bg-primary/10 rounded-full px-2.5 py-1 shrink-0 mt-0.5">{period}</span>
                  <span className="text-sm">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-14 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-[Playfair_Display]">
          Real People. Real Results.
        </h2>
        <p className="text-center text-muted-foreground mb-10 text-sm">
          Verified buyers from our community.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                </div>
                <span className="text-xs bg-secondary/20 text-foreground font-semibold px-2.5 py-1 rounded-full">
                  ✓ {t.result}
                </span>
              </div>
              <p className="text-sm text-foreground/90 italic mb-4">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location} · Verified Buyer</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST + GUARANTEE ───────────────────────────────── */}
      <section className="bg-muted/20 border-y border-border py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3 font-[Playfair_Display]">
            The 30-Day Results Guarantee
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm leading-relaxed">
            Follow the Power 5 Protocol for 30 days. If you don't notice a measurable improvement in energy,
            focus, digestion, or immunity — email us. We'll issue a full refund. No questions.
            No return shipping. We take the risk so you don't have to.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            {[
              { icon: Shield, label: '30-Day Guarantee' },
              { icon: Check, label: 'Organic Certified' },
              { icon: Award, label: '3rd Party Tested' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold bg-destructive/10 text-destructive rounded-full px-4 py-1.5 mb-5">
          <Clock className="w-3.5 h-3.5" />
          Bundle discount expires in {m}:{s}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black mb-3 font-[Playfair_Display]">
          Start Your Power 5 Protocol Today
        </h2>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-lg mx-auto">
          5,000+ people have already made the switch. Energy is up. Immunity is stronger.
          Brain fog is gone. Your transformation starts with one decision.
        </p>

        {/* Offer Box */}
        <div className="bg-card border-2 border-primary/40 rounded-2xl p-7 mb-6 shadow-xl">
          <div className="text-center mb-5">
            <div className="text-lg font-bold mb-1">Power 5 Bundle</div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-black text-primary">Save 20%</span>
              <span className="text-sm text-muted-foreground">vs buying individually</span>
            </div>
          </div>
          <ul className="space-y-2 mb-6">
            {POWER5_PRODUCTS.map(p => (
              <li key={p.name} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0" />
                {p.name}
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary shrink-0" />
              Free Superfood Wellness Guide (PDF)
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary shrink-0" />
              30-Day Money Back Guarantee
            </li>
          </ul>
          <Button
            size="lg"
            className="w-full text-base font-black py-6 gap-2 shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => window.location.href = '/shop'}
          >
            Get My Power 5 Bundle <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            🔒 Secure checkout · Ships in 2 business days · 30-day guarantee
          </p>
        </div>

        {/* Secondary CTA */}
        <p className="text-sm text-muted-foreground">
          Want to try before you bundle?{' '}
          <Link to="/supplements" className="text-primary underline font-medium hover:no-underline">
            Browse individual products →
          </Link>
        </p>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-10 px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 font-[Playfair_Display]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* Sticky Bar */}
      <StickyBuyBar scrolled={scrolled} onCTA={() => window.location.href = '/shop'} />
    </div>
  );
};

export default FunnelPage;
