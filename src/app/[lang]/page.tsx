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
  const whyT = dict.why;
  const credT = dict.credibility;

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": t.faq1Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq1A } },
      { "@type": "Question", "name": t.faq2Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq2A } },
      { "@type": "Question", "name": t.faq3Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq3A } },
      { "@type": "Question", "name": t.faq4Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq4A } },
      { "@type": "Question", "name": t.faq5Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq5A } },
      { "@type": "Question", "name": t.faq6Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq6A } },
      { "@type": "Question", "name": t.faq7Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq7A } },
      { "@type": "Question", "name": t.faq8Q, "acceptedAnswer": { "@type": "Answer", "text": t.faq8A } }
    ]
  };
  

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      {/* TopNavBar */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_20px_rgba(139,92,246,0.1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Spark logo" className="h-12 w-auto object-contain" />
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link href={`/${lang}/methodology`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
              {navT.methodology}
            </Link>
            <Link href={`/${lang}/articles`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
              {navT.articles}
            </Link>
            <Link href={`/${lang}#faq`} className="font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-tight text-slate-500 hover:text-primary transition-all duration-300">
              {navT.faq}
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <ul className="flex items-center gap-4">
              <li><LanguageSwitcher /></li>
              <li className="hidden sm:block">
                <Link href={`/${lang}/login`} className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
                  {navT.parentLogin}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/join`} className="px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  {navT.startLearning}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* BEGIN: HeroSection */}
        <section className="relative text-center flex flex-col items-center mb-32">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-fixed/50 text-primary-fixed-variant text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px] mr-2" aria-hidden="true">auto_awesome</span>
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
          
        </section>

        {/* BEGIN: Why Section */}
        <section className="mb-32">
          {/* Credibility badge */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 mb-12">
            <span className="inline-flex shrink-0 items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed/50 text-primary-fixed-variant text-xs font-bold uppercase tracking-wider border border-primary/20 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
              {credT.badge}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-semibold text-on-surface-variant text-center">
              <span>{credT.authors}</span>
              <span className="text-slate-300">·</span>
              <span>{credT.partner}</span>
              <span className="text-slate-300">·</span>
              <span>{credT.researchStat}</span>
            </div>
          </div>

          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="font-h2 text-3xl md:text-4xl text-on-surface leading-snug">
              {whyT.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Parent column */}
            <div className="glass-card p-10 rounded-[32px] flex flex-col gap-4">
              <div className="w-14 h-14 rounded-[18px] bg-primary-fixed flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">family_restroom</span>
              </div>
              <h3 className="font-h3 text-xl text-on-surface">{whyT.parentTitle}</h3>
              <p className="text-on-surface-variant leading-relaxed">{whyT.parentBody}</p>
            </div>

            {/* Child column */}
            <div className="glass-card p-10 rounded-[32px] flex flex-col gap-4">
              <div className="w-14 h-14 rounded-[18px] bg-secondary-fixed flex items-center justify-center text-secondary-container mb-2">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">school</span>
              </div>
              <h3 className="font-h3 text-xl text-on-surface">{whyT.childTitle}</h3>
              <p className="text-on-surface-variant leading-relaxed">{whyT.childBody}</p>
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
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">assignment_ind</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD1Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD1Desc}
              </p>
            </div>
            
            {/* Card: Description */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(253,86,167,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-secondary-fixed flex items-center justify-center mb-6 text-secondary-container">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">description</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD2Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD2Desc}
              </p>
            </div>

            {/* Card: Discernment */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-amber-100 flex items-center justify-center mb-6 text-amber-600">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">visibility</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD3Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD3Desc}
              </p>
            </div>

            {/* Card: Diligence */}
            <div className="glass-card p-8 rounded-[32px] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-[20px] bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">bolt</span>
              </div>
              <h3 className="font-h3 text-xl mb-4 text-on-surface">{t.frameworkD4Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                {t.frameworkD4Desc}
              </p>
            </div>
          </div>
        </section>

        {/* BEGIN: Social Proof Section (Hidden until reviews arrive) 
        <section className="mb-32 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="font-h2 text-3xl md:text-4xl text-on-surface mb-4">
              {lang === 'is' ? 'Hvað segja aðrir foreldrar?' : 'What other parents are saying'}
            </h2>
          </div>
          <div className="w-full max-w-4xl flex justify-center">
            <iframe 
              src="https://umsognin.is/d/spark?theme=glass&color=%23000000&minRating=4" 
              width="100%" 
              height="280px" 
              style={{ border: 'none', overflow: 'hidden' }}
              title="Umsagnir viðskiptavina"
            ></iframe>
          </div>
        </section>
        */}
        {/* BEGIN: Blog Hook Section */}
        <section className="mb-32">
          <div className="glass-card p-12 rounded-[40px] text-center border-t border-white/60 shadow-[0_20px_40px_rgba(139,92,246,0.05)] bg-gradient-to-br from-surface to-surface-variant/30">
            <h2 className="font-h2 text-3xl md:text-4xl text-on-surface mb-6">{t.blogHookTitle}</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.blogHookDesc}
            </p>
            <Link 
              href={`/${lang}/methodology`}
              className="inline-block px-8 py-4 bg-white text-primary border border-primary/20 rounded-[20px] font-bold shadow-sm hover:shadow-md hover:bg-primary-fixed/30 hover:-translate-y-1 transition-all"
            >
              {t.blogHookCTA}
            </Link>
          </div>
        </section>


        {/* BEGIN: Articles Hook Section */}
        <section className="mb-32">
          <div className="glass-card p-12 rounded-[40px] text-center border-t border-white/60 shadow-[0_20px_40px_rgba(139,92,246,0.05)] bg-gradient-to-bl from-surface to-surface-variant/30 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-container opacity-30 blur-3xl rounded-full pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="font-h2 text-3xl md:text-4xl text-on-surface mb-6">{t.articlesHookTitle}</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
                {t.articlesHookDesc}
              </p>
              <Link 
                href={`/${lang}/articles`}
                className="inline-block px-8 py-4 bg-primary text-white rounded-[20px] font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {t.articlesHookCTA}
              </Link>
            </div>
          </div>
        </section>

        {/* BEGIN: FAQ Section */}
        <section id="faq" className="scroll-mt-32 mb-32">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-4xl text-on-surface mb-4">{t.faqTitle}</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
              { q: t.faq5Q, a: t.faq5A },
              { q: t.faq6Q, a: t.faq6A },
              { q: t.faq7Q, a: t.faq7A },
              { q: t.faq8Q, a: t.faq8A },
            ].map((faq, i) => (
              <details key={i} className="group glass-card rounded-[24px] overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-8 font-bold text-on-surface text-lg hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-8 pb-8 -mt-2 text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
        {/* END: FAQ Section */}

      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-surface-variant pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="Spark" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-on-surface-variant text-sm pr-8 leading-relaxed">
                {t.footerMission}
              </p>
            </div>
            
            {/* Product Column */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-on-surface mb-6">{t.footerProduct}</h4>
              <ul className="space-y-4">
                <li><Link href={`/${lang}/methodology`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerProductMethodology}</Link></li>
                <li><Link href={`/${lang}/join`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerProductJoin}</Link></li>
                <li><Link href={`/${lang}/login`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerProductLogin}</Link></li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-on-surface mb-6">{t.footerCompany}</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerCompanyAbout}</a></li>
                <li><a href="mailto:thorarinnhjalmarsson@gmail.com" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerCompanyContact}</a></li>
              </ul>
            </div>
            
            {/* Legal Column */}
            <div className="md:col-span-3">
              <h4 className="font-bold text-on-surface mb-6">{t.footerLegal}</h4>
              <ul className="space-y-4">
                <li><Link href={`/${lang}/terms`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerLegalTerms}</Link></li>
                <li><Link href={`/${lang}/privacy`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footerLegalPrivacy}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-variant/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body-md text-xs text-on-surface-variant/70">{t.footer}</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">facebook</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
