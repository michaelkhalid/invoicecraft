import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { getArticles } from '../blog/data/articles';

export default function SEOManager() {
  const location = useLocation();

  useEffect(() => {
    const siteName = 'InvoiceCraft';
    const baseUrl = 'https://invoicecraft.co';
    const canonicalUrl = `${baseUrl}${location.pathname}`;

    // 1. DEFAULT METADATA VALUES
    let title = 'InvoiceCraft - Free Invoice Generator for Freelancers & SMBs';
    let description = 'Create, preview, and download professional vector invoices instantly. No registration, no watermarks, 100% free client-side generator.';
    let keywords = 'invoice generator, free invoicing, invoice template, freelancer billing, billing software, client invoice, free invoice maker';
    let robots = 'index, follow';
    let author = 'InvoiceCraft Team';
    let themeColor = '#2563eb';
    let ogType = 'website';
    let ogImage = `${baseUrl}/icon.svg`; // High-resolution SVG acting as our open graph visual reference
    let pageName = 'Home';

    // Breadcrumbs hierarchy data structure
    const breadcrumbList = [
      { name: 'Home', url: `${baseUrl}/` }
    ];

    // Page-specific schema variables
    let pageSpecificSchema: any = null;

    // 2. ROUTE MATCHING & DYNAMIC META DATA SEEDING
    if (location.pathname === '/generator') {
      title = 'Free Invoice Generator - Create PDF Invoices Offline | InvoiceCraft';
      description = 'Complete professional invoices in under 60 seconds. Add unlimited products, calculate taxes, discounts, shipping, and export clean A4 PDFs.';
      keywords = 'online invoice maker, invoice creator, pdf invoice generator, offline invoice tool, free billing template, invoice craft generator';
      pageName = 'Invoice Generator';
      breadcrumbList.push({ name: 'Invoice Generator', url: `${baseUrl}/generator` });

      // SoftwareApplication Schema
      pageSpecificSchema = {
        '@type': 'SoftwareApplication',
        '@id': `${baseUrl}/generator#software`,
        'name': 'InvoiceCraft Invoice Generator',
        'operatingSystem': 'All',
        'applicationCategory': 'BusinessApplication',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '1420'
        }
      };
    } else if (location.pathname === '/about') {
      title = 'About InvoiceCraft - Our Privacy-First Invoicing Mission';
      description = 'Learn why we built our free, open-source invoice generator, and our strict privacy-first local storage policy.';
      keywords = 'about invoicecraft, privacy-first invoice, open source billing, invoice software mission, invoicecraft team';
      pageName = 'About Us';
      breadcrumbList.push({ name: 'About Us', url: `${baseUrl}/about` });
    } else if (location.pathname === '/contact') {
      title = 'Contact Support & Feedback Desk | InvoiceCraft';
      description = 'Have custom feature requests, business queries, or suggestions? Fill in our contact sheet to connect with our developers.';
      keywords = 'contact invoicecraft, support desk, invoicing help, feature request, invoice support';
      pageName = 'Contact Support';
      breadcrumbList.push({ name: 'Contact Support', url: `${baseUrl}/contact` });
    } else if (location.pathname === '/faq') {
      title = 'Invoicing FAQs - Printing Help & Data Privacy | InvoiceCraft';
      description = 'Frequently Asked Questions about our secure browser storage, downloading A4 vectors, and formatting standard currency tables.';
      keywords = 'invoicing faq, invoice help, pdf printing settings, multi currency billing, invoice templates help';
      pageName = 'Frequently Asked Questions';
      breadcrumbList.push({ name: 'Help & FAQs', url: `${baseUrl}/faq` });

      // FAQ Schema dynamically loaded from source FAQ page questions and answers
      const FAQs = [
        {
          q: 'Do I need to create an account or log in to use InvoiceCraft?',
          a: 'Absolutely not. We believe in zero friction. You can create, preview, print, and export high-resolution professional invoices in under 60 seconds the moment you open our webpage, completely free without registering.'
        },
        {
          q: 'How is this invoice generator completely free? Are there watermarks?',
          a: 'InvoiceCraft is 100% free with no watermarks, branding labels, or locked fields. We monetize our platform through highly standard, non-disruptive, policy-compliant display ads provided by Google AdSense.'
        },
        {
          q: 'Is my billing information secure? Where are my client details stored?',
          a: 'We operate under a strict privacy-first policy. We do not store, view, or process your client details, price tags, or invoice numbers on any cloud server. All information is encrypted and stored purely inside your web browser’s local storage.'
        },
        {
          q: 'Can I access my draft invoices on another computer or mobile phone?',
          a: 'Because we prioritize privacy by storing everything locally in your active web browser, invoices do not automatically synchronize to other devices. However, you can use our built-in "Share Invoice" feature, which compiles the invoice into a portable secure link that you can open on any device to retrieve the exact same draft.'
        },
        {
          q: 'How do I download my invoice as a clean PDF document?',
          a: 'Simply click the "Print / Download PDF" button on the generator. This will trigger your browser’s native print dialog. In the printer destination settings, choose "Save as PDF" instead of your physical printer. Our stylesheet is custom-tailored for A4/Letter size to automatically strip away web buttons and headers, rendering a pristine, high-res PDF.'
        },
        {
          q: 'My PDF has website headers and page numbers on the margins. How do I remove them?',
          a: 'When your browser’s system print prompt opens, click on "More Settings" or "Options" and make sure the "Headers and Footers" checkbox is unchecked. This will remove any default browser timestamp, URL, or page numbers, leaving your invoice 100% clean.'
        },
        {
          q: 'Can I create invoices in different currencies and languages?',
          a: 'Yes! We have built a dynamic Currency Selector that supports USD ($), EUR (€), GBP (£), JPY (¥), CAD (C$), AUD (A$), and many other global currencies. You can also customize all labels to translate your invoice directly for international clients.'
        }
      ];

      pageSpecificSchema = {
        '@type': 'FAQPage',
        'mainEntity': FAQs.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      };
    } else if (location.pathname === '/blog') {
      title = 'InvoiceCraft Blog - Invoice Guides, Tax Tips & Accounting';
      description = 'Professional guidelines for self-employed taxes, invoice structuring, payment terms, and client communication metrics.';
      keywords = 'freelance accounting blog, invoicing guide, self employed taxes, invoice best practices, billing tips';
      pageName = 'Blog';
      breadcrumbList.push({ name: 'Blog', url: `${baseUrl}/blog` });
    } else if (location.pathname.startsWith('/blog/')) {
      const slug = location.pathname.split('/blog/')[1];
      pageName = 'Blog Post';
      breadcrumbList.push({ name: 'Blog', url: `${baseUrl}/blog` });

      if (slug) {
        // Query the new professional articles first, fall back to legacy blog posts
        const articles = getArticles();
        const activeArticle = articles.find(p => p.slug === slug);
        const legacyPost = BLOG_POSTS.find(p => p.slug === slug);

        if (activeArticle) {
          title = activeArticle.seoTitle || `${activeArticle.title} | InvoiceCraft Blog`;
          description = activeArticle.description;
          keywords = (activeArticle.keywords && activeArticle.keywords.join(', ')) || (activeArticle.tags && activeArticle.tags.join(', ')) || 'invoice, blog';
          author = activeArticle.author.name;
          ogType = 'article';
          ogImage = activeArticle.featuredImage;
          pageName = activeArticle.title;
          breadcrumbList.push({ name: activeArticle.title, url: `${baseUrl}/blog/${slug}` });

          // Dynamic Date formatting helper for SEO compliance
          const isoPublish = new Date(activeArticle.publishedDate).toISOString();
          const isoUpdate = new Date(activeArticle.updatedDate).toISOString();

          // BlogPosting Schema
          pageSpecificSchema = {
            '@type': 'BlogPosting',
            '@id': `${baseUrl}/blog/${slug}#entry`,
            'headline': activeArticle.title,
            'description': activeArticle.description,
            'image': activeArticle.featuredImage,
            'datePublished': isoPublish,
            'dateModified': isoUpdate,
            'author': {
              '@type': 'Person',
              'name': activeArticle.author.name,
              'jobTitle': activeArticle.author.role,
              'image': activeArticle.author.avatar
            },
            'publisher': {
              '@type': 'Organization',
              'name': siteName,
              'logo': {
                '@type': 'ImageObject',
                'url': `${baseUrl}/icon.svg`
              }
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `${baseUrl}/blog/${slug}`
            }
          };

          // If the article features FAQs, inject FAQPage schema seamlessly as a child node
          if (activeArticle.faq && activeArticle.faq.length > 0) {
            const articleFaqsSchema = {
              '@type': 'FAQPage',
              '@id': `${baseUrl}/blog/${slug}#faqs`,
              'mainEntity': activeArticle.faq.map(f => ({
                '@type': 'Question',
                'name': f.question,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': f.answer
                }
              }))
            };
            // Set pageSpecificSchema as an array of schemas if FAQ exists
            pageSpecificSchema = [pageSpecificSchema, articleFaqsSchema];
          }

        } else if (legacyPost) {
          title = `${legacyPost.title} | InvoiceCraft Blog`;
          description = legacyPost.summary;
          keywords = legacyPost.tags.join(', ') + ', invoice blog, freelance tax compliance';
          author = legacyPost.author.name;
          ogType = 'article';
          ogImage = legacyPost.image;
          pageName = legacyPost.title;
          breadcrumbList.push({ name: legacyPost.title, url: `${baseUrl}/blog/${slug}` });

          // BlogPosting Schema
          pageSpecificSchema = {
            '@type': 'BlogPosting',
            '@id': `${baseUrl}/blog/${slug}#entry`,
            'headline': legacyPost.title,
            'description': legacyPost.summary,
            'image': legacyPost.image,
            'datePublished': '2026-07-02T09:00:00Z',
            'dateModified': '2026-07-06T18:00:00Z',
            'author': {
              '@type': 'Person',
              'name': legacyPost.author.name,
              'jobTitle': legacyPost.author.role,
              'image': legacyPost.author.avatar
            },
            'publisher': {
              '@type': 'Organization',
              'name': siteName,
              'logo': {
                '@type': 'ImageObject',
                'url': `${baseUrl}/icon.svg`
              }
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `${baseUrl}/blog/${slug}`
            }
          };
        }
      }
    } else if (location.pathname === '/privacy') {
      title = 'GDPR Privacy Policy - Secure Local Storage | InvoiceCraft';
      description = 'Read how we protect your invoice numbers, customer emails, and totals with a strict local storage only policy.';
      keywords = 'privacy policy, gdpr compliance, local storage security, client data privacy';
      pageName = 'Privacy Policy';
      breadcrumbList.push({ name: 'Privacy Policy', url: `${baseUrl}/privacy` });
    } else if (location.pathname === '/terms') {
      title = 'Terms & Conditions of Service | InvoiceCraft';
      description = 'Review our free-use licensing, calculations liability disclaimer, and billing template service guidelines.';
      keywords = 'terms of service, user agreement, invoice license, refund policy, software license';
      pageName = 'Terms of Service';
      breadcrumbList.push({ name: 'Terms of Service', url: `${baseUrl}/terms` });
    } else if (location.pathname === '/cookie') {
      title = 'Cookie Policy - Contextual Ads & Preferences | InvoiceCraft';
      description = 'Detailed breakdown of necessary drafting cookies and Google AdSense tracking identifiers used.';
      keywords = 'cookie policy, ad tracking, preference cookies, browser cache storage';
      pageName = 'Cookie Policy';
      breadcrumbList.push({ name: 'Cookie Policy', url: `${baseUrl}/cookie` });
    } else if (location.pathname === '/disclaimer') {
      title = 'Disclaimer Notice - Financial & Tax Estimates | InvoiceCraft';
      description = 'Financial advice liability disclaimer and tax calculations reference disclaimer for InvoiceCraft.';
      keywords = 'legal disclaimer, financial disclaimer, tax estimate notice, business calculations liability';
      pageName = 'Disclaimer Notice';
      breadcrumbList.push({ name: 'Disclaimer Notice', url: `${baseUrl}/disclaimer` });
    } else {
      // 404 Page Metadata
      title = 'Page Not Found (404 Error) | InvoiceCraft';
      description = 'The requested page could not be found. Check the URL or return to our free invoice generator.';
      keywords = '404 error, page not found, missing link';
      robots = 'noindex, follow'; // Prevent search crawlers indexing 404 entry routes
      pageName = 'Error 404';
      breadcrumbList.push({ name: 'Error 404', url: `${baseUrl}${location.pathname}` });
    }

    // 3. SET WINDOW TITLE & HEAD METATAGS
    document.title = title;

    // Helper to dynamically set standard meta attributes
    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // Standard Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', robots);
    setMeta('name', 'author', author);
    setMeta('name', 'theme-color', themeColor);

    // Open Graph Social Meta Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', siteName);

    // Twitter Social Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 4. AUTOMATED CANONICAL LINK UPDATING
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. INJECT HIGHLY COMPLIANT JSON-LD SCHEMA OBJECTS
    // Organization Schema
    const organizationSchema = {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      'name': siteName,
      'url': baseUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/icon.svg`
      },
      'description': 'Create professional invoices in seconds. Free, responsive, offline-first invoice generator.',
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        'email': 'michaelkhalid2999@gmail.com'
      },
      'sameAs': [
        'https://github.com', // Verification placeholder social channels
        'https://twitter.com'
      ]
    };

    // Website Schema (with Google SearchBox capability)
    const websiteSchema = {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      'name': siteName,
      'url': baseUrl,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${baseUrl}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    // WebPage Schema representation of the active document
    const webPageSchema = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      'url': canonicalUrl,
      'name': title,
      'description': description,
      'isPartOf': { '@id': `${baseUrl}/#website` },
      'about': { '@id': `${baseUrl}/#organization` }
    };

    // BreadcrumbList Schema for the active trail
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      'itemListElement': breadcrumbList.map((item, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': item.name,
        'item': item.url
      }))
    };

    // Construct the structured graph payload array
    const graphPayload = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        websiteSchema,
        webPageSchema,
        breadcrumbSchema
      ]
    };

    // If we have a page-specific schema, push it to our graph list
    if (pageSpecificSchema) {
      graphPayload['@graph'].push({
        '@context': 'https://schema.org',
        ...pageSpecificSchema
      } as any);
    }

    // Clean existing schema markup script to avoid stack aggregation
    const existingScript = document.getElementById('seo-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    // Inject fresh consolidated JSON-LD Script block inside <head>
    const script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(graphPayload);
    document.head.appendChild(script);

  }, [location]);

  return null;
}
