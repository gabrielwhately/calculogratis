'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularFinanciamentoPrice, calcularFinanciamentoSAC } from '@/lib/calculadoras/financiamento'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

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
    buttonSimular: 'Simular',
    resultTitle: 'Financiamento',
    labelParcelaFixa: 'Parcela fixa',
    labelParcelaInicial: 'Primeira parcela',
    itemFinanciado: 'Valor financiado',
    itemJuros: 'Total de juros',
    itemTotal: 'Total pago',
    itemUltima: 'Última parcela',
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
    buttonSimular: 'Simular',
    resultTitle: 'Financiamiento',
    labelParcelaFixa: 'Cuota fija',
    labelParcelaInicial: 'Primera cuota',
    itemFinanciado: 'Valor financiado',
    itemJuros: 'Total de intereses',
    itemTotal: 'Total pagado',
    itemUltima: 'Última cuota',
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
        <div className="mb-4 flex rounded-lg bg-slate-100 dark:bg-gray-700 p-1">
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
        <Input 
          label={t.labelValor} 
          id="valor" 
          value={valor} 
          onChange={setValor} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
        />
        <Input 
          label={t.labelEntrada} 
          id="entrada" 
          value={entrada} 
          onChange={setEntrada} 
          inputMode="decimal" 
          placeholder={t.placeholderEntrada} 
        />
        <Input 
          label={t.labelTaxa} 
          id="taxa" 
          value={taxa} 
          onChange={setTaxa} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxa} 
          suffix={t.suffixTaxa} 
        />
        <Input 
          label={t.labelPrazo} 
          id="prazo" 
          value={prazo} 
          onChange={setPrazo} 
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
        mainValue={result ? formatCurrency(result.parcela) : ''} 
        mainLabel={sistema === 'price' ? t.labelParcelaFixa : t.labelParcelaInicial}
        items={result ? [
          { label: t.itemFinanciado, value: formatCurrency(result.valorFinanciado) }, 
          { label: t.itemJuros, value: formatCurrency(result.totalJuros), highlight: true }, 
          { label: t.itemTotal, value: formatCurrency(result.totalPago) },
          ...(sistema === 'sac' && result.parcelas.length > 0 ? [{ label: t.itemUltima, value: formatCurrency(result.parcelas[result.parcelas.length - 1].parcela) }] : [])
        ] : []} 
      />
    </>
  )
}
