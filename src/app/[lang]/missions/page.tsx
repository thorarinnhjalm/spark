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
import SparkLicenseModal from '@/components/SparkLicenseModal';

// D-category gradient map for mission card thumbnails
const CATEGORY_GRADIENTS: Record<string, { from: string; to: string }> = {
  Delegation: { from: 'rgb(139, 92, 246)', to: 'rgb(124, 58, 237)' },
  Description: { from: 'rgb(59, 130, 246)', to: 'rgb(6, 182, 212)' },
  Discernment: { from: 'rgb(16, 185, 129)', to: 'rgb(20, 184, 166)' },
  Diligence: { from: 'rgb(245, 158, 11)', to: 'rgb(249, 115, 22)' },
};

const SKILL_GRADIENTS: Record<string, { from: string; to: string }> = {
  crafter: { from: 'rgb(236, 72, 153)', to: 'rgb(225, 29, 72)' },
  sentinel: { from: 'rgb(16, 185, 129)', to: 'rgb(5, 150, 105)' },
  builder: { from: 'rgb(59, 130, 246)', to: 'rgb(37, 99, 235)' },
};

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [activeChildName, setActiveChildName] = useState<string | null>(null);
  const [activeChildId, setActiveChildId] = useState<string | null>(null);
  
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/join`);
    }
  }, [user, loading, router, lang]);

  useEffect(() => {
    async function fetchProgress() {
      if (user) {
        try {
          const storedChildId = localStorage.getItem('activeChildId');
          const targetId = storedChildId || user.uid;
          setActiveChildId(targetId);
          
          if (storedChildId) {
            setActiveChildName(localStorage.getItem('activeChildName'));
          }

          const childDoc = await getDoc(doc(db, 'children', targetId));
          if (childDoc.exists()) {
            setTotalXP(childDoc.data().xp || 0);
          }

          const progressRef = collection(db, `children/${targetId}/mission_progress`);
          const snapshot = await getDocs(query(progressRef));
          const completed = snapshot.docs.map(doc => doc.data().missionId);
          setCompletedMissions(completed);

          // Check Spark License
          const fluencyMissions = missionsData.filter(m => m.progressionPhase === 'fluency');
          const hasLicense = fluencyMissions.every(m => completed.includes(m.missionId));
          
          if (hasLicense) {
            const licenseKey = `sparkLicenseShown_${targetId}`;
            if (!localStorage.getItem(licenseKey)) {
              setShowLicenseModal(true);
              localStorage.setItem(licenseKey, 'true');
            }
          }

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

  const fluencyMissions = missionsData.filter(m => m.progressionPhase === 'fluency');
  const skillMissions = missionsData.filter(m => m.progressionPhase === 'skill');
  const hasSparkLicense = fluencyMissions.length > 0 && fluencyMissions.every(m => completedMissions.includes(m.missionId));

  const renderMissionCard = (mission: Mission, isLocked: boolean, tagLabel: string, tagIcon: string, gradient: {from: string, to: string}) => {
    const isCompleted = completedMissions.includes(mission.missionId);

    if (isCompleted) {
      return (
        <div key={mission.missionId} className="group relative glass-card rounded-[24px] p-1 overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl">
          <div className="bg-white rounded-[14px] p-5 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                {t.missions.missionCompleted}
              </span>
              <span className="text-primary font-bold text-sm">+{mission.xpReward} XP</span>
            </div>
            
            <div className="mb-4 aspect-video rounded-xl overflow-hidden relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}>
              <span className="text-white/30 text-5xl font-black absolute">{mission.missionId}</span>
              <span className="material-symbols-outlined text-white text-[48px] relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>{tagIcon}</span>
            </div>
            
            <h3 className="font-h3 text-lg mb-2">{mission.title[lang as 'is' | 'en']}</h3>
            <p className="text-sm text-on-surface-variant mb-6 flex-grow">{mission.learningGoal[lang as 'is' | 'en']}</p>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">{tagIcon}</span>
              {tagLabel}
            </div>
          </div>
        </div>
      );
    }

    if (isLocked) {
      return (
        <div key={mission.missionId} className="group relative rounded-[24px] p-1 overflow-hidden transition-all duration-300 bg-slate-200/50">
          <div className="bg-white/60 rounded-[14px] p-5 h-full flex flex-col opacity-60">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                {t.missions.missionLocked}
              </span>
              <span className="text-slate-400 font-bold text-sm">+{mission.xpReward} XP</span>
            </div>
            
            <div className="mb-4 aspect-video rounded-xl overflow-hidden relative flex items-center justify-center bg-slate-200">
              <span className="text-slate-300 text-5xl font-black absolute">{mission.missionId}</span>
              <span className="material-symbols-outlined text-slate-400 text-[48px] relative z-10">lock</span>
            </div>
            
            <h3 className="font-h3 text-lg mb-2 text-slate-400">{mission.title[lang as 'is' | 'en']}</h3>
            <p className="text-sm text-slate-400 mb-6 flex-grow">{mission.learningGoal[lang as 'is' | 'en']}</p>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">{tagIcon}</span>
              {tagLabel}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link href={`/${lang}/missions/${mission.missionId}`} key={mission.missionId} className="group relative p-1 rounded-[24px] overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl bg-gradient-to-br from-primary to-secondary-container block">
        <div className="bg-white rounded-[14px] p-5 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{t.missions.missionOpen}</span>
            <span className="text-primary font-bold text-sm">+{mission.xpReward} XP</span>
          </div>
          
          <div className="mb-4 aspect-video rounded-xl overflow-hidden relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}>
            <span className="text-white/30 text-5xl font-black absolute">{mission.missionId}</span>
            <span className="material-symbols-outlined text-white text-[48px] relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>{tagIcon}</span>
          </div>
          
          <h3 className="font-h3 text-lg mb-2">{mission.title[lang as 'is' | 'en']}</h3>
          <p className="text-sm text-on-surface-variant mb-6 flex-grow">{mission.learningGoal[lang as 'is' | 'en']}</p>
          
          <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md group-hover:scale-[1.02] transition-transform active:scale-95">
            {t.missions.startNow}
          </button>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-background min-h-screen mission-path" style={{ 
      backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(132, 85, 239, 0.08) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(253, 86, 167, 0.08) 0%, transparent 40%)',
      backgroundSize: '100% 100%'
    }}>
      {showLicenseModal && (
        <SparkLicenseModal onClose={() => setShowLicenseModal(false)} />
      )}

      {/* TopNavBar */}
      <nav className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <img src="/logo.svg" alt="Spark" className="h-12 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/missions`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-violet-700 dark:text-violet-300 border-b-2 border-violet-500 pb-1">{t.nav.missions}</Link>
            <Link href={`/${lang}/library`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">{t.nav.library}</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {activeChildName ? (
              <div className="flex items-center gap-3 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-bold shadow-inner">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                {t.missions.playingAs} {activeChildName}
                <button 
                  onClick={() => {
                    localStorage.removeItem('activeChildId');
                    localStorage.removeItem('activeChildName');
                    router.push(`/${lang}/dashboard`);
                  }}
                  className="ml-2 w-6 h-6 rounded-full bg-white/50 flex items-center justify-center hover:bg-white transition-colors"
                  title={t.missions.stopPlayingAs}
                >
                  <span className="material-symbols-outlined text-[16px] text-error">close</span>
                </button>
              </div>
            ) : (
              <Link href={`/${lang}/profile`} className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white hover:scale-105 transition-transform cursor-pointer">
                {user.email?.charAt(0).toUpperCase()}
              </Link>
            )}
            
            <button 
              onClick={() => signOut(auth)}
              className="px-5 py-2 bg-surface-variant rounded-full text-on-surface-variant font-bold text-sm scale-95 active:scale-90 transition-transform hover:bg-surface-dim"
            >
              {t.common.logout}
            </button>
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
            
            <div className="glass-card p-6 rounded-[24px] flex gap-8 shadow-lg">
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

        {/* PHASE 1: AI FLUENCY */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-h2 text-3xl text-on-surface">{t.missions.phase1Title || 'Phase 1: AI Fluency'}</h2>
            {hasSparkLicense && (
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Spark License
              </span>
            )}
          </div>

          {/* Category Filter Tabs (Only for Phase 1) */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 ${!activeCategory ? 'bg-primary text-white shadow-primary/20 hover:scale-105' : 'glass-card text-on-surface-variant hover:bg-white'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
              {t.missions.allMissions}
            </button>
            {TAGS.map(tag => (
              <button
                key={tag.name}
                onClick={() => setActiveCategory(activeCategory === tag.name ? null : tag.name)}
                className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeCategory === tag.name ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105' : 'glass-card text-on-surface-variant hover:bg-white'}`}
              >
                <span className="material-symbols-outlined">{tag.icon}</span>
                {tag.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fluencyMissions.filter(m => !activeCategory || m.dCode === activeCategory).map((mission: Mission) => {
              const categoryMissions = fluencyMissions.filter(m => m.dCode === mission.dCode);
              const positionInCategory = categoryMissions.findIndex(m => m.missionId === mission.missionId);
              const previousInCategory = positionInCategory > 0 ? categoryMissions[positionInCategory - 1].missionId : null;
              const isLocked = previousInCategory !== null && !completedMissions.includes(previousInCategory);
              const tag = TAGS.find(t => t.name === mission.dCode) ?? TAGS[0];
              const gradient = CATEGORY_GRADIENTS[mission.dCode] || CATEGORY_GRADIENTS['Delegation'];

              return renderMissionCard(mission, isLocked, tag.name, tag.icon, gradient);
            })}
          </div>
        </section>

        {/* PHASE 2: SKILL TREE (Hidden for now as requested) */}
        {false && (
          <section className="relative mb-24">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-h2 text-3xl text-on-surface">{t.missions.phase2Title || 'Phase 2: Skill Tree'}</h2>
            </div>

            {!hasSparkLicense && (
              <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-md rounded-[32px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-outline-variant">
                <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <span className="material-symbols-outlined text-[40px] text-slate-400">lock</span>
                </div>
                <h3 className="font-h2 text-2xl text-on-surface mb-2 text-center">{t.missions.phase2Locked || 'Læst'}</h3>
                <p className="text-on-surface-variant text-center max-w-md">Kláraðu öll AI Fluency verkefnin til að hljóta Spark leyfið og opna fyrir nýja hæfni.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Crafter Track */}
              <div className={`flex flex-col gap-6 ${!hasSparkLicense ? 'opacity-30 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-3 mb-2 border-b border-outline-variant pb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                    <span className="material-symbols-outlined">edit_note</span>
                  </div>
                  <h3 className="font-h3 text-xl">{t.missions.skillCrafter || 'Prompt Crafter'}</h3>
                </div>
                {skillMissions.filter(m => m.skillTrack === 'crafter').sort((a, b) => (a.skillOrder || 0) - (b.skillOrder || 0)).map(mission => {
                  const trackMissions = skillMissions.filter(m => m.skillTrack === 'crafter').sort((a, b) => (a.skillOrder || 0) - (b.skillOrder || 0));
                  const pos = trackMissions.findIndex(m => m.missionId === mission.missionId);
                  const isLocked = pos > 0 && !completedMissions.includes(trackMissions[pos - 1].missionId);
                  return renderMissionCard(mission, isLocked, t.missions.skillCrafter || 'Crafter', 'edit_note', SKILL_GRADIENTS.crafter);
                })}
              </div>

              {/* Sentinel Track */}
              <div className={`flex flex-col gap-6 ${!hasSparkLicense ? 'opacity-30 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-3 mb-2 border-b border-outline-variant pb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined">shield_person</span>
                  </div>
                  <h3 className="font-h3 text-xl">{t.missions.skillSentinel || 'The Sentinel'}</h3>
                </div>
                {skillMissions.filter(m => m.skillTrack === 'sentinel').sort((a, b) => (a.skillOrder || 0) - (b.skillOrder || 0)).map(mission => {
                  const trackMissions = skillMissions.filter(m => m.skillTrack === 'sentinel').sort((a, b) => (a.skillOrder || 0) - (b.skillOrder || 0));
                  const pos = trackMissions.findIndex(m => m.missionId === mission.missionId);
                  const isLocked = pos > 0 && !completedMissions.includes(trackMissions[pos - 1].missionId);
                  return renderMissionCard(mission, isLocked, t.missions.skillSentinel || 'Sentinel', 'shield_person', SKILL_GRADIENTS.sentinel);
                })}
              </div>

              {/* Builder Track */}
              <div className={`flex flex-col gap-6 ${!hasSparkLicense ? 'opacity-30 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-3 mb-2 border-b border-outline-variant pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined">construction</span>
                  </div>
                  <h3 className="font-h3 text-xl">{t.missions.skillBuilder || 'The Builder'}</h3>
                </div>
                {skillMissions.filter(m => m.skillTrack === 'builder').sort((a, b) => (a.skillOrder || 0) - (b.skillOrder || 0)).map(mission => {
                  const trackMissions = skillMissions.filter(m => m.skillTrack === 'builder').sort((a, b) => (a.skillOrder || 0) - (b.skillOrder || 0));
                  const pos = trackMissions.findIndex(m => m.missionId === mission.missionId);
                  const isLocked = pos > 0 && !completedMissions.includes(trackMissions[pos - 1].missionId);
                  return renderMissionCard(mission, isLocked, t.missions.skillBuilder || 'Builder', 'construction', SKILL_GRADIENTS.builder);
                })}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 full-width py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div>
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="Spark" className="h-10 w-auto object-contain" />
          </Link>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 mb-4">© 2026 Spark by Antigravity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
