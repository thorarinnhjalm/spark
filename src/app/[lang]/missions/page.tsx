'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, auth } from '@/lib/firebase';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { missionsData, Mission } from '@/lib/missionsData';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/components/DictionaryProvider';

const IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBwlh62DXsKQ7EYZx7oW7I3q0wmYKjdo6qZ7g__UuYC_2RZoo1n4O8cYzTVzs-2P1-ng8vb58wJQesf-YHXg63gatXyZ3QxjXAXHR_sX6Kteu2nsYVYhNCzRN2hm70SfxiexqGEWHEveVii3f5kZJKmKIfqJHXFlrzcXkxwi-4xVcIZauxCqbvbJm3gyYUC13ee4LmilPptKLdDIflLUpRV4fV9yD3psFz0_LufbMA0elIPyXPj0OLwEWn1DfHy8C5rrPKL9bShb6cE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCh2EYDOLybW_hJeEUEeXAXXvEb0AxhWfNLJ7DITjIv2EWy5xYG0ns_LI9t2OMvx4bXheHfFmbiBoEZh4SgylEcC-IQFezor0BVgdEdLzrYBXXktvz1Z-8EggwzzBQhTpn38oXdcFFrXRKspv3xy3e9QbUS1MuRTUIvOgbsw7YcCcy8p0Ta7zhRvEDMLUi0aB5emodeB6qUS9UKx146-n6yzqTbYtrr1ZOPul1qBaSdmts8KIUMaKzPYdBqH_ZssOXsNsg-csBIwm16",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATWQBwCqvPVVApBixrxi86U9lQds-uDnkgmvZZiE4YvGhRD-_raHwMM6n7dAfcEugG1WlpglxcouYAqhK-ROu_nsqA74yb_47MFuc6TxbyjKb2gwIcrqSoA1sVlgXs-pxHNRaGlHLpxEZzTVeEkniHvo8YjntW6cUGyC9a9bjwlJI3PJvw8bxxJTPXDrDYlChZ1yNVufeUOzQf1BZgjJRRrJKuQjGwM-WFWrKgyF05stqVuhTzdpzSJVqeMSFKYmhhpQeiL9AxkacC",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCdsNVt566OANuJwmpkmNBG1FpdYJuGyLJEhUZG9iUbWlUj8UmmiD4PD1jMzUQ-nge1O4-SIWynKAEq7cw7137IcnAVgNs2YvS-ivLxMCwf4oAIh8R268sZJ-oN13h7NYS3Vlk4ur2dXhpro4jki70uJD1u6JOiDAmkZiqnNApKMPndA4V4mGWV9d1-YAAcZuiWUx_j0MYhO9jsnF2GImstWbiudNhEuhSK9R9H7gHXVZ8xvMk52-T3a_0Rze7iEf9CKa-haRSXSRcA"
];

const TAGS = [
  { name: "Delegation", icon: "assignment_ind" },
  { name: "Description", icon: "description" },
  { name: "Discernment", icon: "visibility" },
  { name: "Diligence", icon: "bolt" }
];

export default function MissionsMapPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/join`);
    }
  }, [user, loading, router, lang]);

  useEffect(() => {
    async function fetchProgress() {
      if (user) {
        try {
          const childDoc = await getDoc(doc(db, 'children', user.uid));
          if (childDoc.exists()) {
            setTotalXP(childDoc.data().xp || 0);
          }

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

  return (
    <div className="bg-background min-h-screen mission-path" style={{ 
      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(107, 56, 212, 0.1) 1px, transparent 0)',
      backgroundSize: '40px 40px'
    }}>
      {/* TopNavBar */}
      <nav className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-violet-600 dark:text-violet-400">Spark AI</div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/missions`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-violet-700 dark:text-violet-300 border-b-2 border-violet-500 pb-1">{t.nav.missions}</Link>
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
              <span className="font-label-caps text-primary uppercase tracking-[0.2em] mb-2 block">{t.missions.heroTag}</span>
              <h1 className="font-h1 text-h1 text-on-surface mb-4">{t.missions.title}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                {t.missions.subtitle}
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl flex gap-8 shadow-lg">
              <div className="text-center">
                <span className="block text-h3 font-h3 text-primary">{totalXP}</span>
                <span className="text-xs font-bold text-slate-500 uppercase">{t.missions.totalXp}</span>
              </div>
              <div className="text-center border-l border-slate-200 pl-8">
                <span className="block text-h3 font-h3 text-secondary">{completedMissions.length}/{missionsData.length}</span>
                <span className="text-xs font-bold text-slate-500 uppercase">{t.missions.completed}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Category Filter Tabs (Visual Only for now) */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="px-6 py-3 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
            {t.missions.allMissions}
          </button>
          {TAGS.map(tag => (
            <button key={tag.name} className="px-6 py-3 rounded-full glass-card text-on-surface-variant font-bold hover:bg-white transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">{tag.icon}</span>
              {tag.name}
            </button>
          ))}
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {missionsData.map((mission: Mission, index: number) => {
            const isCompleted = completedMissions.includes(mission.missionId);
            const image = IMAGES[index % IMAGES.length];
            const tag = TAGS[index % TAGS.length];

            // Default to Icelandic titles until we translate missionsData.ts
            // But we will fetch from mission.title
            
            if (isCompleted) {
              return (
                <div key={mission.missionId} className="group relative glass-card rounded-2xl p-1 overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl">
                  <div className="bg-white rounded-[14px] p-5 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {t.missions.missionCompleted}
                      </span>
                      <span className="text-primary font-bold text-sm">+{mission.xpReward} XP</span>
                    </div>
                    
                    <div className="mb-4 aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
                      <img className="w-full h-full object-cover" src={image} alt={mission.title}/>
                    </div>
                    
                    <h3 className="font-h3 text-lg mb-2">{mission.title}</h3>
                    <p className="text-sm text-on-surface-variant mb-6 flex-grow">{mission.learningGoal}</p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="material-symbols-outlined text-sm">{tag.icon}</span>
                      {tag.name}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link href={`/${lang}/missions/${mission.missionId}`} key={mission.missionId} className="group relative p-1 rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl bg-gradient-to-br from-primary to-secondary-container block">
                <div className="bg-white rounded-[14px] p-5 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{t.missions.missionOpen}</span>
                    <span className="text-primary font-bold text-sm">+{mission.xpReward} XP</span>
                  </div>
                  
                  <div className="mb-4 aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
                    <img className="w-full h-full object-cover" src={image} alt={mission.title}/>
                  </div>
                  
                  <h3 className="font-h3 text-lg mb-2">{mission.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 flex-grow">{mission.learningGoal}</p>
                  
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md group-hover:scale-[1.02] transition-transform active:scale-95">
                    {t.missions.startNow}
                  </button>
                </div>
              </Link>
            );
          })}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 full-width py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mb-4">Spark AI Fluency</div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 mb-4">© 2024 Spark AI Fluency. Empowering the next generation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
