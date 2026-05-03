import React from 'react';

export default function CTA() {
  return (
    <section className="container" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
      <div className="glass-panel" style={{ 
        padding: '4rem 2rem', 
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(139, 92, 246, 0.1) 100%)'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
          Gerðu barnið þitt tilbúið
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Gefðu barninu þínu forskot með því að kenna því að umgangast gervigreind á ábyrgan og skapandi hátt.
        </p>
        <button className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
          Stofna Foreldraaðgang
        </button>
      </div>
    </section>
  );
}
