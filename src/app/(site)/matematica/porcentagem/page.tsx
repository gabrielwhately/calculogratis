import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { PorcentagemForm } from '@/components/calculadoras/porcentagem-form'

export const metadata: Metadata = createCalculadoraMetadata('porcentagem')

export default function PorcentagemPage() {
  return (
    <CalculatorPage
      slug="porcentagem"
      categoriaSlug="matematica"
      categoriaNome="Matemática"
      nome="Porcentagem"
      descricao="Quanto é 15% de R$ 2.400? E se o produto subiu de R$ 80 para R$ 110, qual foi o aumento? Resolve desconto, aumento, variação percentual e mais."
      faqs={[
        { question: 'Como calcular porcentagem?', answer: 'Multiplique o valor por X e divida por 100. Por exemplo, 15% de R$ 200 = 200 × 15 ÷ 100 = R$ 30,00. Ou simplesmente: mova a vírgula dois casas e multiplique.' },
        { question: 'Como calcular desconto em porcentagem?', answer: 'Subtraia a porcentagem do valor original. Com 20% de desconto em R$ 100, você paga R$ 80. Na prática: multiplique por (1 - 0,20), ou seja, por 0,80. Mais direto para calcular de cabeça.' },
        { question: 'Como calcular a variação percentual?', answer: 'Use (Final - Inicial) ÷ Inicial × 100. Se um produto foi de R$ 80 para R$ 100, a variação é (100 - 80) ÷ 80 × 100 = 25%. Funciona tanto para aumento quanto para queda — resultado negativo indica redução.' },
      ]}
      conteudo={
        <>
          <h2>Os cinco tipos de cálculo de porcentagem</h2>
          <p>Esta calculadora cobre os cenários mais comuns que envolvem <strong>cálculo de porcentagem</strong> no dia a dia. Selecione o modo desejado e preencha os campos para obter o resultado instantaneamente:</p>
          <ul>
            <li><strong>Porcentagem de um valor:</strong> quanto é X% de Y? Exemplo: 15% de R$ 2.400 = R$ 360,00.</li>
            <li><strong>Aumento percentual:</strong> Y acrescido de X%. Usado para reajustes salariais, correções de preço e atualizações contratuais.</li>
            <li><strong>Desconto percentual:</strong> Y menos X%. Ideal para calcular promoções, liquidações e abatimentos.</li>
            <li><strong>Variação percentual:</strong> de um valor para outro, qual foi a variação em porcentagem? Funciona tanto para aumento quanto para queda.</li>
            <li><strong>Representação:</strong> X corresponde a quantos por cento de Y? Usado para analisar participação proporcional.</li>
          </ul>
          <p>Para cálculos que envolvem proporções entre grandezas diferentes, a <a href="/matematica/regra-de-tres">Calculadora de Regra de Três</a> pode ser mais apropriada, especialmente quando as relações não são percentuais diretas.</p>

          <h2>Fórmulas de porcentagem explicadas</h2>
          <p>Entender a fórmula por trás de cada cálculo ajuda a resolver qualquer situação, mesmo sem calculadora:</p>
          <ol>
            <li><strong>Porcentagem de um valor:</strong> X% de Y = (Y x X) / 100</li>
            <li><strong>Aumento:</strong> Y + X% = Y x (1 + X / 100)</li>
            <li><strong>Desconto:</strong> Y - X% = Y x (1 - X / 100)</li>
            <li><strong>Variação:</strong> ((Valor Final - Valor Inicial) / Valor Inicial) x 100</li>
            <li><strong>Representação:</strong> (X / Y) x 100</li>
          </ol>
          <p>Essas mesmas fórmulas são a base de cálculos financeiros mais avançados. A <a href="/financeiro/juros-simples">Calculadora de Juros Simples</a>, por exemplo, usa a porcentagem aplicada ao longo do tempo para determinar o rendimento de um investimento ou o custo de um empréstimo.</p>

          <h2>Exemplos práticos do cotidiano</h2>
          <p>A porcentagem está presente em praticamente todas as decisões financeiras do dia a dia. Veja alguns exemplos concretos:</p>
          <ul>
            <li><strong>Reajuste salarial:</strong> salário de R$ 3.500 com aumento de 8% resulta em R$ 3.780,00. Para ver quanto fica líquido após descontos, use a <a href="/trabalhista/salario-liquido">Calculadora de Salário Líquido</a>.</li>
            <li><strong>Desconto em compras:</strong> produto de R$ 320 com 30% de desconto sai por R$ 224,00.</li>
            <li><strong>Inflação:</strong> se um item subiu de R$ 5,20 para R$ 6,10, a variação foi de 17,3%.</li>
            <li><strong>Composição de custos:</strong> se o aluguel representa R$ 1.800 de um salário de R$ 6.000, ele consome 30% da renda.</li>
          </ul>

          <h3>Porcentagem em contextos financeiros e jurídicos</h3>
          <p>O conceito de porcentagem é fundamental em diversas áreas além do cotidiano pessoal. Na esfera financeira, taxas de juros, rendimentos de investimentos e <a href="/financeiro/conversor-taxas">conversão de taxas</a> entre períodos diferentes dependem diretamente de cálculos percentuais. No campo jurídico, a <a href="/juridica/multa-atraso">multa por atraso</a> de 2% prevista no CDC e os juros de mora de 1% ao mês são exemplos de porcentagens aplicadas legalmente.</p>
          <p>Na previdência, o cálculo do benefício de <a href="/previdencia/aposentadoria">aposentadoria</a> parte de 60% da média salarial, acrescido de 2% por ano excedente de contribuição — mais um caso onde dominar porcentagem faz diferença real no planejamento de vida.</p>

          <h2>Dica: como calcular porcentagem de cabeça</h2>
          <p>Existem truques simples para estimar porcentagens mentalmente:</p>
          <ul>
            <li><strong>10%:</strong> basta dividir por 10. Exemplo: 10% de R$ 450 = R$ 45.</li>
            <li><strong>5%:</strong> calcule 10% e divida por 2. Exemplo: 5% de R$ 450 = R$ 22,50.</li>
            <li><strong>25%:</strong> divida por 4. Exemplo: 25% de R$ 200 = R$ 50.</li>
            <li><strong>1%:</strong> divida por 100 (mova a vírgula duas casas). Exemplo: 1% de R$ 3.000 = R$ 30.</li>
          </ul>
          <p>Combinando essas referências, você consegue estimar rapidamente qualquer porcentagem. Para cálculos que exigem mais precisão, especialmente envolvendo expressões matemáticas complexas, a <a href="/matematica/calculadora-cientifica">Calculadora Científica</a> oferece todas as funções necessárias.</p>
        </>
      }
    >
      <PorcentagemForm />
    </CalculatorPage>
  )
}
