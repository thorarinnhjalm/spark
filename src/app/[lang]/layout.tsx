import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "../globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { getDictionary, Locale } from '@/dictionaries';
import { DictionaryProvider } from '@/components/DictionaryProvider';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);
  
  // Use translations or fallbacks
  const title = dict.metadata?.title || "Spark | Búðu barnið þitt undir framtíðina";
  const description = dict.metadata?.description || "Við undirbúum börn fyrir framtíðina með því að efla gagnrýna hugsun og stafrænt læsi í gegnum leik og uppgötvun.";
  
  return {
    metadataBase: new URL('https://spark-ai.is'),
    title,
    description,
    alternates: {
      languages: {
        'en': '/en',
        'is': '/is',
      },
    },
    openGraph: {
      title,
      description,
      url: 'https://spark-ai.is',
      siteName: 'Spark',
      locale: lang === 'is' ? 'is_IS' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Spark AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.png'],
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'is' }, { lang: 'en' }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <DictionaryProvider dict={dict} lang={lang}>
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
          </AuthProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
