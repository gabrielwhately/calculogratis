import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SalarioLiquidoForm } from '@/components/calculadoras/salario-liquido-form'

export const metadata: Metadata = createCalculadoraMetadata('salario-liquido')

export default function SalarioLiquidoPage() {
  return (
    <CalculatorPage
      slug="salario-liquido"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Salário Líquido"
      descricao="Descubra quanto você realmente recebe em 2026. Cálculo automático de INSS, IRRF e descontos do seu salário bruto com tabelas atualizadas."
      conteudo={
        <>
          <h2>Como calcular o salário líquido em 2026</h2>
          <p>O <strong>salário líquido</strong> é o valor que efetivamente cai na sua conta bancária depois de todos os descontos obrigatórios. A diferença entre o <strong>salário bruto</strong> (valor do contrato) e o salário líquido pode surpreender: para quem ganha R$ 5.000 brutos, por exemplo, os descontos de INSS e <a href="/trabalhista/irrf">Imposto de Renda</a> podem ultrapassar R$ 900 por mês.</p>
          <p>Nossa calculadora aplica as tabelas progressivas de INSS e IRRF <strong>vigentes em 2026</strong>, considerando também deduções por dependentes e outros descontos opcionais como vale-transporte. É 100% grátis e o resultado é instantâneo.</p>

          <h3>Tabela do INSS 2026: alíquotas progressivas</h3>
          <p>A contribuição ao INSS funciona de forma <strong>progressiva</strong>, semelhante ao Imposto de Renda. Cada faixa salarial possui sua própria alíquota, que incide <em>apenas</em> sobre a parcela do salário que se enquadra naquela faixa:</p>
          <ul>
            <li><strong>7,5%</strong> sobre a parcela até R$ 1.518,00</li>
            <li><strong>9%</strong> sobre a parcela de R$ 1.518,01 a R$ 2.793,88</li>
            <li><strong>12%</strong> sobre a parcela de R$ 2.793,89 a R$ 5.587,76</li>
            <li><strong>14%</strong> sobre a parcela de R$ 5.587,77 até o teto de contribuição</li>
          </ul>
          <p>Isso significa que receber um aumento de salário <em>nunca</em> faz você perder dinheiro por mudar de faixa. Cada real a mais é tributado apenas pela alíquota da faixa em que se encaixa.</p>

          <h3>O que reduz a base de cálculo do Imposto de Renda</h3>
          <p>Antes de aplicar a tabela do IRRF, a base de cálculo é reduzida por algumas deduções legais. Conhecer esses abatimentos ajuda a entender por que dois colegas com o mesmo salário bruto podem ter salários líquidos diferentes:</p>
          <ul>
            <li><strong>Desconto do INSS:</strong> é a primeira dedução, aplicada automaticamente.</li>
            <li><strong>Dependentes:</strong> cada dependente declarado reduz a base em R$ 189,59 por mês. Filhos, cônjuge sem renda e pais idosos sob sua responsabilidade podem ser incluídos.</li>
            <li><strong>Pensão alimentícia judicial:</strong> o valor pago por determinação da Justiça é integralmente dedutível da base do IR.</li>
          </ul>
          <p>Na prática, uma família com dois dependentes pode economizar mais de <strong>R$ 100 por mês</strong> em Imposto de Renda. Use também a <a href="/trabalhista/irrf">calculadora de IRRF</a> para ver o detalhamento completo do imposto.</p>

          <h3>Exemplo prático de cálculo</h3>
          <p>Considere um trabalhador com salário bruto de <strong>R$ 4.000,00</strong> e sem dependentes:</p>
          <ol>
            <li>Calcula-se o INSS progressivo: aproximadamente R$ 354,73.</li>
            <li>A base do IRRF fica em R$ 4.000 - R$ 354,73 = R$ 3.645,27.</li>
            <li>Aplica-se a tabela progressiva do IR sobre essa base, resultando em desconto de cerca de R$ 62,48.</li>
            <li>Salário líquido estimado: <strong>R$ 3.582,79</strong>.</li>
          </ol>
          <p>Quer entender o impacto dos benefícios CLT além do salário? A <a href="/trabalhista/custo-clt">calculadora de custo CLT</a> mostra quanto a empresa realmente gasta com cada funcionário, incluindo FGTS, <a href="/trabalhista/ferias">férias</a> e <a href="/trabalhista/decimo-terceiro">13º salário</a>.</p>

          <h3>Outros descontos que afetam o salário líquido</h3>
          <p>Além dos descontos obrigatórios, outros valores podem reduzir o que você recebe:</p>
          <ul>
            <li><strong>Vale-transporte:</strong> o empregado contribui com até 6% do salário bruto quando opta pelo benefício.</li>
            <li><strong>Plano de saúde e odontológico:</strong> a coparticipação do funcionário, quando prevista, é descontada em folha.</li>
            <li><strong>Contribuição sindical:</strong> desde a reforma trabalhista, só é descontada mediante autorização expressa do trabalhador.</li>
          </ul>
          <p>Se você está avaliando uma proposta de emprego, compare não apenas o salário, mas o pacote total de benefícios. A <a href="/trabalhista/pj-vs-clt">comparação PJ vs CLT</a> pode ajudar a entender o valor real da remuneração em cada regime.</p>
        </>
      }
    >
      <SalarioLiquidoForm />
    </CalculatorPage>
  )
}
