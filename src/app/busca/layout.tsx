import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Calculadora',
  description: 'Encontre a calculadora ou simulador ideal. Pesquise entre mais de 50 ferramentas gratuitas no Cálculo Grátis.',
  openGraph: {
    title: 'Buscar Calculadora | Cálculo Grátis',
    description: 'Encontre a calculadora ou simulador ideal entre mais de 50 ferramentas gratuitas.',
    url: 'https://calculogratis.com/busca',
    type: 'website',
  },
  alternates: { canonical: 'https://calculogratis.com/busca' },
}

export default function BuscaLayout({ children }: { children: React.ReactNode }) {
  return children
}
