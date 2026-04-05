export type RecipeCategory =
  | 'All'
  | 'Soul Food'
  | 'Caribbean'
  | 'West African'
  | 'Budget'
  | 'Southern';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface HowToStep {
  text: string;
}

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  category: Exclude<RecipeCategory, 'All'>;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: string;
  difficulty: Difficulty;
  isFree: boolean;
  excerpt: string;
  keywords: string[];
  datePublished: string;
  ingredients: string[];
  instructions: HowToStep[];
}

export const RECIPE_CATEGORIES: RecipeCategory[] = [
  'All',
  'Soul Food',
  'Caribbean',
  'West African',
  'Budget',
  'Southern',
];

export const allRecipes: Recipe[] = [
  {
    slug: 'southern-baked-mac-and-cheese',
    title: 'Southern Baked Mac and Cheese',
    description:
      'The real deal — custard-style baked mac and cheese with a golden, crusty top. This is Sunday dinner on a plate.',
    excerpt:
      'Custard-style, three-cheese, baked until the top is golden and the edges pull away from the dish. This is the mac and cheese your grandma made.',
    category: 'Soul Food',
    prepTime: 20,
    cookTime: 45,
    servings: '8 servings',
    difficulty: 'Medium',
    isFree: true,
    keywords: ['mac and cheese', 'soul food', 'baked', 'southern', 'cheese', 'comfort food'],
    datePublished: '2024-01-15',
    ingredients: [
      '1 lb elbow macaroni',
      '4 eggs, beaten',
      '2 cups whole milk',
      '1 cup evaporated milk',
      '4 cups sharp cheddar, shredded (divided)',
      '1 cup Colby jack, shredded',
      '1/2 cup Velveeta, cubed',
      '1/2 cup unsalted butter, melted',
      '1 tsp salt',
      '1 tsp black pepper',
      '1/2 tsp smoked paprika',
      '1/4 tsp cayenne pepper',
    ],
    instructions: [
      { text: 'Preheat oven to 350°F. Cook macaroni in salted boiling water until al dente, about 7 minutes. Drain and set aside.' },
      { text: 'In a large bowl, whisk together eggs, whole milk, and evaporated milk until fully combined.' },
      { text: 'Add melted butter, salt, black pepper, paprika, and cayenne to the egg mixture and whisk again.' },
      { text: 'Stir in 3 cups of cheddar, all of the Colby jack, and all of the Velveeta into the egg mixture.' },
      { text: 'Add the drained macaroni and fold until every noodle is coated.' },
      { text: 'Pour into a greased 9x13 baking dish. Top with remaining 1 cup of cheddar.' },
      { text: 'Bake uncovered for 35–45 minutes until the top is golden and the custard is set in the center.' },
      { text: 'Let rest 10 minutes before serving.' },
    ],
  },
  {
    slug: 'authentic-jamaican-jerk-chicken',
    title: 'Authentic Jamaican Jerk Chicken',
    description:
      'Fiery, smoky, and deeply aromatic — jerk chicken marinated overnight in scotch bonnet, allspice, and thyme then grilled over high heat.',
    excerpt:
      'The real Jamaican jerk marinade: scotch bonnets, allspice, thyme, green onion, and time. Grill it hot and let the char do its work.',
    category: 'Caribbean',
    prepTime: 30,
    cookTime: 40,
    servings: '6 servings',
    difficulty: 'Medium',
    isFree: false,
    keywords: ['jerk chicken', 'jamaican', 'caribbean', 'scotch bonnet', 'grilled', 'spicy'],
    datePublished: '2024-01-22',
    ingredients: [
      '3 lbs chicken thighs and drumsticks, bone-in skin-on',
      '4 scotch bonnet peppers, stems removed',
      '6 green onions, roughly chopped',
      '6 cloves garlic',
      '1 thumb fresh ginger',
      '1/4 cup soy sauce',
      '2 tbsp brown sugar',
      '2 tbsp allspice berries, ground',
      '1 tbsp dried thyme',
      '1 tsp cinnamon',
      '1/2 tsp nutmeg',
      '1/4 cup lime juice',
      '2 tbsp vegetable oil',
      '1 tsp black pepper',
      '1 tsp salt',
    ],
    instructions: [
      { text: 'Blend scotch bonnets, green onions, garlic, ginger, soy sauce, brown sugar, allspice, thyme, cinnamon, nutmeg, lime juice, and oil until smooth.' },
      { text: 'Score chicken pieces deeply on both sides. Season with salt and pepper.' },
      { text: 'Pour marinade over chicken, massaging it into every cut. Cover and refrigerate at least 8 hours — overnight is better.' },
      { text: 'Bring chicken to room temperature 30 minutes before grilling.' },
      { text: 'Grill over medium-high heat, turning occasionally, until skin is charred and internal temp reaches 165°F, about 35–40 minutes.' },
      { text: 'Rest 5 minutes before serving with festival bread or rice and peas.' },
    ],
  },
  {
    slug: 'smothered-oxtail-stew',
    title: 'Smothered Oxtail Stew',
    description:
      'Braised until the meat falls from the bone in a rich, dark, deeply savory gravy. This is patience rewarded.',
    excerpt:
      'Low and slow is the only way. Oxtails braised for hours until the collagen melts into a silky gravy you\'ll want to pour over everything.',
    category: 'Soul Food',
    prepTime: 25,
    cookTime: 210,
    servings: '4 servings',
    difficulty: 'Hard',
    isFree: false,
    keywords: ['oxtail', 'soul food', 'braised', 'stew', 'comfort food', 'gravy'],
    datePublished: '2024-02-01',
    ingredients: [
      '3 lbs oxtails, trimmed of excess fat',
      '1 large onion, sliced',
      '4 cloves garlic, minced',
      '2 celery stalks, chopped',
      '2 carrots, chopped',
      '2 cups beef broth',
      '1 cup red wine',
      '2 tbsp Worcestershire sauce',
      '1 tbsp tomato paste',
      '1 tsp smoked paprika',
      '1 tsp dried thyme',
      '1 tsp onion powder',
      '1 tsp garlic powder',
      '1/2 tsp cayenne',
      'Salt and black pepper to taste',
      '2 tbsp vegetable oil',
      '2 tbsp flour',
    ],
    instructions: [
      { text: 'Season oxtails generously with salt, pepper, paprika, onion powder, garlic powder, and cayenne. Let sit 30 minutes.' },
      { text: 'Heat oil in a heavy-bottomed Dutch oven over high heat. Sear oxtails on all sides until deep brown, about 8 minutes total. Remove and set aside.' },
      { text: 'Reduce heat to medium. Add onion, celery, and carrots to the pot. Cook until softened, 5 minutes. Add garlic and cook 1 more minute.' },
      { text: 'Stir in tomato paste and flour. Cook 2 minutes to eliminate the raw flour taste.' },
      { text: 'Deglaze with red wine, scraping up all the browned bits from the bottom.' },
      { text: 'Add broth, Worcestershire, and thyme. Return oxtails to the pot. Liquid should come halfway up the meat.' },
      { text: 'Bring to a boil, then reduce to the lowest simmer. Cover and cook 3 to 3.5 hours until meat is falling off the bone.' },
      { text: 'Skim fat from surface. Taste and adjust seasoning. Serve over white rice.' },
    ],
  },
  {
    slug: 'crispy-southern-fried-chicken',
    title: 'Crispy Southern Fried Chicken',
    description:
      'Double-dredged in seasoned flour and buttermilk-brined for juicy meat inside and a shatteringly crisp crust outside.',
    excerpt:
      'The secret is the brine, the double dredge, and the oil temperature. Get those three things right and you\'ll have the best fried chicken of your life.',
    category: 'Southern',
    prepTime: 20,
    cookTime: 30,
    servings: '6 servings',
    difficulty: 'Medium',
    isFree: true,
    keywords: ['fried chicken', 'southern', 'buttermilk', 'crispy', 'comfort food'],
    datePublished: '2024-02-10',
    ingredients: [
      '1 whole chicken, cut into 8 pieces',
      '2 cups buttermilk',
      '2 cups all-purpose flour',
      '2 tsp salt',
      '2 tsp black pepper',
      '2 tsp garlic powder',
      '2 tsp onion powder',
      '1.5 tsp smoked paprika',
      '1 tsp cayenne pepper',
      '1 tsp dried thyme',
      'Vegetable oil for frying (about 4 cups)',
    ],
    instructions: [
      { text: 'Combine buttermilk, 1 tsp salt, and 1 tsp black pepper. Submerge chicken pieces, cover, and refrigerate 4–8 hours.' },
      { text: 'Whisk flour with all remaining seasonings in a wide shallow bowl.' },
      { text: 'Remove chicken from buttermilk, letting excess drip off. Dredge each piece in seasoned flour, pressing firmly to adhere.' },
      { text: 'Return coated pieces to the leftover buttermilk briefly, then dredge in flour a second time for a thicker crust.' },
      { text: 'Heat oil in a cast iron skillet or Dutch oven to 325°F. Do not overcrowd — work in batches.' },
      { text: 'Fry dark meat 12–14 minutes and white meat 8–10 minutes, turning once, until deep golden brown and internal temp reaches 165°F.' },
      { text: 'Drain on a wire rack (not paper towels) to keep the crust crispy. Season with a pinch of salt immediately out of the oil.' },
    ],
  },
  {
    slug: 'classic-collard-greens',
    title: 'Classic Collard Greens',
    description:
      'Slow-cooked with smoked turkey, onion, and vinegar until meltingly tender. The pot likker is half the point.',
    excerpt:
      'Braised low and slow with smoked turkey and a splash of apple cider vinegar. These are the collards that convert people who think they don\'t like greens.',
    category: 'Soul Food',
    prepTime: 20,
    cookTime: 90,
    servings: '8 servings',
    difficulty: 'Easy',
    isFree: true,
    keywords: ['collard greens', 'soul food', 'southern', 'smoked turkey', 'braised'],
    datePublished: '2024-02-18',
    ingredients: [
      '2 large bunches collard greens',
      '1 smoked turkey leg or wing',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '4 cups chicken broth',
      '2 cups water',
      '2 tbsp apple cider vinegar',
      '1 tsp red pepper flakes',
      '1 tsp black pepper',
      '1 tsp sugar',
      'Salt to taste',
      '1 tbsp vegetable oil',
    ],
    instructions: [
      { text: 'Wash collard greens thoroughly. Remove stems by folding each leaf lengthwise and pulling the stem free. Stack and cut leaves into 1-inch strips.' },
      { text: 'Heat oil in a large pot over medium heat. Cook onion until softened and translucent, about 5 minutes. Add garlic and cook 1 minute more.' },
      { text: 'Add chicken broth, water, and smoked turkey. Bring to a boil.' },
      { text: 'Add collard greens in batches — they will wilt down. Stir in red pepper flakes, black pepper, and sugar.' },
      { text: 'Reduce heat to low, cover, and simmer 1 to 1.5 hours until the greens are very tender and deeply flavored.' },
      { text: 'Add apple cider vinegar and taste for salt. Adjust seasoning as needed.' },
      { text: 'Serve with the pot likker (the braising liquid) — it\'s full of flavor and nutrients.' },
    ],
  },
  {
    slug: 'nigerian-jollof-rice',
    title: 'Nigerian Jollof Rice',
    description:
      'Party jollof — smoky, tomato-red rice cooked in a blended pepper base until every grain is stained and flavorful.',
    excerpt:
      'The jollof wars are real, and this recipe wins. Blended tomatoes, scotch bonnet, and red bell pepper form the base for rice that\'s smoky, savory, and deeply red.',
    category: 'West African',
    prepTime: 20,
    cookTime: 50,
    servings: '8 servings',
    difficulty: 'Medium',
    isFree: false,
    keywords: ['jollof rice', 'nigerian', 'west african', 'tomato rice', 'party food', 'scotch bonnet'],
    datePublished: '2024-03-01',
    ingredients: [
      '3 cups parboiled long grain rice, washed',
      '4 Roma tomatoes',
      '2 red bell peppers',
      '2 scotch bonnet peppers',
      '1 large onion (half for blending, half sliced)',
      '1/4 cup vegetable oil',
      '2 tbsp tomato paste',
      '2 cups chicken broth',
      '1 cup water',
      '2 tsp curry powder',
      '1 tsp thyme',
      '2 bay leaves',
      '1 bouillon cube',
      '1.5 tsp salt',
      '1 tsp white pepper',
    ],
    instructions: [
      { text: 'Blend tomatoes, red bell peppers, scotch bonnets, and half the onion until smooth.' },
      { text: 'Heat oil in a large pot over medium-high heat. Fry sliced onion until golden, about 5 minutes.' },
      { text: 'Add tomato paste and fry for 3 minutes, stirring constantly to prevent burning.' },
      { text: 'Pour in the blended pepper mixture. Fry uncovered, stirring regularly, for 20–25 minutes until the raw smell is gone and the oil floats on top.' },
      { text: 'Add chicken broth, water, curry powder, thyme, bay leaves, bouillon, salt, and white pepper. Bring to a boil.' },
      { text: 'Add washed rice, stir once, and reduce heat to low. Cover tightly with foil then the lid.' },
      { text: 'Cook undisturbed for 25–30 minutes. Check at 25 minutes — if liquid is absorbed, remove from heat and let steam 5 more minutes.' },
      { text: 'Remove bay leaves, fluff gently, and allow the bottom to develop a slight char (the party jollof signature).' },
    ],
  },
  {
    slug: 'budget-red-beans-and-rice',
    title: 'Budget Red Beans and Rice',
    description:
      'Monday night in New Orleans — creamy red kidney beans slow-cooked with smoked sausage, the trinity, and Creole seasoning over white rice.',
    excerpt:
      'Red beans and rice has fed the South for generations because it\'s cheap, filling, and deeply satisfying. Smoked sausage and the holy trinity make it sing.',
    category: 'Budget',
    prepTime: 15,
    cookTime: 120,
    servings: '6 servings',
    difficulty: 'Easy',
    isFree: true,
    keywords: ['red beans', 'rice', 'budget', 'new orleans', 'creole', 'sausage', 'beans'],
    datePublished: '2024-03-10',
    ingredients: [
      '1 lb dried red kidney beans, soaked overnight',
      '12 oz andouille or smoked sausage, sliced',
      '1 large onion, diced',
      '1 green bell pepper, diced',
      '3 celery stalks, diced',
      '5 cloves garlic, minced',
      '6 cups water or chicken broth',
      '2 tsp Creole seasoning',
      '1 tsp dried thyme',
      '2 bay leaves',
      '1 tsp smoked paprika',
      'Salt and pepper to taste',
      '1 tbsp vegetable oil',
      '3 cups cooked white rice for serving',
    ],
    instructions: [
      { text: 'Drain soaked beans and set aside.' },
      { text: 'Heat oil in a large pot over medium heat. Brown sausage slices until lightly caramelized, about 5 minutes. Remove and set aside.' },
      { text: 'In the same pot, cook onion, bell pepper, and celery (the holy trinity) until soft, about 8 minutes. Add garlic and cook 1 minute.' },
      { text: 'Add beans, water or broth, Creole seasoning, thyme, bay leaves, and paprika. Bring to a boil.' },
      { text: 'Reduce to a steady simmer. Cook uncovered for 1.5 to 2 hours until beans are very tender.' },
      { text: 'Use the back of a spoon to smash about 1/4 of the beans against the side of the pot to create a creamy sauce.' },
      { text: 'Return sausage to the pot. Taste and adjust salt and pepper. Remove bay leaves.' },
      { text: 'Serve over white rice with hot sauce on the table.' },
    ],
  },
  {
    slug: 'creamy-soul-food-potato-salad',
    title: 'Creamy Soul Food Potato Salad',
    description:
      'The Southern cookout staple — yellow mustard, sweet relish, hard-boiled eggs, and creamy mayo dressing over perfectly cooked russets.',
    excerpt:
      'Yellow mustard is non-negotiable. Sweet relish, hard-boiled eggs, and the right potato-to-dressing ratio make this the potato salad people fight over at cookouts.',
    category: 'Soul Food',
    prepTime: 20,
    cookTime: 20,
    servings: '10 servings',
    difficulty: 'Easy',
    isFree: false,
    keywords: ['potato salad', 'soul food', 'southern', 'cookout', 'mayo', 'mustard'],
    datePublished: '2024-03-18',
    ingredients: [
      '3 lbs russet potatoes, peeled and cubed',
      '4 hard-boiled eggs, chopped',
      '3/4 cup mayonnaise',
      '3 tbsp yellow mustard',
      '1/4 cup sweet pickle relish',
      '3 celery stalks, finely diced',
      '1/2 red onion, finely diced',
      '1 tsp salt',
      '1 tsp black pepper',
      '1/2 tsp garlic powder',
      '1/2 tsp celery salt',
      'Paprika for garnish',
    ],
    instructions: [
      { text: 'Cover cubed potatoes with cold, heavily salted water. Bring to a boil and cook until fork-tender but not falling apart, about 12–15 minutes.' },
      { text: 'Drain and spread on a sheet pan to cool completely. Do not skip cooling — hot potatoes will make the dressing watery.' },
      { text: 'In a large bowl, whisk together mayo, mustard, relish, salt, pepper, garlic powder, and celery salt.' },
      { text: 'Add celery and red onion to the dressing and stir to combine.' },
      { text: 'Gently fold cooled potatoes and chopped eggs into the dressing. Do not overmix — you want chunks, not mush.' },
      { text: 'Taste and adjust seasoning. If too thick, add a splash of pickle juice to loosen.' },
      { text: 'Refrigerate at least 2 hours before serving. Dust with paprika just before serving.' },
    ],
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return allRecipes.find((r) => r.slug === slug);
}

export function getRecipesByCategory(category: RecipeCategory): Recipe[] {
  if (category === 'All') return allRecipes;
  return allRecipes.filter((r) => r.category === category);
}

export function getFreeRecipes(): Recipe[] {
  return allRecipes.filter((r) => r.isFree);
}
