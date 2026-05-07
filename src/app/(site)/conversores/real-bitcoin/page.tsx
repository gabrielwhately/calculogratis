import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { RealBitcoinForm } from '@/components/calculadoras/real-bitcoin-form'

export const metadata: Metadata = createCalculadoraMetadata('real-bitcoin')

export default function RealBitcoinPage() {
  return (
    <CalculatorPage
      slug="real-bitcoin"
      categoriaSlug="conversores"
      categoriaNome="Conversores"
      nome="Real para Bitcoin"
      descricao="Converta Real para Bitcoin e Bitcoin para Real. Simule quanto custa um Bitcoin em Reais."
      faqs={[
        { question: 'Como converter Real para Bitcoin?', answer: 'Para converter Real para Bitcoin, divida o valor em reais pela cotacao atual do Bitcoin. Por exemplo, se voce tem R$ 5.000 e o Bitcoin esta cotado a R$ 500.000, voce podera comprar 0,01 BTC. A formula e: BTC = Reais / Cotacao BTC.' },
        { question: 'Preciso comprar um Bitcoin inteiro?', answer: 'Nao. O Bitcoin e divisivel em ate 8 casas decimais. A menor unidade e chamada de satoshi (0,00000001 BTC). Voce pode comprar fracoes de Bitcoin com qualquer valor, como R$ 50 ou R$ 100.' },
        { question: 'Onde consultar a cotacao do Bitcoin?', answer: 'A cotacao do Bitcoin varia entre as exchanges (corretoras). No Brasil, as principais sao Mercado Bitcoin, Binance e Foxbit. O preco pode variar alguns percentuais entre elas. Use a cotacao da exchange onde pretende operar.' },
      ]}
      conteudo={
        <>
          <h2>Como converter Real para Bitcoin de forma precisa</h2>
          <p>O <strong>conversor de Real para Bitcoin</strong> permite calcular quanto seus reais valem em BTC e vice-versa. A formula e direta: <em>BTC = Reais / Cotacao do Bitcoin</em>. Por exemplo, se voce tem R$ 5.000 e o Bitcoin esta cotado a R$ 500.000, voce pode adquirir 0,01 BTC.</p>
          <p>Diferente de moedas tradicionais, o Bitcoin e <strong>divisivel em ate 8 casas decimais</strong>. A menor unidade, chamada de <em>satoshi</em>, equivale a 0,00000001 BTC. Isso significa que voce nao precisa comprar um Bitcoin inteiro -- valores a partir de R$ 10 ja permitem adquirir fracoes do ativo. Para converter moedas fiduciarias, use tambem nosso <a href="/conversores/real-dolar">conversor de Real para Dolar</a>.</p>

          <h3>O que e Bitcoin e por que ele importa</h3>
          <p>Bitcoin (BTC) e a primeira <strong>criptomoeda descentralizada</strong> do mundo, criada em 2009 por Satoshi Nakamoto. Algumas caracteristicas fundamentais:</p>
          <ul>
            <li><strong>Oferta limitada:</strong> apenas 21 milhoes de unidades serao mineradas, o que cria escassez digital e potencial de valorizacao a longo prazo.</li>
            <li><strong>Descentralizacao:</strong> nao e controlado por nenhum governo ou banco central. As transacoes sao validadas por uma rede distribuida de computadores (mineradores).</li>
            <li><strong>Transparencia:</strong> todas as transacoes sao registradas no blockchain, um livro-razao publico e imutavel.</li>
            <li><strong>Volatilidade:</strong> o preco do BTC pode variar 10% ou mais em um unico dia, o que representa tanto oportunidade quanto risco para investidores.</li>
          </ul>

          <h2>Onde comprar Bitcoin no Brasil</h2>
          <p>No Brasil, existem diversas <strong>exchanges</strong> (corretoras de criptomoedas) regulamentadas onde voce pode comprar Bitcoin com seguranca. As principais incluem Mercado Bitcoin, Binance, Foxbit e Coinbase. Cada plataforma pratica cotacoes e taxas ligeiramente diferentes, entao vale comparar antes de operar.</p>
          <p>Ao escolher uma exchange, considere os seguintes criterios:</p>
          <ol>
            <li><strong>Taxas de negociacao:</strong> variam de 0% a 1,5% por operacao. Corretoras com maior volume geralmente oferecem taxas menores.</li>
            <li><strong>Seguranca:</strong> verifique se a plataforma oferece autenticacao de dois fatores (2FA), armazenamento em cold wallet e historico sem incidentes de seguranca.</li>
            <li><strong>Liquidez:</strong> exchanges com maior volume de negociacao garantem que voce consegue comprar e vender rapidamente, sem grandes diferencas entre preco de compra e venda.</li>
            <li><strong>Facilidade de uso:</strong> para iniciantes, plataformas com interface intuitiva e suporte em portugues fazem diferenca.</li>
          </ol>

          <h2>Impostos e declaracao de criptomoedas no Brasil</h2>
          <p>A <strong>Receita Federal</strong> exige que todas as operacoes com criptomoedas sejam declaradas no Imposto de Renda. As regras principais sao:</p>
          <ul>
            <li><strong>Ganho de capital:</strong> lucros com vendas acima de R$ 35.000 no mes estao sujeitos a aliquotas de 15% a 22,5% sobre o ganho.</li>
            <li><strong>Obrigacao de declarar:</strong> quem possui mais de R$ 5.000 em criptomoedas deve informar na ficha de &ldquo;Bens e Direitos&rdquo; da declaracao anual.</li>
            <li><strong>Relatorio mensal:</strong> exchanges brasileiras sao obrigadas a reportar movimentacoes ao fisco. Para operacoes em exchanges estrangeiras acima de R$ 30.000 no mes, o proprio contribuinte deve informar via sistema e-Financeira.</li>
          </ul>
          <p>Para calcular corretamente os impostos sobre seus ganhos, pode ser util utilizar a <a href="/matematica/porcentagem">calculadora de porcentagem</a> ou o <a href="/financeiro/juros-compostos">simulador de juros compostos</a> para projetar o crescimento do seu patrimonio ao longo do tempo.</p>

          <h2>Estrategias para investir em Bitcoin</h2>
          <p>Investir em Bitcoin requer planejamento e gestao de risco. Algumas estrategias adotadas por investidores experientes:</p>
          <ul>
            <li><strong>DCA (Dollar-Cost Averaging):</strong> comprar um valor fixo de Bitcoin periodicamente (semanal ou mensalmente), independente do preco. Essa estrategia dilui o risco de comprar em momentos de alta.</li>
            <li><strong>HODL:</strong> manter o Bitcoin por longos periodos, ignorando a volatilidade de curto prazo. Historicamente, investidores que seguraram BTC por mais de 4 anos tiveram retornos positivos.</li>
            <li><strong>Diversificacao:</strong> nao concentrar todo o patrimonio em um unico ativo. Combine Bitcoin com outros investimentos usando o <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para encontrar a alocacao ideal.</li>
          </ul>
          <p>Lembre-se: criptomoedas sao ativos de <em>alta volatilidade</em>. Invista apenas o que voce pode se dar ao luxo de perder e busque orientacao de profissionais qualificados antes de tomar decisoes financeiras significativas.</p>
        </>
      }
    >
      <RealBitcoinForm />
    </CalculatorPage>
  )
}
