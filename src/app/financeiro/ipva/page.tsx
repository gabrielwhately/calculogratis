import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { IPVAForm } from '@/components/calculadoras/ipva-form'

export const metadata: Metadata = createCalculadoraMetadata('ipva')

export default function IPVAPage() {
  return (
    <CalculatorPage
      slug="ipva"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="IPVA"
      descricao="Quer saber quanto vai pagar de IPVA em 2026? Informe o valor FIPE do veículo e o estado de emplacamento — veja o imposto total e o valor de cada parcela."
      conteudo={
        <>
          <h2>O que e o IPVA e como ele e calculado</h2>
          <p>O <strong>IPVA (Imposto sobre a Propriedade de Veiculos Automotores)</strong> e um imposto estadual cobrado anualmente sobre a propriedade de veiculos. O calculo e direto:</p>
          <p><strong>IPVA = Valor Venal do Veiculo x Aliquota do Estado</strong></p>
          <p>O <em>valor venal</em> e determinado pela <strong>Tabela FIPE</strong> vigente em janeiro de cada exercicio. Como cada estado define sua propria aliquota, o mesmo veiculo pode gerar valores de IPVA bastante diferentes dependendo de onde esta emplacado. Para um carro avaliado em R$ 60.000 em Sao Paulo (aliquota de 4%), o IPVA e de <strong>R$ 2.400</strong>. O mesmo carro em Santa Catarina (aliquota de 2%) pagaria apenas <strong>R$ 1.200</strong>.</p>

          <h2>Aliquotas de IPVA 2026 por estado</h2>
          <p>Confira as aliquotas para <strong>veiculos de passeio</strong> nos principais estados brasileiros:</p>
          <ul>
            <li><strong>4%:</strong> Sao Paulo (SP), Rio de Janeiro (RJ), Minas Gerais (MG)</li>
            <li><strong>3,5%:</strong> Distrito Federal (DF), Parana (PR), Goias (GO)</li>
            <li><strong>3%:</strong> Rio Grande do Sul (RS), Bahia (BA), Pernambuco (PE)</li>
            <li><strong>2,5%:</strong> Ceara (CE), Para (PA), Amazonas (AM)</li>
            <li><strong>2%:</strong> Santa Catarina (SC), Espirito Santo (ES), Acre (AC)</li>
          </ul>
          <p>Para calcular exatamente quanto voce pagara com base na aliquota do seu estado, utilize o simulador acima. Ele ja aplica a aliquota correta automaticamente.</p>

          <h3>Aliquotas diferenciadas por tipo de veiculo</h3>
          <p>Alem das aliquotas para carros de passeio, muitos estados aplicam percentuais diferentes para outros tipos de veiculos:</p>
          <ul>
            <li><strong>Motocicletas:</strong> geralmente entre 1% e 2%, significativamente menor que veiculos de passeio</li>
            <li><strong>Caminhoes e onibus:</strong> aliquotas reduzidas em varios estados, refletindo a importancia para o transporte de cargas e passageiros</li>
            <li><strong>Veiculos eletricos e hibridos:</strong> incentivos fiscais com isencao total ou parcial em estados como SP, RJ e MG</li>
          </ul>

          <h2>Desconto a vista e opcoes de parcelamento</h2>
          <p>A maioria dos estados brasileiros permite o <strong>parcelamento do IPVA em ate 3 vezes</strong>, sem acrescimo de juros. O pagamento em <strong>cota unica</strong> geralmente oferece desconto, que varia por estado:</p>
          <ol>
            <li><strong>Sao Paulo:</strong> ate 3% de desconto para pagamento a vista</li>
            <li><strong>Minas Gerais:</strong> ate 3% de desconto</li>
            <li><strong>Rio Grande do Sul:</strong> descontos que podem chegar a 15% dependendo do programa estadual vigente</li>
          </ol>
          <p>Para avaliar se vale a pena pagar a vista ou parcelado, considere o rendimento que o dinheiro teria em uma aplicacao durante o periodo do parcelamento. Use nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> para calcular. Se o desconto a vista for maior que o rendimento projetado, compensa pagar de uma vez. Voce pode usar a <a href="/financeiro/calculadora-desconto">calculadora de desconto</a> para ver exatamente quanto economiza.</p>

          <h2>Isencao de IPVA para veiculos antigos</h2>
          <p>Veiculos com mais de <strong>15 a 20 anos de fabricacao</strong> podem ter isencao total de IPVA em varios estados. O prazo varia:</p>
          <ul>
            <li><strong>Isencao com 15 anos:</strong> Rio Grande do Norte, Roraima, Amapa</li>
            <li><strong>Isencao com 20 anos:</strong> Sao Paulo, Rio de Janeiro, Parana, entre outros</li>
            <li><strong>Isencao progressiva:</strong> alguns estados reduzem a aliquota gradualmente apos determinada idade do veiculo</li>
          </ul>
          <p>Verifique sempre o calendario de pagamento e as regras de isencao no site do DETRAN ou da Secretaria da Fazenda do seu estado.</p>

          <h2>IPVA no planejamento financeiro anual</h2>
          <p>O IPVA e uma despesa previsivel que deve ser incluida no <strong>planejamento financeiro anual</strong>. Junto com seguro, licenciamento e manutencao, o custo total de manter um veiculo pode representar uma parcela significativa do orcamento. Considere esse valor ao calcular seu <a href="/trabalhista/salario-liquido">salario liquido</a> e ao planejar suas <a href="/financeiro/simulador-investimentos">metas de investimento</a>. Se voce esta avaliando a compra de um veiculo financiado, combine o custo do IPVA com a simulacao do <a href="/financeiro/financiamento">financiamento</a> para ter uma visao completa do comprometimento financeiro.</p>
        </>
      }
    >
      <IPVAForm />
    </CalculatorPage>
  )
}
