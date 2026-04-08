'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularConsorcio } from '@/lib/calculadoras/simulador-consorcio'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function SimuladorConsorcioForm() {
  const [valor, setValor] = useState('')
  const [prazo, setPrazo] = useState('60')
  const [taxa, setTaxa] = useState('12')
  const [fundo, setFundo] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularConsorcio> | null>(null)

  function handleCalcular() {
    setResult(calcularConsorcio(parseBRNumber(valor), parseInt(prazo) || 60, parseBRNumber(taxa), parseBRNumber(fundo)))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(prazo) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Valor do bem (R$)" id="valor" value={valor} onChange={(v) => setValor(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 150.000,00" />
        <Input label="Prazo (meses)" id="prazo" value={prazo} onChange={(v) => setPrazo(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 60" />
        <Input label="Taxa de administracao anual (%)" id="taxa" value={taxa} onChange={(v) => setTaxa(maskPercent(v))} inputMode="decimal" placeholder="Ex: 12" suffix="%" />
        <Input label="Fundo de reserva (%)" id="fundo" value={fundo} onChange={(v) => setFundo(maskPercent(v))} inputMode="decimal" placeholder="Ex: 1" suffix="%" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Simular Consorcio</Button>
      </div>
      <ResultCard visible={result !== null} title="Simulacao de Consorcio" mainValue={result ? formatCurrency(result.parcela) : ''} mainLabel="Valor da parcela"
        items={result ? [
          { label: 'Valor do bem', value: formatCurrency(result.valorBem) },
          { label: 'Prazo', value: `${result.prazoMeses} meses` },
          { label: 'Taxa de administracao total', value: formatCurrency(result.custoAdminTotal) },
          { label: 'Fundo de reserva', value: formatCurrency(result.fundoReserva) },
          { label: 'Total pago', value: formatCurrency(result.totalComTaxas), highlight: true },
          { label: 'Custo acima do bem', value: formatCurrency(result.totalComTaxas - result.valorBem), highlight: true },
        ] : []} />
    </>
  )
}
