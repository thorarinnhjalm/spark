'use client';

import React from 'react';
import { useTranslation } from './DictionaryProvider';

export default function FourDFramework() {
  const { t } = useTranslation();

  const steps = [
    {
      id: 'D1',
      title: t.landing.frameworkD1Title,
      description: t.landing.frameworkD1Desc,
      icon: 'search',
      color: '#8B5CF6'
    },
    {
      id: 'D2',
      title: t.landing.frameworkD2Title,
      description: t.landing.frameworkD2Desc,
      icon: 'architecture',
      color: '#EC4899'
    },
    {
      id: 'D3',
      title: t.landing.frameworkD3Title,
      description: t.landing.frameworkD3Desc,
      icon: 'code',
      color: '#10B981'
    },
    {
      id: 'D4',
      title: t.landing.frameworkD4Title,
      description: t.landing.frameworkD4Desc,
      icon: 'fact_check',
      color: '#F59E0B'
    }
  ];

  return (
    <section id="framework" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-h2 text-h2 text-center text-on-surface mb-16">
        {t.landing.frameworkTitle}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="glass-card rounded-[24px] p-8 border border-outline-variant hover:border-primary-container hover:shadow-lg transition-all group">
            <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform" style={{ background: step.color }}>
              <span className="material-symbols-outlined text-3xl">{step.icon}</span>
            </div>
            <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: step.color }}>{step.id}</div>
            <h3 className="font-h3 text-xl mb-3 text-on-surface">{step.title}</h3>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
