import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InvoiceGenerator from './components/InvoiceGenerator';
import Blog from './components/Blog';
import FAQPage, { FAQ_DATA } from './components/FAQPage';
import { AboutPage, ContactPage, PrivacyPolicyPage, TermsPage, CookiePolicyPage, DisclaimerPage } from './components/StaticPages';
import { BLOG_POSTS } from './data/blogData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Parse deep linking and local dark mode on mount
  useEffect(() => {
    // 1. Theme recovery
    const savedTheme = localStorage.getItem('invoicecraft_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // 2. URL routing recovery
    const searchParams = new URLSearchParams(window.location.search);
    const draftParam = searchParams.get('draft');
    const blogParam = searchParams.get('blog');
    const viewParam = searchParams.get('view');

    if (draftParam) {
      setCurrentView('generator');
    } else if (blogParam) {
      setCurrentView('blog');
      setSelectedPostSlug(blogParam);
    } else if (viewParam) {
      setCurrentView(viewParam);
    }
  }, []);

  // Update dark mode class on HTML when state changes
  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('invoicecraft_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('invoicecraft_theme', 'light');
    }
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedPostSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL query parameter without full reload for cleaner SEO linking
    const url = new URL(window.location.href);
    url.searchParams.delete('draft');
    url.searchParams.delete('blog');
    if (view === 'home') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', view);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleNavigateToPost = (slug: string) => {
    setCurrentView('blog');
    setSelectedPostSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('draft');
    url.searchParams.set('blog', slug);
    window.history.pushState({}, '', url.toString());
  };

  // Dynamic Technical SEO Titles, Descriptions & Meta Updates
  useEffect(() => {
    let title = 'InvoiceCraft - Create Professional Invoices in Seconds';
    let description = 'Create, preview, and download professional vector invoices instantly. No registration, no watermarks, 100% free client-side generator.';

    if (currentView === 'generator') {
      title = 'Free Invoice Generator - Create PDF Invoices Offline | InvoiceCraft';
      description = 'Complete professional invoices in under 60 seconds. Add unlimited products, calculate taxes, discounts, shipping, and export clean A4 PDFs.';
    } else if (currentView === 'blog') {
      if (selectedPostSlug) {
        const post = BLOG_POSTS.find(p => p.slug === selectedPostSlug);
        if (post) {
          title = `${post.title} | InvoiceCraft Blog`;
          description = post.summary;
        }
      } else {
        title = 'InvoiceCraft Blog - Invoice Guides, Tax Tips & Accounting';
        description = 'Professional guidelines for self-employed taxes, invoice structuring, payment terms, and client communication metrics.';
      }
    } else if (currentView === 'faq') {
      title = 'Invoicing FAQs - Printing Help & Data Privacy | InvoiceCraft';
      description = 'Frequently Asked Questions about our secure browser storage, downloading A4 vectors, and formatting standard currency tables.';
    } else if (currentView === 'about') {
      title = 'About InvoiceCraft - Our Mission and Philosophy';
      description = 'Learn why we built our free, open-source invoice generator, and our strict privacy-first local storage policy.';
    } else if (currentView === 'contact') {
      title = 'Contact Support & Feedback Desk | InvoiceCraft';
      description = 'Have custom feature requests, business queries, or suggestions? Fill in our contact sheet to connect with our developers.';
    } else if (currentView === 'privacy') {
      title = 'GDPR Privacy Policy - Secure Local Storage | InvoiceCraft';
      description = 'Read how we protect your invoice numbers, customer emails, and totals with a strict local storage only policy.';
    } else if (currentView === 'terms') {
      title = 'Terms & Conditions of Service | InvoiceCraft';
      description = 'Review our free-use licensing, calculations liability disclaimer, and billing template service guidelines.';
    } else if (currentView === 'cookie') {
      title = 'Cookie Policy - Contextual Ads & Preferences | InvoiceCraft';
      description = 'Detailed breakdown of necessary drafting cookies and Google AdSense tracking identifiers used.';
    } else if (currentView === 'disclaimer') {
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
  }, [currentView, selectedPostSlug]);

  // JSON-LD Structured Data Schema Generator
  const getStructuredData = () => {
    const baseWebsite = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'InvoiceCraft',
      'url': window.location.origin,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${window.location.origin}?view=blog&search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    if (currentView === 'home' || currentView === 'generator') {
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'InvoiceCraft',
        'operatingSystem': 'All',
        'applicationCategory': 'BusinessApplication',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'description': 'Create and export professional client-ready invoices in 60 seconds with no signup required and 100% local privacy.',
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '2450'
        }
      };
    }

    if (currentView === 'blog' && selectedPostSlug) {
      const post = BLOG_POSTS.find(p => p.slug === selectedPostSlug);
      if (post) {
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': post.title,
          'image': post.image,
          'genre': post.category,
          'keywords': post.tags.join(','),
          'publisher': {
            '@type': 'Organization',
            'name': 'InvoiceCraft',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
            }
          },
          'datePublished': post.publishedAt,
          'author': {
            '@type': 'Person',
            'name': post.author.name
          },
          'description': post.summary
        };
      }
    }

    if (currentView === 'faq') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': FAQ_DATA.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      };
    }

    return baseWebsite;
  };

  // Render Core Active View Layout
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onNavigateToPost={handleNavigateToPost} />;
      case 'generator':
        return <InvoiceGenerator />;
      case 'blog':
        return (
          <Blog
            onNavigateToPost={handleNavigateToPost}
            selectedPostSlug={selectedPostSlug}
            onClearSlug={() => {
              setSelectedPostSlug('');
              handleNavigate('blog');
            }}
          />
        );
      case 'faq':
        return <FAQPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'cookie':
        return <CookiePolicyPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center" id="404-view">
            <FileText className="h-16 w-16 text-slate-300 dark:text-slate-700 animate-bounce" />
            <h2 className="mt-4 font-sans text-2xl font-black text-slate-900 dark:text-white">404 - Page Missing</h2>
            <p className="mt-2 font-sans text-sm text-slate-500">The invoicing module or legal document could not be located.</p>
            <button
              onClick={() => handleNavigate('home')}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-sans text-xs font-semibold text-white hover:bg-blue-700"
            >
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300" id="invoicecraft-root">
      {/* Dynamic Schema.org structured data injection */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>

      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow">
        {renderActiveView()}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onNavigateToPost={handleNavigateToPost}
      />
    </div>
  );
}
