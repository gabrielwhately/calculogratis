'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularGestacional } from '@/lib/calculadoras/gestacional'
import { formatDate } from '@/lib/formatters'

const I18N = {
  pt: {
    labelDum: 'Data da Última Menstruação (DUM)',
    buttonCalcular: 'Calcular Gestação',
    resultTitle: 'Idade Gestacional',
    resultMainLabel: 'Tempo de gestação atual',
    itemDum: 'DUM informada',
    itemTrimestre: 'Trimestre atual',
    itemSemanas: 'Semanas completas',
    itemDias: 'Dias adicionais',
    itemDpp: 'Data provável do parto (DPP)',
    labelTrimestre: 'º trimestre',
    labelSemanas: 'semanas',
    labelDias: 'dias',
  },
  es: {
    labelDum: 'Fecha de la última menstruación (FUM)',
    buttonCalcular: 'Calcular Embarazo',
    resultTitle: 'Edad Gestacional',
    resultMainLabel: 'Tiempo de gestación actual',
    itemDum: 'FUM informada',
    itemTrimestre: 'Trimestre actual',
    itemSemanas: 'Semanas completas',
    itemDias: 'Días adicionales',
    itemDpp: 'Fecha probable de parto (FPP)',
    labelTrimestre: 'º trimestre',
    labelSemanas: 'semanas',
    labelDias: 'días',
  }
}

export function GestacionalForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      <FormCard>
        <Input
          label={t.labelDum}
          id="dum"
          type="date"
          value={dum}
          onChange={setDum}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard
          visible={true}
          title={t.resultTitle}
          mainValue={result.idadeGestacional}
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemDum, value: formatDate(result.dum) },
            { label: t.itemTrimestre, value: `${result.trimestre}${t.labelTrimestre}`, highlight: true },
            { label: t.itemSemanas, value: `${result.semanasCompletas} ${t.labelSemanas}` },
            { label: t.itemDias, value: `${result.dias} ${t.labelDias}` },
            { label: t.itemDpp, value: formatDate(result.dataParto), highlight: true },
          ]}
        />
      )}
    </>
  )
}
