import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50/50 py-12 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 print:hidden" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-md p-1 w-fit"
              aria-label="InvoiceCraft homepage"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <FileText className="h-4 w-4" />
              </div>
              <span className="font-sans text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                InvoiceCraft
              </span>
            </Link>
            <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Create professional, client-ready invoices in under 60 seconds with our free offline-first generator. No signup, subscription, or watermarks.
            </p>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-600">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-md p-1" 
                aria-label="Github documentation repository"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="mailto:support@invoicecraft.co" 
                className="hover:text-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-md p-1" 
                aria-label="Support desk email"
              >
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
                <Link to="/generator" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Free Invoice Generator
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Print Instructions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Why InvoiceCraft?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Submit Feedback
                </Link>
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
                <Link to="/blog/how-to-write-a-professional-invoice" className="text-left hover:text-blue-600 transition block focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  How to Write an Invoice
                </Link>
              </li>
              <li>
                <Link to="/blog/understanding-freelance-taxes-beginners-roadmap" className="text-left hover:text-blue-600 transition block focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Freelance Tax Deductions
                </Link>
              </li>
              <li>
                <Link to="/blog/5-billing-mistakes-that-delay-client-payments" className="text-left hover:text-blue-600 transition block focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Avoid Billing Mistakes
                </Link>
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
                <Link to="/privacy" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Privacy Policy (GDPR)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-blue-600 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-sm">
                  Disclaimer Notice
                </Link>
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
