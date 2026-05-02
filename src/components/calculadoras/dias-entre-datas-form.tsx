'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDiasEntreDatas } from '@/lib/calculadoras/dias-entre-datas'

const I18N = {
  pt: {
    labelDataInicio: 'Data inicial',
    labelDataFim: 'Data final',
    buttonCalcular: 'Calcular Diferença',
    resultTitle: 'Diferença entre Datas',
    mainLabel: 'Dias corridos',
    labelDiasCorridos: 'Dias corridos',
    labelDiasUteis: 'Dias úteis',
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
      <FormCard>
        <Input 
          label={t.labelDataInicio} 
          id="data-inicio" 
          type="date" 
          value={dataInicio} 
          onChange={setDataInicio} 
        />
        <Input 
          label={t.labelDataFim} 
          id="data-fim" 
          type="date" 
          value={dataFim} 
          onChange={setDataFim} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!dataInicio || !dataFim}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
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
