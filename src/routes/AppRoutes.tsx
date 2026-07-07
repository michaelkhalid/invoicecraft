import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import InvoiceGenerator from '../pages/InvoiceGenerator';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import FAQPage from '../pages/FAQPage';
import Blog from '../pages/Blog';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import CookiePolicyPage from '../pages/CookiePolicyPage';
import DisclaimerPage from '../pages/DisclaimerPage';
import NotFoundPage from '../pages/NotFoundPage';

// Intercepts older query parameters (e.g. ?view=generator, ?blog=slug) and redirects them to the new clean router paths
function LegacyQueryRedirector({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <LegacyQueryRedirector>
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
    </LegacyQueryRedirector>
  );
}
