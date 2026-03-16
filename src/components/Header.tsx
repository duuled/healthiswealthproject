import { useState } from 'react';
import { useEffect } from 'react';
import { Menu, X, Instagram, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';
import { AuthModal } from './AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

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
    { label: 'Contact', path: '/contact' },
  ];

  const navClass = `text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
    isScrolled ? 'text-foreground' : 'text-white'
  } hover:opacity-60`;

  return (
    <>
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
                <Link key={item.label} to={item.path} className={navClass}>
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

            {/* Right Nav + Auth + Cart */}
            <nav className="hidden lg:flex items-center gap-8">
              {rightNav.map((item) => (
                <Link key={item.label} to={item.path} className={navClass}>
                  {item.label}
                </Link>
              ))}

              <a
                href="https://www.instagram.com/aisearchblog/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-200 ${isScrolled ? 'text-foreground' : 'text-white'} hover:opacity-60`}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://aisearchblog.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-200 ${isScrolled ? 'text-foreground' : 'text-white'} hover:opacity-60`}
                aria-label="Newsletter on WordPress"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.5 12c0-1.19.254-2.318.7-3.342l3.86 10.58A8.504 8.504 0 013.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117A8.457 8.457 0 0112 20.5zm1.076-12.474c.512-.027.973-.08.973-.08.458-.054.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.238-.108-2.238-.108-.458-.026-.512.675-.054.702 0 0 .434.053.892.08l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.054.404-.728-.054-.702 0 0-1.376.108-2.265.108-.16 0-.347-.004-.542-.01A8.468 8.468 0 0112 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.728-1.427 1.51 0 .7.404 1.292.835 1.994.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.647 2.748l-.848 2.833-3.067-9.128zm3.924 11.6l2.594-7.5c.485-1.212.646-2.18.646-3.044 0-.313-.02-.603-.058-.878A8.467 8.467 0 0120.5 12a8.504 8.504 0 01-3.5 6.876z"/></svg>
              </a>

              {/* Auth */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`transition-colors duration-200 ${isScrolled ? 'text-foreground' : 'text-white'} hover:opacity-60`} aria-label="Account">
                      <User className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                      {profile?.full_name || user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-destructive gap-2">
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className={`transition-colors duration-200 ${isScrolled ? 'text-foreground' : 'text-white'} hover:opacity-60`}
                  aria-label="Sign In"
                >
                  <User className="w-4 h-4" />
                </button>
              )}

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
                {[...leftNav, ...rightNav].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[13px] font-medium tracking-[0.12em] uppercase text-foreground py-3 hover:opacity-60 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-[13px] font-medium tracking-[0.12em] uppercase text-foreground py-3 hover:opacity-60 transition-opacity"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="block w-full text-left text-[13px] font-medium tracking-[0.12em] uppercase text-destructive py-3 hover:opacity-60 transition-opacity"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setAuthOpen(true); setIsMenuOpen(false); }}
                    className="block w-full text-left text-[13px] font-medium tracking-[0.12em] uppercase text-foreground py-3 hover:opacity-60 transition-opacity"
                  >
                    Sign In
                  </button>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <a href="https://www.instagram.com/aisearchblog/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://aisearchblog.wordpress.com/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60" aria-label="Newsletter">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.5 12c0-1.19.254-2.318.7-3.342l3.86 10.58A8.504 8.504 0 013.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117A8.457 8.457 0 0112 20.5zm1.076-12.474c.512-.027.973-.08.973-.08.458-.054.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.238-.108-2.238-.108-.458-.026-.512.675-.054.702 0 0 .434.053.892.08l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.054.404-.728-.054-.702 0 0-1.376.108-2.265.108-.16 0-.347-.004-.542-.01A8.468 8.468 0 0112 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.728-1.427 1.51 0 .7.404 1.292.835 1.994.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.647 2.748l-.848 2.833-3.067-9.128zm3.924 11.6l2.594-7.5c.485-1.212.646-2.18.646-3.044 0-.313-.02-.603-.058-.878A8.467 8.467 0 0120.5 12a8.504 8.504 0 01-3.5 6.876z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};
