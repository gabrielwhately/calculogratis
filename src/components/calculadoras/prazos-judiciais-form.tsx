'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPrazoJudicial } from '@/lib/calculadoras/prazos-judiciais'
import { formatDate } from '@/lib/formatters'

export function PrazosJudiciaisForm() {
  const [dataInicio, setDataInicio] = useState('')
  const [diasPrazo, setDiasPrazo] = useState('')
  const [tipo, setTipo] = useState<'uteis' | 'corridos'>('uteis')
  const [result, setResult] = useState<ReturnType<typeof calcularPrazoJudicial> | null>(null)

  function handleCalcular() {
    if (!dataInicio || !diasPrazo) return
    const data = new Date(dataInicio + 'T00:00:00')
    setResult(calcularPrazoJudicial({
      dataInicio: data,
      diasPrazo: parseInt(diasPrazo) || 0,
      tipo,
    }))
  }

  const isValid = !!dataInicio && parseInt(diasPrazo) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="dataInicio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data de início do prazo</label>
          <input
            id="dataInicio"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 outline-none transition-colors bg-white dark:bg-gray-800 focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>
        <Input label="Número de dias do prazo" id="diasPrazo" value={diasPrazo} onChange={(v) => setDiasPrazo(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 15" />
        <Select
          label="Tipo de prazo"
          id="tipo"
          value={tipo}
          onChange={(v) => setTipo(v as 'uteis' | 'corridos')}
          options={[
            { value: 'uteis', label: 'Dias úteis (CPC)' },
            { value: 'corridos', label: 'Dias corridos' },
          ]}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Prazo</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Vencimento do Prazo Judicial"
        mainValue={result ? formatDate(result.dataFim) : ''}
        mainLabel="Data de vencimento"
        items={result ? [
          { label: 'Data de início', value: formatDate(result.dataInicio) },
          { label: 'Prazo solicitado', value: `${result.diasPrazo} ${result.tipo.toLowerCase()}` },
          { label: 'Dias corridos totais', value: `${result.diasCorridos} dias` },
          { label: 'Data final', value: formatDate(result.dataFim), highlight: true },
        ] : []}
      />
    </>
  )
}
