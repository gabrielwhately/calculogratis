import Link from 'next/link'
import { CATEGORIAS, CALCULADORAS } from '@/lib/constants/calculadoras'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  briefcase: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  banknotes: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h20v10H2z" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.8} />
      <path strokeLinecap="round" d="M6 7v10M18 7v10" />
    </svg>
  ),
  'shield-check': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  heart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  calculator: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  scale: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-4 4m4-4l4 4M3 17l3-6h12l3 6M6 11l-3 6h6l-3-6zm12 0l-3 6h6l-3-6z" />
    </svg>
  ),
  arrows: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  wrench: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

const CATEGORY_COLORS: Record<string, { bg: string; icon: string; border: string }> = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   border: 'border-blue-100 hover:border-blue-300' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  border: 'border-green-100 hover:border-green-300' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100 hover:border-purple-300' },
  red:    { bg: 'bg-red-50',    icon: 'text-red-600',    border: 'border-red-100 hover:border-red-300' },
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100 hover:border-indigo-300' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  border: 'border-amber-100 hover:border-amber-300' },
  teal:   { bg: 'bg-teal-50',   icon: 'text-teal-600',   border: 'border-teal-100 hover:border-teal-300' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100 hover:border-orange-300' },
}

const POPULARES = ['rescisao', 'salario-liquido', 'juros-compostos', 'financiamento', 'imc', 'hora-extra']

export default function Home() {
  const calculadorasPopulares = CALCULADORAS.filter(c => POPULARES.includes(c.slug))

  return (
    <div className="container-app py-8 space-y-12">
      {/* Hero */}
      <section className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3"/></svg>
          100% grátis · Sem cadastro · Resultados instantâneos
        </div>
        <h1 className="text-3xl font-bold text-navy dark:text-white md:text-4xl leading-tight">
          Calculadoras e Simuladores Online <span className="text-accent">Grátis</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Mais de 50 calculadoras: rescisão trabalhista, salário líquido, juros compostos, financiamento, IMC e muito mais — calcule em segundos.
        </p>
      </section>

      {/* Categories */}
      <section id="categorias">
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h7" />
          </svg>
          Categorias
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIAS.map((cat) => {
            const colors = CATEGORY_COLORS[cat.cor]
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`group flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${colors.border}`}
              >
                <div className={`shrink-0 rounded-lg p-2 ${colors.bg} ${colors.icon} transition-transform group-hover:scale-110`}>
                  {CATEGORY_ICONS[cat.icone]}
                </div>
                <div>
                  <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors">
                    Calculadoras {cat.nome}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{cat.descricao}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular */}
      <section>
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Mais Usadas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {calculadorasPopulares.map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.categoriaSlug}/${calc.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:border-accent hover:shadow-md"
            >
              <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-accent transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors text-sm truncate">{calc.nome}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{calc.descricao}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All calculators */}
      <section>
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Todas as Calculadoras
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULADORAS.map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.categoriaSlug}/${calc.slug}`}
              className="group block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:border-accent hover:shadow-md"
            >
              <span className="inline-block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{calc.categoria}</span>
              <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors text-sm">{calc.nome}</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{calc.descricao}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
