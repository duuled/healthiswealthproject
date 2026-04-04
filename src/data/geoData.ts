export interface LocalStore {
  name: string;
  address: string;
  neighborhood: string;
  pros: string[];
  cons?: string[];
  recommended?: boolean;
  description: string;
}

export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  population: string;
  wellnessDescription: string;
  localStores: LocalStore[];
  seo: {
    title: string;
    description: string;
    keywords: string;
    h1: string;
    intro: string;
  };
  neighborhoods: string[];
}

export const CITY_DATA: Record<string, CityData> = {
  'los-angeles': {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    latitude: 34.0522,
    longitude: -118.2437,
    population: '3.9M',
    wellnessDescription:
      'LA leads the nation in wellness culture — from Venice Beach yoga to Erewhon superfood bars. Health-conscious Angelenos know that real wellness starts from the inside.',
    neighborhoods: ['Venice', 'West LA', 'Santa Monica', 'Culver City', 'Marina Del Rey', 'Silver Lake', 'Los Feliz'],
    seo: {
      title: 'Best Wellness Supplements in Los Angeles, CA | Health Is Wealth',
      description:
        'Discover the best health food stores and premium wellness supplements in Los Angeles. Moringa, Shilajit, Chaga, Neem & Amla — shipped to Venice, West LA, Santa Monica & all of LA County.',
      keywords:
        'wellness supplements Los Angeles, health food stores LA, moringa powder Los Angeles, Shilajit Venice CA, superfood supplements West LA, organic supplements Santa Monica, natural health Los Angeles CA',
      h1: 'Wellness Supplements & Health Stores in Los Angeles',
      intro:
        'From Venice Beach to Culver City, LA sets the wellness standard. Fuel your body with our premium ancient superfoods — delivered directly to your door anywhere in LA County.',
    },
    localStores: [
      {
        name: 'Rainbow Acres',
        address: '2122 Pico Blvd, Santa Monica, CA 90405',
        neighborhood: 'West LA / Santa Monica',
        pros: ['Affordable prices', 'Fresh seamoss', 'Quality raw honey', 'Friendly staff'],
        cons: ['Limited parking'],
        recommended: true,
        description: 'Our top pick for affordable, quality supplements in West LA. Best prices on bulk herbs and powders.',
      },
      {
        name: 'Erewhon Market',
        address: '585 Venice Blvd, Venice, CA 90291',
        neighborhood: 'Venice Beach',
        pros: ['Premium quality', 'Unique superfood drinks', 'Local + organic focus'],
        cons: ['Very high prices'],
        recommended: true,
        description: 'The gold standard for LA wellness culture. Expensive but unmatched quality and selection.',
      },
      {
        name: 'Whole Foods Market',
        address: '13488 Maxella Ave, Marina del Rey, CA 90292',
        neighborhood: 'Marina Del Rey',
        pros: ['Wide selection', 'Organic certified', 'Convenient location'],
        cons: ['Higher prices', 'Can get crowded'],
        description: 'Reliable quality and good backup when Rainbow Acres is out of stock.',
      },
    ],
  },
  'new-york': {
    slug: 'new-york',
    name: 'New York City',
    state: 'New York',
    stateCode: 'NY',
    latitude: 40.7128,
    longitude: -74.006,
    population: '8.3M',
    wellnessDescription:
      'NYC is a global epicenter for health innovation. From Brooklyn smoothie bars to Midtown juice stops, New Yorkers demand the best — and Health Is Wealth delivers.',
    neighborhoods: ['Brooklyn', 'Harlem', 'Lower East Side', 'West Village', 'Astoria', 'Bushwick', 'SoHo'],
    seo: {
      title: 'Best Wellness Supplements in New York City, NY | Health Is Wealth',
      description:
        'Find the best health food stores and premium wellness supplements in New York City. Moringa, Shilajit, Chaga & more shipped to Brooklyn, Harlem, Manhattan, Queens & all 5 boroughs.',
      keywords:
        'wellness supplements New York City, health food stores NYC, moringa powder Brooklyn, Shilajit Harlem, superfood supplements Manhattan, organic supplements NYC, natural health New York',
      h1: 'Wellness Supplements & Health Stores in New York City',
      intro:
        'NYC never sleeps — and neither does your health. Power through every borough with premium ancient superfoods, delivered straight to your door anywhere in the five boroughs.',
    },
    localStores: [
      {
        name: 'Westerly Natural Market',
        address: '911 8th Ave, New York, NY 10019',
        neighborhood: 'Midtown West / Hell\'s Kitchen',
        pros: ['Great bulk herbs section', 'Affordable', 'Knowledgeable staff'],
        recommended: true,
        description: 'One of NYC\'s best independent health food stores. Excellent herb and supplement selection.',
      },
      {
        name: 'Flower Power Herbs & Roots',
        address: '406 E 9th St, New York, NY 10009',
        neighborhood: 'East Village',
        pros: ['Apothecary-style herbs', 'Rare botanicals', 'Wellness consultations'],
        description: 'Herbalist-owned shop with deep knowledge. Perfect for Ayurvedic and adaptogenic herbs.',
      },
      {
        name: 'Whole Foods Market',
        address: '95 E Houston St, New York, NY 10002',
        neighborhood: 'Lower East Side',
        pros: ['Wide selection', 'Organic options', 'Convenient'],
        cons: ['Crowded', 'Expensive'],
        description: 'Reliable option throughout NYC\'s 5 boroughs.',
      },
    ],
  },
  'miami': {
    slug: 'miami',
    name: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    latitude: 25.7617,
    longitude: -80.1918,
    population: '450K',
    wellnessDescription:
      'Miami\'s vibrant wellness scene blends Caribbean herbal traditions with modern superfoods. The Wynwood and Coconut Grove communities are leading the charge for plant-based living in South Florida.',
    neighborhoods: ['Wynwood', 'Coconut Grove', 'South Beach', 'Brickell', 'Little Havana', 'Coral Gables'],
    seo: {
      title: 'Best Wellness Supplements in Miami, FL | Health Is Wealth',
      description:
        'Shop premium wellness supplements in Miami. Moringa, Shilajit, Chaga & Amla shipped to Wynwood, Coconut Grove, South Beach, Brickell & all of Miami-Dade County.',
      keywords:
        'wellness supplements Miami, health food stores Miami FL, moringa powder Miami, Shilajit South Beach, superfood supplements Wynwood, organic supplements Miami, natural health Florida',
      h1: 'Wellness Supplements & Health Stores in Miami',
      intro:
        'Miami\'s energy meets ancient superfood wisdom. Whether you\'re in Wynwood or Coconut Grove, our premium supplements keep you performing at your peak in South Florida\'s heat.',
    },
    localStores: [
      {
        name: 'Earth \'N Us Farm Market',
        address: '3817 N Miami Ave, Miami, FL 33127',
        neighborhood: 'Wynwood / Design District',
        pros: ['Locally grown produce', 'Caribbean herbs', 'Community-focused'],
        recommended: true,
        description: 'Urban farm market with strong Caribbean herbal traditions. Best for seamoss and local botanicals.',
      },
      {
        name: 'Whole Foods Market',
        address: '11701 S Dixie Hwy, Pinecrest, FL 33156',
        neighborhood: 'South Miami',
        pros: ['Great selection', 'Organic produce', 'Reliable quality'],
        cons: ['Higher prices'],
        description: 'Most accessible premium health food store in South Miami.',
      },
      {
        name: 'The Vitamin Shoppe',
        address: '1750 NW 107th Ave, Miami, FL 33172',
        neighborhood: 'Doral',
        pros: ['Competitive prices', 'Wide supplement range'],
        cons: ['Less focus on whole foods/powders'],
        description: 'Good for branded supplements and vitamins.',
      },
    ],
  },
  'atlanta': {
    slug: 'atlanta',
    name: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    latitude: 33.749,
    longitude: -84.388,
    population: '500K',
    wellnessDescription:
      'Atlanta\'s Black wellness movement is thriving. From West End herb shops to Ponce City Market smoothie bars, ATL\'s health-conscious community is building generational wellness.',
    neighborhoods: ['West End', 'Decatur', 'East Atlanta', 'Old Fourth Ward', 'Buckhead', 'Edgewood', 'Kirkwood'],
    seo: {
      title: 'Best Wellness Supplements in Atlanta, GA | Health Is Wealth',
      description:
        'Premium wellness supplements delivered to Atlanta. Moringa, Shilajit, Chaga & Amla shipped to West End, Decatur, Old Fourth Ward, Buckhead & all of metro Atlanta.',
      keywords:
        'wellness supplements Atlanta, health food stores Atlanta GA, moringa powder Atlanta, Shilajit West End ATL, superfood supplements Decatur GA, organic supplements Atlanta, natural health Georgia, Black wellness Atlanta',
      h1: 'Wellness Supplements & Health Stores in Atlanta',
      intro:
        'ATL is building generational wellness. From the West End to Old Fourth Ward, our ancient superfoods are fueling Atlanta\'s health-conscious community with the nutrients they deserve.',
    },
    localStores: [
      {
        name: 'Sevananda Natural Foods Market',
        address: '467 Moreland Ave NE, Atlanta, GA 30307',
        neighborhood: 'Little Five Points',
        pros: ['Worker-owned co-op', 'Affordable bulk herbs', 'Community roots'],
        recommended: true,
        description: 'Atlanta\'s beloved co-op. Best prices on bulk herbs, powders, and superfoods in the city.',
      },
      {
        name: 'Your Dekalb Farmers Market',
        address: '3000 E Ponce de Leon Ave, Decatur, GA 30030',
        neighborhood: 'Decatur',
        pros: ['Massive selection', 'Affordable prices', 'International ingredients'],
        recommended: true,
        description: 'Legendary market with an incredible international herbs and botanicals section.',
      },
      {
        name: 'Whole Foods Market',
        address: '650 Ponce De Leon Ave NE, Atlanta, GA 30308',
        neighborhood: 'Ponce City Market',
        pros: ['Premium quality', 'Convenient', 'Great supplements section'],
        cons: ['More expensive'],
        description: 'Convenient premium option in the vibrant Old Fourth Ward.',
      },
    ],
  },
  'houston': {
    slug: 'houston',
    name: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    latitude: 29.7604,
    longitude: -95.3698,
    population: '2.3M',
    wellnessDescription:
      'Houston\'s diverse population — blending Latin American, African, and Asian wellness traditions — makes it one of the richest cities for holistic health. The Third Ward and Midtown communities are leading the natural health renaissance.',
    neighborhoods: ['Midtown', 'Third Ward', 'EaDo', 'Montrose', 'The Heights', 'Greenway Plaza', 'Sugar Land'],
    seo: {
      title: 'Best Wellness Supplements in Houston, TX | Health Is Wealth',
      description:
        'Shop premium wellness supplements in Houston. Moringa, Shilajit, Chaga & Amla delivered to Third Ward, Midtown, Montrose, The Heights & all of the Houston metro area.',
      keywords:
        'wellness supplements Houston, health food stores Houston TX, moringa powder Houston, Shilajit Third Ward, superfood supplements Montrose Houston, organic supplements Houston, natural health Texas',
      h1: 'Wellness Supplements & Health Stores in Houston',
      intro:
        'Houston\'s diverse health traditions deserve the world\'s best superfoods. Our premium ancient herbs honor the Latin American, African, and Asian wellness wisdom that shapes this great city.',
    },
    localStores: [
      {
        name: 'Canino\'s Produce',
        address: '2520 Airline Dr, Houston, TX 77009',
        neighborhood: 'Northside',
        pros: ['Massive selection', 'Very affordable', 'Fresh herbs and plants'],
        recommended: true,
        description: 'Houston institution. Incredible variety of fresh herbs, botanicals, and bulk produce at unbeatable prices.',
      },
      {
        name: 'Whole Foods Market',
        address: '701 Waugh Dr, Houston, TX 77019',
        neighborhood: 'Montrose / River Oaks',
        pros: ['Premium quality', 'Great supplement selection', 'Organic options'],
        cons: ['Higher prices'],
        description: 'Best Whole Foods location in Houston for supplements and wellness products.',
      },
      {
        name: 'New Leaf Community Markets',
        address: '4002 Bissonnet St, Houston, TX 77005',
        neighborhood: 'West University',
        pros: ['Community-focused', 'Local products', 'Knowledgeable staff'],
        description: 'Independent neighborhood health food store with great staff expertise.',
      },
    ],
  },
  'chicago': {
    slug: 'chicago',
    name: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    latitude: 41.8781,
    longitude: -87.6298,
    population: '2.7M',
    wellnessDescription:
      'Chicago\'s South Side and West Side wellness communities are reshaping holistic health on the South Side. From Bronzeville herb apothecaries to Lincoln Park juice bars, Chi-Town is embracing plant-based healing.',
    neighborhoods: ['Bronzeville', 'Hyde Park', 'Pilsen', 'Lincoln Park', 'Wicker Park', 'Logan Square', 'Beverly'],
    seo: {
      title: 'Best Wellness Supplements in Chicago, IL | Health Is Wealth',
      description:
        'Premium wellness supplements delivered to Chicago. Moringa, Shilajit, Chaga & Amla shipped to Bronzeville, Hyde Park, Lincoln Park, Logan Square & all of the Chicago metro area.',
      keywords:
        'wellness supplements Chicago, health food stores Chicago IL, moringa powder Chicago, Shilajit South Side Chicago, superfood supplements Logan Square, organic supplements Chicago, natural health Illinois',
      h1: 'Wellness Supplements & Health Stores in Chicago',
      intro:
        'Chi-Town\'s wellness renaissance is real. From Bronzeville to Logan Square, Chicago\'s health-conscious community deserves the finest ancient superfoods — delivered to your door.',
    },
    localStores: [
      {
        name: 'Fruitful Yield',
        address: 'Multiple Chicago locations',
        neighborhood: 'Chicagoland',
        pros: ['Staff expertise', 'Affordable prices', 'Wide supplement range'],
        recommended: true,
        description: 'Chicago\'s go-to health food chain. Great knowledge base and competitive pricing.',
      },
      {
        name: 'Harvest Time Natural Foods',
        address: '3500 N Lincoln Ave, Chicago, IL 60657',
        neighborhood: 'North Center',
        pros: ['Affordable', 'Bulk herbs', 'Independent'],
        description: 'Independent health food store with a solid bulk herb selection.',
      },
      {
        name: 'Whole Foods Market',
        address: '1101 S Canal St, Chicago, IL 60607',
        neighborhood: 'South Loop',
        pros: ['Premium quality', 'Convenient', 'Wide selection'],
        cons: ['Higher prices'],
        description: 'Modern store in the South Loop with excellent wellness products.',
      },
    ],
  },
  'dallas': {
    slug: 'dallas',
    name: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    latitude: 32.7767,
    longitude: -96.797,
    population: '1.3M',
    wellnessDescription:
      'Dallas\'s booming wellness industry blends Texas-sized ambition with deep herbal traditions. From Oak Cliff\'s community markets to Uptown\'s boutique wellness studios, Big D is going green.',
    neighborhoods: ['Oak Cliff', 'Deep Ellum', 'Uptown', 'Oak Lawn', 'Bishop Arts', 'Lower Greenville', 'Preston Hollow'],
    seo: {
      title: 'Best Wellness Supplements in Dallas, TX | Health Is Wealth',
      description:
        'Shop premium wellness supplements in Dallas. Moringa, Shilajit, Chaga & Amla delivered to Oak Cliff, Deep Ellum, Uptown, Bishop Arts & all of the DFW metroplex.',
      keywords:
        'wellness supplements Dallas, health food stores Dallas TX, moringa powder Dallas, Shilajit Oak Cliff, superfood supplements Deep Ellum, organic supplements DFW, natural health Texas',
      h1: 'Wellness Supplements & Health Stores in Dallas',
      intro:
        'Big D thinks big about health. Our premium ancient superfoods fuel Dallas\'s ambitious wellness community — from Oak Cliff\'s conscious culture to Uptown\'s performance-driven lifestyle.',
    },
    localStores: [
      {
        name: 'Sprouts Farmers Market',
        address: 'Multiple Dallas locations',
        neighborhood: 'DFW Metroplex',
        pros: ['Affordable bulk section', 'Organic produce', 'Good supplement prices'],
        recommended: true,
        description: 'The best value for organic and natural foods in the DFW area. Great bulk herb section.',
      },
      {
        name: 'Whole Foods Market',
        address: '2218 Greenville Ave, Dallas, TX 75206',
        neighborhood: 'Lower Greenville',
        pros: ['Premium quality', 'Full supplement section', 'Prepared foods'],
        cons: ['Higher prices'],
        description: 'Dallas flagship Whole Foods with an excellent wellness and supplement section.',
      },
      {
        name: 'Tukka Market',
        address: '2727 Commerce St, Dallas, TX 75226',
        neighborhood: 'Deep Ellum',
        pros: ['African herbs and botanicals', 'Community-rooted', 'Unique selection'],
        description: 'Community market with African herbal traditions. Great for rare herbs and botanicals.',
      },
    ],
  },
  'phoenix': {
    slug: 'phoenix',
    name: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    latitude: 33.4484,
    longitude: -112.074,
    population: '1.6M',
    wellnessDescription:
      'Phoenix\'s desert wellness culture is unique — from indigenous plant medicine traditions to the booming biohacking scene in Scottsdale. The Valley of the Sun is a hotspot for natural healing.',
    neighborhoods: ['Tempe', 'Scottsdale', 'Mesa', 'Chandler', 'South Mountain', 'Ahwatukee', 'Central Phoenix'],
    seo: {
      title: 'Best Wellness Supplements in Phoenix, AZ | Health Is Wealth',
      description:
        'Premium wellness supplements delivered to Phoenix. Moringa, Shilajit, Chaga & Amla shipped to Scottsdale, Tempe, Mesa, Chandler & all of the Valley of the Sun.',
      keywords:
        'wellness supplements Phoenix, health food stores Phoenix AZ, moringa powder Scottsdale, Shilajit Phoenix, superfood supplements Tempe, organic supplements Valley of the Sun, natural health Arizona',
      h1: 'Wellness Supplements & Health Stores in Phoenix',
      intro:
        'The Valley of the Sun runs on ancient wisdom. Phoenix\'s thriving wellness scene deserves superfoods as powerful as the desert itself — and we deliver them right to your door.',
    },
    localStores: [
      {
        name: 'Sprouts Farmers Market',
        address: 'Multiple Phoenix locations',
        neighborhood: 'Valley of the Sun',
        pros: ['Best prices on bulk herbs', 'Local produce', 'Solid supplement section'],
        recommended: true,
        description: 'Phoenix-area staple for organic and natural groceries. Best value for supplements and herbs.',
      },
      {
        name: 'AJ\'s Fine Foods',
        address: '7141 E Lincoln Dr, Scottsdale, AZ 85253',
        neighborhood: 'Scottsdale',
        pros: ['Premium quality', 'Knowledgeable staff', 'Unique health products'],
        description: 'Arizona\'s upscale natural grocer. Great for hard-to-find superfoods and premium herbs.',
      },
      {
        name: 'Whole Foods Market',
        address: '5120 N Central Ave, Phoenix, AZ 85012',
        neighborhood: 'Midtown Phoenix',
        pros: ['Consistent quality', 'Full supplement section'],
        cons: ['Pricier'],
        description: 'Central Phoenix location with reliable health food and supplement selection.',
      },
    ],
  },
  'seattle': {
    slug: 'seattle',
    name: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    latitude: 47.6062,
    longitude: -122.3321,
    population: '750K',
    wellnessDescription:
      'Seattle\'s Pacific Northwest wellness culture is deeply rooted in nature — from Olympic Peninsula foraging traditions to Capitol Hill\'s innovative health food scene. Rain City runs on superfoods.',
    neighborhoods: ['Capitol Hill', 'Fremont', 'Ballard', 'Columbia City', 'Central District', 'Madison Valley', 'Beacon Hill'],
    seo: {
      title: 'Best Wellness Supplements in Seattle, WA | Health Is Wealth',
      description:
        'Shop premium wellness supplements in Seattle. Moringa, Shilajit, Chaga & Amla delivered to Capitol Hill, Fremont, Ballard, Columbia City & all of the Seattle metro area.',
      keywords:
        'wellness supplements Seattle, health food stores Seattle WA, moringa powder Seattle, Shilajit Capitol Hill, superfood supplements Fremont Seattle, organic supplements Pacific Northwest, natural health Washington state',
      h1: 'Wellness Supplements & Health Stores in Seattle',
      intro:
        'Seattle\'s nature-first mindset meets ancient superfood science. From Capitol Hill to Columbia City, our premium herbs and adaptogens are made for the Pacific Northwest wellness lifestyle.',
    },
    localStores: [
      {
        name: 'PCC Community Markets',
        address: 'Multiple Seattle locations',
        neighborhood: 'Seattle Neighborhoods',
        pros: ['Member-owned co-op', 'Local sourcing', 'Excellent herb selection'],
        recommended: true,
        description: 'Seattle\'s beloved co-op with strong community roots. Best for local and organic herbs and superfoods.',
      },
      {
        name: 'Pharmaca Integrative Pharmacy',
        address: '2901 NE Blakeley St, Seattle, WA 98105',
        neighborhood: 'University District',
        pros: ['Pharmacist consultations', 'Premium supplements', 'Science-backed recommendations'],
        description: 'Integrative pharmacy model — pharmacists who know their herbs. Great for expert supplement guidance.',
      },
      {
        name: 'Whole Foods Market',
        address: '2210 Westlake Ave, Seattle, WA 98121',
        neighborhood: 'South Lake Union',
        pros: ['Excellent selection', 'Central location'],
        cons: ['Higher prices'],
        description: 'Flagship Seattle Whole Foods near Amazon HQ. Comprehensive supplement selection.',
      },
    ],
  },
  'san-francisco': {
    slug: 'san-francisco',
    name: 'San Francisco',
    state: 'California',
    stateCode: 'CA',
    latitude: 37.7749,
    longitude: -122.4194,
    population: '870K',
    wellnessDescription:
      'San Francisco pioneered the natural foods movement — from the Haight\'s herb shops to the Mission\'s community gardens. The Bay Area has always been ahead of the wellness curve, and locals demand nothing but the best.',
    neighborhoods: ['Mission District', 'Haight-Ashbury', 'Castro', 'Hayes Valley', 'Fillmore', 'SoMa', 'Tenderloin'],
    seo: {
      title: 'Best Wellness Supplements in San Francisco, CA | Health Is Wealth',
      description:
        'Premium wellness supplements delivered to San Francisco. Moringa, Shilajit, Chaga & Amla shipped to the Mission, Haight-Ashbury, Castro, Hayes Valley & all of the Bay Area.',
      keywords:
        'wellness supplements San Francisco, health food stores SF CA, moringa powder San Francisco, Shilajit Mission District, superfood supplements Haight-Ashbury, organic supplements Bay Area, natural health California',
      h1: 'Wellness Supplements & Health Stores in San Francisco',
      intro:
        'The Bay Area invented the natural foods movement. Our premium ancient superfoods are the next evolution — bringing the most potent herbs on Earth straight to your SF door.',
    },
    localStores: [
      {
        name: 'Rainbow Grocery Cooperative',
        address: '1745 Folsom St, San Francisco, CA 94103',
        neighborhood: 'SoMa / Mission',
        pros: ['Worker-owned co-op', 'Massive bulk section', 'Affordable', 'Political values-aligned'],
        recommended: true,
        description: 'SF legend. The bulk herb and supplement section is unmatched. Worker-owned with deep community roots.',
      },
      {
        name: 'Haight Street Market',
        address: '1530 Haight St, San Francisco, CA 94117',
        neighborhood: 'Haight-Ashbury',
        pros: ['Herbs and botanicals', 'Neighborhood institution', 'Affordable bulk'],
        description: 'Historic market in the heart of SF\'s wellness neighborhood. Great for bulk herbs and local products.',
      },
      {
        name: 'Whole Foods Market',
        address: '1765 California St, San Francisco, CA 94109',
        neighborhood: 'Nob Hill / Russian Hill',
        pros: ['Premium quality', 'Central location', 'Full supplement range'],
        cons: ['Expensive'],
        description: 'Convenient Nob Hill location with one of SF\'s best supplement selections.',
      },
    ],
  },
};

export const ALL_CITY_SLUGS = Object.keys(CITY_DATA);

export function getCityData(slug: string): CityData | null {
  return CITY_DATA[slug] || null;
}

export function getNearestCitySlug(lat: number, lng: number): string {
  let nearest = 'los-angeles';
  let minDist = Infinity;
  for (const [slug, city] of Object.entries(CITY_DATA)) {
    const dist = Math.sqrt(
      Math.pow(lat - city.latitude, 2) + Math.pow(lng - city.longitude, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = slug;
    }
  }
  return nearest;
}
