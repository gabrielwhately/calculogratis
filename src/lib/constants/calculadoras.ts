export interface CalculadoraInfo {
  nome: string
  slug: string
  categoria: string
  categoriaSlug: string
  descricao: string
  keywords: string
}

export const CATEGORIAS = [
  { nome: 'Trabalhista', slug: 'trabalhista', descricao: 'Calculadoras para direitos trabalhistas: rescisao, salario liquido, seguro desemprego e mais.', icone: 'briefcase' },
  { nome: 'Financeiro', slug: 'financeiro', descricao: 'Calculadoras financeiras: juros simples, juros compostos, financiamento imobiliario e mais.', icone: 'banknotes' },
  { nome: 'Previdencia', slug: 'previdencia', descricao: 'Simuladores de aposentadoria e previdencia social.', icone: 'shield-check' },
  { nome: 'Utilidades', slug: 'utilidades', descricao: 'Geradores e ferramentas uteis: CPF, CNPJ e mais.', icone: 'wrench' },
] as const

export const CALCULADORAS: CalculadoraInfo[] = [
  { nome: 'Rescisao Trabalhista', slug: 'rescisao', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor da sua rescisao trabalhista. Simule demissao sem justa causa, pedido de demissao e acordo.', keywords: 'rescisao trabalhista, calculo rescisao, demissao, verbas rescisorias' },
  { nome: 'Salario Liquido', slug: 'salario-liquido', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Descubra seu salario liquido. Calculo automatico de INSS, IRRF e outros descontos.', keywords: 'salario liquido, calculo salario, desconto inss, desconto irrf' },
  { nome: 'Seguro Desemprego', slug: 'seguro-desemprego', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor e numero de parcelas do seguro desemprego.', keywords: 'seguro desemprego, parcelas seguro desemprego, valor seguro desemprego' },
  { nome: 'Juros Simples', slug: 'juros-simples', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule juros simples sobre qualquer valor. Informe capital, taxa e periodo.', keywords: 'juros simples, calculo juros simples, matematica financeira' },
  { nome: 'Juros Compostos', slug: 'juros-compostos', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule juros compostos com aportes mensais. Simule investimentos e emprestimos.', keywords: 'juros compostos, calculo juros compostos, investimento, rendimento' },
  { nome: 'Financiamento Imobiliario', slug: 'financiamento', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Simule financiamento imobiliario nas tabelas Price e SAC. Compare parcelas e juros totais.', keywords: 'financiamento imobiliario, tabela price, tabela sac, simulador financiamento' },
  { nome: 'Aposentadoria', slug: 'aposentadoria', categoria: 'Previdencia', categoriaSlug: 'previdencia', descricao: 'Simule sua aposentadoria pelo INSS. Calcule tempo restante e valor estimado do beneficio.', keywords: 'aposentadoria, calculo aposentadoria, inss, previdencia social' },
  { nome: 'Gerador de CPF', slug: 'gerador-cpf', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere numeros de CPF validos para testes e desenvolvimento de software.', keywords: 'gerador cpf, cpf valido, gerar cpf, cpf teste' },
  { nome: 'Gerador de CNPJ', slug: 'gerador-cnpj', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere numeros de CNPJ validos para testes e desenvolvimento de software.', keywords: 'gerador cnpj, cnpj valido, gerar cnpj, cnpj teste' },
]

export function getCalculadorasByCategoria(categoriaSlug: string): CalculadoraInfo[] {
  return CALCULADORAS.filter(c => c.categoriaSlug === categoriaSlug)
}

export function getCalculadora(slug: string): CalculadoraInfo | undefined {
  return CALCULADORAS.find(c => c.slug === slug)
}
