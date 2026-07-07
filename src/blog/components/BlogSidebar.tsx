import React from 'react';
import { Search, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { BlogArticle } from '../data/types';

interface BlogSidebarProps {
  articles: BlogArticle[];
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectPost: (slug: string) => void;
}

export default function BlogSidebar({
  articles,
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  onSelectPost
}: BlogSidebarProps) {
  // Get 3 latest posts for the quick reference block
  const latestPosts = articles.slice(0, 3);

  return (
    <aside className="space-y-8" id="blog-sidebar">
      {/* Search Widget */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Search Articles
        </h3>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search title, keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 font-sans text-xs outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
            aria-label="Search blog posts"
          />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Popular Categories
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory(null)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-sans text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === null
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/50 dark:hover:text-slate-200'
            }`}
          >
            <span>All Categories</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {articles.length}
            </span>
          </button>

          {categories.map(category => {
            const count = articles.filter(a => a.category === category).length;
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-sans text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/50 dark:hover:text-slate-200'
                }`}
              >
                <span>{category}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Latest Articles Widget */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Latest Publications
        </h3>
        <div className="space-y-4">
          {latestPosts.map(post => (
            <div
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className="group flex gap-3 cursor-pointer items-start"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-12 w-12 shrink-0 rounded-lg object-cover bg-slate-100 dark:bg-slate-900"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-sans text-xs font-bold text-slate-800 group-hover:text-blue-600 transition line-clamp-2 dark:text-slate-200 dark:group-hover:text-blue-400 leading-snug">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                  <span>{post.publishedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
