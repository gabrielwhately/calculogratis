'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { AdSlot } from '@/components/layout/ad-slot'
import { Card } from '@/components/ui/card'
import { getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { toggleFavorite, isFavorite } from '@/lib/favorites'
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
    adicionarFavoritos: 'Adicionar aos favoritos',
    removerFavoritos: 'Remover dos favoritos',
    brand: 'CalculoGratis.com',
  },
  es: {
    inicio: 'Inicio',
    calculadoraDe: 'Calculadora de',
    perguntasFrequentes: 'Preguntas frecuentes',
    calculadorasRelacionadas: 'Calculadoras Relacionadas',
    adicionarFavoritos: 'Añadir a favoritos',
    removerFavoritos: 'Eliminar de favoritos',
    brand: 'CalculoGratis.com',
  }
}

export function CalculatorPage({ slug, categoriaSlug, categoriaNome, nome, descricao, children, conteudo, faqs }: CalculatorPageProps) {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [favorito, setFavorito] = useState(false)

  useEffect(() => {
    setFavorito(isFavorite(slug))
  }, [slug])

  const handleToggleFavorite = () => {
    toggleFavorite(slug)
    setFavorito(!favorito)
  }

  const jsonLd = calculadoraJsonLd(slug, isSpanish ? 'es' : 'pt')
  const relacionadas = getCalculadorasByCategoria(categoriaSlug).filter(c => c.slug !== slug)

  return (
    <div className="container-app py-6 print:py-0">
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      {faqs && faqs.length > 0 && <script type="application/ld+json">{JSON.stringify(faqJsonLd(faqs))}</script>}
      
      <div className="print:hidden">
        <Breadcrumb items={[
          { label: t.inicio, href: isSpanish ? '/es' : '/' }, 
          { label: categoriaNome, href: isSpanish ? `/es/${categoriaSlug}` : `/${categoriaSlug}` }, 
          { label: `${t.calculadoraDe} ${nome}` }
        ]} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl print:text-navy">{t.calculadoraDe} {nome}</h1>
        <button
          onClick={handleToggleFavorite}
          className={`p-2.5 rounded-full border transition-all active:scale-90 flex items-center justify-center print:hidden ${
            favorito 
              ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800' 
              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-slate-800 dark:border-gray-700'
          }`}
          aria-label={favorito ? t.removerFavoritos : t.adicionarFavoritos}
          title={favorito ? t.removerFavoritos : t.adicionarFavoritos}
        >
          <svg className="h-6 w-6" fill={favorito ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <p className="mt-2 text-slate-600 dark:text-slate-400 print:hidden">{descricao}</p>
      <div className="mt-6 print:mt-4">{children}</div>
      
      <div className="print:hidden">
        <AdSlot position="after-result" />
      </div>

      <section className="mt-8 prose prose-slate dark:prose-invert max-w-none print:hidden">{conteudo}</section>
      
      {faqs && faqs.length > 0 && (
        <section className="mt-8 print:hidden">
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

      <div className="print:hidden">
        <AdSlot position="mid-content" />
      </div>

      {relacionadas.length > 0 && (
        <section className="mt-8 print:hidden">
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
