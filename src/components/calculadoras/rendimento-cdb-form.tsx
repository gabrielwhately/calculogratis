'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularRendimentoCDB } from '@/lib/calculadoras/rendimento-cdb'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor investido (R$)',
    labelCDI: 'Taxa CDI anual (%)',
    labelPercentCDI: 'Percentual do CDI (%)',
    labelPrazo: 'Prazo (meses)',
    placeholderValor: 'Ex: 10.000,00',
    placeholderCDI: 'Ex: 14,25',
    placeholderPercentCDI: 'Ex: 100',
    placeholderPrazo: 'Ex: 12',
    buttonSimular: 'Simular Rendimento',
    resultTitle: 'Rendimento CDB',
    resultMainLabel: 'Valor final líquido',
    itemValorInvestido: 'Valor investido',
    itemRendimentoBruto: 'Rendimento bruto',
    itemIR: 'Imposto de Renda',
    itemRendimentoLiquido: 'Rendimento líquido',
    itemRentabilidadeEfetiva: 'Rentabilidade efetiva',
    chartTitle: 'Composição do Valor Final',
  },
  es: {
    labelValor: 'Valor invertido',
    labelCDI: 'Tasa CDI anual (%)',
    labelPercentCDI: 'Porcentaje del CDI (%)',
    labelPrazo: 'Plazo (meses)',
    placeholderValor: 'Ej: 10.000,00',
    placeholderCDI: 'Ej: 14,25',
    placeholderPercentCDI: 'Ej: 100',
    placeholderPrazo: 'Ej: 12',
    buttonSimular: 'Simular Rendimiento',
    resultTitle: 'Rendimiento CDB',
    resultMainLabel: 'Valor final neto',
    itemValorInvestido: 'Valor invertido',
    itemRendimentoBruto: 'Rendimiento bruto',
    itemIR: 'Impuesto a la Renta',
    itemRendimentoLiquido: 'Rendimiento neto',
    itemRentabilidadeEfetiva: 'Rentabilidad efectiva',
    chartTitle: 'Composición del Valor Final',
  }
}

export function RendimentoCDBForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [taxaCDI, setTaxaCDI] = useState('14,25')
  const [percentualCDI, setPercentualCDI] = useState('100')
  const [prazo, setPrazo] = useState('12')
  const [result, setResult] = useState<ReturnType<typeof calcularRendimentoCDB> | null>(null)

  function handleCalcular() {
    setResult(calcularRendimentoCDB(parseBRNumber(valor), parseBRNumber(taxaCDI), parseBRNumber(percentualCDI), parseInt(prazo) || 12))
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(taxaCDI) > 0 && parseInt(prazo) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelValor} 
          id="valor" 
          value={valor} 
          onChange={(v) => setValor(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
        />
        <Input 
          label={t.labelCDI} 
          id="cdi" 
          value={taxaCDI} 
          onChange={(v) => setTaxaCDI(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderCDI} 
          suffix="%" 
        />
        <Input 
          label={t.labelPercentCDI} 
          id="percentual" 
          value={percentualCDI} 
          onChange={(v) => setPercentualCDI(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderPercentCDI} 
          suffix="%" 
        />
        <Input 
          label={t.labelPrazo} 
          id="prazo" 
          value={prazo} 
          onChange={(v) => setPrazo(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPrazo} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.buttonSimular}</Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.valorFinalLiquido) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValorInvestido, value: formatCurrency(result.valorInicial) },
          { label: t.itemRendimentoBruto, value: formatCurrency(result.rendimentoBruto) },
          { label: t.itemIR, value: `- ${formatCurrency(result.ir)}` },
          { label: t.itemRendimentoLiquido, value: formatCurrency(result.rendimentoLiquido), highlight: true },
          { label: t.itemRentabilidadeEfetiva, value: `${result.rentabilidadeEfetiva.toFixed(2)}%` },
        ] : []} 
      >
        {result && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <h4 className="mb-4 text-sm font-medium text-slate-300">{t.chartTitle}</h4>
            <div className="h-6 w-full flex rounded-full overflow-hidden bg-white/5 border border-white/10">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${(result.valorInicial / (result.valorInicial + result.rendimentoBruto)) * 100}%` }}
                title={`${t.itemValorInvestido}: ${formatCurrency(result.valorInicial)}`}
              />
              <div 
                className="h-full bg-green-500 transition-all duration-1000 border-l border-white/10" 
                style={{ width: `${(result.rendimentoLiquido / (result.valorInicial + result.rendimentoBruto)) * 100}%` }}
                title={`${t.itemRendimentoLiquido}: ${formatCurrency(result.rendimentoLiquido)}`}
              />
              <div 
                className="h-full bg-red-400 transition-all duration-1000 border-l border-white/10" 
                style={{ width: `${(result.ir / (result.valorInicial + result.rendimentoBruto)) * 100}%` }}
                title={`${t.itemIR}: ${formatCurrency(result.ir)}`}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-slate-400">{t.itemValorInvestido}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-slate-400">{t.itemRendimentoLiquido}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-slate-400">{t.itemIR}</span>
              </div>
            </div>
          </div>
        )}
      </ResultCard>
    </>
  )
}
