import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FeriasForm } from '@/components/calculadoras/ferias-form'

export const metadata: Metadata = createCalculadoraMetadata('ferias')

export default function FeriasPage() {
  return (
    <CalculatorPage
      slug="ferias"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Férias Trabalhistas"
      descricao="Suas férias estão chegando — ou você quer vender dias? Calcule o valor líquido a receber com o 1/3 constitucional, abono pecuniário e os descontos de INSS e IR pela tabela de 2026."
      faqs={[
        { question: 'Como é calculado o valor das férias?', answer: 'O salário proporcional aos dias de descanso mais o 1/3 constitucional formam a base bruta. Sobre esse total incidem INSS e IRRF pelas tabelas progressivas de 2026. O resultado é o valor líquido que cai na conta — e costuma ser bem diferente do salário mensal normal, já que o 1/3 eleva a base do IR.' },
        { question: 'O que é o abono pecuniário?', answer: 'É a possibilidade de vender até 10 dias das suas férias para o empregador. Você recebe o valor desses 10 dias mais o 1/3 constitucional em cima deles, e o melhor: esse abono é isento de INSS e IRRF. O pedido precisa ser feito até 15 dias antes do fim do período aquisitivo.' },
        { question: 'Quando devo receber o pagamento das férias?', answer: 'O empregador é obrigado a pagar até 2 dias antes do início do descanso, conforme o artigo 145 da CLT. Se o pagamento atrasar, você tem direito a receber em dobro — é uma das regras trabalhistas mais descumpridas e menos cobradas.' },
      ]}
      conteudo={
        <>
          <h2>Como calcular o valor das férias trabalhistas em 2026</h2>
          <p>As férias remuneradas são um direito garantido pela <strong>Constituição Federal</strong> e pela CLT. O cálculo envolve o salário proporcional aos dias de descanso, acrescido do <strong>terço constitucional</strong> (1/3 do valor), com descontos de INSS e <a href="/trabalhista/irrf">Imposto de Renda</a> conforme as tabelas progressivas de 2026. Para muitos trabalhadores, o valor das férias é uma surpresa — tanto pela bonificação do 1/3 quanto pelo desconto de IR proporcionalmente maior.</p>

          <h3>Por que o valor das férias difere do salário mensal</h3>
          <p>O acréscimo de 1/3 constitucional eleva a base de cálculo dos tributos. Na prática, isso significa que:</p>
          <ul>
            <li>Um trabalhador com salário de <strong>R$ 3.000</strong> recebe <strong>R$ 4.000 brutos</strong> de férias (salário + 1/3).</li>
            <li>Essa base mais alta pode fazer o IRRF pular para uma faixa superior, resultando em desconto proporcionalmente maior que o do mês normal.</li>
            <li>Mesmo assim, o valor líquido das férias é <em>sempre</em> superior ao salário líquido mensal, graças ao 1/3 adicional.</li>
          </ul>
          <p>Use nossa calculadora para ver exatamente quanto cairá na sua conta, já com todos os descontos aplicados.</p>

          <h3>Abono pecuniário: quando vale a pena vender férias</h3>
          <p>O abono pecuniário permite ao trabalhador <strong>converter até 10 dias</strong> de férias em dinheiro. O grande diferencial financeiro é que o valor do abono, incluindo o respectivo 1/3, é <strong>isento de INSS e IRRF</strong>. Antes de decidir, considere:</p>
          <ol>
            <li><strong>Vantagem financeira:</strong> o abono entra como valor líquido integral, sem descontos. Para quem está em faixas mais altas do IR, a economia é significativa.</li>
            <li><strong>Menos descanso:</strong> você ficará com apenas 20 dias de férias. Para quem planejou uma viagem longa, pode não compensar.</li>
            <li><strong>Prazo:</strong> o pedido precisa ser feito até <em>15 dias antes do fim do período aquisitivo</em>.</li>
          </ol>
          <p>Se a sua prioridade é maximizar o valor recebido, o abono tende a ser vantajoso. Se a prioridade é descanso e recuperação, os 30 dias completos fazem mais sentido.</p>

          <h3>Férias fracionadas: como funciona o parcelamento</h3>
          <p>Desde a reforma trabalhista de 2017, as férias podem ser divididas em <strong>até 3 períodos</strong>, desde que:</p>
          <ul>
            <li>Um dos períodos tenha no mínimo <strong>14 dias corridos</strong>.</li>
            <li>Os demais períodos tenham no mínimo <strong>5 dias corridos</strong> cada.</li>
            <li>Haja concordância do empregado (o empregador não pode impor o fracionamento).</li>
          </ul>
          <p>Essa flexibilidade permite ao trabalhador distribuir melhor o descanso ao longo do ano, sem perder nenhum direito financeiro. O valor total das férias permanece o mesmo, independentemente do fracionamento.</p>

          <h3>Prazos e penalidades</h3>
          <p>O empregador deve respeitar regras importantes sob risco de penalidades:</p>
          <ul>
            <li><strong>Pagamento antecipado:</strong> o valor das férias deve ser depositado até <em>2 dias antes</em> do início do período de descanso (art. 145 da CLT). Atraso gera pagamento em dobro.</li>
            <li><strong>Período concessivo:</strong> as férias devem ser concedidas nos 12 meses seguintes ao período aquisitivo. Se vencer esse prazo, o empregador deve pagar as férias em <strong>dobro</strong>.</li>
          </ul>
          <p>Quer calcular outras verbas do seu contrato de trabalho? Confira também a <a href="/trabalhista/salario-liquido">calculadora de salário líquido</a>, o <a href="/trabalhista/decimo-terceiro">cálculo do 13º salário</a> e a <a href="/trabalhista/rescisao">simulação de rescisão trabalhista</a>.</p>
        </>
      }
    >
      <FeriasForm />
    </CalculatorPage>
  )
}
