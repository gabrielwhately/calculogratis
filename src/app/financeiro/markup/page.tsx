import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { MarkupForm } from '@/components/calculadoras/markup-form'

export const metadata: Metadata = createCalculadoraMetadata('markup')

export default function MarkupPage() {
  return (
    <CalculatorPage
      slug="markup"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Markup"
      descricao="Calcule o preco de venda ideal a partir do custo do produto. Descubra o markup, a margem de lucro e o lucro por unidade."
      conteudo={
        <>
          <h2>O que e markup e como calcular</h2>
          <p>O <strong>markup</strong> e um indice multiplicador aplicado sobre o custo de um produto ou servico para definir o preco de venda. Ele garante que o preco final cubra todos os custos e ainda gere lucro. A formula basica e:</p>
          <p><strong>Preco de Venda = Custo x (1 + Markup / 100)</strong></p>
          <p>Por exemplo, se um produto custa R$ 50 e voce aplica um markup de 100%, o preco de venda sera R$ 100, gerando R$ 50 de lucro por unidade.</p>

          <h2>Diferenca entre markup e margem de lucro</h2>
          <p>Essa e uma confusao muito comum. O <strong>markup</strong> e calculado sobre o <em>custo</em>, enquanto a <strong>margem de lucro</strong> e calculada sobre o <em>preco de venda</em>:</p>
          <ul>
            <li><strong>Markup:</strong> (Lucro / Custo) x 100</li>
            <li><strong>Margem:</strong> (Lucro / Preco de Venda) x 100</li>
          </ul>
          <p>Um markup de 100% equivale a uma margem de 50%. Um markup de 50% equivale a uma margem de 33,3%. Confundir os dois pode levar a precificacao errada e prejuizos.</p>

          <h2>Como definir o markup ideal para seu negocio</h2>
          <p>O markup ideal depende do setor, da concorrencia e dos custos operacionais. Em geral:</p>
          <ul>
            <li><strong>Varejo de alimentos:</strong> markup de 30% a 50%</li>
            <li><strong>Vestuario:</strong> markup de 100% a 200%</li>
            <li><strong>Eletronicos:</strong> markup de 20% a 40%</li>
            <li><strong>Servicos:</strong> markup de 50% a 150%</li>
          </ul>
          <p>Alem do custo direto do produto, considere custos fixos (aluguel, salarios), impostos e a margem de lucro desejada. Use nosso <a href="/financeiro/calculadora-desconto">calculador de desconto</a> para simular promocoes sem prejudicar a rentabilidade.</p>
        </>
      }
    >
      <MarkupForm />
    </CalculatorPage>
  )
}
