import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { EmprestimoForm } from '@/components/calculadoras/emprestimo-form'

export const metadata: Metadata = createCalculadoraMetadata('emprestimo')

export default function EmprestimoPage() {
  return (
    <CalculatorPage
      slug="emprestimo"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Simulador de Empréstimo"
      descricao="Antes de assinar um empréstimo pessoal, simule aqui. Veja a parcela, o total de juros e o CET — e entenda exatamente o que você está pagando."
      conteudo={
        <>
          <h2>O que o simulador de emprestimo revela</h2>
          <p>Antes de assinar qualquer contrato de <strong>emprestimo pessoal</strong>, e essencial entender o custo real da operacao. Nosso simulador calcula a parcela fixa pelo sistema de amortizacao Price, mas vai alem: mostra o <strong>total pago ao final do contrato</strong> e a parcela que corresponde exclusivamente a juros.</p>
          <p>O resultado costuma surpreender. Um emprestimo de R$ 10.000 em 24 parcelas a 4% ao mes, por exemplo, gera um total pago de mais de <strong>R$ 17.000</strong> — ou seja, voce paga quase 70% a mais do que tomou emprestado. Ter essa visao clara antes da contratacao e fundamental para tomar uma decisao consciente.</p>

          <h2>Como funciona o sistema Price de amortizacao</h2>
          <p>No sistema Price (tambem chamado de <em>sistema frances</em>), as parcelas sao <strong>iguais do primeiro ao ultimo mes</strong>. O que muda internamente e a composicao de cada parcela:</p>
          <ul>
            <li><strong>No inicio:</strong> a maior parte da parcela cobre juros sobre o saldo devedor, que ainda e alto. A amortizacao efetiva e pequena.</li>
            <li><strong>Com o tempo:</strong> conforme voce amortiza o saldo, os juros diminuem e a parcela de amortizacao cresce proporcionalmente.</li>
            <li><strong>No final:</strong> a maior parte da parcela ja e amortizacao, com juros minimos.</li>
          </ul>
          <p>Essa dinamica explica por que <strong>quitar antecipado</strong> e tao vantajoso, especialmente nos primeiros meses: voce elimina parcelas que seriam compostas majoritariamente por juros. Se quiser entender as diferencas com outros sistemas de amortizacao, veja nosso <a href="/financeiro/financiamento">simulador de financiamento imobiliario</a>, que compara Price e SAC.</p>

          <h2>CET: o numero que voce precisa comparar</h2>
          <p>O <strong>Custo Efetivo Total (CET)</strong> e a metrica mais importante na hora de comparar emprestimos entre diferentes instituicoes. Ele inclui:</p>
          <ol>
            <li>A taxa de juros contratual</li>
            <li>Tarifas de abertura de credito (TAC)</li>
            <li>Seguros obrigatorios</li>
            <li>IOF e outros tributos</li>
          </ol>
          <p>Dois emprestimos com a mesma taxa de juros nominal podem ter CETs muito diferentes por causa dessas tarifas adicionais. O banco e obrigado por lei a informar o CET antes da contratacao — <em>exija essa informacao</em>.</p>

          <h2>Dicas para pagar menos juros no emprestimo</h2>
          <ul>
            <li><strong>Prefira prazos menores:</strong> cada mes a menos reduz diretamente o total de juros. Se a parcela couber no orcamento, escolha 12 em vez de 24 meses.</li>
            <li><strong>Compare entre instituicoes:</strong> bancos digitais e fintechs costumam oferecer taxas menores que bancos tradicionais. Use o <a href="/financeiro/conversor-taxas">conversor de taxas</a> para comparar ofertas em bases diferentes.</li>
            <li><strong>Evite o rotativo do cartao:</strong> se a alternativa e o credito rotativo (que pode ultrapassar 400% ao ano), um emprestimo pessoal com taxa mais baixa e quase sempre a melhor opcao.</li>
            <li><strong>Considere o emprestimo consignado:</strong> quem e CLT ou servidor publico pode acessar taxas significativamente menores no credito consignado, descontado diretamente do <a href="/trabalhista/salario-liquido">salario</a>.</li>
          </ul>

          <h2>Emprestimo vs. investimento: quando faz sentido cada um?</h2>
          <p>Uma regra pratica: se a taxa do emprestimo e <strong>maior</strong> do que o rendimento dos seus investimentos, priorize quitar a divida. Se voce tem aplicacoes rendendo 1% ao mes e um emprestimo cobrando 3% ao mes, cada real investido esta &ldquo;perdendo&rdquo; 2% ao mes em relacao a divida.</p>
          <p>Use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para calcular quanto seus aportes renderiam no mesmo periodo e compare com o custo total do emprestimo. Tambem vale consultar o calculo de <a href="/financeiro/juros-compostos">juros compostos</a> para entender como a divida cresce ao longo do tempo.</p>
        </>
      }
    >
      <EmprestimoForm />
    </CalculatorPage>
  )
}
