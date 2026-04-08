'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIPVA, ALIQUOTAS_IPVA } from '@/lib/calculadoras/ipva'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const ESTADOS_OPTIONS = Object.keys(ALIQUOTAS_IPVA).sort().map((uf) => ({
  value: uf,
  label: `${uf} — ${ALIQUOTAS_IPVA[uf]}%`,
}))

export function IPVAForm() {
  const [valorVenal, setValorVenal] = useState('')
  const [estado, setEstado] = useState('SP')
  const [result, setResult] = useState<ReturnType<typeof calcularIPVA> | null>(null)

  function handleCalcular() {
    setResult(calcularIPVA({ valorVenal: parseBRNumber(valorVenal), estado }))
  }

  const isValid = parseBRNumber(valorVenal) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input
          label="Valor venal do veículo (R$)"
          id="valorVenal"
          value={valorVenal}
          onChange={(v) => setValorVenal(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 50.000,00"
        />
        <Select
          label="Estado"
          id="estado"
          value={estado}
          onChange={(v) => { setEstado(v); setResult(null) }}
          options={ESTADOS_OPTIONS}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular IPVA</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="IPVA 2026"
        mainValue={result ? formatCurrency(result.valorIPVA) : ''}
        mainLabel="Valor total do IPVA"
        items={result ? [
          { label: 'Valor venal', value: formatCurrency(result.valorVenal) },
          { label: 'Estado', value: result.estado },
          { label: 'Alíquota', value: `${result.aliquota}%` },
          { label: 'IPVA total', value: formatCurrency(result.valorIPVA), highlight: true },
          { label: 'Parcela (1/3)', value: formatCurrency(result.parcelaMensal) },
        ] : []}
      />
    </>
  )
}
