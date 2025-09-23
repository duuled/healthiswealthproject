import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Star, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  CheckCircle,
  Award,
  Truck
} from 'lucide-react';
import chagaccinoImage from '@/assets/chagaccino-product.jpg';
import mariosMushroomImage from '@/assets/marios-mushroom-power.jpg';
import amlaPowderImage from '@/assets/amla-powder-vitamin-c.jpg';
import moringaLeafImage from '@/assets/moringa-leaf-powder.jpg';
import kuliKuliMoringaImage from '@/assets/kuli-kuli-moringa.jpg';
import berberineComplexImage from '@/assets/berberine-phytosome-complex.jpg';
import usWellnessMoringaImage from '@/assets/us-wellness-moringa.jpg';
import zazzeeAstragalusImage from '@/assets/zazzee-astragalus-extract.jpg';
import nutricostAstragalusImage from '@/assets/nutricost-astragalus-powder.jpg';
import elanenAstragalusImage from '@/assets/elanen-astragalus-tea.jpg';
import amazingIndiaNeemImage from '@/assets/amazing-india-neem-powder.jpg';
import vitamaticNeemImage from '@/assets/vitamatic-neem-powder.jpg';
import pureShilajitImage from '@/assets/pure-shilajit-supplement.jpg';
import seaMossGummiesImage from '@/assets/sea-moss-gummies.jpg';
import magnesiumSupplementImage from '@/assets/magnesium-supplement.jpg';
import berberineSupplementImage from '@/assets/berberine-supplement.jpg';
import jointSupportImage from '@/assets/joint-support-supplement.jpg';
import glycoOptimizerImage from '@/assets/glyco-optimizer.jpg';

export const Supplements = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const supplements = [
    {
      id: 1,
      name: 'Morning Coffee Mushroom Powder',
      price: '$34.99',
      originalPrice: '$39.99',
      benefits: ['Natural energy boost', 'Immune system support', 'Adaptogenic properties', 'Zero calorie formula'],
      usage: 'Mix 1 scoop with hot water or your favorite beverage daily',
      category: 'ENERGY',
      description: 'Premium mushroom coffee blend with chaga and adaptogens for natural energy and immune support. Vegan, keto-friendly, zero calorie formula.',
      detailedDescription: 'Experience the perfect fusion of premium coffee and powerful chaga mushrooms in this innovative adaptogenic blend. Each serving delivers sustained natural energy without the jitters, while supporting your immune system with wild-foraged chaga mushrooms and carefully selected adaptogens. Perfect for busy professionals seeking clean energy and wellness benefits.',
      shopLink: 'https://www.amazon.com/dp/B0B75XX6L9/ref=cm_sw_r_as_gl_api_gl_i_DZZBSP0NRP9D05DCW1FH?linkCode=ml1&tag=keatontyler-20&linkId=8a29ed8dbb90fa16f9aaae155fb8ec70&th=1',
      image: chagaccinoImage,
      rating: 4.7,
      reviews: 1589,
      features: [
        '30 servings per container',
        'Wild-foraged chaga mushrooms',
        'Adaptogenic herb blend',
        'Zero calorie formula',
        'Vegan & keto-friendly',
        'No artificial additives'
      ],
      scientificBacking: 'Chaga mushrooms have been studied for their immune-supporting properties and antioxidant content. Adaptogens help the body manage stress and maintain energy balance.',
      bestseller: true,
      fastShipping: true
    },
    {
      id: 2,
      name: "Mario's Mushroom Power",
      price: '$28.00',
      originalPrice: '$32.99',
      benefits: ['Ultimate immune support', 'Natural wellness boost', 'Cellular health enhancement', 'Vital energy restoration'],
      usage: 'Mix 1 scoop daily with water, smoothie, or your favorite beverage',
      category: 'IMMUNITY',
      description: 'Premium mushroom powder blend featuring powerful immune-supporting fungi for comprehensive wellness and vitality enhancement.',
      detailedDescription: "Mario's Mushroom Power combines the most potent medicinal mushrooms in one revolutionary formula. This expertly crafted blend features reishi, cordyceps, lion's mane, and shiitake mushrooms to create a powerful immune defense system. Each serving delivers concentrated nutrients that support your body's natural healing processes, enhance cellular regeneration, and provide comprehensive wellness support for optimal health and vitality.",
      shopLink: 'https://amzn.to/3W2VwLk',
      image: mariosMushroomImage,
      rating: 5.0,
      reviews: 2156,
      features: [
        'Multi-mushroom complex',
        'Immune system optimization',
        'Organic & pure extraction',
        '30 day supply',
        'Third-party tested',
        'Premium quality guarantee'
      ],
      scientificBacking: 'Medicinal mushrooms have been extensively studied for their immune-modulating compounds including beta-glucans and polysaccharides that support natural defense mechanisms and overall wellness.',
      bestseller: true,
      fastShipping: true
    },
    {
      id: 3,
      name: 'Berberine Phytosome Complex',
      price: '$39.99',
      originalPrice: '$49.99',
      benefits: ['Blood sugar support', 'Metabolic health', 'Cardiovascular wellness', 'Enhanced bioavailability'],
      usage: 'Take 1-2 capsules daily with meals',
      category: 'METABOLIC',
      description: 'Advanced berberine supplement with phytosome technology for superior absorption and maximum metabolic benefits.',
      detailedDescription: 'Our Berberine Phytosome Complex utilizes cutting-edge phytosome technology to enhance absorption by up to 10 times compared to regular berberine. This powerful compound supports healthy blood sugar levels, cardiovascular function, and metabolic wellness. Perfect for individuals seeking natural support for their metabolic health journey.',
      shopLink: 'https://amzn.to/4gDJKk1',
      image: berberineComplexImage,
      rating: 4.8,
      reviews: 1247,
      features: [
        'Phytosome enhanced absorption',
        '500mg per capsule',
        '90 vegetarian capsules',
        'Third-party tested',
        'GMP certified facility',
        'No artificial additives'
      ],
      scientificBacking: 'Berberine has been extensively studied for its metabolic benefits, with clinical research showing support for healthy blood sugar levels and cardiovascular function.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 7,
      name: 'Zazzee Extra Strength Astragalus Root Extract',
      price: '$21.97',
      originalPrice: '$25.99',
      benefits: ['Immune system support', 'Energy boost', 'Cellular protection', 'Stress adaptation'],
      usage: 'Take 1 capsule daily with water or as directed by healthcare professional',
      category: 'IMMUNITY',
      description: 'Premium 20:1 astragalus extract with 5000mg strength and 70% polysaccharides for maximum immune support and vitality.',
      detailedDescription: 'Zazzee\'s Extra Strength Astragalus Root Extract delivers concentrated immune support with standardized 20:1 extract containing 70% polysaccharides. This traditional Chinese herb has been used for centuries to support immune function, energy levels, and overall vitality. Each vegan capsule provides 5000mg equivalent strength for maximum therapeutic benefits.',
      shopLink: 'https://amzn.to/4msoS0J',
      image: zazzeeAstragalusImage,
      rating: 4.6,
      reviews: 964,
      features: [
        '20:1 concentrated extract',
        '5000mg equivalent strength',
        '70% polysaccharides',
        '180 vegan capsules',
        '6 month supply',
        'Standardized extract'
      ],
      scientificBacking: 'Astragalus has been extensively studied for its immune-modulating properties and adaptogenic benefits, supporting the body\'s natural defense mechanisms.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 8,
      name: 'Nutricost Organic Astragalus Root Powder',
      price: '$19.95',
      originalPrice: '$24.95',
      benefits: ['Natural immune support', 'Traditional wellness', 'Antioxidant properties', 'Adaptogenic effects'],
      usage: 'Mix 1/2 teaspoon in smoothies, tea, or water daily',
      category: 'IMMUNITY',
      description: 'Pure organic astragalus root powder - 1 pound of traditional Chinese herb for immune support and overall wellness.',
      detailedDescription: 'Nutricost\'s Organic Astragalus Root Powder provides pure, high-quality astragalus membranaceus in its natural form. This USDA organic powder retains all the beneficial compounds found in the whole root, offering traditional immune support and adaptogenic benefits. Perfect for those who prefer natural powder supplements over capsules.',
      shopLink: 'https://amzn.to/4gDNty1',
      image: nutricostAstragalusImage,
      rating: 4.6,
      reviews: 445,
      features: [
        'USDA organic certified',
        '1 pound bulk powder',
        'Gluten-free & Non-GMO',
        'Vegetarian friendly',
        'No artificial additives',
        'Third-party tested'
      ],
      scientificBacking: 'Astragalus root has been used in traditional Chinese medicine for over 2000 years and modern research supports its immune-supporting and adaptogenic properties.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 9,
      name: 'Organic Astragalus Root Tea - Huang Qi',
      price: '$17.97',
      originalPrice: '$21.99',
      benefits: ['Traditional herbal tea', 'Immune wellness', 'Natural energy', 'Stress support'],
      usage: 'Steep 1 teaspoon in hot water for 5-10 minutes, enjoy 1-2 cups daily',
      category: 'IMMUNITY',
      description: 'USDA certified organic astragalus root tea - traditional Huang Qi dried root, cut & sifted for optimal brewing.',
      detailedDescription: 'Elanen Naturals brings you authentic organic astragalus root (Huang Qi) in traditional cut & sifted form, perfect for brewing therapeutic teas. This premium quality astragalus membranaceus is USDA certified organic and carefully sourced from its native mountainous regions. Known as the "yellow leader" in Chinese herbalism, this ancient herb supports immune function and overall vitality.',
      shopLink: 'https://amzn.to/46mnTdK',
      image: elanenAstragalusImage,
      rating: 4.6,
      reviews: 69,
      features: [
        'USDA certified organic',
        '4 oz (113g) bulk tea',
        'Cut & sifted preparation',
        'Traditional Huang Qi',
        'Resealable packaging',
        'Family-owned company'
      ],
      scientificBacking: 'Astragalus has been documented in Chinese medical texts for over 2000 years and is recognized for its immune-supporting and adaptogenic properties.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 10,
      name: 'Amazing India Organic Neem Powder',
      price: '$14.99',
      originalPrice: '$18.99',
      benefits: ['Blood purification', 'Healthy immunity', 'Skin wellness', 'Natural detox support'],
      usage: 'Mix 1/2 teaspoon in water, juice, or smoothies daily on empty stomach',
      category: 'DIGESTIVE',
      description: 'USDA certified organic neem powder - traditional Ayurvedic herb for blood purification, immunity, and skin health.',
      detailedDescription: 'Amazing India\'s Organic Neem Powder is sourced from the highest quality neem leaves (Azadirachta indica) and processed to retain maximum potency. This traditional Ayurvedic herb has been used for centuries for its purifying properties, supporting healthy immunity, clear skin, and natural detoxification processes.',
      shopLink: 'https://amzn.to/483dlkZ',
      image: amazingIndiaNeemImage,
      rating: 4.2,
      reviews: 237,
      features: [
        'USDA certified organic',
        '16oz bulk powder',
        'Non-GMO verified',
        'Pure neem leaves',
        'Traditional Ayurvedic herb',
        'Quality tested'
      ],
      scientificBacking: 'Neem has been extensively studied for its antimicrobial, anti-inflammatory, and immune-supporting properties, making it a valuable addition to wellness routines.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 11,
      name: 'Vitamatic Organic Neem Leaf Powder',
      price: '$9.99',
      originalPrice: '$12.99',
      benefits: ['Skin support', 'Immune wellness', 'Detox support', 'Traditional Ayurvedic benefits'],
      usage: 'Mix 1/4 to 1/2 teaspoon in water or juice daily, preferably on empty stomach',
      category: 'DIGESTIVE',
      description: 'Amazon\'s Choice certified USDA organic neem leaf powder - 1 pound of pure Azadirachta indica for traditional wellness support.',
      detailedDescription: 'Vitamatic\'s Certified Organic Neem Leaf Powder delivers the traditional benefits of this revered Ayurvedic herb in convenient powder form. Made from 100% pure Azadirachta indica leaves, this Amazon\'s Choice product supports skin health, immune function, and natural detoxification processes. An excellent value for those seeking traditional herbal wellness support.',
      shopLink: 'https://amzn.to/4gHvbMy',
      image: vitamaticNeemImage,
      rating: 4.5,
      reviews: 868,
      features: [
        'Amazon\'s Choice product',
        'USDA certified organic',
        '1 lb (16oz) bulk size',
        '100% pure neem leaves',
        'Traditional Ayurvedic herb',
        'Premium quality'
      ],
      scientificBacking: 'Neem has been used in Ayurvedic medicine for over 4000 years and modern research confirms its antimicrobial, anti-inflammatory, and skin-supporting properties.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 12,
      name: 'Pure Shilajit Complex - Premium Grade',
      price: '$32.99',
      originalPrice: '$39.99',
      benefits: ['Natural energy boost', 'Cognitive support', 'Mineral-rich formula', 'Adaptogenic properties'],
      usage: 'Take 1-2 capsules daily with water, preferably with meals',
      category: 'ENERGY',
      description: 'Authentic Himalayan shilajit extract with over 85 trace minerals and fulvic acid for natural energy and vitality.',
      detailedDescription: 'Sourced from the pristine Himalayan mountains, this premium shilajit complex contains naturally occurring fulvic acid and over 85 essential trace minerals. This ancient substance has been revered in Ayurvedic medicine for centuries for its ability to enhance energy, support cognitive function, and promote overall vitality.',
      shopLink: 'https://amzn.to/4msyIzp',
      image: pureShilajitImage,
      rating: 4.4,
      reviews: 892,
      features: [
        'Authentic Himalayan source',
        '85+ trace minerals',
        'High fulvic acid content',
        '60 vegetarian capsules',
        'Third-party tested',
        'Traditional Ayurvedic formula'
      ],
      scientificBacking: 'Shilajit has been studied for its potential cognitive and energy-supporting benefits, with research showing its rich mineral content and bioactive compounds.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 13,
      name: 'Black Girl Vitamins Sea Moss Gummies',
      price: '$26.99',
      originalPrice: '$31.99',
      benefits: ['92 essential minerals', 'Thyroid support', 'Digestive wellness', 'Natural energy boost'],
      usage: 'Take 2 gummies daily, preferably with meals',
      category: 'IMMUNITY',
      description: 'Delicious sea moss gummies packed with 92 essential minerals for comprehensive wellness support and natural vitality.',
      detailedDescription: 'These premium sea moss gummies from Black Girl Vitamins deliver the power of wildcrafted Irish sea moss in a convenient, tasty format. Rich in iodine, potassium, and calcium, these gummies support thyroid function, digestive health, and provide natural energy throughout the day.',
      shopLink: 'https://amzn.to/4njtDuM',
      image: seaMossGummiesImage,
      rating: 4.3,
      reviews: 1567,
      features: [
        'Wildcrafted Irish sea moss',
        '92 essential minerals',
        'Delicious berry flavor',
        '60 gummies per bottle',
        'Vegan & gluten-free',
        'Women-owned business'
      ],
      scientificBacking: 'Sea moss is naturally rich in iodine and essential minerals that support thyroid function and overall metabolic health.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 14,
      name: 'BiOptimizers Magnesium Breakthrough',
      price: '$49.95',
      originalPrice: '$59.99',
      benefits: ['7 forms of magnesium', 'Better sleep quality', 'Muscle recovery', 'Stress reduction'],
      usage: 'Take 2-4 capsules before bed or as directed by healthcare professional',
      category: 'IMMUNITY',
      description: 'Complete magnesium complex featuring 7 different forms of magnesium for optimal absorption and comprehensive wellness support.',
      detailedDescription: 'BiOptimizers Magnesium Breakthrough is the only supplement that contains all 7 essential forms of magnesium in one formula. This comprehensive blend supports better sleep, muscle recovery, stress reduction, and overall cellular function. Each form of magnesium targets different body systems for maximum effectiveness.',
      shopLink: 'https://amzn.to/46wlaNp',
      image: magnesiumSupplementImage,
      rating: 4.6,
      reviews: 2134,
      features: [
        '7 forms of magnesium',
        'Maximum bioavailability',
        '120 vegetarian capsules',
        'No synthetic additives',
        'Third-party tested',
        'Science-backed formula'
      ],
      scientificBacking: 'Magnesium is essential for over 300 enzymatic reactions in the body and supports cardiovascular health, muscle function, and sleep quality.',
      bestseller: true,
      fastShipping: true
    },
    {
      id: 15,
      name: 'Berberine Phytosome with Berbevis',
      price: '$44.99',
      originalPrice: '$52.99',
      benefits: ['Enhanced absorption', 'Metabolic support', 'Blood sugar balance', 'Cardiovascular health'],
      usage: 'Take 1 capsule twice daily with meals',
      category: 'METABOLIC',
      description: 'Advanced berberine formula with Berbevis phytosome technology for 10x better absorption than standard berberine.',
      detailedDescription: 'This premium berberine supplement features Berbevis, a patented phytosome complex that enhances absorption by up to 10 times compared to regular berberine. This advanced formula supports healthy metabolism, blood sugar balance, and cardiovascular wellness with superior bioavailability.',
      shopLink: 'https://amzn.to/3Vx6wAw',
      image: berberineSupplementImage,
      rating: 4.7,
      reviews: 845,
      features: [
        'Berbevis phytosome technology',
        '10x enhanced absorption',
        '60 vegetarian capsules',
        'Clinically studied',
        'GMP certified',
        'No artificial fillers'
      ],
      scientificBacking: 'Berberine with phytosome technology has been clinically shown to have significantly better bioavailability and effectiveness for metabolic support.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 16,
      name: 'OptiWize Joint Support Complex',
      price: '$38.95',
      originalPrice: '$45.99',
      benefits: ['Joint mobility', 'Cartilage support', 'Anti-inflammatory', 'Pain relief'],
      usage: 'Take 2 capsules daily with food',
      category: 'IMMUNITY',
      description: 'Comprehensive joint support formula with glucosamine, chondroitin, and MSM for optimal joint health and mobility.',
      detailedDescription: 'OptiWize Joint Support Complex combines the most effective joint-supporting ingredients including glucosamine sulfate, chondroitin sulfate, MSM, and turmeric extract. This powerful formula supports cartilage health, reduces inflammation, and promotes optimal joint mobility and comfort.',
      shopLink: 'https://amzn.to/3W2TLxJ',
      image: jointSupportImage,
      rating: 4.4,
      reviews: 1223,
      features: [
        'Glucosamine & chondroitin',
        'MSM for inflammation',
        'Turmeric extract added',
        '90 capsules per bottle',
        'Easy to swallow',
        'Third-party tested'
      ],
      scientificBacking: 'Glucosamine and chondroitin have been extensively studied for their ability to support joint health and cartilage maintenance.',
      bestseller: false,
      fastShipping: true
    },
    {
      id: 17,
      name: 'Glyco Optimizer Blood Sugar Support',
      price: '$35.99',
      originalPrice: '$42.99',
      benefits: ['Blood sugar balance', 'Insulin sensitivity', 'Glucose metabolism', 'Energy stability'],
      usage: 'Take 1-2 capsules with meals, up to 3 times daily',
      category: 'METABOLIC',
      description: 'Advanced glucose support formula with chromium, alpha lipoic acid, and cinnamon extract for healthy blood sugar management.',
      detailedDescription: 'Glyco Optimizer combines scientifically-backed ingredients including chromium picolinate, alpha lipoic acid, bitter melon extract, and Ceylon cinnamon to support healthy glucose metabolism and insulin sensitivity. This comprehensive formula helps maintain stable energy levels throughout the day.',
      shopLink: 'https://amzn.to/426YUbG',
      image: glycoOptimizerImage,
      rating: 4.5,
      reviews: 678,
      features: [
        'Chromium picolinate',
        'Alpha lipoic acid',
        'Ceylon cinnamon extract',
        '120 vegetarian capsules',
        'No artificial additives',
        'Clinically studied ingredients'
      ],
      scientificBacking: 'The ingredients in this formula have been clinically studied for their ability to support healthy glucose metabolism and insulin function.',
      bestseller: false,
      fastShipping: true
    }
  ];

  // Power of 5 - Elite Amazon Products
  const powerOf5Products = [
    {
      id: 'p1',
      name: 'Organic Amla Powder - Vitamin C Powerhouse',
      price: '$13.99',
      originalPrice: '$15.99',
      benefits: ['4x more Vitamin C than oranges', 'Natural antioxidant boost', 'Hair & skin health', 'Iron absorption support'],
      usage: 'Add 1 teaspoon to smoothies, juices, or water daily',
      category: 'IMMUNITY',
      description: 'Pure, lab-tested organic Amla powder from India - the ultimate natural source of Vitamin C and antioxidants.',
      detailedDescription: 'This premium organic Amla powder contains 4 times more Vitamin C than oranges and has been used for centuries in Ayurvedic medicine. Rich in iron, calcium, and phosphorus, this superfood supports immune function, enhances iron absorption, and promotes healthy hair and skin. Perfect for those seeking a natural, potent source of Vitamin C.',
      shopLink: 'https://amzn.to/42atVvr',
      image: amlaPowderImage,
      rating: 4.5,
      reviews: 349,
      features: [
        'Lab tested for purity',
        'Gluten-free & Non-GMO',
        '1.25 LB bulk bag',
        '100% raw & natural',
        'From sustainable farms',
        'USDA organic certified'
      ],
      scientificBacking: 'Amla has been scientifically proven to be one of the richest natural sources of Vitamin C and contains powerful antioxidants that support immune system function.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p2',
      name: 'Micro Ingredients Organic Moringa Powder',
      price: '$29.99',
      originalPrice: '$34.99',
      benefits: ['92 essential nutrients', 'Natural energy boost', 'Immune system support', 'Anti-inflammatory properties'],
      usage: 'Mix 1 tablespoon in smoothies, tea, or water daily',
      category: 'ENERGY',
      description: '2-pound organic moringa leaf powder packed with vitamins, minerals, and antioxidants for comprehensive wellness support.',
      detailedDescription: 'This premium organic moringa powder from Micro Ingredients contains 92 essential nutrients including protein, calcium, iron, and fiber. Known as the "miracle tree," moringa provides natural energy, supports immune function, and offers powerful anti-inflammatory benefits. Perfect for adding nutritional density to your daily routine.',
      shopLink: 'https://amzn.to/4nPp5w4',
      image: moringaLeafImage,
      rating: 4.4,
      reviews: 4086,
      features: [
        'USDA organic certified',
        '2 pounds bulk size',
        'Rich in antioxidants',
        'Vegan & gluten-free',
        'Third-party tested',
        'Sustainability certified'
      ],
      scientificBacking: 'Moringa has been extensively studied for its nutritional density and anti-inflammatory compounds, making it one of the most nutrient-dense plants on Earth.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p3',
      name: 'Kuli Kuli Moringa Superfood Powder',
      price: '$18.61',
      originalPrice: '$22.99',
      benefits: ['More antioxidants than kale', 'Complete protein source', 'Natural detox support', 'Sustained energy'],
      usage: 'Add to smoothies, yogurt, or mix with water daily',
      category: 'ENERGY',
      description: 'Premium moringa leaf powder that packs more nutrition than kale, turmeric, and matcha combined.',
      detailedDescription: 'Kuli Kuli sources the highest quality moringa leaves to create this nutrient-dense superfood powder. With more antioxidants than kale and more protein than most plants, this moringa powder provides sustained energy and comprehensive nutritional support. Each serving delivers essential amino acids, vitamins, and minerals.',
      shopLink: 'https://www.amazon.com/dp/B07FYP5NXK/ref=cm_sw_r_as_gl_api_gl_i_BMBCMYMXFJ3PHK2YFJBD?linkCode=ml1&tag=keatontyler-20&linkId=80ebe2a13df56716bf749ab07b79e230',
      image: kuliKuliMoringaImage,
      rating: 4.3,
      reviews: 1420,
      features: [
        '100% pure USDA certified',
        'Non-GMO moringa powder',
        '10.6 oz single pack',
        'Complete amino acid profile',
        'Sustainably sourced',
        'Women-owned business'
      ],
      scientificBacking: 'Clinical studies show moringa contains more anti-inflammatory power, antioxidants, protein, calcium, iron, and fiber compared to kale, turmeric, and matcha.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p4',
      name: 'U.S. Wellness Naturals Moringa Powder',
      price: '$21.99',
      originalPrice: '$26.99',
      benefits: ['100% pure leaf powder', 'Raw from India', 'Resealable packaging', 'Versatile superfood'],
      usage: 'Perfect for smoothies, drinks, tea, and recipes',
      category: 'ENERGY',
      description: '1 LB certified organic moringa powder with no stems - just pure, potent leaf nutrition in a convenient resealable bag.',
      detailedDescription: 'U.S. Wellness Naturals delivers premium moringa powder made exclusively from leaves (no stems) for maximum potency. This 100% certified organic powder is raw-processed in India to preserve all nutrients. The convenient 1-pound resealable bag makes it perfect for daily use in smoothies, beverages, and recipes.',
      shopLink: 'https://amzn.to/47XJA4Y',
      image: usWellnessMoringaImage,
      rating: 4.4,
      reviews: 4092,
      features: [
        '100% certified organic',
        'Pure leaf NO stems',
        '1 LB (16oz) size',
        'Raw from India',
        'Resealable bag',
        'Amazon\'s Choice'
      ],
      scientificBacking: 'Moringa leaves contain the highest concentration of nutrients, and this stem-free powder ensures maximum bioavailability of vitamins, minerals, and antioxidants.',
      amazonVerified: true,
      fastShipping: true
    },
    {
      id: 'p5',
      name: 'Premium Manuka Honey',
      price: '$24.99',
      originalPrice: '$29.99',
      benefits: ['Immunity boost', 'Natural energy', 'Antibacterial properties', 'Digestive support'],
      usage: 'Add 1-2 teaspoons to morning tea, smoothies, or take directly',
      category: 'IMMUNITY',
      description: 'Raw, unprocessed Manuka honey with high MGO content for maximum therapeutic benefits and immune system support.',
      detailedDescription: 'Sourced from pristine New Zealand landscapes, this premium Manuka honey contains active compounds that provide natural antibacterial properties and immune system support. Perfect for busy West LA professionals seeking natural wellness solutions.',
      shopLink: 'https://amazon.com/dp/B01K0PKS5M',
      image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8da?w=600',
      rating: 4.6,
      reviews: 892,
      features: [
        'MGO 550+ certified',
        'Raw & unprocessed',
        'Single-origin New Zealand',
        'Glass jar packaging',
        'Traceable source',
        '12oz premium size'
      ],
      scientificBacking: 'Manuka honey has been studied for its unique antibacterial properties and potential immune system benefits.',
      amazonVerified: true,
      fastShipping: true
    }
  ];

  const categories = ['ALL', 'METABOLIC', 'IMMUNITY', 'ENERGY', 'DIGESTIVE'];

  const filteredSupplements = selectedCategory === 'ALL' 
    ? supplements 
    : supplements.filter(supplement => supplement.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our carefully curated collection of premium natural supplements, scientifically backed and quality tested for optimal wellness results from Amazon.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Quality Guaranteed
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Truck className="w-4 h-4 mr-2" />
                Amazon Prime Shipping
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Third-Party Tested
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* The Power of 5 Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">THE POWER OF 5</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              The 5 most powerful health supplements that will transform your wellness journey. 
              Carefully selected from Amazon's top-rated products for maximum potency and results.
            </p>
            <div className="flex justify-center">
              <Badge className="px-6 py-3 text-lg bg-primary/20 text-primary border-primary">
                ⭐ Amazon's Most Trusted Wellness Products ⭐
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {powerOf5Products.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary relative">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground font-bold">
                    #{index + 1} POWER PICK
                  </Badge>
                </div>
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={`${product.name} premium supplement from Amazon`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {product.amazonVerified && (
                      <Badge variant="secondary" className="bg-orange-500 text-white">
                        Amazon Verified
                      </Badge>
                    )}
                    {product.fastShipping && (
                      <Badge variant="secondary">
                        <Truck className="w-3 h-3 mr-1" />
                        Prime
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {product.detailedDescription}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center text-sm">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {product.benefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-center text-xs">
                          <CheckCircle className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full h-10 text-sm font-semibold bg-primary hover:bg-primary/90">
                    <a href={product.shopLink} target="_blank" rel="noopener noreferrer">
                      Shop on Amazon - {product.price}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-2">
                    ✓ Amazon Prime shipping • ✓ 30-day returns
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Premium Collection</h2>
            <p className="text-muted-foreground">Expertly curated supplements for your wellness journey</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="font-semibold"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredSupplements.map((supplement) => (
              <Card key={supplement.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary">
                <div className="relative">
                  <img 
                    src={supplement.image} 
                    alt={`${supplement.name} premium supplement bottle from Amazon`}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {supplement.bestseller && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                    {supplement.fastShipping && (
                      <Badge variant="secondary">
                        <Truck className="w-3 h-3 mr-1" />
                        Amazon Prime
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {supplement.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{supplement.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(supplement.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {supplement.rating} ({supplement.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{supplement.price}</div>
                      {supplement.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">{supplement.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {supplement.detailedDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {supplement.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary" />
                      Premium Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {supplement.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-primary" />
                      Usage Instructions
                    </h4>
                    <p className="text-sm text-muted-foreground">{supplement.usage}</p>
                  </div>

                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Leaf className="w-4 h-4 mr-2 text-primary" />
                      Scientific Backing
                    </h4>
                    <p className="text-sm text-muted-foreground">{supplement.scientificBacking}</p>
                  </div>

                  <Button asChild className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90">
                    <a href={supplement.shopLink} target="_blank" rel="noopener noreferrer">
                      Shop on Amazon - {supplement.price}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ✓ Amazon Prime shipping • ✓ 30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose Our Amazon Supplements?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Amazon verified sellers with third-party testing for purity and potency</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Natural & Pure</h3>
              <p className="text-muted-foreground">Sourced from premium natural ingredients with organic certifications</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Science-Backed</h3>
              <p className="text-muted-foreground">Formulated based on clinical research with proven health benefits</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};