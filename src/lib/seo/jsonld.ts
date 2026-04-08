import { getCalculadora } from '@/lib/constants/calculadoras'

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

export function calculadoraJsonLd(slug: string) {
  const calc = getCalculadora(slug)
  if (!calc) return null
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
