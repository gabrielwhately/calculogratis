import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artigos e Dicas Financeiras | Cálculo Grátis",
  description: "Aprenda a cuidar do seu dinheiro com nossos guias sobre rescisão, investimentos, impostos e muito mais.",
}

const ARTIGOS = [
  {
    title: "Como calcular sua rescisão em 2026",
    excerpt: "Guia completo sobre verbas rescisórias, aviso prévio e multa do FGTS.",
    date: "04 Mai 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["Rescisão", "FGTS", "CLT"]
  },
  {
    title: "Juros Compostos: O segredo da riqueza",
    excerpt: "Entenda como o tempo trabalha a seu favor nos investimentos.",
    date: "02 Mai 2026",
    category: "Financeiro",
    readTime: "4 min",
    tags: ["Investimentos", "Juros"]
  },
  {
    title: "Guia do Salário Líquido: Para onde vai seu dinheiro?",
    excerpt: "Tudo sobre descontos de INSS e IRRF na folha de pagamento.",
    date: "28 Abr 2026",
    category: "Trabalhista",
    readTime: "6 min",
    tags: ["Salário", "Impostos"]
  },
  {
    title: "IMC: Como interpretar seus resultados",
    excerpt: "Entenda o que o seu Índice de Massa Corporal diz sobre sua saúde e quais são os limites de cada categoria.",
    date: "25 Abr 2026",
    category: "Saúde",
    readTime: "3 min",
    tags: ["Saúde", "IMC"]
  },
  {
    title: "SAC ou Price: Qual a melhor tabela de financiamento?",
    excerpt: "Descubra as diferenças entre os sistemas de amortização e qual deles faz você pagar menos juros no longo prazo.",
    date: "20 Abr 2026",
    category: "Financeiro",
    readTime: "7 min",
    tags: ["Financiamento", "SAC", "Price"]
  },
  {
    title: "Seguro Desemprego 2026: Quem tem direito e como calcular?",
    excerpt: "Guia atualizado sobre as novas regras, prazos e valores das parcelas do seguro desemprego.",
    date: "15 Abr 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["Seguro Desemprego", "Direitos"]
  }
]

export default function ArticlesPage() {
  return (
    <div className="container-app py-8 space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-navy dark:text-white md:text-5xl tracking-tight">
          Artigos e <span className="text-accent">Dicas</span>
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guias práticos para ajudar você a entender seus direitos e organizar suas finanças com clareza.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {ARTIGOS.map((art, i) => (
          <article key={i} className="group flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  {art.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {art.readTime} de leitura
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
                Ler guia completo
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
          <h3 className="text-2xl font-bold text-white mb-3">Ficou com alguma dúvida?</h3>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
            Nossas calculadoras são atualizadas constantemente conforme a legislação de 2026.
          </p>
          <Link href="/" className="inline-flex items-center px-8 py-4 bg-accent hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-95">
            Explorar todas as calculadoras
          </Link>
        </div>
      </div>
    </div>
  )
}
