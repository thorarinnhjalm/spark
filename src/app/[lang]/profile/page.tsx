'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useTranslation } from '@/components/DictionaryProvider';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [parentData, setParentData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/login`);
    }
  }, [user, loading, router, lang]);

  useEffect(() => {
    async function fetchParentData() {
      if (user) {
        try {
          const parentDoc = await getDoc(doc(db, 'parents', user.uid));
          if (parentDoc.exists()) {
            setParentData(parentDoc.data());
          }
        } catch (error) {
          console.error('Error fetching parent data:', error);
        } finally {
          setIsLoadingData(false);
        }
      }
    }
    fetchParentData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push(`/${lang}/login`);
  };

  const copyInviteCode = () => {
    if (parentData?.inviteCode) {
      navigator.clipboard.writeText(parentData.inviteCode);
      alert(t.dashboard?.codeCopied || 'Aðgangskóði afritaður!');
    }
  };

  if (loading || !user || isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <span className="text-outline">{t.common?.loading || 'Hleður...'}</span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 md:p-12 relative overflow-hidden flex flex-col items-center">
      {/* Decorative Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container/30 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 flex flex-col gap-8 mt-12">
        <div className="flex items-center gap-4 mb-4">
          <Link href={`/${lang}/dashboard`} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/40 transition-colors text-on-surface">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-h1 text-4xl text-on-surface">{t.nav?.profile || 'Minn Prófíll'}</h1>
        </div>

        <div className="glass-card w-full rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(109,59,215,0.15)] flex flex-col gap-8 relative overflow-hidden">
          {/* User Info Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-24 h-24 rounded-full vibrant-gradient flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="material-symbols-outlined text-4xl text-white">person</span>
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-primary mb-1">Aðgangur</p>
              <h2 className="font-h2 text-2xl text-on-surface mb-2">{user.email}</h2>
              <div className="flex gap-3">
                <span className="px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium border border-outline-variant/30">
                  {parentData?.plan === 'premium' ? 'Premium Áskrift' : 'Ókeypis Áskrift'}
                </span>
                {parentData?.role === 'admin' && (
                  <span className="px-4 py-1.5 rounded-full bg-error-container text-on-error-container text-sm font-medium border border-error/20 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30"></div>

          {/* Invite Code Section */}
          <div>
            <h3 className="font-h3 text-xl text-on-surface mb-4">Tengikóði fyrir Börn</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed max-w-2xl">
              Notaðu þennan kóða þegar þú vilt tengja barn við þinn aðgang. Barnið slær kóðann inn þegar það nýskráir sig á sínu tæki.
            </p>
            <div className="bg-surface-container-high border border-outline-variant/40 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-sm font-medium text-on-surface-variant mb-2 uppercase tracking-wider">Þinn kóði</p>
                <p className="font-mono text-3xl md:text-4xl font-bold tracking-[0.2em] text-primary">
                  {parentData?.inviteCode || '...'}
                </p>
              </div>
              <button 
                onClick={copyInviteCode}
                className="w-full sm:w-auto bg-white text-primary border border-primary/20 px-6 py-3 rounded-xl font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">content_copy</span>
                Afrita kóða
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30"></div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleLogout}
              className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-outline-variant/50"
            >
              <span className="material-symbols-outlined">logout</span>
              Skrá út
            </button>
            
            {parentData?.role === 'admin' && (
              <Link 
                href={`/${lang}/admin`}
                className="flex-1 bg-surface text-on-surface px-6 py-4 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-primary/30 shadow-md shadow-primary/10 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                Kerfisstjórn
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
