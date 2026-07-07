import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactPage() {
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

  const businessHours = [
    { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM PST' },
    { days: 'Saturday', hours: '10:00 AM – 4:00 PM PST' },
    { days: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="contact-page">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-400">
          Get in Touch
        </span>
        <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Contact Our Billing Support Team
        </h1>
        <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
          Have questions, feedback, or custom feature proposals? We would love to hear from you. Our support desk replies within 24 hours.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Sidebar Info - 5 cols */}
        <div className="space-y-8 lg:col-span-5">
          {/* Contact Details */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950 space-y-6">
            <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white mb-4">Contact Information</h2>
            
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

          {/* Business Hours Panel */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Business Hours</h2>
            </div>
            <div className="space-y-3">
              {businessHours.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0 dark:border-slate-900">
                  <span className="font-sans text-sm text-slate-600 dark:text-slate-400">{item.days}</span>
                  <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Visual Placeholder */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">HQ Map Location</span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-blue-600 dark:text-blue-400">
                <Navigation className="h-3 w-3" /> 37.7925° N, 122.4014° W
              </span>
            </div>
            {/* Interactive/Visual Map Frame container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4 border border-slate-200 dark:border-slate-800">
              <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-950/40" />
              <div className="relative z-10 text-center space-y-2">
                <div className="mx-auto h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md animate-pulse">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-xs font-bold text-slate-900 dark:text-white">InvoiceCraft San Francisco</h3>
                <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400">100 Pine Street, Financial District</p>
                <div className="inline-flex rounded-lg bg-white px-3 py-1 text-[10px] font-bold text-slate-700 shadow-xs hover:bg-slate-50 dark:bg-slate-850 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800">
                  Interactive View Pending API Key
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - 7 cols */}
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs lg:col-span-7 dark:border-slate-800 dark:bg-slate-950">
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
                Thank you for your response! We have saved your feedback and our support team will get back to you shortly at the email address provided.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg bg-slate-100 px-4 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Support Inquiry Form">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Your Name <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    aria-required="true"
                    aria-label="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Email Address <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    aria-required="true"
                    aria-label="Your email address"
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
                  aria-label="Subject of your message"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                  placeholder="Feature request, support, partnership, etc."
                />
              </div>

              <div>
                <label htmlFor="message-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Message Content <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message-input"
                  rows={5}
                  required
                  aria-required="true"
                  aria-label="Content of your inquiry message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-sans text-sm outline-hidden transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                  placeholder="How can our financial tools team help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 active:scale-98 disabled:opacity-50 cursor-pointer"
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
