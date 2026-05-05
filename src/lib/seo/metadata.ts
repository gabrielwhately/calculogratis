import type { Metadata } from 'next'
import { getCalculadora } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'
import { BRAND_NAME, BRAND_URL } from '@/lib/constants/branding'

export function createCalculadoraMetadata(slug: string): Metadata {
  const calc = getCalculadora(slug)
  if (!calc) return {}
  
  const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
  const esUrl = `${BRAND_URL}/es/${esCatSlug}/${calc.slug}`
  const ptUrl = `${BRAND_URL}/${calc.categoriaSlug}/${calc.slug}`

  return {
    title: `Calculadora de ${calc.nome} Online Grátis 2026`,
    description: calc.descricao,
    keywords: calc.keywords,
    openGraph: {
      title: `Calculadora de ${calc.nome} Online Grátis 2026 | ${BRAND_NAME}`,
      description: calc.descricao,
      url: ptUrl,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadora de ${calc.nome} | ${BRAND_NAME}`, description: calc.descricao },
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
  const esUrl = `${BRAND_URL}/es/${esCatSlug}`
  const ptUrl = `${BRAND_URL}/${categoriaSlug}`

  return {
    title: `Calculadoras ${categoriaNome} Online Grátis 2026`,
    description: descricao,
    openGraph: {
      title: `Calculadoras ${categoriaNome} Online Grátis 2026 | ${BRAND_NAME}`,
      description: descricao,
      url: ptUrl,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadoras ${categoriaNome} | ${BRAND_NAME}`, description: descricao },
    alternates: { 
      canonical: ptUrl,
      languages: {
        'es': esUrl,
        'pt-BR': ptUrl,
      }
    },
  }
}
