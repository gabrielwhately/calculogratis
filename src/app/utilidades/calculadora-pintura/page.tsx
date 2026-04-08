import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CalculadoraPinturaForm } from '@/components/calculadoras/calculadora-pintura-form'

export const metadata: Metadata = createCalculadoraMetadata('calculadora-pintura')

export default function CalculadoraPinturaPage() {
  return (
    <CalculatorPage
      slug="calculadora-pintura"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Pintura"
      descricao="Calcule quantos litros de tinta voce precisa para pintar um comodo. Desconta portas e janelas automaticamente."
      conteudo={
        <>
          <h2>Como calcular a quantidade de tinta</h2>
          <p>Para calcular a tinta necessaria, voce precisa saber a <strong>area das paredes</strong> a serem pintadas. A formula basica e:</p>
          <p><strong>Area = 2 x (Largura + Comprimento) x Altura</strong></p>
          <p>Depois, desconte a area das portas (tipicamente 0,80 x 2,10m = 1,68 m²) e janelas (tipicamente 1,20 x 1,00m = 1,20 m²). Multiplique pelo numero de demaos e divida pelo rendimento da tinta.</p>

          <h2>Rendimento medio das tintas</h2>
          <ul>
            <li><strong>Tinta latex economica:</strong> 6-8 m²/litro por demao</li>
            <li><strong>Tinta latex standard:</strong> 8-10 m²/litro por demao</li>
            <li><strong>Tinta latex premium:</strong> 10-14 m²/litro por demao</li>
            <li><strong>Tinta acrilica:</strong> 8-12 m²/litro por demao</li>
          </ul>
          <p>Tintas de melhor qualidade geralmente cobrem mais por litro e exigem menos demaos, compensando o preco mais alto.</p>

          <h2>Quantas demaos sao necessarias?</h2>
          <ul>
            <li><strong>2 demaos:</strong> situacao padrao, mesma cor ou tom proximo</li>
            <li><strong>3 demaos:</strong> mudanca de cor drastica (ex: escuro para claro) ou parede irregular</li>
            <li><strong>1 demao:</strong> apenas retoques ou aplicacao de selador</li>
          </ul>
          <p>Dica: sempre use <strong>selador</strong> ou <strong>fundo preparador</strong> antes da tinta em paredes novas — isso melhora a aderencia e reduz o consumo de tinta.</p>
        </>
      }
    >
      <CalculadoraPinturaForm />
    </CalculatorPage>
  )
}
