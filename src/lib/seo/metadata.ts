import type { Metadata } from 'next'
import { getCalculadora } from '@/lib/constants/calculadoras'

export function createCalculadoraMetadata(slug: string): Metadata {
  const calc = getCalculadora(slug)
  if (!calc) return {}
  return {
    title: `Calculadora de ${calc.nome} Online Gratis 2026`,
    description: calc.descricao,
    keywords: calc.keywords,
    openGraph: {
      title: `Calculadora de ${calc.nome} Online Gratis 2026 | Calculo Gratis`,
      description: calc.descricao,
      url: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadora de ${calc.nome} | Calculo Gratis`, description: calc.descricao },
    alternates: { canonical: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}` },
  }
}

export function createCategoriaMetadata(categoriaSlug: string, categoriaNome: string, descricao: string): Metadata {
  return {
    title: `Calculadoras ${categoriaNome} Online Gratis 2026`,
    description: descricao,
    openGraph: {
      title: `Calculadoras ${categoriaNome} Online Gratis 2026 | Calculo Gratis`,
      description: descricao,
      url: `https://calculogratis.com/${categoriaSlug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadoras ${categoriaNome} | Calculo Gratis`, description: descricao },
    alternates: { canonical: `https://calculogratis.com/${categoriaSlug}` },
  }
}
