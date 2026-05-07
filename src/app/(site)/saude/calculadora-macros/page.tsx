import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CalculadoraMacrosForm } from '@/components/calculadoras/calculadora-macros-form'

export const metadata: Metadata = createCalculadoraMetadata('calculadora-macros')

export default function CalculadoraMacrosPage() {
  return (
    <CalculatorPage
      slug="calculadora-macros"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Macronutrientes"
      descricao="Calcule a quantidade ideal de proteinas, carboidratos e gorduras para seu objetivo. Baseado na equacao de Mifflin-St Jeor."
      conteudo={
        <>
          <h2>O que sao macronutrientes</h2>
          <p>Os <strong>macronutrientes</strong> sao os tres grandes grupos de nutrientes que fornecem energia ao corpo: <strong>proteinas</strong>, <strong>carboidratos</strong> e <strong>gorduras</strong>. Cada grama fornece uma quantidade diferente de calorias:</p>
          <ul>
            <li><strong>Proteina:</strong> 4 calorias por grama</li>
            <li><strong>Carboidrato:</strong> 4 calorias por grama</li>
            <li><strong>Gordura:</strong> 9 calorias por grama</li>
          </ul>

          <h2>Como a calculadora funciona</h2>
          <p>Esta calculadora usa a <strong>equacao de Mifflin-St Jeor</strong> para estimar sua Taxa Metabolica Basal (TMB), que e a quantidade de calorias que seu corpo gasta em repouso. Em seguida, ajusta pelo nivel de atividade fisica e pelo objetivo (emagrecer, manter ou ganhar massa).</p>
          <p>A distribuicao de macros e adaptada ao seu objetivo:</p>
          <ul>
            <li><strong>Emagrecer:</strong> mais proteina (2g/kg) para preservar massa muscular, deficit de 500 kcal</li>
            <li><strong>Manter:</strong> distribuicao equilibrada (1,6g/kg de proteina)</li>
            <li><strong>Ganhar massa:</strong> alta proteina (2,2g/kg), superavit de 300 kcal</li>
          </ul>

          <h2>Dicas para seguir seus macros</h2>
          <p>Atingir os macros ideais no dia a dia pode parecer complicado, mas algumas estrategias ajudam:</p>
          <ul>
            <li>Priorize <strong>proteina</strong> em cada refeicao (ovos, frango, peixe, leguminosas)</li>
            <li>Escolha <strong>carboidratos complexos</strong> (arroz integral, aveia, batata doce)</li>
            <li>Inclua <strong>gorduras saudaveis</strong> (azeite, castanhas, abacate)</li>
            <li>Use um aplicativo de rastreamento alimentar nas primeiras semanas</li>
          </ul>
          <p>Confira tambem: <a href="/saude/calorias-tmb">calculadora de calorias e TMB</a>, <a href="/saude/imc">calculadora de IMC</a> e <a href="/saude/agua-diaria">calculadora de agua diaria</a>.</p>
        </>
      }
    >
      <CalculadoraMacrosForm />
    </CalculatorPage>
  )
}
