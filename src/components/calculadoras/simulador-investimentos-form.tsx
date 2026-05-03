'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSimuladorInvestimentos } from '@/lib/calculadoras/simulador-investimentos'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValorInicial: 'Valor inicial (R$)',
    labelAporteMensal: 'Aporte mensal (R$)',
    labelTaxaAnual: 'Taxa anual (%)',
    labelPrazo: 'Período (meses)',
    placeholderValorInicial: 'Ex: 10.000,00',
    placeholderAporteMensal: 'Ex: 500,00',
    placeholderTaxaAnual: 'Ex: 12,0',
    placeholderPrazo: 'Ex: 60',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado do Investimento',
    resultMainLabel: 'Montante final',
    itemValorInicial: 'Valor inicial',
    itemTotalInvestido: 'Total investido',
    itemTotalJuros: 'Total em juros',
    itemRentabilidade: 'Rentabilidade',
    chartTitle: 'Evolução do Patrimônio',
    chartLegendInvested: 'Total Investido',
    chartLegendJuros: 'Juros Acumulados',
    month: 'Mês',
    total: 'Total',
  },
  es: {
    labelValorInicial: 'Valor inicial',
    labelAporteMensal: 'Aporte mensual',
    labelTaxaAnual: 'Tasa anual (%)',
    labelPrazo: 'Plazo (meses)',
    placeholderValorInicial: 'Ej: 10.000,00',
    placeholderAporteMensal: 'Ej: 500,00',
    placeholderTaxaAnual: 'Ej: 12,0',
    placeholderPrazo: 'Ej: 60',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado de la Inversión',
    resultMainLabel: 'Monto final',
    itemValorInicial: 'Valor inicial',
    itemTotalInvestido: 'Total invertido',
    itemTotalJuros: 'Total en intereses',
    itemRentabilidade: 'Rentabilidad',
    chartTitle: 'Evolución del Patrimonio',
    chartLegendInvested: 'Total Invertido',
    chartLegendJuros: 'Intereses Acumulados',
    month: 'Mes',
    total: 'Total',
  }
}

export function SimuladorInvestimentosForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valorInicial, setValorInicial] = useState('')
  const [aporteMensal, setAporteMensal] = useState('')
  const [taxaAnual, setTaxaAnual] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularSimuladorInvestimentos> | null>(null)

  function handleCalcular() {
    setResult(calcularSimuladorInvestimentos({
      valorInicial: parseBRNumber(valorInicial),
      aporteMensal: parseBRNumber(aporteMensal),
      taxaAnual: parseBRNumber(taxaAnual),
      meses: parseInt(meses) || 0,
    }))
  }

  const isValid = (parseBRNumber(valorInicial) > 0 || parseBRNumber(aporteMensal) > 0) && parseInt(meses) > 0 && parseBRNumber(taxaAnual) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelValorInicial} 
          id="valorInicial" 
          value={valorInicial} 
          onChange={(v) => setValorInicial(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValorInicial} 
        />
        <Input 
          label={t.labelAporteMensal} 
          id="aporteMensal" 
          value={aporteMensal} 
          onChange={(v) => setAporteMensal(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderAporteMensal} 
        />
        <Input 
          label={t.labelTaxaAnual} 
          id="taxaAnual" 
          value={taxaAnual} 
          onChange={(v) => setTaxaAnual(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxaAnual} 
          suffix="%" 
        />
        <Input 
          label={t.labelPrazo} 
          id="meses" 
          value={meses} 
          onChange={(v) => setMeses(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPrazo} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.montanteFinal) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValorInicial, value: formatCurrency(result.valorInicial) },
          { label: t.itemTotalInvestido, value: formatCurrency(result.totalInvestido) },
          { label: t.itemTotalJuros, value: formatCurrency(result.totalJuros), highlight: true },
          { label: t.itemRentabilidade, value: `${result.rentabilidadePercent.toFixed(2)}%` },
        ] : []}
      >
        {result && result.evolucao.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <h4 className="mb-4 text-sm font-medium text-slate-300">{t.chartTitle}</h4>
            <div className="flex h-40 items-end gap-1 px-1" tabIndex={0} role="img" aria-label={t.chartTitle}>
              {result.evolucao.filter((_, i) => {
                const total = result.evolucao.length
                const step = Math.max(1, Math.floor(total / 15))
                return i % step === 0 || i === total - 1
              }).map((m) => {
                const maxVal = result.montanteFinal
                const investedHeight = (m.investido / maxVal) * 100
                const totalHeight = (m.saldo / maxVal) * 100
                
                return (
                  <div key={m.mes} className="relative flex flex-1 flex-col items-center group cursor-pointer">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy-dark border border-white/20 rounded-lg p-2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none shadow-xl">
                      <p className="font-bold border-b border-white/10 pb-1 mb-1">{t.month} {m.mes}</p>
                      <p className="text-blue-400">{t.chartLegendInvested}: {formatCurrency(m.investido)}</p>
                      <p className="text-blue-200">{t.chartLegendJuros}: {formatCurrency(m.jurosAcumulado)}</p>
                      <p className="font-bold mt-1 pt-1 border-t border-white/10">{t.total}: {formatCurrency(m.saldo)}</p>
                    </div>

                    <div className="flex w-full flex-col-reverse items-center h-28 relative">
                       <div 
                        className="w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-400 transition-colors" 
                        style={{ height: `${totalHeight}%` }}
                      />
                      <div 
                        className="absolute bottom-0 w-full bg-blue-700 rounded-t-sm z-10 pointer-events-none" 
                        style={{ height: `${investedHeight}%` }}
                      />
                    </div>
                    <span className="mt-2 text-[8px] text-slate-500 font-mono">{m.mes}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] border-t border-white/5 pt-4">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-blue-700" />
                <span className="text-slate-400">{t.chartLegendInvested}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-blue-500" />
                <span className="text-slate-400">{t.chartLegendJuros}</span>
              </div>
            </div>
          </div>
        )}
      </ResultCard>
    </>
  )
}
