'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createParentDocument } from '@/lib/db';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/components/DictionaryProvider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t, lang } = useTranslation();

  useEffect(() => {
    if (!loading && user) {
      router.push(`/${lang}/dashboard`);
    }
  }, [user, loading, router, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createParentDocument(userCredential.user.uid, userCredential.user.email, Timestamp.now());
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push(`/${lang}/dashboard`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t.common.error);
      }
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <span className="text-outline">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <>
      {/* Top Navigation (Shell Implementation) */}
      <header className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
          <span className="text-2xl font-black tracking-tighter text-violet-600 dark:text-violet-400">Spark</span>
        </div>
        <div className="flex gap-4 items-center">
          <LanguageSwitcher />
          <Link href={`/${lang}/join`} className="text-slate-500 dark:text-slate-400 font-semibold text-sm hover:text-violet-500 transition-all flex items-center">
            {t.nav.childJoin}
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12 relative">
        {/* Illustrative Side Elements (Hidden on small screens) */}
        <div className="hidden xl:block fixed left-12 top-1/2 -translate-y-1/2 w-64 h-96 glass-card rounded-[32px] p-6 rotate-[-6deg] opacity-40 pointer-events-none">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-fixed to-secondary-fixed/30 p-4">
            <div className="h-4 w-2/3 bg-white/60 rounded-full mb-4"></div>
            <div className="h-4 w-full bg-white/60 rounded-full mb-4"></div>
            <div className="h-32 w-full bg-white/40 rounded-2xl mb-8"></div>
          </div>
        </div>

        <div className="hidden xl:block fixed right-12 top-1/2 -translate-y-1/2 w-72 h-[420px] glass-card rounded-[32px] p-6 rotate-[4deg] opacity-50 pointer-events-none">
          <div className="w-full h-full rounded-2xl bg-white/40 p-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-container"></div>
              <div className="h-4 w-24 bg-primary-container/20 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="h-20 w-full bg-white/80 rounded-xl"></div>
              <div className="h-20 w-full bg-white/80 rounded-xl"></div>
              <div className="h-20 w-full bg-white/80 rounded-xl"></div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xl relative z-10">
          {/* Glassmorphic Auth Card */}
          <div className="glass-card rounded-[24px] p-8 md:p-12 shadow-[0_20px_50px_rgba(139,92,246,0.1)] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h1 className="font-h2 text-h2 text-primary mb-2">{t.login.title}</h1>
                <p className="font-body-md text-on-surface-variant">{t.login.subtitle}</p>
              </div>

              {/* Toggle Switch */}
              <div className="flex p-1 bg-surface-container-low rounded-full mb-8 border border-outline-variant/30 relative">
                <div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300"
                  style={{ left: isRegistering ? 'calc(50% + 2px)' : '4px' }}
                ></div>
                <button 
                  onClick={() => setIsRegistering(false)}
                  className={`flex-1 py-2 text-label-caps font-label-caps rounded-full z-10 transition-colors ${!isRegistering ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {t.login.loginTab}
                </button>
                <button 
                  onClick={() => setIsRegistering(true)}
                  className={`flex-1 py-2 text-label-caps font-label-caps rounded-full z-10 transition-colors ${isRegistering ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {t.login.registerTab}
                </button>
              </div>

              {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded-xl mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">{t.login.email}</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all placeholder:text-outline/50" 
                      placeholder={t.login.emailPlaceholder}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">{t.login.password}</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all placeholder:text-outline/50" 
                      placeholder={t.login.passwordPlaceholder}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {!isRegistering && (
                  <div className="flex justify-end">
                    <a className="text-label-caps font-label-caps text-primary hover:underline underline-offset-4" href="#">{t.login.forgotPassword}</a>
                  </div>
                )}

                {isRegistering && (
                  <div className="flex items-start gap-3 p-4 bg-primary-fixed/20 rounded-xl border border-primary/10">
                    <input
                      id="gdpr-consent"
                      type="checkbox"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container accent-primary cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="gdpr-consent" className="text-sm text-on-surface-variant leading-relaxed cursor-pointer">
                      {t.login.gdprConsent}
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  className="w-full vibrant-gradient text-on-primary py-4 rounded-xl font-h3 text-body-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:hover:scale-100" 
                  type="submit"
                  disabled={isRegistering && !gdprConsent}
                >
                  {isRegistering ? t.login.registerBtn : t.login.loginBtn}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>

          <p className="mt-8 text-center font-body-md text-on-surface-variant px-6">
            {t.login.termsText} {' '}
            <Link className="text-primary font-semibold hover:underline" href={`/${lang}/terms`}>{t.login.termsLink}</Link> 
            {' '}og{' '}
            <Link className="text-primary font-semibold hover:underline" href={`/${lang}/privacy`}>{t.login.privacyLink}</Link>.
          </p>
        </div>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="h-6 w-6 object-contain" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">Spark</span>
            </div>
            <p className="font-body-md text-xs text-slate-500">© 2026 Spark by Antigravity.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-start md:justify-end items-center">
            <Link className="font-body-md text-xs text-slate-400 hover:text-violet-500 transition-colors underline decoration-violet-500/30 underline-offset-4" href={`/${lang}/privacy`}>Privacy Policy</Link>
            <Link className="font-body-md text-xs text-slate-400 hover:text-violet-500 transition-colors underline decoration-violet-500/30 underline-offset-4" href={`/${lang}/terms`}>Terms of Service</Link>
            <a className="font-body-md text-xs text-slate-400 hover:text-violet-500 transition-colors underline decoration-violet-500/30 underline-offset-4" href="#">Parent Guide</a>
          </div>
        </div>
      </footer>
    </>
  );
}
