import Link from "next/link"
import { notFound } from "next/navigation"
import { Newsletter } from "@/components/layout/newsletter"
import { ARTIGOS_PT } from "@/lib/constants/articles"

export function generateStaticParams() {
  const defaultSlugs = ["rescisao-2026", "juros-compostos", "salario-liquido", "imc-saude", "sac-vs-price", "seguro-desemprego"]
  const dynamicSlugs = Object.keys(ARTIGOS_PT)
  const allSlugs = Array.from(new Set([...defaultSlugs, ...dynamicSlugs]))
  
  return allSlugs.map((slug) => ({
    slug,
  }))
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = ARTIGOS_PT[params.slug]

  // Fallback for slugs that don't have detailed content yet
  const fallbackMap: Record<string, { title: string, cat: string, date: string }> = {
    "salario-liquido": { title: "Guia do Salário Líquido: Para onde vai seu dinheiro?", cat: "Trabalhista", date: "28 Abr 2026" },
    "imc-saude": { title: "IMC: Como interpretar seus resultados", cat: "Saúde", date: "25 Abr 2026" },
    "sac-vs-price": { title: "SAC ou Price: Qual a melhor tabela de financiamento?", cat: "Financeiro", date: "20 Abr 2026" },
    "seguro-desemprego": { title: "Seguro Desemprego 2026: Quem tem direito e como calcular?", cat: "Trabalhista", date: "15 Abr 2026" },
  }

  const data = article || fallbackMap[params.slug]

  if (!data) notFound()

  return (
    <div className="container-app py-12 max-w-4xl">
      <Link href="/artigos" className="inline-flex items-center text-sm text-slate-500 hover:text-accent mb-8 transition-colors">
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar para Artigos
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs font-bold text-accent uppercase tracking-widest mb-4">
          <span>{data.cat}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-normal">{data.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-navy dark:text-white leading-tight">
          {data.title}
        </h1>
        {article && (
          <p className="mt-6 text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            {article.description}
          </p>
        )}
      </header>

      <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
        {article ? (
          <div className="space-y-6">
            {article.content.map((text, i) => {
              if (text.startsWith('###')) {
                return <h3 key={i} className="text-2xl font-bold text-navy dark:text-white mt-12 mb-4">{text.replace('### ', '')}</h3>
              }
              if (text.match(/^\d\./)) {
                return <p key={i} className="pl-4 border-l-4 border-accent bg-slate-50 dark:bg-slate-900/50 p-4 rounded-r-xl">{text}</p>
              }
              return <p key={i} className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
            })}

            <div className="mt-12 p-8 bg-gradient-to-br from-navy to-navy-light rounded-3xl text-center shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 mt-0">Pronto para calcular?</h3>
              <Link href={article.ctaLink} className="inline-block px-8 py-4 bg-accent hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95">
                {article.ctaLabel}
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-dashed border-slate-300 dark:border-slate-800 text-center">
            <h2 className="text-xl font-bold text-navy dark:text-white mb-4 mt-0">Conteúdo em Elaboração</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Estamos finalizando os detalhes técnicos deste guia para garantir que você receba a informação mais precisa conforme a legislação de 2026.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:scale-105 transition-transform">
                Ver Calculadoras Relacionadas
              </Link>
            </div>
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  )
}
