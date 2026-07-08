import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// 1. LAZY LOADING COMPONENT SPLITTING
const HomePage = lazy(() => import('../pages/HomePage'));
const InvoiceGenerator = lazy(() => import('../pages/InvoiceGenerator'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const Blog = lazy(() => import('../pages/Blog'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const CookiePolicyPage = lazy(() => import('../pages/CookiePolicyPage'));
const DisclaimerPage = lazy(() => import('../pages/DisclaimerPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Elegant loading state skeleton matching InvoiceCraft branding
function RouteLoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center py-12" id="route-loading-fallback">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Pulsing glow ring */}
        <div className="absolute h-full w-full animate-ping rounded-full bg-blue-100 opacity-75 dark:bg-blue-950/40"></div>
        {/* Spin cycle indicator */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400"></div>
      </div>
      <p className="mt-4 font-sans text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-500 animate-pulse">
        Securing session layout...
      </p>
    </div>
  );
}

// Intercepts older query parameters (e.g. ?view=generator, ?blog=slug) and redirects them to the new clean router paths
export default function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');
    const blog = searchParams.get('blog');
    const draft = searchParams.get('draft');

    if (view) {
      if (view === 'generator' || view === 'invoice') {
        navigate(draft ? `/generator?draft=${encodeURIComponent(draft)}` : '/generator', { replace: true });
      } else if (view === 'faq') {
        navigate('/faq', { replace: true });
      } else if (view === 'about') {
        navigate('/about', { replace: true });
      } else if (view === 'contact') {
        navigate('/contact', { replace: true });
      } else if (view === 'privacy') {
        navigate('/privacy', { replace: true });
      } else if (view === 'terms') {
        navigate('/terms', { replace: true });
      } else if (view === 'cookie') {
        navigate('/cookie', { replace: true });
      } else if (view === 'disclaimer') {
        navigate('/disclaimer', { replace: true });
      } else if (view === 'blog') {
        if (blog) {
          navigate(`/blog/${blog}`, { replace: true });
        } else {
          navigate('/blog', { replace: true });
        }
      } else if (view === 'home') {
        navigate('/', { replace: true });
      }
    } else if (blog) {
      navigate(`/blog/${blog}`, { replace: true });
    } else if (draft && (location.pathname === '/' || location.pathname === '')) {
      navigate(`/generator?draft=${encodeURIComponent(draft)}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Suspense fallback={<RouteLoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<InvoiceGenerator />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookie" element={<CookiePolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
