import React from 'react';
import { FileText, Github, Mail, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onNavigateToPost?: (slug: string) => void;
}

export default function Footer({ onNavigate, onNavigateToPost }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleBlogClick = (slug: string) => {
    if (onNavigateToPost) {
      onNavigateToPost(slug);
    } else {
      onNavigate('blog');
    }
  };

  return (
    <footer className="border-t border-slate-100 bg-slate-50/50 py-12 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 print:hidden" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <FileText className="h-4 w-4" />
              </div>
              <span className="font-sans text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                InvoiceCraft
              </span>
            </div>
            <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Create professional, client-ready invoices in under 60 seconds with our free offline-first generator. No signup, subscription, or watermarks.
            </p>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-600">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" aria-label="Github link">
                <Github className="h-4 w-4" />
              </a>
              <a href="mailto:support@invoicecraft.co" className="hover:text-blue-600" aria-label="Support email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tools & Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Billing Tools
            </h4>
            <ul className="space-y-2 font-sans text-xs">
              <li>
                <button onClick={() => onNavigate('generator')} className="hover:text-blue-600 transition">
                  Free Invoice Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-blue-600 transition">
                  Print Instructions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition">
                  Why InvoiceCraft?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-600 transition">
                  Submit Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Guides */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Latest Guides
            </h4>
            <ul className="space-y-2 font-sans text-xs">
              <li>
                <button onClick={() => handleBlogClick('how-to-write-a-professional-invoice')} className="text-left hover:text-blue-600 transition">
                  How to Write an Invoice
                </button>
              </li>
              <li>
                <button onClick={() => handleBlogClick('understanding-freelance-taxes-beginners-roadmap')} className="text-left hover:text-blue-600 transition">
                  Freelance Tax Deductions
                </button>
              </li>
              <li>
                <button onClick={() => handleBlogClick('5-billing-mistakes-that-delay-client-payments')} className="text-left hover:text-blue-600 transition">
                  Avoid Billing Mistakes
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Legal Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal Compliance
            </h4>
            <ul className="space-y-2 font-sans text-xs">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-blue-600 transition">
                  Privacy Policy (GDPR)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-600 transition">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookie')} className="hover:text-blue-600 transition">
                  Cookie Preferences
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-blue-600 transition">
                  Disclaimer Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row dark:border-slate-800">
          <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
            &copy; {currentYear} InvoiceCraft. Created for Vercel & GitHub hosting. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
