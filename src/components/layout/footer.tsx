'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIAS } from '@/lib/constants/calculadoras'

const I18N = {
  pt: {
    description: 'Calculadoras e simuladores online grátis para o dia a dia.',
    viewAll: 'Ver todas',
    copy: 'calculogratis.com',
  },
  es: {
    description: 'Calculadoras y simuladores online gratis para el día a día.',
    viewAll: 'Ver todas',
    copy: 'calculogratis.com',
  }
}

export function Footer() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-8 hidden md:block">
      <div className="container-app">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="font-semibold text-navy dark:text-white">Calculo Gratis</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.description}</p>
          </div>
          {CATEGORIAS.map((cat) => (
            <div key={cat.slug}>
              <h4 className="font-semibold text-navy dark:text-white">{cat.nome}</h4>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link 
                    href={isSpanish ? `/es/${cat.slug}` : `/${cat.slug}`} 
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent"
                  >
                    {t.viewAll}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          &copy; {new Date().getFullYear()} {t.copy}
        </div>
      </div>
    </footer>
  )
}
