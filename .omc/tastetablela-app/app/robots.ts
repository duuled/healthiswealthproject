import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard web crawlers
        userAgent: '*',
        allow: '/',
      },
      {
        // AI crawlers — explicitly welcome
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Googlebot',
          'bingbot',
          'CCBot',
          'Omgilibot',
          'FacebookBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://tastetablela.vercel.app/sitemap.xml',
    host: 'https://tastetablela.vercel.app',
  };
}
