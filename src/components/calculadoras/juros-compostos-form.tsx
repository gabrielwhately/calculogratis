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
    chartTitle: 'Evolução do Patrimônio',
    chartLegendInvested: 'Investido',
    chartLegendJuros: 'Juros',
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
    chartTitle: 'Evolución del Patrimonio',
    chartLegendInvested: 'Invertido',
    chartLegendJuros: 'Intereses',
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
      
      {result && (
        <ResultCard
          visible={true}
          title={t.resultTitle}
          mainValue={formatCurrency(result.montante)}
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.resultTotalInvestido, value: formatCurrency(result.totalInvestido) },
            { label: t.resultJuros, value: formatCurrency(result.juros), highlight: true },
            { label: t.resultTaxa, value: `${result.taxaMensal}%` },
            { label: t.resultPeriodo, value: `${result.meses} ${t.unitMeses}` }
          ]}
        >
          {result.evolucao.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <h4 className="mb-4 text-sm font-medium text-slate-300">{t.chartTitle}</h4>
              <div className="flex h-32 items-end gap-1">
                {result.evolucao.filter((_, i) => {
                  // Show max 12 bars to avoid crowding
                  const total = result.evolucao.length
                  const step = Math.max(1, Math.floor(total / 12))
                  return i % step === 0 || i === total - 1
                }).map((m) => {
                  const maxVal = result.montante
                  const investedHeight = (m.mes * (parseBRNumber(aporte) || 0) + parseBRNumber(capital)) / maxVal * 100
                  const totalHeight = m.saldo / maxVal * 100
                  return (
                    <div key={m.mes} className="relative flex flex-1 flex-col items-center group">
                      <div className="flex w-full flex-col-reverse items-center h-24">
                         <div 
                          className="w-full bg-blue-500 rounded-t-sm" 
                          style={{ height: `${totalHeight}%` }}
                        />
                        <div 
                          className="absolute bottom-0 w-full bg-blue-700 rounded-t-sm" 
                          style={{ height: `${investedHeight}%` }}
                        />
                      </div>
                      <span className="mt-2 text-[10px] text-slate-500">{m.mes}</span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex gap-4 text-[10px]">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-700" />
                  <span className="text-slate-400">{t.chartLegendInvested}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-slate-400">{t.chartLegendJuros}</span>
                </div>
              </div>
            </div>
          )}
        </ResultCard>
      )}
    </>
  )
}
