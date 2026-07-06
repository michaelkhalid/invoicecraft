import React, { useState, useEffect } from 'react';
import { Search, Tag, Calendar, Clock, ArrowLeft, BookOpen, Share2, User } from 'lucide-react';
import { BLOG_POSTS, ALL_CATEGORIES, ALL_TAGS } from '../data/blogData';
import { BlogPost } from '../types';
import AdSensePlaceholder from './AdSensePlaceholder';

interface BlogProps {
  onNavigateToPost?: (slug: string) => void;
  selectedPostSlug?: string;
  onClearSlug?: () => void;
}

export default function Blog({ onNavigateToPost, selectedPostSlug, onClearSlug }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (selectedPostSlug) {
      const post = BLOG_POSTS.find(p => p.slug === selectedPostSlug);
      if (post) {
        setActivePost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActivePost(null);
    }
  }, [selectedPostSlug]);

  const handlePostClick = (post: BlogPost) => {
    if (onNavigateToPost) {
      onNavigateToPost(post.slug);
    } else {
      setActivePost(post);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToList = () => {
    if (onClearSlug) {
      onClearSlug();
    } else {
      setActivePost(null);
    }
  };

  const handleSharePost = (post: BlogPost) => {
    const url = `${window.location.origin}${window.location.pathname}?blog=${post.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filter posts based on criteria
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Render Full Post View
  if (activePost) {
    return (
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8" id={`blog-post-${activePost.slug}`}>
        <button
          onClick={handleBackToList}
          className="group mb-8 inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Articles
        </button>

        {/* Post Meta Header */}
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
            {activePost.category}
          </span>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            {activePost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 pb-6 font-sans text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {activePost.publishedAt}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {activePost.readTime}
            </div>
            <button
              onClick={() => handleSharePost(activePost)}
              className="ml-auto flex items-center gap-1.5 font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Share2 className="h-3.5 w-3.5" />
              {copiedLink ? 'Copied Link!' : 'Share Article'}
            </button>
          </div>
        </div>

        {/* Post Banner Image */}
        <div className="my-8 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
          <img
            src={activePost.image}
            alt={activePost.title}
            className="h-64 w-full object-cover sm:h-96"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Google AdSense Placement - Top of Article */}
        <AdSensePlaceholder slot="blog-article-top" format="horizontal" />

        {/* Post Content */}
        <div className="prose prose-slate max-w-none dark:prose-invert font-sans text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {activePost.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Simple Markdown Parsing for Headings, Lists, Tables
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="mt-8 mb-4 font-sans text-xl font-bold text-slate-900 dark:text-white">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="mt-6 mb-3 font-sans text-lg font-bold text-slate-900 dark:text-white">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('* ')) {
              const items = trimmed.split('\n');
              return (
                <ul key={idx} className="my-4 list-disc pl-5 space-y-2">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace('* ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (trimmed.startsWith('|')) {
              // Parse basic tables
              const lines = trimmed.split('\n');
              const headerCols = lines[0].split('|').filter(c => c.trim()).map(c => c.trim());
              const rowLines = lines.slice(2); // Skip header separator row

              return (
                <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                  <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-900">
                      <tr>
                        {headerCols.map((col, colIdx) => (
                          <th key={colIdx} className="px-6 py-3 text-left font-sans text-xs font-semibold text-slate-500 dark:text-slate-400">
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
                          <tr key={rowIdx}>
                            {cols.map((col, colIdx) => {
                              // Detect bold formatting inside columns
                              const isBold = col.startsWith('**') && col.endsWith('**');
                              const cleanedText = isBold ? col.replace(/\*\*/g, '') : col;
                              return (
                                <td key={colIdx} className={`px-6 py-4 font-sans text-sm ${isBold ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {cleanedText}
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

            return (
              <p key={idx} className="my-4 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* AdSense In-Article Ad Unit */}
        <AdSensePlaceholder slot="blog-article-middle" format="fluid" />

        {/* Author Footer Profile */}
        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              src={activePost.author.avatar}
              alt={activePost.author.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-950"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <p className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider">Written By</p>
              <h4 className="font-sans text-base font-bold text-slate-900 dark:text-white">{activePost.author.name}</h4>
              <p className="font-sans text-xs text-blue-600 dark:text-blue-400">{activePost.author.role}</p>
            </div>
          </div>
          <p className="mt-4 font-sans text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {activePost.author.bio}
          </p>
        </div>

        {/* Related Posts Link section */}
        <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
          <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Related Billing Guides</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.filter(p => p.id !== activePost.id).slice(0, 2).map(post => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-white p-4 transition hover:border-blue-100 hover:shadow-xs dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
              >
                <span className="font-mono text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase">{post.category}</span>
                <h4 className="mt-1 font-sans text-sm font-bold text-slate-900 group-hover:text-blue-600 transition dark:text-white dark:group-hover:text-blue-400">
                  {post.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </article>
    );
  }

  // Render Directory View (Blog Index)
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" id="blog-index">
      <div className="space-y-10">
        {/* Blog Header Title */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
            InvoiceCraft Blog
          </span>
          <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Billing, Tax & Accounting Insights
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-slate-500 dark:text-slate-400">
            Actionable strategies and templates written by industry experts to help freelancers and small businesses optimize their cash flow and master invoicing.
          </p>
        </div>

        {/* Filter Navigation Panel */}
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between dark:border-slate-800">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search guides, terms, and codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 font-sans text-xs outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-lg px-3 py-1.5 font-sans text-xs font-medium transition ${
                selectedCategory === null
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              All Categories
            </button>
            {ALL_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-3 py-1.5 font-sans text-xs font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tag Indicators */}
        {selectedTag && (
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-slate-400">Filtering by tag:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              <Tag className="h-3 w-3" />
              {selectedTag}
              <button onClick={() => setSelectedTag(null)} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
            </span>
          </div>
        )}

        {/* Blog Post List View */}
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-700" />
            <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">No articles matched your current query filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className="mt-4 font-sans text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs transition hover:border-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-800"
              >
                {/* Post Cover */}
                <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 dark:text-white dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-slate-500 line-clamp-3 dark:text-slate-400">
                    {post.summary}
                  </p>

                  {/* Card Footer Author / Meta */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-900">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-6 w-6 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-sans text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="font-sans text-[10px] text-slate-400 dark:text-slate-500">
                      {post.publishedAt}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Sidebar ads or Bottom index banner */}
        <AdSensePlaceholder slot="blog-index-bottom" format="rectangle" />
      </div>
    </div>
  );
}
