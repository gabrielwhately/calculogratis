import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SeguroDesempregoForm } from '@/components/calculadoras/seguro-desemprego-form'

export const metadata: Metadata = createCalculadoraMetadata('seguro-desemprego')

export default function SeguroDesempregoPage() {
  return (
    <CalculatorPage
      slug="seguro-desemprego"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Seguro Desemprego"
      descricao="Calcule o valor e o numero de parcelas do seguro desemprego com base nos seus ultimos salarios."
      conteudo={
        <>
          <h2>Como funciona o seguro desemprego?</h2>
          <p>O seguro desemprego e pago ao trabalhador demitido sem justa causa. O valor e calculado com base na media dos ultimos 3 salarios. O numero de parcelas varia: 4 na primeira solicitacao, 5 a partir da segunda.</p>
          <h2>Quem tem direito?</h2>
          <p>Trabalhador com carteira assinada demitido sem justa causa, que nao possua renda propria e que tenha trabalhado pelo menos 12 meses nos ultimos 18 meses (primeira solicitacao).</p>
        </>
      }
    >
      <SeguroDesempregoForm />
    </CalculatorPage>
  )
}
