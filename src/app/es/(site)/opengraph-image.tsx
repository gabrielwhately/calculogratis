import { ImageResponse } from 'next/og'


export const alt = 'Cálculo Gratis — Calculadoras y Simuladores Online'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a2332',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2a3a4f 0%, #1a2332 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#3b82f6',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="8" y1="6" x2="16" y2="6"></line>
              <line x1="16" y1="14" x2="16" y2="18"></line>
              <path d="M16 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M8 18h.01"></path>
            </svg>
          </div>
          <span style={{ fontSize: '72px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
            Calculo<span style={{ color: '#3b82f6' }}>Gratis</span>
          </span>
        </div>
        <div style={{ fontSize: '32px', color: '#94a3b8', textAlign: 'center', maxWidth: '800px' }}>
          Calculadoras y simuladores online gratis: 
          laborales, financieras, salud y mucho más.
        </div>
      </div>
    ),
    { ...size }
  )
}
