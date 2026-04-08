import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { InsalubridadeForm } from '@/components/calculadoras/insalubridade-form'

export const metadata: Metadata = createCalculadoraMetadata('insalubridade')

export default function InsalubridadePage() {
  return (
    <CalculatorPage
      slug="insalubridade"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Insalubridade e Periculosidade"
      descricao="Calcule o adicional de insalubridade (10%, 20% ou 40%) e periculosidade (30%) sobre seu salario conforme a CLT e NRs."
      conteudo={
        <>
          <h2>Adicional de insalubridade: como funciona</h2>
          <p>O <strong>adicional de insalubridade</strong> e devido ao trabalhador que exerce atividades em condicoes prejudiciais a saude, conforme a <strong>NR-15</strong> do Ministerio do Trabalho. Os graus sao:</p>
          <ul>
            <li><strong>Minimo (10%):</strong> exposicao a agentes nocivos em nivel toleravel</li>
            <li><strong>Medio (20%):</strong> exposicao acima do nivel toleravel</li>
            <li><strong>Maximo (40%):</strong> exposicao em grau maximo de nocividade</li>
          </ul>
          <p>A base de calculo da insalubridade e o <strong>salario minimo</strong> (R$ 1.518 em 2026), salvo convencao coletiva que defina outra base.</p>

          <h2>Adicional de periculosidade</h2>
          <p>O <strong>adicional de periculosidade</strong> e de <strong>30% sobre o salario-base</strong> (nao sobre o salario minimo). E devido a trabalhadores expostos a:</p>
          <ul>
            <li>Inflamaveis e explosivos</li>
            <li>Energia eletrica</li>
            <li>Atividades com motocicleta</li>
            <li>Seguranca pessoal e patrimonial</li>
          </ul>

          <h2>Insalubridade vs. Periculosidade: posso acumular?</h2>
          <p>O entendimento majoritario do TST e que <strong>nao e possivel acumular</strong> os dois adicionais — o trabalhador deve optar pelo mais vantajoso. Porem, ha decisoes recentes em sentido contrario. Confira com seu sindicato ou advogado trabalhista.</p>
          <p>Veja tambem: <a href="/trabalhista/salario-liquido">calculadora de salario liquido</a> e <a href="/trabalhista/custo-clt">calculadora de custo CLT</a>.</p>
        </>
      }
    >
      <InsalubridadeForm />
    </CalculatorPage>
  )
}
