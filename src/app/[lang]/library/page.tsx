'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, auth } from '@/lib/firebase';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { missionsData } from '@/lib/missionsData';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/components/DictionaryProvider';

// D-category configuration
const CATEGORIES = [
  { dCode: 'Delegation', icon: 'assignment_ind', gradient: { from: 'rgb(139, 92, 246)', to: 'rgb(124, 58, 237)' }, label: { is: 'Delegation', en: 'Delegation' } },
  { dCode: 'Description', icon: 'description', gradient: { from: 'rgb(59, 130, 246)', to: 'rgb(6, 182, 212)' }, label: { is: 'Description', en: 'Description' } },
  { dCode: 'Discernment', icon: 'visibility', gradient: { from: 'rgb(16, 185, 129)', to: 'rgb(20, 184, 166)' }, label: { is: 'Discernment', en: 'Discernment' } },
  { dCode: 'Diligence', icon: 'bolt', gradient: { from: 'rgb(245, 158, 11)', to: 'rgb(249, 115, 22)' }, label: { is: 'Diligence', en: 'Diligence' } },
];

export default function LibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/join`);
    }
  }, [user, loading, router, lang]);

  useEffect(() => {
    async function fetchProgress() {
      if (user) {
        try {
          const progressRef = collection(db, `children/${user.uid}/mission_progress`);
          const snapshot = await getDocs(query(progressRef));
          const completed = snapshot.docs.map(doc => doc.data().missionId);
          setCompletedMissions(completed);
        } catch (error) {
          console.error("Error fetching progress:", error);
        } finally {
          setIsLoadingProgress(false);
        }
      }
    }
    fetchProgress();
  }, [user]);

  if (loading || isLoadingProgress || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-outline">{t.common.loading}</span>
      </div>
    );
  }

  // Calculate stats
  const totalConcepts = missionsData.reduce((sum, m) => sum + m.conceptsTaught.length, 0);
  const unlockedConcepts = missionsData
    .filter(m => completedMissions.includes(m.missionId))
    .reduce((sum, m) => sum + m.conceptsTaught.length, 0);

  return (
    <div className="bg-background min-h-screen" style={{
      backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(132, 85, 239, 0.08) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(253, 86, 167, 0.08) 0%, transparent 40%)',
      backgroundSize: '100% 100%'
    }}>
      {/* TopNavBar */}
      <nav className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Spark" className="h-8 w-auto object-contain" />
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/missions`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">{t.nav.missions}</Link>
            <Link href={`/${lang}/library`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-violet-700 dark:text-violet-300 border-b-2 border-violet-500 pb-1">{t.nav.library}</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => signOut(auth)}
              className="px-5 py-2 bg-surface-variant rounded-full text-on-surface-variant font-bold text-sm scale-95 active:scale-90 transition-transform hover:bg-surface-dim"
            >
              {t.common.logout}
            </button>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
        {/* Hero Section */}
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-caps text-primary uppercase tracking-[0.2em] mb-2 block">{t.nav.library}</span>
              <h1 className="font-h1 text-h1 text-on-surface mb-4">{t.library.title}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                {t.library.subtitle}
              </p>
            </div>

            <div className="glass-card p-6 rounded-[24px] flex gap-8 shadow-lg">
              <div className="text-center">
                <span className="block text-h3 font-h3 text-primary">{unlockedConcepts}</span>
                <span className="text-xs font-bold text-slate-500 uppercase">{t.library.unlocked}</span>
              </div>
              <div className="text-center border-l border-slate-200 pl-8">
                <span className="block text-h3 font-h3 text-secondary">{totalConcepts}</span>
                <span className="text-xs font-bold text-slate-500 uppercase">{t.library.totalConcepts}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Concept Sections by D-Category */}
        <div className="space-y-12">
          {CATEGORIES.map(category => {
            const categoryMissions = missionsData.filter(m => m.dCode === category.dCode);

            return (
              <section key={category.dCode}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: `linear-gradient(135deg, ${category.gradient.from}, ${category.gradient.to})` }}
                  >
                    <span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{category.icon}</span>
                  </div>
                  <div>
                    <h2 className="font-h2 text-h2 text-on-surface">{category.label[lang as 'is' | 'en']}</h2>
                    <p className="text-sm text-on-surface-variant">
                      {categoryMissions.filter(m => completedMissions.includes(m.missionId)).length}/{categoryMissions.length} {t.missions.completed.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Concept Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryMissions.map(mission => {
                    const isUnlocked = completedMissions.includes(mission.missionId);

                    return mission.conceptsTaught.map((concept, conceptIndex) => (
                      <div
                        key={`${mission.missionId}-${conceptIndex}`}
                        className={`rounded-2xl p-5 transition-all duration-300 ${
                          isUnlocked
                            ? 'glass-card shadow-[0_8px_32px_rgba(139,92,246,0.08)] hover:translate-y-[-4px] hover:shadow-xl'
                            : 'bg-slate-100/60 border border-slate-200/50'
                        }`}
                      >
                        {/* Concept Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${isUnlocked ? '' : 'bg-slate-200'}`}
                            style={isUnlocked ? { background: `linear-gradient(135deg, ${category.gradient.from}, ${category.gradient.to})` } : {}}
                          >
                            <span className={`material-symbols-outlined text-[16px] ${isUnlocked ? 'text-white' : 'text-slate-400'}`} style={isUnlocked ? { fontVariationSettings: "'FILL' 1" } : {}}>
                              {isUnlocked ? 'lightbulb' : 'lock'}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                            isUnlocked ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-400'
                          }`}>
                            {mission.missionId}
                          </span>
                        </div>

                        {/* Concept Content */}
                        <h3 className={`font-bold text-sm mb-2 ${isUnlocked ? 'text-on-surface' : 'text-slate-400'}`}>
                          {concept[lang as 'is' | 'en']}
                        </h3>

                        {/* Mission Source */}
                        <div className={`flex items-center gap-1.5 text-[11px] ${isUnlocked ? 'text-on-surface-variant' : 'text-slate-400'}`}>
                          <span className="material-symbols-outlined text-[14px]">{isUnlocked ? category.icon : 'lock'}</span>
                          {isUnlocked
                            ? `${t.library.fromMission}: ${mission.title[lang as 'is' | 'en']}`
                            : t.library.locked
                          }
                        </div>
                      </div>
                    ));
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 full-width py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Spark" className="h-6 w-auto object-contain" />
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 mb-4">© 2026 Spark by Antigravity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
