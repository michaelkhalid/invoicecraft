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

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" description="Effective Date: July 6, 2026 | Last updated: July 6, 2026">
      <p>
        At InvoiceCraft ("we", "our", or "us"), we prioritize the privacy and security of your financial data. This Privacy Policy describes how we collect, use, and protect your information when you utilize our online Invoice Generator applet.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">1. Zero Database Collection Policy</h2>
      <p>
        Unlike traditional SaaS tools, we do not operate a remote database containing your customer details, corporate information, rates, or totals. 
        <strong> All information that you enter into our templates is stored exclusively in your browser’s Local Storage.</strong> 
        This data never touches our web servers and is not shared with any third party.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">2. Local Storage & Cookies</h2>
      <p>
        We utilize local storage keys to automatically save your active invoice state so you do not lose progress if your window is refreshed. This storage exists on your personal machine and can be cleared at any time by emptying your browser cache or pressing the "Reset Form" button in the tool dashboard.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">3. Google AdSense & Third-Party Cookies</h2>
      <p>
        To support our free services, we display contextual advertisements powered by Google AdSense. Google and its partners use cookies to serve personalized ads based on your prior visits to our website or other internet sites. 
        You may opt out of personalized advertising by visiting Google’s Ads Settings or using browser extensions.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">4. Secure PDF Exporting</h2>
      <p>
        All PDF files are generated client-side inside your web browser. We do not transmit your invoice contents to external servers or cloud conversion APIs to produce your files, keeping your client metrics perfectly confidential.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mt-6">5. Your Legal Rights</h2>
      <p>
        Under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), because we do not collect or store any of your personal identifiers, we have no personal records to query, correct, or delete. You retain 100% control of your data via your own machine's browser settings.
      </p>
    </LegalLayout>
  );
}
