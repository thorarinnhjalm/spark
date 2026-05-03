import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import FourDFramework from '@/components/FourDFramework';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <TopBar />
      <Hero />
      <FourDFramework />
      <CTA />
      
      <footer style={{ textAlign: 'center', padding: 'var(--spacing-md) 0', borderTop: '1px solid var(--surface-border)', color: 'rgba(255,255,255,0.5)', marginTop: 'var(--spacing-lg)' }}>
        <p>© 2026 Spark by Antigravity. Öll réttindi áskilin.</p>
      </footer>
    </main>
  );
}
