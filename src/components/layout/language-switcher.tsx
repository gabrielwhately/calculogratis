'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const isSpanish = pathname.startsWith('/es')

  const ptHref = isSpanish ? pathname.replace(/^\/es/, '') || '/' : pathname
  const esHref = isSpanish ? pathname : `/es${pathname === '/' ? '' : pathname}`

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
