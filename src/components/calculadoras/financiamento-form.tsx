'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Tooltip } from '@/components/ui/tooltip'
import { calcularFinanciamentoPrice, calcularFinanciamentoSAC } from '@/lib/calculadoras/financiamento'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

type Sistema = 'price' | 'sac'

const I18N = {
  pt: {
    tabPrice: 'Tabela Price',
    tabSac: 'Tabela SAC',
    labelValor: 'Valor do imóvel (R$)',
    labelEntrada: 'Entrada (R$)',
    labelTaxa: 'Taxa anual (%)',
    labelPrazo: 'Prazo (meses)',
    placeholderValor: 'Ex: 300.000,00',
    placeholderEntrada: 'Ex: 60.000,00',
    placeholderTaxa: 'Ex: 10,5',
    placeholderPrazo: 'Ex: 360',
    suffixTaxa: '% a.a.',
    infoTaxa: 'Informe a taxa de juros nominal anual contratada.',
    infoPrice: 'Tabela Price: parcelas fixas do início ao fim. Ideal para quem quer previsibilidade no orçamento.',
    infoSac: 'Tabela SAC: parcelas que começam mais altas e diminuem ao longo do tempo. Reduz o custo total de juros.',
    buttonSimular: 'Simular',
    resultTitle: 'Financiamento',
    labelParcelaFixa: 'Parcela fixa',
    labelParcelaInicial: 'Primeira parcela',
    itemFinanciado: 'Valor financiado',
    itemJuros: 'Total de juros',
    itemTotal: 'Total pago',
    itemUltima: 'Última parcela',
    chartTitle: 'Evolução da Dívida',
    chartLegendSaldo: 'Saldo Deudor',
    chartLegendJuros: 'Juros Acumulados',
    month: 'Mês',
    total: 'Total',
  },
  es: {
    tabPrice: 'Tabla Price',
    tabSac: 'Tabla SAC',
    labelValor: 'Valor del inmueble',
    labelEntrada: 'Entrada',
    labelTaxa: 'Tasa anual (%)',
    labelPrazo: 'Plazo (meses)',
    placeholderValor: 'Ej: 300.000,00',
    placeholderEntrada: 'Ej: 60.000,00',
    placeholderTaxa: 'Ej: 10,5',
    placeholderPrazo: 'Ej: 360',
    suffixTaxa: '% a.a.',
    infoTaxa: 'Ingrese la tasa de interés nominal anual contratada.',
    infoPrice: 'Tabla Price: cuotas fijas de principio a fin. Ideal para quienes buscan previsibilidad en su presupuesto.',
    infoSac: 'Tabla SAC: cuotas que comienzan más altas y disminuyen con el tiempo. Reduce el costo total de intereses.',
    buttonSimular: 'Simular',
    resultTitle: 'Financiamiento',
    labelParcelaFixa: 'Cuota fija',
    labelParcelaInicial: 'Primera cuota',
    itemFinanciado: 'Valor financiado',
    itemJuros: 'Total de intereses',
    itemTotal: 'Total pagado',
    itemUltima: 'Última cuota',
    chartTitle: 'Evolución de la Deuda',
    chartLegendSaldo: 'Saldo Deudor',
    chartLegendJuros: 'Intereses Acumulados',
    month: 'Mes',
    total: 'Total',
  }
}

export function FinanciamentoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [entrada, setEntrada] = useState('')
  const [taxa, setTaxa] = useState('')
  const [prazo, setPrazo] = useState('')
  const [sistema, setSistema] = useState<Sistema>('price')
  const [result, setResult] = useState<ReturnType<typeof calcularFinanciamentoPrice> | null>(null)

  function handleCalcular() {
    const input = { 
      valorImovel: parseBRNumber(valor), 
      entrada: parseBRNumber(entrada), 
      taxaAnual: parseBRNumber(taxa), 
      prazoMeses: parseInt(prazo) || 0 
    }
    setResult(sistema === 'price' ? calcularFinanciamentoPrice(input) : calcularFinanciamentoSAC(input))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(prazo) > 0

  return (
    <>
      <FormCard>
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sistema de Amortização</span>
            <Tooltip content={sistema === 'price' ? t.infoPrice : t.infoSac}>
              <svg className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-help transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Tooltip>
          </div>
          <div className="flex rounded-lg bg-slate-100 dark:bg-gray-700 p-1">
            <button 
              onClick={() => { setSistema('price'); setResult(null) }} 
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${sistema === 'price' ? 'bg-white dark:bg-gray-600 text-navy dark:text-white shadow-sm' : 'text-slate-600 dark:text-gray-400'}`}
            >
              {t.tabPrice}
            </button>
            <button 
              onClick={() => { setSistema('sac'); setResult(null) }} 
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${sistema === 'sac' ? 'bg-white dark:bg-gray-600 text-navy dark:text-white shadow-sm' : 'text-slate-600 dark:text-gray-400'}`}
            >
              {t.tabSac}
            </button>
          </div>
        </div>

        <Input 
          label={t.labelValor} 
          id="valor" 
          value={valor} 
          onChange={(v) => setValor(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
        />
        <Input 
          label={t.labelEntrada} 
          id="entrada" 
          value={entrada} 
          onChange={(v) => setEntrada(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderEntrada} 
        />
        <Input 
          label={t.labelTaxa} 
          id="taxa" 
          value={taxa} 
          onChange={(v) => setTaxa(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxa} 
          suffix={t.suffixTaxa}
          info={t.infoTaxa}
        />
        <Input 
          label={t.labelPrazo} 
          id="prazo" 
          value={prazo} 
          onChange={(v) => setPrazo(v.replace(/\\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPrazo} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonSimular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={`${t.resultTitle} ${sistema === 'price' ? 'Price' : 'SAC'}`} 
        mainValue={result ? formatCurrency(result.parcela) : '' } 
        mainLabel={sistema === 'price' ? t.labelParcelaFixa : t.labelParcelaInicial}
        items={result ? [
          { label: t.itemFinanciado, value: formatCurrency(result.valorFinanciado) }, 
          { label: t.itemJuros, value: formatCurrency(result.totalJuros), highlight: true }, 
          { label: t.itemTotal, value: formatCurrency(result.totalPago) },
          ...(sistema === 'sac' && result.parcelas.length > 0 ? [{ label: t.itemUltima, value: formatCurrency(result.parcelas[result.parcelas.length - 1].parcela) }] : [])
        ] : []} 
      >
        {result && result.parcelas.length > 0 && (
          <div className="mt-6 border-t border-white/10 print:border-navy/10 pt-6">
            <h4 className="mb-4 text-sm font-medium text-slate-300 print:text-navy">{t.chartTitle}</h4>
            <div className="flex h-40 items-end gap-1 px-1" tabIndex={0} role="img" aria-label={t.chartTitle}>
              {result.parcelas.filter((_, i) => {
                const total = result.parcelas.length
                const step = Math.max(1, Math.floor(total / 15))
                return i % step === 0 || i === total - 1
              }).map((p) => {
                const maxVal = result.valorFinanciado
                const saldoHeight = (p.saldoDevedor / maxVal) * 100
                
                return (
                  <div key={p.numero} className="relative flex flex-1 flex-col items-center group cursor-pointer">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy-dark border border-white/20 rounded-lg p-2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none shadow-xl">
                      <p className="font-bold border-b border-white/10 pb-1 mb-1">{t.month} {p.numero}</p>
                      <p className="text-blue-400">{t.chartLegendSaldo}: {formatCurrency(p.saldoDevedor)}</p>
                      <p className="font-bold mt-1 pt-1 border-t border-white/10">Parcela: {formatCurrency(p.parcela)}</p>
                    </div>

                    <div className="flex w-full flex-col-reverse items-center h-28 relative">
                       <div 
                        className="w-full bg-blue-500 print:bg-blue-300 rounded-t-sm group-hover:bg-blue-400 transition-colors" 
                        style={{ height: `${saldoHeight}%` }}
                      />
                    </div>
                    <span className="mt-2 text-[8px] text-slate-500 print:text-navy font-mono">{p.numero}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] border-t border-white/5 print:border-navy/5 pt-4">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-blue-500 print:bg-blue-300" />
                <span className="text-slate-400 print:text-slate-600">{t.chartLegendSaldo}</span>
              </div>
            </div>
          </div>
        )}
      </ResultCard>
    </>
  )
}
