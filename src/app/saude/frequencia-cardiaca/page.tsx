import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FrequenciaCardiacaForm } from '@/components/calculadoras/frequencia-cardiaca-form'

export const metadata: Metadata = createCalculadoraMetadata('frequencia-cardiaca')

export default function FrequenciaCardiacaPage() {
  return (
    <CalculatorPage
      slug="frequencia-cardiaca"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Frequencia Cardiaca"
      descricao="Calcule sua frequencia cardiaca maxima e as zonas de treino ideais. Baseado na formula de Tanaka e metodo Karvonen."
      conteudo={
        <>
          <h2>Zonas de frequencia cardiaca para treino</h2>
          <p>Treinar na <strong>zona de frequencia cardiaca</strong> correta e fundamental para atingir seus objetivos. Cada zona corresponde a um nivel de intensidade com beneficios especificos:</p>
          <ul>
            <li><strong>Zona 1 (50-60%):</strong> Aquecimento e recuperacao ativa. Ideal para iniciantes e dias de descanso ativo.</li>
            <li><strong>Zona 2 (60-70%):</strong> Queima de gordura. O corpo usa proporcionalmente mais gordura como combustivel.</li>
            <li><strong>Zona 3 (70-80%):</strong> Aerobico. Melhora a capacidade cardiovascular e resistencia.</li>
            <li><strong>Zona 4 (80-90%):</strong> Limiar anaerobico. Aumenta a tolerancia ao lactato e a velocidade.</li>
            <li><strong>Zona 5 (90-100%):</strong> VO2 Maximo. Esforco maximo para sprints e treinos intervalados.</li>
          </ul>

          <h2>Formula de Tanaka vs. 220 - idade</h2>
          <p>A formula classica <strong>220 - idade</strong> e amplamente conhecida mas imprecisa. Esta calculadora usa a <strong>formula de Tanaka (2001)</strong>: <em>FCmax = 208 - 0,7 x idade</em>, que demonstrou maior precisao em estudos cientificos, especialmente para pessoas acima de 40 anos.</p>
          <p>As zonas de treino sao calculadas pelo <strong>metodo Karvonen</strong>, que considera a frequencia cardiaca de repouso para maior personalizacao.</p>

          <h2>Como medir a FC de repouso</h2>
          <p>Meca sua frequencia cardiaca de repouso pela manha, antes de levantar da cama. Conte as batidas no pulso por 60 segundos. Faca isso por 3 dias e use a media. Valores tipicos: 60-100 bpm (adultos); atletas podem ter 40-60 bpm.</p>
          <p>Confira tambem: <a href="/saude/imc">calculadora de IMC</a>, <a href="/saude/calorias-tmb">calorias e TMB</a> e <a href="/saude/calculadora-macros">calculadora de macros</a>.</p>
        </>
      }
    >
      <FrequenciaCardiacaForm />
    </CalculatorPage>
  )
}
