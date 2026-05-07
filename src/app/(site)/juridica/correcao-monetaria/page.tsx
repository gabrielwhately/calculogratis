import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CorrecaoMonetariaForm } from '@/components/calculadoras/correcao-monetaria-form'

export const metadata: Metadata = createCategoriaMetadata(
  'juridica/correcao-monetaria',
  'Correção Monetária',
  'Atualize o valor de qualquer dívida ou crédito pelo IPCA, INPC, IGP-M ou SELIC. Informe os índices de referência e o período para calcular o valor real corrigido com juros de mora.'
)

export default function CorrecaoMonetariaPage() {
  return (
    <CalculatorPage
      slug="correcao-monetaria"
      categoriaSlug="juridica"
      categoriaNome="Jurídico"
      nome="Correção Monetária"
      descricao="Atualize dívidas e créditos pelo IPCA, INPC, IGP-M ou SELIC. Informe os índices de referência do período e calcule o valor real corrigido — já incluindo os juros de mora."
      faqs={[
        {
          question: 'O que é correção monetária?',
          answer: 'É a atualização do valor de uma dívida para compensar a inflação entre a data do vencimento e a do pagamento. Sem correção, R$ 10.000 de 5 anos atrás valem hoje bem menos em poder de compra — o credor estaria recebendo menos do que lhe é devido. Por isso o direito brasileiro exige a atualização em praticamente toda dívida de valor.',
        },
        {
          question: 'Quais índices são usados para correção monetária?',
          answer: 'Depende do tipo de obrigação. IPCA é o índice oficial de inflação (IBGE) e o mais usado em ações cíveis. INPC mede a inflação para famílias de menor renda e aparece em dissídios trabalhistas. IGP-M, calculado pela FGV, era muito comum em aluguéis mas perdeu espaço. SELIC é usada em débitos tributários e fiscais. O contrato ou a decisão judicial determina qual índice aplica.',
        },
        {
          question: 'Como funciona o cálculo da correção monetária?',
          answer: 'O fator de correção é obtido dividindo o índice final pelo índice inicial. Multiplica-se o valor original por esse fator. Sobre o total corrigido, incidem os juros de mora — geralmente 1% ao mês (12% ao ano) nas relações civis, conforme o art. 406 do Código Civil.',
        },
      ]}
      conteudo={
        <>
          <h2>O que e correção monetária e por que ela importa</h2>
          <p>A <strong>correção monetária</strong> é o mecanismo legal que atualiza o valor de uma dívida ou crédito para compensar a perda do poder de compra causada pela inflação. Sem ela, o credor recebe nominalmente o mesmo valor, mas com poder aquisitivo inferior — o que equivale a um pagamento parcial disfarçado de integral.</p>
          <p>No ordenamento jurídico brasileiro, a correção incide em praticamente toda <strong>dívida de valor</strong>: ações indenizatórias, cobranças contratuais, aluguéis em atraso, precatórios, débitos trabalhistas e tributários. A lei determina que a atualização ocorra desde o <em>evento danoso</em> (em ações de responsabilidade civil) ou desde o <em>vencimento da obrigação</em> (em cobranças), até o efetivo pagamento.</p>
          <p>Para valores relacionados a aluguéis, a nossa ferramenta de <a href="/financeiro/reajuste-aluguel">Reajuste de Aluguel</a> pode ser mais indicada, pois já considera os índices mais comuns usados em contratos de locação.</p>

          <h2>Índices de correção monetária: IPCA, INPC, IGP-M e SELIC</h2>
          <p>A escolha do <strong>índice de correção</strong> correto é fundamental para um cálculo preciso e juridicamente válido. Cada índice reflete uma metodologia diferente de medição da inflação:</p>
          <ul>
            <li><strong>IPCA (Índice de Preços ao Consumidor Amplo):</strong> índice oficial de inflação do Brasil, medido pelo IBGE. É o mais utilizado em ações judiciais cíveis e na atualização de débitos judiciais, conforme o Tema 810 do STF.</li>
            <li><strong>INPC (Índice Nacional de Preços ao Consumidor):</strong> também calculado pelo IBGE, mede a inflação para famílias com renda mensal de 1 a 5 salários mínimos. Aparece frequentemente em dissídios coletivos e reajustes trabalhistas.</li>
            <li><strong>IGP-M (Índice Geral de Preços do Mercado):</strong> calculado pela FGV, historicamente utilizado em contratos de aluguel. Pode apresentar variações maiores que o IPCA em períodos de pressão cambial.</li>
            <li><strong>SELIC:</strong> taxa básica de juros definida pelo Banco Central. Usada para atualização de débitos tributários e fiscais, conforme Lei 9.250/1995.</li>
          </ul>
          <p>Se precisar converter taxas entre períodos diferentes (mensal para anual, por exemplo), utilize o <a href="/financeiro/conversor-taxas">Conversor de Taxas</a> para obter o valor equivalente com precisão.</p>

          <h3>Como escolher o índice certo para o seu caso</h3>
          <p>A regra geral é simples: o <strong>contrato ou a decisão judicial</strong> determina qual índice se aplica. Na ausência de previsão expressa, o IPCA costuma ser adotado pela jurisprudência atual em ações cíveis. Para débitos fiscais, a SELIC é obrigatória. Em contratos de trabalho, o INPC predomina. Verifique sempre a cláusula contratual ou o dispositivo legal antes de calcular.</p>

          <h2>Correção monetária em processos judiciais</h2>
          <p>Nas ações judiciais, a correção monetária incide desde a data do <strong>evento danoso</strong> (em ações de indenização) ou do <strong>vencimento da obrigação</strong> (em cobranças). Os juros de mora geralmente são de 1% ao mês nas relações civis, conforme o art. 406 do Código Civil. Nas ações trabalhistas, aplica-se a Taxa Referencial (TR) ou o IPCA-E, conforme jurisprudência do TST.</p>
          <p>Para calcular os encargos de um débito vencido de forma mais simples — incluindo multa e juros diários —, experimente a <a href="/juridica/multa-atraso">Calculadora de Multa por Atraso</a>. Já para verificar o prazo de uma ação judicial, a <a href="/juridica/prazos-judiciais">Calculadora de Prazos Judiciais</a> faz a contagem em dias úteis conforme o CPC/2015.</p>

          <h3>Dica prática: como montar o cálculo passo a passo</h3>
          <ol>
            <li>Identifique o <strong>índice aplicável</strong> ao seu caso (IPCA, INPC, IGP-M ou SELIC).</li>
            <li>Consulte as tabelas oficiais e anote o <strong>índice acumulado na data inicial</strong> e na <strong>data final</strong>.</li>
            <li>Divida o índice final pelo inicial para obter o <strong>fator de correção</strong>.</li>
            <li>Multiplique o valor original pelo fator encontrado.</li>
            <li>Sobre o valor corrigido, aplique os <strong>juros de mora</strong> proporcionais ao período.</li>
          </ol>
          <p>Nossa calculadora automatiza todos esses passos. Basta informar os índices e o valor original para obter o resultado atualizado com juros de mora inclusos.</p>

          <h2>Quando a correção monetária se aplica no dia a dia</h2>
          <p>Além dos processos judiciais, a correção monetária está presente em diversas situações cotidianas. Contratos de prestação de serviço, parcelas de financiamentos em atraso, indenizações trabalhistas e até restituições de impostos passam por atualização monetária. Para quem tem dúvidas sobre o impacto da inflação no <a href="/trabalhista/salario-liquido">salário líquido</a>, vale cruzar os dados com a variação do IPCA no período — isso mostra se o reajuste salarial foi real ou apenas nominal.</p>
          <p>Compreender a correção monetária é essencial para qualquer pessoa que lide com valores defasados no tempo. Use esta calculadora para garantir que seus direitos financeiros estejam sendo preservados de forma justa e transparente.</p>
        </>
      }
    >
      <CorrecaoMonetariaForm />
    </CalculatorPage>
  )
}
