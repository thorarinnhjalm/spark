'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from './DictionaryProvider';

export default function Hero() {
  const { t, lang } = useTranslation();

  return (
    <section className="py-24 text-center max-w-4xl mx-auto px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-container/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="inline-block px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant text-sm font-bold text-primary">
          {t.landing.forKids}
        </div>
        
        <h1 className="font-h1 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-on-surface">
          {t.landing.heroTitle1}
          <span className="text-transparent bg-clip-text vibrant-gradient">
            {t.landing.heroTitleHighlight}
          </span>
          <br />
          {t.landing.heroTitle2}
        </h1>
        
        <p className="text-xl text-on-surface-variant max-w-[600px] mx-auto leading-relaxed">
          {t.landing.heroDesc}
        </p>
        
        <div className="flex gap-4 mt-4">
          <Link href={`/${lang}/join`} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform">
            {t.landing.tryFree}
          </Link>
          <Link href="#framework" className="bg-surface-variant text-on-surface-variant px-8 py-4 rounded-2xl font-bold hover:bg-surface-dim transition-colors">
            {t.landing.readMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
