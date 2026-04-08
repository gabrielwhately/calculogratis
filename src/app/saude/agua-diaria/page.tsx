import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { AguaDiariaForm } from '@/components/calculadoras/agua-diaria-form'

export const metadata: Metadata = createCalculadoraMetadata('agua-diaria')

export default function AguaDiariaPage() {
  return (
    <CalculatorPage
      slug="agua-diaria"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Agua Diaria"
      descricao="Descubra quanta agua voce deve beber por dia com base no seu peso e nivel de atividade fisica. Recomendacao personalizada."
      conteudo={
        <>
          <h2>Quanta agua devo beber por dia?</h2>
          <p>A recomendacao geral e de aproximadamente <strong>35 ml de agua por quilo de peso corporal</strong> por dia. Para uma pessoa de 70 kg, isso equivale a cerca de 2,45 litros por dia. Porem, esse valor varia de acordo com o nivel de atividade fisica, clima e condicoes de saude.</p>

          <h2>Fatores que aumentam a necessidade de agua</h2>
          <ul>
            <li><strong>Exercicio fisico:</strong> durante atividades intensas, o corpo perde agua pelo suor. Adicione 500 ml a 1 litro para cada hora de exercicio</li>
            <li><strong>Clima quente:</strong> temperaturas altas aumentam a transpiracao e a necessidade hidrica</li>
            <li><strong>Altitude:</strong> em altitudes elevadas, a respiracao mais rapida aumenta a perda de agua</li>
            <li><strong>Gravidez e amamentacao:</strong> mulheres gravidas devem aumentar a ingestao em cerca de 300 ml/dia, e lactantes em 700 ml/dia</li>
          </ul>

          <h2>Sinais de desidratacao</h2>
          <p>Fique atento a estes sinais de que voce precisa beber mais agua:</p>
          <ul>
            <li>Urina escura ou com cheiro forte</li>
            <li>Boca seca e sede frequente</li>
            <li>Dor de cabeca e fadiga</li>
            <li>Tontura e dificuldade de concentracao</li>
          </ul>
          <p>Manter-se hidratado melhora a disposicao, a pele e o funcionamento dos rins. Use esta calculadora como referencia e ajuste conforme suas necessidades. Confira tambem nossa <a href="/saude/imc">calculadora de IMC</a> e a <a href="/saude/calorias-tmb">calculadora de calorias</a> para um acompanhamento completo da sua saude.</p>
        </>
      }
    >
      <AguaDiariaForm />
    </CalculatorPage>
  )
}
