'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularJurosCompostos } from '@/lib/calculadoras/juros-compostos'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelCapital: 'Capital inicial (R$)',
    labelAporte: 'Aporte mensal (R$)',
    labelTaxa: 'Taxa mensal (%)',
    labelPeriodo: 'Período (meses)',
    placeholderCapital: 'Ex: 10.000,00',
    placeholderAporte: 'Ex: 500,00',
    placeholderTaxa: 'Ex: 1,0',
    placeholderPeriodo: 'Ex: 24',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Montante final',
    resultTotalInvestido: 'Total investido',
    resultJuros: 'Juros ganhos',
    resultTaxa: 'Taxa mensal',
    resultPeriodo: 'Período',
    unitMeses: 'meses',
  },
  es: {
    labelCapital: 'Capital inicial',
    labelAporte: 'Aporte mensual',
    labelTaxa: 'Tasa mensual (%)',
    labelPeriodo: 'Período (meses)',
    placeholderCapital: 'Ej: 10.000,00',
    placeholderAporte: 'Ej: 500,00',
    placeholderTaxa: 'Ej: 1,0',
    placeholderPeriodo: 'Ej: 24',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Monto final',
    resultTotalInvestido: 'Total invertido',
    resultJuros: 'Intereses ganados',
    resultTaxa: 'Tasa mensual',
    resultPeriodo: 'Período',
    unitMeses: 'meses',
  }
}

export function JurosCompostosForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [meses, setMeses] = useState('')
  const [aporte, setAporte] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularJurosCompostos> | null>(null)

  function handleCalcular() {
    setResult(calcularJurosCompostos({
      capital: parseBRNumber(capital),
      taxaMensal: parseBRNumber(taxa),
      meses: parseInt(meses) || 0,
      aporteMensal: parseBRNumber(aporte)
    }))
  }

  const isValid = (parseBRNumber(capital) > 0 || parseBRNumber(aporte) > 0) && parseInt(meses) > 0

  return (
    <>
      <FormCard>
        <Input
          label={t.labelCapital}
          id="capital"
          value={capital}
          onChange={setCapital}
          inputMode="decimal"
          placeholder={t.placeholderCapital}
        />
        <Input
          label={t.labelAporte}
          id="aporte"
          value={aporte}
          onChange={setAporte}
          inputMode="decimal"
          placeholder={t.placeholderAporte}
        />
        <Input
          label={t.labelTaxa}
          id="taxa"
          value={taxa}
          onChange={setTaxa}
          inputMode="decimal"
          placeholder={t.placeholderTaxa}
          suffix="%"
        />
        <Input
          label={t.labelPeriodo}
          id="meses"
          value={meses}
          onChange={setMeses}
          inputMode="numeric"
          placeholder={t.placeholderPeriodo}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.montante) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.resultTotalInvestido, value: formatCurrency(result.totalInvestido) },
          { label: t.resultJuros, value: formatCurrency(result.juros), highlight: true },
          { label: t.resultTaxa, value: `${result.taxaMensal}%` },
          { label: t.resultPeriodo, value: `${result.meses} ${t.unitMeses}` }
        ] : []}
      />
    </>
  )
}
