import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Suas calculadoras favoritas salvas para acesso rápido. Gerencie suas ferramentas mais usadas no Cálculo Grátis.',
  openGraph: {
    title: 'Favoritos | Cálculo Grátis',
    description: 'Suas calculadoras favoritas salvas para acesso rápido.',
    url: 'https://calculogratis.com/favoritos',
    type: 'website',
  },
  alternates: { canonical: 'https://calculogratis.com/favoritos' },
}

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return children
}
