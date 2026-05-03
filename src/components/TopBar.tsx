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
          <img src="/logo.png" alt="Spark logo" className="h-8 w-auto object-contain" />
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link href={`/${lang}/methodology`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
            {t.nav.methodology}
          </Link>
          <Link href={`/${lang}/articles`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
            {t.nav.articles || "Fræðsluefni"}
          </Link>
          <Link href={`/${lang}#pricing`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
            {t.nav.pricing || "Verðskrá"}
          </Link>
          <Link href={`/${lang}#faq`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
            {t.nav.faq || "Spurningar"}
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <LanguageSwitcher />
            </li>
            <li>
              {loading ? (
                <span className="text-outline text-sm font-medium opacity-50">{t.common.loading}</span>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Link href={`/${lang}/dashboard`} className="text-on-surface-variant font-semibold hover:text-primary transition-colors text-sm">
                    {t.nav.dashboard}
                  </Link>
                  <Link href={`/${lang}/profile`} className="bg-surface-variant text-on-surface-variant p-2 rounded-full hover:bg-surface-dim transition-colors flex items-center justify-center" title="Minn Prófíll">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </Link>
                </div>
              ) : (
                <Link href={`/${lang}/login`} className="bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm">
                  {t.login.loginBtn}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
