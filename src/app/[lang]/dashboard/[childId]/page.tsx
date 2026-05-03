'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { missionsData } from '@/lib/missionsData';
import Link from 'next/link';
import { useTranslation } from '@/components/DictionaryProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ChildProgressPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.childId as string;
  const { t, lang } = useTranslation();

  const [childData, setChildData] = useState<{ displayName: string, xp: number, rank: string, parentUid: string } | null>(null);
  const [progressData, setProgressData] = useState<{ id: string, missionId: string, missionTitle: string, dCode: string, xpEarned: number, reflectionAnswer: string, completedAt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/login`);
    }
  }, [user, loading, router, lang]);

  useEffect(() => {
    async function fetchChildProgress() {
      if (!user) return;
      try {
        const childRef = doc(db, 'children', childId);
        const childSnap = await getDoc(childRef);
        
        if (!childSnap.exists() || childSnap.data().parentUid !== user.uid) {
          router.push(`/${lang}/dashboard`);
          return;
        }
        
        const data = childSnap.data();
        setChildData({
          displayName: data.displayName || 'Óþekkt',
          xp: data.xp || 0,
          rank: data.rank || 'Nýliði',
          parentUid: data.parentUid
        });

        const progressRef = collection(db, `children/${childId}/mission_progress`);
        const q = query(progressRef, orderBy('completedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const progressList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const missionInfo = missionsData.find(m => m.missionId === data.missionId);
          return {
            id: doc.id,
            missionId: data.missionId,
            missionTitle: missionInfo ? missionInfo.title[lang as 'is' | 'en'] : 'Unknown Mission',
            dCode: missionInfo ? missionInfo.dCode : '',
            xpEarned: data.xpEarned,
            reflectionAnswer: data.reflectionAnswer,
            completedAt: data.completedAt?.toDate()?.toLocaleDateString(lang === 'is' ? 'is-IS' : 'en-US') || 'Unknown Date'
          };
        });
        
        setProgressData(progressList);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user && childId) {
      fetchChildProgress();
    }
  }, [user, childId, router, lang]);

  if (loading || isLoading) return <div className="flex items-center justify-center min-h-screen bg-background"><span className="font-bold text-outline">{t.common.loading}</span></div>;
  if (!childData) return null;

  // Max XP scale for progress bar visual (10,000 XP)
  const xpPercentage = Math.min((childData.xp / 10000) * 100, 100);
  const xpNextRank = 2500; // Arbitrary for demo

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen pb-24 md:pb-0">
      {/* Top Navigation Shell */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Spark" className="h-8 w-auto object-contain" />
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link href={`/${lang}/missions`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-violet-500 transition-all duration-300">
            {t.nav.missions}
          </Link>
          <Link href={`/${lang}/dashboard`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-violet-500 transition-all duration-300">
            {t.nav.dashboard}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href={`/${lang}/dashboard`} className="hidden md:block px-6 py-2 bg-surface-container-high text-primary rounded-full font-semibold text-sm transition-transform scale-95 active:scale-90">
            Til baka
          </Link>
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">{user?.email?.charAt(0).toUpperCase()}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header Section */}
        <header className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-primary-fixed to-surface-bright p-8 rounded-[32px] shadow-sm">
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl overflow-hidden bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <span className="text-white font-black text-6xl">{childData.displayName?.charAt(0)?.toUpperCase() || '?'}</span>
            </div>
            <button className="absolute bottom-2 right-2 bg-secondary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>edit</span>
            </button>
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
              <h1 className="font-h1 text-h1 text-primary">Góðan dag, {childData.displayName}!</h1>
              <span className="px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-caps text-label-caps uppercase tracking-widest">{childData.rank}</span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">Tilbúinn í næsta ævintýri?</p>
            <div className="max-w-md">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2 ml-1">Gælunafn</label>
              <div className="relative">
                <input
                  className="w-full bg-white border-none rounded-2xl px-6 py-4 text-h3 font-h3 text-primary shadow-inner focus:ring-4 focus:ring-primary-container/20 transition-all"
                  type="text" 
                  defaultValue={childData.displayName} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 material-symbols-outlined">auto_fix_high</span>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-12 gap-4">
          {/* XP Progress Card */}
          <div className="col-span-12 md:col-span-8 glass-card shadow-[0_8px_32px_rgba(139,92,246,0.1)] rounded-[24px] p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="font-h2 text-h2 text-primary mb-1">XP Samtals</h2>
                  <p className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Næsta stig: {xpNextRank} XP</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-primary">{childData.xp}</span>
                  <span className="text-slate-400 font-bold"> / {xpNextRank}</span>
                </div>
              </div>
              <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]" style={{ width: `${Math.max(xpPercentage, 5)}%` }}></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-20"></div>
              </div>
            </div>
            <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
              <div className="flex-shrink-0 bg-white/50 px-4 py-3 rounded-2xl flex items-center gap-3 border border-white">
                <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span className="font-bold text-slate-700">5 Daga Runa</span>
              </div>
              <div className="flex-shrink-0 bg-white/50 px-4 py-3 rounded-2xl flex items-center gap-3 border border-white">
                <span className="material-symbols-outlined text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-bold text-slate-700">{progressData.length} Verkefni</span>
              </div>
            </div>
          </div>

          {/* Rank Badge Card */}
          <div className="col-span-12 md:col-span-4 bg-primary text-white rounded-[24px] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="w-32 h-32 mb-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/40 shadow-2xl">
              <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
            <h3 className="font-h3 text-h3 mb-2">Núverandi Staða</h3>
            <p className="font-bold text-xl uppercase tracking-widest text-primary-fixed">{childData.rank}</p>
            <button className="mt-6 px-6 py-2 bg-white text-primary rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform">
              Sjá öll merki
            </button>
          </div>

          {/* Recent Achievements */}
          <div className="col-span-12 md:col-span-6 glass-card shadow-[0_8px_32px_rgba(139,92,246,0.1)] rounded-[24px] p-8">
            <h3 className="font-h3 text-h3 text-on-surface mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">emoji_events</span>
              Nýjustu Verkefni
            </h3>
            
            {progressData.length === 0 ? (
              <p className="text-on-surface-variant font-body-md">Engin verkefni kláruð ennþá.</p>
            ) : (
              <div className="space-y-4">
                {progressData.slice(0, 3).map((prog, index) => {
                  const icons = ['psychology', 'rocket', 'auto_awesome'];
                  const colors = ['bg-amber-100 text-amber-600', 'bg-blue-100 text-blue-600', 'bg-emerald-100 text-emerald-600'];
                  const icon = icons[index % icons.length];
                  const color = colors[index % colors.length];

                  return (
                    <div key={prog.id} className="flex items-center gap-4 p-4 bg-white/40 rounded-2xl border border-white/60">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                        <span className="material-symbols-outlined">{icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-on-surface line-clamp-1">{prog.missionTitle}</p>
                        <p className="text-xs text-slate-500">Klárað: {prog.completedAt}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-sm text-emerald-600">+{prog.xpEarned} XP</span>
                        <span className="material-symbols-outlined text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skills Analysis */}
          <div className="col-span-12 md:col-span-6 glass-card shadow-[0_8px_32px_rgba(139,92,246,0.1)] rounded-[24px] p-8 overflow-hidden relative">
            <h3 className="font-h3 text-h3 text-on-surface mb-6">Hæfni þín</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-slate-600">Skapandi hugsun</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-slate-600">Rökfræði</span>
                  <span className="text-secondary font-bold">60%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full">
                  <div className="h-full bg-secondary-container rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-slate-600">Málskilningur</span>
                  <span className="text-amber-500 font-bold">92%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="Spark" className="h-6 w-auto object-contain" />
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500">© 2026 Spark by Antigravity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
