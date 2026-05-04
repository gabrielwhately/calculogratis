'use client'

import { usePathname } from 'next/navigation'

const I18N = {
  pt: 'Pular para conteúdo principal',
  es: 'Saltar al contenido principal',
}

export function SkipToContent() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const label = isSpanish ? I18N.es : I18N.pt

  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none"
    >
      {label}
    </a>
  )
}
