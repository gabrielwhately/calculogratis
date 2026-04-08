import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SimuladorInvestimentosForm } from '@/components/calculadoras/simulador-investimentos-form'

export const metadata: Metadata = createCalculadoraMetadata('simulador-investimentos')

export default function SimuladorInvestimentosPage() {
  return (
    <CalculatorPage
      slug="simulador-investimentos"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Simulador de Investimentos"
      descricao="Quanto você vai ter daqui a 10 anos investindo R$ 500 por mês? Simule com o valor inicial, aporte mensal e taxa de rendimento — e veja quanto vem do seu bolso e quanto são juros."
      conteudo={
        <>
          <h2>Como funciona o simulador de investimentos</h2>
          <p>O <strong>simulador de investimentos</strong> calcula o crescimento do seu patrimonio ao longo do tempo utilizando o regime de <a href="/financeiro/juros-compostos">juros compostos</a>. Voce informa quatro dados basicos:</p>
          <ol>
            <li><strong>Capital inicial:</strong> o valor que voce tem disponivel para comecar</li>
            <li><strong>Aporte mensal:</strong> quanto pretende investir a cada mes</li>
            <li><strong>Taxa de rendimento anual:</strong> a rentabilidade esperada do investimento</li>
            <li><strong>Prazo:</strong> por quantos meses ou anos pretende manter a aplicacao</li>
          </ol>
          <p>O resultado mostra nao apenas o montante final, mas tambem a separacao clara entre o que voce investiu do proprio bolso e o que veio dos rendimentos. Em horizontes de 15 a 30 anos, a parcela de juros frequentemente <em>supera</em> o valor total dos aportes.</p>

          <h2>O poder da constancia: por que o aporte mensal transforma resultados</h2>
          <p>Um dos maiores equivocos em financas pessoais e achar que so vale investir quando se tem um grande valor disponivel. Na verdade, a <strong>disciplina dos aportes regulares</strong> e muito mais determinante do que o valor inicial. Veja um exemplo pratico:</p>
          <ul>
            <li>R$ 500/mes durante 20 anos, a 1% ao mes: montante de mais de <strong>R$ 230.000</strong> (voce investiu R$ 120.000)</li>
            <li>R$ 200/mes durante 25 anos, a 0,9% ao mes: montante superior a <strong>R$ 180.000</strong> (voce investiu R$ 60.000)</li>
            <li>R$ 1.000/mes durante 10 anos, a 1% ao mes: montante proximo de <strong>R$ 230.000</strong> (voce investiu R$ 120.000)</li>
          </ul>
          <p>Perceba como prazos mais longos produzem resultados proporcionalmente maiores, mesmo com aportes menores. Isso acontece porque o efeito dos <a href="/financeiro/juros-compostos">juros compostos</a> se intensifica com o tempo.</p>

          <h2>Qual taxa usar na simulacao?</h2>
          <p>A taxa de rendimento varia conforme o tipo de investimento. Aqui estao referencias atualizadas para 2026:</p>
          <ul>
            <li><strong>Poupanca:</strong> entre 6% e 7% ao ano — rendimento mais baixo, mas com liquidez imediata</li>
            <li><strong>Tesouro Selic:</strong> acompanha a taxa basica de juros, em torno de 13% ao ano em 2026</li>
            <li><strong>CDBs de bancos medios:</strong> entre 100% e 110% do CDI, com opcoes de liquidez diaria ou no vencimento</li>
            <li><strong>Fundos imobiliarios:</strong> rendimento medio historico entre 8% e 12% ao ano, com distribuicao mensal de dividendos</li>
            <li><strong>Acoes (Ibovespa):</strong> media historica de 12% a 15% ao ano, mas com alta volatilidade</li>
          </ul>
          <p>Para converter taxas anuais em mensais (ou vice-versa) com precisao, use nosso <a href="/financeiro/conversor-taxas">conversor de taxas de juros</a>. Lembre-se: dividir a taxa anual por 12 da um resultado incorreto em regime composto.</p>

          <h2>Simulacao e planejamento da aposentadoria</h2>
          <p>O simulador de investimentos e uma ferramenta essencial para quem esta planejando a <a href="/previdencia/aposentadoria">aposentadoria</a>. Com ele, voce pode projetar quanto precisa investir por mes para atingir um patrimonio que gere renda passiva suficiente. Combine esta simulacao com o calculo do seu <a href="/trabalhista/salario-liquido">salario liquido</a> para definir um valor de aporte realista dentro do seu orcamento.</p>

          <h2>Dicas para simulacoes mais realistas</h2>
          <ul>
            <li><strong>Desconte a inflacao:</strong> para ter uma nocao do poder de compra real, subtraia a inflacao esperada (IPCA) da taxa de rendimento bruta</li>
            <li><strong>Considere o Imposto de Renda:</strong> investimentos de renda fixa sofrem tributacao regressiva (de 22,5% a 15% conforme o prazo). O rendimento liquido sera menor que o bruto</li>
            <li><strong>Nao use rentabilidade passada como garantia:</strong> especialmente em renda variavel, o historico nao garante resultados futuros</li>
            <li><strong>Compare com o custo de dividas:</strong> antes de investir, avalie se nao e mais vantajoso quitar um <a href="/financeiro/emprestimo">emprestimo</a> com juros altos</li>
          </ul>
        </>
      }
    >
      <SimuladorInvestimentosForm />
    </CalculatorPage>
  )
}
