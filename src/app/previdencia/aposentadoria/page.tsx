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
          <h2>Regras apos a Reforma (EC 103/2019)</h2>
          <p>Idade minima: <strong>65 anos (homens)</strong> e <strong>62 anos (mulheres)</strong>. Tempo minimo de contribuicao: 20 anos (homens) e 15 anos (mulheres). O beneficio parte de 60% da media salarial, com acrescimo de 2% por ano extra de contribuicao.</p>
          <h2>Como e calculada a media?</h2>
          <p>A media considera 80% dos maiores salarios de contribuicao desde julho de 1994.</p>
        </>
      }
    >
      <AposentadoriaForm />
    </CalculatorPage>
  )
}
