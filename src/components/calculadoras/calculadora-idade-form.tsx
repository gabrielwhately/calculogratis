'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
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
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="data-nascimento" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelData}
          </label>
          <input
            id="data-nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>
        <Button onClick={handleCalcular} fullWidth disabled={!dataNascimento}>
          {t.buttonCalcular}
        </Button>
      </div>

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
          { label: t.itemProximo, value: result ? formatDate(result.proximoAniversario) : '' },
          { label: t.itemDiasPara, value: result ? `${result.diasParaAniversario} ${t.unitDias}` : '', highlight: true },
        ] : []}
      />
    </>
  )
}
