import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'General',
    question: 'Do I need to create an account or log in to use InvoiceCraft?',
    answer: 'Absolutely not. We believe in zero friction. You can create, preview, print, and export high-resolution professional invoices in under 60 seconds the moment you open our webpage, completely free without registering.'
  },
  {
    category: 'General',
    question: 'How is this invoice generator completely free? Are there watermarks?',
    answer: 'InvoiceCraft is 100% free with no watermarks, branding labels, or locked fields. We monetize our platform through highly standard, non-disruptive, policy-compliant display ads provided by Google AdSense.'
  },
  {
    category: 'Data Security',
    question: 'Is my billing information secure? Where are my client details stored?',
    answer: 'We operate under a strict privacy-first policy. We do not store, view, or process your client details, price tags, or invoice numbers on any cloud server. All information is encrypted and stored purely inside your web browser’s local storage.'
  },
  {
    category: 'Data Security',
    question: 'Can I access my draft invoices on another computer or mobile phone?',
    answer: 'Because we prioritize privacy by storing everything locally in your active web browser, invoices do not automatically synchronize to other devices. However, you can use our built-in "Share Invoice" feature, which compiles the invoice into a portable secure link that you can open on any device to retrieve the exact same draft.'
  },
  {
    category: 'PDF & Printing',
    question: 'How do I download my invoice as a clean PDF document?',
    answer: 'Simply click the "Print / Download PDF" button on the generator. This will trigger your browser’s native print dialog. In the printer destination settings, choose "Save as PDF" instead of your physical printer. Our stylesheet is custom-tailored for A4/Letter size to automatically strip away web buttons and headers, rendering a pristine, high-res PDF.'
  },
  {
    category: 'PDF & Printing',
    question: 'My PDF has website headers and page numbers on the margins. How do I remove them?',
    answer: 'When your browser’s system print prompt opens, click on "More Settings" or "Options" and make sure the "Headers and Footers" checkbox is unchecked. This will remove any default browser timestamp, URL, or page numbers, leaving your invoice 100% clean.'
  },
  {
    category: 'Extra Features',
    question: 'Can I create invoices in different currencies and languages?',
    answer: 'Yes! We have built a dynamic Currency Selector that supports USD ($), EUR (€), GBP (£), JPY (¥), CAD (C$), AUD (A$), and many other global currencies. You can also customize all labels to translate your invoice directly for international clients.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(FAQ_DATA.map(item => item.category)))];

  const filteredFaqs = activeTab === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter(item => item.category === activeTab);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8" id="faq-page">
      <div className="space-y-12">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
            Frequently Asked Questions
          </span>
          <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Answers to your queries
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about our free invoice tool, data privacy, PDF exports, and legal billing compliance.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setOpenIndex(null);
              }}
              className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium transition ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xs transition hover:border-slate-200 dark:border-slate-800 dark:bg-slate-950"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-sans text-base font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5 rotate-180 text-blue-600 transition-transform duration-200 dark:text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200 dark:text-slate-500" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t border-slate-50 p-6 pt-0 font-sans text-sm leading-relaxed text-slate-500 dark:border-slate-900 dark:text-slate-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
