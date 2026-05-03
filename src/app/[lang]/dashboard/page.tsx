'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/components/DictionaryProvider';

const GRADIENTS = [
  'from-violet-500 to-fuchsia-500',
  'from-emerald-400 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500'
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [children, setChildren] = useState<{id: string, displayName: string, xp: number, rank: string}[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/login`);
    }
  }, [user, loading, router, lang]);

  useEffect(() => {
    async function fetchParentData() {
      if (user) {
        const parentDoc = await getDoc(doc(db, 'parents', user.uid));
        if (parentDoc.exists()) {
          const data = parentDoc.data();
          if (data.inviteCode) {
            setInviteCode(data.inviteCode);
          } else {
            // Robustness: If a user somehow has a document without an invite code (e.g. from early testing or script), generate one now.
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let newCode = 'SPARK-';
            for (let i = 0; i < 4; i++) newCode += chars.charAt(Math.floor(Math.random() * chars.length));
            await updateDoc(doc(db, 'parents', user.uid), { inviteCode: newCode });
            setInviteCode(newCode);
          }
        }

        const childrenRef = collection(db, 'children');
        const q = query(childrenRef, where('parentUid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const childrenData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            displayName: data.displayName || 'Óþekkt',
            xp: data.xp || 0,
            rank: data.rank || 'Recruit'
          };
        });
        setChildren(childrenData);
      }
    }
    fetchParentData();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <span className="text-outline font-bold">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-background min-h-screen">
      {/* TopNavBar */}
      <header className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Spark" className="h-12 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href={`/${lang}/dashboard`} className="text-violet-700 dark:text-violet-300 border-b-2 border-violet-500 pb-1 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight">{t.nav.dashboard}</Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button 
              onClick={() => signOut(auth)}
              className="scale-95 active:scale-90 transition-transform px-4 py-2 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:opacity-90"
            >
              {t.common.logout}
            </button>
            <Link href={`/${lang}/profile`} className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container bg-primary-fixed flex items-center justify-center text-primary font-bold hover:scale-105 transition-transform cursor-pointer">
              {user.email?.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="font-h1 text-h1 text-on-surface mb-2">{t.dashboard.welcome}</h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">{t.dashboard.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Left Column: Invite Code Widget (Priority) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6 sticky top-28 self-start">
            <div className="glass-card shadow-[0_8px_32px_rgba(139,92,246,0.08)] p-md rounded-2xl flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-fixed rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>person_add</span>
                </div>
                <h3 className="font-h3 text-h3 leading-none">{t.dashboard.inviteCodeTitle}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t.dashboard.inviteCodeDesc}
              </p>
              
              <div className="relative group">
                <div className="bg-primary-container p-6 rounded-2xl text-center shadow-lg shadow-primary/20 relative overflow-hidden">
                  {/* Decorative blur inside code card */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  <span className="text-2xl font-black tracking-widest text-white relative z-10">
                    {inviteCode || t.common.loading}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => { navigator.clipboard.writeText(inviteCode || '') }}
                className="w-full py-3 px-4 rounded-xl border-2 border-outline-variant font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors active:scale-95 text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>content_copy</span>
                {t.dashboard.copyCode}
              </button>
            </div>

            {/* Social Proof / Review Collection Widget */}
            <iframe 
              src={`https://umsognin.is/w/spark?lng=${lang}`}
              width="100%" 
              height="500px" 
              style={{ border: 'none', borderRadius: '24px', overflow: 'hidden', maxWidth: '480px' }}
              title="Umsagnir viðskiptavina"
              className="shadow-md mx-auto"
            ></iframe>
          </div>

          {/* Right Column: My Children Grid */}
          <div className="md:col-span-8 lg:col-span-9 space-y-gutter">
            <div className="flex items-center justify-between">
              <h2 className="font-h2 text-h2 text-on-surface">{t.dashboard.myChildren}</h2>
              <span className="px-3 py-1 bg-surface-container-high text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                {children.length} {t.dashboard.connected}
              </span>
            </div>

            {/* Bento Grid for Children */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              
              {children.map((child, index) => {
                const gradient = GRADIENTS[index % GRADIENTS.length];
                
                const xpPercentage = Math.min((child.xp / 1200) * 100, 100);

                return (
                  <div key={child.id} className="glass-card shadow-[0_8px_32px_rgba(139,92,246,0.08)] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className={`h-32 bg-gradient-to-br ${gradient} relative`}>
                      <div className="absolute inset-0 bg-white/10"></div>
                      <div className="absolute -bottom-8 left-6">
                        <div className={`w-16 h-16 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                          <span className="text-white font-black text-2xl">{child.displayName?.charAt(0)?.toUpperCase() || '?'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 pt-12 flex flex-col gap-4">
                      <div>
                        <h3 className="font-h3 text-h3">{child.displayName}</h3>
                        <p className={`text-xs font-bold ${index % 2 === 0 ? 'text-secondary' : 'text-primary'} uppercase tracking-widest`}>{child.rank}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                          <span>{t.dashboard.xp}</span>
                          <span>{child.xp} XP</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary-container shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
                            style={{ width: `${Math.max(xpPercentage, 5)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/${lang}/dashboard/${child.id}`}
                        className="mt-2 w-full py-3 bg-surface-container-low text-primary font-bold rounded-xl border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {t.dashboard.viewProgress}
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* Empty State / Add New Logic */}
              <Link href={`/${lang}/join`} className="border-2 border-dashed border-outline-variant rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/50 hover:bg-primary-fixed/20 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[32px]">add</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">{t.dashboard.addChild}</p>
                  <p className="text-xs text-on-surface-variant">{t.dashboard.addChildDesc}</p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Spark" className="h-10 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen" />
            </div>
            <p className="font-body-md text-xs text-slate-500">© 2026 Spark by Antigravity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
