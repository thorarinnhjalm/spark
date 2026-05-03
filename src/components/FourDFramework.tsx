import React from 'react';

const frameworks = [
  {
    id: 'D1',
    title: 'Delegation',
    desc: 'Hvenær biðjum við gervigreind um hjálp og hvenær gerum við það sjálf?',
    icon: '🤝'
  },
  {
    id: 'D2',
    title: 'Description',
    desc: 'Hvernig útskýrum við nákvæmlega hvað við viljum fá fram?',
    icon: '✍️'
  },
  {
    id: 'D3',
    title: 'Discernment',
    desc: 'Er svarið rétt? Hvernig vitum við hvort við getum treyst gervigreindinni?',
    icon: '🕵️'
  },
  {
    id: 'D4',
    title: 'Diligence',
    desc: 'Hvaða ábyrgð berum við og hvaða upplýsingum megum við deila?',
    icon: '🛡️'
  }
];

export default function FourDFramework() {
  return (
    <section className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>4D Hugsunarkerfið</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Byggt á rannsóknum frá Anthropic. Spark leiðir börn í gegnum fjórar kjarnahæfnir í öruggu umhverfi.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {frameworks.map((item, index) => (
          <div key={item.id} className={`glass-panel animate-fade-in-up delay-${(index + 1) * 100}`} style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '600' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
