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
          displayName: data.displayName || 'Unknown',
          xp: data.xp || 0,
          rank: data.rank || 'Recruit',
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
            missionTitle: missionInfo ? missionInfo.title : 'Unknown Mission',
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

  if (loading || isLoading) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>{t.common.loading}</div>;
  if (!childData) return null;

  return (
    <>
      <header className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-violet-600 dark:text-violet-400">Spark AI</div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href={`/${lang}/dashboard`} className="scale-95 active:scale-90 transition-transform px-4 py-2 bg-surface-container-high text-primary rounded-xl font-semibold text-sm hover:bg-surface-container">
              Til baka
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="font-h1 text-h1 text-on-surface mb-2">Framvinda: {childData.displayName}</h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            {t.dashboard.xp}: <strong>{childData.xp} XP</strong> | Titill: <strong>{childData.rank}</strong>
          </p>
        </div>

        <div className="glass-card p-xl rounded-[24px]">
          <h2 className="font-h2 text-h2 mb-8">Kláruð Ævintýri</h2>
          
          {progressData.length === 0 ? (
            <p className="text-on-surface-variant font-body-md">Barnið hefur ekki klárað nein ævintýri ennþá.</p>
          ) : (
            <div className="space-y-6">
              {progressData.map((prog) => (
                <div key={prog.id} className="bg-surface-container-low border border-outline-variant rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-h3 text-primary mb-1">
                        {prog.missionId} - {prog.missionTitle}
                      </h3>
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        {prog.dCode} • Klárað: {prog.completedAt}
                      </span>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold text-sm">
                      +{prog.xpEarned} XP
                    </div>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl mt-4">
                    <div className="text-xs font-bold text-on-surface-variant mb-2">Hvað lærði barnið? (Reflection)</div>
                    <p className="font-body-md italic text-on-surface">&quot;{prog.reflectionAnswer}&quot;</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
