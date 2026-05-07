import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ConversorUnidadesForm } from '@/components/calculadoras/conversor-unidades-form'

export const metadata: Metadata = createCalculadoraMetadata('conversor-unidades')

export default function ConversorUnidadesPage() {
  return (
    <CalculatorPage
      slug="conversor-unidades"
      categoriaSlug="conversores"
      categoriaNome="Conversores"
      nome="Conversor de Unidades"
      descricao="Está lendo uma receita americana em xícaras e °F, ou comparando uma TV de 55 polegadas com outra em centímetros? Converte comprimento, peso, temperatura e volume entre os dois sistemas."
      faqs={[
        { question: 'Como converter Celsius para Fahrenheit?', answer: 'A fórmula é F = (C × 9 ÷ 5) + 32. Na prática: 100°C vira 212°F (ebulição), 0°C vira 32°F (gelo), 37°C vira 98,6°F (temperatura corporal). Para fazer de cabeça: dobre o valor em Celsius, subtraia 10% e some 32 — fica bem próximo.' },
        { question: 'Quantos metros tem um quilômetro?', answer: 'Exatos 1.000 metros. E 1 metro tem 100 centímetros ou 1.000 milímetros. No sistema imperial, 1 milha = 1.609,34 m, 1 pé = 30,48 cm, 1 polegada = 2,54 cm. Esses últimos aparecem bastante em telas, pneus e calçados importados.' },
        { question: 'Como converter libras para quilogramas?', answer: 'Multiplique por 0,4536. Então 150 libras ≈ 68 kg. Para converter ao contrário, multiplique kg por 2,205. Nos EUA, peso corporal é sempre em libras — se alguém diz que pesa 180 lbs, isso é cerca de 82 kg.' },
      ]}
      conteudo={
        <>
          <h2>Conversor de unidades: o que voce pode converter</h2>
          <p>Nosso <strong>conversor de unidades</strong> cobre quatro categorias essenciais para o dia a dia, cada uma com as unidades mais utilizadas no Brasil e no mundo:</p>
          <ul>
            <li><strong>Comprimento:</strong> metros, quilometros, centimetros, milimetros, milhas, jardas, pes e polegadas. Ideal para calcular distancias, dimensoes de moveis e tamanhos de telas.</li>
            <li><strong>Peso e massa:</strong> quilogramas, gramas, miligramas, toneladas, libras e oncas. Essencial para receitas internacionais, bagagem de viagem e logistica.</li>
            <li><strong>Temperatura:</strong> Celsius, Fahrenheit e Kelvin. Indispensavel para receitas, previsoes do tempo de outros paises e estudos cientificos.</li>
            <li><strong>Volume:</strong> litros, mililitros, metros cubicos, galoes, quartos e xicaras. Fundamental para culinaria, combustiveis e calculo de capacidade.</li>
          </ul>
          <p>Basta selecionar a categoria, escolher as unidades de origem e destino, e o resultado aparece instantaneamente. Para conversoes de moedas, utilize nosso <a href="/conversores/real-dolar">conversor de Real para Dolar</a> ou o <a href="/conversores/real-bitcoin">conversor de Real para Bitcoin</a>.</p>

          <h2>Por que o sistema imperial ainda aparece no dia a dia brasileiro</h2>
          <p>Embora o Brasil adote oficialmente o <strong>Sistema Internacional de Unidades (SI)</strong>, o sistema imperial aparece em diversos contextos praticos:</p>
          <ol>
            <li><strong>Telas e monitores:</strong> televisores, smartphones e notebooks tem suas dimensoes especificadas em <em>polegadas</em>. Uma TV de 55 polegadas equivale a 139,7 cm de diagonal.</li>
            <li><strong>Pneus de automoveis:</strong> a especificacao de pneus mistura sistemas -- por exemplo, 205/55 R16, onde 16 e o aro em polegadas.</li>
            <li><strong>Calcados importados:</strong> a numeracao americana segue um padrao proprio baseado em polegadas. Um numero 10 US masculino equivale aproximadamente ao 42 brasileiro.</li>
            <li><strong>Receitas internacionais:</strong> sites de culinaria americanos usam <em>cups</em>, <em>ounces</em> (oz) e temperaturas em Fahrenheit. Sem converter, os resultados podem ser desastrosos na cozinha.</li>
            <li><strong>Aviacao e navegacao:</strong> altitudes sao medidas em pes e distancias nauticas em milhas nauticas, por padrao internacional.</li>
          </ol>

          <h2>Tabela de referencia rapida: conversoes mais buscadas</h2>
          <p>Para facilitar estimativas rapidas, memorize estas equivalencias fundamentais:</p>
          <ul>
            <li><strong>1 polegada</strong> = 2,54 cm (util para telas e parafusos)</li>
            <li><strong>1 pe</strong> = 30,48 cm (util para alturas em documentos americanos)</li>
            <li><strong>1 milha</strong> = 1,609 km (util para converter velocidades e distancias)</li>
            <li><strong>1 libra</strong> = 0,4536 kg (util para peso corporal e bagagem)</li>
            <li><strong>1 onca</strong> = 28,35 g (util para receitas e metais preciosos)</li>
            <li><strong>1 galao americano</strong> = 3,785 litros (util para calcular consumo de combustivel)</li>
            <li><strong>1 xicara americana</strong> = 236,6 ml (util para receitas)</li>
          </ul>
          <p>Se voce precisa calcular <a href="/matematica/porcentagem">porcentagens</a> ou fazer conversoes entre <a href="/matematica/conversor-bases">bases numericas</a> (binario, octal, hexadecimal), temos ferramentas especificas para isso tambem.</p>

          <h2>Temperaturas de referencia para o dia a dia</h2>
          <p>A conversao de temperatura gera mais confusao do que as demais, pois nao e uma simples multiplicacao. A formula de Celsius para Fahrenheit e: <em>F = (C x 9 / 5) + 32</em>. Para facilitar, guarde estes pontos de referencia:</p>
          <ul>
            <li><strong>0°C = 32°F</strong> -- ponto de congelamento da agua</li>
            <li><strong>20°C = 68°F</strong> -- temperatura ambiente confortavel</li>
            <li><strong>37°C = 98,6°F</strong> -- temperatura corporal normal (util ao usar a <a href="/saude/imc">calculadora de saude</a>)</li>
            <li><strong>100°C = 212°F</strong> -- ponto de ebulicao da agua ao nivel do mar</li>
            <li><strong>180°C = 356°F</strong> -- forno medio para assar bolos e paes</li>
          </ul>
          <p><strong>Dica pratica:</strong> para estimar Fahrenheit de cabeca, dobre o valor em Celsius, subtraia 10% do resultado e some 32. O resultado fica muito proximo do valor exato e resolve a maioria das situacoes cotidianas.</p>

          <h2>Quando usar cada sistema de medida</h2>
          <p>Na pratica, saber quando cada sistema se aplica economiza tempo e evita erros. O <strong>sistema metrico</strong> e padrao para documentos oficiais, compras no comercio brasileiro, receitas medicas e trabalhos academicos. Ja o <strong>sistema imperial</strong> aparece em produtos importados, manuais tecnicos de fabricantes americanos e comunicacao com parceiros nos Estados Unidos.</p>
          <p>Se voce trabalha com comercio exterior ou importacao de produtos, nosso <a href="/financeiro/simulador-importacao">simulador de importacao</a> pode ajudar a calcular custos totais, incluindo impostos e frete. E para quem lida com diferentes <a href="/utilidades/fuso-horario">fusos horarios</a> ao se comunicar com fornecedores internacionais, temos um conversor dedicado.</p>
        </>
      }
    >
      <ConversorUnidadesForm />
    </CalculatorPage>
  )
}
