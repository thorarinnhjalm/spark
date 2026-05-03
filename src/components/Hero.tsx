import React from 'react';

export default function Hero() {
  return (
    <section className="container" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
      <div className="animate-fade-in-up flex-column" style={{ alignItems: 'center', gap: '1.5rem' }}>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--surface-color)',
          border: '1px solid var(--surface-border)',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'var(--accent-color)'
        }}>
          ✨ Fyrir krakka 10-14 ára
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', fontWeight: '800' }}>
          Lærðu að <span className="gradient-text">hugsa</span><br />
          með gervigreind
        </h1>
        
        <p style={{
          fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'
        }}>
          Ekki bara nota hana. Spark er ævintýradrifið umhverfi þar sem börn læra að stjórna, skilja og meta gervigreind á ábyrgan hátt.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn-primary">Prófa Frítt</button>
          <button className="btn-outline">Lesa meira</button>
        </div>
      </div>
    </section>
  );
}
