import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { JurosCompostosForm } from '@/components/calculadoras/juros-compostos-form'

export const metadata: Metadata = createCalculadoraMetadata('juros-compostos')

export default function JurosCompostosPage() {
  return (
    <CalculatorPage
      slug="juros-compostos"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Juros Compostos"
      descricao="Simule juros compostos com aportes mensais. Ideal para planejar investimentos e entender o crescimento do seu dinheiro ao longo do tempo."
      conteudo={
        <>
          <h2>O que são juros compostos e por que importam tanto?</h2>
          <p>Os <strong>juros compostos</strong> são o regime de capitalização em que os juros de cada período são incorporados ao saldo e passam a gerar novos juros nos períodos seguintes. Esse mecanismo, conhecido como <em>juros sobre juros</em>, é a base de praticamente todas as operações financeiras modernas — de investimentos a <a href="/financeiro/financiamento">financiamentos imobiliários</a> e <a href="/financeiro/emprestimo">empréstimos pessoais</a>.</p>
          <p>A fórmula fundamental é: <strong>M = C x (1 + i)^t</strong>, onde <em>M</em> é o montante final, <em>C</em> é o capital inicial, <em>i</em> é a taxa por período e <em>t</em> é o número de períodos. Diferentemente dos <a href="/financeiro/juros-simples">juros simples</a>, aqui o crescimento é exponencial, não linear.</p>

          <h2>O efeito bola de neve na prática</h2>
          <p>Para entender o poder dos juros compostos, considere este exemplo detalhado:</p>
          <ol>
            <li><strong>Aporte mensal:</strong> R$ 500</li>
            <li><strong>Taxa:</strong> 1% ao mês (equivalente a cerca de 12,68% ao ano)</li>
            <li><strong>Prazo:</strong> 20 anos (240 meses)</li>
          </ol>
          <p>O resultado surpreende: o montante final ultrapassa <strong>R$ 230.000</strong>, mas você investiu apenas R$ 120.000 do próprio bolso. Os outros R$ 110.000 vieram exclusivamente do efeito dos juros sobre juros. Nos primeiros anos, o rendimento mensal parece modesto. Mas a partir de certo ponto, o rendimento de um único mês supera o próprio aporte — e o patrimônio acelera.</p>
          <p>Use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para testar diferentes cenários com seus próprios valores.</p>

          <h2>Começar cedo vale mais do que começar com mais</h2>
          <p>Um dos princípios mais importantes dos juros compostos é que o <strong>tempo é mais valioso do que o valor do aporte</strong>. Veja a comparação:</p>
          <ul>
            <li><strong>Pessoa A:</strong> começa a investir R$ 300/mês aos 25 anos, a 0,8% ao mês, até os 65 anos (40 anos de aportes)</li>
            <li><strong>Pessoa B:</strong> começa a investir R$ 600/mês aos 35 anos, mesma taxa, até os 65 anos (30 anos de aportes)</li>
          </ul>
          <p>Mesmo investindo <em>metade do valor mensal</em>, a Pessoa A acumula um patrimônio significativamente maior. O segredo é o tempo adicional que permite ao efeito exponencial trabalhar a favor. Por isso, o melhor momento para começar a investir é sempre <strong>agora</strong>.</p>

          <h2>Conversão de taxas: um detalhe que faz grande diferença</h2>
          <p>Um erro comum é converter taxas por simples multiplicação. Em juros compostos, <strong>1% ao mês não é 12% ao ano</strong> — é aproximadamente 12,68%. A fórmula correta é:</p>
          <p><strong>i_anual = (1 + i_mensal)^12 - 1</strong></p>
          <p>Esse detalhe importa muito em simulações de longo prazo. Para fazer conversões com precisão, utilize nosso <a href="/financeiro/conversor-taxas">conversor de taxas de juros</a>. Ele trabalha com taxas diárias, mensais e anuais em regime composto.</p>

          <h2>Juros compostos no seu dia a dia financeiro</h2>
          <p>Os juros compostos estão presentes em muito mais situações do que a maioria das pessoas imagina:</p>
          <ul>
            <li><strong>Investimentos:</strong> CDBs, Tesouro Direto, fundos e ações — todos operam com capitalização composta</li>
            <li><strong>Financiamentos:</strong> tanto a <a href="/financeiro/financiamento">tabela Price quanto a SAC</a> usam juros compostos para calcular as parcelas</li>
            <li><strong>Cartão de crédito:</strong> o rotativo aplica juros compostos sobre o saldo devedor, podendo ultrapassar 400% ao ano</li>
            <li><strong>Previdência:</strong> quem planeja a <a href="/previdencia/aposentadoria">aposentadoria</a> precisa entender como o tempo potencializa o rendimento</li>
            <li><strong>Salário:</strong> ao calcular o <a href="/trabalhista/salario-liquido">salário líquido</a>, os descontos seguem tabelas progressivas, mas o dinheiro investido rende em regime composto</li>
          </ul>
        </>
      }
    >
      <JurosCompostosForm />
    </CalculatorPage>
  )
}
