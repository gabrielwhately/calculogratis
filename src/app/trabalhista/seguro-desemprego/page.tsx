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
      descricao="Calcule o valor e o numero de parcelas do seguro desemprego com base nos seus ultimos salarios."
      conteudo={
        <>
          <h2>Como funciona o calculo do seguro-desemprego em 2026</h2>
          <p>O seguro-desemprego e um beneficio temporario pago ao trabalhador <strong>demitido sem justa causa</strong>, com o objetivo de garantir assistencia financeira durante o periodo de transicao entre empregos. O valor das parcelas nao e fixo: ele e calculado com base na <strong>media dos tres ultimos salarios</strong> anteriores a demissao, aplicando-se faixas percentuais definidas pelo Ministerio do Trabalho.</p>
          <p>Antes de solicitar o beneficio, vale conferir os valores da <a href="/trabalhista/rescisao">rescisao trabalhista</a>, que inclui verbas como saldo de salario, <a href="/trabalhista/ferias">ferias proporcionais</a>, <a href="/trabalhista/decimo-terceiro">13o proporcional</a> e multa do FGTS.</p>

          <h3>Tabela de calculo do valor das parcelas</h3>
          <p>O calculo segue tres faixas progressivas baseadas na media salarial:</p>
          <ol>
            <li><strong>Media ate R$ 2.138,76:</strong> multiplica-se o valor por 0,8 (80%). Quem ganha menos recebe proporcionalmente mais.</li>
            <li><strong>Media entre R$ 2.138,77 e R$ 3.564,96:</strong> o excedente acima da primeira faixa e multiplicado por 0,5 (50%) e somado a R$ 1.711,01.</li>
            <li><strong>Media acima de R$ 3.564,96:</strong> o valor da parcela fica fixo no teto de <strong>R$ 2.424,11</strong>, independentemente de quanto o trabalhador ganhava.</li>
          </ol>
          <p>Em nenhum caso o valor do beneficio pode ser inferior ao <strong>salario minimo vigente</strong> (R$ 1.518,00 em 2026).</p>

          <h3>Quem tem direito ao seguro-desemprego</h3>
          <p>Os requisitos variam conforme o numero de solicitacoes anteriores do trabalhador:</p>
          <ul>
            <li><strong>1a solicitacao:</strong> ter trabalhado com carteira assinada por pelo menos <em>12 meses</em> nos ultimos 18 meses antes da demissao. Direito a 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
            <li><strong>2a solicitacao:</strong> minimo de <em>9 meses</em> trabalhados nos ultimos 12. Direito a 3 parcelas (9 a 11 meses), 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
            <li><strong>3a solicitacao em diante:</strong> bastam <em>6 meses</em> de trabalho ininterrupto. Direito a 3 parcelas (6 a 11 meses), 4 parcelas (12 a 23 meses) ou 5 parcelas (24 meses ou mais).</li>
          </ul>
          <p>Importante: quem recebe <a href="/previdencia/aposentadoria">aposentadoria</a> do INSS (exceto pensao por morte), BPC/LOAS ou possui renda propria suficiente para o sustento <strong>nao tem direito</strong> ao seguro-desemprego.</p>

          <h3>Prazo e canais para solicitar</h3>
          <p>O pedido deve ser feito dentro de uma janela especifica:</p>
          <ul>
            <li><strong>Trabalhador formal:</strong> entre o 7o e o 120o dia apos a demissao.</li>
            <li><strong>Empregado domestico:</strong> entre o 7o e o 90o dia.</li>
            <li><strong>Pescador artesanal e trabalhador resgatado:</strong> prazos especificos conforme a legislacao.</li>
          </ul>
          <p>A solicitacao pode ser feita pelo portal <strong>Gov.br</strong>, pelo aplicativo <strong>Carteira de Trabalho Digital</strong> ou presencialmente em uma unidade do <strong>SINE</strong>. Nao deixe o prazo vencer: perder a janela de 120 dias significa perder o direito ao beneficio naquela demissao.</p>

          <h3>Dicas para o periodo de transicao</h3>
          <p>O seguro-desemprego e um suporte temporario, e planejar-se financeiramente durante esse periodo faz toda a diferenca:</p>
          <ul>
            <li>Some o valor total das parcelas do seguro ao montante da <a href="/trabalhista/rescisao">rescisao</a> para saber quanto tera disponivel.</li>
            <li>Use a <a href="/financeiro/simulador-investimentos">calculadora de investimentos</a> para avaliar onde aplicar a reserva da rescisao enquanto busca recolocacao.</li>
            <li>Considere o impacto dos <a href="/financeiro/juros-compostos">juros compostos</a> antes de contrair dividas nesse periodo.</li>
            <li>Verifique se o seu <a href="/trabalhista/salario-liquido">salario liquido</a> esperado no proximo emprego cobre suas despesas fixas.</li>
          </ul>
        </>
      }
    >
      <SeguroDesempregoForm />
    </CalculatorPage>
  )
}
