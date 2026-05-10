'use client'

import { useState, useMemo, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { trackEvent } from '@/components/layout/analytics'
import { Card } from '@/components/ui/card'
import { FormCard } from '@/components/ui/form-card'
import { Input } from '@/components/ui/input'
import { CalculatorIcon } from '@/components/ui/icons'

const I18N = {
  pt: {
    title: 'Buscar Calculadora',
    labelSearch: 'O que você quer calcular?',
    placeholder: 'Ex: rescisão, juros, imc...',
    noResults: 'Nenhuma calculadora encontrada para sua busca.',
    suggested: 'Sugestões:',
    back: 'Voltar para o início',
  },
  es: {
    title: 'Buscar Calculadora',
    labelSearch: '¿Qué quieres calcular?',
    placeholder: 'Ej: liquidación, intereses, imc...',
    noResults: 'No se encontraron calculadoras para su búsqueda.',
    suggested: 'Sugerencias:',
    back: 'Volver al inicio',
  }
}

const SUGGESTIONS = [
  { pt: 'Rescisão', es: 'Liquidación', query: 'rescisao' },
  { pt: 'Juros Compostos', es: 'Interés Compuesto', query: 'juros' },
  { pt: 'Salário Líquido', es: 'Salario Neto', query: 'salario' },
  { pt: 'IMC', es: 'IMC', query: 'imc' },
  { pt: 'Financiamento', es: 'Préstamo', query: 'financia' },
]

export default function BuscaPage() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [query, setQuery] = useState('')
  
  const results = useMemo(() => {
    const allCalcs = CALCULADORAS
    const q = query.toLowerCase().trim()
    
    const translatedCalcs = allCalcs.map(c => {
      if (isSpanish) {
        const esData = CALCULADORAS_ES[c.slug]
        const esCat = CATEGORIAS_ES[c.categoriaSlug]
        return {
          ...c,
          nome: esData?.nome ?? c.nome,
          descricao: esData?.descricao ?? c.descricao,
          categoria: esCat?.nome ?? c.categoria,
          keywords: esData?.keywords ?? c.keywords
        }
      }
      return c
    })

    if (!q) return translatedCalcs

    return translatedCalcs.filter(c => 
      c.nome.toLowerCase().includes(q) || 
      c.descricao.toLowerCase().includes(q) || 
      c.keywords.toLowerCase().includes(q)
    )
  }, [query, isSpanish])

  // Track search queries (debounced)
  useEffect(() => {
    if (!query.trim()) return

    const timer = setTimeout(() => {
      trackEvent('search', {
        search_term: query.toLowerCase(),
        results_count: results.length,
        language: isSpanish ? 'es' : 'pt'
      })

      if (results.length === 0) {
        trackEvent('search_no_results', {
          search_term: query.toLowerCase(),
          language: isSpanish ? 'es' : 'pt'
        })
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [query, results.length, isSpanish])

  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">{t.title}</h1>
        <Link href={isSpanish ? '/es' : '/'} className="text-xs text-slate-500 hover:text-accent transition-colors">
          {t.back}
        </Link>
      </div>
      
      <FormCard className="mb-4">
        <Input 
          label={t.labelSearch}
          id="search-input"
          type="search" 
          placeholder={t.placeholder} 
          value={query} 
          onChange={setQuery}
          autoFocus 
        />
      </FormCard>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs text-slate-500 font-medium">{t.suggested}</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.query}
            onClick={() => setQuery(isSpanish ? s.es : s.pt)}
            className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-accent/10 hover:text-accent transition-all"
          >
            {isSpanish ? s.es : s.pt}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(c => {
          const esCatSlug = CATEGORIAS_ES[c.categoriaSlug]?.slug ?? c.categoriaSlug
          return (
            <Card 
              key={c.slug} 
              title={c.nome} 
              description={c.descricao} 
              href={isSpanish ? `/es/${esCatSlug}/${c.slug}` : `/${c.categoriaSlug}/${c.slug}`}
              icon={<CalculatorIcon className="h-5 w-5" />}
            />
          )
        })}
      </div>
      
      {results.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800">
           <svg className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-slate-600 dark:text-slate-400">{t.noResults}</p>
        </div>
      )}
    </div>
  )
}
