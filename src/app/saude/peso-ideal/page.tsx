import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { PesoIdealForm } from '@/components/calculadoras/peso-ideal-form'

export const metadata: Metadata = createCategoriaMetadata(
  'saude/peso-ideal',
  'Peso Ideal',
  'Veja a faixa de peso saudável para sua altura pela tabela da OMS e compare com as estimativas das fórmulas clínicas Devine, Robinson e Miller — cada uma com critérios ligeiramente diferentes.'
)

export default function PesoIdealPage() {
  return (
    <CalculatorPage
      slug="peso-ideal"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Peso Ideal"
      descricao="Veja a faixa de peso saudável para sua altura pela tabela da OMS — e compare com as estimativas das fórmulas clínicas Devine, Robinson e Miller, usadas em contextos médicos para dosagem de medicamentos."
      faqs={[
        {
          question: 'Como calcular o peso ideal?',
          answer: 'A forma mais usada é pela faixa de IMC saudável (18,5 a 24,9): Peso = IMC × altura². Para quem tem 1,70 m, o peso saudável vai de cerca de 53,5 kg a 72 kg. As fórmulas clínicas Devine, Robinson e Miller fazem estimativas pontuais baseadas em sexo e altura, usadas originalmente para calcular doses de medicamentos em contextos hospitalares.',
        },
        {
          question: 'Qual é o peso ideal para a minha altura?',
          answer: 'Não existe um número único — existe uma faixa. Para 1,70 m, a faixa de IMC normal vai de aproximadamente 53,5 kg a 72 kg. Mas isso não conta a história toda: um atleta de 85 kg com baixo percentual de gordura está mais saudável do que um sedentário de 65 kg com gordura visceral elevada. Peso ideal é ponto de partida, não meta absoluta.',
        },
        {
          question: 'Qual a diferença entre as fórmulas Devine, Robinson e Miller?',
          answer: 'As três foram criadas entre 1974 e 1983 para uso clínico, especialmente ajuste de doses de medicamentos. Devine é a mais antiga e ainda muito usada em farmacologia. Robinson e Miller propuseram versões revisadas com ajustes diferentes para homens e mulheres. Os resultados divergem alguns quilogramas entre si porque cada uma foi baseada em amostras populacionais distintas.',
        },
      ]}
      conteudo={
        <>
          <h2>Peso ideal: uma faixa saudavel, nao um numero unico</h2>
          <p>O <strong>peso ideal</strong> e sempre uma <em>faixa</em>, e nao um valor fixo. A Organizacao Mundial da Saude (OMS) define como peso normal o IMC entre 18,5 e 24,9 para adultos, o que na pratica representa uma variacao de 15 a 20 kg para a maioria das alturas. O peso mais saudavel dentro dessa faixa depende da sua composicao corporal, densidade ossea, historico genetico e nivel de atividade fisica.</p>
          <p>Para calcular os limites com base na sua altura, aplique a formula:</p>
          <ul>
            <li><strong>Peso minimo saudavel</strong> = 18,5 x Altura (m) x Altura (m)</li>
            <li><strong>Peso maximo saudavel</strong> = 24,9 x Altura (m) x Altura (m)</li>
          </ul>

          <h3>Exemplos praticos por altura</h3>
          <p>Veja a faixa de peso ideal para algumas alturas comuns:</p>
          <ul>
            <li><strong>1,55 m:</strong> de 44,4 kg a 59,8 kg</li>
            <li><strong>1,60 m:</strong> de 47,4 kg a 63,7 kg</li>
            <li><strong>1,65 m:</strong> de 50,3 kg a 67,8 kg</li>
            <li><strong>1,70 m:</strong> de 53,5 kg a 72,0 kg</li>
            <li><strong>1,75 m:</strong> de 56,7 kg a 76,3 kg</li>
            <li><strong>1,80 m:</strong> de 59,9 kg a 80,7 kg</li>
            <li><strong>1,85 m:</strong> de 63,3 kg a 85,2 kg</li>
          </ul>
          <p>Para calcular seu IMC atual e ver em qual faixa voce se encontra, use nossa <a href="/saude/imc">calculadora de IMC</a>.</p>

          <h2>Formulas clinicas: Devine, Robinson e Miller</h2>
          <p>Alem da abordagem pelo IMC, existem <strong>formulas clinicas</strong> desenvolvidas para estimar o peso ideal em contextos hospitalares, especialmente para ajuste de doses de medicamentos. As tres mais utilizadas na pratica medica sao:</p>
          <ol>
            <li><strong>Formula de Devine (1974):</strong> a mais antiga e ainda amplamente usada em farmacologia. Para homens: 50 kg + 2,3 kg para cada polegada acima de 5 pes (152,4 cm). Para mulheres: 45,5 kg + 2,3 kg para cada polegada acima de 5 pes. Se precisar converter polegadas para centimetros, utilize nosso <a href="/conversores/conversor-unidades">conversor de unidades</a>.</li>
            <li><strong>Formula de Robinson (1983):</strong> versao revisada com ajustes diferentes por sexo. Para homens: 52 kg + 1,9 kg/polegada acima de 5 pes. Para mulheres: 49 kg + 1,7 kg/polegada acima de 5 pes.</li>
            <li><strong>Formula de Miller (1983):</strong> para homens: 56,2 kg + 1,41 kg/polegada acima de 5 pes. Para mulheres: 53,1 kg + 1,36 kg/polegada acima de 5 pes.</li>
          </ol>
          <p><em>Nota:</em> as tres formulas foram baseadas em amostras populacionais distintas, o que explica a divergencia de alguns quilogramas entre os resultados. Na pratica clinica, a formula de Devine continua sendo a referencia mais comum para calculo de dosagem de medicamentos.</p>

          <h2>Como interpretar os resultados e agir com inteligencia</h2>
          <p>O resultado da calculadora de peso ideal deve ser usado como <strong>ponto de partida</strong> para uma reflexao sobre sua saude, e nao como meta absoluta. Veja como aproveitar melhor essa informacao:</p>
          <ul>
            <li><strong>Compare multiplas metricas:</strong> combine o peso ideal com o <a href="/saude/imc">calculo do IMC</a> e, se possivel, com a medida da circunferencia abdominal. A gordura visceral (acima de 94 cm para homens e 80 cm para mulheres) e um fator de risco cardiovascular independente do peso.</li>
            <li><strong>Entenda suas necessidades caloricas:</strong> saber o peso ideal sem conhecer o gasto calorico diario dificulta qualquer plano alimentar. Use a <a href="/saude/calorias-tmb">calculadora de calorias e TMB</a> para descobrir quantas calorias seu corpo precisa.</li>
            <li><strong>Considere sua composicao corporal:</strong> duas pessoas com o mesmo peso e altura podem ter perfis de saude completamente diferentes. Um atleta com 85 kg de massa muscular nao e comparavel a um sedentario com 85 kg de gordura.</li>
            <li><strong>Acompanhe a tendencia:</strong> um valor isolado diz pouco. Monitore seu peso ao longo de semanas e meses para identificar tendencias de ganho ou perda.</li>
          </ul>

          <h2>Limitacoes importantes do conceito de peso ideal</h2>
          <p>Tanto o IMC quanto as formulas clinicas possuem limitacoes significativas que voce deve conhecer:</p>
          <ul>
            <li><strong>Nao distinguem gordura de musculo:</strong> um fisiculturista pode estar acima do &ldquo;peso ideal&rdquo; calculado sem nenhum excesso de gordura.</li>
            <li><strong>Nao consideram a distribuicao de gordura:</strong> onde a gordura esta localizada importa mais do que a quantidade total. Gordura abdominal e mais perigosa que gordura nos quadris e coxas.</li>
            <li><strong>Variacoes etnicas:</strong> as formulas foram desenvolvidas com base em populacoes ocidentais. Populacoes asiaticas podem apresentar riscos metabolicos com pesos mais baixos, enquanto populacoes afrodescendentes podem ter maior densidade ossea.</li>
            <li><strong>Idade e sexo:</strong> idosos naturalmente perdem massa muscular (sarcopenia), o que pode fazer o peso parecer &ldquo;adequado&rdquo; mesmo com excesso de gordura. Mulheres gestantes devem usar a <a href="/saude/gestacional">calculadora gestacional</a> em vez do peso ideal convencional.</li>
          </ul>
          <p>Para uma avaliacao completa da composicao corporal e do risco cardiovascular, consulte um medico ou nutricionista. Use nossas calculadoras como ferramentas informativas para uma conversa mais produtiva com seu profissional de saude. Para calcular proporcoes e variacoes percentuais, a <a href="/matematica/porcentagem">calculadora de porcentagem</a> pode ser util.</p>
        </>
      }
    >
      <PesoIdealForm />
    </CalculatorPage>
  )
}
