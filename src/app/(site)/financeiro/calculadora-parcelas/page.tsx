import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FinanciamentoForm } from '@/components/calculadoras/financiamento-form'

export const metadata: Metadata = createCalculadoraMetadata('calculadora-parcelas')

export default function CalculadoraParcelasPage() {
  return (
    <CalculatorPage
      slug="calculadora-parcelas"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Calculadora de Parcelas (Price/SAC)"
      descricao="Calcule o valor das parcelas de um empréstimo ou financiamento usando as tabelas Price e SAC. Compare as amortizações."
      conteudo={
        <>
          <h2>Como calcular o valor das parcelas?</h2>
          <p>O cálculo das parcelas de um financiamento ou empréstimo depende do sistema de amortização escolhido. No Brasil, os dois sistemas mais comuns são a <strong>Tabela Price</strong> e o <strong>Sistema de Amortização Constante (SAC)</strong>.</p>
          
          <h3>Tabela Price</h3>
          <p>Na Tabela Price (também conhecida como Sistema Francês de Amortização), todas as parcelas têm o <strong>mesmo valor</strong> do início ao fim do contrato. No começo, a maior parte da parcela é composta por juros, e a menor parte pela amortização da dívida. Com o passar do tempo, essa proporção se inverte.</p>
          <p><strong>Vantagem:</strong> Previsibilidade. Você sabe exatamente quanto vai pagar em cada mês.</p>

          <h3>Sistema SAC</h3>
          <p>No SAC, o valor que você amortiza da dívida é constante em todos os meses. Como o saldo devedor diminui mensalmente, os juros (que incidem sobre o saldo) também diminuem. Por isso, as parcelas do SAC começam mais altas e terminam mais baixas.</p>
          <p><strong>Vantagem:</strong> Menor custo total de juros. Ao final do contrato, o valor total pago no SAC costuma ser menor do que na Price.</p>

          <h3>Qual sistema escolher?</h3>
          <p>A escolha depende do seu perfil financeiro:</p>
          <ul>
            <li>Se você prefere parcelas que cabem no bolso hoje e não variam, a <strong>Price</strong> pode ser melhor.</li>
            <li>Se você tem fôlego financeiro para começar pagando mais e quer economizar no total de juros, o <strong>SAC</strong> é o ideal.</li>
          </ul>
        </>
      }
    >
      <FinanciamentoForm />
    </CalculatorPage>
  )
}
