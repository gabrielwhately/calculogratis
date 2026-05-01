'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { Card } from '@/components/ui/card'

const I18N = {
  pt: {
    title: 'Buscar Calculadora',
    placeholder: 'Digite para buscar...',
    noResults: 'Nenhuma calculadora encontrada.',
  },
  es: {
    title: 'Buscar Calculadora',
    placeholder: 'Escribe para buscar...',
    noResults: 'No se encontraron calculadoras.',
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
    return allCalcs.filter(c => {
      const esCalc = CALCULADORAS_ES[c.slug]
      return c.nome.toLowerCase().includes(q) || 
             c.descricao.toLowerCase().includes(q) || 
             c.keywords.toLowerCase().includes(q) ||
             (isSpanish && (
               esCalc?.nome.toLowerCase().includes(q) || 
               esCalc?.descricao.toLowerCase().includes(q) || 
               esCalc?.keywords.toLowerCase().includes(q)
             ))
    })
  }, [query, isSpanish])

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-navy dark:text-white mb-4">{t.title}</h1>
      <input 
        type="search" 
        placeholder={t.placeholder} 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        className="w-full rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-base text-slate-800 dark:text-slate-200 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 mb-6" 
        autoFocus 
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map(c => {
          const esCalc = CALCULADORAS_ES[c.slug]
          const esCatSlug = CATEGORIAS_ES[c.categoriaSlug]?.slug ?? c.categoriaSlug
          return (
            <Card 
              key={c.slug} 
              title={isSpanish ? (esCalc?.nome ?? c.nome) : c.nome} 
              description={isSpanish ? (esCalc?.descricao ?? c.descricao) : c.descricao} 
              href={isSpanish ? `/es/${esCatSlug}/${c.slug}` : `/${c.categoriaSlug}/${c.slug}`} 
            />
          )
        })}
      </div>
      {results.length === 0 && <p className="text-slate-600 dark:text-slate-400 text-center py-8">{t.noResults}</p>}
    </div>
  )
}
