import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download, Shield, Star, Zap, Heart, Brain, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GUIDE_BENEFITS = [
  { icon: Zap, text: 'The Power 5 Morning Protocol that eliminates caffeine dependency' },
  { icon: Shield, text: 'Which 7 superfoods actually work (and which are overpriced hype)' },
  { icon: Brain, text: 'The exact dosing schedule for max cognitive performance' },
  { icon: Heart, text: 'How to build immunity before cold & flu season' },
  { icon: Leaf, text: 'Our top supplement stacks for energy, sleep, and fat loss' },
  { icon: Star, text: 'The cheapest places to source premium superfoods online' },
];

const TESTIMONIALS = [
  { name: 'Amara J.', role: 'Fitness Coach, Atlanta GA', text: 'This guide cut through all the BS I\'d been reading for years. I implemented the Power 5 and my energy hasn\'t dipped once in 60 days.' },
  { name: 'Marcus T.', role: 'Software Engineer, LA', text: '3 weeks in and I dropped 2 coffees a day. The moringa + amla combo in the morning is no joke.' },
  { name: 'Sofia R.', role: 'Registered Nurse, Miami', text: 'As a healthcare professional, I appreciate that everything is sourced to actual clinical studies. Not influencer opinions.' },
];

export const LeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Open newsletter with email
    window.open(`https://aisearchbrief.blog?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-primary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              <Download className="w-4 h-4" />
              Free Digital Guide — Instant Access
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 font-[Playfair_Display]">
              The Ultimate{' '}
              <span className="text-primary">Superfood</span>{' '}
              Wellness Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              36 pages of no-BS wellness science. The exact protocols, dosing schedules,
              and superfood stacks used by 5,000+ members of our community to optimize
              energy, immunity, and longevity.
            </p>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-5 mb-8">
              {[
                { value: '5,000+', label: 'Downloads' },
                { value: '36', label: 'Pages' },
                { value: '100%', label: 'Free' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8">
              {GUIDE_BENEFITS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3 h-3 text-foreground" />
                  </div>
                  <span className="text-sm text-foreground/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="lg:pl-8">
            {!submitted ? (
              <div className="bg-card border border-border rounded-2xl p-7 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3">📗</div>
                  <h2 className="text-xl font-bold font-[Playfair_Display]">Get Your Free Guide</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instant access. No credit card required.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">First Name</label>
                    <Input
                      placeholder="Your first name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full font-bold text-base py-5 gap-2">
                    <Download className="w-4 h-4" />
                    Send Me the Free Guide
                  </Button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>100% private. We never sell your data. Unsubscribe anytime.</span>
                </div>

                {/* Bonus note */}
                <div className="mt-5 bg-primary/8 border border-primary/20 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-foreground">
                    🎁 <strong>Bonus:</strong> Get an exclusive 10% off your first order in your welcome email
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-7 shadow-xl text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Check Your Email!</h3>
                <p className="text-muted-foreground text-sm mb-5">
                  We've sent your free guide + a 10% discount code to <strong>{email}</strong>.
                  Check your spam folder if you don't see it in 2 minutes.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/shop">
                      Shop Our Products <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/blog">Read the Blog</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 font-[Playfair_Display]">
          What's Inside the Guide
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          36 pages of actionable wellness science — no affiliate padding, no vague advice.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { chapter: '01', title: 'The Power 5 Protocol', desc: 'The 5 superfoods that work synergistically for daily optimization' },
            { chapter: '02', title: 'Morning Ritual Science', desc: 'Why timing and sequence of nutrients matters more than quantity' },
            { chapter: '03', title: 'Supplement Dose Guide', desc: 'Exact quantities, timing, and cycling protocols for each superfood' },
            { chapter: '04', title: 'Immune Stack Protocols', desc: 'Seasonal immune defense routines used by integrative medicine practitioners' },
            { chapter: '05', title: 'Budget Buying Guide', desc: 'How to source premium quality at 40-60% below retail prices' },
            { chapter: '06', title: 'Red Flags & Fakes', desc: 'How to identify low-quality, adulterated, or mislabeled supplements' },
          ].map(chapter => (
            <div key={chapter.chapter} className="bg-card border border-border rounded-xl p-5">
              <span className="text-3xl font-black text-primary/20 block mb-2">{chapter.chapter}</span>
              <h3 className="font-bold mb-1.5">{chapter.title}</h3>
              <p className="text-sm text-muted-foreground">{chapter.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-14 px-4 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 font-[Playfair_Display]">
            What Readers Are Saying
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-5">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 italic mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3 font-[Playfair_Display]">
          Start Your Wellness Transformation
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Thousands of people have used this guide to build lasting health habits.
          It's 100% free. No strings attached.
        </p>
        <Button
          size="lg"
          className="font-bold gap-2 text-base px-8"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Download className="w-5 h-5" />
          Get the Free Guide Now
        </Button>
      </section>
    </div>
  );
};

export default LeadMagnet;
