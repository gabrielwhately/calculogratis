import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { RescisaoForm } from '@/components/calculadoras/rescisao-form'

export const metadata: Metadata = createCalculadoraMetadata('rescisao')

export default function RescisaoPage() {
  return (
    <CalculatorPage
      slug="rescisao"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Rescisão Trabalhista"
      descricao="Calcule o valor da sua rescisão trabalhista. Simule para demissão sem justa causa, pedido de demissão, justa causa e acordo mútuo."
      conteudo={
        <>
          <h2>Como funciona o cálculo de rescisão trabalhista em 2026</h2>
          <p>O cálculo de rescisão trabalhista envolve diversas verbas que dependem do <strong>tipo de desligamento</strong>, do tempo de serviço e do salário do trabalhador. Para obter o valor correto, nossa calculadora considera automaticamente o saldo de salário, o aviso prévio proporcional, as <a href="/trabalhista/ferias">férias proporcionais e vencidas</a> com o adicional de 1/3, o <a href="/trabalhista/decimo-terceiro">13º salário proporcional</a> e a multa rescisória do FGTS.</p>
          <p>Todos os descontos de <strong>INSS</strong> e <a href="/trabalhista/irrf">IRRF</a> são aplicados conforme as tabelas progressivas vigentes em 2026, garantindo um resultado preciso e atualizado.</p>

          <h3>Os quatro tipos de rescisão e seus direitos</h3>
          <p>Nem toda saída do emprego gera os mesmos direitos. Veja o que muda em cada modalidade:</p>
          <ol>
            <li><strong>Demissão sem justa causa:</strong> o trabalhador recebe o pacote completo de verbas rescisórias, incluindo multa de 40% do FGTS, saque integral do fundo e direito ao <a href="/trabalhista/seguro-desemprego">seguro-desemprego</a>. É o cenário que gera o maior valor de rescisão.</li>
            <li><strong>Pedido de demissão:</strong> iniciativa do empregado. Nesse caso, não há multa do FGTS, saque do fundo nem seguro-desemprego. As demais verbas — saldo de salário, férias e 13º proporcional — continuam devidas.</li>
            <li><strong>Demissão por justa causa:</strong> ocorre quando há falta grave comprovada, como abandono de emprego ou ato de improbidade. O trabalhador recebe <em>apenas</em> saldo de salário e férias vencidas com 1/3.</li>
            <li><strong>Acordo mútuo (reforma trabalhista):</strong> criado pela Lei 13.467/2017, prevê 50% do aviso prévio indenizado, 20% da multa do FGTS e saque de até 80% do fundo. Não gera direito ao seguro-desemprego.</li>
          </ol>

          <h3>Aviso prévio proporcional: como calcular</h3>
          <p>Desde a Lei 12.506/2011, o aviso prévio vai além dos 30 dias fixos. O prazo base de <strong>30 dias</strong> é acrescido de <strong>3 dias por ano completo</strong> de trabalho na mesma empresa, até o limite máximo de 90 dias adicionais (totalizando 120 dias). Por exemplo:</p>
          <ul>
            <li>Empregado com 2 anos de empresa: 30 + 6 = <strong>36 dias</strong> de aviso prévio</li>
            <li>Empregado com 10 anos: 30 + 30 = <strong>60 dias</strong> de aviso prévio</li>
            <li>Empregado com 30 anos ou mais: atinge o teto de <strong>120 dias</strong></li>
          </ul>
          <p>No acordo mútuo, o aviso prévio indenizado é reduzido pela metade. Use a <a href="/utilidades/dias-entre-datas">calculadora de dias entre datas</a> para conferir o período exato de trabalho.</p>

          <h3>Verbas rescisórias: o que entra no cálculo</h3>
          <p>A rescisão trabalhista é composta por diversas parcelas. Para entender o valor total, é importante conhecer cada uma:</p>
          <ul>
            <li><strong>Saldo de salário:</strong> dias trabalhados no mês da demissão, proporcionalmente ao <a href="/trabalhista/salario-liquido">salário líquido</a> do trabalhador.</li>
            <li><strong>Férias proporcionais + 1/3:</strong> referentes ao período aquisitivo incompleto. Se houver férias vencidas, elas também são pagas integralmente.</li>
            <li><strong>13º proporcional:</strong> calculado com base nos meses trabalhados no ano. Mês com 15 dias ou mais de trabalho conta como mês inteiro.</li>
            <li><strong>Multa do FGTS:</strong> na demissão sem justa causa, a empresa paga 40% sobre o saldo total do FGTS acumulado durante o contrato.</li>
          </ul>

          <h3>Dicas para conferir sua rescisão</h3>
          <p>Recebeu o termo de rescisão e quer conferir os valores? Siga estes passos práticos:</p>
          <ol>
            <li>Verifique se o <strong>tipo de rescisão</strong> informado no documento corresponde à realidade do desligamento.</li>
            <li>Confira se o tempo de serviço está correto — cada dia a mais pode alterar férias e aviso prévio.</li>
            <li>Compare os descontos de INSS e IR com os valores calculados pela nossa ferramenta.</li>
            <li>Se houver <a href="/trabalhista/hora-extra">horas extras</a> habituais, elas devem integrar a base de cálculo das verbas rescisórias.</li>
          </ol>
          <p>Lembre-se: o prazo para pagamento das verbas rescisórias é de <strong>10 dias corridos</strong> a partir do término do contrato, independentemente do tipo de rescisão. O descumprimento gera multa equivalente a um salário do empregado.</p>
        </>
      }
    >
      <RescisaoForm />
    </CalculatorPage>
  )
}
