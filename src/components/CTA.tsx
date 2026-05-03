'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from './DictionaryProvider';

export default function CTA() {
  const { t, lang } = useTranslation();

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto text-center">
      <div className="glass-card rounded-[32px] p-12 vibrant-gradient shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 blur-3xl pointer-events-none"></div>
        
        <h2 className="font-h2 text-h2 text-white mb-6 relative z-10">
          {t.landing.ctaTitle}
        </h2>
        
        <p className="text-xl text-white/90 max-w-[500px] mx-auto mb-10 leading-relaxed relative z-10">
          {t.landing.ctaDesc}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <Link href={`/${lang}/login`} className="bg-white text-primary px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform">
            {t.landing.registerParent}
          </Link>
          <Link href={`/${lang}/join`} className="bg-primary-fixed/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-primary-fixed/30 transition-colors">
            {t.landing.viewForSchools}
          </Link>
        </div>
      </div>
    </section>
  );
}
