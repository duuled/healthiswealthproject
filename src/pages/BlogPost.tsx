import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogPost, BLOG_POSTS, BlogSection } from '@/data/blogPosts';

const CATEGORY_COLORS: Record<string, string> = {
  Superfoods: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Immunity: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Mens Health': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Lifestyle: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};

const renderSection = (section: BlogSection, idx: number) => {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={idx} className="text-base sm:text-lg leading-relaxed text-foreground/90">
          {section.text}
        </p>
      );
    case 'heading':
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-bold mt-8 mb-3 font-[Playfair_Display]">
          {section.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3 key={idx} className="text-lg font-semibold mt-6 mb-2">
          {section.text}
        </h3>
      );
    case 'list':
      return (
        <ul key={idx} className="space-y-2 my-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/90">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div key={idx} className="my-6 bg-primary/8 border border-primary/25 rounded-xl p-5">
          <p className="text-base font-medium text-foreground">{section.text}</p>
        </div>
      );
    case 'quote':
      return (
        <blockquote key={idx} className="my-6 pl-5 border-l-4 border-primary">
          <p className="text-base italic text-muted-foreground">{section.text}</p>
        </blockquote>
      );
    default:
      return null;
  }
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getBlogPost(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
        <h1 className="text-3xl font-bold mb-3">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">This article may have moved or been removed.</p>
        <Button onClick={() => navigate('/blog')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Button>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    p => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  ).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div className="h-full bg-primary w-1/3 transition-all duration-300" id="reading-progress" />
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-b from-secondary/10 to-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{post.category}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground'}`}>
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[Playfair_Display] leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                HIW
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.publishedAt} · {post.authorRole}</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-1.5"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <article className="space-y-5">
          {post.content.map((section, idx) => renderSection(section, idx))}
        </article>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="text-xs bg-muted hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-full text-muted-foreground transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <div className="mt-10 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/25 rounded-2xl p-7 text-center">
          <div className="text-3xl mb-3">🌿</div>
          <h3 className="text-xl font-bold mb-2 font-[Playfair_Display]">
            Ready to Start Your Wellness Journey?
          </h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
            Shop the superfoods mentioned in this article. Third-party tested, organic certified.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/shop">
                Shop All Products <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/free-guide">
                Get Free Wellness Guide
              </Link>
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Related Articles</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group block bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2 ${CATEGORY_COLORS[related.category] || 'bg-muted text-muted-foreground'}`}>
                    {related.category}
                  </span>
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1 font-[Playfair_Display]">
                    {related.title}
                  </h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3" /> {related.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" /> All Articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
