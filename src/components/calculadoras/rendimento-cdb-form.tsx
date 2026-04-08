'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularRendimentoCDB } from '@/lib/calculadoras/rendimento-cdb'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function RendimentoCDBForm() {
  const [valor, setValor] = useState('')
  const [taxaCDI, setTaxaCDI] = useState('14,25')
  const [percentualCDI, setPercentualCDI] = useState('100')
  const [prazo, setPrazo] = useState('12')
  const [result, setResult] = useState<ReturnType<typeof calcularRendimentoCDB> | null>(null)

  function handleCalcular() {
    setResult(calcularRendimentoCDB(parseBRNumber(valor), parseBRNumber(taxaCDI), parseBRNumber(percentualCDI), parseInt(prazo) || 12))
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(taxaCDI) > 0 && parseInt(prazo) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor investido (R$)" id="valor" value={valor} onChange={(v) => setValor(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Taxa CDI anual (%)" id="cdi" value={taxaCDI} onChange={(v) => setTaxaCDI(maskPercent(v))} inputMode="decimal" placeholder="Ex: 14,25" suffix="%" />
        <Input label="Percentual do CDI (%)" id="percentual" value={percentualCDI} onChange={(v) => setPercentualCDI(maskPercent(v))} inputMode="decimal" placeholder="Ex: 100" suffix="%" />
        <Input label="Prazo (meses)" id="prazo" value={prazo} onChange={(v) => setPrazo(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 12" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Simular Rendimento</Button>
      </div>
      <ResultCard visible={result !== null} title="Rendimento CDB" mainValue={result ? formatCurrency(result.valorFinalLiquido) : ''} mainLabel="Valor final liquido"
        items={result ? [
          { label: 'Valor investido', value: formatCurrency(result.valorInicial) },
          { label: 'Rendimento bruto', value: formatCurrency(result.rendimentoBruto) },
          { label: 'Imposto de Renda', value: `- ${formatCurrency(result.ir)}` },
          { label: 'Rendimento liquido', value: formatCurrency(result.rendimentoLiquido), highlight: true },
          { label: 'Valor final liquido', value: formatCurrency(result.valorFinalLiquido), highlight: true },
          { label: 'Rentabilidade efetiva', value: `${result.rentabilidadeEfetiva.toFixed(2)}%` },
        ] : []} />
    </>
  )
}
