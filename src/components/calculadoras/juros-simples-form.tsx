'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularJurosSimples } from '@/lib/calculadoras/juros-simples'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

export function JurosSimplesForm() {
  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularJurosSimples> | null>(null)

  function handleCalcular() {
    setResult(calcularJurosSimples({ capital: parseBRNumber(capital), taxaMensal: parseBRNumber(taxa), meses: parseInt(meses) || 0 }))
  }

  const isValid = parseBRNumber(capital) > 0 && parseBRNumber(taxa) >= 0 && parseInt(meses) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Capital inicial (R$)" id="capital" value={capital} onChange={setCapital} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Taxa mensal (%)" id="taxa" value={taxa} onChange={setTaxa} inputMode="decimal" placeholder="Ex: 1,5" suffix="%" />
        <Input label="Periodo (meses)" id="meses" value={meses} onChange={setMeses} inputMode="numeric" placeholder="Ex: 12" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado" mainValue={result ? formatCurrency(result.montante) : ''} mainLabel="Montante final"
        items={result ? [{ label: 'Capital', value: formatCurrency(result.capital) }, { label: 'Juros', value: formatCurrency(result.juros), highlight: true }, { label: 'Taxa mensal', value: `${result.taxaMensal}%` }, { label: 'Periodo', value: `${result.meses} meses` }] : []} />
    </>
  )
}
