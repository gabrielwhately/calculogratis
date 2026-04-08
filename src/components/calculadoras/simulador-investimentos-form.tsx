'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSimuladorInvestimentos } from '@/lib/calculadoras/simulador-investimentos'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function SimuladorInvestimentosForm() {
  const [valorInicial, setValorInicial] = useState('')
  const [aporteMensal, setAporteMensal] = useState('')
  const [taxaAnual, setTaxaAnual] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularSimuladorInvestimentos> | null>(null)

  function handleCalcular() {
    setResult(calcularSimuladorInvestimentos({
      valorInicial: parseBRNumber(valorInicial),
      aporteMensal: parseBRNumber(aporteMensal),
      taxaAnual: parseBRNumber(taxaAnual),
      meses: parseInt(meses) || 0,
    }))
  }

  const isValid = (parseBRNumber(valorInicial) > 0 || parseBRNumber(aporteMensal) > 0) && parseInt(meses) > 0 && parseBRNumber(taxaAnual) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor inicial (R$)" id="valorInicial" value={valorInicial} onChange={(v) => setValorInicial(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Aporte mensal (R$)" id="aporteMensal" value={aporteMensal} onChange={(v) => setAporteMensal(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 500,00" />
        <Input label="Taxa anual (%)" id="taxaAnual" value={taxaAnual} onChange={(v) => setTaxaAnual(maskPercent(v))} inputMode="decimal" placeholder="Ex: 12,0" suffix="%" />
        <Input label="Periodo (meses)" id="meses" value={meses} onChange={(v) => setMeses(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 60" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado do Investimento" mainValue={result ? formatCurrency(result.montanteFinal) : ''} mainLabel="Montante final"
        items={result ? [
          { label: 'Valor inicial', value: formatCurrency(result.valorInicial) },
          { label: 'Total investido', value: formatCurrency(result.totalInvestido) },
          { label: 'Total em juros', value: formatCurrency(result.totalJuros), highlight: true },
          { label: 'Rentabilidade', value: `${result.rentabilidadePercent.toFixed(2)}%` },
        ] : []} />
    </>
  )
}
