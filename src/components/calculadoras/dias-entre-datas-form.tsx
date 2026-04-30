'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDiasEntreDatas } from '@/lib/calculadoras/dias-entre-datas'

const I18N = {
  pt: {
    labelDataInicio: 'Data inicial',
    labelDataFim: 'Data final',
    buttonCalcular: 'Calcular Diferenca',
    resultTitle: 'Diferenca entre Datas',
    mainLabel: 'Dias corridos',
    labelDiasCorridos: 'Dias corridos',
    labelDiasUteis: 'Dias uteis',
    labelSemanas: 'Semanas',
    labelMeses: 'Meses (aprox.)',
  },
  es: {
    labelDataInicio: 'Fecha inicial',
    labelDataFim: 'Fecha final',
    buttonCalcular: 'Calcular diferencia',
    resultTitle: 'Diferencia entre fechas',
    mainLabel: 'Días corridos',
    labelDiasCorridos: 'Días corridos',
    labelDiasUteis: 'Días hábiles',
    labelSemanas: 'Semanas',
    labelMeses: 'Meses (aprox.)',
  }
}

export function DiasEntreDatasForm() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/es') ? 'es' : 'pt'
  const t = I18N[locale]

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
          <label htmlFor="data-inicio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelDataInicio}
          </label>
          <input id="data-inicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
        </div>
        <div className="mb-4">
          <label htmlFor="data-fim" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelDataFim}
          </label>
          <input id="data-fim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900" />
        </div>
        <Button onClick={handleCalcular} fullWidth disabled={!dataInicio || !dataFim}>
          {t.buttonCalcular}
        </Button>
      </div>
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? `${result.diasCorridos}` : ''}
        mainLabel={t.mainLabel}
        items={result ? [
          { label: t.labelDiasCorridos, value: String(result.diasCorridos) },
          { label: t.labelDiasUteis, value: String(result.diasUteis), highlight: true },
          { label: t.labelSemanas, value: String(result.semanas) },
          { label: t.labelMeses, value: String(result.meses) },
        ] : []}
      />
    </>
  )
}
