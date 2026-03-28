import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search, Leaf } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blogPosts';

const CATEGORY_COLORS: Record<string, string> = {
  Superfoods: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Immunity: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Mens Health': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Lifestyle: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* SEO Meta (injected via Helmet equivalent inline) */}
      <div className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background to-secondary/10 border-b border-border py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Wellness Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-[Playfair_Display]">
              The Health Is Wealth Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Science-backed insights on superfoods, supplements, and lifestyle optimization.
              No fads. No fluff. Just results.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, ingredients, topics..."
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No articles found for "{searchQuery}"</p>
              <button
                className="mt-3 text-primary underline text-sm"
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group block mb-10 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-5 gap-0">
                    {/* Content */}
                    <div className="lg:col-span-3 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] || 'bg-muted text-muted-foreground'}`}>
                          {featured.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {featured.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-[Playfair_Display] group-hover:text-primary transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground mb-5 leading-relaxed">
                        {featured.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featured.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{featured.author}</p>
                          <p className="text-xs text-muted-foreground">{featured.publishedAt}</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    {/* Visual accent */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 via-secondary/20 to-background hidden lg:flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="text-7xl mb-4">
                          {featured.category === 'Superfoods' ? '🌿' :
                           featured.category === 'Immunity' ? '🛡️' :
                           featured.category === 'Mens Health' ? '💪' : '✨'}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Featured Article</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Article Grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(post => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      {/* Card color accent top */}
                      <div className={`h-1.5 w-full ${
                        post.category === 'Superfoods' ? 'bg-emerald-400' :
                        post.category === 'Immunity' ? 'bg-blue-400' :
                        post.category === 'Mens Health' ? 'bg-amber-400' : 'bg-purple-400'
                      }`} />

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground'}`}>
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-bold text-base mb-2 font-[Playfair_Display] group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2 font-[Playfair_Display]">
              Want Weekly Wellness Insights?
            </h3>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto">
              Join 5,000+ health-conscious readers who get our best articles, supplement guides,
              and exclusive deals every week.
            </p>
            <button
              onClick={() => window.open('https://aisearchbrief.blog', '_blank')}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Subscribe Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
