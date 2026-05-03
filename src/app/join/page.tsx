'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { verifyInviteCode, createChildDocument } from '@/lib/db';

export default function JoinPage() {
  const [inviteCode, setInviteCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Sannreyna kóðann
      const parentUid = await verifyInviteCode(inviteCode);
      if (!parentUid) {
        throw new Error('Þessi kóði er ekki til! Spurðu foreldri þitt aftur.');
      }

      // 2. Búa til "fake" netfang fyrir barnið til að tryggja GDPR-K öryggi (þurfum ekki alvöru netfang)
      const sanitizedNickname = nickname.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const dummyEmail = `${sanitizedNickname}_${inviteCode.toLowerCase()}@spark.app`;

      // 3. Stofna aðgang í Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, dummyEmail, password);

      // 4. Búa til /children skjal
      await createChildDocument(userCredential.user.uid, parentUid, nickname);

      // 5. Klára og beina inn í leikinn
      router.push('/missions'); // Síða sem við búum til seinna
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Villa kom upp. Gakktu úr skugga um að kóðinn sé réttur.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '500px' }}>
      <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Velkomin(n) í Spark</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Sláðu inn kóðann frá foreldrum þínum til að byrja ævintýrið!
        </p>

        {error && (
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Kóði (T.d. SPARK-ABCD)"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            required
            style={{ padding: '15px', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '2px', borderRadius: '8px', border: '1px solid var(--primary-color)', background: 'rgba(0,0,0,0.2)', color: 'white', textTransform: 'uppercase' }}
          />
          <input
            type="text"
            placeholder="Hvað eigum við að kalla þig? (Gælunafn)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Veldu þér eitt leyniorð (lykilorð)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <button type="submit" className="btn-primary" style={{ marginTop: '10px', fontSize: '1.2rem' }} disabled={isLoading}>
            {isLoading ? 'Hleður...' : 'Hefja leik!'}
          </button>
        </form>
      </div>
    </div>
  );
}
