'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { verifyInviteCode, createChildDocument } from '@/lib/db';
import Link from 'next/link';

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
      const parentUid = await verifyInviteCode(inviteCode);
      if (!parentUid) {
        throw new Error('Þessi kóði er ekki til! Spurðu foreldri þitt aftur.');
      }

      const sanitizedNickname = nickname.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const dummyEmail = `${sanitizedNickname}_${inviteCode.toLowerCase()}@spark.app`;

      const userCredential = await createUserWithEmailAndPassword(auth, dummyEmail, password);

      await createChildDocument(userCredential.user.uid, parentUid, nickname);

      router.push('/missions'); 
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
    <div className="bg-surface font-body-md text-on-background selection:bg-primary-fixed flex flex-col items-center justify-center p-gutter min-h-screen">
      <main className="w-full max-w-lg flex flex-col items-center">
        {/* Brand Logo for Onboarding */}
        <div className="mb-lg text-center">
          <span className="font-h1 text-primary-container tracking-tighter block mb-2">Spark AI</span>
          <p className="font-body-lg text-on-surface-variant px-md">Búðu til þinn eigin heim með gervigreind!</p>
        </div>

        {/* Main Onboarding Card */}
        <div className="glass-card w-full rounded-[32px] p-md md:p-lg shadow-[0_20px_50px_rgba(109,59,215,0.15)] flex flex-col gap-8 relative overflow-hidden">
          {/* Decorative Glow Background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary-container opacity-20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary-container opacity-20 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="font-h2 text-on-surface">Skráðu þig inn</h2>
              <p className="font-body-md text-on-surface-variant">Notaðu kódann sem foreldri þitt fékk.</p>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container p-3 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleJoin} className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-gutter">
                {/* Invite Code */}
                <div className="group">
                  <label className="font-label-caps text-primary-container ml-2 mb-2 block">Boðskóði</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary-container">key</span>
                    <input 
                      className="w-full pl-12 pr-4 py-5 rounded-2xl bg-white border-2 border-surface-variant focus:border-primary-container focus:ring-0 transition-all text-h3 text-on-surface placeholder:text-surface-variant font-h3 tracking-widest uppercase" 
                      placeholder="DÆMI: SPARK-123" 
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>

                {/* Nickname */}
                <div className="group">
                  <label className="font-label-caps text-primary-container ml-2 mb-2 block">Gælunafn</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary-container">face</span>
                    <input 
                      className="w-full pl-12 pr-4 py-5 rounded-2xl bg-white border-2 border-surface-variant focus:border-primary-container focus:ring-0 transition-all text-body-lg text-on-surface placeholder:text-surface-variant font-semibold" 
                      placeholder="Hvað heitir þú í leiknum?" 
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Secret Password */}
                <div className="group">
                  <label className="font-label-caps text-primary-container ml-2 mb-2 block">Leyniorð</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <input 
                      className="w-full pl-12 pr-4 py-5 rounded-2xl bg-white border-2 border-surface-variant focus:border-primary-container focus:ring-0 transition-all text-body-lg text-on-surface placeholder:text-surface-variant" 
                      placeholder="••••••••" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              {/* Primary Action */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-6 rounded-[24px] bg-gradient-to-r from-primary-container to-secondary-container text-white font-h2 shadow-lg shadow-primary-fixed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                <span>{isLoading ? 'Hleður...' : 'Hefja leik!'}</span>
                {!isLoading && <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Secondary Navigation for the screen */}
        <div className="mt-lg flex flex-col items-center gap-4">
          <p className="font-body-md text-on-surface-variant">Ertu foreldri?</p>
          <div className="flex gap-gutter">
            <Link href="/login" className="font-label-caps text-primary-container hover:underline py-2 px-4 glass-card rounded-full">Fara í mælaborð</Link>
          </div>
        </div>

      </main>

      {/* Visual Anchor Background Elements */}
      <div className="fixed top-20 left-10 -z-10 opacity-40 hidden lg:block">
        <img alt="Spark Mascot" className="w-32 h-32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBawTF61TaPWlu0KoRJKB41L8BZGIGGgbLToN_1ngiOdR8yyk_TFf9VHf0CgZU07Dcd-6xCuq-QoGEu8V3Oc4xLq5Ytu9nHycmPg3TqE5uZz9hFABkAyAF4G67gOmpwS0teZEcBXFO-iW5khoSCx8Nm_vRmYiZcz3iLMM8Av_G3GjuID8VnSyb6kDYeMcqTqz5sHnP2bc-l_iqsPMdqdUyrH-cQDHnobU82WcPoN9rov0SSIzdks7ZSP48SPlzo5-ghSc-DKAnmq1BG"/>
      </div>
      <div className="fixed bottom-20 right-10 -z-10 opacity-40 hidden lg:block">
        <img alt="Player Avatar" className="w-32 h-32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfyf3Xga-7r5fjvcQE6P4CT8J7t-q8GeB1tXHTSOCBewvhPNrGQalLiDkLCAyXc98YnLszQ2saTLYn1xHpDnHP-WlklKIFAtVtpODT8vU7qplmRvb01qDdHNQlPbUUeC7fOHj_GX9yLvejPCynPoALcD_D59pxVx3LfZd4NMer_kgZp_OmI1XGGCe_hfRsnuUZ6GDyw9L2U6MOz-Yj-OdE65F6r3TE-l9gDtKbGOyAnCXF_8KsP-WKrQ6xDs1V6JZiDOmjVxGlFSQt"/>
      </div>
    </div>
  );
}
