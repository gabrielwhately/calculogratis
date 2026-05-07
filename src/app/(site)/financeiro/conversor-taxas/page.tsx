import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ConversorTaxasForm } from '@/components/calculadoras/conversor-taxas-form'

export const metadata: Metadata = createCalculadoraMetadata('conversor-taxas')

export default function ConversorTaxasPage() {
  return (
    <CalculatorPage
      slug="conversor-taxas"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Conversor de Taxas"
      descricao="Taxa de 1% ao mês parece pouco? Convertida para o ano em juros compostos, dá 12,68% — não 12%. Converta taxas entre mensal, anual e diária com a fórmula correta."
      conteudo={
        <>
          <h2>O que e a conversao de taxas de juros e por que ela importa?</h2>
          <p>A <strong>conversao de taxas de juros</strong> e o processo matematico de encontrar a taxa equivalente em outro periodo de tempo, mantendo o mesmo rendimento ou custo final. Essa operacao e fundamental para comparar corretamente produtos financeiros que apresentam taxas em periodos diferentes — como um CDB que paga ao ano e um emprestimo que cobra ao mes.</p>
          <p>Sem essa conversao, e impossivel saber se um investimento que rende &ldquo;1% ao mes&rdquo; e melhor ou pior do que outro que promete &ldquo;13% ao ano&rdquo;. Nosso conversor faz o calculo automaticamente, tanto para taxas de investimento quanto para custos de credito.</p>

          <h2>Taxa equivalente vs. taxa proporcional: a diferenca que custa caro</h2>
          <p>Existem duas formas de converter taxas, e usar a errada pode gerar decisoes financeiras equivocadas:</p>
          <ul>
            <li><strong>Taxa proporcional (juros simples):</strong> calcula por multiplicacao ou divisao direta. Exemplo: 1% ao mes x 12 = 12% ao ano. Esse metodo so e correto no regime de <a href="/financeiro/juros-simples">juros simples</a>.</li>
            <li><strong>Taxa equivalente (juros compostos):</strong> usa a formula <strong>(1 + i)^n - 1</strong> para considerar o efeito dos juros sobre juros. Exemplo: 1% ao mes equivale a <strong>12,68% ao ano</strong> — nao 12%. Esse e o regime usado em praticamente todas as operacoes financeiras reais.</li>
          </ul>
          <p>A diferenca de 0,68% pode parecer pequena, mas em uma aplicacao de R$ 100.000, representa quase <strong>R$ 700 a mais por ano</strong>. Em prazos mais longos, o impacto e ainda maior.</p>

          <h2>Formulas de conversao entre periodos</h2>
          <h3>Mensal para anual</h3>
          <p><strong>i_anual = (1 + i_mensal)^12 - 1</strong></p>
          <h3>Anual para mensal</h3>
          <p><strong>i_mensal = (1 + i_anual)^(1/12) - 1</strong></p>
          <h3>Diaria para mensal</h3>
          <p><strong>i_mensal = (1 + i_diaria)^30 - 1</strong></p>
          <p>Essas formulas sao a base do calculo em regime de <a href="/financeiro/juros-compostos">juros compostos</a>. Para calculos em regime simples, basta multiplicar ou dividir pelo numero de periodos.</p>

          <h2>Aplicacoes praticas do conversor de taxas</h2>
          <p>O conversor de taxas e uma ferramenta indispensavel em diversas situacoes do dia a dia financeiro:</p>
          <ul>
            <li><strong>Comparar investimentos:</strong> CDBs, LCIs e Tesouro Direto costumam apresentar taxas anuais, enquanto simulacoes de rendimento usam taxas mensais. Converta para a mesma base antes de comparar usando tambem nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a>.</li>
            <li><strong>Entender o custo real do credito:</strong> cartao de credito e cheque especial divulgam taxas mensais que, convertidas para o ano, podem ultrapassar 400%. Simule o custo total com nosso <a href="/financeiro/emprestimo">simulador de emprestimo</a>.</li>
            <li><strong>Avaliar financiamentos:</strong> bancos podem apresentar taxas mensais ou anuais. Para comparar propostas de <a href="/financeiro/financiamento">financiamento imobiliario</a>, todas precisam estar na mesma base.</li>
            <li><strong>Converter a Selic e o CDI:</strong> divulgados em termos anuais pelo Banco Central, precisam ser convertidos para mensal ou diario para projecoes de rendimento.</li>
          </ul>

          <h2>Selic e CDI em 2026: como converter para o seu calculo</h2>
          <p>A taxa Selic e o CDI sao as referencias mais importantes do mercado financeiro brasileiro. Em 2026, com a Selic em torno de 13% ao ano, a taxa mensal equivalente e de aproximadamente <strong>1,02% ao mes</strong> — e nao 1,08% como seria pela divisao simples.</p>
          <p>Esse detalhe faz diferenca significativa em simulacoes de longo prazo. Se voce esta planejando sua <a href="/previdencia/aposentadoria">aposentadoria</a> ou projetando quanto o seu <a href="/trabalhista/salario-liquido">salario liquido</a> renderia se investido mensalmente, usar a taxa correta e essencial para nao superestimar (ou subestimar) os resultados.</p>
        </>
      }
    >
      <ConversorTaxasForm />
    </CalculatorPage>
  )
}
