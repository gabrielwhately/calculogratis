'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDiasEntreDatas } from '@/lib/calculadoras/dias-entre-datas'

export function DiasEntreDatasForm() {
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularDiasEntreDatas>>(null)

  function handleCalcular() {
    setResult(calcularDiasEntreDatas({ dataInicio, dataFim }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="data-inicio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data inicial</label>
          <input id="data-inicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
        </div>
        <div className="mb-4">
          <label htmlFor="data-fim" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data final</label>
          <input id="data-fim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
        </div>
        <Button onClick={handleCalcular} fullWidth disabled={!dataInicio || !dataFim}>Calcular Diferenca</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Diferenca entre Datas"
        mainValue={result ? `${result.diasCorridos}` : ''}
        mainLabel="Dias corridos"
        items={result ? [
          { label: 'Dias corridos', value: String(result.diasCorridos) },
          { label: 'Dias uteis', value: String(result.diasUteis), highlight: true },
          { label: 'Semanas', value: String(result.semanas) },
          { label: 'Meses (aprox.)', value: String(result.meses) },
        ] : []}
      />
    </>
  )
}
