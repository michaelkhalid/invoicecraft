import React, { useState } from 'react';
import { FileQuestion, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Search feature is currently a placeholder. You searched for: "${searchQuery}"`);
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center" id="404-view">
      <div className="relative mb-6">
        <div className="absolute inset-0 scale-110 rounded-full bg-blue-50 dark:bg-blue-950/20 blur-xl" />
        <FileQuestion className="relative h-20 w-20 text-blue-600 dark:text-blue-400 animate-bounce" />
      </div>

      <h1 className="font-sans text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm text-slate-500 dark:text-slate-400">
        We couldn't locate the invoicing module, help article, or legal template you were seeking.
      </p>

      {/* Accessible Search Placeholder */}
      <form onSubmit={handleSearchSubmit} className="mt-8 w-full max-w-sm space-y-2">
        <label htmlFor="search-input-404" className="sr-only">Search InvoiceCraft documentation</label>
        <div className="relative">
          <input
            id="search-input-404"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 font-sans text-xs outline-hidden transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950"
          />
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 font-sans text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
        >
          Search Help Center
        </button>
      </form>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-sans text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 active:scale-98 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
