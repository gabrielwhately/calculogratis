'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelDirecao: 'Direção da conversão',
    optionRealBtc: 'Real para Bitcoin',
    optionBtcReal: 'Bitcoin para Real',
    labelReal: 'Valor em Reais (R$)',
    labelBtc: 'Valor em Bitcoin (BTC)',
    placeholderReal: 'Ex: 1.000,00',
    placeholderBtc: 'Ex: 0,005',
    labelCotacao: 'Cotação do Bitcoin (R$)',
    placeholderCotacao: 'Ex: 500.000,00',
    buttonCalcular: 'Converter',
    resultTitle: 'Resultado da Conversão',
    labelResultadoBtc: 'Valor em Bitcoin',
    labelResultadoReal: 'Valor em Reais',
    itemValorOriginal: 'Valor original',
    itemCotacao: 'Cotação utilizada',
  },
  es: {
    labelDirecao: 'Dirección de la conversión',
    optionRealBtc: 'Real a Bitcoin',
    optionBtcReal: 'Bitcoin a Real',
    labelReal: 'Valor en Reales (R$)',
    labelBtc: 'Valor en Bitcoin (BTC)',
    placeholderReal: 'Ej: 1.000,00',
    placeholderBtc: 'Ej: 0,005',
    labelCotacao: 'Cotización del Bitcoin (R$)',
    placeholderCotacao: 'Ej: 500.000,00',
    buttonCalcular: 'Convertir',
    resultTitle: 'Resultado de la Conversión',
    labelResultadoBtc: 'Valor en Bitcoin',
    labelResultadoReal: 'Valor en Reales',
    itemValorOriginal: 'Valor original',
    itemCotacao: 'Cotización utilizada',
  }
}

export function RealBitcoinForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [cotacao, setCotacao] = useState('')
  const [direcao, setDirecao] = useState('real-btc')
  const [result, setResult] = useState<{ valorOriginal: number; taxa: number; valorConvertido: number } | null>(null)

  function handleCalcular() {
    const input = { valor: parseBRNumber(valor), taxa: parseBRNumber(cotacao) }
    if (direcao === 'real-btc') {
      setResult(converterMoeda(input))
    } else {
      setResult(converterMoedaInverso(input))
    }
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(cotacao) > 0

  const labelValor = direcao === 'real-btc' ? t.labelReal : t.labelBtc
  const labelResultado = direcao === 'real-btc' ? t.labelResultadoBtc : t.labelResultadoReal

  function formatBTC(v: number): string {
    return `BTC ${v.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { minimumFractionDigits: 8, maximumFractionDigits: 8 })}`
  }

  function formatResultado(v: number): string {
    if (direcao === 'real-btc') return formatBTC(v)
    return formatCurrency(v)
  }

  return (
    <>
      <FormCard>
        <Select 
          label={t.labelDirecao} 
          id="direcao" 
          value={direcao} 
          onChange={setDirecao} 
          options={[
            { value: 'real-btc', label: t.optionRealBtc },
            { value: 'btc-real', label: t.optionBtcReal },
          ]} 
        />
        <Input 
          label={labelValor} 
          id="valor" 
          value={valor} 
          onChange={(v) => setValor(direcao === 'real-btc' ? maskCurrency(v) : maskPercent(v))} 
          inputMode="decimal" 
          placeholder={direcao === 'real-btc' ? t.placeholderReal : t.placeholderBtc} 
        />
        <Input 
          label={t.labelCotacao} 
          id="cotacao" 
          value={cotacao} 
          onChange={(v) => setCotacao(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderCotacao} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={t.resultTitle} 
          mainValue={formatResultado(result.valorConvertido)} 
          mainLabel={labelResultado}
          items={[
            { label: t.itemValorOriginal, value: direcao === 'real-btc' ? formatCurrency(result.valorOriginal) : formatBTC(result.valorOriginal) },
            { label: t.itemCotacao, value: formatCurrency(result.taxa) },
            { label: labelResultado, value: formatResultado(result.valorConvertido), highlight: true },
          ]} 
        />
      )}
    </>
  )
}
