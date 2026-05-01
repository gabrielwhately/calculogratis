import type { Metadata } from 'next'
import { getCalculadora } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'

export function createCalculadoraMetadata(slug: string): Metadata {
  const calc = getCalculadora(slug)
  if (!calc) return {}
  
  const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
  const esUrl = `https://calculogratis.com/es/${esCatSlug}/${calc.slug}`
  const ptUrl = `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}`

  return {
    title: `Calculadora de ${calc.nome} Online Grátis 2026`,
    description: calc.descricao,
    keywords: calc.keywords,
    openGraph: {
      title: `Calculadora de ${calc.nome} Online Grátis 2026 | Cálculo Grátis`,
      description: calc.descricao,
      url: ptUrl,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadora de ${calc.nome} | Cálculo Grátis`, description: calc.descricao },
    alternates: { 
      canonical: ptUrl,
      languages: {
        'es': esUrl,
        'pt-BR': ptUrl,
      }
    },
  }
}

export function createCategoriaMetadata(categoriaSlug: string, categoriaNome: string, descricao: string): Metadata {
  const esCatSlug = CATEGORIAS_ES[categoriaSlug]?.slug ?? categoriaSlug
  const esUrl = `https://calculogratis.com/es/${esCatSlug}`
  const ptUrl = `https://calculogratis.com/${categoriaSlug}`

  return {
    title: `Calculadoras ${categoriaNome} Online Grátis 2026`,
    description: descricao,
    openGraph: {
      title: `Calculadoras ${categoriaNome} Online Grátis 2026 | Cálculo Grátis`,
      description: descricao,
      url: ptUrl,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadoras ${categoriaNome} | Calculo Gratis`, description: descricao },
    alternates: { 
      canonical: ptUrl,
      languages: {
        'es': esUrl,
        'pt-BR': ptUrl,
      }
    },
  }
}
