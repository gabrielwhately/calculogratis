import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata(
  'juridica',
  'Jurídicas',
  'Calculadoras jurídicas online grátis 2026: correção monetária (IPCA, IGP-M, SELIC), multa por atraso, prazos judiciais em dias úteis e corridos. Ferramentas para advogados e leigos.'
)

export default function JuridicaPage() {
  return (
    <CategoryLanding
      categoriaNome="Jurídicas"
      categoriaSlug="juridica"
      descricao="Calculadoras jurídicas gratuitas para advogados e cidadãos. Corrija dívidas pelo IPCA, IGP-M e SELIC, calcule multas por atraso, juros de mora e prazos processuais em dias úteis conforme o CPC."
      conteudo={
        <>
          <h2>Calculadoras jurídicas online e gratuitas</h2>
          <p>O <strong>Cálculo Grátis</strong> oferece ferramentas jurídicas especializadas para advogados, estudantes de direito e qualquer cidadão que precise calcular valores em processos judiciais, contratos ou cobranças. Todas as calculadoras são atualizadas conforme a legislação vigente e a jurisprudência dos tribunais superiores.</p>
          <p>Nossas calculadoras jurídicas cobrem os cálculos mais frequentes na prática do direito civil, trabalhista e contratual, permitindo que você obtenha resultados precisos em segundos, sem precisar fazer contas manualmente ou depender de sistemas pagos.</p>

          <h2>Quais calculadoras jurídicas estão disponíveis?</h2>
          <p>Atualmente, oferecemos três calculadoras jurídicas essenciais:</p>
          <ul>
            <li><strong>Correção Monetária:</strong> atualiza qualquer valor pelo IPCA, INPC, IGP-M ou SELIC, somando juros de mora. Indispensável para cálculos de liquidação de sentença, atualização de créditos vencidos e contratos inadimplidos.</li>
            <li><strong>Multa por Atraso:</strong> calcula a multa moratória (padrão CDC de 2%) e os juros de mora diários sobre qualquer valor em atraso. Útil para boletos, aluguéis, contratos e cobranças extrajudiciais.</li>
            <li><strong>Prazos Judiciais:</strong> calcula o vencimento de prazos processuais em dias úteis (CPC/2015) ou dias corridos, a partir de qualquer data de início. Essencial para controle de prazos de contestação, recursos e petições.</li>
          </ul>

          <h2>Correção monetária: fundamento legal e aplicação prática</h2>
          <p>A correção monetária é garantida pelo ordenamento jurídico brasileiro como forma de preservar o valor real das obrigações ao longo do tempo. O <strong>Código Civil (art. 389 e ss.)</strong> determina que o devedor em mora responde por perdas e danos, mais juros e correção monetária. O <strong>STF consolidou</strong> no Tema 810 (ADI 4.357 e ADI 4.425) que o IPCA-E é o índice correto para atualização de precatórios devidos pelo Poder Público a particulares, substituindo a TR que foi considerada inconstitucional.</p>
          <p>A escolha do índice de correção monetária depende do tipo de relação jurídica: contratos privados podem adotar livremente qualquer índice de inflação; débitos trabalhistas seguem jurisprudência específica do TST; débitos tributários adotam a SELIC. Nossa calculadora é agnóstica quanto ao índice — você informa os valores acumulados do índice que se aplica ao seu caso.</p>

          <h2>Prazos processuais: a revolução do CPC/2015</h2>
          <p>Uma das principais inovações do <strong>Código de Processo Civil de 2015 (Lei nº 13.105/2015)</strong> foi a adoção da contagem de prazos em <strong>dias úteis</strong> para todos os prazos fixados em dias (art. 219). Antes do CPC/2015, todos os prazos processuais no processo civil eram contados em dias corridos. Essa mudança impacta significativamente o cálculo dos prazos, especialmente em semanas com feriados.</p>
          <p>Importante: o Processo do Trabalho (regido pela CLT) e os Juizados Especiais (Lei 9.099/95) ainda adotam a contagem em dias corridos. O Processo Penal também tem regras próprias. Nossa calculadora permite escolher entre dias úteis e corridos para cobrir todos esses cenários.</p>

          <h2>Para advogados: automatize seus cálculos</h2>
          <p>Para profissionais do direito, a precisão nos cálculos de liquidação é fundamental. Erros em valores de correção monetária ou juros podem gerar impugnações, atrasos na execução e até responsabilidade profissional. Com nossas calculadoras jurídicas, você garante cálculos consistentes com a metodologia aceita pelos tribunais, podendo verificar rapidamente se os valores apresentados pela parte adversa estão corretos antes de aceitar acordos ou embargar execuções.</p>
        </>
      }
    />
  )
}
