'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularCorrecaoMonetaria } from '@/lib/calculadoras/correcao-monetaria'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor original (R$)',
    labelIndiceIni: 'Índice inicial (ex: IPCA acumulado na data)',
    labelIndiceFin: 'Índice final (atual)',
    labelJuros: 'Juros de mora (%)',
    labelMeses: 'Meses de atraso',
    placeholderValor: 'Ex: 10.000,00',
    placeholderIndiceIni: 'Ex: 120,50',
    placeholderIndiceFin: 'Ex: 185,30',
    placeholderJuros: 'Ex: 1,00',
    placeholderMeses: 'Ex: 24',
    btnCalcular: 'Calcular Correção',
    resultTitle: 'Resultado da Correção Monetária',
    resultMainLabel: 'Valor total corrigido',
    itemOriginal: 'Valor original',
    itemFator: 'Fator de correção',
    itemCorrigido: 'Valor corrigido',
    itemJuros: 'Juros de mora',
    itemTotal: 'Total (correção + juros)',
  },
  es: {
    labelValor: 'Monto original',
    labelIndiceIni: 'Índice inicial (ej: inflación acumulada)',
    labelIndiceFin: 'Índice final (actual)',
    labelJuros: 'Interés moratorio (%)',
    labelMeses: 'Meses de retraso',
    placeholderValor: 'Ej: 10.000,00',
    placeholderIndiceIni: 'Ej: 120,50',
    placeholderIndiceFin: 'Ej: 185,30',
    placeholderJuros: 'Ej: 1,00',
    placeholderMeses: 'Ej: 24',
    btnCalcular: 'Calcular Corrección',
    resultTitle: 'Resultado de la Corrección Monetaria',
    resultMainLabel: 'Monto total corregido',
    itemOriginal: 'Monto original',
    itemFator: 'Factor de corrección',
    itemCorrigido: 'Monto corregido',
    itemJuros: 'Interés moratorio',
    itemTotal: 'Total (corrección + intereses)',
  }
}

export function CorrecaoMonetariaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valorOriginal, setValorOriginal] = useState('')
  const [indiceInicial, setIndiceInicial] = useState('')
  const [indiceFinal, setIndiceFinal] = useState('')
  const [juros, setJuros] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularCorrecaoMonetaria> | null>(null)

  function handleCalcular() {
    setResult(calcularCorrecaoMonetaria({
      valorOriginal: parseBRNumber(valorOriginal),
      indiceInicial: parseBRNumber(indiceInicial),
      indiceFinal: parseBRNumber(indiceFinal),
      juros: parseBRNumber(juros),
      meses: parseInt(meses) || 0,
    }))
  }

  const isValid = parseBRNumber(valorOriginal) > 0 && parseBRNumber(indiceInicial) > 0 && parseBRNumber(indiceFinal) > 0

  return (
    <>
      <FormCard>
        <Input label={t.labelValor} id="valorOriginal" value={valorOriginal} onChange={(v) => setValorOriginal(maskCurrency(v))} inputMode="decimal" placeholder={t.placeholderValor} />
        <Input label={t.labelIndiceIni} id="indiceInicial" value={indiceInicial} onChange={(v) => setIndiceInicial(maskPercent(v))} inputMode="decimal" placeholder={t.placeholderIndiceIni} />
        <Input label={t.labelIndiceFin} id="indiceFinal" value={indiceFinal} onChange={(v) => setIndiceFinal(maskPercent(v))} inputMode="decimal" placeholder={t.placeholderIndiceFin} />
        <Input label={t.labelJuros} id="juros" value={juros} onChange={(v) => setJuros(maskPercent(v))} inputMode="decimal" placeholder={t.placeholderJuros} suffix="%" />
        <Input label={t.labelMeses} id="meses" value={meses} onChange={(v) => setMeses(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderMeses} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </FormCard>
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.valorTotal) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemOriginal, value: formatCurrency(result.valorOriginal) },
          { label: t.itemFator, value: result.fatorCorrecao.toFixed(6) },
          { label: t.itemCorrigido, value: formatCurrency(result.valorCorrigido), highlight: true },
          { label: t.itemJuros, value: formatCurrency(result.valorJuros) },
          { label: t.itemTotal, value: formatCurrency(result.valorTotal), highlight: true },
        ] : []}
      />
    </>
  )
}
