import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import { getDictionary, Locale } from '@/dictionaries';
import { articlesData } from '@/lib/articlesData';

export default async function ArticlesPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict; // Note: We use root dictionary for shared keys, or specific keys

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-fixed min-h-screen pb-20 md:pb-0">
      <TopBar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Header */}
        <header className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>article</span>
            {t.landing.articlesTitle}
          </div>
          <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mx-auto leading-tight">
            {t.landing.articlesTitle}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t.landing.articlesSubtitle}
          </p>
        </header>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article) => (
            <Link 
              key={article.id} 
              href={`/${lang}/articles/${article.slug}`}
              className="glass-card rounded-[24px] overflow-hidden group flex flex-col hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] transition-all duration-300 hover:-translate-y-2 border border-white/40"
            >
              {/* Fake Image Placeholder - using gradient */}
              <div className="h-48 w-full bg-gradient-to-br from-primary-container to-secondary-container relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <span className="material-symbols-outlined text-primary text-[64px]">local_library</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{article.readTime} {t.landing.readTime}</span>
                </div>
                
                <h3 className="font-h3 text-xl mb-4 text-on-surface group-hover:text-primary transition-colors">
                  {article.title[lang]}
                </h3>
                
                <p className="text-on-surface-variant text-sm leading-relaxed flex-grow mb-6">
                  {article.excerpt[lang]}
                </p>
                
                <div className="flex items-center text-primary font-bold text-sm mt-auto">
                  {t.landing.readArticle}
                  <span className="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-surface-variant pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-surface-variant/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body-md text-xs text-on-surface-variant/70">{t.landing.footer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
