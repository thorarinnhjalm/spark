'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const [parents, setParents] = useState<any[]>([]);
  const [children, setChildren] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // 1. Verify Admin Status
  useEffect(() => {
    async function checkAdmin() {
      if (!loading) {
        if (!user) {
          router.push('/is/login');
          return;
        }
        
        try {
          const parentDoc = await getDoc(doc(db, 'parents', user.uid));
          if (parentDoc.exists() && parentDoc.data().role === 'admin') {
            setIsAdmin(true);
            fetchAdminData();
          } else {
            // Kick them out
            router.push('/is/dashboard');
          }
        } catch (error) {
          console.error('Error verifying admin:', error);
          router.push('/is/dashboard');
        } finally {
          setIsVerifying(false);
        }
      }
    }
    checkAdmin();
  }, [user, loading, router]);

  // 2. Fetch Data
  const fetchAdminData = async () => {
    try {
      const [parentsSnap, childrenSnap] = await Promise.all([
        getDocs(collection(db, 'parents')),
        getDocs(collection(db, 'children'))
      ]);
      
      const parentsData = parentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const childrenData = childrenSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      setParents(parentsData);
      setChildren(childrenData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  if (loading || isVerifying || isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <span className="text-outline">Hleður Kerfisstjórn...</span>
      </div>
    );
  }

  if (!isAdmin) return null;

  // Stats computation
  const totalParents = parents.length;
  const totalChildren = children.length;
  const totalXP = children.reduce((sum, child) => sum + (child.xp || 0), 0);
  const premiumParents = parents.filter(p => p.plan === 'premium').length;

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 md:p-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-error-container/20 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/is/profile" className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/40 transition-colors text-on-surface">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-h1 text-4xl text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-error text-4xl">admin_panel_settings</span>
            Kerfisstjórn (Super Admin)
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-[24px] p-6 border-l-4 border-l-primary flex flex-col">
            <span className="text-on-surface-variant font-medium text-sm mb-2">Fjöldi Foreldra</span>
            <span className="text-4xl font-black text-on-surface">{totalParents}</span>
          </div>
          <div className="glass-card rounded-[24px] p-6 border-l-4 border-l-secondary flex flex-col">
            <span className="text-on-surface-variant font-medium text-sm mb-2">Fjöldi Barna</span>
            <span className="text-4xl font-black text-on-surface">{totalChildren}</span>
          </div>
          <div className="glass-card rounded-[24px] p-6 border-l-4 border-l-tertiary flex flex-col">
            <span className="text-on-surface-variant font-medium text-sm mb-2">Heildar XP Skapað</span>
            <span className="text-4xl font-black text-on-surface">{totalXP}</span>
          </div>
          <div className="glass-card rounded-[24px] p-6 border-l-4 border-l-success flex flex-col">
            <span className="text-on-surface-variant font-medium text-sm mb-2">Premium Áskriftir</span>
            <span className="text-4xl font-black text-on-surface">{premiumParents}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Parents List */}
          <div className="glass-card rounded-[32px] p-8 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">groups</span>
              <h2 className="font-h2 text-2xl text-on-surface">Foreldrar í kerfinu</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-sm text-on-surface-variant">
                    <th className="pb-3 font-semibold">Netfang</th>
                    <th className="pb-3 font-semibold">Invite Code</th>
                    <th className="pb-3 font-semibold">Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {parents.map(parent => (
                    <tr key={parent.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="py-4 text-on-surface font-medium">{parent.email}</td>
                      <td className="py-4 text-primary font-mono">{parent.inviteCode || '-'}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${parent.plan === 'premium' ? 'bg-success/20 text-success' : 'bg-surface-variant text-on-surface-variant'}`}>
                          {parent.plan || 'free'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {parents.length === 0 && (
                    <tr><td colSpan={3} className="py-8 text-center text-on-surface-variant">Engir foreldrar fundust.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Children List */}
          <div className="glass-card rounded-[32px] p-8 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary">child_care</span>
              <h2 className="font-h2 text-2xl text-on-surface">Börn í kerfinu</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-sm text-on-surface-variant">
                    <th className="pb-3 font-semibold">Nafn</th>
                    <th className="pb-3 font-semibold">Rank</th>
                    <th className="pb-3 font-semibold text-right">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map(child => (
                    <tr key={child.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="py-4 text-on-surface font-medium">{child.displayName}</td>
                      <td className="py-4 text-on-surface-variant">{child.rank || 'Recruit'}</td>
                      <td className="py-4 text-right text-secondary font-black">{child.xp || 0}</td>
                    </tr>
                  ))}
                  {children.length === 0 && (
                    <tr><td colSpan={3} className="py-8 text-center text-on-surface-variant">Engin börn fundust.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
