import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorCPFForm } from '@/components/calculadoras/gerador-cpf-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-cpf')

export default function GeradorCPFPage() {
  return (
    <CalculatorPage
      slug="gerador-cpf"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de CPF"
      descricao="Gere numeros de CPF validos para testes e desenvolvimento de software. Numeros aleatorios que nao pertencem a ninguem."
      conteudo={
        <>
          <h2>Para que serve?</h2>
          <p>O gerador cria numeros validos segundo o algoritmo de digitos verificadores da Receita Federal. Os numeros sao totalmente aleatorios e <strong>nao pertencem a nenhuma pessoa real</strong>. Util para desenvolvedores testando formularios e sistemas.</p>
          <h2>Como funciona a validacao?</h2>
          <p>O CPF possui 11 digitos, sendo os 2 ultimos verificadores calculados por algoritmo modulo 11.</p>
        </>
      }
    >
      <GeradorCPFForm />
    </CalculatorPage>
  )
}
