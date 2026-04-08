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
          <p>O <strong>calculo de desconto</strong> e uma das operacoes matematicas mais usadas no cotidiano — em compras, negociacoes comerciais, promocoes sazonais e ate no planejamento orcamentario. A formula basica e:</p>
          <p><strong>Valor Final = Valor Original x (1 - Desconto / 100)</strong></p>
          <p>Por exemplo, um produto de R$ 250 com 15% de desconto fica: R$ 250 x 0,85 = <strong>R$ 212,50</strong>. O valor economizado e R$ 37,50. Se voce quer descobrir qual o percentual de desconto entre dois precos, use a formula inversa: <strong>Desconto (%) = ((Preco Original - Preco Final) / Preco Original) x 100</strong>. Nossa <a href="/matematica/porcentagem">calculadora de porcentagem</a> tambem pode ajudar com esse tipo de calculo.</p>

          <h2>Desconto simples vs. desconto em cascata (composto)</h2>
          <p>E importante entender a diferenca entre os dois tipos de desconto:</p>
          <ul>
            <li><strong>Desconto simples:</strong> um unico percentual aplicado diretamente sobre o valor original. Exemplo: 20% sobre R$ 500 = R$ 400.</li>
            <li><strong>Desconto em cascata (composto):</strong> dois ou mais descontos aplicados sequencialmente, onde cada desconto incide sobre o valor ja reduzido. Exemplo: 10% + 10% sobre R$ 500 resulta em R$ 500 x 0,90 x 0,90 = <strong>R$ 405</strong> — e nao R$ 400 como seria com 20% direto.</li>
          </ul>
          <p>Essa logica e semelhante a dos <a href="/financeiro/juros-compostos">juros compostos</a>: cada etapa incide sobre o resultado anterior, nao sobre o valor original. Sempre que uma loja anunciar &ldquo;desconto sobre desconto&rdquo;, faca o calculo cascateado para saber o percentual real.</p>

          <h2>Desconto a vista vs. parcelado: quando vale a pena?</h2>
          <p>No comercio brasileiro, e muito comum encontrar <strong>desconto para pagamento a vista</strong>. Para decidir se vale a pena, faca a seguinte analise:</p>
          <ol>
            <li>Calcule o valor do desconto em reais</li>
            <li>Calcule quanto esse dinheiro renderia investido durante o periodo do parcelamento (use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a>)</li>
            <li>Se o desconto for <em>maior</em> que o rendimento projetado, pagar a vista e mais vantajoso</li>
          </ol>
          <p>Na pratica, descontos a vista acima de 5% costumam compensar, ja que e dificil encontrar investimentos de curto prazo que superem esse percentual em poucos meses. Porem, se o parcelamento for sem juros e o desconto for pequeno (2-3%), manter o dinheiro aplicado pode ser a melhor escolha.</p>

          <h2>Black Friday e promocoes: como nao cair em armadilhas</h2>
          <p>Durante eventos promocionais como a <strong>Black Friday</strong>, e essencial verificar a veracidade dos descontos. A legislacao brasileira (Codigo de Defesa do Consumidor) exige que o preco &ldquo;de&rdquo; seja o efetivamente praticado nos <em>30 dias anteriores</em> a promocao. Algumas dicas praticas:</p>
          <ul>
            <li><strong>Registre precos antes:</strong> acompanhe o preco do produto nas semanas anteriores ao evento</li>
            <li><strong>Calcule o desconto real:</strong> use esta calculadora para confirmar se o percentual anunciado corresponde a diferenca real entre os precos</li>
            <li><strong>Compare com concorrentes:</strong> um &ldquo;50% off&rdquo; sobre um preco inflado pode ser mais caro do que o preco normal em outra loja</li>
            <li><strong>Considere o frete:</strong> inclua o custo de entrega no calculo final. Para compras internacionais, nosso <a href="/financeiro/simulador-importacao">simulador de importacao</a> ajuda a calcular os impostos adicionais</li>
          </ul>

          <h2>Desconto progressivo e negociacoes comerciais</h2>
          <p>No mundo dos negocios, <strong>tabelas de desconto progressivo</strong> sao amplamente utilizadas. O percentual de reducao aumenta conforme a quantidade comprada ou o valor total do pedido. Nesses casos, calcule sempre o desconto sobre o valor total e verifique se o preco unitario realmente compensa a compra em maior volume.</p>
          <p>Para quem trabalha com vendas e precisa calcular margens, combine a calculadora de desconto com o calculo de <a href="/financeiro/juros-simples">juros simples</a> para projetar o custo de oferecer prazo de pagamento aos clientes.</p>
        </>
      }
    >
      <CalculadoraDescontoForm />
    </CalculatorPage>
  )
}
