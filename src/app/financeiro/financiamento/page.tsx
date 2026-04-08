import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FinanciamentoForm } from '@/components/calculadoras/financiamento-form'

export const metadata: Metadata = createCalculadoraMetadata('financiamento')

export default function FinanciamentoPage() {
  return (
    <CalculatorPage
      slug="financiamento"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Financiamento Imobiliario"
      descricao="Simule seu financiamento imobiliario nas tabelas Price e SAC. Compare parcelas, juros totais e escolha a melhor opcao."
      conteudo={
        <>
          <h2>Tabela Price vs. SAC: entenda as diferencas e escolha com consciencia</h2>
          <p>A escolha do sistema de amortizacao e uma das decisoes mais impactantes ao contratar um <strong>financiamento imobiliario</strong>. Os dois principais sistemas usados no Brasil sao:</p>
          <ul>
            <li><strong>Tabela Price (parcelas fixas):</strong> todas as prestacoes tem o mesmo valor, o que facilita o planejamento mensal. Porem, no inicio do contrato, a maior parte da parcela cobre juros — a amortizacao do saldo devedor e mais lenta, e voce acaba pagando mais juros no total.</li>
            <li><strong>SAC (amortizacao constante):</strong> a amortizacao e sempre o mesmo valor, enquanto os juros diminuem a cada mes. As parcelas comecam maiores, mas vao caindo ao longo do contrato. No total, voce paga menos juros do que na Price.</li>
          </ul>
          <p>Em um financiamento de R$ 400.000 por 30 anos, a diferenca entre Price e SAC pode ultrapassar <strong>R$ 80.000</strong> em juros totais. Use nosso simulador para comparar os dois sistemas com os valores do seu caso.</p>

          <h2>Como funciona a composicao de cada parcela</h2>
          <p>Cada parcela de um financiamento e formada por duas partes:</p>
          <ol>
            <li><strong>Amortizacao:</strong> a devolucao efetiva do valor emprestado, que reduz o saldo devedor</li>
            <li><strong>Juros:</strong> o custo do dinheiro naquele periodo, calculado sobre o saldo devedor remanescente</li>
          </ol>
          <p>Na Tabela Price, nos primeiros meses, mais de <em>80% da parcela</em> pode ser composta por juros puros. So com o passar dos anos a amortizacao comeca a representar uma fatia maior. Ja na SAC, a amortizacao e constante desde o primeiro mes, e os juros caem progressivamente.</p>
          <p>Entender essa dinamica e fundamental para avaliar se vale a pena fazer <strong>amortizacoes extraordinarias</strong> (pagamentos antecipados), que reduzem o saldo devedor e podem encurtar significativamente o prazo do financiamento.</p>

          <h2>O impacto da entrada e das taxas no custo total</h2>
          <p>Dois fatores tem enorme influencia no custo final do financiamento:</p>
          <ul>
            <li><strong>Valor da entrada:</strong> dar 30% de entrada em vez de 20% pode reduzir o total de juros pagos em dezenas de milhares de reais. Alem de diminuir o saldo financiado, uma entrada maior costuma resultar em taxas de juros menores oferecidas pelo banco.</li>
            <li><strong>Taxa de juros:</strong> uma diferenca de apenas 0,5% ao ano pode representar mais de R$ 50.000 em um financiamento de 30 anos. Compare ofertas de diferentes instituicoes usando nosso <a href="/financeiro/conversor-taxas">conversor de taxas</a> para colocar todas na mesma base.</li>
          </ul>

          <h2>Dicas praticas antes de financiar um imovel</h2>
          <ol>
            <li><strong>Simule antes de visitar o banco:</strong> use este simulador para ter uma nocao clara da parcela e do custo total antes de qualquer negociacao</li>
            <li><strong>Compare o CET, nao apenas a taxa nominal:</strong> o Custo Efetivo Total inclui seguros obrigatorios, tarifas e taxas administrativas. Dois bancos com a mesma taxa podem ter CET muito diferente — veja mais sobre isso em nosso <a href="/financeiro/emprestimo">simulador de emprestimo</a></li>
            <li><strong>Nao comprometa mais de 30% da renda:</strong> esse e o teto que a maioria dos bancos aceita, mas o ideal para sua saude financeira pode ser menos</li>
            <li><strong>Considere outros custos do imovel:</strong> alem das parcelas, voce tera ITBI, escritura, condominio e manutencao. Planeje o orcamento completo</li>
          </ol>

          <h2>Financiamento e planejamento financeiro de longo prazo</h2>
          <p>Um financiamento imobiliario e, para a maioria dos brasileiros, o maior compromisso financeiro da vida. Por isso, e essencial que ele faca parte de um planejamento mais amplo. Considere como ele interage com seus <a href="/financeiro/simulador-investimentos">investimentos</a>, com o calculo da sua <a href="/previdencia/aposentadoria">aposentadoria</a> e com o impacto no seu <a href="/trabalhista/salario-liquido">salario liquido</a> mensal.</p>
          <p>Se voce esta comparando entre comprar e alugar, nosso <a href="/financeiro/reajuste-aluguel">simulador de reajuste de aluguel</a> pode ajudar a projetar o custo do aluguel ao longo dos anos para uma comparacao mais justa.</p>
        </>
      }
    >
      <FinanciamentoForm />
    </CalculatorPage>
  )
}
