'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useTranslation } from './DictionaryProvider';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopBar() {
  const { user, loading } = useAuth();
  const { t, lang } = useTranslation();

  return (
    <header className="py-4 border-b border-surface-variant bg-white/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <img src="/logo.png" alt="Spark AI" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="flex items-center gap-4">
          <LanguageSwitcher />
          {loading ? (
            <span className="text-outline text-sm font-medium opacity-50">{t.common.loading}</span>
          ) : user ? (
            <Link href={`/${lang}/dashboard`} className="bg-surface-variant text-on-surface-variant px-4 py-2 rounded-xl font-semibold hover:bg-surface-dim transition-colors text-sm">
              {t.nav.dashboard}
            </Link>
          ) : (
            <Link href={`/${lang}/login`} className="bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm">
              {t.login.loginBtn}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
