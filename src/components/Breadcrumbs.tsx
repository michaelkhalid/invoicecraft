import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't render breadcrumbs on homepage
  if (pathname === '/' || pathname === '') {
    return null;
  }

  // Define breadcrumb item interface
  interface BreadcrumbItem {
    label: string;
    path: string;
    isLast: boolean;
  }

  const items: BreadcrumbItem[] = [{ label: 'Home', path: '/', isLast: false }];

  if (pathname === '/generator') {
    items.push({ label: 'Invoice Generator', path: '/generator', isLast: true });
  } else if (pathname === '/about') {
    items.push({ label: 'About Us', path: '/about', isLast: true });
  } else if (pathname === '/contact') {
    items.push({ label: 'Contact Support', path: '/contact', isLast: true });
  } else if (pathname === '/faq') {
    items.push({ label: 'Help & FAQs', path: '/faq', isLast: true });
  } else if (pathname === '/blog') {
    items.push({ label: 'Blog', path: '/blog', isLast: true });
  } else if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/blog/')[1];
    items.push({ label: 'Blog', path: '/blog', isLast: false });
    
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (post) {
      items.push({ label: post.title, path: `/blog/${slug}`, isLast: true });
    } else {
      items.push({ label: 'Post', path: pathname, isLast: true });
    }
  } else if (pathname === '/privacy') {
    items.push({ label: 'Privacy Policy', path: '/privacy', isLast: true });
  } else if (pathname === '/terms') {
    items.push({ label: 'Terms of Service', path: '/terms', isLast: true });
  } else if (pathname === '/cookie') {
    items.push({ label: 'Cookie Policy', path: '/cookie', isLast: true });
  } else if (pathname === '/disclaimer') {
    items.push({ label: 'Disclaimer Notice', path: '/disclaimer', isLast: true });
  } else {
    items.push({ label: 'Error 404', path: pathname, isLast: true });
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 print:hidden"
      id="seo-breadcrumbs"
    >
      <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs font-medium text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isFirst = index === 0;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {!isFirst && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" aria-hidden="true" />
              )}
              {item.isLast ? (
                <span 
                  className="truncate max-w-[180px] sm:max-w-[320px] text-slate-800 dark:text-slate-200 font-semibold"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 rounded-sm"
                >
                  {isFirst && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
