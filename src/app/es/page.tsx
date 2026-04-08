import Link from 'next/link'
import { CATEGORIAS, CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'

const POPULARES = ['rescisao', 'salario-liquido', 'juros-compostos', 'financiamento', 'imc', 'hora-extra']

function getCatName(ptSlug: string): string {
  return CATEGORIAS_ES[ptSlug]?.nome ?? ptSlug
}

function getCatSlugEs(ptSlug: string): string {
  return CATEGORIAS_ES[ptSlug]?.slug ?? ptSlug
}

function getCalcName(slug: string, ptNome: string): string {
  return CALCULADORAS_ES[slug]?.nome ?? ptNome
}

function getCalcDesc(slug: string, ptDesc: string): string {
  return CALCULADORAS_ES[slug]?.descricao ?? ptDesc
}

export default function HomeES() {
  const calculadorasPopulares = CALCULADORAS.filter(c => POPULARES.includes(c.slug))

  return (
    <div className="container-app py-8 space-y-12">
      <section className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3"/></svg>
          100% gratis · Sin registro · Resultados instantáneos
        </div>
        <h1 className="text-3xl font-bold text-navy dark:text-white md:text-4xl leading-tight">
          Calculadoras y Simuladores Online <span className="text-accent">Gratis</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Más de 50 calculadoras: liquidación laboral, salario neto, interés compuesto, financiamiento, IMC y mucho más — calcula en segundos.
        </p>
      </section>

      <section id="categorias">
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h7" />
          </svg>
          Categorías
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.slug} href={`/es/${getCatSlugEs(cat.slug)}`}
              className="group flex items-start gap-4 rounded-xl border bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:shadow-md border-slate-200 dark:border-slate-700 hover:border-accent">
              <div>
                <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors">
                  Calculadoras {getCatName(cat.slug)}
                </h3>
                <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {CATEGORIAS_ES[cat.slug]?.descricao ?? cat.descricao}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Más Usadas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {calculadorasPopulares.map((calc) => (
            <Link key={calc.slug} href={`/es/${getCatSlugEs(calc.categoriaSlug)}/${calc.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:border-accent hover:shadow-md">
              <div className="min-w-0">
                <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors text-sm truncate">
                  {getCalcName(calc.slug, calc.nome)}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                  {getCalcDesc(calc.slug, calc.descricao)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Todas las Calculadoras
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULADORAS.map((calc) => (
            <Link key={calc.slug} href={`/es/${getCatSlugEs(calc.categoriaSlug)}/${calc.slug}`}
              className="group block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:border-accent hover:shadow-md">
              <span className="inline-block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                {getCatName(calc.categoriaSlug)}
              </span>
              <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors text-sm">
                {getCalcName(calc.slug, calc.nome)}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {getCalcDesc(calc.slug, calc.descricao)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
