'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getAllRecipes, getRecipesByCategory, RECIPE_CATEGORIES } from '../../src/data/recipes';
import type { Recipe } from '../../src/data/recipes';

const DIFFICULTY_COLORS: Record<Recipe['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
};

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="recipe-card group block">
      {/* Image placeholder with warm gradient */}
      <div className="recipe-card-image min-h-[200px] relative">
        <div
          className="w-full min-h-[200px] flex flex-col items-center justify-center gap-2"
          style={{
            background:
              recipe.category === 'Caribbean'
                ? 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #d97706 100%)'
                : recipe.category === 'West African'
                ? 'linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #fbbf24 100%)'
                : recipe.category === 'Budget'
                ? 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 60%, #60a5fa 100%)'
                : 'linear-gradient(135deg, #3d1a00 0%, #7a3210 50%, #e8602c 100%)',
          }}
        >
          <span className="text-white/60 text-xs font-medium">{recipe.cuisine}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="category-badge">{recipe.category}</span>
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[recipe.difficulty]}`}
          >
            {recipe.difficulty}
          </span>
        </div>

        <h3 className="font-serif font-bold text-lg leading-snug text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
          {recipe.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {recipe.excerpt}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium border-t border-gray-100 pt-3">
          <span>Prep {recipe.prepTime}m</span>
          <span className="text-gray-200">|</span>
          <span>Cook {recipe.cookTime}m</span>
          <span className="text-gray-200">|</span>
          <span>Serves {recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}

type CategoryFilter = (typeof RECIPE_CATEGORIES)[number];

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const recipes =
    activeCategory === 'All'
      ? getAllRecipes()
      : getRecipesByCategory(activeCategory as Exclude<CategoryFilter, 'All'>);

  return (
    <div style={{ backgroundColor: 'var(--warm-cream)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
        className="py-16 px-4 text-center"
        style={{ backgroundColor: 'var(--deep-brown)' }}
      >
        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
          The Archive
        </p>
        <h1
          className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          All Recipes
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Soul food, Caribbean, and West African recipes — each one documented with technique, cultural context, and pro tips.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {RECIPE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: 'var(--orange)' }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {recipes.length > 0 ? (
          <>
            <p className="text-sm text-gray-400 mb-8">
              {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No recipes yet in this category.</p>
            <p className="text-gray-300 text-sm">Check back soon — more are coming.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="btn-primary mt-6 inline-flex"
            >
              View All Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
