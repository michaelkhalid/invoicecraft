import React from 'react';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8" id="about-page">
      <div className="space-y-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
              Our Mission
            </span>
            <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              SaaS Billing, Made Frictionless
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-slate-500 dark:text-slate-400">
              We believe freelancers and independent business owners shouldn't have to navigate heavy, paid, subscription-locked billing software to send a clean, compliant invoice.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">100% Free & Open Source</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              InvoiceCraft is built to serve the global independent workforce. No hidden subscription fees, no locked features behind premium plans, and absolutely no watermarks on your professional PDFs.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Privacy First Architecture</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your financial data is yours alone. We do not store, view, or process your client listings, product prices, or invoice metrics on any cloud database. Everything is safely encrypted in your browser's Local Storage.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">High Resolution PDFs</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Our print-ready stylesheets are designed for pixel-perfect A4 printing. Download clean vector PDFs directly through your browser's system printer with no image fuzziness or layout alignment shifts.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">No Signup Required</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Go from open tab to finished client invoice in under 60 seconds. Skip the email verification screens, password managers, and onboarding wizard. Simply type, review, and print.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white sm:p-12">
          <div className="max-w-2xl">
            <h2 className="font-sans text-2xl font-bold sm:text-3xl">Why we built this app</h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-blue-50">
              As former freelancers, we spent too much time trying to create fast, aesthetic invoices. Traditional billing systems are slow, require logins, upsell premium subscriptions, or leave ugly branding watermarks. InvoiceCraft was crafted to be the ultimate direct-to-use professional layout utility that belongs entirely to the developer, designer, consultant, or small business owner.
            </p>
            <p className="mt-6 font-mono text-sm font-semibold tracking-wide uppercase text-blue-200">
              - Built for the Global Creator Economy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
