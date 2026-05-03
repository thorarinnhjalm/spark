'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [children, setChildren] = useState<{id: string, displayName: string, xp: number, rank: string}[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchParentData() {
      if (user) {
        // Sækja foreldra-skjalið
        const parentDoc = await getDoc(doc(db, 'parents', user.uid));
        if (parentDoc.exists()) {
          setInviteCode(parentDoc.data().inviteCode);
        }

        // Sækja börnin sem tilheyra þessu foreldri
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

  if (loading || !user) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Hleður...</div>;

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1>Mælaborð Foreldra</h1>
        <button onClick={() => signOut(auth)} className="btn-outline">Útskrá</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
        
        {/* Invite Code Panel */}
        <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Bjóða barni</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
            Gefðu barninu þessum kóða til að skrá sig inn og byrja að spila.
          </p>
          <div style={{ 
            background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', 
            textAlign: 'center', fontSize: '2rem', letterSpacing: '4px', fontWeight: 'bold',
            color: 'var(--primary-color)'
          }}>
            {inviteCode || 'Hleður...'}
          </div>
        </div>

        {/* Börn (Children List) */}
        <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Mín Börn</h2>
          
          {children.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>Ekkert barn hefur skráð sig ennþá. Láttu barnið fara á <b>/join</b> og nota kóðann þinn.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {children.map(child => (
                <li key={child.id} style={{ 
                  padding: '15px', background: 'rgba(255,255,255,0.05)', 
                  borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <strong style={{ fontSize: '1.2rem' }}>{child.displayName}</strong>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Stig: {child.xp} XP • Titill: {child.rank}</div>
                  </div>
                  <button className="btn-outline" style={{ padding: '8px 16px' }}>Skoða framvindu</button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
