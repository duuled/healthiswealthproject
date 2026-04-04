/**
 * Affiliate URL builder — appends UTM tracking to every outbound link.
 * Reads utm_source from the current page URL (set by TikTok/Instagram bio links)
 * and passes it through to Amazon/TikTok affiliate links.
 *
 * Usage:
 *   buildAffiliateUrl('https://amzn.to/xyz', 'supplements')
 *   // → https://amzn.to/xyz?utm_source=djtymotion&utm_medium=social&utm_campaign=flavorcrave&utm_content=supplements
 */

export type AffiliateContent =
  | 'supplements'
  | 'shop'
  | 'links'
  | 'home'
  | 'mission';

const CAMPAIGN = 'flavorcrave_network';

/** Read a single UTM param from the current page URL */
function getPageUtm(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(key);
}

/** Derive the traffic source — page UTM first, then referrer heuristic, then 'direct' */
function detectSource(): string {
  const pageSource = getPageUtm('utm_source');
  if (pageSource) return pageSource;

  if (typeof document === 'undefined') return 'direct';
  const ref = document.referrer;
  if (ref.includes('tiktok.com')) return 'tiktok';
  if (ref.includes('instagram.com')) return 'instagram';
  if (ref.includes('youtube.com')) return 'youtube';
  if (ref.includes('linkedin.com')) return 'linkedin';
  if (ref.includes('twitter.com') || ref.includes('x.com')) return 'x';
  if (ref.includes('pinterest.com') || ref.includes('pin.it')) return 'pinterest';
  if (ref.includes('facebook.com') || ref.includes('fb.watch')) return 'facebook';
  return 'direct';
}

/** Derive the medium */
function detectMedium(): string {
  const pageMedium = getPageUtm('utm_medium');
  if (pageMedium) return pageMedium;
  const source = detectSource();
  if (source === 'direct') return 'direct';
  return 'social';
}

/**
 * Append UTM params to any affiliate URL.
 * Safe for both full URLs (amazon.com) and short links (amzn.to).
 */
export function buildAffiliateUrl(
  rawUrl: string,
  content: AffiliateContent = 'supplements'
): string {
  try {
    const url = new URL(rawUrl);
    // Preserve existing tag param (Amazon affiliate tag)
    const params = url.searchParams;
    params.set('utm_source', detectSource());
    params.set('utm_medium', detectMedium());
    params.set('utm_campaign', CAMPAIGN);
    params.set('utm_content', content);
    return url.toString();
  } catch {
    // amzn.to short links fail URL parsing — append as query string
    const sep = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${sep}utm_source=${detectSource()}&utm_medium=${detectMedium()}&utm_campaign=${CAMPAIGN}&utm_content=${content}`;
  }
}

/** Track a click event to Supabase (fire-and-forget) */
export function trackClick(productId: string, url: string): void {
  // Non-blocking — does not affect UX
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: productId,
      source: detectSource(),
      medium: detectMedium(),
      campaign: CAMPAIGN,
      url,
      ts: new Date().toISOString(),
    }),
  }).catch(() => {/* silent — tracking is best-effort */});
}
