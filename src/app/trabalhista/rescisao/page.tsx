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
      nome="Rescisao Trabalhista"
      descricao="Calcule o valor da sua rescisao trabalhista. Simule para demissao sem justa causa, pedido de demissao, justa causa e acordo mutuo."
      conteudo={
        <>
          <h2>Como funciona o calculo de rescisao trabalhista em 2026</h2>
          <p>O calculo de rescisao trabalhista envolve diversas verbas que dependem do <strong>tipo de desligamento</strong>, do tempo de servico e do salario do trabalhador. Para obter o valor correto, nossa calculadora considera automaticamente o saldo de salario, o aviso previo proporcional, as <a href="/trabalhista/ferias">ferias proporcionais e vencidas</a> com o adicional de 1/3, o <a href="/trabalhista/decimo-terceiro">13o salario proporcional</a> e a multa rescisoria do FGTS.</p>
          <p>Todos os descontos de <strong>INSS</strong> e <a href="/trabalhista/irrf">IRRF</a> sao aplicados conforme as tabelas progressivas vigentes em 2026, garantindo um resultado preciso e atualizado.</p>

          <h3>Os quatro tipos de rescisao e seus direitos</h3>
          <p>Nem toda saida do emprego gera os mesmos direitos. Veja o que muda em cada modalidade:</p>
          <ol>
            <li><strong>Demissao sem justa causa:</strong> o trabalhador recebe o pacote completo de verbas rescisorias, incluindo multa de 40% do FGTS, saque integral do fundo e direito ao <a href="/trabalhista/seguro-desemprego">seguro-desemprego</a>. E o cenario que gera o maior valor de rescisao.</li>
            <li><strong>Pedido de demissao:</strong> iniciativa do empregado. Nesse caso, nao ha multa do FGTS, saque do fundo nem seguro-desemprego. As demais verbas — saldo de salario, ferias e 13o proporcional — continuam devidas.</li>
            <li><strong>Demissao por justa causa:</strong> ocorre quando ha falta grave comprovada, como abandono de emprego ou ato de improbidade. O trabalhador recebe <em>apenas</em> saldo de salario e ferias vencidas com 1/3.</li>
            <li><strong>Acordo mutuo (reforma trabalhista):</strong> criado pela Lei 13.467/2017, preve 50% do aviso previo indenizado, 20% da multa do FGTS e saque de ate 80% do fundo. Nao gera direito ao seguro-desemprego.</li>
          </ol>

          <h3>Aviso previo proporcional: como calcular</h3>
          <p>Desde a Lei 12.506/2011, o aviso previo vai alem dos 30 dias fixos. O prazo base de <strong>30 dias</strong> e acrescido de <strong>3 dias por ano completo</strong> de trabalho na mesma empresa, ate o limite maximo de 90 dias adicionais (totalizando 120 dias). Por exemplo:</p>
          <ul>
            <li>Empregado com 2 anos de empresa: 30 + 6 = <strong>36 dias</strong> de aviso previo</li>
            <li>Empregado com 10 anos: 30 + 30 = <strong>60 dias</strong> de aviso previo</li>
            <li>Empregado com 30 anos ou mais: atinge o teto de <strong>120 dias</strong></li>
          </ul>
          <p>No acordo mutuo, o aviso previo indenizado e reduzido pela metade. Use a <a href="/utilidades/dias-entre-datas">calculadora de dias entre datas</a> para conferir o periodo exato de trabalho.</p>

          <h3>Verbas rescisorias: o que entra no calculo</h3>
          <p>A rescisao trabalhista e composta por diversas parcelas. Para entender o valor total, e importante conhecer cada uma:</p>
          <ul>
            <li><strong>Saldo de salario:</strong> dias trabalhados no mes da demissao, proporcionalmente ao <a href="/trabalhista/salario-liquido">salario liquido</a> do trabalhador.</li>
            <li><strong>Ferias proporcionais + 1/3:</strong> referentes ao periodo aquisitivo incompleto. Se houver ferias vencidas, elas tambem sao pagas integralmente.</li>
            <li><strong>13o proporcional:</strong> calculado com base nos meses trabalhados no ano. Mes com 15 dias ou mais de trabalho conta como mes inteiro.</li>
            <li><strong>Multa do FGTS:</strong> na demissao sem justa causa, a empresa paga 40% sobre o saldo total do FGTS acumulado durante o contrato.</li>
          </ul>

          <h3>Dicas para conferir sua rescisao</h3>
          <p>Recebeu o termo de rescisao e quer conferir os valores? Siga estes passos praticos:</p>
          <ol>
            <li>Verifique se o <strong>tipo de rescisao</strong> informado no documento corresponde a realidade do desligamento.</li>
            <li>Confira se o tempo de servico esta correto — cada dia a mais pode alterar ferias e aviso previo.</li>
            <li>Compare os descontos de INSS e IR com os valores calculados pela nossa ferramenta.</li>
            <li>Se houver <a href="/trabalhista/hora-extra">horas extras</a> habituais, elas devem integrar a base de calculo das verbas rescisorias.</li>
          </ol>
          <p>Lembre-se: o prazo para pagamento das verbas rescisorias e de <strong>10 dias corridos</strong> a partir do termino do contrato, independentemente do tipo de rescisao. O descumprimento gera multa equivalente a um salario do empregado.</p>
        </>
      }
    >
      <RescisaoForm />
    </CalculatorPage>
  )
}
