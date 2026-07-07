import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { ArticleFAQItem } from '../data/types';

interface FAQSectionProps {
  faqList: ArticleFAQItem[];
}

export default function FAQSection({ faqList }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first FAQ by default for accessibility

  if (!faqList || faqList.length === 0) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 border-t border-slate-100 pt-10 dark:border-slate-800" id="blog-article-faqs">
      <div className="flex items-center gap-2.5 mb-6">
        <HelpCircle className="h-5.5 w-5.5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h3>
      </div>
      
      <div className="space-y-3">
        {faqList.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                isOpen
                  ? 'border-blue-200 bg-blue-50/20 dark:border-blue-900/30 dark:bg-blue-950/10'
                  : 'border-slate-100 bg-white hover:border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-800'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left cursor-pointer focus:outline-hidden"
                aria-expanded={isOpen}
              >
                <span className="font-sans text-sm font-semibold text-slate-800 dark:text-slate-200 pr-4">
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                )}
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100 border-t border-dashed border-slate-100 dark:border-slate-900/80' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 py-4 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
