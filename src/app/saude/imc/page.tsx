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
          <h2>O que é o IMC e como calcular</h2>
          <p>O <strong>Índice de Massa Corporal (IMC)</strong> é uma relação matemática entre peso e altura, utilizada pela Organização Mundial da Saúde (OMS) como ferramenta de triagem nutricional. A fórmula é simples:</p>
          <p><em>IMC = peso (kg) / altura (m) x altura (m)</em></p>
          <p>Por exemplo, uma pessoa com 70 kg e 1,75 m de altura tem IMC de <strong>22,86</strong>, classificado como peso normal. Apesar de sua simplicidade, o IMC se tornou o padrão global para avaliações populacionais porque permite comparações rápidas e padronizadas entre grandes grupos de pessoas.</p>

          <h2>Tabela de classificação do IMC segundo a OMS</h2>
          <p>A OMS estabelece as seguintes faixas de classificação para adultos:</p>
          <ul>
            <li><strong>Abaixo de 18,5:</strong> baixo peso -- pode indicar desnutrição, distúrbios alimentares ou condições clínicas que requerem investigação.</li>
            <li><strong>18,5 a 24,9:</strong> peso normal -- faixa associada ao menor risco de doenças crônicas relacionadas ao peso.</li>
            <li><strong>25,0 a 29,9:</strong> sobrepeso -- sinal de alerta que merece atenção a hábitos alimentares e nível de atividade física.</li>
            <li><strong>30,0 a 34,9:</strong> obesidade grau I -- risco aumentado de diabetes tipo 2, hipertensão e doenças cardiovasculares.</li>
            <li><strong>35,0 a 39,9:</strong> obesidade grau II -- risco alto, geralmente com indicação de acompanhamento multidisciplinar.</li>
            <li><strong>Acima de 40,0:</strong> obesidade grau III (mórbida) -- risco muito alto, com possível indicação de tratamento cirúrgico.</li>
          </ul>
          <p><em>Observação:</em> para idosos acima de 65 anos, alguns especialistas consideram a faixa normal um pouco mais ampla (até 27), pois a perda natural de massa muscular pode distorcer o resultado. Para crianças e adolescentes, existem tabelas específicas por idade e sexo.</p>

          <h3>Exemplo prático de cálculo</h3>
          <p>Veja como calcular o IMC para diferentes perfis:</p>
          <ol>
            <li><strong>Mulher, 60 kg, 1,62 m:</strong> IMC = 60 / (1,62 x 1,62) = 60 / 2,6244 = <strong>22,86</strong> (peso normal)</li>
            <li><strong>Homem, 95 kg, 1,80 m:</strong> IMC = 95 / (1,80 x 1,80) = 95 / 3,24 = <strong>29,32</strong> (sobrepeso)</li>
            <li><strong>Mulher, 48 kg, 1,65 m:</strong> IMC = 48 / (1,65 x 1,65) = 48 / 2,7225 = <strong>17,63</strong> (baixo peso)</li>
          </ol>

          <h2>Limitações do IMC: quando o número não conta toda a história</h2>
          <p>Embora seja uma ferramenta útil de triagem, o IMC possui <strong>limitações importantes</strong> que você deve conhecer:</p>
          <ul>
            <li><strong>Não distingue gordura de músculo:</strong> um fisiculturista de 90 kg e 1,75 m tem IMC de 29,4 (sobrepeso), mas pode ter percentual de gordura abaixo de 10%. O IMC não diferencia massa magra de massa gorda.</li>
            <li><strong>Não considera a distribuição de gordura:</strong> a gordura abdominal (visceral) é muito mais perigosa para a saúde cardiovascular do que a gordura periférica. Duas pessoas com o mesmo IMC podem ter riscos de saúde completamente diferentes.</li>
            <li><strong>Variações étnicas:</strong> populações asiáticas tendem a apresentar riscos metabólicos elevados com IMCs mais baixos, enquanto populações afrodescendentes podem ter maior densidade óssea e muscular.</li>
            <li><strong>Gestantes e lactantes:</strong> o IMC não se aplica a mulheres grávidas. Para acompanhar a gestação, utilize nossa <a href="/saude/gestacional">calculadora gestacional</a>.</li>
          </ul>
          <p>Para uma avaliação mais completa, o IMC deve ser combinado com a <strong>circunferência abdominal</strong> (risco elevado acima de 94 cm para homens e 80 cm para mulheres), percentual de gordura corporal e exames laboratoriais. Confira também nossa <a href="/saude/peso-ideal">calculadora de peso ideal</a>, que utiliza fórmulas clínicas complementares ao IMC.</p>

          <h2>Como usar o resultado do IMC a seu favor</h2>
          <p>O IMC é um <strong>ponto de partida</strong>, não um diagnóstico definitivo. Veja como aproveitar melhor o resultado:</p>
          <ol>
            <li><strong>Acompanhe ao longo do tempo:</strong> um único valor de IMC diz pouco. A tendência ao longo de meses é que revela se você está ganhando ou perdendo peso de forma consistente.</li>
            <li><strong>Combine com outras métricas:</strong> use a <a href="/saude/calorias-tmb">calculadora de calorias e TMB</a> para entender sua necessidade calórica diária e ajustar a alimentação com base em dados reais.</li>
            <li><strong>Considere sua composição corporal:</strong> se você pratica atividade física regularmente, a <a href="/saude/peso-ideal">calculadora de peso ideal</a> pode oferecer uma perspectiva complementar usando fórmulas clínicas diferentes.</li>
            <li><strong>Consulte um profissional:</strong> um médico ou nutricionista pode interpretar o IMC dentro do contexto completo da sua saúde, considerando histórico familiar, exames e estilo de vida.</li>
          </ol>
          <p>Para calcular rapidamente proporções e variações percentuais do seu peso, utilize também a <a href="/matematica/porcentagem">calculadora de porcentagem</a>. E para saber sua idade exata em anos, meses e dias, experimente a <a href="/utilidades/calculadora-idade">calculadora de idade</a>.</p>
        </>
      }
    >
      <IMCForm />
    </CalculatorPage>
  )
}
