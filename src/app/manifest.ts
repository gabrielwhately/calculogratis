import type { MetadataRoute } from 'next'
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants/branding'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: 'CalcGratis',
    description: BRAND_TAGLINE,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a2332',
    icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
  }
}
