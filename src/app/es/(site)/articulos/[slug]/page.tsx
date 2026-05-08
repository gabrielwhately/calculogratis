import Link from "next/link"
import { notFound } from "next/navigation"
import { Newsletter } from "@/components/layout/newsletter"

// This matches the slugs in ARTICLES page
const ARTICULOS_MAP: Record<string, { title: string, cat: string, date: string }> = {
  "liquidacion-2026": { title: "¿Cómo calcular su liquidación en 2026?", cat: "Laboral", date: "04 May 2026" },
  "interes-compuesto": { title: "Interés Compuesto: El secreto de la riqueza", cat: "Finanzas", date: "02 May 2026" },
  "salario-neto": { title: "Guia del Salario Neto: ¿A dónde va su dinero?", cat: "Laboral", date: "28 Abr 2026" },
  "imc-salud": { title: "IMC: Cómo interpretar sus resultados", cat: "Salud", date: "25 Abr 2026" },
  "sac-o-frances": { title: "SAC o Francés: ¿Cuál es el mejor sistema de amortización?", cat: "Finanzas", date: "20 Abr 2026" },
  "seguro-desempleo": { title: "Seguro de Desempleo 2026: ¿Quién tiene derecho y cómo calcular?", cat: "Laboral", date: "15 Abr 2026" },
}

export function generateStaticParams() {
  return Object.keys(ARTICULOS_MAP).map((slug) => ({
    slug,
  }))
}

export default function ArticleDetailPageES({ params }: { params: { slug: string } }) {
  const article = ARTICULOS_MAP[params.slug]

  if (!article) notFound()

  return (
    <div className="container-app py-12 max-w-4xl">
      <Link href="/es/articulos" className="inline-flex items-center text-sm text-slate-500 hover:text-accent mb-8 transition-colors">
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a Artículos
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs font-bold text-accent uppercase tracking-widest mb-4">
          <span>{article.cat}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-normal">{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-navy dark:text-white leading-tight">
          {article.title}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-dashed border-slate-300 dark:border-slate-800 text-center">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4 mt-0">Contenido en Elaboración</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Estamos finalizando los detalles técnicos de esta guía para asegurar que reciba la información más precisa según la legislación de 2026.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/es" className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:scale-105 transition-transform">
              Ver Calculadoras Relacionadas
            </Link>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  )
}
