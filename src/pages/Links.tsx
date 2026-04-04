import { useState } from 'react';
import { Youtube, Instagram, Linkedin, Twitter, Radio, Music2, Pin, ShoppingBag, ExternalLink, ShoppingCart, Leaf } from 'lucide-react';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import { subscribeEmail } from '@/lib/newsletter';

// ─── Link data ────────────────────────────────────────────────────────────────

const FEATURED_LINKS = [
  {
    label: 'Shop Wellness Supplements',
    sublabel: 'Moringa · Shilajit · Chaga · Amla · Neem',
    href: 'https://healthiswealth.live/supplements',
    icon: <Leaf className="w-5 h-5" />,
    accent: 'from-green-500 to-emerald-600',
    cta: true,
  },
  {
    label: 'Health Is Wealth Store',
    sublabel: 'Premium products — Amazon affiliate',
    href: 'https://healthiswealth.live/shop',
    icon: <ShoppingCart className="w-5 h-5" />,
    accent: 'from-amber-500 to-orange-500',
    cta: true,
  },
  {
    label: 'Free Power 5 Smoothie Recipe',
    sublabel: 'Download the wellness guide',
    href: 'https://healthiswealth.live/',
    icon: <span className="text-base">🥤</span>,
    accent: 'from-cyan-500 to-blue-500',
    cta: true,
  },
];

const CHANNELS = [
  { label: 'DJ Ty Motion',       sublabel: '@djtymotion',          href: 'https://www.tiktok.com/@djtymotion',          icon: <TikTokIcon className="w-4 h-4" />, color: 'border-blue-700/40 hover:border-blue-500' },
  { label: 'Taste Table',        sublabel: '@tastetable',           href: 'https://www.tiktok.com/@tastetable',          icon: <TikTokIcon className="w-4 h-4" />, color: 'border-orange-700/40 hover:border-orange-500' },
  { label: 'Comedy Landmark',    sublabel: '@comedian_landmark',    href: 'https://www.tiktok.com/@comedian_landmark',   icon: <TikTokIcon className="w-4 h-4" />, color: 'border-yellow-700/40 hover:border-yellow-500' },
  { label: 'Aw Hell Naw',        sublabel: '@awhellnaw247',         href: 'https://www.tiktok.com/@awhellnaw247',        icon: <TikTokIcon className="w-4 h-4" />, color: 'border-red-700/40 hover:border-red-500' },
  { label: 'Venice Beats',       sublabel: '@venicebeatsmusic',     href: 'https://www.tiktok.com/@venicebeatsmusic',    icon: <TikTokIcon className="w-4 h-4" />, color: 'border-cyan-700/40 hover:border-cyan-500' },
  { label: 'Clips Up 247',       sublabel: '@clipsup247',           href: 'https://www.tiktok.com/@clipsup247',          icon: <TikTokIcon className="w-4 h-4" />, color: 'border-green-700/40 hover:border-green-500' },
  { label: "They're Here 247",   sublabel: '@theyrehere247',        href: 'https://www.tiktok.com/@theyrehere247',       icon: <TikTokIcon className="w-4 h-4" />, color: 'border-gray-600/40 hover:border-gray-400' },
  { label: 'Beats By The Motion',sublabel: '@beatsbythemotion',     href: 'https://www.youtube.com/@beatsbythemotion',   icon: <Youtube className="w-4 h-4" />,    color: 'border-red-700/40 hover:border-red-500' },
  { label: 'Ty Motion VSL',      sublabel: '@tymotionvsl',          href: 'https://www.instagram.com/tymotionvsl/',      icon: <Instagram className="w-4 h-4" />,  color: 'border-pink-700/40 hover:border-pink-500' },
  { label: 'Aw Heck Naw 247',    sublabel: '@awhecknaw247',         href: 'https://www.instagram.com/awhecknaw247/',     icon: <Instagram className="w-4 h-4" />,  color: 'border-rose-700/40 hover:border-rose-500' },
  { label: 'Time For Action',    sublabel: '@time_for_action567',   href: 'https://www.instagram.com/time_for_action567/',icon: <Instagram className="w-4 h-4" />, color: 'border-emerald-700/40 hover:border-emerald-500' },
  { label: 'Keaton Tyler',       sublabel: 'LinkedIn',              href: 'https://www.linkedin.com/in/keaton-tyler-8b3b10b7', icon: <Linkedin className="w-4 h-4" />, color: 'border-blue-800/40 hover:border-blue-600' },
  { label: 'K Tyler Motion',     sublabel: '@ktylermotion',         href: 'https://x.com/ktylermotion',                 icon: <Twitter className="w-4 h-4" />,    color: 'border-gray-600/40 hover:border-gray-400' },
  { label: 'Live Live Radio',    sublabel: 'WordPress Blog',        href: 'https://liveliveradio.wordpress.com/',        icon: <Radio className="w-4 h-4" />,      color: 'border-violet-700/40 hover:border-violet-500' },
  { label: 'Rapchat',            sublabel: 'Music drops',           href: 'https://rapch.at/MTgUWcUQ21b',               icon: <Music2 className="w-4 h-4" />,     color: 'border-yellow-700/40 hover:border-yellow-500' },
  { label: 'Pinterest Pins',     sublabel: 'Wellness pins',         href: 'https://pin.it/3arJRwuv0',                   icon: <Pin className="w-4 h-4" />,        color: 'border-rose-700/40 hover:border-rose-500' },
  { label: 'Pinterest Board',    sublabel: 'Curated board',         href: 'https://pin.it/5jWrvLJNu',                   icon: <Pin className="w-4 h-4" />,        color: 'border-pink-700/40 hover:border-pink-500' },
  { label: 'OfferUp Shop',       sublabel: 'tymotion-',             href: 'https://offerup.co/profile/tymotion-',       icon: <ShoppingBag className="w-4 h-4" />,color: 'border-teal-700/40 hover:border-teal-500' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Links = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await subscribeEmail(email, 'popup');
    setStatus(result);
    setLoading(false);
    if (result.success) setEmail('');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="pt-16 pb-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-white/50 mb-6">
          The FlavorCrave Network
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Health Is Wealth
        </h1>
        <p className="text-white/50 text-sm">
          Marina Del Rey, CA · 18 properties · 9 platforms
        </p>
      </div>

      <div className="max-w-md mx-auto px-5 space-y-3">

        {/* Featured CTAs */}
        {FEATURED_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-4 w-full bg-gradient-to-r ${link.accent} p-[1px] rounded-xl group`}
          >
            <div className="flex items-center gap-4 w-full bg-black rounded-xl px-4 py-3.5 group-hover:bg-white/5 transition-colors">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.accent} flex items-center justify-center flex-shrink-0`}>
                {link.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm text-white">{link.label}</div>
                <div className="text-xs text-white/50">{link.sublabel}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
            </div>
          </a>
        ))}

        {/* Divider */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 tracking-widest uppercase">All Channels</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Channel grid */}
        <div className="grid grid-cols-2 gap-2">
          {CHANNELS.map((ch) => (
            <a
              key={ch.href}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 bg-white/5 border ${ch.color} rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/10`}
            >
              <div className="text-white/60 flex-shrink-0">{ch.icon}</div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate">{ch.label}</div>
                <div className="text-[10px] text-white/40 truncate">{ch.sublabel}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 tracking-widest uppercase">Stay Connected</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Email capture */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-sm font-semibold text-white mb-1">Get wellness drops + exclusive deals</p>
          <p className="text-xs text-white/40 mb-4">Join The FlavorCrave Network newsletter — free.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-60 flex-shrink-0"
            >
              {loading ? '...' : 'Join'}
            </button>
          </form>
          {status && (
            <p className={`mt-2 text-xs ${status.success ? 'text-green-400' : 'text-red-400'}`}>
              {status.message}
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs pt-4">
          © The FlavorCrave Network · Marina Del Rey, CA
        </p>
      </div>
    </div>
  );
};
