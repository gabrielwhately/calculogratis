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
          <h2>Peso ideal: uma faixa saudável, não um número único</h2>
          <p>O <strong>peso ideal</strong> é sempre uma <em>faixa</em>, e não um valor fixo. A Organização Mundial da Saúde (OMS) define como peso normal o IMC entre 18,5 e 24,9 para adultos, o que na prática representa uma variação de 15 a 20 kg para a maioria das alturas. O peso mais saudável dentro dessa faixa depende da sua composição corporal, densidade óssea, histórico genético e nível de atividade física.</p>
          <p>Para calcular os limites com base na sua altura, aplique a fórmula:</p>
          <ul>
            <li><strong>Peso mínimo saudável</strong> = 18,5 x Altura (m) x Altura (m)</li>
            <li><strong>Peso máximo saudável</strong> = 24,9 x Altura (m) x Altura (m)</li>
          </ul>

          <h3>Exemplos práticos por altura</h3>
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
          <p>Para calcular seu IMC atual e ver em qual faixa você se encontra, use nossa <a href="/saude/imc">calculadora de IMC</a>.</p>

          <h2>Fórmulas clínicas: Devine, Robinson e Miller</h2>
          <p>Além da abordagem pelo IMC, existem <strong>fórmulas clínicas</strong> desenvolvidas para estimar o peso ideal em contextos hospitalares, especialmente para ajuste de doses de medicamentos. As três mais utilizadas na prática médica são:</p>
          <ol>
            <li><strong>Fórmula de Devine (1974):</strong> a mais antiga e ainda amplamente usada em farmacologia. Para homens: 50 kg + 2,3 kg para cada polegada acima de 5 pés (152,4 cm). Para mulheres: 45,5 kg + 2,3 kg para cada polegada acima de 5 pés. Se precisar converter polegadas para centímetros, utilize nosso <a href="/conversores/conversor-unidades">conversor de unidades</a>.</li>
            <li><strong>Fórmula de Robinson (1983):</strong> versão revisada com ajustes diferentes por sexo. Para homens: 52 kg + 1,9 kg/polegada acima de 5 pés. Para mulheres: 49 kg + 1,7 kg/polegada acima de 5 pés.</li>
            <li><strong>Fórmula de Miller (1983):</strong> para homens: 56,2 kg + 1,41 kg/polegada acima de 5 pés. Para mulheres: 53,1 kg + 1,36 kg/polegada acima de 5 pés.</li>
          </ol>
          <p><em>Nota:</em> as três fórmulas foram baseadas em amostras populacionais distintas, o que explica a divergência de alguns quilogramas entre os resultados. Na prática clínica, a fórmula de Devine continua sendo a referência mais comum para cálculo de dosagem de medicamentos.</p>

          <h2>Como interpretar os resultados e agir com inteligência</h2>
          <p>O resultado da calculadora de peso ideal deve ser usado como <strong>ponto de partida</strong> para uma reflexão sobre sua saúde, e não como meta absoluta. Veja como aproveitar melhor essa informação:</p>
          <ul>
            <li><strong>Compare múltiplas métricas:</strong> combine o peso ideal com o <a href="/saude/imc">cálculo do IMC</a> e, se possível, com a medida da circunferência abdominal. A gordura visceral (acima de 94 cm para homens e 80 cm para mulheres) é um fator de risco cardiovascular independente do peso.</li>
            <li><strong>Entenda suas necessidades calóricas:</strong> saber o peso ideal sem conhecer o gasto calórico diário dificulta qualquer plano alimentar. Use a <a href="/saude/calorias-tmb">calculadora de calorias e TMB</a> para descobrir quantas calorias seu corpo precisa.</li>
            <li><strong>Considere sua composição corporal:</strong> duas pessoas com o mesmo peso e altura podem ter perfis de saúde completamente diferentes. Um atleta com 85 kg de massa muscular não é comparável a um sedentário com 85 kg de gordura.</li>
            <li><strong>Acompanhe a tendência:</strong> um valor isolado diz pouco. Monitore seu peso ao longo de semanas e meses para identificar tendências de ganho ou perda.</li>
          </ul>

          <h2>Limitações importantes do conceito de peso ideal</h2>
          <p>Tanto o IMC quanto as fórmulas clínicas possuem limitações significativas que você deve conhecer:</p>
          <ul>
            <li><strong>Não distinguem gordura de músculo:</strong> um fisiculturista pode estar acima do &ldquo;peso ideal&rdquo; calculado sem nenhum excesso de gordura.</li>
            <li><strong>Não consideram a distribuição de gordura:</strong> onde a gordura está localizada importa mais do que a quantidade total. Gordura abdominal é mais perigosa que gordura nos quadris e coxas.</li>
            <li><strong>Variações étnicas:</strong> as fórmulas foram desenvolvidas com base em populações ocidentais. Populações asiáticas podem apresentar riscos metabólicos com pesos mais baixos, enquanto populações afrodescendentes podem ter maior densidade óssea.</li>
            <li><strong>Idade e sexo:</strong> idosos naturalmente perdem massa muscular (sarcopenia), o que pode fazer o peso parecer &ldquo;adequado&rdquo; mesmo com excesso de gordura. Mulheres gestantes devem usar a <a href="/saude/gestacional">calculadora gestacional</a> em vez do peso ideal convencional.</li>
          </ul>
          <p>Para uma avaliação completa da composição corporal e do risco cardiovascular, consulte um médico ou nutricionista. Use nossas calculadoras como ferramentas informativas para uma conversa mais produtiva com seu profissional de saúde. Para calcular proporções e variações percentuais, a <a href="/matematica/porcentagem">calculadora de porcentagem</a> pode ser útil.</p>
        </>
      }
    >
      <PesoIdealForm />
    </CalculatorPage>
  )
}
