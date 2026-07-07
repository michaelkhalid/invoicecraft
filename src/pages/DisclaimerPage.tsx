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

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" description="Effective Date: July 6, 2026">
      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-4">No Professional Financial Advice</h2>
      <p>
        The templates, calculators, totals, and suggestions provided by InvoiceCraft are meant exclusively for general administrative reference. This application does not constitute professional tax, accounting, audit, or banking advice.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">Accuracy of Totals</h2>
      <p>
        While we make every effort to double-check our mathematical formulas for rounding, itemized multiplication, tax calculations, and discount percentages, we do not accept liability for any billing discrepancies, accounting errors, or missed revenues resulting from invoices generated using this software. Always review the final PDF print layout before sending documents to clients.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">Third-Party Advertisements</h2>
      <p>
        The display of advertisements does not imply endorsement of any product or service. InvoiceCraft has no responsibility for the contents of external ads displayed through the Google AdSense network.
      </p>
    </LegalLayout>
  );
}
