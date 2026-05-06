'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { missionsData } from '@/lib/missionsData';
import { saveMissionProgress } from '@/lib/db';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/components/DictionaryProvider';

type Phase = 'hook' | 'lab' | 'reflection' | 'success';

export default function ActiveMissionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const missionId = params.id as string;
  const { t, lang } = useTranslation();
  
  const mission = missionsData.find(m => m.missionId === missionId) || null;
  const [phase, setPhase] = useState<Phase>('hook');

  // Chat state
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Reflection state
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [activeChildName, setActiveChildName] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Auth Check
  useEffect(() => {
    if (!loading && !user) router.push(`/${lang}/join`);
    if (user && typeof window !== 'undefined') {
      setActiveChildName(localStorage.getItem('activeChildName'));
    }
  }, [user, loading, router, lang]);

  // If mission not found
  useEffect(() => {
    if (!mission && !loading) {
      router.push(`/${lang}/missions`);
    }
  }, [mission, loading, router, lang]);

  useEffect(() => {
    // Scroll down on new messages
    if (chatEndRef.current && phase === 'lab') {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, phase]);

  const handleStartLab = () => setPhase('lab');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isChatLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    const newHistory = [...chatHistory, { role: 'user' as const, text: userMessage }];
    setChatHistory(newHistory);
    setIsChatLoading(true);

    try {
      const idToken = await user?.getIdToken();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          missionId: mission?.missionId,
          history: chatHistory,
          message: userMessage,
          language: lang // Pass the active language to the AI
        })
      });
      
      const data = await res.json();
      if (data.reply) {
        setChatHistory([...newHistory, { role: 'ai', text: data.reply }]);
      } else {
        setChatHistory([...newHistory, { role: 'ai', text: t.common.error }]);
      }
    } catch {
      setChatHistory([...newHistory, { role: 'ai', text: t.common.error }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleFinishLab = () => setPhase('reflection');

  const handleCompleteMission = async () => {
    if (!reflectionAnswer.trim() || !user || !mission || isSaving) return;
    setIsSaving(true);
    
    try {
      const targetId = localStorage.getItem('activeChildId') || user.uid;
      await saveMissionProgress(targetId, mission.missionId, mission.xpReward, reflectionAnswer);
      setPhase('success');
    } catch (error) {
      console.error("Gat ekki vistað:", error);
      alert(t.common.error);
      setIsSaving(false);
    }
  };

  if (loading || !mission || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-outline">{t.common.loading}</span>
      </div>
    );
  }

  if (phase === 'success') {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-gutter">
        <div className="glass-card rounded-[32px] p-xl text-center shadow-[0_20px_50px_rgba(16,185,129,0.2)] border-2 border-emerald-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 to-teal-400/10 pointer-events-none"></div>
          <div className="text-6xl mb-6 relative z-10">🎉</div>
          <h1 className="font-h1 text-emerald-500 mb-4 relative z-10">{t.lab.wellDone}</h1>
          <p className="font-body-lg text-on-surface mb-8 relative z-10">{t.lab.youGotXp} <strong className="text-emerald-600">{mission.xpReward} XP</strong> {t.lab.forCompleting} {mission.title[lang as 'is' | 'en']}!</p>
          <button 
            onClick={() => router.push(`/${lang}/missions`)}
            className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg relative z-10"
          >
            {t.lab.backToMap}
          </button>
        </div>
      </div>
    );
  }

  // Calculate Progress Bar Width
  let progressWidth = '33%';
  let phaseText = t.lab.phase1Label;
  if (phase === 'lab') { progressWidth = '66%'; phaseText = t.lab.phase2Label; }
  if (phase === 'reflection') { progressWidth = '100%'; phaseText = t.lab.phase3Label; }

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen pb-24 md:pb-0">
      {/* TopNavBar */}
      <header className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Spark" className="h-12 w-auto object-contain" />
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/missions`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-violet-700 dark:text-violet-300 border-b-2 border-violet-500 pb-1">{t.nav.missions}</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {activeChildName ? (
              <div className="hidden md:flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-bold shadow-inner">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                {activeChildName}
              </div>
            ) : null}

            <Link href={`/${lang}/missions`} className="hidden md:block bg-surface-variant text-on-surface-variant px-4 py-2 rounded-xl font-semibold scale-95 active:scale-90 transition-transform">{t.lab.quit}</Link>
            {!activeChildName && (
              <Link href={`/${lang}/profile`} className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white hover:scale-105 transition-transform cursor-pointer">
                {user.email?.charAt(0).toUpperCase()}
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-gutter py-xl space-y-xl">
        {/* Progress Header */}
        <div className="flex flex-col gap-sm">
          <div className="flex justify-between items-end mb-2">
            <h1 className="font-h2 text-h2 text-primary">{mission.title[lang as 'is' | 'en']}</h1>
            <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-4 py-2 rounded-full shadow-sm">{phaseText}</span>
          </div>
          <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-container to-secondary-container relative transition-all duration-500 ease-out"
              style={{ width: progressWidth }}
            >
              <div className="absolute right-0 top-0 h-full w-2 bg-white/40 blur-sm"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-lg pb-10">
          
          {/* Phase 1: Hook Phase (Scenario Card) */}
          <section className={`glass-card rounded-[32px] p-lg space-y-md transition-all duration-500 ${phase !== 'hook' ? 'opacity-50 grayscale pointer-events-none' : 'shadow-[0_20px_50px_rgba(139,92,246,0.15)] ring-2 ring-primary/20'}`}>
            <div className="flex items-center gap-sm">
              <div className="w-16 h-16 bg-primary-fixed rounded-[20px] flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[32px]">rocket_launch</span>
              </div>
              <h2 className="font-h3 text-h3">{t.lab.whatHappensNext}</h2>
            </div>
            <div className="bg-surface-bright p-6 rounded-[24px] border border-surface-variant mt-4">
              <p className="font-h3 text-xl text-on-surface leading-relaxed">{mission.phases.hook.scenarioText[lang as 'is' | 'en']}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {mission.phases.hook.options[lang as 'is' | 'en'].map((opt, i) => (
                <button 
                  key={i} 
                  onClick={handleStartLab}
                  className="p-6 border-2 border-surface-variant hover:border-primary hover:text-primary hover:bg-primary-fixed/30 rounded-[24px] text-left bg-white font-bold transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
                >
                  <span className="text-lg">{opt}</span>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-[24px]">check_circle</span>
                </button>
              ))}
            </div>
          </section>

          {/* Phase 2: Lab Phase (Chat UI) */}
          <section className={`glass-card rounded-[32px] flex flex-col h-[600px] overflow-hidden transition-all duration-500 ${phase === 'hook' ? 'hidden' : phase !== 'lab' ? 'opacity-50 grayscale pointer-events-none' : 'shadow-[0_20px_50px_rgba(139,92,246,0.15)] ring-2 ring-primary/20'}`}>
            <div className="p-6 border-b border-white/40 flex items-center justify-between gap-sm bg-gradient-to-r from-primary-fixed/50 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[16px] bg-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-white text-[24px]">bolt</span>
                </div>
                <div>
                  <div className="font-bold text-primary text-lg leading-tight">Spark</div>
                  {phase === 'lab' && (
                    <div className="flex gap-1.5 items-center mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active</span>
                    </div>
                  )}
                </div>
              </div>
              {phase === 'lab' && (
                <button 
                  onClick={handleFinishLab}
                  className="bg-primary text-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20"
                >
                  {t.lab.imReady}
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-bright/30">
              {/* Objective Banner - Made highly prominent for clarity */}
              <div className="bg-gradient-to-r from-primary-container to-secondary-container p-6 rounded-[24px] border-2 border-primary/30 shadow-[0_8px_30px_rgba(139,92,246,0.2)] flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                <div className="w-14 h-14 shrink-0 bg-white rounded-full flex items-center justify-center shadow-inner text-primary">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary tracking-widest uppercase text-xs mb-1">{t.lab.objective}</h3>
                  <p className="text-on-primary-container font-h3 text-lg leading-snug">
                    {mission.phases.lab.goalText[lang as 'is' | 'en']}
                  </p>
                </div>
              </div>

              {chatHistory.length === 0 && (
                <div className="text-center text-outline italic my-8">
                  {t.lab.firstMessagePrompt}
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse ml-auto' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                      AI
                    </div>
                  )}
                  <div className={`p-4 rounded-[20px] font-medium shadow-sm border ${msg.role === 'user' ? 'bg-gradient-to-br from-primary to-secondary text-white border-transparent rounded-br-[4px]' : 'bg-white border-white/60 text-on-surface rounded-bl-[4px]'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex gap-sm items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center text-primary text-xs font-bold">AI</div>
                  <div className="bg-white px-4 py-3 rounded-full flex gap-1 border border-surface-variant">
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-white/60 border-t border-white/40 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="flex gap-2 bg-white rounded-full p-2 border-2 border-primary/10 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-sm">
                <input 
                  className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-2 text-lg font-medium outline-none disabled:opacity-50 text-on-surface placeholder:text-outline" 
                  placeholder={t.lab.typeAnswer}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isChatLoading || phase !== 'lab'}
                />
                <button 
                  type="submit"
                  disabled={isChatLoading || !inputValue.trim() || phase !== 'lab'}
                  className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-md"
                >
                  <span className="material-symbols-outlined text-[24px]" style={{ marginLeft: '4px' }}>send</span>
                </button>
              </form>
            </div>
          </section>

          {/* Phase 3: Reflection Phase (Question Card) */}
          <section className={`glass-card rounded-[32px] p-lg space-y-md border-secondary/20 border-2 relative overflow-hidden transition-all duration-500 ${phase !== 'reflection' ? 'hidden' : 'shadow-[0_20px_50px_rgba(253,86,167,0.15)] ring-2 ring-secondary/20'}`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 pointer-events-none"></div>
            <div className="flex items-center gap-sm relative">
              <div className="w-16 h-16 bg-secondary-fixed rounded-[20px] flex items-center justify-center text-secondary shadow-sm">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <h2 className="font-h3 text-h3">{t.lab.finalTask}</h2>
            </div>
            
            <div className="space-y-4 relative pt-4">
              <label className="font-body-lg text-2xl font-bold text-on-surface block leading-snug">
                {mission.phases.reflection.question[lang as 'is' | 'en']}
              </label>
              <textarea 
                className="w-full min-h-[160px] rounded-[24px] border-2 border-white/60 bg-white/80 p-6 text-lg font-body-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-inner resize-none" 

                placeholder={t.lab.writeThoughts}
                value={reflectionAnswer}
                onChange={(e) => setReflectionAnswer(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              onClick={handleCompleteMission}
              disabled={isSaving || !reflectionAnswer.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary-container text-white font-h3 py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
              style={{ boxShadow: '0 0 40px rgba(132, 85, 239, 0.4)' }}
            >
              {isSaving ? t.common.saving : t.lab.finishMission}
            </button>
          </section>

        </div>
      </main>

    </div>
  );
}
