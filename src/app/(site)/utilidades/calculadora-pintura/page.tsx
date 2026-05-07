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
      descricao="Calcule quantos litros de tinta você precisa para pintar um cômodo. Desconta portas e janelas automaticamente."
      conteudo={
        <>
          <h2>Como calcular a quantidade de tinta</h2>
          <p>Para calcular a tinta necessária, você precisa saber a <strong>área das paredes</strong> a serem pintadas. A fórmula básica é:</p>
          <p><strong>Área = 2 x (Largura + Comprimento) x Altura</strong></p>
          <p>Depois, desconte a área das portas (tipicamente 0,80 x 2,10m = 1,68 m²) e janelas (tipicamente 1,20 x 1,00m = 1,20 m²). Multiplique pelo número de demãos e divida pelo rendimento da tinta.</p>

          <h2>Rendimento médio das tintas</h2>
          <ul>
            <li><strong>Tinta látex econômica:</strong> 6-8 m²/litro por demão</li>
            <li><strong>Tinta látex standard:</strong> 8-10 m²/litro por demão</li>
            <li><strong>Tinta látex premium:</strong> 10-14 m²/litro por demão</li>
            <li><strong>Tinta acrílica:</strong> 8-12 m²/litro por demão</li>
          </ul>
          <p>Tintas de melhor qualidade geralmente cobrem mais por litro e exigem menos demãos, compensando o preço mais alto.</p>

          <h2>Quantas demãos são necessárias?</h2>
          <ul>
            <li><strong>2 demãos:</strong> situação padrão, mesma cor ou tom próximo</li>
            <li><strong>3 demãos:</strong> mudança de cor drástica (ex: escuro para claro) ou parede irregular</li>
            <li><strong>1 demão:</strong> apenas retoques ou aplicação de selador</li>
          </ul>
          <p>Dica: sempre use <strong>selador</strong> ou <strong>fundo preparador</strong> antes da tinta em paredes novas — isso melhora a aderência e reduz o consumo de tinta.</p>
        </>
      }
    >
      <CalculadoraPinturaForm />
    </CalculatorPage>
  )
}
