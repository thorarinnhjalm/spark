import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M 30 0 C 30 20 20 30 0 30 C 20 30 30 40 30 60 C 30 40 40 30 60 30 C 40 30 30 20 30 0 Z" fill="#6b38d4" />
          <path d="M 50 5 C 50 12 47 15 40 15 C 47 15 50 18 50 25 C 50 18 53 15 60 15 C 53 15 50 12 50 5 Z" fill="#fd56a7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
