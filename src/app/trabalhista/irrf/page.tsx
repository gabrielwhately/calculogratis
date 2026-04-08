import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { IRRFForm } from '@/components/calculadoras/irrf-form'

export const metadata: Metadata = createCalculadoraMetadata('irrf')

export default function IRRFPage() {
  return (
    <CalculatorPage
      slug="irrf"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="IRRF (Imposto de Renda)"
      descricao="Quanto do seu salário vai para o Imposto de Renda? Calcule o IRRF com as deduções de INSS, dependentes e pensão alimentícia — tabela progressiva de 2026."
      faqs={[
        { question: 'O que é IRRF?', answer: 'É o Imposto de Renda descontado direto na folha antes de você receber. O empregador recolhe em nome do trabalhador todo mês. O valor varia de zero a 27,5% dependendo da base de cálculo — que é o salário bruto já reduzido pelo INSS e pelas deduções legais.' },
        { question: 'Quem é isento do IRRF?', answer: 'Em 2026, se a base de cálculo mensal ficar abaixo de R$ 2.428,80, o desconto é zero. Essa base é calculada depois de subtrair o INSS e as deduções por dependente. Por isso, alguém que ganha R$ 2.800 mas tem dois filhos dependentes pode pagar pouco ou nada de IR.' },
        { question: 'Como funciona a tabela progressiva?', answer: 'Cada faixa da tabela tem uma alíquota diferente: 7,5%, 15%, 22,5% e 27,5%. Você paga cada alíquota somente sobre a parte da renda que cai naquela faixa específica. Ou seja, ter a base de cálculo em R$ 4.000 não significa pagar 22,5% sobre tudo — apenas sobre o trecho acima de R$ 3.751,05.' },
      ]}
      conteudo={
        <>
          <h2>Como funciona o cálculo do IRRF sobre o salário em 2026</h2>
          <p>O <strong>Imposto de Renda Retido na Fonte (IRRF)</strong> é o desconto mensal que o empregador faz diretamente na folha de pagamento do trabalhador. A base de cálculo <em>não</em> é o salário bruto integral: antes de aplicar a tabela do imposto, são deduzidos o valor do INSS, a quantia por dependentes e eventuais pensões alimentícias judiciais.</p>
          <p>Essa mecânica explica por que dois colegas com o <strong>mesmo salário bruto</strong> podem ter descontos de IR muito diferentes. Nossa calculadora considera todas essas variáveis para entregar o valor exato do imposto retido.</p>

          <h3>Tabela progressiva do IRRF 2026</h3>
          <p>O Imposto de Renda na fonte segue faixas progressivas. Cada alíquota incide <em>apenas</em> sobre a parcela da base de cálculo que se enquadra naquela faixa:</p>
          <ul>
            <li><strong>Isento:</strong> base de cálculo até R$ 2.428,80</li>
            <li><strong>7,5%:</strong> de R$ 2.428,81 a R$ 2.826,65 (parcela a deduzir: R$ 182,16)</li>
            <li><strong>15%:</strong> de R$ 2.826,66 a R$ 3.751,05 (parcela a deduzir: R$ 394,16)</li>
            <li><strong>22,5%:</strong> de R$ 3.751,06 a R$ 4.664,68 (parcela a deduzir: R$ 675,49)</li>
            <li><strong>27,5%:</strong> acima de R$ 4.664,68 (parcela a deduzir: R$ 908,73)</li>
          </ul>
          <p>A parcela a deduzir garante que o imposto seja cobrado apenas sobre o excedente de cada faixa, tornando o sistema verdadeiramente progressivo.</p>

          <h3>Deduções que reduzem a base de cálculo</h3>
          <p>Antes de aplicar a tabela, a base de cálculo do IRRF é reduzida por deduções legais. Conhecer essas possibilidades ajuda a pagar menos imposto de forma legítima:</p>
          <ol>
            <li><strong>Desconto do INSS:</strong> o valor contribuído ao INSS no mês é integralmente subtraído. Quanto maior o salário, maior essa dedução, até o teto de contribuição. Confira detalhes na <a href="/trabalhista/salario-liquido">calculadora de salário líquido</a>.</li>
            <li><strong>Dependentes:</strong> cada dependente reduz a base em <strong>R$ 189,59 por mês</strong>. Podem ser incluídos filhos até 21 anos (ou 24 se universitários), cônjuge sem renda própria e pais idosos sob dependência econômica.</li>
            <li><strong>Pensão alimentícia judicial:</strong> valores pagos por determinação judicial são dedutíveis integralmente da base de cálculo.</li>
          </ol>

          <h3>Exemplo prático: impacto dos dependentes</h3>
          <p>Considere um trabalhador com base de cálculo de <strong>R$ 3.500</strong> (já descontado o INSS):</p>
          <ul>
            <li><strong>Sem dependentes:</strong> a base fica em R$ 3.500 e o IR é de aproximadamente R$ 130,84 por mês.</li>
            <li><strong>Com 2 dependentes:</strong> a base cai para R$ 3.500 - R$ 379,18 = R$ 3.120,82, e o IR baixa para cerca de R$ 74,04 por mês.</li>
            <li><strong>Economia anual:</strong> aproximadamente <strong>R$ 681,60</strong> a menos de imposto.</li>
          </ul>
          <p>Esse tipo de planejamento tributário simples faz diferença real no orçamento familiar. Use nossa calculadora para simular diferentes cenários com seus dados reais.</p>

          <h3>IRRF e outras obrigações do trabalhador</h3>
          <p>O IRRF descontado na fonte é uma antecipação do imposto anual. Na declaração de ajuste anual do Imposto de Renda, o valor retido ao longo do ano pode gerar restituição ou complemento a pagar. Além do salário mensal, o IR também incide sobre:</p>
          <ul>
            <li><a href="/trabalhista/ferias">Férias</a> com o terço constitucional (base maior = IR maior)</li>
            <li><a href="/trabalhista/decimo-terceiro">13º salário</a> (tributado exclusivamente na 2ª parcela)</li>
            <li>Participação nos lucros e resultados (PLR), com tabela própria</li>
            <li>Verbas rescisórias tributáveis na <a href="/trabalhista/rescisao">rescisão trabalhista</a></li>
          </ul>
          <p>Para uma visão completa do impacto tributário na sua remuneração, utilize também a <a href="/matematica/porcentagem">calculadora de porcentagem</a> e o <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para planejar a aplicação dos valores economizados.</p>
        </>
      }
    >
      <IRRFForm />
    </CalculatorPage>
  )
}
