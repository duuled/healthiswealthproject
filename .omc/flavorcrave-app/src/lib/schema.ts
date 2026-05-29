import type { Recipe, RecipeCategory } from '../data/allRecipes';

interface HowToStepSchema {
  '@type': 'HowToStep';
  text: string;
}

interface PersonSchema {
  '@type': 'Person';
  name: string;
}

interface RecipeSchema {
  '@context': 'https://schema.org';
  '@type': 'Recipe';
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  recipeYield: string;
  recipeCategory: string;
  recipeCuisine: string;
  recipeIngredient: string[];
  recipeInstructions: HowToStepSchema[];
  author: PersonSchema;
  datePublished: string;
  keywords: string;
}

function minutesToISO8601(minutes: number): string {
  if (minutes < 60) {
    return `PT${minutes}M`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `PT${hours}H`;
  }
  return `PT${hours}H${remainingMinutes}M`;
}

const CUISINE_MAP: Record<Exclude<RecipeCategory, 'All'>, string> = {
  'Soul Food': 'American',
  Caribbean: 'Caribbean',
  'West African': 'West African',
  Budget: 'American',
  Southern: 'American',
};

export function generateRecipeSchema(recipe: Recipe): RecipeSchema {
  const totalMinutes = recipe.prepTime + recipe.cookTime;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    prepTime: minutesToISO8601(recipe.prepTime),
    cookTime: minutesToISO8601(recipe.cookTime),
    totalTime: minutesToISO8601(totalMinutes),
    recipeYield: recipe.servings,
    recipeCategory: recipe.category,
    recipeCuisine: CUISINE_MAP[recipe.category],
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map(
      (step): HowToStepSchema => ({
        '@type': 'HowToStep',
        text: step.text,
      })
    ),
    author: {
      '@type': 'Person',
      name: 'The Flavor Crave',
    },
    datePublished: recipe.datePublished,
    keywords: recipe.keywords.join(', '),
  };
}
