import { getCalculadora } from '@/lib/constants/calculadoras'
import { CALCULADORAS_ES, CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'

const CATEGORY_APP_TYPE: Record<string, string> = {
  trabalhista: 'BusinessApplication',
  financeiro: 'FinanceApplication',
  previdencia: 'FinanceApplication',
  saude: 'HealthApplication',
  matematica: 'EducationalApplication',
  juridica: 'BusinessApplication',
  conversores: 'UtilitiesApplication',
  utilidades: 'UtilitiesApplication',
}

export function calculadoraJsonLd(slug: string, locale: 'pt' | 'es' = 'pt') {
  const calc = getCalculadora(slug)
  if (!calc) return null

  if (locale === 'es') {
    const esCalc = CALCULADORAS_ES[slug]
    const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
    return {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `Calculadora de ${esCalc?.nome ?? calc.nome}`,
      description: esCalc?.descricao ?? calc.descricao,
      url: `https://calculogratis.com/es/${esCatSlug}/${calc.slug}`,
      applicationCategory: CATEGORY_APP_TYPE[calc.categoriaSlug] || 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      provider: { '@type': 'Organization', name: 'Cálculo Gratis', url: 'https://calculogratis.com/es' },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Calculadora de ${calc.nome}`,
    description: calc.descricao,
    url: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}`,
    applicationCategory: CATEGORY_APP_TYPE[calc.categoriaSlug] || 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    provider: { '@type': 'Organization', name: 'Cálculo Grátis', url: 'https://calculogratis.com' },
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question', name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
