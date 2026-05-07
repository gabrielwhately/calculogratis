import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorCNPJForm } from '@/components/calculadoras/gerador-cnpj-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-cnpj')

export default function GeradorCNPJPage() {
  return (
    <CalculatorPage
      slug="gerador-cnpj"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de CNPJ"
      descricao="Gere numeros de CNPJ validos para testes e desenvolvimento de software. Numeros aleatorios que nao pertencem a nenhuma empresa."
      conteudo={
        <>
          <h2>Para que serve?</h2>
          <p>O gerador cria numeros validos segundo o algoritmo de digitos verificadores. Util para <strong>testes de software</strong> que exigem CNPJ em formularios e integracoes.</p>
          <h2>Estrutura do CNPJ</h2>
          <p>O CNPJ possui 14 digitos: 8 para a empresa, 4 para a filial (0001=matriz) e 2 verificadores.</p>
        </>
      }
    >
      <GeradorCNPJForm />
    </CalculatorPage>
  )
}
