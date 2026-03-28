import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-2xl mx-auto bg-background border border-border rounded-xl shadow-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Stay Informed</p>
          <p className="text-xs text-muted-foreground truncate">
            Sign up to our newsletter at <strong>aisearchbrief.blog</strong> for health tips & wellness content.
          </p>
        </div>
        <Button
          size="sm"
          className="shrink-0 font-semibold"
          onClick={() => window.open('https://aisearchbrief.blog', '_blank')}
        >
          Subscribe
        </Button>
        <button
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
