import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { RendimentoCDBForm } from '@/components/calculadoras/rendimento-cdb-form'

export const metadata: Metadata = createCalculadoraMetadata('rendimento-cdb')

export default function RendimentoCDBPage() {
  return (
    <CalculatorPage
      slug="rendimento-cdb"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Rendimento CDB"
      descricao="Simule o rendimento de CDB, LCI e LCA com base na taxa CDI. Calcule o valor liquido apos desconto do Imposto de Renda."
      conteudo={
        <>
          <h2>Como funciona o rendimento de um CDB</h2>
          <p>O <strong>CDB (Certificado de Deposito Bancario)</strong> e um titulo de renda fixa emitido por bancos. Seu rendimento e atrelado ao CDI (Certificado de Deposito Interbancario), que acompanha de perto a taxa Selic. Um CDB que paga 100% do CDI rende exatamente a taxa CDI.</p>
          <p>A formula de rendimento e: <strong>Valor Final = Valor Inicial x (1 + Taxa Efetiva Mensal)^Meses</strong>, onde a taxa efetiva mensal e derivada da taxa CDI anual multiplicada pelo percentual do CDI oferecido.</p>

          <h2>Tabela regressiva de IR sobre renda fixa</h2>
          <p>O Imposto de Renda sobre CDB segue a tabela regressiva:</p>
          <ul>
            <li><strong>Ate 180 dias:</strong> 22,5%</li>
            <li><strong>De 181 a 360 dias:</strong> 20%</li>
            <li><strong>De 361 a 720 dias:</strong> 17,5%</li>
            <li><strong>Acima de 720 dias:</strong> 15%</li>
          </ul>
          <p>O IR incide apenas sobre o <em>rendimento</em>, nao sobre o valor investido. Por isso, quanto mais tempo voce mantiver o investimento, menor sera a aliquota.</p>

          <h2>CDB vs LCI/LCA vs Poupanca</h2>
          <p><strong>LCI</strong> (Letra de Credito Imobiliario) e <strong>LCA</strong> (Letra de Credito do Agronegocio) sao isentas de IR para pessoa fisica. Um LCI/LCA que paga 85% do CDI pode render mais liquido do que um CDB de 100% do CDI em prazos curtos, onde a aliquota de IR e maior.</p>
          <p>Ja a <strong>poupanca</strong> rende 70% da Selic + TR quando a Selic esta acima de 8,5% ao ano — geralmente menos que um CDB de 100% do CDI. Use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para comparar diferentes opcoes e nosso <a href="/financeiro/juros-compostos">calculador de juros compostos</a> para projetar rendimentos de longo prazo.</p>
        </>
      }
    >
      <RendimentoCDBForm />
    </CalculatorPage>
  )
}
