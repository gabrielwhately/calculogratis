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
          <h2>Como funcionam os juros simples?</h2>
          <p>O regime de <strong>juros simples</strong> e um dos conceitos mais fundamentais da matematica financeira. Nele, os juros sao calculados sempre sobre o <em>capital inicial</em>, independentemente do numero de periodos que ja se passaram. A formula classica e:</p>
          <p><strong>J = C x i x t</strong>, onde <em>J</em> e o valor dos juros, <em>C</em> e o capital inicial, <em>i</em> e a taxa por periodo (em decimal) e <em>t</em> e o numero de periodos. O montante final que voce recebe ou paga e calculado por <strong>M = C + J</strong>.</p>
          <p>Essa linearidade torna o calculo mais simples e previsivel. Diferentemente dos <a href="/financeiro/juros-compostos">juros compostos</a>, o valor dos juros nao muda de um periodo para outro — ele e sempre o mesmo.</p>

          <h2>Exemplos praticos de calculo</h2>
          <h3>Exemplo 1: Emprestimo pessoal de curto prazo</h3>
          <p>Voce emprestou R$ 5.000 a uma taxa de 3% ao mes por 4 meses. O calculo fica:</p>
          <ol>
            <li>Juros por periodo: R$ 5.000 x 0,03 = R$ 150</li>
            <li>Juros totais: R$ 150 x 4 = <strong>R$ 600</strong></li>
            <li>Montante final: R$ 5.000 + R$ 600 = <strong>R$ 5.600</strong></li>
          </ol>
          <h3>Exemplo 2: Aplicacao financeira</h3>
          <p>Aplicacao de R$ 10.000 a 2% ao mes por 12 meses resulta em juros de R$ 2.400 e montante de R$ 12.400. Se fossem <a href="/financeiro/juros-compostos">juros compostos</a> na mesma taxa, o resultado seria R$ 12.682 — a diferenca parece pequena no curto prazo, mas cresce exponencialmente em periodos mais longos.</p>

          <h2>Onde os juros simples aparecem no dia a dia?</h2>
          <p>Embora os <a href="/financeiro/juros-compostos">juros compostos</a> dominem o mercado financeiro, o regime simples ainda e bastante utilizado em diversas situacoes:</p>
          <ul>
            <li><strong>Multas por atraso em boletos:</strong> a maioria dos boletos bancarios aplica juros de mora de 1% ao mes em regime simples, alem de correcao monetaria</li>
            <li><strong>Negociacoes de dividas:</strong> acordos diretos entre empresas e fornecedores frequentemente usam juros simples para facilitar o calculo</li>
            <li><strong>Desconto bancario de duplicatas:</strong> instituicoes financeiras aplicam juros simples ao antecipar recebiveis</li>
            <li><strong>Operacoes de curtissimo prazo:</strong> em contratos com menos de um periodo, a diferenca entre simples e compostos e minima</li>
          </ul>

          <h2>Juros simples vs. juros compostos: quando usar cada um?</h2>
          <p>A escolha entre os dois regimes depende do contexto. Para <strong>operacoes de curto prazo</strong> — como multas, atrasos e negociacoes rapidas — o calculo simples e suficiente e mais transparente. Ja para <strong>investimentos de longo prazo</strong>, simulacoes de <a href="/financeiro/financiamento">financiamento imobiliario</a> ou projecoes de <a href="/financeiro/simulador-investimentos">investimentos com aportes mensais</a>, o regime composto reflete melhor a realidade.</p>
          <p>Para converter taxas entre periodos no regime simples, basta multiplicar ou dividir. Uma taxa de 2% ao mes equivale a 24% ao ano em juros simples. No regime composto, essa conversao exige uma formula diferente — use nosso <a href="/financeiro/conversor-taxas">conversor de taxas</a> para fazer esse calculo com precisao.</p>

          <h2>Dicas para usar a calculadora de juros simples</h2>
          <ul>
            <li>Certifique-se de que a <strong>taxa e o periodo estejam na mesma unidade</strong> (ambos mensais ou ambos anuais)</li>
            <li>Para calcular juros de atraso em boletos, use taxa de 1% ao mes e o numero de meses em atraso</li>
            <li>Compare o resultado com o calculo de <a href="/financeiro/juros-compostos">juros compostos</a> para entender a diferenca real entre os regimes</li>
            <li>Se voce esta avaliando um <a href="/financeiro/emprestimo">emprestimo pessoal</a>, lembre-se de que bancos geralmente usam juros compostos — o custo real sera maior</li>
          </ul>
        </>
      }
    >
      <JurosSimplesForm />
    </CalculatorPage>
  )
}
