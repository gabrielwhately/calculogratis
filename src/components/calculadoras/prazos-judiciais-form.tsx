'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPrazoJudicial } from '@/lib/calculadoras/prazos-judiciais'
import { formatDate } from '@/lib/formatters'

const I18N = {
  pt: {
    labelDataInicio: 'Data de início do prazo',
    labelDiasPrazo: 'Número de dias do prazo',
    labelTipo: 'Tipo de prazo',
    optionUteis: 'Dias úteis (CPC)',
    optionCorridos: 'Dias corridos',
    placeholderDias: 'Ex: 15',
    buttonCalcular: 'Calcular Prazo',
    resultTitle: 'Vencimento do Prazo Judicial',
    resultMainLabel: 'Data de vencimento',
    itemInicio: 'Data de início',
    itemSolicitado: 'Prazo solicitado',
    itemTotais: 'Dias corridos totais',
    itemFinal: 'Data final',
    labelDias: 'dias',
    tipos: {
      uteis: 'dias úteis',
      corridos: 'dias corridos'
    }
  },
  es: {
    labelDataInicio: 'Fecha de inicio del plazo',
    labelDiasPrazo: 'Número de días del plazo',
    labelTipo: 'Tipo de plazo',
    optionUteis: 'Días hábiles',
    optionCorridos: 'Días corridos',
    placeholderDias: 'Ej: 15',
    buttonCalcular: 'Calcular Plazo',
    resultTitle: 'Vencimiento del Plazo Judicial',
    resultMainLabel: 'Fecha de vencimiento',
    itemInicio: 'Fecha de inicio',
    itemSolicitado: 'Plazo solicitado',
    itemTotais: 'Días corridos totales',
    itemFinal: 'Fecha final',
    labelDias: 'días',
    tipos: {
      uteis: 'días hábiles',
      corridos: 'días corridos'
    }
  }
}

export function PrazosJudiciaisForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      <FormCard>
        <Input 
          label={t.labelDataInicio} 
          id="dataInicio" 
          type="date"
          value={dataInicio} 
          onChange={setDataInicio} 
        />
        <Input 
          label={t.labelDiasPrazo} 
          id="diasPrazo" 
          value={diasPrazo} 
          onChange={(v) => setDiasPrazo(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderDias} 
        />
        <Select
          label={t.labelTipo}
          id="tipo"
          value={tipo}
          onChange={(v) => setTipo(v as 'uteis' | 'corridos')}
          options={[
            { value: 'uteis', label: t.optionUteis },
            { value: 'corridos', label: t.optionCorridos },
          ]}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatDate(result.dataFim) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemInicio, value: formatDate(result.dataInicio) },
          { label: t.itemSolicitado, value: `${result.diasPrazo} ${t.tipos[result.tipo as keyof typeof t.tipos]}` },
          { label: t.itemTotais, value: `${result.diasCorridos} ${t.labelDias}` },
          { label: t.itemFinal, value: formatDate(result.dataFim), highlight: true },
        ] : []}
      />
    </>
  )
}
