import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CalculadoraDescontoForm } from '@/components/calculadoras/calculadora-desconto-form'

export const metadata: Metadata = createCalculadoraMetadata('calculadora-desconto')

export default function CalculadoraDescontoPage() {
  return (
    <CalculatorPage
      slug="calculadora-desconto"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Calculadora de Desconto"
      descricao="Aquele &ldquo;50% off&rdquo; parece tentador, mas quanto você realmente economiza? Calcule o preço final, o valor do desconto e compare ofertas antes de comprar."
      conteudo={
        <>
          <h2>Como calcular desconto percentual de forma correta</h2>
          <p>O <strong>cálculo de desconto</strong> é uma das operações matemáticas mais usadas no cotidiano — em compras, negociações comerciais, promoções sazonais e até no planejamento orçamentário. A fórmula básica é:</p>
          <p><strong>Valor Final = Valor Original x (1 - Desconto / 100)</strong></p>
          <p>Por exemplo, um produto de R$ 250 com 15% de desconto fica: R$ 250 x 0,85 = <strong>R$ 212,50</strong>. O valor economizado é R$ 37,50. Se você quer descobrir qual o percentual de desconto entre dois preços, use a fórmula inversa: <strong>Desconto (%) = ((Preço Original - Preço Final) / Preço Original) x 100</strong>. Nossa <a href="/matematica/porcentagem">calculadora de porcentagem</a> também pode ajudar com esse tipo de cálculo.</p>

          <h2>Desconto simples vs. desconto em cascata (composto)</h2>
          <p>É importante entender a diferença entre os dois tipos de desconto:</p>
          <ul>
            <li><strong>Desconto simples:</strong> um único percentual aplicado diretamente sobre o valor original. Exemplo: 20% sobre R$ 500 = R$ 400.</li>
            <li><strong>Desconto em cascata (composto):</strong> dois ou mais descontos aplicados sequencialmente, onde cada desconto incide sobre o valor já reduzido. Exemplo: 10% + 10% sobre R$ 500 resulta em R$ 500 x 0,90 x 0,90 = <strong>R$ 405</strong> — e não R$ 400 como seria com 20% direto.</li>
          </ul>
          <p>Essa lógica é semelhante a dos <a href="/financeiro/juros-compostos">juros compostos</a>: cada etapa incide sobre o resultado anterior, não sobre o valor original. Sempre que uma loja anunciar &ldquo;desconto sobre desconto&rdquo;, faça o cálculo cascateado para saber o percentual real.</p>

          <h2>Desconto à vista vs. parcelado: quando vale a pena?</h2>
          <p>No comércio brasileiro, é muito comum encontrar <strong>desconto para pagamento à vista</strong>. Para decidir se vale a pena, faça a seguinte análise:</p>
          <ol>
            <li>Calcule o valor do desconto em reais</li>
            <li>Calcule quanto esse dinheiro renderia investido durante o período do parcelamento (use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a>)</li>
            <li>Se o desconto for <em>maior</em> que o rendimento projetado, pagar à vista é mais vantajoso</li>
          </ol>
          <p>Na prática, descontos à vista acima de 5% costumam compensar, já que é difícil encontrar investimentos de curto prazo que superem esse percentual em poucos meses. Porém, se o parcelamento for sem juros e o desconto for pequeno (2-3%), manter o dinheiro aplicado pode ser a melhor escolha.</p>

          <h2>Black Friday e promoções: como não cair em armadilhas</h2>
          <p>Durante eventos promocionais como a <strong>Black Friday</strong>, é essencial verificar a veracidade dos descontos. A legislação brasileira (Código de Defesa do Consumidor) exige que o preço &ldquo;de&rdquo; seja o efetivamente praticado nos <em>30 dias anteriores</em> à promoção. Algumas dicas práticas:</p>
          <ul>
            <li><strong>Registre preços antes:</strong> acompanhe o preço do produto nas semanas anteriores ao evento</li>
            <li><strong>Calcule o desconto real:</strong> use esta calculadora para confirmar se o percentual anunciado corresponde à diferença real entre os preços</li>
            <li><strong>Compare com concorrentes:</strong> um &ldquo;50% off&rdquo; sobre um preço inflado pode ser mais caro do que o preço normal em outra loja</li>
            <li><strong>Considere o frete:</strong> inclua o custo de entrega no cálculo final. Para compras internacionais, nosso <a href="/financeiro/simulador-importacao">simulador de importação</a> ajuda a calcular os impostos adicionais</li>
          </ul>

          <h2>Desconto progressivo e negociações comerciais</h2>
          <p>No mundo dos negócios, <strong>tabelas de desconto progressivo</strong> são amplamente utilizadas. O percentual de redução aumenta conforme a quantidade comprada ou o valor total do pedido. Nesses casos, calcule sempre o desconto sobre o valor total e verifique se o preço unitário realmente compensa a compra em maior volume.</p>
          <p>Para quem trabalha com vendas e precisa calcular margens, combine a calculadora de desconto com o cálculo de <a href="/financeiro/juros-simples">juros simples</a> para projetar o custo de oferecer prazo de pagamento aos clientes.</p>
        </>
      }
    >
      <CalculadoraDescontoForm />
    </CalculatorPage>
  )
}
