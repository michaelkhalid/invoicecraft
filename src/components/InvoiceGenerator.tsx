import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Printer, RotateCcw, Share2, Copy, FileText, Check, Download, QrCode, Sparkles, FolderOpen, History, HeartHandshake } from 'lucide-react';
import { Invoice, InvoiceItem } from '../types';
import AdSensePlaceholder from './AdSensePlaceholder';

// Supported Currencies
const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
];

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India',
  'Singapore', 'Netherlands', 'South Africa', 'New Zealand', 'Switzerland', 'Brazil', 'Mexico', 'Spain'
];

const INITIAL_ITEM = (): InvoiceItem => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
  description: '',
  quantity: 1,
  price: 0,
});

const INITIAL_INVOICE = (): Invoice => {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  return {
    id: Date.now().toString(),
    invoiceNumber: 'INV-' + new Date().getFullYear() + '-001',
    invoiceDate: today,
    dueDate: thirtyDaysLater,
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companyLogo: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    currency: 'USD',
    country: 'United States',
    items: [
      { id: 'item-1', description: 'Consulting Services / Hours', quantity: 10, price: 150 },
      { id: 'item-2', description: 'SaaS Platform Deployment & Integration', quantity: 1, price: 1200 }
    ],
    taxRate: 10,
    discountRate: 5,
    shippingFee: 0,
    notes: 'Thank you for your business. Payment is requested within 30 days of invoice date.',
    paymentTerms: 'Net 30',
    bankName: '',
    bankAccount: '',
    paymentStatus: 'Unpaid',
  };
};

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<Invoice>(INITIAL_INVOICE());
  const [savedInvoices, setSavedInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showHistory, setShowHistory] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedData, setCopiedData] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Load state and shared invoice if available on initial mount
  useEffect(() => {
    // 1. Try to load list of saved invoices from localStorage
    const saved = localStorage.getItem('invoicecraft_history');
    if (saved) {
      try {
        setSavedInvoices(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }

    // 2. Check if a shared invoice is inside the URL params
    const searchParams = new URLSearchParams(window.location.search);
    const sharedData = searchParams.get('draft');
    if (sharedData) {
      try {
        const decoded = decodeURIComponent(escape(atob(sharedData)));
        const parsed = JSON.parse(decoded) as Invoice;
        setInvoice(parsed);
        // Clear param to avoid sticky URL reloading the same data on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error('Failed to decode shared draft', e);
      }
    } else {
      // Load last unsaved draft if it exists
      const lastDraft = localStorage.getItem('invoicecraft_active_draft');
      if (lastDraft) {
        try {
          setInvoice(JSON.parse(lastDraft));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Sync active draft to Local Storage on invoice changes
  useEffect(() => {
    localStorage.setItem('invoicecraft_active_draft', JSON.stringify(invoice));
    
    // Generate active share url
    try {
      const str = JSON.stringify(invoice);
      const encoded = btoa(unescape(encodeURIComponent(str)));
      setShareUrl(`${window.location.origin}${window.location.pathname}?draft=${encoded}`);
    } catch (e) {
      console.error(e);
    }
  }, [invoice]);

  // Save changes to overall invoice list
  const saveInvoiceToHistory = () => {
    const isNew = !savedInvoices.some(inv => inv.id === invoice.id);
    let updated: Invoice[];
    if (isNew) {
      updated = [invoice, ...savedInvoices];
    } else {
      updated = savedInvoices.map(inv => inv.id === invoice.id ? invoice : inv);
    }
    setSavedInvoices(updated);
    localStorage.setItem('invoicecraft_history', JSON.stringify(updated));
    alert('Invoice saved successfully to your browser history!');
  };

  const loadSavedInvoice = (inv: Invoice) => {
    setInvoice(inv);
    setShowHistory(false);
  };

  const deleteSavedInvoice = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to remove this saved invoice?')) return;
    const updated = savedInvoices.filter(inv => inv.id !== id);
    setSavedInvoices(updated);
    localStorage.setItem('invoicecraft_history', JSON.stringify(updated));
  };

  const handleResetForm = () => {
    if (confirm('Are you sure you want to clear this entire invoice? This action cannot be undone.')) {
      setInvoice({
        ...INITIAL_INVOICE(),
        id: Date.now().toString(), // Fresh ID
      });
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const handleDuplicateInvoice = () => {
    const currentNum = invoice.invoiceNumber;
    // Attempt basic invoice number incrementing (e.g. INV-001 -> INV-002)
    const match = currentNum.match(/^(.*?)(\d+)$/);
    let newNum = currentNum + ' (Copy)';
    if (match) {
      const prefix = match[1];
      const digits = match[2];
      const incremented = (parseInt(digits, 10) + 1).toString().padStart(digits.length, '0');
      newNum = `${prefix}${incremented}`;
    }

    setInvoice({
      ...invoice,
      id: Date.now().toString(),
      invoiceNumber: newNum,
    });
    alert(`Duplicated! Created a copy with fresh invoice number: ${newNum}`);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert('File is too large. Please upload an image under 1.5 MB to ensure fast local storage loading.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoice({ ...invoice, companyLogo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setInvoice({ ...invoice, companyLogo: '' });
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  // Form Field Changers
  const updateInvoiceField = (field: keyof Invoice, value: any) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...invoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoice({ ...invoice, items: updatedItems });
  };

  const addItemRow = () => {
    setInvoice({ ...invoice, items: [...invoice.items, INITIAL_ITEM()] });
  };

  const removeItemRow = (index: number) => {
    if (invoice.items.length <= 1) {
      alert('Your invoice must contain at least one item line.');
      return;
    }
    const updatedItems = invoice.items.filter((_, idx) => idx !== index);
    setInvoice({ ...invoice, items: updatedItems });
  };

  // Quick helper dates
  const setQuickDueDate = (days: number) => {
    const baseDate = new Date(invoice.invoiceDate);
    const targetDate = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);
    setInvoice({
      ...invoice,
      dueDate: targetDate.toISOString().split('T')[0],
      paymentTerms: `Net ${days}`
    });
  };

  // Computations
  const activeCurrency = CURRENCIES.find(c => c.code === invoice.currency) || CURRENCIES[0];
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const discountAmount = subtotal * (invoice.discountRate / 100);
  const taxedBase = subtotal - discountAmount;
  const taxAmount = taxedBase * (invoice.taxRate / 100);
  const grandTotal = taxedBase + taxAmount + Number(invoice.shippingFee || 0);

  // Trigger Print Friendly Mode
  const handlePrint = () => {
    window.print();
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyInvoiceJSON = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(invoice, null, 2));
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="invoice-craft-generator">
      {/* Top Header Controls bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 print:hidden">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create Invoice
          </h1>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
            Design, calculate, and download your billing receipts instantly.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* History Toggle Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            <History className="h-4 w-4 text-blue-500" />
            Invoice History ({savedInvoices.length})
          </button>

          <button
            onClick={saveInvoiceToHistory}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            <FolderOpen className="h-4 w-4 text-amber-500" />
            Save Draft
          </button>

          <button
            onClick={handleDuplicateInvoice}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            <Copy className="h-4 w-4 text-emerald-500" />
            Duplicate
          </button>

          <button
            onClick={handleResetForm}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900/40"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* History Drawer Sidebar Overlay */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs print:hidden" onClick={() => setShowHistory(false)}>
          <div
            className="h-full w-full max-w-md bg-white p-6 shadow-2xl dark:bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Saved Invoices</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Close ×
              </button>
            </div>

            {savedInvoices.length === 0 ? (
              <div className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-800" />
                <p className="mt-4 font-sans text-sm text-slate-500 dark:text-slate-400">
                  No invoices saved in your browser yet. Create some drafts and hit "Save Draft"!
                </p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[80%]">
                {savedInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    onClick={() => loadSavedInvoice(inv)}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-blue-100 hover:bg-white dark:border-slate-900 dark:bg-slate-900/30 dark:hover:bg-slate-950"
                  >
                    <div className="space-y-1">
                      <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{inv.invoiceNumber}</p>
                      <p className="font-sans text-xs font-semibold text-slate-900 dark:text-white">{inv.clientName || 'Unnamed Client'}</p>
                      <p className="font-sans text-[10px] text-slate-400">{inv.invoiceDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                        {inv.currency} {inv.items.reduce((s, it) => s + (it.quantity * it.price), 0).toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => deleteSavedInvoice(inv.id, e)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                        title="Delete invoice"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Editor & Preview Toggle (Visible on Mobile only) */}
      <div className="mb-6 flex rounded-lg bg-slate-100 p-1 md:hidden print:hidden dark:bg-slate-900">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 rounded-md py-2 font-sans text-xs font-semibold transition ${
            activeTab === 'editor'
              ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Editor Form
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 rounded-md py-2 font-sans text-xs font-semibold transition ${
            activeTab === 'preview'
              ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          A4 Preview
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* ================= EDITOR GRID PANEL ================= */}
        <div className={`space-y-8 lg:col-span-6 ${activeTab === 'editor' ? 'block' : 'hidden lg:block'} print:hidden`}>
          {/* Section 1: Business Identity & Branding */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-4 font-sans text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/40 dark:text-blue-400">1</span>
              Your Business Details
            </h3>

            <div className="grid gap-6 sm:grid-cols-6">
              {/* Logo Drag & Drop */}
              <div className="sm:col-span-6">
                <label className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Company Branding Logo</label>
                <div className="mt-2 flex items-center gap-4">
                  {invoice.companyLogo ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
                      <img src={invoice.companyLogo} alt="Preview Logo" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                      <button
                        onClick={removeLogo}
                        type="button"
                        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] text-white shadow-xs"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => logoInputRef.current?.click()}
                      className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50"
                    >
                      <Plus className="h-4 w-4 text-slate-400" />
                      <span className="font-sans text-[10px] text-slate-500">Upload Logo</span>
                    </div>
                  )}
                  <div className="text-left">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <p className="font-sans text-[10px] leading-relaxed text-slate-400">
                      Maximum resolution: 600x600px.<br />
                      Allowed formats: PNG, JPG, WebP.<br />
                      Will be embedded offline inside your PDF.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Info Inputs */}
              <div className="sm:col-span-3">
                <label htmlFor="comp-name" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Company Name</label>
                <input
                  id="comp-name"
                  type="text"
                  placeholder="Acme Corp LLC"
                  value={invoice.companyName}
                  onChange={(e) => updateInvoiceField('companyName', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="comp-email" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Billing Email</label>
                <input
                  id="comp-email"
                  type="email"
                  placeholder="billing@acme.com"
                  value={invoice.companyEmail}
                  onChange={(e) => updateInvoiceField('companyEmail', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="comp-address" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Office Address / Registration Details</label>
                <textarea
                  id="comp-address"
                  rows={2}
                  placeholder="100 Pine Street, Suite 400, San Francisco, CA 94111, Tax ID: US12345678"
                  value={invoice.companyAddress}
                  onChange={(e) => updateInvoiceField('companyAddress', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Client Details */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-4 font-sans text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/40 dark:text-blue-400">2</span>
              Client Billing Details
            </h3>

            <div className="grid gap-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="client-name" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Client / Company Name</label>
                <input
                  id="client-name"
                  type="text"
                  placeholder="Global Media Ltd"
                  value={invoice.clientName}
                  onChange={(e) => updateInvoiceField('clientName', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="client-email" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Client Contact Email</label>
                <input
                  id="client-email"
                  type="email"
                  placeholder="finance@globalmedia.com"
                  value={invoice.clientEmail}
                  onChange={(e) => updateInvoiceField('clientEmail', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="client-address" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Billing Address</label>
                <textarea
                  id="client-address"
                  rows={2}
                  placeholder="404 Wall Street, London, EC2N 1HQ, United Kingdom"
                  value={invoice.clientAddress}
                  onChange={(e) => updateInvoiceField('clientAddress', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Metadata, Dates & Currency */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-4 font-sans text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/40 dark:text-blue-400">3</span>
              Invoice Metadata & Setup
            </h3>

            <div className="grid gap-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="invoice-number" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Invoice Number</label>
                <input
                  id="invoice-number"
                  type="text"
                  placeholder="INV-2026-001"
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateInvoiceField('invoiceNumber', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="currency-select" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Currency</label>
                <select
                  id="currency-select"
                  value={invoice.currency}
                  onChange={(e) => updateInvoiceField('currency', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                >
                  {CURRENCIES.map(curr => (
                    <option key={curr.code} value={curr.code}>{curr.code} ({curr.symbol}) - {curr.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="invoice-date" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Invoice Date</label>
                <input
                  id="invoice-date"
                  type="date"
                  value={invoice.invoiceDate}
                  onChange={(e) => updateInvoiceField('invoiceDate', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="due-date" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Due Date</label>
                <input
                  id="due-date"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateInvoiceField('dueDate', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:border-blue-500 dark:focus:bg-slate-950"
                />
              </div>

              {/* Quick Due Date buttons */}
              <div className="sm:col-span-6">
                <span className="block font-sans text-[10px] font-semibold text-slate-400">Quick Term Presets</span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setQuickDueDate(0)} className="rounded-lg bg-slate-100 px-2.5 py-1 font-sans text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">Due on receipt</button>
                  <button type="button" onClick={() => setQuickDueDate(7)} className="rounded-lg bg-slate-100 px-2.5 py-1 font-sans text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">Net 7 Days</button>
                  <button type="button" onClick={() => setQuickDueDate(15)} className="rounded-lg bg-slate-100 px-2.5 py-1 font-sans text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">Net 15 Days</button>
                  <button type="button" onClick={() => setQuickDueDate(30)} className="rounded-lg bg-slate-100 px-2.5 py-1 font-sans text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">Net 30 Days</button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Line Items list */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/40 dark:text-blue-400">4</span>
                Line Items & Services
              </h3>
              <button
                type="button"
                onClick={addItemRow}
                className="flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 font-sans text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {invoice.items.map((item, idx) => (
                <div key={item.id} className="flex gap-3 items-end border-b border-slate-50 pb-4 dark:border-slate-900">
                  <div className="flex-1 space-y-1">
                    <label htmlFor={`item-desc-${idx}`} className="block font-sans text-[10px] font-semibold text-slate-400">Item Name / Description</label>
                    <input
                      id={`item-desc-${idx}`}
                      type="text"
                      placeholder="UI Development / Consulting"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                    />
                  </div>
                  <div className="w-16 space-y-1">
                    <label htmlFor={`item-qty-${idx}`} className="block font-sans text-[10px] font-semibold text-slate-400">Qty</label>
                    <input
                      id={`item-qty-${idx}`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-sans text-xs outline-hidden text-center focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                    />
                  </div>
                  <div className="w-24 space-y-1">
                    <label htmlFor={`item-price-${idx}`} className="block font-sans text-[10px] font-semibold text-slate-400">Unit Price</label>
                    <div className="relative">
                      <span className="absolute top-1/2 left-2.5 -translate-y-1/2 font-mono text-[10px] text-slate-400">{activeCurrency.symbol}</span>
                      <input
                        id={`item-price-${idx}`}
                        type="number"
                        min={0}
                        value={item.price}
                        onChange={(e) => handleItemChange(idx, 'price', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pr-3 pl-6 py-2 font-sans text-xs outline-hidden text-right focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItemRow(idx)}
                    className="mb-1 rounded-xl bg-slate-50 p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-900/50 dark:hover:bg-rose-950/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Tax, Discount, Shipping */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-4 font-sans text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/40 dark:text-blue-400">5</span>
              Adjustments, Taxes & Fees
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="tax-rate-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Tax Rate (%)</label>
                <div className="relative mt-1.5">
                  <input
                    id="tax-rate-input"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="10"
                    value={invoice.taxRate}
                    onChange={(e) => updateInvoiceField('taxRate', Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pr-8 pl-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-slate-400">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="discount-rate-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Discount (%)</label>
                <div className="relative mt-1.5">
                  <input
                    id="discount-rate-input"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="5"
                    value={invoice.discountRate}
                    onChange={(e) => updateInvoiceField('discountRate', Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pr-8 pl-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-slate-400">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="shipping-fee-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Shipping / Extra Fee</label>
                <div className="relative mt-1.5">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-xs text-slate-400">{activeCurrency.symbol}</span>
                  <input
                    id="shipping-fee-input"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={invoice.shippingFee}
                    onChange={(e) => updateInvoiceField('shippingFee', Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pr-4 pl-8 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Payments details, bank guidelines & Notes */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-4 font-sans text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/40 dark:text-blue-400">6</span>
              Payment Directives & Notes
            </h3>

            <div className="grid gap-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="bank-name-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Your Bank Name</label>
                <input
                  id="bank-name-input"
                  type="text"
                  placeholder="Chase Bank NA"
                  value={invoice.bankName}
                  onChange={(e) => updateInvoiceField('bankName', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="bank-acc-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Account / IBAN Number</label>
                <input
                  id="bank-acc-input"
                  type="text"
                  placeholder="US12 3456 7890 1234 56"
                  value={invoice.bankAccount}
                  onChange={(e) => updateInvoiceField('bankAccount', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="payment-terms-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Additional Payment Guidelines</label>
                <textarea
                  id="payment-terms-input"
                  rows={2}
                  placeholder="e.g., Wire transfers only. PayPal transfers subject to 3% transaction markup fees."
                  value={invoice.paymentTerms}
                  onChange={(e) => updateInvoiceField('paymentTerms', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="notes-input" className="block font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">Invoice Customer Notes / Greeting</label>
                <textarea
                  id="notes-input"
                  rows={2}
                  value={invoice.notes}
                  onChange={(e) => updateInvoiceField('notes', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 font-sans text-xs outline-hidden focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= LIVE PREVIEW GRID PANEL ================= */}
        <div className={`space-y-6 lg:col-span-6 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          {/* Action Header Tool Buttons for PDF/QR */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950 print:hidden">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-sans text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                Export Center
              </span>

              <div className="flex flex-wrap gap-2">
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 font-sans text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:outline-hidden active:scale-98"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print / Save PDF
                </button>

                {/* QR Modal Trigger */}
                <button
                  onClick={() => setShowQrModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <QrCode className="h-3.5 w-3.5 text-blue-500" />
                  QR Code Pay
                </button>

                {/* Copy Share Link */}
                <button
                  onClick={copyShareLink}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <Share2 className="h-3.5 w-3.5 text-emerald-500" />
                  {copiedLink ? 'Copied URL!' : 'Share Link'}
                </button>

                {/* Raw JSON copy */}
                <button
                  onClick={copyInvoiceJSON}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                  title="Copy Invoice JSON data"
                >
                  <Copy className="h-3.5 w-3.5 text-amber-500" />
                  {copiedData ? 'Copied Data!' : 'Copy Data'}
                </button>
              </div>
            </div>
          </div>

          {/* ================= THE ACTUAL A4 INVOICE CARD ================= */}
          <div 
            className="invoice-print-container relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-md dark:border-slate-800 dark:bg-slate-950 print:border-none print:bg-white print:p-0 print:shadow-none"
            id="a4-printable-sheet"
          >
            {/* Header section */}
            <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-8 sm:flex-row dark:border-slate-900 print:flex-row print:pb-6 print:border-slate-200">
              {/* Left Identity details */}
              <div className="space-y-4">
                {invoice.companyLogo ? (
                  <img
                    src={invoice.companyLogo}
                    alt={invoice.companyName || 'Logo'}
                    className="h-12 max-w-[150px] object-contain print:h-10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white print:h-8 print:w-8">
                    <FileText className="h-5 w-5" />
                  </div>
                )}
                
                <div className="space-y-1">
                  <h2 className="font-sans text-lg font-bold text-slate-900 dark:text-white print:text-base print:text-black">
                    {invoice.companyName || 'YOUR COMPANY NAME'}
                  </h2>
                  <p className="font-sans text-xs text-slate-500 whitespace-pre-line leading-relaxed dark:text-slate-400 print:text-[10px] print:text-slate-600">
                    {invoice.companyAddress || 'Your corporate address, registered state & Tax identifier numbers'}
                  </p>
                  {invoice.companyEmail && (
                    <p className="font-sans text-xs text-slate-400 dark:text-slate-500 print:text-[10px]">
                      {invoice.companyEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Billing code & due meta */}
              <div className="text-left sm:text-right print:text-right space-y-3">
                <span className="font-sans text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white print:text-xl print:text-black">
                  INVOICE
                </span>

                <div className="space-y-1 font-sans text-xs text-slate-600 dark:text-slate-400 print:text-[10px] print:text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-400">Invoice Number:</span>{' '}
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 print:text-black">{invoice.invoiceNumber}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-400">Date Issued:</span>{' '}
                    <span>{invoice.invoiceDate}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-400 text-rose-500 print:text-black">Due Date:</span>{' '}
                    <span className="font-semibold">{invoice.dueDate}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-400">Payment Term:</span>{' '}
                    <span>{invoice.paymentTerms || 'Upon receipt'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bill To section */}
            <div className="my-8 grid gap-6 sm:grid-cols-2 print:my-6 print:grid-cols-2">
              <div className="space-y-1">
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 print:text-[9px]">
                  Bill To
                </p>
                <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white print:text-xs print:text-black">
                  {invoice.clientName || 'CLIENT COMPANY / NAME'}
                </h4>
                <p className="font-sans text-xs leading-relaxed text-slate-500 whitespace-pre-line dark:text-slate-400 print:text-[10px] print:text-slate-600">
                  {invoice.clientAddress || 'Client billing physical workspace or office location details'}
                </p>
                {invoice.clientEmail && (
                  <p className="font-sans text-xs text-slate-400 dark:text-slate-500 print:text-[10px]">
                    {invoice.clientEmail}
                  </p>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="my-8 overflow-x-auto print:my-6">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-900 print:divide-slate-200">
                <thead>
                  <tr className="font-sans text-xs font-semibold text-slate-400 dark:text-slate-500 print:text-[10px]">
                    <th scope="col" className="py-3 text-left">Description</th>
                    <th scope="col" className="px-4 py-3 text-center">Qty</th>
                    <th scope="col" className="px-4 py-3 text-right">Unit Price</th>
                    <th scope="col" className="py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-sans text-xs text-slate-700 dark:divide-slate-900 dark:bg-slate-950 print:divide-slate-100 print:bg-white print:text-[10px] print:text-slate-900">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 font-medium text-slate-900 dark:text-white print:text-black print:py-2">
                        {item.description || 'Description of product or professional service rendered'}
                      </td>
                      <td className="px-4 py-4 text-center font-mono print:py-2">{item.quantity}</td>
                      <td className="px-4 py-4 text-right font-mono print:py-2">
                        {activeCurrency.symbol}{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 text-right font-mono font-semibold text-slate-900 dark:text-white print:text-black print:py-2">
                        {activeCurrency.symbol}{(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations & Bank terms split */}
            <div className="my-8 flex flex-col justify-between gap-6 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-900 print:my-4 print:flex-row print:border-slate-200 print:pt-4">
              {/* Payment Details on Left */}
              <div className="max-w-xs space-y-3 font-sans text-xs leading-relaxed text-slate-500 dark:text-slate-400 print:text-[10px] print:text-slate-600">
                {invoice.bankName && (
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] dark:text-slate-300 print:text-black print:text-[9px]">
                      Bank Details
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white print:text-black">Bank: {invoice.bankName}</p>
                    <p className="font-mono text-slate-700 dark:text-slate-300 print:text-black">Acc/IBAN: {invoice.bankAccount}</p>
                  </div>
                )}

                {invoice.paymentTerms && (
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] dark:text-slate-300 print:text-black print:text-[9px]">
                      Payment Directives
                    </p>
                    <p className="whitespace-pre-line">{invoice.paymentTerms}</p>
                  </div>
                )}
              </div>

              {/* Aggregates on Right */}
              <div className="w-full max-w-xs space-y-2 font-sans text-xs text-slate-600 dark:text-slate-400 print:text-[10px] print:text-slate-700">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-400">Subtotal:</span>
                  <span className="font-mono">{activeCurrency.symbol}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                {invoice.discountRate > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 print:text-black">
                    <span className="font-semibold">Discount ({invoice.discountRate}%):</span>
                    <span className="font-mono">-{activeCurrency.symbol}{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                {invoice.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Tax Rate ({invoice.taxRate}%):</span>
                    <span className="font-mono">+{activeCurrency.symbol}{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                {invoice.shippingFee > 0 && (
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Shipping Fee:</span>
                    <span className="font-mono">+{activeCurrency.symbol}{Number(invoice.shippingFee).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-slate-100 pt-3 dark:border-slate-900 print:border-slate-200">
                  <span className="text-sm font-bold text-slate-900 dark:text-white print:text-black print:text-xs">Grand Total Due:</span>
                  <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400 print:text-black print:text-sm">
                    {invoice.currency} {activeCurrency.symbol}{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes Footer section */}
            {invoice.notes && (
              <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-900 print:mt-4 print:border-slate-200 print:pt-4">
                <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-[8px]">
                  Notes / Thank You Message
                </p>
                <p className="mt-2 font-sans text-xs leading-relaxed text-slate-500 whitespace-pre-line dark:text-slate-400 print:text-[10px] print:text-slate-600 print:mt-1">
                  {invoice.notes}
                </p>
              </div>
            )}

            {/* Bottom Credit watermark tag (Hides on standard print) */}
            <div className="mt-8 flex items-center justify-center gap-1 border-t border-slate-50 pt-4 text-center font-mono text-[9px] text-slate-300 dark:border-slate-900 dark:text-slate-700 print:hidden">
              <HeartHandshake className="h-3 w-3 text-red-400" />
              Generated 100% Free via InvoiceCraft.co
            </div>
          </div>
        </div>
      </div>

      {/* ================= QR MODAL FOR SMART PAYMENTS ================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs print:hidden" onClick={() => setShowQrModal(false)}>
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">Scan & Pay Invoice</h3>
            <p className="mt-2 font-sans text-xs text-slate-500 dark:text-slate-400">
              Share this QR code with your client. They can scan it to open this exact invoice on their mobile phone or laptop.
            </p>

            {/* QR Code image loaded securely from free open API */}
            <div className="my-6 mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`}
                alt="Payment QR Code Link"
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={copyShareLink}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-3 font-sans text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
              >
                {copiedLink ? 'Copied Link!' : 'Copy Share URL'}
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full rounded-xl bg-slate-100 py-3 font-sans text-xs font-semibold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AdSense Placement below generator */}
      <AdSensePlaceholder slot="generator-bottom" format="horizontal" />
    </div>
  );
}
