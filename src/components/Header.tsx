import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNav = [
    { label: 'Shop', path: '/supplements' },
    { label: 'Mission', path: '/mission' },
  ];

  const rightNav = [
    { label: 'Supplements', path: '/shop' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {leftNav.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                } hover:opacity-60`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center Brand */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className={`text-xl lg:text-2xl font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              HEALTH IS WEALTH
            </span>
          </Link>

          {/* Right Nav + Cart */}
          <nav className="hidden lg:flex items-center gap-8">
            {rightNav.map((item) => (
              item.id ? (
                <button
                  key={item.label}
                  onClick={scrollToContact}
                  className={`text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  } hover:opacity-60`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className={`text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  } hover:opacity-60`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <CartDrawer />
          </nav>

          {/* Mobile: hamburger left, cart right */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className={`transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <CartDrawer />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border/50 -mx-6 px-6">
            <div className="py-6 space-y-1">
              {[...leftNav, ...rightNav].map((item) =>
                'id' in item ? (
                  <button
                    key={item.label}
                    onClick={scrollToContact}
                    className="block w-full text-left text-[13px] font-medium tracking-[0.12em] uppercase text-foreground py-3 hover:opacity-60 transition-opacity"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path!}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[13px] font-medium tracking-[0.12em] uppercase text-foreground py-3 hover:opacity-60 transition-opacity"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
