import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FinanciamentoForm } from '@/components/calculadoras/financiamento-form'

export const metadata: Metadata = createCalculadoraMetadata('financiamento')

export default function FinanciamentoPage() {
  return (
    <CalculatorPage
      slug="financiamento"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Financiamento Imobiliario"
      descricao="Simule seu financiamento imobiliario nas tabelas Price e SAC. Compare parcelas, juros totais e escolha a melhor opcao."
      conteudo={
        <>
          <h2>Tabela Price vs SAC</h2>
          <p>Na <strong>Tabela Price</strong>, as parcelas sao fixas durante todo o financiamento. Na <strong>Tabela SAC</strong>, a amortizacao e fixa e os juros diminuem, resultando em parcelas decrescentes e menos juros totais.</p>
          <h2>Como escolher?</h2>
          <p>Se voce busca parcelas menores no inicio, Price pode ser mais adequada. Se quer pagar menos juros no total, SAC e a melhor escolha.</p>
        </>
      }
    >
      <FinanciamentoForm />
    </CalculatorPage>
  )
}
