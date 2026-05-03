'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { missionsData } from '@/lib/missionsData';
import { saveMissionProgress } from '@/lib/db';

type Phase = 'hook' | 'lab' | 'reflection' | 'success';

export default function ActiveMissionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const missionId = params.id as string;
  
  // Við getum bara reiknað þetta beint þar sem gögnin eru static
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
    if (!loading && !user) router.push('/join');
  }, [user, loading, router]);

  // Ef mission finnst ekki
  useEffect(() => {
    if (!mission && !loading) {
      router.push('/missions');
    }
  }, [mission, loading, router]);

  useEffect(() => {
    // Scrolla niður þegar ný skilaboð koma
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

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
          message: userMessage
        })
      });
      
      const data = await res.json();
      if (data.reply) {
        setChatHistory([...newHistory, { role: 'ai', text: data.reply }]);
      } else {
        setChatHistory([...newHistory, { role: 'ai', text: 'Úbbs, sambandsleysi! Prófaðu aftur.' }]);
      }
    } catch {
      setChatHistory([...newHistory, { role: 'ai', text: 'Villa kom upp í kerfinu.' }]);
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
      alert('Tókst ekki að vista. Prófaðu aftur.');
      setIsSaving(false);
    }
  };

  if (loading || !mission || !user) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Hleður...</div>;

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '800px' }}>
      
      {/* 1. HOOK PHASE */}
      {phase === 'hook' && (
        <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '10px' }}>{mission.title}</h1>
          <div style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '20px', fontWeight: 'bold' }}>
            +{mission.xpReward} XP
          </div>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: 'white' }}>
            {mission.phases.hook.scenarioText}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {mission.phases.hook.options.map((opt, i) => (
              <button key={i} onClick={handleStartLab} className="btn-outline" style={{ fontSize: '1.1rem', padding: '15px' }}>
                👉 {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. LAB PHASE (AI CHAT) */}
      {phase === 'lab' && (
        <div style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <div className="glass-panel" style={{ padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Markmið:</strong> {mission.phases.lab.goalText}
            </div>
            <button onClick={handleFinishLab} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Ég er tilbúin(n)
            </button>
          </div>

          <div className="glass-panel" style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {chatHistory.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: 'auto' }}>
                Sendu fyrstu skilaboðin til að byrja...
              </div>
            )}
            
            {chatHistory.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '80%',
                borderBottomRightRadius: msg.role === 'user' ? 0 : '12px',
                borderBottomLeftRadius: msg.role === 'ai' ? 0 : '12px',
              }}>
                {msg.text}
              </div>
            ))}
            {isChatLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '12px', opacity: 0.7 }}>
                Er að hugsa...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Skrifaðu skilaboð..."
              style={{ flexGrow: 1, padding: '15px', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              disabled={isChatLoading}
            />
            <button type="submit" className="btn-primary" disabled={isChatLoading || !inputValue.trim()}>
              Senda
            </button>
          </form>
        </div>
      )}

      {/* 3. REFLECTION PHASE */}
      {phase === 'reflection' && (
        <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Loka spurning!</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>
            {mission.phases.reflection.question}
          </p>
          <textarea
            value={reflectionAnswer}
            onChange={(e) => setReflectionAnswer(e.target.value)}
            placeholder="Skrifaðu svarið þitt hér..."
            style={{ width: '100%', minHeight: '150px', padding: '15px', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.05)', color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}
          />
          <button onClick={handleCompleteMission} className="btn-primary" disabled={isSaving || !reflectionAnswer.trim()} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
            {isSaving ? 'Vistar...' : 'Senda og klára verkefni'}
          </button>
        </div>
      )}

      {/* 4. SUCCESS PHASE */}
      {phase === 'success' && (
        <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', border: '2px solid #10b981', boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}>
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
          <h1 style={{ marginBottom: '10px', color: '#10b981' }}>Vel Gert!</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Þú fékkst {mission.xpReward} XP stig fyrir að klára {mission.title}!</p>
          <button onClick={() => router.push('/missions')} className="btn-primary">
            Aftur í Ævintýrakortið
          </button>
        </div>
      )}

    </div>
  );
}
