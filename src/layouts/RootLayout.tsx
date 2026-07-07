import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface RootLayoutProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function RootLayout({ darkMode, onToggleDarkMode }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300" id="invoicecraft-root">
      <Header darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
