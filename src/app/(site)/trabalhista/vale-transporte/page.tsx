import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ValeTransporteForm } from '@/components/calculadoras/vale-transporte-form'

export const metadata: Metadata = createCalculadoraMetadata('vale-transporte')

export default function ValeTransportePage() {
  return (
    <CalculatorPage
      slug="vale-transporte"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Vale-Transporte"
      descricao="Calcule o desconto do vale-transporte no seu salário em 2026. Entenda a regra dos 6% e saiba quanto a empresa deve pagar pelo seu deslocamento."
      conteudo={
        <>
          <h2>Como funciona o cálculo do vale-transporte em 2026</h2>
          <p>O <strong>vale-transporte (VT)</strong> é um direito de todo trabalhador regido pela CLT que precise utilizar transporte público para o deslocamento residência-trabalho e vice-versa. O cálculo é baseado no <strong>salário base</strong> e no custo real do transporte utilizado.</p>
          <p>A regra fundamental é que o custo do transporte é dividido entre o empregado e o empregador, protegendo o salário do trabalhador de gastos excessivos com locomoção.</p>

          <h3>A regra do desconto de 6%</h3>
          <p>Por lei, a empresa pode descontar no máximo <strong>6% do salário base</strong> do funcionário para custear o vale-transporte. É importante destacar que o desconto incide sobre o salário nominal, sem considerar horas extras, adicionais ou gratificações.</p>
          <ul>
            <li>Se o custo total do transporte for <strong>maior</strong> que 6% do salário, o funcionário paga os 6% e a empresa paga todo o restante.</li>
            <li>Se o custo total do transporte for <strong>menor</strong> que 6% do salário, o funcionário paga apenas o valor real do custo, e a empresa não desconta nada a mais.</li>
          </ul>

          <h3>Exemplo prático de desconto</h3>
          <p>Imagine um trabalhador que ganha <strong>R$ 2.000,00</strong> e gasta R$ 300,00 por mês com ônibus:</p>
          <ol>
            <li>Calcula-se o teto do desconto: 6% de R$ 2.000 = <strong>R$ 120,00</strong>.</li>
            <li>Como o custo real (R$ 300) é maior que o teto, o funcionário pagará apenas R$ 120,00.</li>
            <li>A empresa arcará com a diferença: R$ 300 - R$ 120 = <strong>R$ 180,00</strong>.</li>
          </ol>
          <p>Agora, se o mesmo trabalhador gastasse apenas R$ 100,00 de transporte, o desconto seria de apenas R$ 100,00 (o valor real), pois este é menor que os R$ 120,00 permitidos por lei.</p>

          <h3>Dúvidas comuns sobre o Vale-Transporte</h3>
          <p><strong>Posso receber o VT em dinheiro?</strong> A lei proíbe o pagamento do vale-transporte em dinheiro, exceto em situações específicas previstas em convenção coletiva ou para empregados domésticos. Se pago em dinheiro fora dessas regras, o valor passa a ter natureza salarial, incidindo <a href="/trabalhista/irrf">Imposto de Renda</a> e INSS.</p>
          <p><strong>Trabalho em regime de home office, tenho direito?</strong> Não. O vale-transporte é destinado ao deslocamento físico. Em dias de trabalho remoto, o benefício não é devido.</p>
          <p><strong>A empresa pode descontar sobre o salário líquido?</strong> Não. O desconto de 6% deve ser sempre sobre o <strong>salário bruto</strong> (base), antes dos descontos de INSS ou <a href="/trabalhista/salario-liquido">salário líquido</a>.</p>

          <h3>Vale a pena optar pelo vale-transporte?</h3>
          <p>Geralmente sim, se o seu gasto mensal for superior a 6% do seu salário. Para quem ganha salários mais altos, o custo do transporte raramente atinge os 6%, tornando o benefício opcional do ponto de vista financeiro. Use nossa calculadora para comparar os valores e decidir o que é melhor para o seu bolso.</p>
        </>
      }
    >
      <ValeTransporteForm />
    </CalculatorPage>
  )
}
