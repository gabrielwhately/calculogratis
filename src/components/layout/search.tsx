'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CALCULADORAS } from '@/lib/constants/calculadoras'

export function Search() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return CALCULADORAS.filter(c => c.nome.toLowerCase().includes(q) || c.descricao.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="relative">
      <input type="search" placeholder="Buscar calculadora..." value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 md:w-64" />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
          {results.map((calc) => (
            <Link key={calc.slug} href={`/${calc.categoriaSlug}/${calc.slug}`}
              className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => setIsOpen(false)}>
              <span className="font-medium">{calc.nome}</span>
              <span className="ml-2 text-xs text-slate-600 dark:text-slate-400">{calc.categoria}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
