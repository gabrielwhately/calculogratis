import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { SeguroDesempregoForm } from '@/components/calculadoras/seguro-desemprego-form'

export const metadata: Metadata = createCalculadoraMetadata('seguro-desemprego')

export default function SeguroDesempregoPage() {
  return (
    <CalculatorPage
      slug="seguro-desemprego"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Seguro Desemprego"
      descricao="Calcule o valor e o número de parcelas do seguro desemprego (Atualizado 2026). Simulador completo com as novas faixas salariais."
      conteudo={
        <>
          <h2>Como funciona o cálculo do seguro-desemprego em 2026</h2>
          <p>O <strong>seguro-desemprego</strong> é um benefício temporário pago ao trabalhador <strong>demitido sem justa causa</strong>, com o objetivo de garantir assistência financeira durante o período de transição entre empregos. O valor das parcelas não é fixo: ele é calculado com base na <strong>média dos três últimos salários</strong> anteriores à demissão, aplicando-se faixas percentuais definidas pelo Ministério do Trabalho.</p>
          <p>Antes de solicitar o benefício, vale conferir os valores da <a href="/trabalhista/rescisao">rescisão trabalhista</a>, que inclui verbas como saldo de salário, <a href="/trabalhista/ferias">férias proporcionais</a>, <a href="/trabalhista/decimo-terceiro">13º proporcional</a> e multa do FGTS.</p>

          <h3>Tabela de cálculo do valor das parcelas em 2026</h3>
          <p>O cálculo segue três faixas progressivas baseadas na média salarial:</p>
          <ol>
            <li><strong>Média até R$ 2.138,76:</strong> multiplica-se o valor por 0,8 (80%). Quem ganha menos recebe proporcionalmente mais.</li>
            <li><strong>Média entre R$ 2.138,77 e R$ 3.564,96:</strong> o excedente acima da primeira faixa é multiplicado por 0,5 (50%) e somado a R$ 1.711,01.</li>
            <li><strong>Média acima de R$ 3.564,96:</strong> o valor da parcela fica fixo no teto de <strong>R$ 2.424,11</strong>, independentemente de quanto o trabalhador ganhava.</li>
          </ol>
          <p>Em nenhum caso o valor do benefício pode ser inferior ao <strong>salário mínimo vigente</strong> (R$ 1.518,00 em 2026).</p>

          <h3>Quem tem direito ao seguro-desemprego</h3>
          <p>Os requisitos variam conforme o número de solicitações anteriores do trabalhador:</p>
          <ul>
            <li><strong>1ª solicitação:</strong> ter trabalhado com carteira assinada por pelo menos <em>12 meses</em> nos últimos 18 meses antes da demissão. Direito a 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
            <li><strong>2ª solicitação:</strong> mínimo de <em>9 meses</em> trabalhados nos últimos 12. Direito a 3 parcelas (9 a 11 meses), 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
            <li><strong>3ª solicitação em diante:</strong> bastam <em>6 meses</em> de trabalho ininterrupto. Direito a 3 parcelas (6 a 11 meses), 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
          </ul>
          <p>Importante: quem recebe <a href="/previdencia/aposentadoria">aposentadoria</a> do INSS (exceto pensão por morte), BPC/LOAS ou possui renda própria suficiente para o sustento <strong>não tem direito</strong> ao seguro-desemprego.</p>

          <h3>Prazo e canais para solicitar</h3>
          <p>O pedido deve ser feito dentro de uma janela específica:</p>
          <ul>
            <li><strong>Trabalhador formal:</strong> entre o 7º e o 120º dia após a demissão.</li>
            <li><strong>Empregado doméstico:</strong> entre o 7º e o 90º dia.</li>
            <li><strong>Pescador artesanal e trabalhador resgatado:</strong> prazos específicos conforme a legislação.</li>
          </ul>
          <p>A solicitação pode ser feita pelo portal <strong>Gov.br</strong>, pelo aplicativo <strong>Carteira de Trabalho Digital</strong> ou presencialmente em uma unidade do <strong>SINE</strong>. Não deixe o prazo vencer: perder a janela de 120 dias significa perder o direito ao benefício naquela demissão.</p>

          <h3>Dicas para o período de transição</h3>
          <p>O seguro-desemprego é um suporte temporário, e planejar-se financeiramente durante esse período faz toda a diferença:</p>
          <ul>
            <li>Some o valor total das parcelas do seguro ao montante da <a href="/trabalhista/rescisao">rescisão</a> para saber quanto terá disponível.</li>
            <li>Use a <a href="/financeiro/simulador-investimentos">calculadora de investimentos</a> para avaliar onde aplicar a reserva da rescisão enquanto busca recolocação.</li>
            <li>Considere o impacto dos <a href="/financeiro/juros-compostos">juros compostos</a> antes de contrair dívidas nesse período.</li>
            <li>Verifique se o seu <a href="/trabalhista/salario-liquido">salário líquido</a> esperado no próximo emprego cobre suas despesas fixas.</li>
          </ul>
        </>
      }
    >
      <SeguroDesempregoForm />
    </CalculatorPage>
  )
}
