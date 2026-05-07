'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const I18N = {
  pt: {
    title: '404 - Página não encontrada',
    description: 'Desculpe, não conseguimos encontrar a calculadora ou ferramenta que você está procurando.',
    button: 'Voltar ao início',
  },
  es: {
    title: '404 - Página no encontrada',
    description: 'Lo sentimos, no pudimos encontrar la calculadora o herramienta que estás buscando.',
    button: 'Volver al inicio',
  }
}

export default function NotFound() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  return (
    <div className="container-app flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-slate-100 p-6 dark:bg-slate-800 mb-6">
        <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-navy dark:text-white md:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-md text-lg text-slate-600 dark:text-slate-400">{t.description}</p>
      <Link 
        href={isSpanish ? '/es' : '/'} 
        className="mt-8 inline-block rounded-xl bg-accent px-8 py-3.5 text-white font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-accent/20"
      >
        {t.button}
      </Link>
    </div>
  )
}
