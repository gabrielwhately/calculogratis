import Link from "next/link"

export const metadata = {
  title: "Artículos y Consejos Financieros",
  description: "Aprenda a cuidar su dinero con nuestras guías sobre liquidación, inversiones, impuestos y mucho más.",
}

const ARTICULOS = [
  {
    title: "¿Cómo calcular su liquidación en 2026?",
    excerpt: "Guía completa sobre beneficios sociales, preaviso y aportes al fondo de pensiones.",
    date: "04 May 2026",
    category: "Laboral"
  },
  {
    title: "Interés Compuesto: El secreto de la riqueza",
    excerpt: "Entienda cómo el tiempo trabaja a su favor en las inversiones.",
    date: "02 May 2026",
    category: "Finanzas"
  },
  {
    title: "Guía del Salario Neto: ¿A dónde va su dinero?",
    excerpt: "Todo sobre los descuentos de seguridad social e impuestos en la nómina.",
    date: "28 Abr 2026",
    category: "Laboral"
  },
  {
    title: "IMC: Cómo interpretar sus resultados",
    excerpt: "Entienda lo que su Índice de Masa Corporal dice sobre su salud y cuáles son los límites de cada categoría.",
    date: "25 Abr 2026",
    category: "Salud"
  },
  {
    title: "SAC o Francés: ¿Cuál es el mejor sistema de amortización?",
    excerpt: "Descubra las diferencias entre los sistemas de crédito y cuál le hace pagar menos intereses a largo plazo.",
    date: "20 Abr 2026",
    category: "Finanzas"
  },
  {
    title: "Seguro de Desempleo 2026: ¿Quién tiene derecho y cómo calcular?",
    excerpt: "Guía actualizada sobre las nuevas reglas, plazos y valores del subsidio por desempleo.",
    date: "15 Abr 2026",
    category: "Laboral"
  }
]

export default function ArticulosPage() {
  return (
    <div className="container-app py-8 space-y-8">
      <section className="text-center py-4">
        <h1 className="text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Artículos y <span className="text-accent">Consejos</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Guías prácticas para ayudarle a entender sus derechos y organizar sus finanzas.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTICULOS.map((art, i) => (
          <article key={i} className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                <span>{art.category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-normal normal-case">{art.date}</span>
              </div>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-2 leading-tight">
                {art.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                {art.excerpt}
              </p>
              <Link href="#" className="mt-auto inline-flex items-center text-accent font-bold text-sm hover:underline">
                Leer artículo completo
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-navy dark:text-white mb-2">¿Tiene alguna duda?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
          Nuestras calculadoras se basan en la legislación vigente en 2026. Si necesita ayuda, consulte a un profesional especializado.
        </p>
        <Link href="/es" className="inline-flex items-center px-6 py-3 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-xl transition-all hover:scale-105">
          Volver a Calculadoras
        </Link>
      </div>
    </div>
  )
}
