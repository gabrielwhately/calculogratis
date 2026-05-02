'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularIdade } from '@/lib/calculadoras/calculadora-idade'
import { formatDate } from '@/lib/formatters'

const I18N = {
  pt: {
    labelData: 'Data de nascimento',
    buttonCalcular: 'Calcular Idade',
    resultTitle: 'Sua Idade',
    unitAnos: 'anos',
    unitMeses: 'meses',
    unitDias: 'dias',
    conjunction: 'e',
    itemMeses: 'Meses completos',
    itemAnos: 'Anos completos',
    itemSemanas: 'Semanas vividas',
    itemDias: 'Dias vividos',
    itemProximo: 'Próximo aniversário',
    itemDiasPara: 'Dias para aniversário',
  },
  es: {
    labelData: 'Fecha de nacimiento',
    buttonCalcular: 'Calcular Edad',
    resultTitle: 'Su Edad',
    unitAnos: 'años',
    unitMeses: 'meses',
    unitDias: 'días',
    conjunction: 'y',
    itemMeses: 'Meses completos',
    itemAnos: 'Años completos',
    itemSemanas: 'Semanas vividas',
    itemDias: 'Días vividos',
    itemProximo: 'Próximo cumpleaños',
    itemDiasPara: 'Días para el cumpleaños',
  }
}

export function CalculadoraIdadeForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [dataNascimento, setDataNascimento] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIdade> | null>(null)

  function handleCalcular() {
    if (!dataNascimento) return
    const data = new Date(dataNascimento + 'T00:00:00')
    if (isNaN(data.getTime())) return
    setResult(calcularIdade(data))
  }

  return (
    <>
      <FormCard>
        <Input
          label={t.labelData}
          type="date"
          value={dataNascimento}
          onChange={(v) => setDataNascimento(v)}
          max={new Date().toISOString().split('T')[0]}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!dataNascimento}>
          {t.buttonCalcular}
        </Button>
      </FormCard>

      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? `${result.anos} ${t.unitAnos}` : ''}
        mainLabel={result ? `${result.meses} ${t.unitMeses} ${t.conjunction} ${result.dias} ${t.unitDias}` : ''}
        items={result ? [
          { label: t.itemAnos, value: String(result.anos), highlight: true },
          { label: t.itemMeses, value: String(result.totalMeses) },
          { label: t.itemSemanas, value: result.totalSemanas.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR') },
          { label: t.itemDias, value: result.totalDias.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR') },
          { label: t.itemProximo, value: formatDate(result.proximoAniversario) },
          { label: t.itemDiasPara, value: `${result.diasParaAniversario} ${t.unitDias}`, highlight: true },
        ] : []}
      />
    </>
  )
}
