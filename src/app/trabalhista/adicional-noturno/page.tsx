import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { AdicionalNoturnoForm } from '@/components/calculadoras/adicional-noturno-form'

export const metadata: Metadata = createCalculadoraMetadata('adicional-noturno')

export default function AdicionalNoturnoPage() {
  return (
    <CalculatorPage
      slug="adicional-noturno"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Adicional Noturno"
      descricao="Calcule o valor do adicional noturno sobre seu salario. Inclui hora noturna reduzida conforme a CLT (52 minutos e 30 segundos)."
      conteudo={
        <>
          <h2>O que e o adicional noturno e quem tem direito</h2>
          <p>O <strong>adicional noturno</strong> e um acrescimo no valor da hora de trabalho para quem exerce atividades no periodo noturno. Pela <strong>CLT (Art. 73)</strong>, o trabalho noturno urbano compreende o periodo entre <strong>22h e 5h</strong>. O adicional minimo e de <strong>20%</strong> sobre a hora diurna.</p>

          <h2>Hora noturna reduzida</h2>
          <p>Um diferencial importante: a hora noturna na CLT nao tem 60 minutos, e sim <strong>52 minutos e 30 segundos</strong>. Isso significa que 7 horas trabalhadas no periodo noturno equivalem a 8 horas normais. Essa reducao e automaticamente aplicada no calculo desta calculadora.</p>
          <p>Na pratica, isso beneficia o trabalhador duplamente: alem de receber o adicional de 20%, cada hora noturna trabalhada e computada como mais tempo para efeitos de jornada e horas extras.</p>

          <h2>Regras especificas por categoria</h2>
          <ul>
            <li><strong>Trabalhador urbano (CLT):</strong> 22h as 5h, adicional de 20%, hora de 52min30s</li>
            <li><strong>Trabalhador rural (lavoura):</strong> 21h as 5h, adicional de 25%</li>
            <li><strong>Trabalhador rural (pecuaria):</strong> 20h as 4h, adicional de 25%</li>
          </ul>
          <p>Confira tambem nossa <a href="/trabalhista/hora-extra">calculadora de hora extra</a> e a <a href="/trabalhista/salario-liquido">calculadora de salario liquido</a> para um panorama completo dos seus rendimentos.</p>
        </>
      }
    >
      <AdicionalNoturnoForm />
    </CalculatorPage>
  )
}
