import React from 'react';

function LegalLayout({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="border-b border-slate-100 pb-6 dark:border-slate-800">
          <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          <p className="mt-2 font-sans text-xs text-slate-400 dark:text-slate-500">{description}</p>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms and Conditions" description="Effective Date: July 6, 2026">
      <p>
        By utilizing InvoiceCraft (the "Service"), you agree to follow and be bound by the following Terms and Conditions. If you do not agree to these terms, please do not use our utility.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">1. Right of Use</h2>
      <p>
        We grant you a free, non-exclusive, non-transferable license to use our online Invoice Generator to produce professional invoices for your personal, freelance, or corporate billing requirements. No sign-up, registration, or subscription is required.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">2. Content & Accuracy</h2>
      <p>
        You are solely responsible for ensuring the mathematical, descriptive, and fiscal accuracy of any invoice created using our service. We provide the mathematical calculations (subtotals, tax rates, shipping, discounts, and totals) as-is and do not warrant that they meet your specific country’s regional tax reporting obligations.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">3. Financial & Legal Disclaimer</h2>
      <p>
        InvoiceCraft does not provide legal, financial, accounting, or tax advice. The templates and articles hosted on our site are for informational and administrative purposes only. Always consult a certified accountant or tax professional before submitting financial documents.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">4. Intellectual Property</h2>
      <p>
        The code, graphics, brand name "InvoiceCraft", sitemap configurations, and content are the sole intellectual property of our developers. You may not republish, repackage, or resell the application codebase as your own premium SaaS product.
      </p>
    </LegalLayout>
  );
}
