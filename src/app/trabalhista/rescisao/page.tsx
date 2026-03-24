import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { RescisaoForm } from '@/components/calculadoras/rescisao-form'

export const metadata: Metadata = createCalculadoraMetadata('rescisao')

export default function RescisaoPage() {
  return (
    <CalculatorPage
      slug="rescisao"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Rescisao Trabalhista"
      descricao="Calcule o valor da sua rescisao trabalhista. Simule para demissao sem justa causa, pedido de demissao, justa causa e acordo mutuo."
      conteudo={
        <>
          <h2>O que e a rescisao trabalhista?</h2>
          <p>A rescisao trabalhista e o encerramento do contrato de trabalho. Dependendo do tipo de demissao, o trabalhador tem direito a diferentes verbas rescisorias como saldo de salario, aviso previo, ferias proporcionais, 13o salario proporcional e multa de 40% do FGTS.</p>
          <h2>Tipos de demissao</h2>
          <p><strong>Sem justa causa:</strong> todas as verbas rescisorias incluindo multa de 40% do FGTS. <strong>Por justa causa:</strong> apenas saldo de salario e ferias vencidas. <strong>Pedido de demissao:</strong> sem multa FGTS. <strong>Acordo mutuo:</strong> multa de 20% do FGTS e aviso previo de 50%.</p>
        </>
      }
    >
      <RescisaoForm />
    </CalculatorPage>
  )
}
