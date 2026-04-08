import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SimuladorConsorcioForm } from '@/components/calculadoras/simulador-consorcio-form'

export const metadata: Metadata = createCalculadoraMetadata('simulador-consorcio')

export default function SimuladorConsorcioPage() {
  return (
    <CalculatorPage
      slug="simulador-consorcio"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Consorcio"
      descricao="Simule as parcelas, taxas e custo total de um consorcio. Compare com financiamento para decidir a melhor opcao para adquirir seu bem."
      conteudo={
        <>
          <h2>Como funciona o consorcio</h2>
          <p>O <strong>consorcio</strong> e uma modalidade de compra planejada em que um grupo de pessoas contribui mensalmente para um fundo comum. Periodicamente, um ou mais participantes sao contemplados (por sorteio ou lance) e recebem a <strong>carta de credito</strong> para adquirir o bem desejado.</p>
          <p>Diferente do financiamento, o consorcio <strong>nao cobra juros</strong>. Porem, ha a <strong>taxa de administracao</strong> (geralmente entre 10% e 20% do valor do bem, diluida nas parcelas) e o <strong>fundo de reserva</strong> (cerca de 1% a 3%).</p>

          <h2>Consorcio vs. Financiamento</h2>
          <p>A principal vantagem do consorcio e o custo total menor, ja que nao ha juros compostos. Porem, voce nao tem a garantia de quando sera contemplado — pode ser no primeiro ou no ultimo mes do grupo.</p>
          <ul>
            <li><strong>Consorcio:</strong> sem juros, parcelas menores, sem garantia de prazo de contemplacao</li>
            <li><strong>Financiamento:</strong> recebe o bem imediatamente, porem paga juros que podem dobrar o valor total</li>
          </ul>
          <p>Use nosso <a href="/financeiro/financiamento">simulador de financiamento</a> para comparar os custos e decidir qual modalidade faz mais sentido para voce. Para investir enquanto espera a contemplacao, veja o <a href="/financeiro/rendimento-cdb">simulador de rendimento CDB</a>.</p>

          <h2>Dicas para escolher um consorcio</h2>
          <ul>
            <li>Compare a <strong>taxa de administracao</strong> entre diferentes administradoras — e o principal custo</li>
            <li>Verifique se a administradora e autorizada pelo <strong>Banco Central</strong></li>
            <li>Considere dar <strong>lance</strong> para ser contemplado mais rapido</li>
            <li>Leia o contrato com atencao: prazo, multas e regras de desistencia</li>
          </ul>
        </>
      }
    >
      <SimuladorConsorcioForm />
    </CalculatorPage>
  )
}
