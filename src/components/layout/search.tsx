'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CALCULADORAS } from '@/lib/constants/calculadoras'

const I18N = {
  pt: {
    placeholder: 'Buscar calculadora...',
    ariaLabel: 'Buscar calculadora',
    viewAll: 'Ver todos os resultados',
    noResults: 'Nenhuma calculadora encontrada',
  },
  es: {
    placeholder: 'Buscar calculadora...',
    ariaLabel: 'Buscar calculadora',
    viewAll: 'Ver todos los resultados',
    noResults: 'No se encontraron calculadoras',
  }
}

export function Search() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return CALCULADORAS.filter(c =>
      c.nome.toLowerCase().includes(q) ||
      c.descricao.toLowerCase().includes(q) ||
      (c.keywords && c.keywords.toLowerCase().includes(q))
    ).slice(0, 6)
  }, [query])

  return (
    <div className="relative">
      <input
        type="search"
        placeholder={t.placeholder}
        aria-label={t.ariaLabel}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 md:w-64"
      />
      {isOpen && query.trim() !== '' && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden min-w-[280px]">
          {results.length > 0 ? (
            <>
              {results.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.categoriaSlug}/${calc.slug}`}
                  className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-semibold">{calc.nome}</div>
                  <div className="text-xs text-slate-500">{calc.categoria}</div>
                </Link>
              ))}
              <Link
                href="/busca"
                className="block border-t border-slate-100 dark:border-slate-700 px-4 py-2 text-center text-xs font-bold text-accent hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors uppercase tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                {t.viewAll}
              </Link>
            </>
          ) : (
            <div className="px-4 py-4 text-sm text-slate-500 text-center italic">
              {t.noResults}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
