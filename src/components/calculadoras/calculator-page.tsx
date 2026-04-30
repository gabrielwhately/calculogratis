'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { AdSlot } from '@/components/layout/ad-slot'
import { Card } from '@/components/ui/card'
import { getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { calculadoraJsonLd, faqJsonLd } from '@/lib/seo/jsonld'

interface FAQ { question: string; answer: string }

interface CalculatorPageProps {
  slug: string
  categoriaSlug: string
  categoriaNome: string
  nome: string
  descricao: string
  children: React.ReactNode
  conteudo: React.ReactNode
  faqs?: FAQ[]
}

const I18N = {
  pt: {
    inicio: 'Início',
    calculadoraDe: 'Calculadora de',
    perguntasFrequentes: 'Perguntas frequentes',
    calculadorasRelacionadas: 'Calculadoras Relacionadas',
  },
  es: {
    inicio: 'Inicio',
    calculadoraDe: 'Calculadora de',
    perguntasFrequentes: 'Preguntas frecuentes',
    calculadorasRelacionadas: 'Calculadoras Relacionadas',
  }
}

export function CalculatorPage({ slug, categoriaSlug, categoriaNome, nome, descricao, children, conteudo, faqs }: CalculatorPageProps) {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const jsonLd = calculadoraJsonLd(slug)
  const relacionadas = getCalculadorasByCategoria(categoriaSlug).filter(c => c.slug !== slug)

  return (
    <div className="container-app py-6">
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      {faqs && faqs.length > 0 && <script type="application/ld+json">{JSON.stringify(faqJsonLd(faqs))}</script>}
      <Breadcrumb items={[{ label: t.inicio, href: isSpanish ? '/es' : '/' }, { label: categoriaNome, href: isSpanish ? `/es/${categoriaSlug}` : `/${categoriaSlug}` }, { label: `${t.calculadoraDe} ${nome}` }]} />
      <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">{t.calculadoraDe} {nome}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{descricao}</p>
      <div className="mt-6">{children}</div>
      <AdSlot position="after-result" />
      <section className="mt-8 prose prose-slate dark:prose-invert max-w-none">{conteudo}</section>
      {faqs && faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4">{t.perguntasFrequentes}</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-slate-800">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-navy dark:text-white hover:text-accent transition-colors min-h-[48px]">
                  {faq.question}
                  <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180 motion-reduce:transition-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <p className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      <AdSlot position="mid-content" />
      {relacionadas.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4">{t.calculadorasRelacionadas}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relacionadas.map((calc) => {
              const esCalc = CALCULADORAS_ES[calc.slug]
              const esCat = CATEGORIAS_ES[calc.categoriaSlug]
              return (
                <Card 
                  key={calc.slug} 
                  title={isSpanish ? (esCalc?.nome ?? calc.nome) : calc.nome} 
                  description={isSpanish ? (esCalc?.descricao ?? calc.descricao) : calc.descricao} 
                  href={isSpanish ? `/es/${esCat?.slug ?? calc.categoriaSlug}/${calc.slug}` : `/${calc.categoriaSlug}/${calc.slug}`} 
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
