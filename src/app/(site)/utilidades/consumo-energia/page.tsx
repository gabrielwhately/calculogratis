import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ConsumoEnergiaForm } from '@/components/calculadoras/consumo-energia-form'

export const metadata: Metadata = createCalculadoraMetadata('consumo-energia')

export default function ConsumoEnergiaPage() {
  return (
    <CalculatorPage
      slug="consumo-energia"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Consumo de Energia Eletrica"
      descricao="Descubra quanto cada aparelho gasta de energia eletrica por mes e por ano. Calcule o impacto na sua conta de luz."
      conteudo={
        <>
          <h2>Como calcular o consumo de energia de um aparelho</h2>
          <p>O consumo de energia eletrica de um aparelho depende de tres fatores: a <strong>potencia</strong> (em Watts), o <strong>tempo de uso</strong> diario e a <strong>quantidade de dias</strong> no mes. A formula e:</p>
          <p><strong>Consumo (kWh) = (Potencia em W x Horas por dia x Dias no mes) / 1.000</strong></p>
          <p>Por exemplo, um chuveiro eletrico de 5.500W usado por 15 minutos por dia (0,25h) durante 30 dias consome: 5.500 x 0,25 x 30 / 1.000 = <strong>41,25 kWh/mes</strong>.</p>

          <h2>Potencia dos aparelhos mais comuns</h2>
          <ul>
            <li><strong>Geladeira:</strong> 100-300W (funciona ~8h efetivas/dia)</li>
            <li><strong>Ar-condicionado:</strong> 1.000-2.500W</li>
            <li><strong>Chuveiro eletrico:</strong> 3.500-7.500W</li>
            <li><strong>Maquina de lavar:</strong> 500-1.000W</li>
            <li><strong>Televisao LED:</strong> 50-150W</li>
            <li><strong>Lampada LED:</strong> 7-15W</li>
            <li><strong>Computador:</strong> 150-400W</li>
            <li><strong>Micro-ondas:</strong> 800-1.500W</li>
          </ul>

          <h2>Entendendo a tarifa de energia</h2>
          <p>A tarifa de energia varia por estado e distribuidora. Em 2026, a media nacional esta entre R$ 0,70 e R$ 1,10 por kWh, dependendo da bandeira tarifaria vigente (verde, amarela ou vermelha). Consulte sua conta de luz para encontrar o valor exato da sua tarifa.</p>
          <p>Use esta calculadora junto com o <a href="/utilidades/combustivel">comparador de combustivel</a> para otimizar seus gastos com energia no dia a dia.</p>
        </>
      }
    >
      <ConsumoEnergiaForm />
    </CalculatorPage>
  )
}
