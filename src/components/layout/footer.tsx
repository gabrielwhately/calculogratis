'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CALCULADORAS } from '@/lib/constants/calculadoras'

const I18N = {
  pt: {
    description: 'A maior plataforma de calculadoras e simuladores online 100% grátis do Brasil. Resultados precisos e instantâneos conforme a legislação atualizada.',
    popular: 'Populares',
    links: 'Links Úteis',
    terms: 'Termos de Uso',
    privacy: 'Privacidade',
    contact: 'Contato',
    request: 'Sugerir Calculadora',
    copy: 'calculogratis.com',
  },
  es: {
    description: 'La mayor plataforma de calculadoras y simuladores online 100% gratis. Resultados precisos e instantáneos según la legislación actualizada.',
    popular: 'Populares',
    links: 'Enlaces Útiles',
    terms: 'Términos de Uso',
    privacy: 'Privacidad',
    contact: 'Contacto',
    request: 'Sugerir Calculadora',
    copy: 'calculogratis.com',
  }
}

const POPULARES = ['rescisao', 'salario-liquido', 'juros-compostos', 'imc']

export function Footer() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  const prefix = isSpanish ? '/es' : ''

  const popularCalcs = CALCULADORAS.filter(c => POPULARES.includes(c.slug))

  return (
    <footer className="print:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-12 pb-24 md:pb-12">
      <div className="container-app">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href={isSpanish ? '/es' : '/'} className="text-xl font-bold tracking-tight text-navy dark:text-white">
              Calculo<span className="text-accent">Gratis</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-white">
              {t.popular}
            </h4>
            <ul className="mt-4 space-y-2">
              {popularCalcs.map((calc) => (
                <li key={calc.slug}>
                  <Link 
                    href={`${prefix}/${calc.categoriaSlug}/${calc.slug}`} 
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors"
                  >
                    {calc.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-white">
              {t.links}
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={`${prefix}/busca`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">
                  {isSpanish ? 'Buscar' : 'Busca'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/favoritos`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">
                  {isSpanish ? 'Favoritos' : 'Favoritos'}
                </Link>
              </li>
              <li>
                <a href="mailto:contato@calculogratis.com" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">
                  {t.request}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-white">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-slate-400 cursor-not-allowed">{t.terms}</span>
              </li>
              <li>
                <span className="text-sm text-slate-400 cursor-not-allowed">{t.privacy}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {t.copy} — CNPJ 00.000.000/0000-00
          </p>
          <div className="flex gap-6">
             {/* Social placeholders if needed */}
          </div>
        </div>
      </div>
    </footer>
  )
}
