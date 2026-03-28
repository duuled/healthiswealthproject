export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  authorRole: string;
  coverImage?: string;
  tags: string[];
  content: BlogSection[];
}

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'callout' | 'quote';
  text?: string;
  items?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'moringa-powder-benefits',
    title: 'Moringa Powder: 10 Science-Backed Benefits That Will Transform Your Health',
    excerpt: 'Dubbed the "miracle tree," moringa is packed with 90+ nutrients, 46 antioxidants, and all 9 essential amino acids. Here\'s what the science actually says.',
    category: 'Superfoods',
    readTime: '7 min read',
    publishedAt: 'March 20, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['moringa', 'superfoods', 'immune system', 'energy', 'anti-inflammatory'],
    content: [
      { type: 'paragraph', text: 'Moringa oleifera has been used in traditional medicine for over 4,000 years across Africa, India, and Southeast Asia. Today, modern science is catching up — validating what ancient healers already knew.' },
      { type: 'heading', text: 'What Makes Moringa So Powerful?' },
      { type: 'paragraph', text: 'Gram for gram, moringa powder contains 7x more vitamin C than oranges, 4x more calcium than milk, 4x more vitamin A than carrots, 2x more protein than yogurt, and 3x more potassium than bananas. That\'s not marketing — that\'s nutrition data.' },
      { type: 'heading', text: '10 Science-Backed Benefits' },
      { type: 'list', items: [
        'Reduces inflammation: Contains isothiocyanates that inhibit inflammatory markers (CRP, TNF-α)',
        'Lowers blood sugar: Studies show moringa leaf powder reduces fasting blood sugar by up to 28%',
        'Protects the liver: Chlorogenic acid and quercetin protect against oxidative liver damage',
        'Boosts brain function: High vitamin E and C content combats neurodegeneration',
        'Supports heart health: Reduces LDL cholesterol and prevents arterial plaque formation',
        'Enhances immune function: Zinc + vitamin C combination supercharges white blood cell production',
        'Increases energy without caffeine: Iron + B-vitamins fuel cellular energy (ATP) production',
        'Supports healthy skin: Behenic acid + vitamin A promotes collagen synthesis',
        'Aids digestion: Fiber content feeds beneficial gut bacteria',
        'Anti-aging properties: Polyphenol concentration rivals green tea'
      ]},
      { type: 'callout', text: '💡 Pro Tip: Add 1 tsp of moringa powder to your morning smoothie with banana, mango, and coconut water. The natural sweetness masks any bitterness.' },
      { type: 'heading', text: 'How to Use Moringa Powder Daily' },
      { type: 'paragraph', text: 'Start with 1/2 teaspoon daily and work up to 1-2 teaspoons. Add to smoothies, soups, salad dressings, or mix into water with lemon and honey. Avoid heating above 140°F to preserve enzyme activity.' },
      { type: 'quote', text: '"Moringa has become a cornerstone of our Power 5 Wellness Protocol. The consistent energy and mental clarity our community reports is remarkable." — Health Is Wealth' },
      { type: 'heading', text: 'Choosing Quality Moringa' },
      { type: 'paragraph', text: 'Not all moringa is equal. Look for: USDA Organic certified, cold-processed (not heat-dried), third-party tested for heavy metals, and vibrant green color (indicates fresh harvest). Our recommended Micro Ingredients Moringa checks all these boxes.' },
    ]
  },
  {
    slug: 'sea-moss-benefits-complete-guide',
    title: 'Sea Moss Benefits: The Complete Guide (92 Minerals Your Body Needs)',
    excerpt: 'Sea moss contains 92 of the 102 minerals the human body needs. From thyroid function to gut health — here\'s the definitive guide to this ocean superfood.',
    category: 'Superfoods',
    readTime: '9 min read',
    publishedAt: 'March 15, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['sea moss', 'minerals', 'thyroid health', 'gut health', 'immunity'],
    content: [
      { type: 'paragraph', text: 'Sea moss (Chondrus crispus) was a staple survival food in Ireland during the 1800s famine. Today it\'s one of the most nutrient-dense foods on the planet — and the wellness world is finally waking up to why.' },
      { type: 'heading', text: 'The 92 Minerals Breakdown' },
      { type: 'paragraph', text: 'Sea moss is rich in iodine (thyroid function), iron (oxygen transport), magnesium (300+ enzymatic reactions), potassium (heart and nerve function), calcium (bones + teeth), zinc (immune defense), selenium (antioxidant defense), and sulfur (joint and skin health).' },
      { type: 'heading', text: 'Top 7 Health Benefits' },
      { type: 'list', items: [
        'Thyroid Support: Iodine is essential for T3 and T4 hormone production — most Americans are deficient',
        'Gut Healing: The carrageenan acts as a prebiotic, feeding beneficial bacteria and repairing gut lining',
        'Immune Fortification: Antiviral compounds (carrageenan derivatives) block viral cell attachment',
        'Joint & Skin Health: Collagen precursors + MSM reduce inflammation and improve elasticity',
        'Weight Management: Fucoxanthin activates thermogenesis (fat burning) in brown adipose tissue',
        'Energy & Stamina: Iron + B12 combo directly addresses the most common causes of fatigue',
        'Mental Clarity: Magnesium + potassium optimize neurotransmitter signaling'
      ]},
      { type: 'callout', text: '⚠️ Caution: If you have thyroid conditions or take blood thinners, consult your doctor before taking sea moss. The iodine content is significant.' },
      { type: 'heading', text: 'Gel vs Gummies vs Capsules' },
      { type: 'paragraph', text: 'Sea moss gel (raw) is most bioavailable but requires preparation. Gummies are convenient and great for daily compliance — especially our Sea Moss Gummies which include added elderberry and bladderwrack for enhanced effect. Capsules are best for those who want precise dosing.' },
    ]
  },
  {
    slug: 'shilajit-benefits-mens-health',
    title: 'Shilajit: The Himalayan Mineral Resin That Boosts Testosterone Naturally',
    excerpt: 'Used by Ayurvedic healers for 3,000 years, shilajit is now backed by clinical trials for testosterone support, mitochondrial energy, and cognitive performance.',
    category: 'Mens Health',
    readTime: '8 min read',
    publishedAt: 'March 10, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['shilajit', 'testosterone', 'mens health', 'energy', 'mitochondria'],
    content: [
      { type: 'paragraph', text: 'Shilajit is a tar-like resin that oozes from Himalayan rocks during summer. Formed over millions of years from compressed plant matter, it contains over 85 minerals in ionic form plus fulvic acid — nature\'s most powerful bioavailability enhancer.' },
      { type: 'heading', text: 'The Clinical Evidence' },
      { type: 'paragraph', text: 'A 2015 randomized controlled trial published in Andrologia found that men taking purified shilajit (250mg twice daily) for 90 days experienced a 23.5% increase in total testosterone and 19.2% increase in free testosterone. These are not insignificant numbers.' },
      { type: 'heading', text: 'Why Shilajit Works' },
      { type: 'list', items: [
        'Fulvic acid carries minerals directly into cells, bypassing digestive barriers',
        'Dibenzo-α-pyrones (DBPs) recharge CoQ10, the molecule that powers mitochondrial ATP production',
        'Humic acid reduces cortisol (the testosterone killer) by modulating HPA axis response',
        'Zinc + selenium combo directly supports Leydig cell function (testosterone production site)',
        'Adaptogenic properties reduce oxidative stress that degrades hormone production'
      ]},
      { type: 'heading', text: 'Benefits Beyond Testosterone' },
      { type: 'list', items: [
        'Altitude sickness prevention (Himalayan climbers use it traditionally)',
        'Alzheimer\'s prevention: Fulvic acid inhibits tau protein aggregation',
        'Iron-deficiency anemia: Increases iron absorption by 30-60%',
        'Chronic fatigue: Mitochondrial support restores cellular energy production',
        'Anti-aging: Telomere protection via antioxidant cascade'
      ]},
      { type: 'callout', text: '💡 Quality Alert: 80% of shilajit on Amazon is fake or heavily diluted. Look for: authenticated Himalayan source, fulvic acid content > 50%, heavy metal tested, and resin form (not powder).' },
    ]
  },
  {
    slug: 'blue-spirulina-vs-green-spirulina',
    title: 'Blue Spirulina vs Green Spirulina: Which One Should You Buy?',
    excerpt: 'Both are powerhouse algae — but they\'re not the same. Here\'s the key difference in nutrients, taste, and what each one is actually best for.',
    category: 'Superfoods',
    readTime: '6 min read',
    publishedAt: 'March 5, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['spirulina', 'blue spirulina', 'antioxidants', 'detox', 'superfoods'],
    content: [
      { type: 'paragraph', text: 'The vibrant blue spirulina flooding Instagram smoothie bowls is not just aesthetic. There\'s a real biochemical reason it\'s priced higher than regular green spirulina — and whether it\'s worth it depends entirely on your health goals.' },
      { type: 'heading', text: 'The Key Difference: Phycocyanin' },
      { type: 'paragraph', text: 'Blue spirulina is an extract of green spirulina, specifically concentrating phycocyanin — the blue pigment responsible for its color. Green spirulina contains ~15-20% phycocyanin by weight. Blue spirulina extract is 60-85% pure phycocyanin.' },
      { type: 'heading', text: 'Phycocyanin: Why It Matters' },
      { type: 'list', items: [
        'One of nature\'s most potent anti-inflammatory compounds (comparable to ibuprofen without side effects)',
        'Powerful free-radical scavenger — ORAC value exceeds blueberries by 3x',
        'Neuroprotective: Crosses the blood-brain barrier to reduce neuroinflammation',
        'Liver detox support: Upregulates glutathione production',
        'Natural food coloring without synthetic dyes'
      ]},
      { type: 'heading', text: 'When to Choose Each' },
      { type: 'paragraph', text: 'Choose Blue Spirulina (phycocyanin extract) when: you want max antioxidant punch, you make smoothie bowls or lemonade, or you\'re targeting inflammation and brain health. Choose Green Spirulina when: you want the full nutritional profile (protein, B12, iron, chlorophyll), you\'re using it as a daily multivitamin replacement, or you want maximum value per dollar.' },
      { type: 'callout', text: '🍋 Best Use for Blue Spirulina: Mix 1/2 tsp in cold lemonade with honey and mint. The electric blue color is stunning and the taste is surprisingly mild.' },
    ]
  },
  {
    slug: 'power-5-morning-routine-wellness',
    title: 'The Power 5 Morning Routine: How to Optimize Your Health in 10 Minutes',
    excerpt: 'The 5 superfoods that top biohackers, athletes, and wellness practitioners combine every morning for energy, immunity, and longevity.',
    category: 'Lifestyle',
    readTime: '10 min read',
    publishedAt: 'February 28, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['morning routine', 'wellness', 'biohacking', 'supplements', 'health optimization'],
    content: [
      { type: 'paragraph', text: 'The difference between average health and exceptional health is rarely dramatic. It\'s the accumulation of small, consistent habits — especially in the morning when your body is most receptive to nutrition and signaling.' },
      { type: 'heading', text: 'The Power 5 Protocol' },
      { type: 'paragraph', text: 'These five superfoods work synergistically. Combining them amplifies each one\'s individual benefits through what researchers call "nutritional synergy."' },
      { type: 'list', items: [
        '1. Blue Spirulina (1/2 tsp): Antioxidant surge + phycocyanin anti-inflammatory effect',
        '2. Moringa Powder (1 tsp): 90+ nutrients, natural energy without caffeine crash',
        '3. Amla Powder (1 tsp): Highest natural vitamin C source on earth — 20x more than oranges',
        '4. Manuka Honey (1 tbsp): MGO antibacterial + prebiotic oligosaccharides for gut',
        '5. Sea Moss (2 tbsp gel): 92 minerals to fill nutritional gaps'
      ]},
      { type: 'heading', text: 'The 10-Minute Power Smoothie Recipe' },
      { type: 'list', items: [
        '1 cup coconut water (electrolyte base)',
        '1/2 frozen banana (natural sweetener + potassium)',
        '1/2 cup frozen mango (tropical flavor + vitamin A)',
        '1/2 tsp blue spirulina',
        '1 tsp moringa powder',
        '1 tsp amla powder',
        '1 tbsp manuka honey',
        '2 tbsp sea moss gel',
        'Juice of 1/2 lemon',
        'Blend 60 seconds. Drink immediately on empty stomach.'
      ]},
      { type: 'callout', text: '📊 What to Expect: Week 1 — improved digestion and sleep. Week 2 — noticeable energy increase. Week 3 — skin clarity improvements. Month 2 — sustained energy, stronger immunity, mental clarity.' },
      { type: 'heading', text: 'Why Empty Stomach Matters' },
      { type: 'paragraph', text: 'Consuming superfoods on an empty stomach (30-60 minutes before your first meal) maximizes absorption. Digestive enzymes are at peak activity and there\'s no competition from other foods for nutrient uptake sites.' },
      { type: 'quote', text: '"The Power 5 protocol changed my life. I went from needing 3 coffees to zero. My energy is consistent all day." — Marcus T., Los Angeles' },
    ]
  },
  {
    slug: 'amla-powder-vitamin-c-immune-system',
    title: 'Amla Powder: Why This Indian Gooseberry Has 20x More Vitamin C Than Oranges',
    excerpt: 'Amla (Indian gooseberry) has the highest natural vitamin C concentration of any food on earth. Here\'s what that means for your immune system, skin, and longevity.',
    category: 'Immunity',
    readTime: '6 min read',
    publishedAt: 'February 22, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['amla', 'vitamin C', 'immune system', 'antioxidants', 'skin health', 'ayurveda'],
    content: [
      { type: 'paragraph', text: 'Amla (Emblica officinalis) is one of the three fruits in the Ayurvedic formula Triphala — used for over 3,000 years as a longevity tonic. Modern analysis shows why: a single amla fruit contains 445mg of vitamin C. An orange has 69mg. That\'s 6.4x more per fruit. As a concentrated powder, the ratio climbs to 20x.' },
      { type: 'heading', text: 'Vitamin C That Actually Works' },
      { type: 'paragraph', text: 'Most synthetic vitamin C supplements (ascorbic acid) are poorly absorbed and quickly excreted. Amla\'s vitamin C is bound to tannins and bioflavonoids that protect it from heat, light, and digestive destruction. Bioavailability studies show amla vitamin C remains active in the bloodstream 3x longer than synthetic ascorbic acid.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: [
        'Immune system activation: Stimulates NK cell (natural killer cell) production',
        'Collagen synthesis: Vitamin C is the essential cofactor for collagen production (skin, joints, arteries)',
        'Iron absorption: Increases non-heme iron absorption by up to 67%',
        'Hair growth: DHT-blocking properties + scalp circulation improvement',
        'Blood sugar regulation: Chromium content improves insulin sensitivity',
        'Heart protection: Polyphenols prevent LDL oxidation',
        'Anti-aging: One of the highest ORAC (antioxidant) values of any food studied'
      ]},
      { type: 'callout', text: '✨ Beauty Hack: Mix 1/2 tsp amla powder + 1 tsp honey + 1 tsp aloe vera gel into a face mask. Leave 15 minutes. The vitamin C brightens skin and the tannins tighten pores.' },
    ]
  },
  {
    slug: 'manuka-honey-benefits-guide',
    title: 'Manuka Honey: Is the $60 Jar Actually Worth It? (The MGO Science Explained)',
    excerpt: 'Manuka honey has unique antibacterial properties that no other honey possesses. But with prices from $15 to $200, how do you know what\'s legit?',
    category: 'Superfoods',
    readTime: '7 min read',
    publishedAt: 'February 18, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['manuka honey', 'antibacterial', 'gut health', 'wound healing', 'MGO'],
    content: [
      { type: 'paragraph', text: 'Manuka honey comes exclusively from bees pollinating the Leptospermum scoparium (manuka) bush in New Zealand and parts of Australia. What makes it unique is methylglyoxal (MGO) — a compound with antibacterial properties so strong it\'s used in wound care in clinical settings.' },
      { type: 'heading', text: 'Understanding MGO Ratings' },
      { type: 'paragraph', text: 'MGO 83+ — Entry level, general wellness. MGO 263+ — Effective for gut health and immune support. MGO 514+ — Therapeutic range, used for H. pylori and SIBO. MGO 829+ — Clinical grade, wound care applications. Most people doing daily wellness supplementation are well-served by MGO 263+.' },
      { type: 'heading', text: 'What Manuka Actually Does' },
      { type: 'list', items: [
        'Kills drug-resistant bacteria: Active against MRSA, E. coli, Salmonella, and H. pylori',
        'Heals gut lining: Mucoadhesive properties coat and protect intestinal walls',
        'Prebiotic activity: Oligosaccharides feed Bifidobacterium and Lactobacillus strains',
        'Immune modulation: Arabinogalactan activates macrophage response',
        'Wound healing: Clinical trials show 40% faster healing than standard wound dressings',
        'Anti-biofilm: Disrupts bacterial communication, preventing antibiotic-resistant colonies'
      ]},
      { type: 'callout', text: '🍯 Daily Protocol: Take 1 tablespoon on empty stomach each morning. Do NOT heat manuka honey — heat above 40°C degrades MGO activity.' },
      { type: 'heading', text: 'How to Verify Authenticity' },
      { type: 'paragraph', text: 'Only buy Manuka honey with UMF (Unique Manuka Factor) or MGO certification from the Manuka Honey Appellation Society (MHAS). Look for a New Zealand origin and a batch-specific MGO test certificate from an independent lab.' },
    ]
  },
  {
    slug: 'chaga-mushroom-immune-system',
    title: 'Chaga Mushroom: The "King of Medicinal Mushrooms" for Immune Defense',
    excerpt: 'Chaga has one of the highest ORAC antioxidant values of any food ever measured. Here\'s how this Siberian tree fungus became the most studied medicinal mushroom in the world.',
    category: 'Immunity',
    readTime: '7 min read',
    publishedAt: 'February 12, 2025',
    author: 'Health Is Wealth Team',
    authorRole: 'Wellness Researchers',
    tags: ['chaga', 'medicinal mushrooms', 'immune system', 'antioxidants', 'adaptogen'],
    content: [
      { type: 'paragraph', text: 'Chaga (Inonotus obliquus) grows parasitically on birch trees in Siberia, Canada, and northern Europe. It has been consumed as a medicinal tea in Russia and Eastern Europe for centuries. Its ORAC (oxygen radical absorbance capacity) value of 146,700 µmol TE/100g dwarfs acai berries (102,700), goji berries (25,300), and blueberries (4,669).' },
      { type: 'heading', text: 'Active Compounds' },
      { type: 'list', items: [
        'Beta-glucans: Immune modulating polysaccharides that activate natural killer cells',
        'Betulinic acid: Derived from birch bark, studied for anti-tumor properties',
        'Melanin: The highest concentration in any food — powerful antioxidant + UV protection',
        'Superoxide dismutase (SOD): An enzyme that neutralizes the most damaging free radicals',
        'Ergosterol: Precursor to vitamin D2 in the body',
        'Polyphenols: Anti-inflammatory, anti-viral, and anti-bacterial compounds'
      ]},
      { type: 'heading', text: 'Immune Defense Mechanisms' },
      { type: 'paragraph', text: 'Chaga is an "immunomodulator" — it doesn\'t just stimulate immunity (which can cause autoimmune flares), it balances it. When immunity is low, chaga upregulates it. When it\'s overactive (as in allergies or autoimmune conditions), chaga helps calm it. This bidirectional modulation is rare in natural medicine.' },
      { type: 'callout', text: '☕ Best Preparation: Chaga tea (simmer chunks for 15-30 minutes) has highest beta-glucan extraction. Powder in coffee is second best. Tinctures are most concentrated for therapeutic use.' },
    ]
  },
];

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return BLOG_POSTS.filter(post => post.category === category);
};

export const BLOG_CATEGORIES = ['All', 'Superfoods', 'Immunity', 'Mens Health', 'Lifestyle'];
