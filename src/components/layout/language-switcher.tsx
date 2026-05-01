'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')

  const getHref = (targetLocale: 'pt' | 'es') => {
    if (!pathname) return '/'
    
    // Split path into parts
    const parts = pathname.split('/').filter(Boolean)
    
    // Handle home page
    if (parts.length === 0) return targetLocale === 'es' ? '/es' : '/'
    if (parts.length === 1 && parts[0] === 'es') return targetLocale === 'es' ? '/es' : '/'

    // Remove 'es' prefix if present
    const cleanParts = parts[0] === 'es' ? parts.slice(1) : parts
    
    // Identify category and calculator
    const categorySlug = cleanParts[0]
    const calculatorSlug = cleanParts[1]
    
    // Find the base category object
    const category = CATEGORIAS.find(c => 
      c.slug === categorySlug || 
      CATEGORIAS_ES[c.slug]?.slug === categorySlug
    )

    if (!category) {
      // Fallback for non-calculator pages like /busca or /favoritos
      const path = cleanParts.join('/')
      return targetLocale === 'es' ? `/es/${path}` : `/${path}`
    }

    const esCatSlug = CATEGORIAS_ES[category.slug]?.slug ?? category.slug
    const ptCatSlug = category.slug

    if (calculatorSlug) {
      return targetLocale === 'es' 
        ? `/es/${esCatSlug}/${calculatorSlug}` 
        : `/${ptCatSlug}/${calculatorSlug}`
    }

    return targetLocale === 'es' ? `/es/${esCatSlug}` : `/${ptCatSlug}`
  }

  const ptHref = getHref('pt')
  const esHref = getHref('es')

  return (
    <div className="flex items-center gap-1 text-xs">
      <Link
        href={ptHref}
        className={`px-2 py-1 rounded transition-colors ${!isSpanish ? 'bg-accent text-white' : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}
        hrefLang="pt-BR"
      >
        PT
      </Link>
      <Link
        href={esHref}
        className={`px-2 py-1 rounded transition-colors ${isSpanish ? 'bg-accent text-white' : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}
        hrefLang="es"
      >
        ES
      </Link>
    </div>
  )
}
