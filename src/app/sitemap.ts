import type { MetadataRoute } from 'next'
import { CALCULADORAS, CATEGORIAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculogratis.com'
  const lastModified = new Date()

  const ptRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
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
