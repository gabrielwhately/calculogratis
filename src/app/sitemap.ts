import type { MetadataRoute } from 'next'
import { CALCULADORAS, CATEGORIAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'
import { BRAND_URL } from '@/lib/constants/branding'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND_URL
  const lastModified = new Date()

  const ptRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/artigos`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/widgets`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/favoritos`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/salvos`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/busca`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/sugerir`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/termos`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacidade`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ...[
      'rescisao-2026', 'juros-compostos', 'salario-liquido', 'imc-saude', 'sac-vs-price', 'seguro-desempleo'
    ].map(slug => ({
      url: `${baseUrl}/artigos/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    })),
    ...CATEGORIAS.map((cat) => ({
      url: `${baseUrl}/${cat.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...CALCULADORAS.map((calc) => ({
      url: `${baseUrl}/${calc.categoriaSlug}/${calc.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]

  const esRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/es`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/es/articulos`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/es/widgets`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/es/favoritos`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/es/guardados`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/es/busca`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/es/sugerir`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/es/condiciones`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/es/privacidad`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ...[
      'liquidacion-2026', 'interes-compuesto', 'salario-neto', 'imc-salud', 'sac-o-frances', 'seguro-desempleo'
    ].map(slug => ({
      url: `${baseUrl}/es/articulos/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6
    })),
    ...CATEGORIAS.map((cat) => ({
      url: `${baseUrl}/es/${CATEGORIAS_ES[cat.slug]?.slug ?? cat.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...CALCULADORAS.map((calc) => ({
      url: `${baseUrl}/es/${CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug}/${calc.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  return [...ptRoutes, ...esRoutes]
}
