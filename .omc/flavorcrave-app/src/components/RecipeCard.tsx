import Link from 'next/link';
import type { Recipe } from '../data/allRecipes';

interface RecipeCardProps {
  recipe: Recipe;
  showExcerpt?: boolean;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Soul Food': 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
  Caribbean: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)',
  'West African': 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #fb923c 100%)',
  Budget: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #60a5fa 100%)',
  Southern: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #f87171 100%)',
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  'Soul Food': 'bg-amber-100 text-amber-800',
  Caribbean: 'bg-green-100 text-green-800',
  'West African': 'bg-orange-100 text-orange-800',
  Budget: 'bg-blue-100 text-blue-800',
  Southern: 'bg-red-100 text-red-800',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-green-50 text-green-700 border border-green-200',
  Medium: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  Hard: 'bg-red-50 text-red-700 border border-red-200',
};

export default function RecipeCard({ recipe, showExcerpt = false }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const gradient = CATEGORY_GRADIENTS[recipe.category] ?? CATEGORY_GRADIENTS['Soul Food'];
  const badgeColor = CATEGORY_BADGE_COLORS[recipe.category] ?? 'bg-gray-100 text-gray-800';
  const difficultyColor = DIFFICULTY_COLORS[recipe.difficulty] ?? DIFFICULTY_COLORS['Easy'];

  return (
    <Link href={`/recipes/${recipe.slug}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-200 ease-out group-hover:shadow-xl group-hover:scale-[1.02] h-full flex flex-col">
        {/* Image placeholder with gradient */}
        <div
          className="h-48 w-full flex items-end p-4"
          style={{ background: gradient }}
          aria-hidden="true"
        >
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}
          >
            {recipe.category}
          </span>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-amber-950 leading-snug mb-2 group-hover:text-amber-700 transition-colors">
            {recipe.title}
          </h3>

          {/* Time and difficulty row */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-gray-500">
              ⏱ {totalTime} min total
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${difficultyColor}`}>
              {recipe.difficulty}
            </span>
          </div>

          {/* Excerpt */}
          {showExcerpt && recipe.excerpt && (
            <p className="text-sm text-gray-600 leading-relaxed flex-1">
              {recipe.excerpt}
            </p>
          )}

          {/* Lock indicator for premium */}
          {!recipe.isFree && (
            <div className="mt-auto pt-3">
              <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                <span aria-hidden="true">🔒</span> Members recipe
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
