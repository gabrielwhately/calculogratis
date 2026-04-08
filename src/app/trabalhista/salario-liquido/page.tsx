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
      nome="Salario Liquido"
      descricao="Descubra quanto voce realmente recebe. Calculo automatico de INSS, IRRF e descontos do seu salario bruto."
      conteudo={
        <>
          <h2>Como calcular o salario liquido em 2026</h2>
          <p>O salario liquido e o valor que efetivamente cai na sua conta bancaria depois de todos os descontos obrigatorios. A diferenca entre o <strong>salario bruto</strong> (valor do contrato) e o <strong>salario liquido</strong> pode surpreender: para quem ganha R$ 5.000 brutos, por exemplo, os descontos de INSS e <a href="/trabalhista/irrf">Imposto de Renda</a> podem ultrapassar R$ 900 por mes.</p>
          <p>Nossa calculadora aplica as tabelas progressivas de INSS e IRRF vigentes em 2026, considerando tambem deducoes por dependentes e outros descontos opcionais como vale-transporte.</p>

          <h3>Tabela do INSS 2026: aliquotas progressivas</h3>
          <p>A contribuicao ao INSS funciona de forma <strong>progressiva</strong>, semelhante ao Imposto de Renda. Cada faixa salarial possui sua propria aliquota, que incide <em>apenas</em> sobre a parcela do salario que se enquadra naquela faixa:</p>
          <ul>
            <li><strong>7,5%</strong> sobre a parcela ate R$ 1.518,00</li>
            <li><strong>9%</strong> sobre a parcela de R$ 1.518,01 a R$ 2.793,88</li>
            <li><strong>12%</strong> sobre a parcela de R$ 2.793,89 a R$ 5.587,76</li>
            <li><strong>14%</strong> sobre a parcela de R$ 5.587,77 ate o teto de contribuicao</li>
          </ul>
          <p>Isso significa que receber um aumento de salario <em>nunca</em> faz voce perder dinheiro por mudar de faixa. Cada real a mais e tributado apenas pela aliquota da faixa em que se encaixa.</p>

          <h3>O que reduz a base de calculo do Imposto de Renda</h3>
          <p>Antes de aplicar a tabela do IRRF, a base de calculo e reduzida por algumas deducoes legais. Conhecer esses abatimentos ajuda a entender por que dois colegas com o mesmo salario bruto podem ter salarios liquidos diferentes:</p>
          <ul>
            <li><strong>Desconto do INSS:</strong> e a primeira deducao, aplicada automaticamente.</li>
            <li><strong>Dependentes:</strong> cada dependente declarado reduz a base em R$ 189,59 por mes. Filhos, conjuge sem renda e pais idosos sob sua responsabilidade podem ser incluidos.</li>
            <li><strong>Pensao alimenticia judicial:</strong> o valor pago por determinacao da Justica e integralmente dedutivel da base do IR.</li>
          </ul>
          <p>Na pratica, uma familia com dois dependentes pode economizar mais de <strong>R$ 100 por mes</strong> em Imposto de Renda. Use tambem a <a href="/trabalhista/irrf">calculadora de IRRF</a> para ver o detalhamento completo do imposto.</p>

          <h3>Exemplo pratico de calculo</h3>
          <p>Considere um trabalhador com salario bruto de <strong>R$ 4.000,00</strong> e sem dependentes:</p>
          <ol>
            <li>Calcula-se o INSS progressivo: aproximadamente R$ 354,73.</li>
            <li>A base do IRRF fica em R$ 4.000 - R$ 354,73 = R$ 3.645,27.</li>
            <li>Aplica-se a tabela progressiva do IR sobre essa base, resultando em desconto de cerca de R$ 62,48.</li>
            <li>Salario liquido estimado: <strong>R$ 3.582,79</strong>.</li>
          </ol>
          <p>Quer entender o impacto dos beneficios CLT alem do salario? A <a href="/trabalhista/custo-clt">calculadora de custo CLT</a> mostra quanto a empresa realmente gasta com cada funcionario, incluindo FGTS, <a href="/trabalhista/ferias">ferias</a> e <a href="/trabalhista/decimo-terceiro">13o salario</a>.</p>

          <h3>Outros descontos que afetam o salario liquido</h3>
          <p>Alem dos descontos obrigatorios, outros valores podem reduzir o que voce recebe:</p>
          <ul>
            <li><strong>Vale-transporte:</strong> o empregado contribui com ate 6% do salario bruto quando opta pelo beneficio.</li>
            <li><strong>Plano de saude e odontologico:</strong> a coparticipacao do funcionario, quando prevista, e descontada em folha.</li>
            <li><strong>Contribuicao sindical:</strong> desde a reforma trabalhista, so e descontada mediante autorizacao expressa do trabalhador.</li>
          </ul>
          <p>Se voce esta avaliando uma proposta de emprego, compare nao apenas o salario, mas o pacote total de beneficios. A <a href="/trabalhista/pj-vs-clt">comparacao PJ vs CLT</a> pode ajudar a entender o valor real da remuneracao em cada regime.</p>
        </>
      }
    >
      <SalarioLiquidoForm />
    </CalculatorPage>
  )
}
