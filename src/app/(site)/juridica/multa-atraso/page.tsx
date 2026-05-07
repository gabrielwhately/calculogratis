import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { MultaAtrasoForm } from '@/components/calculadoras/multa-atraso-form'

export const metadata: Metadata = createCategoriaMetadata(
  'juridica/multa-atraso',
  'Multa por Atraso',
  'Descubra o total de um boleto ou dívida em atraso: multa moratória de 2% mais juros diários, calculados conforme o CDC e o Código Civil.'
)

export default function MultaAtrasoPage() {
  return (
    <CalculatorPage
      slug="multa-atraso"
      categoriaSlug="juridica"
      categoriaNome="Jurídico"
      nome="Multa por Atraso"
      descricao="Informe o valor original, a taxa de multa e os dias de atraso para calcular o total devido. Funciona para boletos, aluguéis, contratos e cobranças judiciais — com as taxas do CDC e do Código Civil."
      faqs={[
        {
          question: 'Qual é o limite da multa por atraso no CDC?',
          answer: 'O art. 52, §1º do CDC limita a multa moratória a 2% nas relações de consumo — entre empresa e pessoa física. É por isso que praticamente todo boleto brasileiro cobra exatamente 2%. Para contratos entre empresas (B2B), as partes podem pactuar valores diferentes, mas o Judiciário tende a reduzir multas acima de 10% com base no art. 413 do Código Civil.',
        },
        {
          question: 'Qual é a taxa de juros de mora legal no Brasil?',
          answer: 'Na ausência de cláusula contratual, o art. 406 do Código Civil remete à taxa SELIC. Na prática, contratos e boletos bancários geralmente fixam 1% ao mês — equivalente a 0,033% ao dia. Essa é a taxa padrão usada no cálculo desta calculadora, mas você pode ajustá-la para refletir o seu contrato específico.',
        },
        {
          question: 'Multa e juros de mora são cobrados juntos?',
          answer: 'Sim, são encargos distintos e cumulativos. A multa é uma penalidade fixa aplicada uma única vez pela inadimplência — geralmente 2%. Os juros compensam o credor pelo tempo sem o dinheiro e crescem a cada dia de atraso. Alguns contratos ainda preveem correção monetária em cima, tornando o débito ainda maior quanto mais tempo passar.',
        },
      ]}
      conteudo={
        <>
          <h2>O que é multa por atraso e como ela funciona</h2>
          <p>A <strong>multa por atraso</strong>, tecnicamente chamada de <em>multa moratória</em>, é uma penalidade contratual aplicada ao devedor que não cumpre a obrigação financeira no prazo estipulado. Ela existe para desincentivar a inadimplência e compensar o credor pelos transtornos causados pelo atraso. No Brasil, a multa moratória é regulada principalmente pelo <strong>Código Civil (arts. 408 a 416)</strong> e pelo <strong>Código de Defesa do Consumidor (art. 52, par. 1)</strong>.</p>
          <p>Além da multa fixa, o credor tem direito a cobrar <strong>juros de mora</strong>, que incidem diariamente sobre o valor principal desde o primeiro dia de atraso. A combinação de multa + juros é o que torna o débito em atraso progressivamente mais caro ao longo do tempo. Para dívidas mais antigas que também precisam de atualização pela inflação, utilize a <a href="/juridica/correcao-monetaria">Calculadora de Correção Monetária</a>.</p>

          <h2>Multa moratória: limite de 2% pelo CDC</h2>
          <p>Nas relações de consumo (contratos entre empresa e consumidor pessoa física), o CDC limita a multa moratória a <strong>2% do valor da dívida</strong>. Este é o padrão adotado por praticamente todos os boletos bancários emitidos no Brasil. Cobrar multa superior a esse limite em relações de consumo configura prática abusiva, passível de nulidade judicial.</p>
          <p>Para contratos <strong>entre pessoas jurídicas</strong> ou entre pessoas físicas fora de relação de consumo, o Código Civil permite multas mais elevadas, desde que não sejam consideradas leoninas. O Judiciário pode reduzi-las com base no art. 413 do Código Civil, especialmente quando a obrigação já foi parcialmente cumprida.</p>

          <h3>Diferença entre multa e juros de mora</h3>
          <p>Muitas pessoas confundem esses dois encargos, mas eles possuem naturezas distintas:</p>
          <ul>
            <li><strong>Multa moratória:</strong> incide <em>uma única vez</em>, como penalidade pelo descumprimento do prazo. Geralmente é de 2% nas relações de consumo.</li>
            <li><strong>Juros de mora:</strong> incidem <em>diariamente</em> sobre o valor principal, compensando o credor pelo tempo sem o dinheiro. A taxa mais comum em contratos e boletos é de 1% ao mês (cerca de 0,033% ao dia).</li>
          </ul>
          <p>Para entender melhor como taxas de juros se comportam ao longo do tempo, a <a href="/financeiro/juros-simples">Calculadora de Juros Simples</a> mostra a evolução linear, enquanto a <a href="/financeiro/juros-compostos">Calculadora de Juros Compostos</a> demonstra o efeito acumulado quando há capitalização.</p>

          <h2>Como calcular o valor total de um boleto em atraso</h2>
          <p>O cálculo segue uma fórmula direta que combina os dois encargos. Veja o passo a passo:</p>
          <ol>
            <li>Identifique o <strong>valor original</strong> do boleto ou da dívida.</li>
            <li>Aplique a <strong>multa moratória</strong>: Valor x Taxa de multa (ex.: R$ 500,00 x 2% = R$ 10,00).</li>
            <li>Calcule os <strong>juros de mora</strong>: Valor x Taxa diária x Dias em atraso (ex.: R$ 500,00 x 0,033% x 30 dias = R$ 4,95).</li>
            <li>Some tudo: <strong>Valor original + Multa + Juros = Total devido</strong> (R$ 500,00 + R$ 10,00 + R$ 4,95 = R$ 514,95).</li>
          </ol>
          <p>Nossa calculadora aplica exatamente esta fórmula, permitindo que você ajuste tanto a taxa da multa quanto a taxa diária de juros para refletir as condições do seu contrato ou boleto. Para saber quantos dias se passaram desde o vencimento, use a <a href="/utilidades/dias-entre-datas">Calculadora de Dias entre Datas</a>.</p>

          <h2>Situações práticas em que a multa por atraso se aplica</h2>
          <p>A multa moratória e os juros de mora estão presentes em diversas situações do cotidiano financeiro e jurídico:</p>
          <ul>
            <li><strong>Boletos bancários:</strong> a grande maioria aplica 2% de multa + 1% ao mês de juros, conforme o CDC.</li>
            <li><strong>Aluguéis em atraso:</strong> o contrato de locação define os encargos, mas o limite do CDC se aplica quando o locatário é pessoa física. Para calcular o aluguel reajustado, veja o <a href="/financeiro/reajuste-aluguel">Reajuste de Aluguel</a>.</li>
            <li><strong>Parcelas de financiamento:</strong> cada instituição financeira define as taxas no contrato. Use a <a href="/financeiro/financiamento">Calculadora de Financiamento</a> para simular diferentes cenários.</li>
            <li><strong>Cobranças judiciais:</strong> além da multa e juros, pode haver <a href="/juridica/correcao-monetaria">correção monetária</a> e honorários advocatícios, aumentando significativamente o valor final.</li>
          </ul>

          <h3>Dica importante para o consumidor</h3>
          <p>Se você identificar que uma empresa cobrou multa superior a 2% em uma relação de consumo, é possível contestar o valor. Guarde o boleto original, registre a reclamação nos canais competentes e, se necessário, busque orientação jurídica. Conhecer seus direitos e saber calcular os encargos corretamente é o primeiro passo para evitar cobranças abusivas.</p>
        </>
      }
    >
      <MultaAtrasoForm />
    </CalculatorPage>
  )
}
