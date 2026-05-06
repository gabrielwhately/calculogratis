import Link from 'next/link'
import { BRAND_NAME } from '@/lib/constants/branding'

export const metadata = {
  title: 'Artigos e Dicas Financeiras',
  description: 'Aprenda a cuidar do seu dinheiro com nossos guias sobre rescisão, investimentos, impostos e muito mais.',
}

const ARTIGOS = [
  {
    title: 'Como calcular sua rescisão em 2026',
    excerpt: 'Guia completo sobre verbas rescisórias, aviso prévio e multa do FGTS.',
    date: '04 Mai 2026',
    category: 'Trabalhista'
  },
  {
    title: 'Juros Compostos: O segredo da riqueza',
    excerpt: 'Entenda como o tempo trabalha a seu favor nos investimentos.',
    date: '02 Mai 2026',
    category: 'Financeiro'
  },
  {
    title: 'Guia do Salário Líquido: Para onde vai seu dinheiro?',
    excerpt: 'Tudo sobre descontos de INSS e IRRF na folha de pagamento.',
    date: '28 Abr 2026',
    category: 'Trabalhista'
  }
]

export default function ArticlesPage() {
  return (
    <div className="container-app py-8 space-y-8">
      <section className="text-center py-4">
        <h1 className="text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Artigos e <span className="text-accent">Dicas</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Guias práticos para ajudar você a entender seus direitos e organizar suas finanças.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTIGOS.map((art, i) => (
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
                Ler artigo completo
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-navy dark:text-white mb-2">Ficou com alguma dúvida?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
          Nossas calculadoras são baseadas na legislação vigente em 2026. Se precisar de ajuda, consulte um profissional especializado.
        </p>
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-xl transition-all hover:scale-105">
          Voltar para Calculadoras
        </Link>
      </div>
    </div>
  )
}
