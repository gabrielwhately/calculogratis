import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { IMCForm } from '@/components/calculadoras/imc-form'

export const metadata: Metadata = createCalculadoraMetadata('imc')

export default function IMCPage() {
  return (
    <CalculatorPage
      slug="imc"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Calculadora de IMC"
      descricao="Informe peso e altura para ver seu IMC e a classificação da OMS. Vale entender também o que o número diz — e o que ele não diz sobre sua saúde."
      faqs={[
        { question: 'O que é o IMC?', answer: 'É uma relação matemática entre peso e altura: IMC = peso (kg) ÷ altura (m)². Criado no século XIX pelo matemático belga Adolphe Quetelet, foi adotado pela OMS como ferramenta de triagem nutricional para populações adultas.' },
        { question: 'Qual o IMC ideal?', answer: 'A OMS classifica como peso normal o IMC entre 18,5 e 24,9. Abaixo disso é baixo peso; de 25 a 29,9 é sobrepeso; acima de 30 já entra nas faixas de obesidade (graus I, II e III). Mas esses limites são para adultos — crianças e adolescentes têm tabelas próprias por idade e sexo.' },
        { question: 'O IMC é confiável para todos?', answer: 'Não plenamente. Um fisiculturista de 90 kg e 1,75 m tem IMC 29,4 — &ldquo;sobrepeso&rdquo; — mas provavelmente com baixíssimo percentual de gordura. Por outro lado, alguém com IMC &ldquo;normal&rdquo; pode ter gordura visceral elevada. O IMC é um ponto de partida, não um diagnóstico. Atletas, gestantes, idosos e crianças precisam de avaliações mais específicas.' },
      ]}
      conteudo={
        <>
          <h2>O que e o IMC e como calcular</h2>
          <p>O <strong>Indice de Massa Corporal (IMC)</strong> e uma relacao matematica entre peso e altura, utilizada pela Organizacao Mundial da Saude (OMS) como ferramenta de triagem nutricional. A formula e simples:</p>
          <p><em>IMC = peso (kg) / altura (m) x altura (m)</em></p>
          <p>Por exemplo, uma pessoa com 70 kg e 1,75 m de altura tem IMC de <strong>22,86</strong>, classificado como peso normal. Apesar de sua simplicidade, o IMC se tornou o padrao global para avaliacoes populacionais porque permite comparacoes rapidas e padronizadas entre grandes grupos de pessoas.</p>

          <h2>Tabela de classificacao do IMC segundo a OMS</h2>
          <p>A OMS estabelece as seguintes faixas de classificacao para adultos:</p>
          <ul>
            <li><strong>Abaixo de 18,5:</strong> baixo peso -- pode indicar desnutricao, disturbios alimentares ou condicoes clinicas que requerem investigacao.</li>
            <li><strong>18,5 a 24,9:</strong> peso normal -- faixa associada ao menor risco de doencas cronicas relacionadas ao peso.</li>
            <li><strong>25,0 a 29,9:</strong> sobrepeso -- sinal de alerta que merece atencao a habitos alimentares e nivel de atividade fisica.</li>
            <li><strong>30,0 a 34,9:</strong> obesidade grau I -- risco aumentado de diabetes tipo 2, hipertensao e doencas cardiovasculares.</li>
            <li><strong>35,0 a 39,9:</strong> obesidade grau II -- risco alto, geralmente com indicacao de acompanhamento multidisciplinar.</li>
            <li><strong>Acima de 40,0:</strong> obesidade grau III (morbida) -- risco muito alto, com possivel indicacao de tratamento cirurgico.</li>
          </ul>
          <p><em>Observacao:</em> para idosos acima de 65 anos, alguns especialistas consideram a faixa normal um pouco mais ampla (ate 27), pois a perda natural de massa muscular pode distorcer o resultado. Para criancas e adolescentes, existem tabelas especificas por idade e sexo.</p>

          <h3>Exemplo pratico de calculo</h3>
          <p>Veja como calcular o IMC para diferentes perfis:</p>
          <ol>
            <li><strong>Mulher, 60 kg, 1,62 m:</strong> IMC = 60 / (1,62 x 1,62) = 60 / 2,6244 = <strong>22,86</strong> (peso normal)</li>
            <li><strong>Homem, 95 kg, 1,80 m:</strong> IMC = 95 / (1,80 x 1,80) = 95 / 3,24 = <strong>29,32</strong> (sobrepeso)</li>
            <li><strong>Mulher, 48 kg, 1,65 m:</strong> IMC = 48 / (1,65 x 1,65) = 48 / 2,7225 = <strong>17,63</strong> (baixo peso)</li>
          </ol>

          <h2>Limitacoes do IMC: quando o numero nao conta toda a historia</h2>
          <p>Embora seja uma ferramenta util de triagem, o IMC possui <strong>limitacoes importantes</strong> que voce deve conhecer:</p>
          <ul>
            <li><strong>Nao distingue gordura de musculo:</strong> um fisiculturista de 90 kg e 1,75 m tem IMC de 29,4 (sobrepeso), mas pode ter percentual de gordura abaixo de 10%. O IMC nao diferencia massa magra de massa gorda.</li>
            <li><strong>Nao considera a distribuicao de gordura:</strong> a gordura abdominal (visceral) e muito mais perigosa para a saude cardiovascular do que a gordura periferica. Duas pessoas com o mesmo IMC podem ter riscos de saude completamente diferentes.</li>
            <li><strong>Variacoes etnicas:</strong> populacoes asiaticas tendem a apresentar riscos metabolicos elevados com IMCs mais baixos, enquanto populacoes afrodescendentes podem ter maior densidade ossea e muscular.</li>
            <li><strong>Gestantes e lactantes:</strong> o IMC nao se aplica a mulheres gravidas. Para acompanhar a gestacao, utilize nossa <a href="/saude/gestacional">calculadora gestacional</a>.</li>
          </ul>
          <p>Para uma avaliacao mais completa, o IMC deve ser combinado com a <strong>circunferencia abdominal</strong> (risco elevado acima de 94 cm para homens e 80 cm para mulheres), percentual de gordura corporal e exames laboratoriais. Confira tambem nossa <a href="/saude/peso-ideal">calculadora de peso ideal</a>, que utiliza formulas clinicas complementares ao IMC.</p>

          <h2>Como usar o resultado do IMC a seu favor</h2>
          <p>O IMC e um <strong>ponto de partida</strong>, nao um diagnostico definitivo. Veja como aproveitar melhor o resultado:</p>
          <ol>
            <li><strong>Acompanhe ao longo do tempo:</strong> um unico valor de IMC diz pouco. A tendencia ao longo de meses e que revela se voce esta ganhando ou perdendo peso de forma consistente.</li>
            <li><strong>Combine com outras metricas:</strong> use a <a href="/saude/calorias-tmb">calculadora de calorias e TMB</a> para entender sua necessidade calorica diaria e ajustar a alimentacao com base em dados reais.</li>
            <li><strong>Considere sua composicao corporal:</strong> se voce pratica atividade fisica regularmente, a <a href="/saude/peso-ideal">calculadora de peso ideal</a> pode oferecer uma perspectiva complementar usando formulas clinicas diferentes.</li>
            <li><strong>Consulte um profissional:</strong> um medico ou nutricionista pode interpretar o IMC dentro do contexto completo da sua saude, considerando historico familiar, exames e estilo de vida.</li>
          </ol>
          <p>Para calcular rapidamente proporcoes e variacoes percentuais do seu peso, utilize tambem a <a href="/matematica/porcentagem">calculadora de porcentagem</a>. E para saber sua idade exata em anos, meses e dias, experimente a <a href="/utilidades/calculadora-idade">calculadora de idade</a>.</p>
        </>
      }
    >
      <IMCForm />
    </CalculatorPage>
  )
}
