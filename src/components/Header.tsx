import React, { useState } from 'react';
import { Menu, X, FileText, Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ currentView, onNavigate, darkMode, onToggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Invoice Generator', view: 'generator' },
    { name: 'About', view: 'about' },
    { name: 'Blog', view: 'blog' },
    { name: 'FAQ', view: 'faq' },
    { name: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 print:hidden" id="main-header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`font-sans text-sm font-medium transition-colors ${
                  currentView === item.view
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
              aria-label="Toggle visual theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('generator')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 font-sans text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 active:scale-98"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Create Invoice
            </button>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Open primary menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 px-4 pt-2 pb-6 shadow-lg dark:border-slate-800 dark:bg-slate-950/95">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full rounded-lg px-4 py-3 text-left font-sans text-sm font-medium ${
                  currentView === item.view
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="mt-4 px-4">
            <button
              onClick={() => handleNavClick('generator')}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-3 font-sans text-sm font-semibold text-white shadow-xs hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4" />
              Start Invoicing Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
