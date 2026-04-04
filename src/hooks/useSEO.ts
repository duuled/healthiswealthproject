import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  schema?: object | object[];
  noIndex?: boolean;
}

const BASE_DOMAIN = 'https://healthiswealth.live';
const DEFAULT_IMAGE =
  'https://storage.googleapis.com/gpt-engineer-file-uploads/nDxhnnGL7uQOn8jSXTU9uEnlsGf1/social-images/social-1760476995440-AQPVESRJb8_SIV1S1YKg5laLhaREuRxLClxJPJoqOhZACE4Xq-33_vmlb4WBUVlK1X89ANjEfZvqSd7XThuUpZbRxvJqvvkNDtP_whQb3VobmC9SGe4WpTwIvgzyWb43IVUv51dSdns73XhR3dfl8_IJqf7i6Q.png';

function setMeta(name: string, content: string, useProperty = false) {
  const attr = useProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectSchema(schema: object | object[]) {
  // Remove previously injected dynamic schemas
  document.querySelectorAll('script[data-seo-dynamic]').forEach((s) => s.remove());

  const schemas = Array.isArray(schema) ? schema : [schema];
  schemas.forEach((s) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-dynamic', 'true');
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
  });
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  schema,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    const canonical = canonicalUrl ? `${BASE_DOMAIN}${canonicalUrl}` : BASE_DOMAIN;
    setLink('canonical', canonical);

    // Open Graph
    setMeta('og:type', ogType, true);
    setMeta('og:url', canonical, true);
    setMeta('og:title', ogTitle || title || '', true);
    setMeta('og:description', ogDescription || description || '', true);
    setMeta('og:image', ogImage, true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:url', canonical, true);
    setMeta('twitter:title', twitterTitle || ogTitle || title || '', true);
    setMeta('twitter:description', twitterDescription || ogDescription || description || '', true);
    setMeta('twitter:image', ogImage, true);

    if (schema) injectSchema(schema);

    // Cleanup: restore defaults when component unmounts
    return () => {
      document.title = 'Health Is Wealth Recipes | Natural Wellness & Healing Food Recipes';
      document.querySelectorAll('script[data-seo-dynamic]').forEach((s) => s.remove());
    };
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, twitterTitle, twitterDescription, schema, noIndex]);
}
