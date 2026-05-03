'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { verifyInviteCode, createChildDocument } from '@/lib/db';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/components/DictionaryProvider';

export default function JoinPage() {
  const [inviteCode, setInviteCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t, lang } = useTranslation();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const parentUid = await verifyInviteCode(inviteCode);
      if (!parentUid) {
        throw new Error(t.common.error); // We can add a specific error later
      }

      const sanitizedNickname = nickname.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const dummyEmail = `${sanitizedNickname}_${inviteCode.toLowerCase()}_${randomSuffix}@spark.app`;

      const userCredential = await createUserWithEmailAndPassword(auth, dummyEmail, password);

      await createChildDocument(userCredential.user.uid, parentUid, nickname);

      router.push(`/${lang}/missions`); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t.common.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="font-body-md text-on-background selection:bg-primary-fixed flex flex-col items-center justify-center px-6 py-12 min-h-screen relative"
      style={{
        backgroundColor: '#fef7ff',
        backgroundImage: 'radial-gradient(at 0% 0%, rgba(132, 85, 239, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(253, 86, 167, 0.15) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(132, 85, 239, 0.1) 0px, transparent 50%)'
      }}
    >
      
      {/* Absolute positioned language switcher */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <main className="w-full max-w-2xl flex flex-col items-center">
        {/* Brand Logo */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src="/logo.png" alt="" className="h-12 w-12 object-contain" />
            <span className="text-4xl font-black tracking-tighter text-primary">Spark</span>
          </div>
          <p className="text-lg text-on-surface-variant">{t.join.brandSubtitle}</p>
        </div>

        {/* Main Onboarding Card */}
        <div className="glass-card w-full rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(109,59,215,0.15)] flex flex-col gap-8 relative overflow-hidden">
          {/* Decorative Glow Background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary-container opacity-20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary-container opacity-20 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-on-surface">{t.join.title}</h2>
              <p className="text-on-surface-variant">{t.join.subtitle}</p>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container p-4 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleJoin} className="space-y-5">
              {/* Invite Code */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-primary ml-1 mb-2 block">{t.join.inviteCode}</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">key</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-0 transition-all text-lg text-on-surface placeholder:text-slate-400 font-bold tracking-widest uppercase" 
                    placeholder={t.join.inviteCodePlaceholder}
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    required
                  />
                </div>
              </div>

              {/* Nickname */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-primary ml-1 mb-2 block">{t.join.nickname}</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">face</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-0 transition-all text-lg text-on-surface placeholder:text-slate-400 font-semibold" 
                    placeholder={t.join.nicknamePlaceholder}
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Secret Password */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-primary ml-1 mb-2 block">{t.join.secretPassword}</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-0 transition-all text-lg text-on-surface placeholder:text-slate-400" 
                    placeholder={t.join.secretPasswordPlaceholder}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Primary Action */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 rounded-[20px] bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 mt-2"
              >
                <span>{isLoading ? t.common.loading : t.join.startBtn}</span>
                {!isLoading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-on-surface-variant">{t.join.areYouParent}</p>
          <Link href={`/${lang}/login`} className="text-sm font-bold text-primary hover:underline py-2 px-6 glass-card rounded-full">
            {t.join.goToDashboard}
          </Link>
        </div>

      </main>

    </div>
  );
}
