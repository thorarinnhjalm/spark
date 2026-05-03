'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { missionsData, Mission } from '@/lib/missionsData';
import Link from 'next/link';

export default function MissionsMapPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/join');
    }
  }, [user, loading, router]);

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
    return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Hleður ævintýrakortinu...</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1>Ævintýrakortið</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Veldu þér verkefni og safnaðu stigum!</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
        {missionsData.map((mission: Mission) => {
          const isCompleted = completedMissions.includes(mission.missionId);

          return (
            <Link href={`/missions/${mission.missionId}`} key={mission.missionId} style={{ textDecoration: 'none' }}>
              <div className="glass-panel" style={{ 
                padding: 'var(--spacing-lg)', 
                cursor: 'pointer',
                border: isCompleted ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                opacity: isCompleted ? 0.8 : 1,
                transition: 'all 0.2s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    {mission.missionId} - {mission.dCode}
                  </span>
                  {isCompleted && <span style={{ color: '#10b981' }}>✓ Klárað</span>}
                </div>
                <h3 style={{ marginBottom: '10px' }}>{mission.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>
                  {mission.learningGoal}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    +{mission.xpReward} XP
                  </span>
                  <span style={{ color: 'white' }}>Spila →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
