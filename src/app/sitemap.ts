import type { MetadataRoute } from 'next'
import { CALCULADORAS, CATEGORIAS } from '@/lib/constants/calculadoras'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculogratis.com'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...CATEGORIAS.map((cat) => ({ url: `${baseUrl}/${cat.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...CALCULADORAS.map((calc) => ({ url: `${baseUrl}/${calc.categoriaSlug}/${calc.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 })),
  ]
}
