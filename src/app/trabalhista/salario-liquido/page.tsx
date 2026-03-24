import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SalarioLiquidoForm } from '@/components/calculadoras/salario-liquido-form'

export const metadata: Metadata = createCalculadoraMetadata('salario-liquido')

export default function SalarioLiquidoPage() {
  return (
    <CalculatorPage
      slug="salario-liquido"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Salario Liquido"
      descricao="Descubra quanto voce realmente recebe. Calculo automatico de INSS, IRRF e descontos do seu salario bruto."
      conteudo={
        <>
          <h2>Como e calculado o salario liquido?</h2>
          <p>O salario liquido e o valor apos descontos de INSS e IRRF. O INSS e progressivo (7,5% a 14%) e o IRRF tambem (0% a 27,5%), apos deduzir o INSS e valor por dependente.</p>
          <h2>O que pode ser deduzido?</h2>
          <p>Alem do INSS, cada dependente gera uma deducao fixa na base de calculo do IRRF. Pensao alimenticia judicial tambem e dedutivel.</p>
        </>
      }
    >
      <SalarioLiquidoForm />
    </CalculatorPage>
  )
}
