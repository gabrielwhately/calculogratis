'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularGestacional } from '@/lib/calculadoras/gestacional'
import { formatDate } from '@/lib/formatters'

export function GestacionalForm() {
  const [dum, setDum] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularGestacional> | null>(null)

  function handleCalcular() {
    if (!dum) return
    const data = new Date(dum + 'T00:00:00')
    setResult(calcularGestacional({ dum: data }))
  }

  const isValid = !!dum

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="dum" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data da Última Menstruação (DUM)</label>
          <input
            id="dum"
            type="date"
            value={dum}
            onChange={(e) => setDum(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 outline-none transition-colors bg-white dark:bg-gray-800 focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Gestação</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Idade Gestacional"
        mainValue={result ? result.idadeGestacional : ''}
        mainLabel="Tempo de gestação atual"
        items={result ? [
          { label: 'DUM informada', value: formatDate(result.dum) },
          { label: 'Trimestre atual', value: `${result.trimestre}º trimestre`, highlight: true },
          { label: 'Semanas completas', value: `${result.semanasCompletas} semanas` },
          { label: 'Dias adicionais', value: `${result.dias} dias` },
          { label: 'Data provável do parto (DPP)', value: formatDate(result.dataParto), highlight: true },
        ] : []}
      />
    </>
  )
}
