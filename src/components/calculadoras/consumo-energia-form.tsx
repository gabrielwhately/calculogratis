'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularConsumoAparelho } from '@/lib/calculadoras/consumo-energia'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function ConsumoEnergiaForm() {
  const [potencia, setPotencia] = useState('')
  const [horas, setHoras] = useState('')
  const [dias, setDias] = useState('30')
  const [tarifa, setTarifa] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularConsumoAparelho> | null>(null)

  function handleCalcular() {
    setResult(calcularConsumoAparelho(
      parseBRNumber(potencia),
      parseBRNumber(horas),
      parseBRNumber(dias),
      parseBRNumber(tarifa),
    ))
  }

  const isValid = parseBRNumber(potencia) > 0 && parseBRNumber(horas) > 0 && parseBRNumber(tarifa) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Potencia do aparelho (Watts)" id="potencia" value={potencia} onChange={(v) => setPotencia(v.replace(/[^\d]/g, ''))} inputMode="numeric" placeholder="Ex: 1500" />
        <Input label="Horas de uso por dia" id="horas" value={horas} onChange={(v) => setHoras(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 8" />
        <Input label="Dias de uso por mes" id="dias" value={dias} onChange={(v) => setDias(v.replace(/[^\d]/g, ''))} inputMode="numeric" placeholder="30" />
        <Input label="Tarifa de energia (R$/kWh)" id="tarifa" value={tarifa} onChange={(v) => setTarifa(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 0,85" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Consumo</Button>
      </div>
      <ResultCard visible={result !== null} title="Consumo de Energia" mainValue={result ? formatCurrency(result.custoMensal) : ''} mainLabel="Custo mensal estimado"
        items={result ? [
          { label: 'Consumo mensal', value: `${result.consumoMensalKwh.toFixed(1)} kWh` },
          { label: 'Custo mensal', value: formatCurrency(result.custoMensal), highlight: true },
          { label: 'Consumo anual', value: `${result.consumoAnualKwh.toFixed(1)} kWh` },
          { label: 'Custo anual', value: formatCurrency(result.custoAnual), highlight: true },
        ] : []} />
    </>
  )
}
