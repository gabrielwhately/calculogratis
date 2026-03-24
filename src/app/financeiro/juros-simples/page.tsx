import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { JurosSimplesForm } from '@/components/calculadoras/juros-simples-form'

export const metadata: Metadata = createCalculadoraMetadata('juros-simples')

export default function JurosSimplesPage() {
  return (
    <CalculatorPage
      slug="juros-simples"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Juros Simples"
      descricao="Calcule juros simples de forma rapida e gratuita. Informe o capital, a taxa de juros e o periodo para obter o montante final."
      conteudo={
        <>
          <h2>Como calcular juros simples?</h2>
          <p>O juros simples e calculado pela formula: <strong>J = C x i x t</strong>, onde C e o capital inicial, i e a taxa de juros e t e o periodo. O montante final e M = C + J.</p>
          <p>Diferente dos juros compostos, no juros simples os juros sao calculados apenas sobre o valor inicial do capital, sem incidencia de juros sobre juros. Essa modalidade e comum em emprestimos de curto prazo e acordos comerciais.</p>
          <h2>Quando usar juros simples?</h2>
          <p>O juros simples e utilizado em operacoes financeiras de curto prazo, como emprestimos pessoais, financiamentos diretos e calculos de multas por atraso.</p>
        </>
      }
    >
      <JurosSimplesForm />
    </CalculatorPage>
  )
}
