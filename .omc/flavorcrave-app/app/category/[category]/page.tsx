import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allRecipes, RECIPE_CATEGORIES, type RecipeCategory } from '../../../src/data/allRecipes';
import RecipeCard from '../../../src/components/RecipeCard';

const CATEGORY_INTROS: Record<Exclude<RecipeCategory, 'All'>, string> = {
  'Soul Food': `Soul food is the edible history of African American resilience, community, and joy — born in the fields and perfected in church kitchens, family gatherings, and Sunday dinners that lasted all afternoon. Every dish carries memory: the way your grandmother seasoned her cast iron, the smell of greens that filled the whole house, the mac and cheese that no restaurant has ever gotten right. These recipes honor that tradition with the full depth and intention it deserves.`,

  Caribbean: `Caribbean cooking is the cuisine of the diaspora — a vibrant, unapologetic blend of African, Indigenous, South Asian, and European influences shaped by island geography and the scotch bonnet pepper's defining heat. From Trinidad to Jamaica to Barbados, the food reflects a people who built extraordinary flavor from every ingredient available to them. Expect bold marinades, slow braises, fresh citrus, and heat that builds rather than burns.`,

  'West African': `West African cuisine is not an influence on the world's cooking — it is its foundation. The techniques, the spices, the one-pot rice dishes, and the braised stews that traveled across the Atlantic and became soul food, Creole cooking, and Caribbean cuisine all trace back here. Jollof rice remains the subject of legendary rivalries between Nigeria, Ghana, and Senegal. Suya brings the char of street meat to another level. Egusi and pepper soup are ancient and deeply satisfying. These are the originals.`,

  Budget: `Eating well on a tight budget isn't about compromise — it's about knowledge. The most flavorful dishes in the Black culinary canon were built around dried beans, tough cuts of meat, inexpensive starches, and spice combinations that made everything extraordinary. These recipes prove that real food — food that fills the table and satisfies the soul — doesn't require an expensive grocery run. It requires knowing what to do with what you have.`,

  Southern: `Southern cooking is a broad, beautiful canon that includes smoked barbecue, pillowy biscuits, low country seafood boils, Kentucky burgoo, and Appalachian bean bread. It is the confluence of Indigenous foodways, African culinary genius, and European settler cooking — none of which can be fully separated. These recipes pull from across that tradition: the BBQ pits, the cast iron skillets, the church picnic spreads, and the rural farmhouses where Southern cooking has always lived.`,
};

// Map URL-friendly slugs to canonical category names
const SLUG_TO_CATEGORY: Record<string, Exclude<RecipeCategory, 'All'>> = {
  'soul-food': 'Soul Food',
  caribbean: 'Caribbean',
  'west-african': 'West African',
  budget: 'Budget',
  southern: 'Southern',
};

function resolveCategory(param: string): Exclude<RecipeCategory, 'All'> | null {
  const decoded = decodeURIComponent(param);
  // Direct match against canonical category names
  if (decoded in CATEGORY_INTROS) {
    return decoded as Exclude<RecipeCategory, 'All'>;
  }
  // Slug match (lowercase, hyphenated)
  const slug = decoded.toLowerCase().replace(/\s+/g, '-');
  return SLUG_TO_CATEGORY[slug] ?? null;
}

type Props = {
  params: { category: string };
};

export async function generateStaticParams() {
  const slugs = RECIPE_CATEGORIES.filter((cat) => cat !== 'All').map((category) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    return { category: slug };
  });
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = resolveCategory(params.category);

  if (!category) {
    return { title: 'Category Not Found | The Flavor Crave' };
  }

  return {
    title: `${category} Recipes | The Flavor Crave`,
    description: `Authentic ${category} recipes that honor the real tradition — ${CATEGORY_INTROS[category].slice(0, 120).trim()}...`,
    openGraph: {
      title: `${category} Recipes | The Flavor Crave`,
      description: `Authentic ${category} recipes that honor the real tradition.`,
      url: `https://theflavorcrave.com/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = resolveCategory(params.category);

  if (!category) {
    notFound();
  }

  const recipes = allRecipes.filter((r) => r.category === category);
  const intro = CATEGORY_INTROS[category];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-amber-700 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <Link href="/recipes" className="hover:text-amber-700 transition-colors">
              Recipes
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li className="text-gray-900 font-medium" aria-current="page">
            {category}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-950 mb-6">
          {category} Recipes
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
          {intro}
        </p>
      </header>

      {/* Recipe count */}
      <p className="text-sm text-gray-500 mb-8">
        {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} in this collection
      </p>

      {/* Recipe grid */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} showExcerpt={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">More recipes coming soon.</p>
          <p>This tradition deserves the full treatment. Check back shortly.</p>
        </div>
      )}

      {/* Back to all recipes */}
      <div className="mt-16 text-center">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
        >
          Back to all recipes
        </Link>
      </div>
    </main>
  );
}
