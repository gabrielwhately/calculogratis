import { getCalculadora } from '@/lib/constants/calculadoras'

export function calculadoraJsonLd(slug: string) {
  const calc = getCalculadora(slug)
  if (!calc) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Calculadora de ${calc.nome}`,
    description: calc.descricao,
    url: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    provider: { '@type': 'Organization', name: 'Calculo Gratis', url: 'https://calculogratis.com' },
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
