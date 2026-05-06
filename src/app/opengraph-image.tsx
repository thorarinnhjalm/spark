import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Spark AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #fef7ff 0%, #e9ddff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <svg width="200" height="200" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 0 C 30 20 20 30 0 30 C 20 30 30 40 30 60 C 30 40 40 30 60 30 C 40 30 30 20 30 0 Z" fill="#6b38d4" />
            <path d="M 50 5 C 50 12 47 15 40 15 C 47 15 50 18 50 25 C 50 18 53 15 60 15 C 53 15 50 12 50 5 Z" fill="#fd56a7" />
          </svg>
          <div style={{ fontSize: 140, fontWeight: 800, color: '#1d1a23', letterSpacing: '-0.04em', fontFamily: 'sans-serif' }}>
            Spark
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
