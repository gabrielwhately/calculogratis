'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDesconto } from '@/lib/calculadoras/calculadora-desconto'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor original (R$)',
    labelDesconto: 'Desconto (%)',
    placeholderValor: 'Ex: 299,90',
    placeholderDesconto: 'Ex: 15',
    buttonCalcular: 'Calcular Desconto',
    resultTitle: 'Resultado do Desconto',
    resultMainLabel: 'Valor final com desconto',
    itemOriginal: 'Valor original',
    itemPercentual: 'Percentual de desconto',
    itemValorDesconto: 'Valor do desconto',
    itemEconomia: 'Você economiza',
  },
  es: {
    labelValor: 'Precio original',
    labelDesconto: 'Descuento (%)',
    placeholderValor: 'Ej: 299,90',
    placeholderDesconto: 'Ej: 15',
    buttonCalcular: 'Calcular Descuento',
    resultTitle: 'Resultado del Descuento',
    resultMainLabel: 'Precio final con descuento',
    itemOriginal: 'Precio original',
    itemPercentual: 'Porcentaje de descuento',
    itemValorDesconto: 'Valor del descuento',
    itemEconomia: 'Usted ahorra',
  }
}

export function CalculadoraDescontoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [desconto, setDesconto] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularDesconto> | null>(null)

  function handleCalcular() {
    setResult(calcularDesconto(parseBRNumber(valor), parseBRNumber(desconto)))
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(desconto) > 0

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
          label={t.labelDesconto}
          id="desconto"
          value={desconto}
          onChange={(v) => setDesconto(maskPercent(v))}
          inputMode="decimal"
          placeholder={t.placeholderDesconto}
          suffix="%"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.buttonCalcular}</Button>
      </FormCard>
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.valorFinal) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemOriginal, value: formatCurrency(result.valorOriginal) },
          { label: t.itemPercentual, value: `${result.desconto}%` },
          { label: t.itemValorDesconto, value: formatCurrency(result.valorDesconto), highlight: true },
          { label: t.itemEconomia, value: formatCurrency(result.economia), highlight: true },
        ] : []}
      />
    </>
  )
}
