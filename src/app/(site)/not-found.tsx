'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const I18N = {
  pt: {
    title: '404 - Página não encontrada',
    description: 'Desculpe, não conseguimos encontrar a calculadora ou ferramenta que você está procurando.',
    button: 'Voltar ao início',
    searchPrompt: 'Tente buscar o que você precisa:',
    popular: 'Ferramentas populares:',
  },
  es: {
    title: '404 - Página no encontrada',
    description: 'Lo sentimos, no pudimos encontrar la calculadora o herramienta que estás buscando.',
    button: 'Volver al inicio',
    searchPrompt: 'Intenta buscar lo que necesitas:',
    popular: 'Herramientas populares:',
  }
}

const POPULAR_LINKS = [
  { pt: 'Rescisão', es: 'Liquidación', href: '/trabalhista/rescisao', esHref: '/es/laboral/liquidacion-trabajo' },
  { pt: 'Juros Compostos', es: 'Interés Compuesto', href: '/financeiro/juros-compostos', esHref: '/es/finanzas/interes-compuesto' },
  { pt: 'Salário Líquido', es: 'Salario Neto', href: '/trabalhista/salario-liquido', esHref: '/es/laboral/salario-neto' },
]

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
      
      <div className="mt-12 w-full max-w-sm">
        <p className="text-sm font-medium text-slate-500 mb-4">{t.searchPrompt}</p>
        <Link 
          href={isSpanish ? '/es/busca' : '/busca'} 
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:border-accent transition-all group"
        >
          <svg className="h-5 w-5 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Buscar ferramenta...</span>
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.popular}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {POPULAR_LINKS.map((link) => (
            <Link
              key={link.pt}
              href={isSpanish ? link.esHref : link.href}
              className="text-sm font-semibold text-navy dark:text-white hover:text-accent transition-colors underline decoration-slate-200 dark:decoration-slate-800 underline-offset-4"
            >
              {isSpanish ? link.es : link.pt}
            </Link>
          ))}
        </div>
      </div>

      <Link 
        href={isSpanish ? '/es' : '/'} 
        className="mt-12 text-sm font-bold text-accent hover:underline"
      >
        {t.button}
      </Link>
    </div>
  )
}
