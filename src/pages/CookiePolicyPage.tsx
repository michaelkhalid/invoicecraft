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

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" description="Effective Date: July 6, 2026">
      <p>
        This Cookie Policy explains how InvoiceCraft uses cookies and local storage technologies to enhance your experience.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">1. What are Cookies and Local Storage?</h2>
      <p>
        Cookies are small text files stored by your browser when you visit websites. Local Storage is a modern web specification that allows our application to save structured data objects (like your client addresses and line items) on your personal device so they persist across sessions.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">2. Essential & Functional Storage</h2>
      <p>
        Our applet uses Local Storage to store your current invoice form progress. This allows you to close your tab and return without retyping your data. This is completely safe, does not connect to any servers, and is fully necessary to run the free application without registration.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">3. Third Party AdSense Cookies</h2>
      <p>
        We run Google AdSense on our webpages. Google utilizes cookies to track prior site interactions in order to display relevant, helpful ads. These cookies run under Google's independent privacy policies.
      </p>
    </LegalLayout>
  );
}
