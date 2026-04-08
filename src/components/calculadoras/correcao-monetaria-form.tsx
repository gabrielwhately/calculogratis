'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularCorrecaoMonetaria } from '@/lib/calculadoras/correcao-monetaria'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function CorrecaoMonetariaForm() {
  const [valorOriginal, setValorOriginal] = useState('')
  const [indiceInicial, setIndiceInicial] = useState('')
  const [indiceFinal, setIndiceFinal] = useState('')
  const [juros, setJuros] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularCorrecaoMonetaria> | null>(null)

  function handleCalcular() {
    setResult(calcularCorrecaoMonetaria({
      valorOriginal: parseBRNumber(valorOriginal),
      indiceInicial: parseBRNumber(indiceInicial),
      indiceFinal: parseBRNumber(indiceFinal),
      juros: parseBRNumber(juros),
      meses: parseInt(meses) || 0,
    }))
  }

  const isValid = parseBRNumber(valorOriginal) > 0 && parseBRNumber(indiceInicial) > 0 && parseBRNumber(indiceFinal) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor original (R$)" id="valorOriginal" value={valorOriginal} onChange={(v) => setValorOriginal(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Índice inicial (ex: IPCA acumulado na data)" id="indiceInicial" value={indiceInicial} onChange={(v) => setIndiceInicial(maskPercent(v))} inputMode="decimal" placeholder="Ex: 120,50" />
        <Input label="Índice final (atual)" id="indiceFinal" value={indiceFinal} onChange={(v) => setIndiceFinal(maskPercent(v))} inputMode="decimal" placeholder="Ex: 185,30" />
        <Input label="Juros de mora (%)" id="juros" value={juros} onChange={(v) => setJuros(maskPercent(v))} inputMode="decimal" placeholder="Ex: 1,00" suffix="%" />
        <Input label="Meses de atraso" id="meses" value={meses} onChange={(v) => setMeses(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 24" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Correção</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Resultado da Correção Monetária"
        mainValue={result ? formatCurrency(result.valorTotal) : ''}
        mainLabel="Valor total corrigido"
        items={result ? [
          { label: 'Valor original', value: formatCurrency(result.valorOriginal) },
          { label: 'Fator de correção', value: result.fatorCorrecao.toFixed(6) },
          { label: 'Valor corrigido', value: formatCurrency(result.valorCorrigido), highlight: true },
          { label: 'Juros de mora', value: formatCurrency(result.valorJuros) },
          { label: 'Total (correção + juros)', value: formatCurrency(result.valorTotal), highlight: true },
        ] : []}
      />
    </>
  )
}
