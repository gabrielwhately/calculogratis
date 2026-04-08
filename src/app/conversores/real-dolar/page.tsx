import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { RealDolarForm } from '@/components/calculadoras/real-dolar-form'

export const metadata: Metadata = createCalculadoraMetadata('real-dolar')

export default function RealDolarPage() {
  return (
    <CalculatorPage
      slug="real-dolar"
      categoriaSlug="conversores"
      categoriaNome="Conversores"
      nome="Real para Dolar"
      descricao="Converta Real para Dolar e Dolar para Real com cotacao atualizada. Conversor de moedas rapido e gratuito."
      faqs={[
        { question: 'Como converter Real para Dolar?', answer: 'Para converter Real para Dolar, divida o valor em reais pela cotacao do dolar. Por exemplo, se voce tem R$ 1.000 e o dolar esta a R$ 5,85, voce tera US$ 170,94. A formula e: Dolares = Reais / Cotacao.' },
        { question: 'Qual cotacao do dolar devo usar?', answer: 'Existem diferentes cotacoes: dolar comercial (usado em transacoes entre empresas e bancos), dolar turismo (usado na compra de moeda em casas de cambio, geralmente mais caro) e dolar PTAX (media oficial do Banco Central). Para compras no exterior, use a cotacao de turismo.' },
        { question: 'Por que a cotacao do dolar varia tanto?', answer: 'A cotacao do dolar e influenciada por diversos fatores: politica monetaria do Brasil e dos EUA, balanca comercial, inflacao, risco politico, fluxo de investimentos estrangeiros e cenario economico global. O dolar tende a subir em momentos de incerteza.' },
      ]}
      conteudo={
        <>
          <h2>Como funciona o conversor de Real para Dolar</h2>
          <p>Nosso <strong>conversor de Real para Dolar</strong> permite calcular de forma rapida e gratuita quanto seus reais valem em dolares americanos (USD) e vice-versa. Basta informar o valor desejado e a cotacao vigente do dolar para obter o resultado instantaneamente. A formula e simples: <em>Dolares = Reais / Cotacao do dolar</em>.</p>
          <p>Se voce precisa converter outras moedas ou ativos digitais, experimente tambem nosso <a href="/conversores/real-bitcoin">conversor de Real para Bitcoin</a>, que segue a mesma logica aplicada a criptomoedas.</p>

          <h3>Tipos de cotacao do dolar</h3>
          <p>Antes de converter, e importante saber qual cotacao utilizar. Existem tres tipos principais:</p>
          <ul>
            <li><strong>Dolar comercial:</strong> usado em transacoes entre empresas, bancos e operacoes de comercio exterior. E a cotacao mais baixa e serve como referencia para importacoes e exportacoes.</li>
            <li><strong>Dolar turismo:</strong> aplicado na compra de moeda em especie em casas de cambio e em operacoes com cartao de credito internacional. Costuma ser de 3% a 6% mais caro que o comercial.</li>
            <li><strong>Dolar PTAX:</strong> media oficial calculada pelo Banco Central do Brasil, utilizada como referencia para contratos financeiros, ajustes de derivativos e declaracao de imposto de renda.</li>
          </ul>

          <h2>Dicas praticas para comprar dolar com economia</h2>
          <p>Se voce esta planejando uma viagem ao exterior ou precisa enviar dinheiro para fora, siga estas recomendacoes:</p>
          <ol>
            <li><strong>Compre aos poucos:</strong> a estrategia de <em>media de preco</em> (dollar-cost averaging) reduz o risco de comprar tudo em um momento de alta. Divida suas compras ao longo de semanas ou meses.</li>
            <li><strong>Compare cotacoes:</strong> casas de cambio, bancos e plataformas digitais praticam spreads diferentes. Pesquisar antes de comprar pode economizar centenas de reais.</li>
            <li><strong>Evite aeroportos:</strong> as cotacoes em aeroportos costumam ser as mais desfavoraveis. Planeje sua compra com antecedencia.</li>
            <li><strong>Considere contas globais:</strong> algumas fintechs oferecem contas em dolar com cotacao comercial e taxas reduzidas, ideais para quem viaja ou faz compras internacionais com frequencia.</li>
          </ol>

          <h2>IOF e custos nas operacoes de cambio</h2>
          <p>Toda operacao de cambio no Brasil esta sujeita ao <strong>IOF</strong> (Imposto sobre Operacoes Financeiras), e a aliquota varia conforme o tipo de transacao:</p>
          <ul>
            <li><strong>Compra de moeda em especie:</strong> aliquota de 1,1%</li>
            <li><strong>Cartao de credito internacional:</strong> aliquota de 3,38%</li>
            <li><strong>Transferencias internacionais:</strong> aliquota de 0,38% para valores de mesma titularidade</li>
            <li><strong>Cartoes pre-pagos de viagem:</strong> aliquota de 6,38%</li>
          </ul>
          <p>Alem do IOF, considere o <em>spread cambial</em> cobrado pela instituicao financeira. Esse custo oculto pode representar de 1% a 5% sobre o valor convertido. Para entender melhor como taxas e juros afetam suas financas, consulte nosso <a href="/financeiro/conversor-taxas">conversor de taxas de juros</a> ou a <a href="/matematica/porcentagem">calculadora de porcentagem</a>.</p>

          <h2>Quando o dolar sobe ou desce: fatores que influenciam o cambio</h2>
          <p>A cotacao do dolar e influenciada por uma serie de fatores macroeconomicos. Entender esses mecanismos ajuda voce a tomar decisoes mais informadas:</p>
          <ul>
            <li><strong>Taxa de juros:</strong> quando o Banco Central brasileiro eleva a Selic, o real tende a se valorizar frente ao dolar, pois atrai capital estrangeiro em busca de rendimentos maiores.</li>
            <li><strong>Balanca comercial:</strong> superavits comerciais (exportacoes maiores que importacoes) aumentam a entrada de dolares no pais, valorizando o real.</li>
            <li><strong>Risco politico e fiscal:</strong> incertezas politicas ou deterioracao das contas publicas afugentam investidores, pressionando o dolar para cima.</li>
            <li><strong>Cenario internacional:</strong> crises globais, decisoes do Federal Reserve (Fed) e conflitos geopoliticos afetam o fluxo de capitais para mercados emergentes como o Brasil.</li>
          </ul>
          <p>Para quem deseja acompanhar como o cambio impacta seus investimentos, recomendamos o <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> e o <a href="/financeiro/simulador-importacao">simulador de importacao</a>, que calculam custos totais de produtos comprados no exterior.</p>
        </>
      }
    >
      <RealDolarForm />
    </CalculatorPage>
  )
}
