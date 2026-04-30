'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIPVA, ALIQUOTAS_IPVA } from '@/lib/calculadoras/ipva'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const ESTADOS_OPTIONS = Object.keys(ALIQUOTAS_IPVA).sort().map((uf) => ({
  value: uf,
  label: `${uf} — ${ALIQUOTAS_IPVA[uf]}%`,
}))

const I18N = {
  pt: {
    labelValorVenal: 'Valor venal do veículo (R$)',
    labelEstado: 'Estado',
    placeholderValorVenal: 'Ex: 50.000,00',
    buttonCalcular: 'Calcular IPVA',
    resultTitle: 'IPVA 2026',
    resultMainLabel: 'Valor total do IPVA',
    itemValorVenal: 'Valor venal',
    itemEstado: 'Estado',
    itemAliquota: 'Alíquota',
    itemIPVATotal: 'IPVA total',
    itemParcela: 'Parcela (1/3)',
  },
  es: {
    labelValorVenal: 'Valor de tasación del vehículo',
    labelEstado: 'Estado (Provincia)',
    placeholderValorVenal: 'Ej: 50.000,00',
    buttonCalcular: 'Calcular IPVA',
    resultTitle: 'IPVA 2026',
    resultMainLabel: 'Valor total del IPVA',
    itemValorVenal: 'Valor de tasación',
    itemEstado: 'Estado',
    itemAliquota: 'Alícuota',
    itemIPVATotal: 'IPVA total',
    itemParcela: 'Cuota (1/3)',
  }
}

export function IPVAForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valorVenal, setValorVenal] = useState('')
  const [estado, setEstado] = useState('SP')
  const [result, setResult] = useState<ReturnType<typeof calcularIPVA> | null>(null)

  function handleCalcular() {
    setResult(calcularIPVA({ valorVenal: parseBRNumber(valorVenal), estado }))
  }

  const isValid = parseBRNumber(valorVenal) > 0

  return (
    <>
      <FormCard>
        <Input
          label={t.labelValorVenal}
          id="valorVenal"
          value={valorVenal}
          onChange={(v) => setValorVenal(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderValorVenal}
        />
        <Select
          label={t.labelEstado}
          id="estado"
          value={estado}
          onChange={(v) => { setEstado(v); setResult(null) }}
          options={ESTADOS_OPTIONS}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.buttonCalcular}</Button>
      </FormCard>
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.valorIPVA) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValorVenal, value: formatCurrency(result.valorVenal) },
          { label: t.itemEstado, value: result.estado },
          { label: t.itemAliquota, value: `${result.aliquota}%` },
          { label: t.itemIPVATotal, value: formatCurrency(result.valorIPVA), highlight: true },
          { label: t.itemParcela, value: formatCurrency(result.parcelaMensal) },
        ] : []}
      />
    </>
  )
}
