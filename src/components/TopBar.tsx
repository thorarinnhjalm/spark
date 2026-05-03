'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function TopBar() {
  const { user, loading } = useAuth();

  return (
    <header style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--surface-border)' }}>
      <div className="container flex-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
          }}>
            S
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '1px' }}>SPARK</span>
        </div>
        <nav>
          {loading ? (
            <button className="btn-outline" style={{ opacity: 0.5 }}>Hleður...</button>
          ) : user ? (
            <button className="btn-outline">Mælaborð</button>
          ) : (
            <button className="btn-outline">Foreldrar: Innskráning</button>
          )}
        </nav>
      </div>
    </header>
  );
}
