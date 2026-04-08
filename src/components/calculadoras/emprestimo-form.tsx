'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularEmprestimo } from '@/lib/calculadoras/emprestimo'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function EmprestimoForm() {
  const [valor, setValor] = useState('')
  const [taxa, setTaxa] = useState('')
  const [parcelas, setParcelas] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularEmprestimo> | null>(null)

  function handleCalcular() {
    setResult(calcularEmprestimo({ valor: parseBRNumber(valor), taxaMensal: parseBRNumber(taxa), parcelas: parseInt(parcelas) || 0 }))
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(taxa) > 0 && parseInt(parcelas) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor do emprestimo (R$)" id="valor" value={valor} onChange={(v) => setValor(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Taxa de juros mensal (%)" id="taxa" value={taxa} onChange={(v) => setTaxa(maskPercent(v))} inputMode="decimal" placeholder="Ex: 1,99" suffix="%" />
        <Input label="Numero de parcelas" id="parcelas" value={parcelas} onChange={(v) => setParcelas(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 24" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Simular</Button>
      </div>
      <ResultCard visible={result !== null} title="Simulacao de Emprestimo" mainValue={result ? formatCurrency(result.valorParcela) : ''} mainLabel="Valor da parcela"
        items={result ? [
          { label: 'Valor emprestado', value: formatCurrency(result.valorEmprestimo) },
          { label: 'Taxa mensal', value: `${result.taxaMensal}%` },
          { label: 'Parcelas', value: `${result.parcelas}x` },
          { label: 'Valor da parcela', value: formatCurrency(result.valorParcela) },
          { label: 'Total pago', value: formatCurrency(result.totalPago) },
          { label: 'Total de juros', value: formatCurrency(result.totalJuros), highlight: true },
          { label: 'CET anual estimado', value: `${result.cet.toFixed(2)}%` },
        ] : []} />
    </>
  )
}
