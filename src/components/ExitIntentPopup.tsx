import { useState, useEffect, useRef } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasShown = useRef(false);
  const DISCOUNT_CODE = 'WELLNESS10';

  useEffect(() => {
    const dismissed = sessionStorage.getItem('exitIntentDismissed');
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 20 && !hasShown.current) {
        hasShown.current = true;
        setIsVisible(true);
      }
    };

    // Mobile: show after 45s idle
    const mobileTimer = setTimeout(() => {
      if (!hasShown.current) {
        hasShown.current = true;
        setIsVisible(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('exitIntentDismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Redirect to newsletter with email pre-filled
    window.open(`https://aisearchbrief.blog?email=${encodeURIComponent(email)}`, '_blank');
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-background border border-primary/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center">
                  <Gift className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-1 font-[Playfair_Display]">
                Wait — Before You Go!
              </h2>
              <p className="text-center text-muted-foreground text-sm mb-5">
                Get <span className="text-primary font-bold">10% OFF</span> your first order + a free
                wellness guide when you join our community.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-muted/40"
                />
                <Button type="submit" className="w-full font-semibold gap-2">
                  Claim My 10% Off <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-3">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-center text-muted-foreground mb-2">
                  Or use code at checkout:
                </p>
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 rounded-lg py-2 px-4 font-mono font-bold text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  {DISCOUNT_CODE}
                  <span className="text-xs font-sans text-muted-foreground">
                    {copied ? '✓ Copied!' : 'Click to copy'}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold mb-2">You're In!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Check your inbox for your welcome gift. Use code below at checkout:
              </p>
              <button
                onClick={handleCopy}
                className="mx-auto flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 rounded-lg py-2 px-6 font-mono font-bold text-primary text-base hover:bg-primary/20 transition-colors"
              >
                {DISCOUNT_CODE}
                <span className="text-xs font-sans text-muted-foreground">
                  {copied ? '✓ Copied!' : 'Click to copy'}
                </span>
              </button>
              <Button
                className="mt-4 w-full"
                onClick={() => {
                  handleDismiss();
                  window.location.href = '/shop';
                }}
              >
                Shop Now →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
