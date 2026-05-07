import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { DecimoTerceiroForm } from '@/components/calculadoras/decimo-terceiro-form'

export const metadata: Metadata = createCalculadoraMetadata('decimo-terceiro')

export default function DecimoTerceiroPage() {
  return (
    <CalculatorPage
      slug="decimo-terceiro"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="13º Salário"
      descricao="Quer saber quanto vai cair na conta no fim do ano? Calcule a 1ª e a 2ª parcela do 13º salário com os descontos reais de INSS e IRRF pela tabela de 2026."
      faqs={[
        { question: 'Quando o 13º salário é pago?', answer: 'A 1ª parcela pode ser antecipada a partir de fevereiro e precisa ser paga até 30 de novembro — muitos empregadores pagam junto com as férias. A 2ª parcela tem data fixa: até 20 de dezembro, já com os descontos de INSS e IRRF sobre o valor total.' },
        { question: 'Como é calculado o 13º proporcional?', answer: 'É simples: salário ÷ 12 × meses trabalhados no ano. Um detalhe importante: mês com 15 dias ou mais trabalhados conta como mês inteiro. Então quem entrou em 16 de janeiro, por exemplo, já conta janeiro na conta — e quem saiu em 14 de dezembro não conta dezembro.' },
        { question: 'Quais descontos incidem sobre o 13º?', answer: 'A 1ª parcela é paga sem nenhum desconto — é literalmente metade do bruto proporcional na conta. Já a 2ª parcela é onde o leão aparece: INSS e IRRF são calculados sobre o valor total do 13º e descontados integralmente nessa segunda liberação.' },
      ]}
      conteudo={
        <>
          <h2>Como funciona o cálculo do 13º salário em 2026</h2>
          <p>O <strong>décimo terceiro salário</strong>, também chamado de gratificação natalina, equivale a <strong>1/12 do salário bruto por mês trabalhado</strong> durante o ano. Quem permaneceu empregado o ano inteiro recebe o equivalente a um salário mensal completo. Quem entrou ou saiu no meio do ano recebe o valor proporcional aos meses efetivamente trabalhados.</p>
          <p>Nossa calculadora diferencia a <strong>1ª e a 2ª parcela</strong>, aplica os descontos de INSS e <a href="/trabalhista/irrf">IRRF</a> pelas tabelas progressivas de 2026 e mostra o valor líquido que será depositado em cada pagamento.</p>

          <h3>1ª parcela vs 2ª parcela: por que os valores diferem</h3>
          <p>Embora sejam nominalmente &ldquo;metades&rdquo; do 13º, os valores líquidos são bem diferentes:</p>
          <ul>
            <li><strong>1ª parcela (até 30 de novembro):</strong> corresponde a 50% do salário bruto proporcional, paga <em>sem nenhum desconto</em>. É o valor integral na conta.</li>
            <li><strong>2ª parcela (até 20 de dezembro):</strong> aqui o INSS e o IRRF são calculados sobre o <em>valor total</em> do 13º e descontados integralmente. Por isso, o líquido da 2ª parcela é sempre menor que o da 1ª.</li>
          </ul>
          <p>Esse formato pode surpreender quem espera receber duas parcelas iguais. A 1ª funciona como um &ldquo;adiantamento limpo&rdquo;, enquanto a 2ª absorve toda a carga tributária.</p>

          <h3>Quem tem direito ao décimo terceiro</h3>
          <p>O 13º salário é um direito amplo. Podem recebê-lo:</p>
          <ul>
            <li>Todo <strong>trabalhador com carteira assinada</strong> (regime CLT), inclusive durante o período de experiência.</li>
            <li><strong>Aposentados e pensionistas</strong> do INSS.</li>
            <li><strong>Trabalhadores domésticos</strong> e <strong>avulsos</strong>.</li>
            <li>Servidores públicos federais, estaduais e municipais.</li>
          </ul>
          <p>Profissionais que atuam como <a href="/trabalhista/pj-vs-clt">PJ (Pessoa Jurídica)</a> <em>não recebem</em> 13º automaticamente e precisam provisionar o equivalente por conta própria.</p>

          <h3>Como calcular o 13º proporcional</h3>
          <p>O cálculo do 13º proporcional segue uma regra simples, mas com um detalhe importante:</p>
          <ol>
            <li>Divida o salário bruto por 12.</li>
            <li>Multiplique pelo número de meses trabalhados no ano.</li>
            <li><strong>Regra dos 15 dias:</strong> se o trabalhador atuou 15 dias ou mais em determinado mês, esse mês conta como mês inteiro. Menos de 15 dias, o mês não entra no cálculo.</li>
          </ol>
          <p>Por exemplo, um empregado admitido em 16 de março com salário de R$ 4.200: trabalhou de março a dezembro (10 meses, pois março conta inteiro). Seu 13º será R$ 4.200 / 12 x 10 = <strong>R$ 3.500 brutos</strong>.</p>

          <h3>13º na rescisão: como funciona</h3>
          <p>Na demissão, o 13º proporcional integra as <a href="/trabalhista/rescisao">verbas rescisórias</a>. O cálculo segue a mesma lógica dos meses trabalhados no ano da rescisão. A única exceção é a <strong>demissão por justa causa</strong>, em que o trabalhador perde o direito ao 13º proporcional.</p>
          <p>Nas demais modalidades — demissão sem justa causa, pedido de demissão e acordo mútuo — o 13º proporcional é sempre devido.</p>

          <h3>Dicas para aproveitar melhor o 13º</h3>
          <p>O décimo terceiro costuma ser o maior pagamento extra do ano. Para aproveitá-lo de forma inteligente:</p>
          <ul>
            <li>Priorize a quitação de dívidas com <a href="/financeiro/juros-compostos">juros compostos</a> altos, como cartão de crédito e cheque especial.</li>
            <li>Reserve parte para despesas de início de ano (IPTU, <a href="/financeiro/ipva">IPVA</a>, material escolar).</li>
            <li>Considere aplicar o excedente em investimentos. O <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> ajuda a projetar os rendimentos ao longo do tempo.</li>
            <li>Compare o valor líquido do 13º com seu <a href="/trabalhista/salario-liquido">salário líquido</a> mensal para entender o impacto real dos descontos.</li>
          </ul>
        </>
      }
    >
      <DecimoTerceiroForm />
    </CalculatorPage>
  )
}
