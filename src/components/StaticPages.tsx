import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Shield, FileText, Settings, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

// About Page Component
export function AboutPage() {
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

// Contact Page Component
export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Save submission in local storage for auditing
      const prevSubmissions = JSON.parse(localStorage.getItem('invoicecraft_contact_submissions') || '[]');
      prevSubmissions.push({ ...formData, id: Date.now().toString(), timestamp: new Date().toISOString() });
      localStorage.setItem('invoicecraft_contact_submissions', JSON.stringify(prevSubmissions));
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8" id="contact-page">
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Sidebar Info */}
        <div className="space-y-8 lg:col-span-1">
          <div>
            <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Get in Touch</h1>
            <p className="mt-3 font-sans text-sm text-slate-500 dark:text-slate-400">
              Have questions, feedback, or custom feature proposals? We would love to hear from you. Our support desk replies within 24 hours.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">Support Desk</p>
                <a href="mailto:support@invoicecraft.co" className="font-sans text-sm font-medium text-slate-900 hover:underline dark:text-white">
                  support@invoicecraft.co
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">Office HQ</p>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-300">
                  100 Pine Street, Suite 1250<br />San Francisco, CA 94111
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">Press / Media</p>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-300">+1 (415) 555-8941</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs lg:col-span-2 dark:border-slate-800 dark:bg-slate-950">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="rounded-full bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="mt-4 font-sans text-xl font-bold text-slate-900 dark:text-white">Message Transmitted</h3>
              <p className="mt-2 max-w-md font-sans text-sm text-slate-500 dark:text-slate-400">
                Thank you for your response! We have saved your feedback and our team will get back to you shortly at the email address provided.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg bg-slate-100 px-4 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Subject
                </label>
                <input
                  id="subject-input"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                  placeholder="Feature request, support, partnership, etc."
                />
              </div>

              <div>
                <label htmlFor="message-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Message Content <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message-input"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                  placeholder="How can our financial tools team help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 active:scale-98 disabled:opacity-50"
              >
                {loading ? 'Transmitting...' : 'Send Message'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Legal View
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

// Privacy Policy Component
export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" description="Effective Date: July 6, 2026 | Last updated: July 6, 2026">
      <p>
        At InvoiceCraft ("we", "our", or "us"), we prioritize the privacy and security of your financial data. This Privacy Policy describes how we collect, use, and protect your information when you utilize our online Invoice Generator applet.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">1. Zero Database Collection Policy</h2>
      <p>
        Unlike traditional SaaS tools, we do not operate a remote database containing your customer details, corporate information, rates, or totals. 
        <strong> All information that you enter into our templates is stored exclusively in your browser’s Local Storage.</strong> 
        This data never touches our web servers and is not shared with any third party.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">2. Local Storage & Cookies</h2>
      <p>
        We utilize local storage keys to automatically save your active invoice state so you do not lose progress if your window is refreshed. This storage exists on your personal machine and can be cleared at any time by emptying your browser cache or pressing the "Reset Form" button in the tool dashboard.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">3. Google AdSense & Third-Party Cookies</h2>
      <p>
        To support our free services, we display contextual advertisements powered by Google AdSense. Google and its partners use cookies to serve personalized ads based on your prior visits to our website or other internet sites. 
        You may opt out of personalized advertising by visiting Google’s Ads Settings or using browser extensions.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">4. Secure PDF Exporting</h2>
      <p>
        All PDF files are generated client-side inside your web browser. We do not transmit your invoice contents to external servers or cloud conversion APIs to produce your files, keeping your client metrics perfectly confidential.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">5. Your Legal Rights</h2>
      <p>
        Under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), because we do not collect or store any of your personal identifiers, we have no personal records to query, correct, or delete. You retain 100% control of your data via your own machine's browser settings.
      </p>
    </LegalLayout>
  );
}

// Terms & Conditions Component
export function TermsPage() {
  return (
    <LegalLayout title="Terms and Conditions" description="Effective Date: July 6, 2026">
      <p>
        By utilizing InvoiceCraft (the "Service"), you agree to follow and be bound by the following Terms and Conditions. If you do not agree to these terms, please do not use our utility.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">1. Right of Use</h2>
      <p>
        We grant you a free, non-exclusive, non-transferable license to use our online Invoice Generator to produce professional invoices for your personal, freelance, or corporate billing requirements. No sign-up, registration, or subscription is required.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">2. Content & Accuracy</h2>
      <p>
        You are solely responsible for ensuring the mathematical, descriptive, and fiscal accuracy of any invoice created using our service. We provide the mathematical calculations (subtotals, tax rates, shipping, discounts, and totals) as-is and do not warrant that they meet your specific country’s regional tax reporting obligations.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">3. Financial & Legal Disclaimer</h2>
      <p>
        InvoiceCraft does not provide legal, financial, accounting, or tax advice. The templates and articles hosted on our site are for informational and administrative purposes only. Always consult a certified accountant or tax professional before submitting financial documents.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">4. Intellectual Property</h2>
      <p>
        The code, graphics, brand name "InvoiceCraft", sitemap configurations, and content are the sole intellectual property of our developers. You may not republish, repackage, or resell the application codebase as your own premium SaaS product.
      </p>
    </LegalLayout>
  );
}

// Cookie Policy Component
export function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" description="Effective Date: July 6, 2026">
      <p>
        This Cookie Policy explains how InvoiceCraft uses cookies and local storage technologies to enhance your experience.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">1. What are Cookies and Local Storage?</h2>
      <p>
        Cookies are small text files stored by your browser when you visit websites. Local Storage is a modern web specification that allows our application to save structured data objects (like your client addresses and line items) on your personal device so they persist across sessions.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">2. Essential & Functional Storage</h2>
      <p>
        Our applet uses Local Storage to store your current invoice form progress. This allows you to close your tab and return without retyping your data. This is completely safe, does not connect to any servers, and is fully necessary to run the free application without registration.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">3. Third Party AdSense Cookies</h2>
      <p>
        We run Google AdSense on our webpages. Google utilizes cookies to track prior site interactions in order to display relevant, helpful ads. These cookies run under Google's independent privacy policies.
      </p>
    </LegalLayout>
  );
}

// Disclaimer Component
export function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" description="Effective Date: July 6, 2026">
      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">No Professional Financial Advice</h2>
      <p>
        The templates, calculators, totals, and suggestions provided by InvoiceCraft are meant exclusively for general administrative reference. This application does not constitute professional tax, accounting, audit, or banking advice.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Accuracy of Totals</h2>
      <p>
        While we make every effort to double-check our mathematical formulas for rounding, itemized multiplication, tax calculations, and discount percentages, we do not accept liability for any billing discrepancies, accounting errors, or missed revenues resulting from invoices generated using this software. Always review the final PDF print layout before sending documents to clients.
      </p>

      <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Third-Party Advertisements</h2>
      <p>
        The display of advertisements does not imply endorsement of any product or service. InvoiceCraft has no responsibility for the contents of external ads displayed through the Google AdSense network.
      </p>
    </LegalLayout>
  );
}
