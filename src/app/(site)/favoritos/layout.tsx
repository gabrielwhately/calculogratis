import type { Metadata } from 'next'
import { BRAND_URL } from '@/lib/constants/branding'

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Suas calculadoras favoritas salvas para acesso rápido. Gerencie suas ferramentas mais usadas no Cálculo Grátis.',
  openGraph: {
    title: 'Favoritos | Cálculo Grátis',
    description: 'Suas calculadoras favoritas salvas para acesso rápido.',
    url: `${BRAND_URL}/favoritos`,
    type: 'website',
  },
  alternates: { canonical: `${BRAND_URL}/favoritos` },
}

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return children
}
