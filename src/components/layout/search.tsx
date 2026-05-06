'use client'

import { useState, useMemo, useRef, useEffect, useId } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'

const I18N = {
  pt: {
    placeholder: 'Buscar calculadora...',
    ariaLabel: 'Buscar calculadora',
    viewAll: 'Ver todos os resultados',
    noResults: 'Nenhuma calculadora encontrada',
    resultsFound: (count: number) => count === 1 ? '1 resultado encontrado' : `${count} resultados encontrados`,
    hrefPrefix: '',
    viewAllHref: '/busca',
  },
  es: {
    placeholder: 'Buscar calculadora...',
    ariaLabel: 'Buscar calculadora',
    viewAll: 'Ver todos los resultados',
    noResults: 'No se encontraron calculadoras',
    resultsFound: (count: number) => count === 1 ? '1 resultado encontrado' : `${count} resultados encontrados`,
    hrefPrefix: '/es',
    viewAllHref: '/es/busca',
  }
}

export function Search() {
  const router = useRouter()
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  const searchId = useId()

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
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

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      if (selectedIndex === -1) return
      e.preventDefault()
      if (selectedIndex === results.length) {
        router.push(t.viewAllHref)
      } else {
        const calc = results[selectedIndex]
        const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
        const href = isSpanish 
          ? `/es/${esCatSlug}/${calc.slug}`
          : `/${calc.categoriaSlug}/${calc.slug}`
        router.push(href)
      }
      setIsOpen(false)
      setQuery('')
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative">
      <div className="sr-only" aria-live="polite">
        {isOpen && results.length > 0 ? t.resultsFound(results.length) : ''}
      </div>
      <input
        ref={inputRef}
        type="search" role="combobox"
        placeholder={t.placeholder}
        aria-label={t.ariaLabel}
        aria-keyshortcuts="Meta+K"
        aria-expanded={isOpen && query.trim() !== ''}
        aria-controls={`search-results-${searchId}`}
        aria-activedescendant={selectedIndex >= 0 ? `result-${searchId}-${selectedIndex}` : undefined}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 md:w-64"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 pointer-events-none px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[10px] font-medium text-slate-400">
        <span className="text-[12px]">⌘</span>K
      </div>
      {isOpen && query.trim() !== '' && (
        <div 
          id={`search-results-${searchId}`}
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden min-w-[280px]"
        >
          {results.length > 0 ? (
            <>
              {results.map((calc, index) => {
                const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
                const href = isSpanish 
                  ? `/es/${esCatSlug}/${calc.slug}`
                  : `/${calc.categoriaSlug}/${calc.slug}`

                return (
                  <Link
                    key={calc.slug}
                    id={`result-${searchId}-${index}`}
                    href={href}
                    role="option"
                    aria-selected={selectedIndex === index}
                    className={`block px-4 py-2.5 text-sm transition-colors ${selectedIndex === index ? 'bg-slate-100 dark:bg-slate-700 text-accent font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    onClick={() => { setIsOpen(false); setQuery('') }}
                  >
                    <div className="font-semibold">{calc.nome}</div>
                    <div className="text-xs text-slate-500">{calc.categoria}</div>
                  </Link>
                )
              })}
              <Link
                id={`result-${searchId}-${results.length}`}
                href={t.viewAllHref}
                role="option"
                aria-selected={selectedIndex === results.length}
                className={`block border-t border-slate-100 dark:border-slate-700 px-4 py-2 text-center text-xs font-bold transition-colors uppercase tracking-wider ${selectedIndex === results.length ? 'bg-slate-100 dark:bg-slate-700 text-accent' : 'text-accent hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                onClick={() => { setIsOpen(false); setQuery('') }}
              >
                {t.viewAll}
              </Link>
            </>
          ) : (
            <div className="px-4 py-4 text-sm text-slate-500 text-center italic" role="status">
              {t.noResults}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
