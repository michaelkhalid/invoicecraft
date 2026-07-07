import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Search, Tag, Calendar, Clock, ArrowLeft, ArrowRight,
  BookOpen, Share2, HelpCircle, ChevronRight, Menu, X, Check, Copy
} from 'lucide-react';
import { getArticles, getCategories } from '../blog/data/articles';
import { BlogArticle } from '../blog/data/types';
import { calculateReadingTime } from '../blog/utils/readingTime';
import { generateTOC, headingToSlug } from '../blog/utils/toc';
import ShareButtons from '../blog/components/ShareButtons';
import FAQSection from '../blog/components/FAQSection';
import BlogSidebar from '../blog/components/BlogSidebar';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function Blog() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const allArticles = getArticles();
  const categories = getCategories(allArticles);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [activeTOC, setActiveTOC] = useState<{ text: string; id: string; level: number }[]>([]);

  const postsPerPage = 6;

  // Handle routing and scroll behavior
  useEffect(() => {
    if (slug) {
      const foundArticle = allArticles.find(a => a.slug === slug);
      if (foundArticle) {
        setActiveArticle(foundArticle);
        setActiveTOC(generateTOC(foundArticle.content));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback or redirect if article is missing
        navigate('/blog', { replace: true });
      }
    } else {
      setActiveArticle(null);
      setActiveTOC([]);
    }
  }, [slug, navigate, allArticles]);

  const handlePostClick = (targetSlug: string) => {
    navigate(`/blog/${targetSlug}`);
  };

  const handleBackToList = () => {
    navigate('/blog');
  };

  // 1. FILTERING ENGINE (Search title, keywords, category, or content)
  const filteredArticles = allArticles.filter(article => {
    const searchString = `${article.title} ${article.description} ${article.content} ${(article.keywords || []).join(' ')} ${article.category}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // 2. PAGINATION CALCULATIONS
  // If there are filtered articles, we slice them based on page size.
  // Note: On the landing index (when no search/category is selected), 
  // we might want to isolate the very latest article as a "Featured Article",
  // and list the remaining articles with pagination support.
  const isSearchActive = searchTerm.trim() !== '' || selectedCategory !== null;
  
  let displayedArticles = filteredArticles;
  let featuredArticle: BlogArticle | null = null;

  if (!isSearchActive && filteredArticles.length > 0) {
    featuredArticle = filteredArticles[0];
    displayedArticles = filteredArticles.slice(1);
  }

  const totalPages = Math.ceil(displayedArticles.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedArticles = displayedArticles.slice(startIndex, startIndex + postsPerPage);

  // 3. CONTEXTUAL PREVIOUS & NEXT ARTICLES
  let prevArticle: BlogArticle | null = null;
  let nextArticle: BlogArticle | null = null;

  if (activeArticle) {
    const currentIndex = allArticles.findIndex(a => a.slug === activeArticle.slug);
    if (currentIndex > 0) {
      nextArticle = allArticles[currentIndex - 1]; // Newer post
    }
    if (currentIndex < allArticles.length - 1) {
      prevArticle = allArticles[currentIndex + 1]; // Older post
    }
  }

  // 4. RELATED ARTICLES (Matching category, excluding active post)
  const relatedArticles = activeArticle 
    ? allArticles
        .filter(a => a.category === activeArticle.category && a.slug !== activeArticle.slug)
        .slice(0, 2)
    : [];

  // Fallback if no specific related matches under the same category
  const fallbackRelated = relatedArticles.length > 0 
    ? relatedArticles 
    : activeArticle 
      ? allArticles.filter(a => a.slug !== activeArticle.slug).slice(0, 2) 
      : [];

  // 5. HEADINGS MARKDOWN PARSING ENGINE WITH LINKED ANCHOR IDS
  const parseAndRenderMarkdown = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // H2 Heading Parsing
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        const id = headingToSlug(text);
        return (
          <h2 
            key={idx} 
            id={id} 
            className="scroll-mt-24 mt-10 mb-4 font-sans text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800"
          >
            {text}
          </h2>
        );
      }

      // H3 Heading Parsing
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '');
        const id = headingToSlug(text);
        return (
          <h3 
            key={idx} 
            id={id} 
            className="scroll-mt-24 mt-8 mb-3 font-sans text-xl font-bold text-slate-900 dark:text-white"
          >
            {text}
          </h3>
        );
      }

      // Bullet List Parsing
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const lines = trimmed.split('\n');
        return (
          <ul key={idx} className="my-5 list-disc pl-6 space-y-2 font-sans text-slate-600 dark:text-slate-300">
            {lines.map((line, lIdx) => {
              const itemText = line.replace(/^[*+-]\s+/, '');
              // Quick check for bold markdown inside list items
              return (
                <li key={lIdx} dangerouslySetInnerHTML={{ __html: parseInlinedMarkdown(itemText) }} />
              );
            })}
          </ul>
        );
      }

      // Basic Tables Parsing
      if (trimmed.startsWith('|')) {
        const lines = trimmed.split('\n');
        const headerCols = lines[0].split('|').filter(c => c.trim()).map(c => c.trim());
        const rowLines = lines.slice(2); // Skip separator

        return (
          <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  {headerCols.map((col, colIdx) => (
                    <th key={colIdx} className="px-6 py-3.5 text-left font-sans text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
                {rowLines.map((rowLine, rowIdx) => {
                  const cols = rowLine.split('|').filter(c => c.trim()).map(c => c.trim());
                  if (cols.length === 0) return null;
                  return (
                    <tr key={rowIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      {cols.map((col, colIdx) => {
                        const isBold = col.startsWith('**') && col.endsWith('**');
                        const cleanText = isBold ? col.replace(/\*\*/g, '') : col;
                        return (
                          <td 
                            key={colIdx} 
                            className={`px-6 py-4 font-sans text-xs ${
                              isBold 
                                ? 'font-bold text-slate-800 dark:text-slate-200' 
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {cleanText}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      // Default Paragraph Parsing (with support for inline hyperlinks or bold text)
      return (
        <p 
          key={idx} 
          className="my-4 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: parseInlinedMarkdown(trimmed) }}
        />
      );
    });
  };

  // Helper to parse basic markdown links [text](url) or bold **text** in paragraphs
  const parseInlinedMarkdown = (text: string): string => {
    return text
      // Bold text **word**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Custom hyperlink markdown [anchor](/route)
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline font-semibold dark:text-blue-400">$1</a>');
  };

  // -------------------------------------------------------------------------
  // DETAILED VIEW RENDERING
  // -------------------------------------------------------------------------
  if (activeArticle) {
    const pageUrl = `${window.location.origin}/blog/${activeArticle.slug}`;
    const readTime = calculateReadingTime(activeArticle.content);

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id={`blog-view-${activeArticle.slug}`}>
        {/* Navigation back and Category Badge */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleBackToList}
            className="group inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Publications
          </button>
          
          <span className="rounded-full bg-blue-50 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
            {activeArticle.category}
          </span>
        </div>

        {/* Dynamic Header Block */}
        <header className="mb-8 max-w-3xl">
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white leading-tight">
            {activeArticle.title}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 font-sans text-xs text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Published: {activeArticle.publishedDate}</span>
            </div>
            {activeArticle.updatedDate && activeArticle.updatedDate !== activeArticle.publishedDate && (
              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4 dark:border-slate-800">
                <span>Updated: {activeArticle.updatedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4 dark:border-slate-800">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime}</span>
            </div>
          </div>
        </header>

        {/* Grid layout separating Article Body from the Sticky Table of Contents sidebar */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Body Column */}
          <article className="lg:col-span-8 space-y-6">
            {/* Featured Image */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <img
                src={activeArticle.featuredImage}
                alt={activeArticle.title}
                className="aspect-16/9 w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Ad placement */}
            <AdSensePlaceholder slot="blog-article-top" format="horizontal" />

            {/* Rendered markdown paragraphs */}
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {parseAndRenderMarkdown(activeArticle.content)}
            </div>

            {/* Social Share buttons */}
            <ShareButtons url={pageUrl} title={activeArticle.title} />

            {/* FAQ Accordion Section */}
            {activeArticle.faq && activeArticle.faq.length > 0 && (
              <FAQSection faqList={activeArticle.faq} />
            )}

            {/* Inline Author Profile Box */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30 flex flex-col sm:flex-row gap-5 items-start mt-10">
              <img
                src={activeArticle.author.avatar}
                alt={activeArticle.author.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-950"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2">
                <div className="space-y-0.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">AUTHOR</span>
                  <h4 className="font-sans text-base font-bold text-slate-900 dark:text-white leading-none">{activeArticle.author.name}</h4>
                  <p className="font-sans text-xs text-blue-600 dark:text-blue-400 font-semibold">{activeArticle.author.role}</p>
                </div>
                <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {activeArticle.author.bio}
                </p>
              </div>
            </div>

            {/* Contextual Navigation (Prev / Next links) */}
            <div className="grid gap-4 sm:grid-cols-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              {prevArticle ? (
                <div 
                  onClick={() => handlePostClick(prevArticle!.slug)}
                  className="group cursor-pointer rounded-xl border border-slate-100 p-4 transition-all hover:border-blue-100 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:border-slate-800 dark:hover:bg-slate-900/10 flex flex-col justify-between"
                >
                  <span className="font-sans text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Older Article</span>
                  <span className="mt-1 font-sans text-xs font-bold text-slate-800 group-hover:text-blue-600 transition dark:text-slate-200 dark:group-hover:text-blue-400 line-clamp-1">
                    {prevArticle.title}
                  </span>
                </div>
              ) : <div className="hidden sm:block" />}

              {nextArticle ? (
                <div 
                  onClick={() => handlePostClick(nextArticle!.slug)}
                  className="group cursor-pointer rounded-xl border border-slate-100 p-4 transition-all hover:border-blue-100 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:border-slate-800 dark:hover:bg-slate-900/10 flex flex-col justify-between text-right items-end"
                >
                  <span className="font-sans text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Newer Article</span>
                  <span className="mt-1 font-sans text-xs font-bold text-slate-800 group-hover:text-blue-600 transition dark:text-slate-200 dark:group-hover:text-blue-400 line-clamp-1">
                    {nextArticle.title}
                  </span>
                </div>
              ) : <div className="hidden sm:block" />}
            </div>
          </article>

          {/* Sticky Table of Contents Column (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-28 rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Table of Contents
              </h3>
              
              {activeTOC.length === 0 ? (
                <p className="font-sans text-xs text-slate-400">No sections found in this article.</p>
              ) : (
                <nav className="space-y-1">
                  {activeTOC.map((heading, hIdx) => (
                    <a
                      key={hIdx}
                      href={`#${heading.id}`}
                      className={`block font-sans text-xs font-medium transition-all hover:text-blue-600 dark:hover:text-blue-400 py-1 border-l pl-3 ${
                        heading.level === 3 
                          ? 'ml-4 text-slate-400 border-slate-100 hover:border-blue-200 dark:border-slate-800' 
                          : 'text-slate-600 border-slate-200 hover:border-blue-400 dark:border-slate-700'
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              )}

              {/* Sidebar Related Articles Reference */}
              {fallbackRelated.length > 0 && (
                <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                    Recommended Reading
                  </h4>
                  <div className="space-y-4">
                    {fallbackRelated.map(post => (
                      <div
                        key={post.slug}
                        onClick={() => handlePostClick(post.slug)}
                        className="group cursor-pointer space-y-1"
                      >
                        <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {post.category}
                        </span>
                        <h5 className="font-sans text-xs font-bold text-slate-800 group-hover:text-blue-600 transition dark:text-slate-200 dark:group-hover:text-blue-400 leading-snug line-clamp-2">
                          {post.title}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // INDEX LIST VIEW RENDERING
  // -------------------------------------------------------------------------
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="blog-dashboard-index">
      {/* Search Header Banner */}
      <div className="mb-10 text-center space-y-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
          Knowledge Desk
        </span>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
          Billing, Taxes & Invoicing Insights
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Expert recommendations, compliance blueprints, and formatting tips. Created to help creative freelancers, startup contractors, and agencies automate cash flow.
        </p>
      </div>

      {/* Main Grid: Articles + sidebar */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Publications feed */}
        <div className="lg:col-span-8 space-y-8">
          {/* A. FEATURED ARTICLE JUMBOTRON (If not searching or filtering) */}
          {featuredArticle && (
            <div 
              onClick={() => handlePostClick(featuredArticle!.slug)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs transition-all hover:border-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 flex flex-col md:flex-row h-full"
            >
              <div className="md:w-1/2 overflow-hidden bg-slate-50 dark:bg-slate-900">
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover aspect-16/10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 px-2 py-0.5 rounded-sm">
                    {featuredArticle.category}
                  </span>
                  <h2 className="font-sans text-lg font-bold text-slate-900 group-hover:text-blue-600 transition dark:text-white dark:group-hover:text-blue-400 leading-snug line-clamp-3">
                    {featuredArticle.title}
                  </h2>
                  <p className="font-sans text-xs leading-relaxed text-slate-500 line-clamp-4 dark:text-slate-400">
                    {featuredArticle.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-50 dark:border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="h-6 w-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-sans text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      {featuredArticle.author.name}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] text-slate-400 dark:text-slate-500">
                    {featuredArticle.publishedDate}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* AdSense Unit */}
          <AdSensePlaceholder slot="blog-index-top" format="horizontal" />

          {/* B. LATEST ARTICLES GRID */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              {isSearchActive ? 'Search matches' : 'Latest publications'}
            </h3>

            {paginatedArticles.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed border-slate-100 p-8 dark:border-slate-800">
                <BookOpen className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
                <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">No articles matched your active search filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="mt-4 font-sans text-xs font-bold text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {paginatedArticles.map(article => {
                  const readTime = calculateReadingTime(article.content);
                  return (
                    <article
                      key={article.slug}
                      onClick={() => handlePostClick(article.slug)}
                      className="group cursor-pointer flex flex-col rounded-2xl border border-slate-100 bg-white shadow-xs transition-all hover:border-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 h-full"
                    >
                      <div className="overflow-hidden bg-slate-50 dark:bg-slate-900 h-40">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="p-5 flex flex-1 flex-col justify-between">
                        <div className="space-y-2">
                          <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 px-2 py-0.5 rounded-sm">
                            {article.category}
                          </span>
                          <h4 className="font-sans text-sm font-bold text-slate-900 group-hover:text-blue-600 transition dark:text-white dark:group-hover:text-blue-400 line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                            {article.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-900/80 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-semibold">{article.publishedDate}</span>
                          <span>{readTime}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* C. PAGINATION SHORTCUT CONTROLS */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800" aria-label="Pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-sans text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              
              <span className="font-sans text-xs text-slate-400">
                Page <strong className="text-slate-700 dark:text-slate-300">{currentPage}</strong> of <strong className="text-slate-700 dark:text-slate-300">{totalPages}</strong>
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-sans text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 cursor-pointer"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </nav>
          )}
        </div>

        {/* Right Column: Sticky desktop sidebar widget deck */}
        <div className="lg:col-span-4">
          <BlogSidebar
            articles={allArticles}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            searchTerm={searchTerm}
            onSearchChange={(term) => {
              setSearchTerm(term);
              setCurrentPage(1);
            }}
            onSelectPost={handlePostClick}
          />
        </div>
      </div>
    </div>
  );
}
