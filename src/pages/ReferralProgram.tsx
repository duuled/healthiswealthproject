import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Gift, Copy, Check, Share2, ArrowRight, Star, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Users,
    title: 'Share Your Link',
    desc: 'Get your unique referral link below and share it with friends, family, or your social audience.',
  },
  {
    step: '02',
    icon: Gift,
    title: 'They Save 10%',
    desc: 'Every person who shops using your link gets 10% off their first order automatically.',
  },
  {
    step: '03',
    icon: Star,
    title: 'You Earn Credit',
    desc: 'For every completed purchase, you earn $10 store credit — redeemable on any future order.',
  },
];

const REWARDS_TIERS = [
  { referrals: 1, reward: '$10 store credit', badge: '🌱 Wellness Starter' },
  { referrals: 5, reward: '$60 store credit + free product', badge: '🌿 Health Champion' },
  { referrals: 10, reward: '$150 store credit + branded kit', badge: '⚡ Wellness Ambassador' },
  { referrals: 25, reward: '$500 credit + affiliate commission', badge: '👑 Elite Partner' },
];

export const ReferralProgram = () => {
  const [email, setEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generateReferralLink = () => {
    if (!email) return;
    const code = btoa(email).replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase();
    const link = `https://healthiswealth.live/?ref=${code}`;
    setReferralLink(link);
    setSubmitted(true);
  };

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share && referralLink) {
      await navigator.share({
        title: 'Get 10% off at Health Is Wealth',
        text: 'I\'ve been using these superfoods and the results are incredible. Use my link for 10% off your first order!',
        url: referralLink,
      });
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = encodeURIComponent(`I've been using Health Is Wealth superfoods and the results are real. Use my link for 10% off! ${referralLink}`);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${text}`,
      whatsapp: `https://wa.me/?text=${text}`,
    };
    if (urls[platform]) window.open(urls[platform], '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <Gift className="w-4 h-4" />
            Referral Program
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-[Playfair_Display]">
            Share Wellness,{' '}
            <span className="text-primary">Earn Rewards</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Give your friends 10% off their first order. You earn $10 store credit for every
            purchase they make. No limits. No expiration.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10 font-[Playfair_Display]">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {step.slice(1)}
                </span>
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Get Your Link */}
      <section className="py-10 px-4 bg-muted/30 border-y border-border">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 font-[Playfair_Display]">
            Get Your Referral Link
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Enter your email to generate your unique referral link.
          </p>

          {!submitted ? (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Your Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && generateReferralLink()}
                  />
                </div>
                <Button
                  className="w-full font-semibold gap-2"
                  onClick={generateReferralLink}
                  disabled={!email}
                >
                  <Zap className="w-4 h-4" />
                  Generate My Referral Link
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-500" />
                <p className="font-semibold">Your referral link is ready!</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Share this link and earn $10 for every friend who makes a purchase.
              </p>

              {/* Link display */}
              <div className="flex gap-2 mb-5">
                <Input
                  value={referralLink}
                  readOnly
                  className="font-mono text-xs bg-muted"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Button
                  variant="outline"
                  className="gap-2 text-sm"
                  onClick={() => shareOnSocial('whatsapp')}
                >
                  💬 WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 text-sm"
                  onClick={() => shareOnSocial('twitter')}
                >
                  𝕏 Twitter / X
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 text-sm"
                  onClick={() => shareOnSocial('facebook')}
                >
                  📘 Facebook
                </Button>
                <Button
                  className="gap-2 text-sm"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>

              <div className="bg-primary/8 border border-primary/20 rounded-lg p-3 text-center mt-4">
                <p className="text-xs text-foreground">
                  💡 Pro tip: Share in a wellness group, Instagram story, or family chat for fastest results!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Rewards Tiers */}
      <section className="py-14 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-3 font-[Playfair_Display]">
          Reward Tiers
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          The more you share, the more you earn. Unlock bigger rewards as your referrals grow.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REWARDS_TIERS.map((tier, idx) => (
            <div
              key={tier.referrals}
              className={`border rounded-xl p-5 text-center transition-all ${
                idx === 0
                  ? 'border-border bg-card'
                  : idx === 1
                  ? 'border-secondary/50 bg-secondary/5'
                  : idx === 2
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-primary bg-primary/10 shadow-lg'
              }`}
            >
              <div className="text-3xl mb-2">{tier.badge.split(' ')[0]}</div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                {tier.badge.split(' ').slice(1).join(' ')}
              </p>
              <p className="text-2xl font-black text-primary mb-1">{tier.referrals}</p>
              <p className="text-xs text-muted-foreground mb-3">referral{tier.referrals > 1 ? 's' : ''}</p>
              <p className="text-sm font-semibold">{tier.reward}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 px-4 bg-muted/20 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 font-[Playfair_Display]">
            Common Questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'When do I get my credit?',
                a: 'Store credit is applied within 48 hours of your referral completing their first purchase. You\'ll receive an email confirmation.',
              },
              {
                q: 'Does my referral link expire?',
                a: 'Never. Your referral link is permanent and will continue earning credits indefinitely.',
              },
              {
                q: 'Is there a limit to how much I can earn?',
                a: 'No limits. Refer 100 people, earn $1,000 in store credit. Some of our top sharers have earned over $500 in credits.',
              },
              {
                q: 'Can I use credits on sale items?',
                a: 'Yes. Store credits can be applied to any order including sale items. There\'s no minimum order requirement.',
              },
            ].map(faq => (
              <div key={faq.q} className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 text-center">
        <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3 font-[Playfair_Display]">
          Ready to Start Earning?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">
          Share health, earn rewards, and help your community live better.
          It's that simple.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="gap-2"
          >
            <Gift className="w-4 h-4" /> Get My Referral Link
          </Button>
          <Button variant="outline" asChild>
            <Link to="/shop">
              Shop First <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ReferralProgram;
