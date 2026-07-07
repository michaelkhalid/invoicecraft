import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Invoice Generator', path: '/generator' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 print:hidden" id="main-header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand Link */}
          <Link 
            to="/" 
            className="flex items-center gap-2 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            aria-label="InvoiceCraft homepage"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-base font-bold tracking-tight text-slate-900 dark:text-white">
                InvoiceCraft
              </span>
              <span className="font-sans text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                Create Invoices Free
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 ${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? "Switch to light visual mode" : "Switch to dark visual mode"}
            >
              {darkMode ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>

            {/* CTA Button */}
            <Link
              to="/generator"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 font-sans text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 active:scale-98 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Go to Free Invoice Generator"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Create Invoice
            </Link>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 px-4 pt-2 pb-6 shadow-lg dark:border-slate-800 dark:bg-slate-950/95 animate-in fade-in slide-in-from-top-4 duration-250">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full rounded-lg px-4 py-3 text-left font-sans text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 px-4">
            <Link
              to="/generator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-3 font-sans text-sm font-semibold text-white shadow-xs hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <Sparkles className="h-4 w-4" />
              Start Invoicing Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
