import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopBar from '@/components/TopBar';
import { getDictionary, Locale } from '@/dictionaries';
import { articlesData } from '@/lib/articlesData';

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
  const paths: any[] = [];
  ['is', 'en'].forEach((lang) => {
    articlesData.forEach((article) => {
      paths.push({ lang, slug: article.slug });
    });
  });
  return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<import('next').Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const article = articlesData.find(a => a.slug === resolvedParams.slug);

  if (!article) return {};

  const title = `${article.title[lang]} | Spark`;
  const description = article.excerpt[lang];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title[lang],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticleReaderPage(props: { params: Promise<{ lang: string; slug: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const slug = params.slug;
  const dict = await getDictionary(lang);
  const t = dict;
  
  const article = articlesData.find(a => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-fixed min-h-screen pb-20 md:pb-0">
      <TopBar />

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Breadcrumb / Back button */}
        <Link href={`/${lang}/articles`} className="inline-flex items-center text-primary font-bold text-sm mb-12 hover:underline">
          <span className="material-symbols-outlined mr-2 text-[18px]">arrow_back</span>
          {t.landing.articlesTitle}
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{article.readTime} {t.landing.readTime}</span>
          </div>
          
          <h1 className="font-h1 text-4xl md:text-5xl text-on-surface leading-tight mb-8">
            {article.title[lang]}
          </h1>
          
          <div className="flex items-center gap-4 border-y border-surface-variant py-6">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xl">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-on-surface">{article.author}</p>
              <p className="text-xs text-on-surface-variant">Spark Education</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-[16/9] mb-12 rounded-[32px] overflow-hidden bg-surface-variant border border-white/20 shadow-xl">
          <img 
            src={article.imageUrl} 
            alt={article.title[lang]} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content - rendered safely because we wrote the HTML */}
        <article 
          className="article-content space-y-6 [&>h2]:font-h2 [&>h2]:text-2xl [&>h2]:text-on-surface [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:text-on-surface-variant [&>p]:leading-relaxed [&>p]:text-lg [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-on-surface-variant [&>ul>li]:text-lg [&>ul>li>strong]:text-on-surface"
          dangerouslySetInnerHTML={{ __html: article.content[lang] }}
        />
        
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
