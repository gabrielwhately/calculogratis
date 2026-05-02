'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularConsorcio } from '@/lib/calculadoras/simulador-consorcio'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor do bem (R$)',
    labelPrazo: 'Prazo (meses)',
    labelTaxa: 'Taxa de administração anual (%)',
    labelFundo: 'Fundo de reserva (%)',
    placeholderValor: 'Ex: 150.000,00',
    placeholderPrazo: 'Ex: 60',
    placeholderTaxa: 'Ex: 12',
    placeholderFundo: 'Ex: 1',
    buttonCalcular: 'Simular Consórcio',
    resultTitle: 'Simulação de Consórcio',
    resultMainLabel: 'Valor da parcela',
    itemValorBem: 'Valor do bem',
    itemPrazo: 'Prazo',
    itemTaxaTotal: 'Taxa de administração total',
    itemFundo: 'Fundo de reserva',
    itemTotal: 'Total pago',
    itemCustoAcima: 'Custo acima do bem',
    labelMeses: 'meses',
    chartTitle: 'Composição do Pagamento Total',
  },
  es: {
    labelValor: 'Valor del bien',
    labelPrazo: 'Plazo (meses)',
    labelTaxa: 'Tasa de administración anual (%)',
    labelFundo: 'Fondo de reserva (%)',
    placeholderValor: 'Ej: 150.000,00',
    placeholderPrazo: 'Ej: 60',
    placeholderTaxa: 'Ej: 12',
    placeholderFundo: 'Ej: 1',
    buttonCalcular: 'Simular Consorcio',
    resultTitle: 'Simulación de Consorcio',
    resultMainLabel: 'Valor de la cuota',
    itemValorBem: 'Valor del bien',
    itemPrazo: 'Plazo',
    itemTaxaTotal: 'Tasa de administración total',
    itemFundo: 'Fondo de reserva',
    itemTotal: 'Total pagado',
    itemCustoAcima: 'Costo por encima del bien',
    labelMeses: 'meses',
    chartTitle: 'Composición del Pago Total',
  }
}

export function SimuladorConsorcioForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [prazo, setPrazo] = useState('60')
  const [taxa, setTaxa] = useState('12')
  const [fundo, setFundo] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularConsorcio> | null>(null)

  function handleCalcular() {
    setResult(calcularConsorcio(parseBRNumber(valor), parseInt(prazo) || 60, parseBRNumber(taxa), parseBRNumber(fundo)))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(prazo) > 0

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
          label={t.labelPrazo} 
          id="prazo" 
          value={prazo} 
          onChange={(v) => setPrazo(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPrazo} 
        />
        <Input 
          label={t.labelTaxa} 
          id="taxa" 
          value={taxa} 
          onChange={(v) => setTaxa(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxa} 
          suffix="%" 
        />
        <Input 
          label={t.labelFundo} 
          id="fundo" 
          value={fundo} 
          onChange={(v) => setFundo(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderFundo} 
          suffix="%" 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={t.resultTitle} 
          mainValue={formatCurrency(result.parcela)} 
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemValorBem, value: formatCurrency(result.valorBem) },
            { label: t.itemPrazo, value: `${result.prazoMeses} ${t.labelMeses}` },
            { label: t.itemTaxaTotal, value: formatCurrency(result.custoAdminTotal) },
            { label: t.itemFundo, value: formatCurrency(result.fundoReserva) },
            { label: t.itemTotal, value: formatCurrency(result.totalComTaxas), highlight: true },
            { label: t.itemCustoAcima, value: formatCurrency(result.totalComTaxas - result.valorBem), highlight: true },
          ]} 
        >
          <div className="mt-6 border-t border-white/10 pt-6">
            <h4 className="mb-4 text-sm font-medium text-slate-300">{t.chartTitle}</h4>
            <div className="h-6 w-full flex rounded-full overflow-hidden bg-white/5 border border-white/10">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${(result.valorBem / result.totalComTaxas) * 100}%` }}
                title={`${t.itemValorBem}: ${formatCurrency(result.valorBem)}`}
              />
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000 border-l border-white/10" 
                style={{ width: `${(result.custoAdminTotal / result.totalComTaxas) * 100}%` }}
                title={`${t.itemTaxaTotal}: ${formatCurrency(result.custoAdminTotal)}`}
              />
              <div 
                className="h-full bg-indigo-400 transition-all duration-1000 border-l border-white/10" 
                style={{ width: `${(result.fundoReserva / result.totalComTaxas) * 100}%` }}
                title={`${t.itemFundo}: ${formatCurrency(result.fundoReserva)}`}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-slate-400">{t.itemValorBem}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-slate-400">{t.itemTaxaTotal}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                <span className="text-slate-400">{t.itemFundo}</span>
              </div>
            </div>
          </div>
        </ResultCard>
      )}
    </>
  )
}
