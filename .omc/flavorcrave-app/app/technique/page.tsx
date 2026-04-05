import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cooking Techniques That Actually Matter | The Flavor Crave',
  description:
    'Most recipes give you the WHAT. We give you the WHY. Master the roux, Maillard reaction, blooming spices, layering salt, deglazing, and braising — and every dish you make gets better.',
  openGraph: {
    title: 'Cooking Techniques That Actually Matter | The Flavor Crave',
    description:
      'Master the fundamental techniques behind great soul food, Caribbean, and West African cooking.',
    url: 'https://theflavorcrave.com/technique',
  },
};

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface Technique {
  name: string;
  explanation: string;
  applies_to: string[];
  difficulty: Difficulty;
}

const TECHNIQUES: Technique[] = [
  {
    name: 'The Roux',
    explanation:
      'A roux is equal parts fat and flour cooked together to eliminate the raw starch taste and build a thickening base for sauces, gravies, and gumbo. The longer you cook it, the darker and more nutty it becomes — a blonde roux thickens without flavor, a dark roux (cooked 30+ minutes to deep chocolate brown) adds a complex, almost smoky depth that is the backbone of Creole cooking. Never rush a dark roux: it must be stirred constantly and watched like a hawk, because burnt roux starts over.',
    applies_to: ['Smothered Oxtail Gravy', 'Gumbo', 'Smothered Pork Chops'],
    difficulty: 'Intermediate',
  },
  {
    name: 'Blooming Spices',
    explanation:
      'Fat carries fat-soluble flavor compounds, and most of the aromatic molecules in dried spices are fat-soluble — which means dropping raw spices into a water-based dish wastes most of their flavor. Blooming means cooking your spices in hot oil or butter for 30–60 seconds before any liquid enters the pot. You will hear them sizzle and smell the difference immediately: the kitchen fills with a deeper, more rounded aroma that no amount of spice added later can replicate.',
    applies_to: ['Nigerian Jollof Rice', 'Jerk Marinade', 'Red Beans and Rice'],
    difficulty: 'Beginner',
  },
  {
    name: 'The Maillard Reaction',
    explanation:
      'The Maillard reaction is the chemical process responsible for brown, crusty, deeply savory flavor — it happens when proteins and sugars in food are exposed to high, dry heat above 280°F. This is what makes seared oxtail taste nothing like boiled oxtail, what makes jerk chicken\'s charred skin irreplaceable, and what makes the bottom of a pan of baked mac and cheese worth fighting over. Moisture kills it: always pat meat dry before searing, never crowd the pan, and wait for real heat before the food goes in.',
    applies_to: ['Smothered Oxtail', 'Fried Chicken', 'Jerk Chicken'],
    difficulty: 'Beginner',
  },
  {
    name: 'Layering Salt',
    explanation:
      'Salt added only at the end of cooking is surface salt — it sharpens but doesn\'t integrate. Seasoning in layers means salting the meat before it cooks, the aromatics as they soften, the liquid as it reduces, and tasting for final balance at the end. Each layer of salt is doing something different: the early salt draws moisture, concentrates flavor, and penetrates; the later salt adjusts and brightens. A dish that tastes "flat" almost always needs more layering, not just a pinch at the end.',
    applies_to: ['Collard Greens', 'Potato Salad', 'Any braised dish'],
    difficulty: 'Beginner',
  },
  {
    name: 'Deglazing',
    explanation:
      'After searing meat at high heat, the pan is coated in concentrated, caramelized proteins and sugars called fond — and that fond is flavor. Deglazing means pouring a cold liquid (wine, broth, water, vinegar) into the hot pan and using a wooden spoon to scrape up every bit of it. That liquid immediately carries all of that concentrated flavor into your sauce or braise. Deglazing is the difference between a one-dimensional sauce and a layered one — and it takes about 45 seconds.',
    applies_to: ['Smothered Oxtail', 'Pan Gravy', 'Braised Short Ribs'],
    difficulty: 'Beginner',
  },
  {
    name: 'Braising',
    explanation:
      'Braising is the technique that unlocks tough, collagen-rich cuts — oxtail, short ribs, pork shoulder, chicken thighs — and turns them into something silky and deeply flavorful that you cannot achieve any other way. It requires two heat phases: high dry heat to sear and build the crust, then low moist heat (partially submerged in liquid, covered) for long enough that the collagen breaks down into gelatin, thickening the liquid and making the meat tender. The key is patience: braised dishes cannot be rushed, only tended.',
    applies_to: ['Smothered Oxtail', 'Classic Collard Greens', 'Smothered Pork Chops'],
    difficulty: 'Intermediate',
  },
];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-amber-100 text-amber-800',
  Advanced: 'bg-red-100 text-red-800',
};

export default function TechniquePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-950 mb-5">
          Cooking Techniques That Actually Matter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Most recipes give you the{' '}
          <span className="font-semibold text-amber-800">WHAT</span>.
          We give you the{' '}
          <span className="font-semibold text-amber-800">WHY</span>.
          Master these six techniques and every dish you make — from any cuisine —
          gets measurably better.
        </p>
      </header>

      {/* Technique cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {TECHNIQUES.map((technique, index) => (
          <article
            key={technique.name}
            className="bg-white rounded-2xl border border-amber-100 shadow-sm p-7 flex flex-col gap-4"
          >
            {/* Number + name */}
            <div className="flex items-start gap-4">
              <span
                className="text-3xl font-extrabold text-amber-200 leading-none select-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h2 className="text-xl font-bold text-amber-950">{technique.name}</h2>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DIFFICULTY_COLORS[technique.difficulty]}`}
                  >
                    {technique.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <p className="text-gray-700 leading-relaxed text-sm">
              {technique.explanation}
            </p>

            {/* Applied to */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Used in
              </p>
              <ul className="flex flex-wrap gap-2">
                {technique.applies_to.map((dish) => (
                  <li
                    key={dish}
                    className="text-xs bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200"
                  >
                    {dish}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="bg-amber-950 rounded-3xl px-8 py-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
          Get the Technique Deep-Dives
        </h2>
        <p className="text-amber-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Every week we break down one technique in full — with photos, the science,
          and the specific recipes that showcase it best. No filler. Just real cooking knowledge.
        </p>
        <Link
          href="/#newsletter"
          className="inline-block bg-white text-amber-950 font-bold px-8 py-3 rounded-full hover:bg-amber-50 transition-colors"
        >
          Join the Newsletter
        </Link>
      </section>
    </main>
  );
}
