import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CombustivelForm } from '@/components/calculadoras/combustivel-form'

export const metadata: Metadata = createCalculadoraMetadata('combustivel')

export default function CombustivelPage() {
  return (
    <CalculatorPage
      slug="combustivel"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Combustível (Custo de Viagem)"
      descricao="Indo de São Paulo a Florianópolis? Informe a distância, o consumo do seu carro e o preço do combustível para saber exatamente quanto vai gastar na viagem."
      faqs={[
        { question: 'Como calcular o gasto de combustível?', answer: 'Divida a distância pelo consumo médio do veículo (km/l) para saber quantos litros vai usar. Multiplique pelo preço do litro para ter o custo. Por exemplo: 600 km com carro de 12 km/l = 50 litros. A R$ 6,20 o litro, dá R$ 310 de combustível.' },
        { question: 'Qual o consumo médio de um carro?', answer: 'Carros populares (Gol, Onix, HB20) fazem entre 10 e 14 km/l na cidade e 12 a 16 km/l na estrada. SUVs ficam entre 7 e 12 km/l. Híbridos podem passar de 20 km/l. Ar-condicionado ligado e excesso de peso no porta-malas reduzem o consumo.' },
        { question: 'Álcool ou gasolina, qual compensa?', answer: 'Se o preço do álcool for menor que 70% do preço da gasolina, o álcool compensa — porque ele rende cerca de 70% em relação à gasolina. Por exemplo: gasolina a R$ 6,00, álcool até R$ 4,20 vale a pena. Acima disso, a gasolina fica mais econômica por km rodado.' },
      ]}
      conteudo={
        <>
          <h2>Como calcular o gasto de combustivel de uma viagem</h2>
          <p>A formula para calcular o custo de combustivel de uma viagem e simples e direta:</p>
          <ol>
            <li><strong>Calcule os litros necessarios:</strong> divida a distancia total pelo consumo medio do veiculo (km/l). Exemplo: 600 km com carro de 12 km/l = 50 litros</li>
            <li><strong>Calcule o custo total:</strong> multiplique os litros pelo preco do combustivel. Exemplo: 50 litros a R$ 6,20 = R$ 310,00</li>
            <li><strong>Considere ida e volta:</strong> se a viagem tem retorno, dobre a distancia antes de calcular</li>
          </ol>
          <p>Nossa calculadora de combustivel faz todo esse calculo automaticamente. Basta informar a distancia, o consumo do seu veiculo e o preco do litro.</p>

          <h2>Alcool ou gasolina: qual compensa mais</h2>
          <p>Uma das duvidas mais comuns entre motoristas de carros flex e quando vale a pena abastecer com etanol em vez de gasolina. A <strong>regra dos 70%</strong> e a referencia mais confiavel:</p>
          <ul>
            <li>Se o preco do etanol for <strong>menor que 70%</strong> do preco da gasolina, o etanol compensa</li>
            <li>Se for <strong>maior que 70%</strong>, a gasolina e mais economica por quilometro rodado</li>
          </ul>
          <p>Isso acontece porque o etanol tem poder calorifico menor, rendendo aproximadamente <em>70% do que a gasolina rende</em> em termos de quilometragem. Exemplo pratico: gasolina a R$ 6,00 -- o etanol so compensa se custar ate R$ 4,20.</p>

          <h3>Fatores que afetam o consumo real do veiculo</h3>
          <p>O consumo informado pelo fabricante e medido em condicoes ideais de laboratorio. Na pratica, diversos fatores aumentam o consumo em <strong>20% a 40%</strong>:</p>
          <ul>
            <li><strong>Transito urbano:</strong> paradas e arrancadas frequentes aumentam significativamente o consumo</li>
            <li><strong>Ar-condicionado:</strong> pode adicionar de 10% a 20% ao consumo, especialmente em carros menores</li>
            <li><strong>Pneus descalibrados:</strong> aumentam a resistencia ao rolamento e o consumo</li>
            <li><strong>Excesso de peso:</strong> bagagem e passageiros extras impactam diretamente</li>
            <li><strong>Estilo de direcao:</strong> aceleracoes bruscas e velocidades altas consomem mais</li>
          </ul>
          <p>Para obter resultados mais precisos na calculadora, use o consumo medio que voce observa no dia a dia, nao o numero do catalogo do fabricante.</p>

          <h2>Consumo medio por tipo de veiculo</h2>
          <p>Como referencia para usar na calculadora, estes sao os consumos medios tipicos no Brasil:</p>
          <ul>
            <li><strong>Carros populares</strong> (Gol, Onix, HB20): 10 a 14 km/l na cidade, 12 a 16 km/l na estrada</li>
            <li><strong>Sedas medios</strong> (Corolla, Civic, Cruze): 9 a 13 km/l na cidade, 11 a 15 km/l na estrada</li>
            <li><strong>SUVs</strong> (Compass, Tracker, Creta): 7 a 12 km/l na cidade, 9 a 14 km/l na estrada</li>
            <li><strong>Hibridos</strong>: podem ultrapassar 20 km/l em uso urbano</li>
          </ul>

          <h2>Planejando o custo total da viagem</h2>
          <p>O combustivel e apenas uma parte do custo de uma viagem rodoviaria. Para ter uma estimativa completa, considere tambem os pedagios -- em rodovias como a Dutra (SP-RJ) ou Anchieta-Imigrantes (SP-Santos), o custo dos pedagios pode ser significativo. Use a <a href="/utilidades/dias-entre-datas">calculadora de dias entre datas</a> para planejar a duracao da viagem, e se precisar converter valores para planejar uma viagem internacional, nossas ferramentas de <a href="/utilidades/calculadora-idade">calculo de idade</a> e <a href="/utilidades/fuso-horario">conversao de fuso horario</a> tambem podem ser uteis.</p>
        </>
      }
    >
      <CombustivelForm />
    </CalculatorPage>
  )
}
