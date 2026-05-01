'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const I18N = {
  pt: {
    inicio: 'Início',
    categorias: 'Categorias',
    favoritos: 'Favoritos',
    busca: 'Busca',
    prefix: '',
    navLabel: 'Navegação principal mobile',
  },
  es: {
    inicio: 'Inicio',
    categorias: 'Categorías',
    favoritos: 'Favoritos',
    busca: 'Busca',
    prefix: '/es',
    navLabel: 'Navegación principal móvil',
  }
}

const iconPaths = {
  inicio: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
  categorias: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  favoritos: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  busca: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
}

export function BottomNav() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  const prefix = t.prefix

  const items = [
    { href: prefix || '/', label: t.inicio, icon: iconPaths.inicio },
    { href: (prefix || '') + '/#categorias', label: t.categorias, icon: iconPaths.categorias },
    { href: prefix + '/favoritos', label: t.favoritos, icon: iconPaths.favoritos },
    { href: prefix + '/busca', label: t.busca, icon: iconPaths.busca },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 md:hidden" role="navigation" aria-label={t.navLabel}>
      <div className="flex justify-around">
        {items.map((item) => {
          const hrefPath = item.href.split('#')[0] || '/'
          const isActive = hrefPath === '/' || hrefPath === '/es' 
            ? pathname === hrefPath 
            : pathname.startsWith(hrefPath)

          return (
            <Link key={item.label} href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-[48px] min-w-[48px] flex-col items-center justify-center px-3 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${isActive ? 'text-accent' : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>
              <svg className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
