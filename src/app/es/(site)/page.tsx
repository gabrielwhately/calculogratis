import Link from "next/link"
import { CATEGORIAS, CALCULADORAS } from "@/lib/constants/calculadoras"
import { CATEGORIAS_ES, CALCULADORAS_ES } from "@/lib/i18n/calculadoras-es"
import { Newsletter } from "@/components/layout/newsletter"
import { Icons } from "@/components/ui/icons"
import { getCalculatorOfTheDay } from "@/lib/calculator-of-the-day"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  briefcase: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  banknotes: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h20v10H2z" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.8} />
      <path strokeLinecap="round" d="M6 7v10M18 7v10" />
    </svg>
  ),
  "shield-check": (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  heart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  calculator: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  scale: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-4 4m4-4l4 4M3 17l3-6h12l3 6M6 11l-3 6h6l-3-6zm12 0l-3 6h6l-3-6z" />
    </svg>
  ),
  arrows: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  wrench: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

const CATEGORY_COLORS: Record<string, { bg: string; icon: string; border: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-500/10",   icon: "text-blue-600 dark:text-blue-400",   border: "border-blue-100 hover:border-blue-300 dark:border-blue-500/20 dark:hover:border-blue-500/50" },
  green:  { bg: "bg-green-50 dark:bg-green-500/10",  icon: "text-green-600 dark:text-green-400",  border: "border-green-100 hover:border-green-300 dark:border-green-500/20 dark:hover:border-green-500/50" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", icon: "text-purple-600 dark:text-purple-400", border: "border-purple-100 hover:border-purple-300 dark:border-purple-500/20 dark:hover:border-purple-500/50" },
  red:    { bg: "bg-red-50 dark:bg-red-500/10",    icon: "text-red-600 dark:text-red-400",    border: "border-red-100 hover:border-red-300 dark:border-red-500/20 dark:hover:border-red-500/50" },
  indigo: { bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-100 hover:border-indigo-300 dark:border-indigo-500/20 dark:hover:border-indigo-500/50" },
  amber:  { bg: "bg-amber-50 dark:bg-amber-500/10",  icon: "text-amber-600 dark:text-amber-400",  border: "border-amber-100 hover:border-amber-300 dark:border-amber-500/20 dark:hover:border-amber-500/50" },
  teal:   { bg: "bg-teal-50 dark:bg-teal-500/10",   icon: "text-teal-600 dark:text-teal-400",   border: "border-teal-100 hover:border-teal-300 dark:border-teal-500/20 dark:hover:border-teal-500/50" },
  orange: { bg: "bg-orange-50 dark:bg-orange-500/10", icon: "text-orange-600 dark:text-orange-400", border: "border-orange-100 hover:border-orange-300 dark:border-orange-500/20 dark:hover:border-orange-500/50" },
}

const POPULARES = ["rescisao", "salario-liquido", "juros-compostos", "financiamento", "imc", "hora-extra"]

const POPULAR_ICONS: Record<string, React.ElementType> = {
  "rescisao": Icons.Briefcase,
  "salario-liquido": Icons.Banknotes,
  "juros-compostos": Icons.ChartBar,
  "financiamento": Icons.Home,
  "imc": Icons.Heart,
  "hora-extra": Icons.Clock,
}

export default function HomeES() {
  const calcDoDia = getCalculatorOfTheDay()
  const esCalcDoDia = CALCULADORAS_ES[calcDoDia.slug]
  const esCatSlug = CATEGORIAS_ES[calcDoDia.categoriaSlug]?.slug ?? calcDoDia.categoriaSlug
  const calculadorasPopulares = CALCULADORAS.filter(c => POPULARES.includes(c.slug))

  return (
    <div className="container-app py-8 space-y-12">
      <section className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
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

      {/* Featured / Calc of the Day */}
      <section className="relative group">
        <Link 
          href={`/es/${esCatSlug}/${calcDoDia.slug}`}
          className="block p-8 rounded-3xl bg-accent/5 dark:bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all shadow-sm hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 w-16 h-16 bg-accent text-navy rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icons.Star className="w-8 h-8 fill-current" />
            </div>
            <div className="text-center md:text-left flex-1">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 block">Destacado de Hoy</span>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-2">{esCalcDoDia?.nome ?? calcDoDia.nome}</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">{esCalcDoDia?.descricao ?? calcDoDia.descricao}</p>
            </div>
            <div className="shrink-0">
              <span className="px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy font-bold rounded-xl text-sm group-hover:bg-blue-700 dark:group-hover:bg-slate-200 transition-colors">
                Usar Ahora
              </span>
            </div>
          </div>
        </Link>
      </section>

      <section id="categorias">
        <h2 className="text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h7" />
          </svg>
          Categorías
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIAS.map((cat) => {
            const colors = CATEGORY_COLORS[cat.cor]
            const esData = CATEGORIAS_ES[cat.slug]
            return (
              <Link
                key={cat.slug}
                href={`/es/${esData?.slug ?? cat.slug}`}
                className={`group flex items-start gap-4 rounded-xl border bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:shadow-md ${colors.border}`}
              >
                <div className={`shrink-0 rounded-lg p-2 ${colors.bg} ${colors.icon} transition-transform group-hover:scale-110`}>
                  {CATEGORY_ICONS[cat.icone]}
                </div>
                <div>
                  <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors">
                    Calculadoras de {esData?.nome ?? cat.nome}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{esData?.descricao ?? cat.descricao}</p>
                </div>
              </Link>
            )
          })}
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
          {calculadorasPopulares.map((calc) => {
             const esCalc = CALCULADORAS_ES[calc.slug]
             const esCatSlug = CATEGORIAS_ES[calc.categoriaSlug]?.slug ?? calc.categoriaSlug
             const Icon = POPULAR_ICONS[calc.slug] || Icons.Briefcase
             return (
              <Link
                key={calc.slug}
                href={`/es/${esCatSlug}/${calc.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:border-accent hover:shadow-md"
              >
                <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:text-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors text-sm truncate">{esCalc?.nome ?? calc.nome}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{esCalc?.descricao ?? calc.descricao}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <Newsletter />

      {/* Personalization & B2B */}
      <section className="grid gap-6 md:grid-cols-3">
        <Link href="/es/favoritos" className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-red-200 dark:hover:border-red-900/30 transition-all shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-navy dark:text-white group-hover:text-red-500 transition-colors">Mis Calculadoras</h3>
              <p className="text-xs text-slate-500">Herramientas que has marcado como favoritas.</p>
            </div>
          </div>
        </Link>
        <Link href="/es/historial" className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-200 dark:hover:border-blue-900/30 transition-all shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-navy dark:text-white group-hover:text-blue-500 transition-colors">Mi Historial</h3>
              <p className="text-xs text-slate-500">Resultados que has guardado.</p>
            </div>
          </div>
        </Link>
        <Link href="/es/widgets" className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-accent/30 transition-all shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-navy dark:text-white group-hover:text-accent transition-colors">Para Socios</h3>
              <p className="text-xs text-slate-500">Calculadoras para su sitio web.</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Why Us */}
      <section className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-8">¿Por qué usar Cálculo Gratis?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto text-accent">
                <Icons.ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy dark:text-white">Privacidad Total</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sus datos nunca salen de su navegador. No guardamos nada en nuestros servidores.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto text-accent">
                <Icons.CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy dark:text-white">Precisión 2026</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Fórmulas rigurosamente actualizadas según la legislación e indicadores vigentes este año.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto text-accent">
                <Icons.Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy dark:text-white">Velocidad Extrema</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Resultados instantáneos mientras escribe. Sin esperas y sin burocracia.</p>
            </div>
          </div>
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
          {CALCULADORAS.map((calc) => {
            const esCalc = CALCULADORAS_ES[calc.slug]
            const esCatData = CATEGORIAS_ES[calc.categoriaSlug]
            return (
              <Link
                key={calc.slug}
                href={`/es/${esCatData?.slug ?? calc.categoriaSlug}/${calc.slug}`}
                className="group block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-all hover:border-accent hover:shadow-md"
              >
                <span className="inline-block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{esCatData?.nome ?? calc.categoria}</span>
                <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors text-sm">{esCalc?.nome ?? calc.nome}</h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{esCalc?.descricao ?? calc.descricao}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
