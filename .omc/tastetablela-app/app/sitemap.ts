import type { MetadataRoute } from 'next';
import { getAllSpots } from '@/data/spots';

const BASE_URL = 'https://tastetablela.vercel.app';

const NEIGHBORHOOD_SLUGS = [
  'koreatown',
  'boyle-heights',
  'leimert-park',
  'east-la',
  'inglewood',
  'crenshaw',
  'compton',
  'pico-union',
  'macarthur-park',
  'highland-park',
  'jefferson-park',
  'watts',
];

const STATIC_PAGES = ['', '/hidden-gems', '/submit', '/map'];

export default function sitemap(): MetadataRoute.Sitemap {
  const spots = getAllSpots();

  const spotEntries: MetadataRoute.Sitemap = spots.map((spot) => ({
    url: `${BASE_URL}/spots/${spot.slug}`,
    lastModified: new Date(spot.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const neighborhoodEntries: MetadataRoute.Sitemap = NEIGHBORHOOD_SLUGS.map((slug) => ({
    url: `${BASE_URL}/neighborhood/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }));

  return [...staticEntries, ...neighborhoodEntries, ...spotEntries];
}
