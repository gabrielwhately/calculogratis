import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CaloriasTMBForm } from '@/components/calculadoras/calorias-tmb-form'

export const metadata: Metadata = createCategoriaMetadata(
  'saude/calorias-tmb',
  'Calorias e TMB',
  'Descubra quantas calorias seu corpo precisa por dia com a fórmula de Harris-Benedict. Leva em conta sexo, peso, altura, idade e nível de atividade física para estimar seu gasto energético real.'
)

export default function CaloriasTMBPage() {
  return (
    <CalculatorPage
      slug="calorias-tmb"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Calorias e TMB"
      descricao="Descubra quantas calorias seu corpo precisa por dia — em repouso e com sua rotina real de atividade. A calculadora usa a equação de Mifflin-St Jeor, considerada a mais precisa para a população geral."
      faqs={[
        {
          question: 'O que é Taxa de Metabolismo Basal (TMB)?',
          answer: 'É a quantidade de calorias que seu corpo gasta para se manter vivo sem nenhuma atividade — respiração, batimentos, temperatura, funcionamento dos órgãos. Se você ficasse deitado o dia inteiro sem se mover, gastaria exatamente isso. Representa de 60% a 75% do gasto calórico total da maioria das pessoas.',
        },
        {
          question: 'Como calcular a necessidade calórica diária?',
          answer: 'Multiplica-se a TMB pelo Fator de Atividade Física (FAF): 1,2 para quem é sedentário, 1,55 para quem treina de 3 a 5 dias por semana e 1,9 para quem treina pesado duas vezes ao dia. O resultado é o GET — Gasto Energético Total — ou seja, o quanto você precisa consumir para manter o peso atual.',
        },
        {
          question: 'Quantas calorias devo consumir para emagrecer?',
          answer: 'Um déficit de 300 a 500 kcal por dia abaixo do GET resulta em perda de 0,3 a 0,5 kg por semana — ritmo considerado seguro e sustentável. Déficits muito grandes (acima de 1.000 kcal) aceleram a perda de massa muscular e desaceleram o metabolismo, dificultando a manutenção do peso a longo prazo.',
        },
      ]}
      conteudo={
        <>
          <h2>O que e a Taxa de Metabolismo Basal (TMB)</h2>
          <p>A <strong>Taxa de Metabolismo Basal (TMB)</strong> representa o gasto calorico minimo do seu corpo para manter as funcoes vitais em repouso absoluto: respiracao, batimentos cardiacos, regulacao da temperatura, funcionamento dos orgaos e renovacao celular. Se voce ficasse deitado sem se mover por 24 horas, gastaria exatamente esse valor.</p>
          <p>Para a maioria das pessoas, a TMB responde por <strong>60% a 75%</strong> de todo o gasto calorico diario. Isso significa que a maior parte da energia que voce consome vai para manter o corpo vivo -- e nao para exercicios ou atividades do dia a dia. Conhecer esse numero e o primeiro passo para qualquer plano alimentar baseado em dados reais, e nao em estimativas genericas.</p>

          <h2>A equacao de Mifflin-St Jeor: a mais precisa atualmente</h2>
          <p>Nossa calculadora utiliza a equacao de <strong>Mifflin-St Jeor</strong>, publicada em 1990 e considerada a mais validada para a populacao geral por estudos cientificos recentes. Ela considera quatro variaveis: peso, altura, idade e sexo biologico.</p>
          <ul>
            <li><strong>Homens:</strong> TMB = 88,362 + (13,397 x peso em kg) + (4,799 x altura em cm) - (5,677 x idade em anos)</li>
            <li><strong>Mulheres:</strong> TMB = 447,593 + (9,247 x peso em kg) + (3,098 x altura em cm) - (4,330 x idade em anos)</li>
          </ul>

          <h3>O Fator de Atividade Fisica (FAF)</h3>
          <p>Apos calcular a TMB, multiplicamos pelo <strong>Fator de Atividade Fisica</strong> para obter o <em>Gasto Energetico Total (GET)</em> -- a quantidade real de calorias que voce precisa por dia, considerando sua rotina:</p>
          <ul>
            <li><strong>1,2 (sedentario):</strong> pouca ou nenhuma atividade fisica, trabalho de escritorio</li>
            <li><strong>1,375 (levemente ativo):</strong> exercicios leves 1 a 3 dias por semana</li>
            <li><strong>1,55 (moderadamente ativo):</strong> exercicios moderados 3 a 5 dias por semana</li>
            <li><strong>1,725 (muito ativo):</strong> exercicios intensos 6 a 7 dias por semana</li>
            <li><strong>1,9 (extremamente ativo):</strong> treino pesado duas vezes ao dia ou trabalho fisico intenso</li>
          </ul>
          <p>Por exemplo, uma mulher de 30 anos, 65 kg e 1,65 m, com rotina moderadamente ativa, teria TMB de aproximadamente 1.387 kcal e GET de cerca de 2.150 kcal por dia.</p>

          <h2>Como usar o resultado na pratica: perda, ganho ou manutencao de peso</h2>
          <p>O GET calculado representa as calorias necessarias para <strong>manter seu peso atual</strong>. A partir desse numero, voce pode ajustar a ingestao conforme seu objetivo:</p>
          <ol>
            <li><strong>Para emagrecer:</strong> consuma entre 300 e 500 kcal abaixo do GET. Isso resulta em uma perda gradual de 0,3 a 0,5 kg por semana -- ritmo considerado seguro e sustentavel pela maioria dos nutricionistas. Deficits muito agressivos (acima de 1.000 kcal) podem desacelerar o metabolismo e acelerar a perda de massa muscular.</li>
            <li><strong>Para ganhar massa muscular:</strong> consuma de 200 a 400 kcal acima do GET, combinado com treino de forca e ingestao proteica adequada (1,6 a 2,2 g de proteina por kg de peso corporal por dia).</li>
            <li><strong>Para manter o peso:</strong> mantenha a ingestao proxima ao GET, ajustando conforme mudancas na rotina de exercicios ou no peso corporal.</li>
          </ol>
          <p>Combine este calculo com a <a href="/saude/imc">calculadora de IMC</a> para ter uma visao mais completa do seu perfil nutricional. Se voce quer saber a faixa de peso saudavel para sua altura, consulte a <a href="/saude/peso-ideal">calculadora de peso ideal</a>, que utiliza formulas clinicas complementares.</p>

          <h2>Fatores que influenciam o metabolismo basal</h2>
          <p>Alem das variaveis da formula, outros fatores afetam seu metabolismo de forma significativa:</p>
          <ul>
            <li><strong>Composicao corporal:</strong> musculos consomem mais energia em repouso do que gordura. Pessoas com maior percentual de massa magra tendem a ter TMB mais alta.</li>
            <li><strong>Genetica:</strong> a variacao genetica pode causar diferencas de ate 15% na TMB entre pessoas com caracteristicas fisicas semelhantes.</li>
            <li><strong>Hormônios tireoidianos:</strong> hipotireoidismo reduz o metabolismo; hipertireoidismo o acelera. Alteracoes significativas no peso sem mudanca de habitos justificam investigacao medica.</li>
            <li><strong>Idade:</strong> o metabolismo tende a diminuir cerca de 1% a 2% por decada apos os 20 anos, principalmente pela perda progressiva de massa muscular.</li>
            <li><strong>Temperatura ambiente:</strong> ambientes muito frios ou muito quentes aumentam levemente o gasto calorico, pois o corpo precisa regular sua temperatura interna.</li>
          </ul>
          <p><em>Importante:</em> estes calculos sao estimativas baseadas em medias populacionais. Para objetivos especificos de saude, como dietas restritivas ou planos de ganho de massa, consulte um nutricionista que possa avaliar suas necessidades individuais. Para acompanhar outras metricas de saude, explore tambem a <a href="/saude/gestacional">calculadora gestacional</a> ou a <a href="/utilidades/calculadora-idade">calculadora de idade</a>.</p>
        </>
      }
    >
      <CaloriasTMBForm />
    </CalculatorPage>
  )
}
