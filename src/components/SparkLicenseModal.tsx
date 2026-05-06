import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/components/DictionaryProvider';

interface SparkLicenseModalProps {
  onClose: () => void;
}

export default function SparkLicenseModal({ onClose }: SparkLicenseModalProps) {
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Basic delay to trigger entrance animations
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className={`relative w-full max-w-lg glass-card p-10 rounded-[32px] text-center shadow-[0_0_100px_rgba(139,92,246,0.3)] transition-all duration-700 transform ${showConfetti ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}`}
      >
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] pointer-events-none"></div>
        
        {/* Confetti / Starburst decoration (CSS only) */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 to-amber-500 rounded-[24px] rotate-12 flex items-center justify-center shadow-2xl mb-8 border-4 border-white">
            <span className="material-symbols-outlined text-white text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>

          <h2 className="font-h1 text-4xl text-on-surface mb-4">
            {t.missions.sparkLicenseTitle || 'Til hamingju!'}
          </h2>
          
          <p className="font-body-lg text-lg text-on-surface-variant mb-8 leading-relaxed">
            {t.missions.sparkLicenseDesc || 'Þú hefur klárað AI Fluency grunninn og fengið Spark leyfið! Nú hefurðu opnað fyrir ný og spennandi verkefni í Skill Tree.'}
          </p>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sjá nýju verkefnin
          </button>
        </div>
      </div>
    </div>
  );
}
