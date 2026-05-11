import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artigos e Dicas Financeiras | Cálculo Grátis",
  description: "Aprenda a cuidar do seu dinheiro com nossos guias sobre rescisão, investimentos, impostos e muito mais.",
}

const ARTIGOS = [
  {
    slug: "rescisao-2026",
    title: "Como calcular sua rescisão em 2026",
    excerpt: "Guia completo sobre verbas rescisórias, aviso prévio e multa do FGTS.",
    date: "04 Mai 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["Rescisão", "FGTS", "CLT"]
  },
  {
    slug: "juros-compostos",
    title: "Juros Compostos: O segredo da riqueza",
    excerpt: "Entenda como o tempo trabalha a seu favor nos investimentos.",
    date: "02 Mai 2026",
    category: "Financeiro",
    readTime: "4 min",
    tags: ["Investimentos", "Juros"]
  },
  {
    slug: "salario-liquido",
    title: "Guia do Salário Líquido: Para onde vai seu dinheiro?",
    excerpt: "Tudo sobre descontos de INSS e IRRF na folha de pagamento.",
    date: "28 Abr 2026",
    category: "Trabalhista",
    readTime: "6 min",
    tags: ["Salário", "Impostos"]
  },
  {
    slug: "imc-saude",
    title: "IMC: Como interpretar seus resultados",
    excerpt: "Entenda o que o seu Índice de Massa Corporal diz sobre sua saúde e quais são os limites de cada categoria.",
    date: "25 Abr 2026",
    category: "Saúde",
    readTime: "3 min",
    tags: ["Saúde", "IMC"]
  },
  {
    slug: "sac-vs-price",
    title: "SAC ou Price: Qual a melhor tabela de financiamento?",
    excerpt: "Descubra as diferenças entre os sistemas de amortização e qual deles faz você pagar menos juros no longo prazo.",
    date: "20 Abr 2026",
    category: "Financeiro",
    readTime: "7 min",
    tags: ["Financiamento", "SAC", "Price"]
  },
  {
    slug: "seguro-desemprego",
    title: "Seguro Desemprego 2026: Quem tem direito e como calcular?",
    excerpt: "Guia atualizado sobre as novas regras, prazos e valores das parcelas do seguro desemprego.",
    date: "15 Abr 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["Seguro Desemprego", "Direitos"]
  },
  {
    slug: "guia-aposentadoria",
    title: "Como planejar sua aposentadoria em 2026",
    excerpt: "Entenda as regras atuais, idade mínima e tempo de contribuição para se aposentar pelo INSS.",
    date: "08 Mai 2026",
    category: "Previdência",
    readTime: "6 min",
    tags: ["Aposentadoria", "INSS", "Previdência"]
  },
  {
    slug: "guia-irrf-2026",
    title: "Tabela IRRF 2026: Como calcular o imposto retido",
    excerpt: "Confira a tabela atualizada do Imposto de Renda 2026 e aprenda a calcular o desconto no seu salário.",
    date: "09 Mai 2026",
    category: "Trabalhista",
    readTime: "4 min",
    tags: ["IRRF", "Impostos", "2026"]
  },
  {
    slug: "guia-ferias-clt",
    title: "Cálculo de Férias: Entenda o terço constitucional",
    excerpt: "Saiba quanto você vai receber ao tirar férias, incluindo o adicional de 1/3 e o abono pecuniário.",
    date: "09 Mai 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["Férias", "CLT", "Direitos"]
  },
  {
    slug: "rendimento-cdb",
    title: "Como calcular o rendimento do CDB em 2026",
    excerpt: "Entenda como a taxa Selic e o CDI afetam o rendimento dos seus investimentos em renda fixa.",
    date: "10 Mai 2026",
    category: "Financeiro",
    readTime: "5 min",
    tags: ["CDB", "Renda Fixa", "Investimentos"]
  },
  {
    slug: "como-calcular-hora-extra",
    title: "Como calcular hora extra em 2026",
    excerpt: "Aprenda a calcular o valor das suas horas adicionais com 50%, 100% e o adicional noturno.",
    date: "10 Mai 2026",
    category: "Trabalhista",
    readTime: "4 min",
    tags: ["Hora Extra", "Direitos", "CLT"]
  },
  {
    slug: "salario-minimo-2026",
    title: "Salário Mínimo 2026: Valor atualizado e impactos",
    excerpt: "Confira o novo valor do salário mínimo em 2026 e como ele afeta benefícios e aposentadorias.",
    date: "10 Mai 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["Salário Mínimo", "Economia", "2026"]
  },
  {
    slug: "pedir-demissao-2-anos",
    title: "Quanto recebo se pedir demissão com 2 anos de empresa?",
    excerpt: "Saiba exatamente quais são seus direitos e valores ao solicitar desligamento após 24 meses.",
    date: "09 Mai 2026",
    category: "Trabalhista",
    readTime: "6 min",
    tags: ["Rescisão", "Pedido de Demissão", "Direitos"]
  },
  {
    slug: "pj-vs-clt",
    title: "PJ ou CLT: Qual vale mais a pena em 2026?",
    excerpt: "Compare os ganhos reais e benefícios de cada modelo e escolha o melhor para sua carreira.",
    date: "10 Mai 2026",
    category: "Trabalhista",
    readTime: "6 min",
    tags: ["Carreira", "Salário", "Contrato"]
  },
  {
    slug: "guia-13-salario",
    title: "Guia do 13º Salário: Datas e como calcular",
    excerpt: "Saiba quando você recebe a primeira e segunda parcela da gratificação natalina em 2026.",
    date: "10 Mai 2026",
    category: "Trabalhista",
    readTime: "5 min",
    tags: ["13º Salário", "Direitos", "CLT"]
  },
  {
    slug: "guia-calculadora-gestacional",
    title: "Guia da Gestação: Como contar as semanas",
    excerpt: "Entenda o cálculo da idade gestacional e a data provável do parto (DPP).",
    date: "10 Mai 2026",
    category: "Saúde",
    readTime: "5 min",
    tags: ["Saúde", "Gravidez", "Gestação"]
  },
  {
    slug: "guia-regra-de-tres",
    title: "Como fazer Regra de Três Simples e Composta",
    excerpt: "Aprenda o passo a passo para resolver problemas de proporcionalidade direta e inversa.",
    date: "10 Mai 2026",
    category: "Matemática",
    readTime: "4 min",
    tags: ["Matemática", "Educação", "Proporção"]
  },
  {
    slug: "porcentagem-guia-rapido",
    title: "Como calcular porcentagem: Guia rápido e prático",
    excerpt: "Aprenda a calcular descontos, aumentos e variações percentuais sem complicação.",
    date: "10 Mai 2026",
    category: "Matemática",
    readTime: "3 min",
    tags: ["Matemática", "Porcentagem", "Finanças"]
  },
  {
    slug: "reajuste-aluguel-guia",
    title: "Guia do Reajuste de Aluguel 2026 (IGP-M e IPCA)",
    excerpt: "Entenda como funciona o reajuste do aluguel, quais índices são usados e como calcular o novo valor.",
    date: "11 Mai 2026",
    category: "Financeiro",
    readTime: "5 min",
    tags: ["Aluguel", "IGP-M", "IPCA"]
  },
  {
    slug: "alcool-ou-gasolina-economizar",
    title: "Álcool ou Gasolina: Qual compensa mais em 2026?",
    excerpt: "Aprenda a regra dos 70% e saiba como economizar no abastecimento do seu carro flex.",
    date: "11 Mai 2026",
    category: "Utilidades",
    readTime: "4 min",
    tags: ["Combustível", "Economia", "Carro"]
  },
  {
    slug: "markup-vs-margem",
    title: "Markup vs Margem de Lucro: Qual a diferença?",
    excerpt: "Muitos empreendedores confundem markup com margem de lucro. Aprenda a precificar corretamente.",
    date: "11 Mai 2026",
    category: "Financeiro",
    readTime: "5 min",
    tags: ["Empreendedorismo", "Preço", "Finanças"]
  },
  {
    slug: "custo-funcionario-clt",
    title: "Quanto custa um funcionário para a empresa em 2026?",
    excerpt: "Entenda o custo real de um colaborador CLT, incluindo impostos e encargos trabalhistas.",
    date: "11 Mai 2026",
    category: "Trabalhista",
    readTime: "6 min",
    tags: ["RH", "Empresas", "CLT"]
  },
  {
    slug: "guia-ipva-2026",
    title: "Guia do IPVA 2026: Alíquotas e como calcular",
    excerpt: "Saiba como o valor do IPVA é definido e como se planejar para o pagamento do imposto veicular.",
    date: "11 Mai 2026",
    category: "Financeiro",
    readTime: "4 min",
    tags: ["IPVA", "Impostos", "Carro"]
  },
  {
    slug: "guia-correcao-monetaria",
    title: "Como calcular Correção Monetária em 2026",
    excerpt: "Entenda como atualizar valores financeiros e judiciais usando índices de inflação.",
    date: "11 Mai 2026",
    category: "Jurídica",
    readTime: "5 min",
    tags: ["Correção Monetária", "Inflação", "Jurídico"]
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

              <Link href={`/artigos/${art.slug}`} className="mt-auto inline-flex items-center gap-2 text-accent font-bold group-hover:translate-x-1 transition-transform">
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
