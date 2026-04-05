import { MetadataRoute } from 'next';

const BASE_URL = 'https://theflavorcrave.com';

const RECIPE_SLUGS = [
  'southern-baked-mac-and-cheese',
  'authentic-jamaican-jerk-chicken',
  'smothered-oxtail-stew',
  'crispy-southern-fried-chicken',
  'classic-collard-greens',
  'nigerian-jollof-rice',
  'budget-red-beans-and-rice',
  'creamy-soul-food-potato-salad',
];

const CATEGORIES = [
  'Soul Food',
  'Caribbean',
  'West African',
  'Budget',
  'Southern',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/free-recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/technique`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const recipeRoutes: MetadataRoute.Sitemap = RECIPE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/recipes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${BASE_URL}/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...recipeRoutes, ...categoryRoutes];
}
