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
          <div className="bg-slate-900 h-10 w-10 flex items-center justify-center rounded-[12px] shadow-sm overflow-hidden">
            <img src="/spark-icon.png" alt="" className="h-8 w-8 object-contain mix-blend-screen" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-violet-600">Spark</span>
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
