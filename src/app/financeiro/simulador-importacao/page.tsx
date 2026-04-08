import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SimuladorImportacaoForm } from '@/components/calculadoras/simulador-importacao-form'

export const metadata: Metadata = createCalculadoraMetadata('simulador-importacao')

export default function SimuladorImportacaoPage() {
  return (
    <CalculatorPage
      slug="simulador-importacao"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Simulador de Importação"
      descricao="Vai comprar na Shein, AliExpress ou em qualquer loja fora do Brasil? Veja quanto você vai pagar de imposto — Remessa Conforme ou importação comum — pelas regras de 2026."
      conteudo={
        <>
          <h2>Como funcionam os impostos de importacao no Brasil em 2026</h2>
          <p>O sistema de tributacao de importacoes no Brasil envolve multiplos impostos que podem elevar significativamente o preco final de qualquer compra internacional. As principais taxas incidentes sao o <strong>Imposto de Importacao (II)</strong> e o <strong>ICMS (Imposto sobre Circulacao de Mercadorias e Servicos)</strong>, alem de possiveis taxas de despacho aduaneiro cobradas pelos Correios ou transportadoras.</p>
          <p>Desde 2023, com a criacao do <strong>Programa Remessa Conforme</strong>, o cenario mudou consideravelmente. A forma de calculo depende de a loja internacional ser ou nao credenciada no programa. Nosso simulador faz o calculo nos dois cenarios para voce comparar.</p>

          <h2>Programa Remessa Conforme: regras para Shein, AliExpress e Shopee</h2>
          <p>O Programa Remessa Conforme credencia plataformas internacionais que se comprometem a coletar e repassar os impostos brasileiros diretamente no checkout. Em 2026, as principais lojas participantes incluem <strong>Shein, AliExpress, Shopee, Amazon internacional e Etsy</strong>. As regras sao:</p>
          <ul>
            <li><strong>Compras ate US$ 50:</strong> isentas de Imposto de Importacao, mas pagam ICMS de 20% sobre o valor do produto + frete</li>
            <li><strong>Compras acima de US$ 50:</strong> pagam 20% de II sobre o valor excedente, mais ICMS de 17% calculado &ldquo;por dentro&rdquo;</li>
          </ul>
          <p>A grande vantagem do Remessa Conforme e a <strong>previsibilidade</strong>: voce sabe exatamente quanto vai pagar antes de finalizar a compra, sem surpresas na alfandega. Para converter o valor em dolares para reais, use nosso <a href="/conversores/real-dolar">conversor de Real para Dolar</a>.</p>

          <h3>Importacoes fora do Remessa Conforme</h3>
          <p>Compras em lojas nao cadastradas no programa — como fornecedores diretos do eBay, Alibaba ou lojas independentes — sofrem tributacao significativamente maior:</p>
          <ol>
            <li><strong>Imposto de Importacao:</strong> 60% sobre o valor total (produto + frete internacional)</li>
            <li><strong>ICMS:</strong> 17% calculado &ldquo;por dentro&rdquo; sobre a base que ja inclui o II</li>
            <li><strong>Despacho postal:</strong> taxa adicional dos Correios (quando aplicavel)</li>
          </ol>
          <p>Na pratica, o custo final pode <em>mais que dobrar</em> o preco original do produto. Sempre faca a simulacao antes de decidir comprar fora do Remessa Conforme.</p>

          <h2>Como o ICMS e calculado &ldquo;por dentro&rdquo; nas importacoes</h2>
          <p>O ICMS nas importacoes utiliza um metodo de calculo chamado <em>&ldquo;por dentro&rdquo;</em>, que eleva o imposto efetivo acima da aliquota nominal. A formula funciona assim:</p>
          <ol>
            <li><strong>Base do ICMS =</strong> (Valor do Produto + Frete + Imposto de Importacao) / (1 - 0,17)</li>
            <li><strong>ICMS =</strong> Base x 0,17</li>
          </ol>
          <p>Isso significa que os 17% nominais geram um imposto efetivo de aproximadamente <strong>20,5%</strong> sobre o valor antes do ICMS. Essa metodologia e peculiaridade da legislacao tributaria brasileira e torna o calculo manual bastante complexo — por isso recomendamos usar o simulador.</p>

          <h2>Dicas para economizar em compras internacionais</h2>
          <ul>
            <li><strong>Prefira lojas do Remessa Conforme:</strong> para compras ate US$ 50, voce economiza os 20% de Imposto de Importacao</li>
            <li><strong>Inclua o frete no calculo:</strong> o frete internacional entra na base de calculo dos impostos. Frete caro eleva proporcionalmente os tributos</li>
            <li><strong>Compare com o preco nacional:</strong> antes de importar, some todos os impostos e compare com o produto similar vendido no Brasil. Use a <a href="/financeiro/calculadora-desconto">calculadora de desconto</a> para avaliar promocoes locais</li>
            <li><strong>Atencao ao cambio:</strong> o dolar e convertido pela cotacao do dia do despacho aduaneiro, nao do dia da compra. Acompanhe a cotacao com nosso <a href="/conversores/real-dolar">conversor Real-Dolar</a></li>
            <li><strong>Nao divida pedidos artificialmente:</strong> a Receita Federal pode consolidar encomendas do mesmo remetente e aplicar a tributacao sobre o valor total</li>
          </ul>
        </>
      }
    >
      <SimuladorImportacaoForm />
    </CalculatorPage>
  )
}
