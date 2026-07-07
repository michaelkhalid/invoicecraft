import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';

export default function SEOManager() {
  const location = useLocation();

  useEffect(() => {
    let title = 'InvoiceCraft - Create Professional Invoices in Seconds';
    let description = 'Create, preview, and download professional vector invoices instantly. No registration, no watermarks, 100% free client-side generator.';
    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    if (location.pathname === '/generator') {
      title = 'Free Invoice Generator - Create PDF Invoices Offline | InvoiceCraft';
      description = 'Complete professional invoices in under 60 seconds. Add unlimited products, calculate taxes, discounts, shipping, and export clean A4 PDFs.';
    } else if (location.pathname === '/about') {
      title = 'About InvoiceCraft - Our Mission and Philosophy';
      description = 'Learn why we built our free, open-source invoice generator, and our strict privacy-first local storage policy.';
    } else if (location.pathname === '/contact') {
      title = 'Contact Support & Feedback Desk | InvoiceCraft';
      description = 'Have custom feature requests, business queries, or suggestions? Fill in our contact sheet to connect with our developers.';
    } else if (location.pathname === '/faq') {
      title = 'Invoicing FAQs - Printing Help & Data Privacy | InvoiceCraft';
      description = 'Frequently Asked Questions about our secure browser storage, downloading A4 vectors, and formatting standard currency tables.';
    } else if (location.pathname.startsWith('/blog')) {
      const slug = location.pathname.split('/blog/')[1];
      if (slug) {
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          title = `${post.title} | InvoiceCraft Blog`;
          description = post.summary;
        }
      } else {
        title = 'InvoiceCraft Blog - Invoice Guides, Tax Tips & Accounting';
        description = 'Professional guidelines for self-employed taxes, invoice structuring, payment terms, and client communication metrics.';
      }
    } else if (location.pathname === '/privacy') {
      title = 'GDPR Privacy Policy - Secure Local Storage | InvoiceCraft';
      description = 'Read how we protect your invoice numbers, customer emails, and totals with a strict local storage only policy.';
    } else if (location.pathname === '/terms') {
      title = 'Terms & Conditions of Service | InvoiceCraft';
      description = 'Review our free-use licensing, calculations liability disclaimer, and billing template service guidelines.';
    } else if (location.pathname === '/cookie') {
      title = 'Cookie Policy - Contextual Ads & Preferences | InvoiceCraft';
      description = 'Detailed breakdown of necessary drafting cookies and Google AdSense tracking identifiers used.';
    } else if (location.pathname === '/disclaimer') {
      title = 'Disclaimer Notice - Financial & Tax Estimates | InvoiceCraft';
      description = 'Financial advice liability disclaimer and tax calculations reference disclaimer for InvoiceCraft.';
    }

    // Set Document Title
    document.title = title;

    // Set Document Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Set Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [location]);

  return null;
}
