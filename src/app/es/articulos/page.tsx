import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artículos y Consejos Financieros | Cálculo Gratis",
  description: "Aprenda a cuidar su dinero con nuestros guías sobre liquidación, inversiones, impuestos y mucho más.",
}

const ARTICULOS = [
  {
    title: "Cómo calcular su liquidación laboral en 2026",
    excerpt: "Guía completa sobre prestaciones sociales, aviso previo y multa del FGTS.",
    date: "04 May 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Liquidación", "FGTS", "Derechos"]
  },
  {
    title: "Interés Compuesto: El secreto de la riqueza",
    excerpt: "Entienda cómo el tiempo trabaja a su favor en las inversiones.",
    date: "02 May 2026",
    category: "Financiero",
    readTime: "4 min",
    tags: ["Inversiones", "Interés"]
  },
  {
    title: "Guía del Salario Neto: ¿A dónde va su dinero?",
    excerpt: "Todo sobre deducciones de seguridad social e impuestos en la nómina.",
    date: "28 Abr 2026",
    category: "Laboral",
    readTime: "6 min",
    tags: ["Salario", "Impuestos"]
  },
  {
    title: "IMC: Cómo interpretar sus resultados",
    excerpt: "Entienda lo que su Índice de Massa Corporal dice sobre su salud y cuáles son los límites de cada categoría.",
    date: "25 Abr 2026",
    category: "Salud",
    readTime: "3 min",
    tags: ["Salud", "IMC"]
  },
  {
    title: "¿SAC o Price: Cuál es la mejor tabla de financiamiento?",
    excerpt: "Descubra las diferencias entre los sistemas de amortización y cuál de ellos le hace pagar menos intereses a largo plazo.",
    date: "20 Abr 2026",
    category: "Financiero",
    readTime: "7 min",
    tags: ["Financiamiento", "SAC", "Price"]
  },
  {
    title: "Seguro de Desempleo 2026: ¿Quién tiene derecho y cómo calcular?",
    excerpt: "Guía actualizada sobre las nuevas reglas, plazos y valores de las cuotas del seguro de desempleo.",
    date: "15 Abr 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Seguro Desempleo", "Derechos"]
  }
]

export default function ArticlesPageES() {
  return (
    <div className="container-app py-8 space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-navy dark:text-white md:text-5xl tracking-tight">
          Artículos y <span className="text-accent">Consejos</span>
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guías prácticas para ayudarle a entender sus derechos y organizar sus finanzas con claridad.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {ARTICULOS.map((art, i) => (
          <article key={i} className="group flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  {art.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {art.readTime} de lectura
                </span>
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-3 leading-tight group-hover:text-accent transition-colors">
                {art.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {art.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {art.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link href="#" className="mt-auto inline-flex items-center gap-2 text-accent font-bold group-hover:translate-x-1 transition-transform">
                Leer guía completa
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-navy rounded-3xl p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3">¿Tiene alguna duda?</h3>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
            Nuestras calculadoras se actualizan constantemente según la legislación de 2026.
          </p>
          <Link href="/es" className="inline-flex items-center px-8 py-4 bg-accent hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-95">
            Explorar todas las calculadoras
          </Link>
        </div>
      </div>
    </div>
  )
}
