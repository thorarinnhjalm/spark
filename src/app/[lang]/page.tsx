import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import FourDFramework from '@/components/FourDFramework';
import CTA from '@/components/CTA';
import { getDictionary, Locale } from '@/dictionaries';

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-background text-on-background pb-12">
      <TopBar />
      <Hero />
      <FourDFramework />
      <CTA />
      
      <footer className="text-center py-8 border-t border-surface-variant mt-16 text-on-surface-variant/60 font-body-md">
        <p>{dict.landing?.footer || '© 2026 Spark by Antigravity.'}</p>
      </footer>
    </main>
  );
}
