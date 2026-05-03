'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { missionsData } from '@/lib/missionsData';
import Link from 'next/link';

export default function ChildProgressPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.childId as string;

  const [childData, setChildData] = useState<{ displayName: string, xp: number, rank: string, parentUid: string } | null>(null);
  const [progressData, setProgressData] = useState<{ id: string, missionId: string, missionTitle: string, dCode: string, xpEarned: number, reflectionAnswer: string, completedAt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchChildProgress() {
      if (!user) return;
      try {
        // 1. Sækja upplýsingar um barnið og staðfesta að það tilheyri þessu foreldri
        const childRef = doc(db, 'children', childId);
        const childSnap = await getDoc(childRef);
        
        if (!childSnap.exists() || childSnap.data().parentUid !== user.uid) {
          router.push('/dashboard'); // Ekki leyfilegt
          return;
        }
        
        const data = childSnap.data();
        setChildData({
          displayName: data.displayName || 'Óþekkt',
          xp: data.xp || 0,
          rank: data.rank || 'Recruit',
          parentUid: data.parentUid
        });

        // 2. Sækja framvindu skjöl barnsins (mission_progress)
        const progressRef = collection(db, `children/${childId}/mission_progress`);
        const q = query(progressRef, orderBy('completedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const progressList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const missionInfo = missionsData.find(m => m.missionId === data.missionId);
          return {
            id: doc.id,
            missionId: data.missionId,
            missionTitle: missionInfo ? missionInfo.title : 'Óþekkt verkefni',
            dCode: missionInfo ? missionInfo.dCode : '',
            xpEarned: data.xpEarned,
            reflectionAnswer: data.reflectionAnswer,
            completedAt: data.completedAt?.toDate()?.toLocaleDateString('is-IS') || 'Óþekkt dags.'
          };
        });
        
        setProgressData(progressList);
      } catch (error) {
        console.error("Villa við að sækja framvindu:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user && childId) {
      fetchChildProgress();
    }
  }, [user, childId, router]);

  if (loading || isLoading) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Hleður gögnum...</div>;
  if (!childData) return null;

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ marginBottom: '5px' }}>Framvinda: {childData.displayName}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Stig: <strong>{childData.xp} XP</strong> | Titill: <strong>{childData.rank}</strong>
          </p>
        </div>
        <Link href="/dashboard" className="btn-outline" style={{ textDecoration: 'none' }}>
          ← Til baka
        </Link>
      </div>

      <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Kláruð Ævintýri</h2>
        
        {progressData.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>Barnið hefur ekki klárað nein ævintýri ennþá.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {progressData.map((prog) => (
              <div key={prog.id} style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid var(--surface-border)', 
                borderRadius: '12px', 
                padding: 'var(--spacing-md)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'var(--primary-color)' }}>
                      {prog.missionId} - {prog.missionTitle}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {prog.dCode} • Klárað: {prog.completedAt}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '5px 10px', borderRadius: '8px', fontWeight: 'bold', height: 'fit-content' }}>
                    +{prog.xpEarned} XP
                  </div>
                </div>
                
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Hvað lærði barnið? (Reflection)</div>
                  <p style={{ fontStyle: 'italic', color: 'white', margin: 0 }}>&quot;{prog.reflectionAnswer}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
