'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelDirecao: 'Direção da conversão',
    optionRealDolar: 'Real para Dólar',
    optionDolarReal: 'Dólar para Real',
    labelReal: 'Valor em Reais (R$)',
    labelDolar: 'Valor em Dólares (US$)',
    placeholderValor: 'Ex: 1.000,00',
    labelCotacao: 'Cotação do Dólar (R$)',
    placeholderCotacao: 'Ex: 5,85',
    buttonCalcular: 'Converter',
    resultTitle: 'Resultado da Conversão',
    labelResultadoDolar: 'Valor em Dólares',
    labelResultadoReal: 'Valor em Reais',
    itemValorOriginal: 'Valor original',
    itemCotacao: 'Cotação utilizada',
  },
  es: {
    labelDirecao: 'Dirección de la conversión',
    optionRealDolar: 'Real a Dólar',
    optionDolarReal: 'Dólar a Real',
    labelReal: 'Valor en Reales (R$)',
    labelDolar: 'Valor en Dólares (US$)',
    placeholderValor: 'Ej: 1.000,00',
    labelCotacao: 'Cotización del Dólar (R$)',
    placeholderCotacao: 'Ej: 5,85',
    buttonCalcular: 'Convertir',
    resultTitle: 'Resultado de la Conversión',
    labelResultadoDolar: 'Valor en Dólares',
    labelResultadoReal: 'Valor en Reales',
    itemValorOriginal: 'Valor original',
    itemCotacao: 'Cotización utilizada',
  }
}

export function RealDolarForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [cotacao, setCotacao] = useState('')
  const [direcao, setDirecao] = useState('real-dolar')
  const [result, setResult] = useState<{ valorOriginal: number; taxa: number; valorConvertido: number } | null>(null)

  function handleCalcular() {
    const input = { valor: parseBRNumber(valor), taxa: parseBRNumber(cotacao) }
    if (direcao === 'real-dolar') {
      setResult(converterMoeda(input))
    } else {
      setResult(converterMoedaInverso(input))
    }
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(cotacao) > 0

  const labelValor = direcao === 'real-dolar' ? t.labelReal : t.labelDolar
  const labelResultado = direcao === 'real-dolar' ? t.labelResultadoDolar : t.labelResultadoReal
  const prefixo = direcao === 'real-dolar' ? 'US$' : 'R$'

  function formatResultado(v: number): string {
    return `${prefixo} ${v.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
            { value: 'real-dolar', label: t.optionRealDolar },
            { value: 'dolar-real', label: t.optionDolarReal },
          ]} 
        />
        <Input 
          label={labelValor} 
          id="valor" 
          value={valor} 
          onChange={(v) => setValor(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
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
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatResultado(result.valorConvertido) : ''} 
        mainLabel={labelResultado}
        items={result ? [
          { label: t.itemValorOriginal, value: direcao === 'real-dolar' ? formatCurrency(result.valorOriginal) : `US$ ${result.valorOriginal.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: t.itemCotacao, value: `R$ ${result.taxa.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}` },
          { label: labelResultado, value: formatResultado(result.valorConvertido), highlight: true },
        ] : []} 
      />
    </>
  )
}
