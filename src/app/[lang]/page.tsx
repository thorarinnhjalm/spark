import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getDictionary, Locale } from '@/dictionaries';

// Server Component for the Landing Page
export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.landing;
  const navT = dict.nav;

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      {/* TopNavBar */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-primary">Spark AI</div>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/methodology`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
              {navT.methodology}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link 
              href={`/${lang}/login`} 
              className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors hidden sm:block"
            >
              {navT.parentLogin}
            </Link>
            <Link 
              href={`/${lang}/join`} 
              className="px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              {navT.startLearning}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* BEGIN: HeroSection */}
        <section className="relative text-center flex flex-col items-center mb-32">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-fixed/50 text-primary-fixed-variant text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px] mr-2">auto_awesome</span>
            {t.heroBadge}
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-h1 text-on-surface tracking-tight mb-6 max-w-4xl">
            {t.heroTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.heroTitleHighlight}</span> {t.heroTitle2}
          </h1>
          
          {/* Subheadline */}
          <p className="max-w-2xl mx-auto font-body-lg text-lg text-on-surface-variant mb-10 leading-relaxed">
            {t.heroDesc}
          </p>
          
          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 w-full sm:w-auto">
            <Link 
              href={`/${lang}/login`}
              className="px-10 py-4 bg-primary text-white rounded-[20px] font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto"
            >
              {t.heroCreateAccount}
            </Link>
            <Link 
              href={`/${lang}/methodology`}
              className="px-10 py-4 bg-white text-primary border-2 border-primary/10 rounded-[20px] font-bold hover:bg-primary-fixed/30 active:scale-95 transition-all w-full sm:w-auto"
            >
              {t.heroViewMethodology}
            </Link>
          </div>
          
          {/* 3D Graphic Image in Bento Card */}
          <div className="relative w-full max-w-5xl mx-auto glass-card rounded-[40px] p-4 shadow-[0_30px_60px_rgba(139,92,246,0.15)]">
            <div className="w-full h-auto rounded-[32px] overflow-hidden bg-gradient-to-b from-primary-fixed to-surface-container-low">
              <img 
                alt="Spark AI Interactive Graphic" 
                className="w-full h-auto mix-blend-multiply opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVyNuehyUyzFqbI9ypmfecIGq5aFTgjQNWxzQ5DyLaPESjS2CyvM951KIbm2Nb0BR3Qa0taSZIyMqY46drYcV1O6kFpGpNwImkncfc1B1Q0nAdjd986VppoN4YeseXqT-qf2oWjWrWzZ6JXrLYxV_5P8qe9IwQhaFqG5UVwBmVDR5iwNP-QfIltfTTEL5VEurDHxcXRUDkhyCHFSZX540i50_DmevlfosMH5sN2n6oRt6G6I7De0Wh1GAUSkIzlibZnQDd90ZP5801" 
              />
            </div>
          </div>
        </section>

        {/* BEGIN: 4D Framework Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-4xl text-on-surface mb-4">{t.frameworkTitle}</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {t.frameworkDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card: Delegation */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-primary-fixed flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_ind</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD1Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD1Desc}
              </p>
            </div>
            
            {/* Card: Description */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(253,86,167,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-secondary-fixed flex items-center justify-center mb-6 text-secondary-container">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD2Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD2Desc}
              </p>
            </div>

            {/* Card: Discernment */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-amber-100 flex items-center justify-center mb-6 text-amber-600">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD3Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD3Desc}
              </p>
            </div>

            {/* Card: Diligence */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD4Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD4Desc}
              </p>
            </div>
          </div>
        </section>

        {/* BEGIN: Pricing Section */}
        <section className="mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-primary-fixed/40 to-secondary-fixed/40 blur-3xl -z-10 rounded-full"></div>
          
          <div className="text-center mb-16">
            <h2 className="font-h2 text-4xl text-on-surface mb-4">{t.pricingTitle}</h2>
            <p className="font-body-lg text-on-surface-variant">{t.pricingDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-10 rounded-[40px] flex flex-col relative z-10 border border-white/60">
              <h3 className="font-h1 text-4xl mb-2 text-on-surface">{t.pricingCardFreeTitle}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-extrabold">{t.pricingCardFreePrice}</span>
                <span className="text-on-surface-variant text-sm ml-2">/ {t.pricingCardFreeTime}</span>
              </div>
              <p className="text-on-surface-variant font-body-md mb-8">{t.pricingCardFreeDesc}</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center font-bold text-on-surface">
                  <span className="material-symbols-outlined text-primary mr-3" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.pricingCardFreeFeat1}
                </li>
                <li className="flex items-center font-bold text-on-surface">
                  <span className="material-symbols-outlined text-primary mr-3" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.pricingCardFreeFeat2}
                </li>
                <li className="flex items-center font-bold text-on-surface">
                  <span className="material-symbols-outlined text-primary mr-3" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.pricingCardFreeFeat3}
                </li>
              </ul>
              
              <Link href={`/${lang}/join`} className="w-full py-4 text-center border-2 border-primary/20 text-primary font-bold rounded-[20px] hover:bg-primary-fixed/50 transition-all">
                {t.pricingCardFreeCta}
              </Link>
            </div>
            
            {/* Family Plan */}
            <div className="bg-gradient-to-br from-primary to-secondary p-10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col z-10 text-white">
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider w-fit mb-8 backdrop-blur-md">Premium</span>
              <h3 className="font-h1 text-4xl mb-2">{t.pricingCardProTitle}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-extrabold">{t.pricingCardProPrice}</span>
                <span className="text-white/80 text-sm ml-2">/ {t.pricingCardProTime}</span>
              </div>
              <p className="text-white/80 font-body-md mb-8">{t.pricingCardProDesc}</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center font-bold">
                  <span className="material-symbols-outlined mr-3 text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.pricingCardProFeat1}
                </li>
                <li className="flex items-center font-bold">
                  <span className="material-symbols-outlined mr-3 text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.pricingCardProFeat2}
                </li>
                <li className="flex items-center font-bold">
                  <span className="material-symbols-outlined mr-3 text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.pricingCardProFeat3}
                </li>
              </ul>
              
              <Link href={`/${lang}/login`} className="w-full py-4 text-center bg-white text-primary font-bold rounded-[20px] shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                {t.pricingCardProCta}
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-surface-variant pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <span className="text-2xl font-black tracking-tighter text-primary">Spark AI Fluency</span>
              </div>
              <p className="text-on-surface-variant text-xs">
                {t.footer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
