import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Search } from 'lucide-react';
import logoImage from '@/assets/health-is-wealth-logo.jpg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const motivationalQuotes = [
    "Invest in Your Health – Wealth Follows!",
    "Affordable Wellness for West LA & Beyond!",
    "Your Health Journey Starts Here!",
    "Natural Supplements, Naturally Affordable!"
  ];
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(quoteInterval);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Supplements', id: 'supplements' },
    { label: 'Directory', id: 'directory' },
    { label: 'Fitness Plans', id: 'fitness' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-background/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo and Brand - Minimized */}
          <div className="flex items-center space-x-2">
            <img 
              src={logoImage} 
              alt="Bitten leaf logo with money sign for Health Is Wealth in Santa Monica" 
              className="w-8 h-8 leaf-animation" 
            />
            <div>
              <h1 className="text-lg font-bold text-foreground">Health Is Wealth</h1>
              <p className="text-xs text-primary font-medium hidden sm:block">
                {motivationalQuotes[currentQuoteIndex]}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA - Minimized */}
          <div className="hidden md:flex items-center">
            <Button 
              onClick={() => scrollToSection('supplements')}
              size="sm"
              className="btn-primary"
            >
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <Button 
                  onClick={() => scrollToSection('supplements')}
                  className="btn-primary w-full"
                >
                  Get Free Health Tips
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};