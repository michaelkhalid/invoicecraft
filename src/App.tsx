import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AppRoutes from './routes/AppRoutes';
import SEOManager from './seo/SEOManager';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Restore theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('invoicecraft_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  return (
    <Router>
      <SEOManager />
      <Routes>
        <Route element={<RootLayout darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />}>
          <Route path="/*" element={<AppRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
}
