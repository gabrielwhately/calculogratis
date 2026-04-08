import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { AposentadoriaForm } from '@/components/calculadoras/aposentadoria-form'

export const metadata: Metadata = createCalculadoraMetadata('aposentadoria')

export default function AposentadoriaPage() {
  return (
    <CalculatorPage
      slug="aposentadoria"
      categoriaSlug="previdencia"
      categoriaNome="Previdencia"
      nome="Aposentadoria"
      descricao="Simule sua aposentadoria pelo INSS. Descubra se voce ja pode se aposentar e qual sera o valor estimado do beneficio."
      conteudo={
        <>
          <h2>O que mudou com a Reforma da Previdencia (EC 103/2019)</h2>
          <p>A <strong>Reforma da Previdencia</strong>, promulgada em novembro de 2019, alterou profundamente as regras para aposentadoria no Brasil. A principal mudanca foi a exigencia de <strong>idade minima obrigatoria</strong>: 65 anos para homens e 62 para mulheres, combinada com um tempo minimo de contribuicao de 20 anos (homens) e 15 anos (mulheres).</p>
          <p>Quem ja contribuia antes da reforma, mas ainda nao havia se aposentado, pode se enquadrar nas <em>regras de transicao</em>, que oferecem caminhos alternativos para quem estava proximo de completar os requisitos antigos. Entender qual regra se aplica ao seu caso e essencial para planejar o momento certo de solicitar o beneficio.</p>

          <h2>Como e calculado o valor do beneficio</h2>
          <p>Antes da reforma, o calculo considerava a media dos <strong>80% maiores salarios de contribuicao</strong>, descartando os 20% mais baixos. Atualmente, entram <strong>todos os salarios de contribuicao desde julho de 1994</strong>, sem qualquer descarte. Isso pode reduzir significativamente a media para quem teve periodos com salarios mais baixos, como:</p>
          <ul>
            <li>Primeiros anos de carreira com remuneracao inicial baixa</li>
            <li>Contribuicoes como <strong>autonomo ou MEI</strong> sobre valores minimos</li>
            <li>Periodos de trabalho informal regularizados posteriormente</li>
            <li>Estagios e contratos temporarios com salarios reduzidos</li>
          </ul>
          <p>O beneficio parte de <strong>60% da media</strong> de todos os salarios, acrescido de 2% para cada ano de contribuicao que exceder o minimo exigido. Assim, quem contribuiu 40 anos (homem) alcanca 100% da media. Para calcular o valor liquido que voce receberia apos os descontos de IRRF, utilize a <a href="/trabalhista/irrf">Calculadora de IRRF</a>.</p>

          <h3>Exemplo pratico de calculo</h3>
          <p>Imagine um homem com 25 anos de contribuicao e media salarial de R$ 4.000,00. O calculo seria: 60% + (5 anos excedentes x 2%) = <strong>70% de R$ 4.000 = R$ 2.800,00</strong>. Se ele contribuisse mais 10 anos (totalizando 35), o beneficio subiria para 90% da media, ou R$ 3.600,00. Por isso, em muitos casos, vale a pena avaliar se compensa contribuir por mais tempo antes de requerer a aposentadoria.</p>

          <h2>Regras de transicao: qual e a melhor para voce</h2>
          <p>Para quem ja contribuia antes de 13/11/2019, existem tres regras de transicao principais. Cada uma pode resultar em uma data diferente de elegibilidade:</p>
          <ol>
            <li><strong>Sistema de pontos:</strong> soma da idade com o tempo de contribuicao deve atingir um minimo progressivo (em 2026, 92 pontos para mulheres e 102 para homens). A pontuacao sobe 1 ponto por ano ate o limite.</li>
            <li><strong>Pedagio de 50%:</strong> disponivel para quem estava a menos de 2 anos de completar o tempo minimo na data da reforma. Exige cumprir 50% do tempo restante como acrescimo.</li>
            <li><strong>Pedagio de 100%:</strong> exige cumprir o dobro do tempo que faltava na data da reforma, mas permite aposentar-se com o valor integral (100% da media).</li>
          </ol>
          <p>O ideal e <strong>simular todas as regras</strong> e comparar qual permite a aposentadoria mais vantajosa, tanto em termos de data quanto de valor. Use esta calculadora para verificar cada cenario com seus dados reais de contribuicao.</p>

          <h2>Planejamento financeiro para a aposentadoria</h2>
          <p>A aposentadoria pelo INSS dificilmente mantem o mesmo padrao de vida da fase ativa, especialmente para quem tem renda acima do teto previdenciario. Por isso, o planejamento complementar e fundamental. Algumas ferramentas que podem ajudar nessa analise:</p>
          <ul>
            <li>A <a href="/financeiro/juros-compostos">Calculadora de Juros Compostos</a> mostra como investimentos de longo prazo podem complementar a renda na aposentadoria.</li>
            <li>O <a href="/financeiro/simulador-investimentos">Simulador de Investimentos</a> permite projetar o patrimonio acumulado ao longo dos anos.</li>
            <li>A <a href="/trabalhista/salario-liquido">Calculadora de Salario Liquido</a> ajuda a entender quanto da renda atual esta disponivel para poupanca previdenciaria.</li>
            <li>A <a href="/matematica/porcentagem">Calculadora de Porcentagem</a> facilita o calculo dos percentuais aplicaveis ao beneficio.</li>
          </ul>
          <p>Comece o planejamento o quanto antes: cada ano adicional de contribuicao nao apenas aumenta o percentual do beneficio, mas tambem permite acumular reservas financeiras que garantam mais tranquilidade na terceira idade.</p>
        </>
      }
    >
      <AposentadoriaForm />
    </CalculatorPage>
  )
}
