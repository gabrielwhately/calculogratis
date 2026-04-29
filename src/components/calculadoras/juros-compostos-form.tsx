'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularJurosCompostos } from '@/lib/calculadoras/juros-compostos'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

export function JurosCompostosForm() {
  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [meses, setMeses] = useState('')
  const [aporte, setAporte] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularJurosCompostos> | null>(null)

  function handleCalcular() {
    setResult(calcularJurosCompostos({ capital: parseBRNumber(capital), taxaMensal: parseBRNumber(taxa), meses: parseInt(meses) || 0, aporteMensal: parseBRNumber(aporte) }))
  }

  const isValid = (parseBRNumber(capital) > 0 || parseBRNumber(aporte) > 0) && parseInt(meses) > 0

  return (
    <>
      <FormCard>
        <Input label="Capital inicial (R$)" id="capital" value={capital} onChange={setCapital} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Aporte mensal (R$)" id="aporte" value={aporte} onChange={setAporte} inputMode="decimal" placeholder="Ex: 500,00" />
        <Input label="Taxa mensal (%)" id="taxa" value={taxa} onChange={setTaxa} inputMode="decimal" placeholder="Ex: 1,0" suffix="%" />
        <Input label="Período (meses)" id="meses" value={meses} onChange={setMeses} inputMode="numeric" placeholder="Ex: 24" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </FormCard>
      <ResultCard visible={result !== null} title="Resultado" mainValue={result ? formatCurrency(result.montante) : ''} mainLabel="Montante final"
        items={result ? [{ label: 'Total investido', value: formatCurrency(result.totalInvestido) }, { label: 'Juros ganhos', value: formatCurrency(result.juros), highlight: true }, { label: 'Taxa mensal', value: `${result.taxaMensal}%` }, { label: 'Periodo', value: `${result.meses} meses` }] : []} />
    </>
  )
}
