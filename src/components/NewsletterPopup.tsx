import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('newsletter_dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletter_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to newsletter signup
    window.open(`https://aisearchbrief.blog`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 fade-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Stay Informed
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sign up to our newsletter at <strong>aisearchbrief.blog</strong> for the latest health tips, supplement guides, and exclusive wellness content.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-muted/50 border-border"
              />
              <Button type="submit" className="w-full h-12 font-semibold">
                Subscribe to Newsletter
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
            <p className="text-muted-foreground">Check out our blog for the latest updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};
