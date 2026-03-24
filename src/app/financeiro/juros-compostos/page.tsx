import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { JurosCompostosForm } from '@/components/calculadoras/juros-compostos-form'

export const metadata: Metadata = createCalculadoraMetadata('juros-compostos')

export default function JurosCompostosPage() {
  return (
    <CalculatorPage
      slug="juros-compostos"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Juros Compostos"
      descricao="Simule juros compostos com aportes mensais. Ideal para planejar investimentos e entender o crescimento do seu dinheiro ao longo do tempo."
      conteudo={
        <>
          <h2>Como funcionam os juros compostos?</h2>
          <p>Os juros compostos sao calculados sobre o montante acumulado, ou seja, juros sobre juros. A formula e: <strong>M = C x (1 + i)^t</strong>. Quando ha aportes mensais, cada aporte tambem rende juros compostos.</p>
          <h2>Por que os juros compostos sao importantes?</h2>
          <p>O efeito dos juros compostos se torna mais poderoso com o tempo. Quanto mais cedo voce comecar a investir, maior sera o efeito multiplicador sobre o seu patrimonio.</p>
        </>
      }
    >
      <JurosCompostosForm />
    </CalculatorPage>
  )
}
