'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularMultaAtraso } from '@/lib/calculadoras/multa-atraso'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function MultaAtrasoForm() {
  const [valor, setValor] = useState('')
  const [diasAtraso, setDiasAtraso] = useState('')
  const [multaPercent, setMultaPercent] = useState('2')
  const [jurosDiario, setJurosDiario] = useState('0,033')
  const [result, setResult] = useState<ReturnType<typeof calcularMultaAtraso> | null>(null)

  function handleCalcular() {
    setResult(calcularMultaAtraso({
      valor: parseBRNumber(valor),
      diasAtraso: parseInt(diasAtraso) || 0,
      multaPercent: parseBRNumber(multaPercent),
      jurosDiario: parseBRNumber(jurosDiario),
    }))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(diasAtraso) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor do débito (R$)" id="valor" value={valor} onChange={(v) => setValor(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 1.500,00" />
        <Input label="Dias em atraso" id="diasAtraso" value={diasAtraso} onChange={(v) => setDiasAtraso(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 30" />
        <Input label="Multa moratória (%)" id="multaPercent" value={multaPercent} onChange={(v) => setMultaPercent(maskPercent(v))} inputMode="decimal" placeholder="Ex: 2" suffix="%" />
        <Input label="Juros ao dia (%)" id="jurosDiario" value={jurosDiario} onChange={(v) => setJurosDiario(maskPercent(v))} inputMode="decimal" placeholder="Ex: 0,033" suffix="%" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Multa</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Resultado da Multa por Atraso"
        mainValue={result ? formatCurrency(result.valorTotal) : ''}
        mainLabel="Valor total a pagar"
        items={result ? [
          { label: 'Valor original', value: formatCurrency(result.valorOriginal) },
          { label: 'Dias em atraso', value: `${result.diasAtraso} dias` },
          { label: 'Multa moratória (2%)', value: formatCurrency(result.multa), highlight: true },
          { label: 'Juros de mora', value: formatCurrency(result.juros), highlight: true },
          { label: 'Total com encargos', value: formatCurrency(result.valorTotal), highlight: true },
        ] : []}
      />
    </>
  )
}
