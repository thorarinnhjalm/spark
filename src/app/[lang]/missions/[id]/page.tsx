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

  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Auth Check
  useEffect(() => {
    if (!loading && !user) router.push(`/${lang}/join`);
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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      await saveMissionProgress(user.uid, mission.missionId, mission.xpReward, reflectionAnswer);
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
          <p className="font-body-lg text-on-surface mb-8 relative z-10">{t.lab.youGotXp} <strong className="text-emerald-600">{mission.xpReward} XP</strong> {t.lab.forCompleting} {mission.title}!</p>
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
  let phaseText = 'Phase 1: Scenario';
  if (phase === 'lab') { progressWidth = '66%'; phaseText = 'Phase 2: Lab Phase'; }
  if (phase === 'reflection') { progressWidth = '100%'; phaseText = 'Phase 3: Reflection'; }

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen pb-24 md:pb-0">
      {/* TopNavBar */}
      <header className="bg-white/70 backdrop-blur-xl dark:bg-slate-900/70 border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-violet-600 dark:text-violet-400">Spark AI</div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/missions`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-violet-700 dark:text-violet-300 border-b-2 border-violet-500 pb-1">{t.nav.missions}</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href={`/${lang}/missions`} className="hidden md:block bg-surface-variant text-on-surface-variant px-4 py-2 rounded-xl font-semibold scale-95 active:scale-90 transition-transform">{t.lab.quit}</Link>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-gutter py-xl space-y-xl">
        {/* Progress Header */}
        <div className="flex flex-col gap-sm">
          <div className="flex justify-between items-end">
            <h1 className="font-h2 text-h2 text-primary">{mission.title}</h1>
            <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">{phaseText}</span>
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
          <section className={`glass-card rounded-xl p-md space-y-md transition-all duration-500 ${phase !== 'hook' ? 'opacity-50 grayscale pointer-events-none' : 'shadow-lg ring-2 ring-primary-container/20'}`}>
            <div className="flex items-center gap-sm">
              <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h2 className="font-h3 text-h3">{t.lab.whatHappensNext}</h2>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{mission.phases.hook.scenarioText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
              {mission.phases.hook.options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={handleStartLab}
                  className="p-md border-2 border-outline-variant hover:border-primary-container hover:text-primary rounded-xl text-left bg-white font-semibold transition-colors flex items-center justify-between group"
                >
                  {opt}
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">check_circle</span>
                </button>
              ))}
            </div>
          </section>

          {/* Phase 2: Lab Phase (Chat UI) */}
          <section className={`glass-card rounded-xl flex flex-col h-[500px] transition-all duration-500 ${phase === 'hook' ? 'hidden' : phase !== 'lab' ? 'opacity-50 grayscale pointer-events-none' : 'shadow-lg ring-2 ring-primary-container/20'}`}>
            <div className="p-base border-b border-outline-variant/40 flex items-center justify-between gap-sm bg-white/30">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">bolt</span>
                </div>
                <span className="font-bold text-primary">Spark AI</span>
                {phase === 'lab' && (
                  <span className="ml-auto flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active</span>
                  </span>
                )}
              </div>
              {phase === 'lab' && (
                <button 
                  onClick={handleFinishLab}
                  className="bg-secondary-container text-white px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform"
                >
                  {t.lab.imReady}
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-md space-y-md bg-surface-bright/50">
              {/* Objective Banner */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant text-sm font-medium text-on-surface-variant flex items-start gap-2 mb-4">
                <span className="material-symbols-outlined text-primary-container text-lg">flag</span>
                <span><strong>{t.lab.objective}</strong> {mission.phases.lab.goalText}</span>
              </div>

              {chatHistory.length === 0 && (
                <div className="text-center text-outline italic my-8">
                  {t.lab.firstMessagePrompt}
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-sm max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse ml-auto' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center text-primary font-bold text-xs">
                      AI
                    </div>
                  )}
                  <div className={`p-md rounded-2xl font-medium shadow-sm border ${msg.role === 'user' ? 'bg-gradient-to-br from-primary to-secondary-container text-white border-transparent rounded-br-sm' : 'bg-white border-surface-variant text-on-surface rounded-bl-sm'}`}>
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

            <div className="p-md bg-white/50 border-t border-outline-variant/40">
              <form onSubmit={handleSendMessage} className="flex gap-sm bg-white rounded-full p-2 border border-outline-variant focus-within:ring-2 ring-primary-fixed transition-all">
                <input 
                  className="flex-1 bg-transparent border-none focus:ring-0 px-4 font-medium outline-none disabled:opacity-50" 
                  placeholder={t.lab.typeAnswer}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isChatLoading || phase !== 'lab'}
                />
                <button 
                  type="submit"
                  disabled={isChatLoading || !inputValue.trim() || phase !== 'lab'}
                  className="w-10 h-10 bg-primary-container text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>send</span>
                </button>
              </form>
            </div>
          </section>

          {/* Phase 3: Reflection Phase (Question Card) */}
          <section className={`glass-card rounded-xl p-md space-y-md border-primary-container/20 border-2 relative overflow-hidden transition-all duration-500 ${phase !== 'reflection' ? 'hidden' : 'shadow-lg ring-2 ring-primary-container/20'}`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/5 to-secondary-container/5 pointer-events-none"></div>
            <div className="flex items-center gap-sm relative">
              <div className="w-12 h-12 bg-secondary-fixed rounded-xl flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <h2 className="font-h3 text-h3">{t.lab.finalTask}</h2>
            </div>
            
            <div className="space-y-sm relative">
              <label className="font-body-lg text-body-lg font-bold text-on-surface block">
                {mission.phases.reflection.question}
              </label>
              <textarea 
                className="w-full min-h-[120px] rounded-xl border border-outline-variant bg-surface-container-low p-md font-body-md focus:border-primary focus:ring-primary-container focus:ring-2 transition-all outline-none" 
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
