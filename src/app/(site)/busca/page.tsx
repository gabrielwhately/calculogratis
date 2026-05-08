'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
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
  },
  es: {
    title: 'Buscar Calculadora',
    labelSearch: '¿Qué quieres calcular?',
    placeholder: 'Ej: liquidación, intereses, imc...',
    noResults: 'No se encontraron calculadoras para su búsqueda.',
  }
}

export default function BuscaPage() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [query, setQuery] = useState('')
  
  const results = useMemo(() => {
    const allCalcs = CALCULADORAS
    if (!query.trim()) return allCalcs
    const q = query.toLowerCase()
    return allCalcs.map(c => {
      if (isSpanish) {
        const esData = CALCULADORAS_ES[c.slug]
        const esCat = CATEGORIAS_ES[c.categoriaSlug]
        return {
          ...c,
          nome: esData?.nome ?? c.nome,
          descricao: esData?.descricao ?? c.descricao,
          categoria: esCat?.nome ?? c.categoria
        }
      }
      return c
    }).filter(c => 
      c.nome.toLowerCase().includes(q) || 
      c.descricao.toLowerCase().includes(q) || 
      c.keywords.toLowerCase().includes(q)
    )
  }, [query, isSpanish])

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold text-navy dark:text-white mb-6 md:text-3xl">{t.title}</h1>
      
      <FormCard className="mb-8">
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
