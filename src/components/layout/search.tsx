'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'

const I18N = {
  pt: {
    placeholder: 'Buscar calculadora...',
    ariaLabel: 'Buscar calculadora',
    viewAll: 'Ver todos os resultados',
    noResults: 'Nenhuma calculadora encontrada',
    hrefPrefix: '',
    viewAllHref: '/busca',
  },
  es: {
    placeholder: 'Buscar calculadora...',
    ariaLabel: 'Buscar calculadora',
    viewAll: 'Ver todos los resultados',
    noResults: 'No se encontraron calculadoras',
    hrefPrefix: '/es',
    viewAllHref: '/es/busca',
  }
}

export function Search() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return CALCULADORAS.map(c => {
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
      (c.keywords && c.keywords.toLowerCase().includes(q))
    ).slice(0, 6)
  }, [query, isSpanish])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="search"
        placeholder={t.placeholder}
        aria-label={t.ariaLabel} aria-keyshortcuts="Meta+K"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 md:w-64"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 pointer-events-none px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[10px] font-medium text-slate-400">
        <span className="text-[12px]">⌘</span>K
      </div>
      {isOpen && query.trim() !== '' && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden min-w-[280px]">
          {results.length > 0 ? (
            <>
              {results.map((calc) => {
                const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
                const href = isSpanish 
                  ? `/es/${esCatSlug}/${calc.slug}`
                  : `/${calc.categoriaSlug}/${calc.slug}`

                return (
                  <Link
                    key={calc.slug}
                    href={href}
                    className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-semibold">{calc.nome}</div>
                    <div className="text-xs text-slate-500">{calc.categoria}</div>
                  </Link>
                )
              })}
              <Link
                href={t.viewAllHref}
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
