'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularReajusteAluguel } from '@/lib/calculadoras/reajuste-aluguel'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function ReajusteAluguelForm() {
  const [valorAtual, setValorAtual] = useState('')
  const [indice, setIndice] = useState('personalizado')
  const [taxa, setTaxa] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularReajusteAluguel> | null>(null)

  function handleIndiceChange(value: string) {
    setIndice(value)
    if (value === 'igpm') setTaxa('3,89')
    else if (value === 'ipca') setTaxa('4,50')
    else setTaxa('')
  }

  function handleCalcular() {
    setResult(calcularReajusteAluguel({
      valorAtual: parseBRNumber(valorAtual),
      indicePercent: parseBRNumber(taxa),
    }))
  }

  const isValid = parseBRNumber(valorAtual) > 0 && parseBRNumber(taxa) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor atual do aluguel (R$)" id="valorAtual" value={valorAtual} onChange={(v) => setValorAtual(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 2.000,00" />
        <Select label="Indice de reajuste" id="indice" value={indice} onChange={handleIndiceChange} options={[
          { value: 'igpm', label: 'IGP-M' },
          { value: 'ipca', label: 'IPCA' },
          { value: 'personalizado', label: 'Personalizado' },
        ]} />
        <Input label="Taxa de reajuste (%)" id="taxa" value={taxa} onChange={(v) => setTaxa(maskPercent(v))} inputMode="decimal" placeholder="Ex: 4,50" suffix="%" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado do Reajuste" mainValue={result ? formatCurrency(result.valorReajustado) : ''} mainLabel="Novo valor do aluguel"
        items={result ? [
          { label: 'Valor atual', value: formatCurrency(result.valorAtual) },
          { label: 'Indice aplicado', value: `${result.indicePercent.toFixed(2)}%` },
          { label: 'Diferenca', value: `+ ${formatCurrency(result.diferenca)}`, highlight: true },
        ] : []} />
    </>
  )
}
