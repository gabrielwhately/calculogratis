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
          <h2>O que sao juros compostos e por que importam tanto?</h2>
          <p>Os <strong>juros compostos</strong> sao o regime de capitalizacao em que os juros de cada periodo sao incorporados ao saldo e passam a gerar novos juros nos periodos seguintes. Esse mecanismo, conhecido como <em>juros sobre juros</em>, e a base de praticamente todas as operacoes financeiras modernas — de investimentos a <a href="/financeiro/financiamento">financiamentos imobiliarios</a> e <a href="/financeiro/emprestimo">emprestimos pessoais</a>.</p>
          <p>A formula fundamental e: <strong>M = C x (1 + i)^t</strong>, onde <em>M</em> e o montante final, <em>C</em> e o capital inicial, <em>i</em> e a taxa por periodo e <em>t</em> e o numero de periodos. Diferentemente dos <a href="/financeiro/juros-simples">juros simples</a>, aqui o crescimento e exponencial, nao linear.</p>

          <h2>O efeito bola de neve na pratica</h2>
          <p>Para entender o poder dos juros compostos, considere este exemplo detalhado:</p>
          <ol>
            <li><strong>Aporte mensal:</strong> R$ 500</li>
            <li><strong>Taxa:</strong> 1% ao mes (equivalente a cerca de 12,68% ao ano)</li>
            <li><strong>Prazo:</strong> 20 anos (240 meses)</li>
          </ol>
          <p>O resultado surpreende: o montante final ultrapassa <strong>R$ 230.000</strong>, mas voce investiu apenas R$ 120.000 do proprio bolso. Os outros R$ 110.000 vieram exclusivamente do efeito dos juros sobre juros. Nos primeiros anos, o rendimento mensal parece modesto. Mas a partir de certo ponto, o rendimento de um unico mes supera o proprio aporte — e o patrimonio acelera.</p>
          <p>Use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para testar diferentes cenarios com seus proprios valores.</p>

          <h2>Comecar cedo vale mais do que comecar com mais</h2>
          <p>Um dos principios mais importantes dos juros compostos e que o <strong>tempo e mais valioso do que o valor do aporte</strong>. Veja a comparacao:</p>
          <ul>
            <li><strong>Pessoa A:</strong> comeca a investir R$ 300/mes aos 25 anos, a 0,8% ao mes, ate os 65 anos (40 anos de aportes)</li>
            <li><strong>Pessoa B:</strong> comeca a investir R$ 600/mes aos 35 anos, mesma taxa, ate os 65 anos (30 anos de aportes)</li>
          </ul>
          <p>Mesmo investindo <em>metade do valor mensal</em>, a Pessoa A acumula um patrimonio significativamente maior. O segredo e o tempo adicional que permite ao efeito exponencial trabalhar a favor. Por isso, o melhor momento para comecar a investir e sempre <strong>agora</strong>.</p>

          <h2>Conversao de taxas: um detalhe que faz grande diferenca</h2>
          <p>Um erro comum e converter taxas por simples multiplicacao. Em juros compostos, <strong>1% ao mes nao e 12% ao ano</strong> — e aproximadamente 12,68%. A formula correta e:</p>
          <p><strong>i_anual = (1 + i_mensal)^12 - 1</strong></p>
          <p>Esse detalhe importa muito em simulacoes de longo prazo. Para fazer conversoes com precisao, utilize nosso <a href="/financeiro/conversor-taxas">conversor de taxas de juros</a>. Ele trabalha com taxas diarias, mensais e anuais em regime composto.</p>

          <h2>Juros compostos no seu dia a dia financeiro</h2>
          <p>Os juros compostos estao presentes em muito mais situacoes do que a maioria das pessoas imagina:</p>
          <ul>
            <li><strong>Investimentos:</strong> CDBs, Tesouro Direto, fundos e acoes — todos operam com capitalizacao composta</li>
            <li><strong>Financiamentos:</strong> tanto a <a href="/financeiro/financiamento">tabela Price quanto a SAC</a> usam juros compostos para calcular as parcelas</li>
            <li><strong>Cartao de credito:</strong> o rotativo aplica juros compostos sobre o saldo devedor, podendo ultrapassar 400% ao ano</li>
            <li><strong>Previdencia:</strong> quem planeja a <a href="/previdencia/aposentadoria">aposentadoria</a> precisa entender como o tempo potencializa o rendimento</li>
            <li><strong>Salario:</strong> ao calcular o <a href="/trabalhista/salario-liquido">salario liquido</a>, os descontos seguem tabelas progressivas, mas o dinheiro investido rende em regime composto</li>
          </ul>
        </>
      }
    >
      <JurosCompostosForm />
    </CalculatorPage>
  )
}
