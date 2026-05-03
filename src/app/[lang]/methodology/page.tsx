import { getDictionary, Locale } from '@/dictionaries';
import Link from 'next/link';
import TopBar from '@/components/TopBar';

export default async function MethodologyPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.methodology;

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-fixed min-h-screen pb-20 md:pb-0">
      <TopBar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Header */}
        <header className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-caps text-label-caps uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            {t.badge}
          </div>
          <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mx-auto leading-tight">
            {t.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.titleHighlight}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t.desc}
          </p>
        </header>

        {/* Bento Grid Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* 1. Delegation */}
          <div className="md:col-span-8 glass-card rounded-[24px] p-md flex flex-col md:flex-row gap-8 items-center overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40">
            <div className="w-full md:w-1/2 space-y-4 order-2 md:order-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">{t.d1Title}</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t.d1Desc}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> {t.d1L1}</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> {t.d1L2}</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> {t.d1L3}</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined text-white text-[72px] opacity-70">assignment_ind</span>
              </div>
            </div>
          </div>

          {/* 2. Description */}
          <div className="md:col-span-4 glass-card rounded-[24px] p-md bg-gradient-to-br from-violet-50/50 to-white border border-white/40">
            <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-2xl">
                <span className="material-symbols-outlined text-white text-[72px] opacity-70">description</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">{t.d2Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {t.d2Desc}
              </p>
            </div>
          </div>

          {/* 3. Discernment */}
          <div className="md:col-span-4 glass-card rounded-[24px] p-md flex flex-col justify-between bg-white/70 border border-white/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">{t.d3Title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {t.d3Desc}
              </p>
            </div>
            <div className="mt-8 p-4 bg-white/50 rounded-xl border border-white/80 shadow-inner">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-tighter text-on-surface-variant">{t.d3Live}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 4. Diligence */}
          <div className="md:col-span-8 glass-card rounded-[24px] p-md flex flex-col md:flex-row gap-8 items-center bg-white shadow-xl shadow-primary/5 border border-white/40">
            <div className="w-full md:w-2/5 h-64 md:h-full relative">
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[72px] opacity-70">bolt</span>
              </div>
            </div>
            <div className="w-full md:w-3/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">{t.d4Title}</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t.d4Desc}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-primary-fixed/30 rounded-lg">
                  <span className="block text-xl font-bold text-primary">{t.d4L1}</span>
                  <span className="text-[10px] uppercase font-bold text-primary-container">{t.d4L1Sub}</span>
                </div>
                <div className="p-3 bg-secondary-fixed/30 rounded-lg">
                  <span className="block text-xl font-bold text-secondary">{t.d4L2}</span>
                  <span className="text-[10px] uppercase font-bold text-on-secondary-fixed-variant">{t.d4L2Sub}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Educational Value Section */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-h2 text-on-surface mb-4">{t.safeTitle}</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">{t.safeDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
              <div className="mb-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]">verified_user</span>
              </div>
              <h4 className="font-h3 text-[20px] mb-3">{t.safe1Title}</h4>
              <p className="text-on-surface-variant text-sm">{t.safe1Desc}</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
              <div className="mb-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[32px]">psychology</span>
              </div>
              <h4 className="font-h3 text-[20px] mb-3">{t.safe2Title}</h4>
              <p className="text-on-surface-variant text-sm">{t.safe2Desc}</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
              <div className="mb-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600 text-[32px]">family_restroom</span>
              </div>
              <h4 className="font-h3 text-[20px] mb-3">{t.safe3Title}</h4>
              <p className="text-on-surface-variant text-sm">{t.safe3Desc}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 p-lg rounded-[40px] bg-gradient-to-br from-primary to-primary-container text-white overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-h1 text-[40px] leading-tight mb-6">{t.ctaTitle}</h2>
            <p className="text-primary-fixed text-body-lg mb-10 opacity-90">{t.ctaDesc}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/login`} className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                {t.ctaStart}
              </Link>
              <Link href={`/${lang}/join`} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                {t.ctaPlay}
              </Link>
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-secondary-container/30 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute right-10 bottom-[-20%] w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none"></div>
        </section>
      </main>

    </div>
  );
}
