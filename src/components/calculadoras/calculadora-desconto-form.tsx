'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDesconto } from '@/lib/calculadoras/calculadora-desconto'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function CalculadoraDescontoForm() {
  const [valor, setValor] = useState('')
  const [desconto, setDesconto] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularDesconto> | null>(null)

  function handleCalcular() {
    setResult(calcularDesconto(parseBRNumber(valor), parseBRNumber(desconto)))
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(desconto) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input
          label="Valor original (R$)"
          id="valor"
          value={valor}
          onChange={(v) => setValor(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 299,90"
        />
        <Input
          label="Desconto (%)"
          id="desconto"
          value={desconto}
          onChange={(v) => setDesconto(maskPercent(v))}
          inputMode="decimal"
          placeholder="Ex: 15"
          suffix="%"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Desconto</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Resultado do Desconto"
        mainValue={result ? formatCurrency(result.valorFinal) : ''}
        mainLabel="Valor final com desconto"
        items={result ? [
          { label: 'Valor original', value: formatCurrency(result.valorOriginal) },
          { label: 'Percentual de desconto', value: `${result.desconto}%` },
          { label: 'Valor do desconto', value: formatCurrency(result.valorDesconto), highlight: true },
          { label: 'Você economiza', value: formatCurrency(result.economia), highlight: true },
        ] : []}
      />
    </>
  )
}
