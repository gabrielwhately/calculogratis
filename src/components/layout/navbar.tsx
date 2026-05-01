'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { CATEGORIAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'
import { Search } from './search'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
  }, [menuOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleEscape])

  return (
    <header className="sticky top-0 z-50 border-b border-navy-light bg-navy text-white">
      <div className="container-app flex h-14 items-center justify-between">
        <Link href={isSpanish ? '/es' : '/'} className="text-lg font-bold tracking-tight">
          Calculo<span className="text-accent">Gratis</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação por categorias">
          {CATEGORIAS.map((cat) => {
            const esData = CATEGORIAS_ES[cat.slug]
            const href = isSpanish 
              ? `/es/${esData?.slug ?? cat.slug}`
              : `/${cat.slug}`
            const nome = isSpanish ? (esData?.nome ?? cat.nome) : cat.nome

            return (
              <Link key={cat.slug} href={href} className="text-sm text-slate-300 hover:text-white transition-colors">
                {nome}
              </Link>
            )
          })}
          <Search />
          <ThemeToggle />
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-2 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded-lg" 
            aria-label="Menu" 
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-navy-light bg-navy px-4 pb-4" aria-label="Navegação por categorias">
          {CATEGORIAS.map((cat) => {
            const esData = CATEGORIAS_ES[cat.slug]
            const href = isSpanish 
              ? `/es/${esData?.slug ?? cat.slug}`
              : `/${cat.slug}`
            const nome = isSpanish ? (esData?.nome ?? cat.nome) : cat.nome

            return (
              <Link 
                key={cat.slug} 
                href={href} 
                onClick={() => setMenuOpen(false)} 
                className="block py-3 text-sm text-slate-300 hover:text-white min-h-[44px] flex items-center"
              >
                {nome}
              </Link>
            )
          })}
          <div className="mt-2 py-2 border-t border-navy-light">
             <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  )
}
