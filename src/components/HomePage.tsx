import React from 'react';
import { ArrowRight, Sparkles, FileText, CheckCircle2, ShieldCheck, Zap, Receipt, Layers, HelpCircle, FileCheck, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/blogData';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onNavigateToPost?: (slug: string) => void;
}

export default function HomePage({ onNavigate, onNavigateToPost }: HomePageProps) {
  // Grab the 2 most recent blog posts for the homepage feed
  const featuredPosts = BLOG_POSTS.slice(0, 2);

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: 'Ready in 60 Seconds',
      description: 'Skip the wizards and registration. Simply open the generator tab, fill in your billing details, and export instantly.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
      title: '100% Client-Side Privacy',
      description: 'Your pricing, totals, and client names are never sent to external servers. Everything stays secure in your own browser storage.'
    },
    {
      icon: <FileCheck className="h-6 w-6 text-indigo-600" />,
      title: 'Zero Hidden Fees',
      description: 'Generate and print unlimited high-resolution A4 invoices with no subscription locks, credits, or corporate watermarks.'
    }
  ];

  const steps = [
    { number: '01', title: 'Fill Details', desc: 'Type in your company branding information, client billing address, and select your currency.' },
    { number: '02', title: 'Add Services', desc: 'Add unlimited line items with separate quantities, unit prices, and optional discount rates.' },
    { number: '03', title: 'Print or Share', desc: 'Click print to save a high-res PDF instantly, or copy a portable QR code draft link.' }
  ];

  const faqs = [
    { q: 'Is there a limit on how many invoices I can generate?', a: 'None at all. You can create, save, and export as many invoices as you need for your freelance services or store operations, completely free.' },
    { q: 'Can I add a custom company logo?', a: 'Yes! Our drag-and-drop encoder allows you to embed PNG, JPEG, or WebP logos that are processed offline and saved securely in your template.' },
    { q: 'How does the shared draft link work?', a: 'When you click "Share Link", our tool compiles your active invoice fields into an encrypted hash within the URL. Sending this link to anyone allows them to restore the exact same invoice details instantly.' }
  ];

  return (
    <div className="space-y-20 py-8" id="home-landing-page">
      {/* ================= HERO SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Hero Left Copy */}
          <div className="space-y-6 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400"
            >
              <Sparkles className="h-3 w-3 text-blue-500" />
              100% Free & No Signups Required
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              Create Professional Invoices <span className="text-blue-600 dark:text-blue-400">in Seconds</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-sans text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400"
            >
              The ultimate lightweight invoice builder for freelancers, small business owners, and agency consultants. Design premium, pixel-perfect, print-ready PDFs with automated calculations and instant local drafting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => onNavigate('generator')}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:outline-hidden active:scale-98"
              >
                Start Generating Invoice
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-sans text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Why InvoiceCraft?
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100 dark:border-slate-900">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No Credit Card
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No Watermarks
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Offline-First Encryption
              </div>
            </div>
          </div>

          {/* Hero Right Visual Preview Mock */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900/40">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                {/* Visual Fake Invoice Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-slate-900 dark:text-white">Design Lab LLC</h4>
                      <p className="font-sans text-[9px] text-slate-400">billing@designlab.co</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[9px] font-bold text-blue-600 dark:text-blue-400">INV-2026-042</p>
                    <p className="font-sans text-[8px] text-slate-400">Due in 15 days</p>
                  </div>
                </div>

                {/* Items rows mock */}
                <div className="my-4 space-y-2">
                  <div className="flex justify-between font-sans text-[10px]">
                    <span className="font-medium text-slate-800 dark:text-white">Brand Strategy & Logo Design</span>
                    <span className="font-mono text-slate-500">$3,500.00</span>
                  </div>
                  <div className="flex justify-between font-sans text-[10px]">
                    <span className="font-medium text-slate-800 dark:text-white">Tailwind Web Development</span>
                    <span className="font-mono text-slate-500">$4,800.00</span>
                  </div>
                </div>

                {/* Totals mock */}
                <div className="border-t border-slate-100 pt-3 space-y-1 dark:border-slate-800">
                  <div className="flex justify-between font-sans text-[9px] text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-mono">$8,300.00</span>
                  </div>
                  <div className="flex justify-between font-sans text-[9px] text-emerald-600">
                    <span>Discount (5%):</span>
                    <span className="font-mono">-$415.00</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2 font-sans text-xs dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white">Total Due:</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">$7,885.00</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-blue-50 p-2 text-center text-[10px] font-sans font-semibold text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                  Scan to Pay • Powered by InvoiceCraft
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Designed for modern professionals
          </h2>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
            Everything you need to bill your clients globally with zero setup, zero premium upsells, and 100% data ownership.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition duration-300 hover:border-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900">
                {benefit.icon}
              </div>
              <h3 className="mt-4 font-sans text-base font-bold text-slate-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="bg-slate-50/50 py-16 dark:bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Billing completed in three simple steps
            </h2>
            <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
              No long forms or complicated modules. Fill in the data, preview, and print.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={idx} className="relative space-y-4">
                <span className="font-display text-4xl font-extrabold text-blue-100 dark:text-blue-950">
                  {step.number}
                </span>
                <h3 className="font-sans text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Loved by thousands of creatives & owners
          </h2>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
            See why freelancers, developers, and agency directors trust InvoiceCraft for their billing.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic">
              "InvoiceCraft is an absolute lifesaver. I can write and print an invoice while on a Zoom call with a client, and download a beautiful, compliant PDF in seconds. No watermarks!"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">AM</div>
              <div>
                <h4 className="font-sans text-xs font-bold text-slate-900 dark:text-white">Alex Mercer</h4>
                <p className="font-sans text-[10px] text-slate-400">Freelance Web Developer</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic">
              "We bill from different countries in multiple currencies. InvoiceCraft makes it extremely clean to toggle currencies, add tax details, and save our local templates safely."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">SK</div>
              <div>
                <h4 className="font-sans text-xs font-bold text-slate-900 dark:text-white">Sofia Khan</h4>
                <p className="font-sans text-[10px] text-slate-400">Co-founder, Bloom Creative Agency</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic">
              "The share draft feature is brilliant. I can compile an invoice, click Copy Share Link, and email it directly. My business partner opened it on his tablet, and all coordinates were pre-filled!"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">DH</div>
              <div>
                <h4 className="font-sans text-xs font-bold text-slate-900 dark:text-white">David Hayes</h4>
                <p className="font-sans text-[10px] text-slate-400">Creative Consultant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LATEST ARTICLES SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Latest Billing & Finance Guides
            </h2>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
              Expert articles and tutorials to guide your business accounting compliance.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            All Articles
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                if (onNavigateToPost) onNavigateToPost(post.slug);
              }}
              className="group flex cursor-pointer gap-4 items-start rounded-2xl border border-slate-100 bg-white p-4 transition duration-300 hover:border-blue-100 hover:shadow-xs dark:border-slate-800 dark:bg-slate-950"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-24 w-32 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-blue-600 uppercase dark:text-blue-400">{post.category}</span>
                <h4 className="font-sans text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 dark:text-white dark:group-hover:text-blue-400">
                  {post.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 line-clamp-1">{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="font-sans text-xl font-bold text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
          
          <div className="mt-8 divide-y divide-slate-100 dark:divide-slate-900">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                  {faq.q}
                </h4>
                <p className="mt-2 pl-6 font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('faq')}
              className="font-sans text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              View complete FAQ database →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
