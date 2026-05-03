import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "../globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { getDictionary, Locale } from '@/dictionaries';
import { DictionaryProvider } from '@/components/DictionaryProvider';

export const metadata: Metadata = {
  title: "Spark AI",
  description: "AI Fluency for Kids",
  alternates: {
    languages: {
      'en': '/en',
      'is': '/is',
    },
  },
};

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
