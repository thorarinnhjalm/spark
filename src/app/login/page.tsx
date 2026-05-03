'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createParentDocument } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Ef notandi er þegar innskráður, beina á mælaborð
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // Nýskráning
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createParentDocument(userCredential.user.uid, userCredential.user.email);
      } else {
        // Innskráning
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Villa kom upp við innskráningu.');
      }
    }
  };

  if (loading || user) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Hleður...</div>;

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '500px' }}>
      <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
          {isRegistering ? 'Stofna Foreldra-Aðgang' : 'Innskráning Foreldra'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Stjórnaðu aðgangi barnanna þinna að Spark vettvangnum.
        </p>

        {error && (
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Netfang"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Lykilorð"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
            {isRegistering ? 'Stofna Aðgang' : 'Skrá inn'}
          </button>
        </form>

        <p style={{ marginTop: 'var(--spacing-lg)' }}>
          {isRegistering ? 'Ertu þegar með aðgang?' : 'Ertu ekki með aðgang?'}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }}
          >
            {isRegistering ? 'Skrá inn hér' : 'Stofna aðgang'}
          </button>
        </p>
      </div>
    </div>
  );
}
