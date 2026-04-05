export interface RecipeIngredient {
  item: string;
  amount: string;
  asinPlaceholder?: string; // Amazon affiliate ASIN placeholder e.g. "[ASIN_CAST_IRON]"
}

export interface RecipeStep {
  step: number;
  instruction: string;
  technique?: string; // The WHY behind this step — what the technique does
}

export interface Recipe {
  slug: string;
  title: string;
  headline: string; // SEO H1 — keyword-rich
  excerpt: string; // 155 chars max for meta description
  category: 'Soul Food' | 'Caribbean' | 'West African' | 'Budget' | 'Technique' | 'Southern';
  cuisine: string; // e.g. "Southern American", "Jamaican", "Nigerian"
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  publishedAt: string; // ISO date
  author: string;
  tags: string[];
  seoKeyword: string; // Primary target keyword
  culturalStory: string; // 2-3 sentence origin/context paragraph
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  techniqueNote: string; // The key technique callout box
  serveSuggestions: string[]; // "What to serve with" — 3-4 suggestions for internal links
  proTip: string; // One professional tip
  coverImageAlt: string;
}

export const RECIPE_CATEGORIES = [
  'All',
  'Soul Food',
  'Caribbean',
  'West African',
  'Budget',
  'Technique',
  'Southern',
] as const;

export const RECIPES: Recipe[] = [
  {
    slug: 'southern-baked-mac-and-cheese',
    title: 'Southern Baked Mac and Cheese',
    headline: 'Best Mac and Cheese Recipe: Southern Baked with Three-Cheese Custard',
    excerpt:
      'The best mac and cheese recipe uses a real egg custard — not a roux. This Southern baked version delivers creamy, set layers in every slice.',
    category: 'Soul Food',
    cuisine: 'Southern American',
    prepTime: 30,
    cookTime: 45,
    servings: 8,
    difficulty: 'Intermediate',
    publishedAt: '2024-01-15',
    author: 'The Flavor Crave Kitchen',
    tags: ['mac and cheese', 'soul food', 'baked pasta', 'cheese', 'comfort food', 'holiday sides'],
    seoKeyword: 'best mac and cheese recipe',
    culturalStory:
      'Southern baked mac and cheese is not the stovetop kind with powder from a box. It is a custard-based casserole — eggs, evaporated milk, and real cheese layered into a dish that sets as it bakes. This is the version that shows up at church dinners, family reunions, and Thanksgiving tables across the South, often guarded as a family secret. The technique traces back to African American cooks who transformed European béchamel into something richer, more forgiving, and built to feed a crowd.',
    ingredients: [
      { item: 'elbow macaroni', amount: '1 lb (16 oz)', asinPlaceholder: '[ASIN_MACARONI]' },
      { item: 'sharp cheddar cheese, shredded', amount: '3 cups (about 12 oz)', asinPlaceholder: '[ASIN_SHARP_CHEDDAR]' },
      { item: 'colby jack cheese, shredded', amount: '1½ cups (about 6 oz)' },
      { item: 'gruyère or smoked gouda, shredded', amount: '1 cup (about 4 oz)' },
      { item: 'large eggs', amount: '3' },
      { item: 'evaporated milk (12 oz can)', amount: '1 can (12 oz)' },
      { item: 'whole milk', amount: '1 cup' },
      { item: 'unsalted butter, cubed', amount: '4 tablespoons' },
      { item: 'kosher salt', amount: '1½ teaspoons' },
      { item: 'black pepper, freshly ground', amount: '1 teaspoon' },
      { item: 'smoked paprika', amount: '½ teaspoon' },
      { item: 'dry mustard powder', amount: '½ teaspoon' },
    ],
    steps: [
      {
        step: 1,
        instruction:
          'Preheat your oven to 350°F (175°C). Butter a 9×13-inch baking dish generously, including the sides.',
        technique:
          'Buttering the sides prevents the custard from pulling away from the edges as it sets, which keeps the finished dish from cracking when you slice it.',
      },
      {
        step: 2,
        instruction:
          'Bring a large pot of heavily salted water to a boil. Cook macaroni for 2 minutes less than the package directions — it should be noticeably underdone. Drain and do not rinse.',
        technique:
          'Undercooking the pasta is essential. It will finish cooking in the oven inside the custard. Rinsing removes the surface starch that helps the custard cling to each piece.',
      },
      {
        step: 3,
        instruction:
          'While the pasta is hot, toss it immediately with the cubed butter until fully melted. Season with salt, pepper, smoked paprika, and dry mustard.',
        technique:
          'Coating the hot pasta in butter before adding eggs prevents the eggs from scrambling on contact with heat — the fat creates a barrier.',
      },
      {
        step: 4,
        instruction:
          'In a large bowl, whisk together the eggs, evaporated milk, and whole milk until fully combined and smooth.',
        technique:
          'Evaporated milk is the key to a creamy, stable custard. Its higher protein content prevents the custard from breaking or becoming grainy as it bakes.',
      },
      {
        step: 5,
        instruction:
          'Add the egg-milk mixture to the buttered pasta and stir to combine. Fold in 2 cups of the sharp cheddar and all of the colby jack.',
        technique:
          'Reserving some cheese for the top creates two textures: a creamy interior custard and a golden, slightly crisp cheese crust on top.',
      },
      {
        step: 6,
        instruction:
          'Pour half the pasta mixture into the prepared baking dish. Layer the gruyère (or smoked gouda) evenly across the middle. Pour the remaining pasta on top.',
        technique:
          'The middle cheese layer melts into a molten band that adds a textural surprise when sliced — this is what separates a great baked mac from a good one.',
      },
      {
        step: 7,
        instruction:
          'Top evenly with the remaining 1 cup of sharp cheddar. Dust lightly with extra smoked paprika.',
      },
      {
        step: 8,
        instruction:
          'Bake uncovered for 40–45 minutes until the top is deeply golden and the custard is set — it should not jiggle when you shake the pan. Let rest 10 minutes before slicing.',
        technique:
          'Resting allows the custard to firm up completely. Cut too early and it will fall apart. After 10 minutes it slices into clean squares like a casserole should.',
      },
    ],
    techniqueNote:
      'The custard method (eggs + evaporated milk) is what sets Southern baked mac apart from stovetop mac. As it bakes, the eggs coagulate around every piece of pasta, locking in the cheese and creating a dish you can slice — not scoop. Do not substitute regular milk for all the liquid; the proteins in evaporated milk are essential to the texture.',
    serveSuggestions: [
      'Smothered Pork Chops',
      'Southern Fried Chicken',
      'Collard Greens with Smoked Turkey',
      'Candied Yams',
    ],
    proTip:
      'Shred your cheese from a block — never use pre-shredded bags. The anti-caking agents in bagged cheese prevent it from melting smoothly, which can make the custard grainy.',
    coverImageAlt:
      'Golden Southern baked mac and cheese in a cast iron baking dish, sliced to show creamy layers',
  },
  {
    slug: 'authentic-jamaican-jerk-chicken',
    title: 'Authentic Jamaican Jerk Chicken',
    headline: 'Authentic Jerk Chicken Recipe: Scotch Bonnet Marinade, Overnight Technique',
    excerpt:
      'This jerk chicken recipe uses real scotch bonnet peppers and an overnight marinade — the method that makes Jamaican roadside jerk unforgettable.',
    category: 'Caribbean',
    cuisine: 'Jamaican',
    prepTime: 20,
    cookTime: 40,
    servings: 5,
    difficulty: 'Intermediate',
    publishedAt: '2024-01-22',
    author: 'The Flavor Crave Kitchen',
    tags: [
      'jerk chicken',
      'jamaican',
      'caribbean',
      'grilling',
      'scotch bonnet',
      'spicy',
      'marinade',
    ],
    seoKeyword: 'jerk chicken recipe',
    culturalStory:
      'Jerk cooking traces back to the Maroons — African freedom fighters in Jamaica who smoked and preserved wild boar over pimento wood fires in the Blue Mountains to stay alive while evading British capture. The word "jerk" likely comes from the Quechua "charqui," meaning dried meat. Today every Jamaican roadside jerk stand has its own closely guarded paste recipe, but the soul of it has never changed: scotch bonnet, allspice, thyme, and smoke.',
    ingredients: [
      { item: 'chicken pieces (bone-in thighs and drumsticks)', amount: '3–3½ lbs' },
      {
        item: 'scotch bonnet peppers (or habanero as substitute)',
        amount: '3–4 whole, stems removed',
        asinPlaceholder: '[ASIN_SCOTCH_BONNET]',
      },
      { item: 'whole allspice berries (or 2 tsp ground)', amount: '2 tablespoons', asinPlaceholder: '[ASIN_ALLSPICE]' },
      { item: 'fresh thyme sprigs (or 2 tsp dried)', amount: '6–8 sprigs' },
      { item: 'brown sugar, packed', amount: '2 tablespoons' },
      { item: 'green onions (scallions), roughly chopped', amount: '6 stalks' },
      { item: 'garlic cloves', amount: '6 cloves' },
      { item: 'fresh ginger, peeled and roughly chopped', amount: '2-inch piece' },
      { item: 'soy sauce', amount: '3 tablespoons' },
      {
        item: 'neutral oil (vegetable or canola)',
        amount: '2 tablespoons',
      },
      { item: 'lime juice, freshly squeezed', amount: '2 tablespoons (about 1 lime)' },
      { item: 'kosher salt', amount: '1½ teaspoons' },
      { item: 'black pepper', amount: '1 teaspoon' },
      { item: 'cinnamon', amount: '¼ teaspoon' },
      { item: 'nutmeg', amount: '¼ teaspoon' },
    ],
    steps: [
      {
        step: 1,
        instruction:
          'Combine scotch bonnets, allspice, thyme, brown sugar, scallions, garlic, ginger, soy sauce, oil, lime juice, salt, pepper, cinnamon, and nutmeg in a blender or food processor. Blend to a thick paste — some texture is fine.',
        technique:
          'Blending rather than finely chopping allows the fat-soluble capsaicin in the scotch bonnets to distribute evenly through the oil, ensuring consistent heat in every bite rather than hot spots.',
      },
      {
        step: 2,
        instruction:
          'Score each piece of chicken to the bone with 2–3 deep cuts on each side. Wear gloves when handling the marinade if you are sensitive to heat.',
        technique:
          'Scoring to the bone is not optional — it is the difference between jerk that tastes marinated and jerk that just tastes sauced on the outside. The paste has to reach the interior of the meat.',
      },
      {
        step: 3,
        instruction:
          'Rub the jerk paste aggressively into every surface of the chicken, making sure it penetrates the scored cuts. Pack it in with your fingers.',
      },
      {
        step: 4,
        instruction:
          'Place the chicken in a zip-lock bag or covered dish and refrigerate for a minimum of 8 hours, ideally 24 hours. Longer is better.',
        technique:
          'The overnight marinade is not just for flavor — it is a partial cure. The salt and acid from the lime break down surface proteins and allow the allspice and scotch bonnet aromatics to penetrate the muscle fibers. This is why authentic roadside jerk has heat that builds gradually rather than hitting all at once.',
      },
      {
        step: 5,
        instruction:
          'Remove chicken from the refrigerator 30 minutes before cooking to take the chill off. This promotes even cooking.',
      },
      {
        step: 6,
        instruction:
          'Grill method: Set up a two-zone fire. Place chicken over indirect heat (cooler side) and cover. Cook 25–30 minutes, turning once halfway.',
        technique:
          'Starting over indirect heat renders the fat and cooks the chicken through before the sugars in the marinade have a chance to burn. Putting cold marinated chicken directly over high heat will char the outside while the interior stays raw.',
      },
      {
        step: 7,
        instruction:
          'Move chicken to the hot side of the grill. Cook uncovered 5–8 minutes per side, until the skin is charred in spots and an instant-read thermometer reads 165°F at the thickest part.',
        technique:
          'The final high-heat sear is where the brown sugar caramelizes and the edges char — that bittersweet char is an essential flavor component of authentic jerk, not a mistake.',
      },
      {
        step: 8,
        instruction:
          'Oven method: Bake at 400°F for 35 minutes on a wire rack over a foil-lined sheet pan. Broil on high for 5–8 minutes at the end to char the skin.',
      },
      {
        step: 9,
        instruction:
          'Let the chicken rest on a cutting board for 5 minutes before serving.',
      },
      {
        step: 10,
        instruction:
          'Serve with festival (fried dumplings), rice and peas, or roasted breadfruit. Pass extra scotch bonnet sauce on the side for those who want more heat.',
      },
    ],
    techniqueNote:
      'Allspice (called "pimento" in Jamaica) is the non-negotiable backbone of jerk — it is what makes jerk taste like jerk and not just spicy BBQ chicken. If you cannot find whole berries, use ground allspice but reduce to 1½ teaspoons. Scotch bonnet peppers are fruitier and more complex than habaneros; if you use habanero as a substitute, add a small piece of fresh mango or a teaspoon of pineapple juice to approximate that tropical fruit note.',
    serveSuggestions: [
      'Rice and Peas (Jamaican Red Kidney Bean Rice)',
      'Festival (Jamaican Fried Dumplings)',
      'Fried Plantains',
      'Coleslaw with Lime Dressing',
    ],
    proTip:
      'The best jerk chicken is cooked over pimento (allspice) wood or chips. If you have a smoker or a charcoal grill, soak a handful of allspice berries in water for 30 minutes and throw them directly on the coals. The smoke from the berries is what roadside jerk stands use and it is impossible to replicate any other way.',
    coverImageAlt:
      'Authentic Jamaican jerk chicken pieces on a grill, charred and caramelized, with scotch bonnet peppers and scallions beside them',
  },
];

export function getAllRecipes(): Recipe[] {
  return RECIPES;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((recipe) => recipe.slug === slug);
}

export function getRecipesByCategory(
  category: Recipe['category'] | 'All'
): Recipe[] {
  if (category === 'All') return RECIPES;
  return RECIPES.filter((recipe) => recipe.category === category);
}

export function getFeaturedRecipes(limit: number = 6): Recipe[] {
  return RECIPES.slice(0, limit);
}
