export type Cuisine =
  | 'Mexican'
  | 'Korean'
  | 'Soul Food'
  | 'Caribbean'
  | 'Japanese'
  | 'Ethiopian'
  | 'Salvadoran'
  | 'Vietnamese'
  | 'Peruvian'
  | 'Halal'
  | 'BBQ'
  | 'Seafood'
  | 'Nigerian';

export type Neighborhood =
  | 'Koreatown'
  | 'Boyle Heights'
  | 'Leimert Park'
  | 'East LA'
  | 'Inglewood'
  | 'Crenshaw'
  | 'Compton'
  | 'Pico-Union'
  | 'MacArthur Park'
  | 'Highland Park'
  | 'Jefferson Park'
  | 'Watts';

export type PriceTier = '$' | '$$' | '$$$';

export interface FoodSpot {
  slug: string;
  name: string;
  neighborhood: Neighborhood;
  cuisine: Cuisine;
  price: PriceTier;
  mustOrder: string[];
  localSecret: string;
  vibe: string;
  bestFor: string[];
  address: string;
  hours?: string;
  instagramHandle?: string;
  isHidden: boolean;
  addedBy: string;
  tags: string[];
  excerpt: string;
  publishedAt: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  'Koreatown',
  'Boyle Heights',
  'Leimert Park',
  'East LA',
  'Inglewood',
  'Crenshaw',
  'Compton',
  'Pico-Union',
  'MacArthur Park',
  'Highland Park',
  'Jefferson Park',
  'Watts',
];

export const CUISINES: Cuisine[] = [
  'Mexican',
  'Korean',
  'Soul Food',
  'Caribbean',
  'Japanese',
  'Ethiopian',
  'Salvadoran',
  'Vietnamese',
  'Peruvian',
  'Halal',
  'BBQ',
  'Seafood',
  'Nigerian',
];

export const SPOTS: FoodSpot[] = [
  // ─── Koreatown (2) ───────────────────────────────────────────────
  {
    slug: 'park-bbq-ktown',
    name: 'Park BBQ',
    neighborhood: 'Koreatown',
    cuisine: 'Korean',
    price: '$$$',
    mustOrder: ['Chadolbaegi (beef brisket)', 'Kimchi Jjigae', 'Haemul Pajeon'],
    localSecret:
      'Menu is Korean-only — point at what the table next to you is cooking. Get there before 6 PM or expect a 90-minute wait.',
    vibe: 'No-frills Korean BBQ institution where the smoke clings to your clothes and you will not care.',
    bestFor: ['date night', 'group dinner', 'authentic experience'],
    address: '955 S Vermont Ave, Los Angeles, CA 90006',
    hours: 'Mon–Sun 11AM–1AM',
    instagramHandle: 'parkbbqla',
    isHidden: false,
    addedBy: 'TasteTable team',
    tags: ['KBBQ', 'no English menu', 'smoke', 'institution'],
    excerpt:
      'Koreatown\'s smoke-stained legend. Korean-only menu, 90-min waits, beef brisket that melts. Locals only.',
    publishedAt: '2024-01-10',
  },
  {
    slug: 'quarters-korean-bbq',
    name: 'Quarters Korean BBQ',
    neighborhood: 'Koreatown',
    cuisine: 'Korean',
    price: '$$',
    mustOrder: ['LA Galbi (short rib)', 'Spicy Pork Belly', 'Doenjang Jjigae'],
    localSecret:
      'Order the LA Galbi as soon as you sit — they sometimes run out by 8 PM on weekends. Ask for the extra garlic they keep off-menu.',
    vibe: 'Louder, younger, and cheaper than the K-town legends — where the second generation brings their friends.',
    bestFor: ['late night', 'groups', 'budget KBBQ'],
    address: '3465 W 6th St, Los Angeles, CA 90020',
    hours: 'Mon–Thu 11AM–midnight, Fri–Sun 11AM–2AM',
    instagramHandle: 'quarterskbbq',
    isHidden: true,
    addedBy: 'Danny K., K-town local',
    tags: ['KBBQ', 'late night', 'affordable', 'younger crowd'],
    excerpt:
      'Affordable K-town BBQ without the hype tax. LA Galbi and spicy pork belly until 2AM on weekends. Bring cash and an appetite.',
    publishedAt: '2024-02-14',
  },

  // ─── Boyle Heights (2) ───────────────────────────────────────────
  {
    slug: 'tacos-el-rey-boyle-heights',
    name: 'Tacos El Rey',
    neighborhood: 'Boyle Heights',
    cuisine: 'Mexican',
    price: '$',
    mustOrder: ['Cabeza taco', 'Tripa taco', 'Agua de jamaica'],
    localSecret:
      'The cart is cash only and moves slightly every few nights — it\'s always within two blocks of Cesar Chavez and Soto. The cabeza runs out by 3 AM.',
    vibe: 'A folding-table taco cart under a buzzing streetlight that has been feeding Boyle Heights since before you were born.',
    bestFor: ['late night', 'cash only', '24/7', 'after bar'],
    address: 'Cesar Chavez Ave & Soto St, Boyle Heights, CA 90033',
    hours: '24/7 (cart moves — call ahead)',
    isHidden: true,
    addedBy: 'Maria V., Boyle Heights native',
    tags: ['taco cart', '24/7', 'cash only', 'cabeza', 'tripa', 'street food'],
    excerpt:
      'The 24/7 Boyle Heights taco cart that never made Eater or Yelp. Cabeza and tripa under a streetlight. Cash only. Always worth it.',
    publishedAt: '2024-01-22',
  },
  {
    slug: 'guisados-boyle-heights',
    name: 'Guisados',
    neighborhood: 'Boyle Heights',
    cuisine: 'Mexican',
    price: '$',
    mustOrder: ['Tinga de pollo taco', 'Chicharron en salsa verde taco', 'Sampler plate (6 mini tacos)'],
    localSecret:
      'The sampler is the move for first-timers — 6 different guisados on handmade tortillas for under $12. Chicharron en salsa verde is the sleeper hit.',
    vibe: 'Bright, bustling, and proudly rooted in Boyle Heights — handmade tortillas slapping on the comal since 7 AM.',
    bestFor: ['breakfast', 'lunch', 'family style', 'first visit'],
    address: '2100 E Cesar Chavez Ave, Los Angeles, CA 90033',
    hours: 'Mon–Sun 8AM–10PM',
    instagramHandle: 'guisados',
    isHidden: false,
    addedBy: 'TasteTable team',
    tags: ['braised tacos', 'handmade tortillas', 'Boyle Heights', 'lunch'],
    excerpt:
      'Boyle Heights\' braised taco institution. Handmade tortillas, 10+ guisado options, $12 sampler that wins every time. No hype, just craft.',
    publishedAt: '2024-01-15',
  },

  // ─── Leimert Park (2) ────────────────────────────────────────────
  {
    slug: 'ms-beas-soul-food',
    name: "Ms. Bea's Soul Kitchen",
    neighborhood: 'Leimert Park',
    cuisine: 'Soul Food',
    price: '$',
    mustOrder: ['Oxtail plate', 'Candied yams', 'Cornbread'],
    localSecret:
      'Weekend only — doors open at 11 AM Saturday and Sunday and close when food runs out (usually by 2:30 PM). Get there at 10:45 or go home hungry.',
    vibe: 'Ms. Bea\'s front porch in restaurant form — gospel playing, oxtail falling off the bone, and a line around the block that is absolutely worth it.',
    bestFor: ['weekend brunch', 'Sunday lunch', 'comfort food', 'family'],
    address: '4327 Degnan Blvd, Los Angeles, CA 90008',
    hours: 'Sat–Sun 11AM until sold out',
    isHidden: true,
    addedBy: 'DeShawn T., Leimert Park local',
    tags: ['soul food', 'oxtail', 'weekend only', 'sells out', 'cash only', 'community'],
    excerpt:
      'Leimert Park\'s weekend-only soul food secret. Ms. Bea\'s oxtail and cornbread sells out by 2:30 PM every Saturday and Sunday. Come early or miss out.',
    publishedAt: '2024-02-01',
  },
  {
    slug: 'ackees-jamaican-leimert',
    name: "Ackee's Jamaican Kitchen",
    neighborhood: 'Leimert Park',
    cuisine: 'Caribbean',
    price: '$$',
    mustOrder: ['Jerk chicken (half bird)', 'Oxtail with butter beans', 'Festival (fried dumplings)'],
    localSecret:
      'Ask for the "yard plate" — it\'s not on the menu but gets you rice and peas, plantains, and extra gravy on the oxtail for $3 more.',
    vibe: 'Wood-paneled walls, reggae on the speakers, and jerk smoke drifting out to Degnan Blvd on a Friday night.',
    bestFor: ['dinner', 'date night', 'Caribbean craving', 'Fridays'],
    address: '4371 Degnan Blvd, Los Angeles, CA 90008',
    hours: 'Tue–Sun 12PM–9PM',
    instagramHandle: 'ackees_la',
    isHidden: false,
    addedBy: 'TasteTable team',
    tags: ['Jamaican', 'jerk chicken', 'oxtail', 'Caribbean', 'Leimert Park'],
    excerpt:
      'Leimert Park\'s Jamaican anchor. Half-bird jerk chicken, oxtail with butter beans, and a yard plate off-menu deal that locals know to ask for.',
    publishedAt: '2024-02-20',
  },

  // ─── East LA (1) ─────────────────────────────────────────────────
  {
    slug: 'mariscos-jalisco-east-la',
    name: 'Mariscos Jalisco',
    neighborhood: 'East LA',
    cuisine: 'Seafood',
    price: '$',
    mustOrder: ['Tostada de camarón', 'Cóctel de camarón', 'Tacos de camarón'],
    localSecret:
      'The tostada de camarón is the only thing you need to order. It is $4.50 and it will change how you think about seafood tacos. Get three.',
    vibe: 'A bright orange truck on Olympic Blvd that has been the subject of more food pilgrimages than any restaurant in East LA.',
    bestFor: ['lunch', 'quick bite', 'seafood craving', 'cash only'],
    address: '3040 E Olympic Blvd, Los Angeles, CA 90023',
    hours: 'Tue–Sun 10AM–6PM',
    isHidden: false,
    addedBy: 'TasteTable team',
    tags: ['seafood', 'tostada', 'food truck', 'East LA', 'shrimp', 'iconic'],
    excerpt:
      'East LA\'s legendary shrimp tostada truck. $4.50 tostada de camarón that food writers have been writing about for 20 years. There is a reason.',
    publishedAt: '2024-01-08',
  },

  // ─── Inglewood (2) ───────────────────────────────────────────────
  {
    slug: 'darcys-jerk-inglewood',
    name: "Darcy's Yard",
    neighborhood: 'Inglewood',
    cuisine: 'Caribbean',
    price: '$$',
    mustOrder: ['Jerk chicken (quarter)', 'Oxtail stew', 'Hard dough bread'],
    localSecret:
      'Thursday nights they do a "Yard Special" — half-bird jerk chicken, rice, peas, and plantains for $18. Show up by 6 PM before it disappears.',
    vibe: 'A corner spot on Market St that smells like scotch bonnet and allspice from half a block away — real Jamaican yard cooking, no shortcuts.',
    bestFor: ['dinner', 'Thursday special', 'oxtail lover', 'date night'],
    address: '515 N Market St, Inglewood, CA 90301',
    hours: 'Mon–Sat 11AM–9PM',
    instagramHandle: 'darcysyard_ingle',
    isHidden: true,
    addedBy: 'Kezia M., Inglewood local',
    tags: ['Jamaican', 'jerk', 'oxtail', 'Inglewood', 'Caribbean', 'hidden gem'],
    excerpt:
      'Inglewood\'s best-kept Jamaican secret. Darcy\'s Thursday yard special is $18 and runs out by 7 PM. Scotch bonnet heat, no shortcuts, no tourists.',
    publishedAt: '2024-03-01',
  },
  {
    slug: 'suya-spot-inglewood',
    name: 'Suya Spot',
    neighborhood: 'Inglewood',
    cuisine: 'Nigerian',
    price: '$',
    mustOrder: ['Beef suya skewers', 'Jollof rice', 'Puff puff'],
    localSecret:
      'The suya spice blend is house-made with 12 spices — ask for "extra yaji" when you order and they pile the dry rub on. Go after 7 PM when the grill is hot.',
    vibe: 'A family-run Nigerian grill on La Brea where the suya skewers hit the charcoal every night and the jollof rice is always a debate at the table.',
    bestFor: ['dinner', 'late night', 'Nigerian craving', 'group', 'after 7PM'],
    address: '920 S La Brea Ave, Inglewood, CA 90301',
    hours: 'Wed–Mon 5PM–midnight',
    instagramHandle: 'suyaspotla',
    isHidden: true,
    addedBy: 'Tunde A., Inglewood regular',
    tags: ['Nigerian', 'suya', 'jollof', 'charcoal grill', 'West African', 'hidden gem'],
    excerpt:
      'Inglewood\'s Nigerian grill that nobody outside the community talks about — yet. Suya skewers with house yaji spice blend, jollof, and puff puff until midnight.',
    publishedAt: '2024-03-10',
  },

  // ─── Compton (1) ─────────────────────────────────────────────────
  {
    slug: 'tam-burgers-compton',
    name: "Tam's Burgers",
    neighborhood: 'Compton',
    cuisine: 'BBQ',
    price: '$',
    mustOrder: ['Double cheeseburger', 'Chili cheese fries', 'Strawberry soda'],
    localSecret:
      'Order the chili cheese fries with the pastrami — it\'s not listed as a combo but they will make it. The strawberry soda from the machine is non-negotiable.',
    vibe: 'Compton\'s 60-year-old fast food church — neon signs, walk-up window, and a double cheeseburger that has outlasted every trend.',
    bestFor: ['lunch', 'late night', 'cheap eats', 'classic LA', 'cash only'],
    address: '401 S Wilmington Ave, Compton, CA 90220',
    hours: 'Mon–Sun 10AM–midnight',
    isHidden: false,
    addedBy: 'TasteTable team',
    tags: ['burgers', 'Compton', 'institution', 'chili cheese fries', 'cheap eats', 'classic'],
    excerpt:
      'Compton\'s 60-year burger institution. Double cheeseburger, chili cheese fries with pastrami (ask off-menu), strawberry soda. The real LA fast food.',
    publishedAt: '2024-01-30',
  },

  // ─── Highland Park (1) ───────────────────────────────────────────
  {
    slug: 'lasa-highland-park',
    name: 'LASA',
    neighborhood: 'Highland Park',
    cuisine: 'Filipino',
    price: '$$',
    mustOrder: ['Crispy pata', 'Kare-kare', 'Halo-halo'],
    localSecret:
      'The crispy pata sells out by 7:30 PM on weekends — call ahead and reserve it. The kare-kare comes with extra bagoong on the side if you ask.',
    vibe: 'Filipino-American cooking rooted in family recipes on York Blvd — the Silvana side of Highland Park before the rents went up.',
    bestFor: ['dinner', 'Filipino craving', 'date night', 'weekend', 'family'],
    address: '727 N Broadway, Los Angeles, CA 90012',
    hours: 'Wed–Sun 5PM–10PM',
    instagramHandle: 'lasarestaurant',
    isHidden: false,
    addedBy: 'TasteTable team',
    tags: ['Filipino', 'crispy pata', 'kare-kare', 'halo-halo', 'Highland Park'],
    excerpt:
      'Highland Park\'s Filipino anchor. Crispy pata, kare-kare with extra bagoong, and halo-halo that ends the meal right. Call ahead to reserve the pata on weekends.',
    publishedAt: '2024-02-08',
  },

  // ─── Pico-Union (1) ──────────────────────────────────────────────
  {
    slug: 'las-pupusas-de-la-abuela',
    name: "Las Pupusas de la Abuela",
    neighborhood: 'Pico-Union',
    cuisine: 'Salvadoran',
    price: '$',
    mustOrder: ['Pupusa revuelta (cheese + chicharron)', 'Pupusa de loroco', 'Horchata de morro'],
    localSecret:
      'The loroco pupusa is the move — barely anyone outside the Salvadoran community knows this flower filling. Order two. The curtido is house-fermented for three days.',
    vibe: 'A six-table spot on 9th St run by a grandmother who makes every pupusa to order, all day, no exceptions, no shortcuts.',
    bestFor: ['lunch', 'cash only', 'authentic', 'local secret', 'cheap eats'],
    address: '1208 W 9th St, Los Angeles, CA 90015',
    hours: 'Tue–Sun 8AM–7PM',
    isHidden: true,
    addedBy: 'Ana S., Pico-Union native',
    tags: ['Salvadoran', 'pupusa', 'loroco', 'cash only', 'hidden gem', 'Pico-Union', 'grandmother'],
    excerpt:
      'Pico-Union\'s pupusa secret that tourists never find. Grandmother makes every pupusa to order, loroco filling, curtido fermented three days. Cash only, six tables.',
    publishedAt: '2024-03-05',
  },
];

export function getAllSpots(): FoodSpot[] {
  return SPOTS;
}

export function getSpotBySlug(slug: string): FoodSpot | undefined {
  return SPOTS.find((spot) => spot.slug === slug);
}

export function getSpotsByNeighborhood(neighborhood: Neighborhood): FoodSpot[] {
  return SPOTS.filter((spot) => spot.neighborhood === neighborhood);
}

export function getSpotsByCuisine(cuisine: Cuisine): FoodSpot[] {
  return SPOTS.filter((spot) => spot.cuisine === cuisine);
}

export function getHiddenGems(limit?: number): FoodSpot[] {
  const gems = SPOTS.filter((spot) => spot.isHidden);
  return limit ? gems.slice(0, limit) : gems;
}

export function getFeaturedSpots(limit?: number): FoodSpot[] {
  const featured = SPOTS.filter((spot) => !spot.isHidden);
  return limit ? featured.slice(0, limit) : featured;
}
