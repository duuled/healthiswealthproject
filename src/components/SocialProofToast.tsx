import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X } from 'lucide-react';

interface PurchaseEvent {
  name: string;
  location: string;
  product: string;
  timeAgo: string;
}

const PURCHASE_EVENTS: PurchaseEvent[] = [
  { name: 'Marcus T.', location: 'Los Angeles, CA', product: 'Blue Spirulina Lemonade', timeAgo: '2 minutes ago' },
  { name: 'Amara J.', location: 'Atlanta, GA', product: 'Organic Moringa Powder', timeAgo: '5 minutes ago' },
  { name: 'Sofia R.', location: 'Miami, FL', product: 'Manuka Honey (16 oz)', timeAgo: '8 minutes ago' },
  { name: 'DeShawn K.', location: 'Chicago, IL', product: 'Sea Moss Gummies', timeAgo: '12 minutes ago' },
  { name: 'Priya M.', location: 'Houston, TX', product: 'Shilajit Pure Resin', timeAgo: '15 minutes ago' },
  { name: 'Jordan L.', location: 'Brooklyn, NY', product: 'Amla Powder Vitamin C', timeAgo: '18 minutes ago' },
  { name: 'Keisha W.', location: 'Dallas, TX', product: 'Chaga Mushroom Extract', timeAgo: '22 minutes ago' },
  { name: 'Liam O.', location: 'Seattle, WA', product: 'Astragalus Root Capsules', timeAgo: '27 minutes ago' },
  { name: 'Fatima A.', location: 'Detroit, MI', product: 'Berberine 1200mg', timeAgo: '31 minutes ago' },
  { name: 'Carlos V.', location: 'Phoenix, AZ', product: 'Magnesium Glycinate', timeAgo: '35 minutes ago' },
  { name: 'Nia B.', location: 'Oakland, CA', product: 'Power 5 Bundle', timeAgo: '40 minutes ago' },
  { name: 'Tyler H.', location: 'Nashville, TN', product: 'Blue Spirulina Lemonade', timeAgo: '44 minutes ago' },
];

export const SocialProofToast = () => {
  const [current, setCurrent] = useState<PurchaseEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const indexRef = useRef(0);
  const shuffled = useRef([...PURCHASE_EVENTS].sort(() => Math.random() - 0.5));

  useEffect(() => {
    // Start showing after 8 seconds
    const startDelay = setTimeout(() => {
      showNext();
    }, 8000);

    return () => clearTimeout(startDelay);
  }, []);

  const showNext = () => {
    const event = shuffled.current[indexRef.current % shuffled.current.length];
    indexRef.current++;
    setCurrent(event);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      // Queue next after 15-25s
      const nextDelay = 15000 + Math.random() * 10000;
      setTimeout(showNext, nextDelay);
    }, 5000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!current || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 z-[150] max-w-[280px] sm:max-w-[320px] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-background border border-border rounded-xl shadow-xl p-3 flex items-start gap-3">
        <div className="w-9 h-9 bg-secondary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <ShoppingBag className="w-4 h-4 text-secondary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground leading-tight">
            {current.name} <span className="text-muted-foreground font-normal">from {current.location}</span>
          </p>
          <p className="text-xs text-foreground mt-0.5">
            Just purchased <span className="font-semibold text-primary">{current.product}</span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{current.timeAgo}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
