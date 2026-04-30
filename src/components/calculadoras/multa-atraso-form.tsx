'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularMultaAtraso } from '@/lib/calculadoras/multa-atraso'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor do débito (R$)',
    labelDiasAtraso: 'Dias em atraso',
    labelMultaPercent: 'Multa moratória (%)',
    labelJurosDiario: 'Juros ao dia (%)',
    placeholderValor: 'Ex: 1.500,00',
    placeholderDiasAtraso: 'Ex: 30',
    placeholderMulta: 'Ex: 2',
    placeholderJuros: 'Ex: 0,033',
    buttonCalcular: 'Calcular Multa',
    resultTitle: 'Resultado da Multa por Atraso',
    resultMainLabel: 'Valor total a pagar',
    itemValorOriginal: 'Valor original',
    itemDiasAtraso: 'Dias em atraso',
    itemMulta: 'Multa moratória',
    itemJuros: 'Juros de mora',
    itemTotal: 'Total com encargos',
    labelDias: 'dias',
  },
  es: {
    labelValor: 'Valor de la deuda',
    labelDiasAtraso: 'Días de retraso',
    labelMultaPercent: 'Multa por mora (%)',
    labelJurosDiario: 'Interés por día (%)',
    placeholderValor: 'Ej: 1.500,00',
    placeholderDiasAtraso: 'Ej: 30',
    placeholderMulta: 'Ej: 2',
    placeholderJuros: 'Ej: 0,033',
    buttonCalcular: 'Calcular Multa',
    resultTitle: 'Resultado de la Multa por Retraso',
    resultMainLabel: 'Valor total a pagar',
    itemValorOriginal: 'Valor original',
    itemDiasAtraso: 'Días de retraso',
    itemMulta: 'Multa por mora',
    itemJuros: 'Intereses de mora',
    itemTotal: 'Total con cargos',
    labelDias: 'días',
  }
}

export function MultaAtrasoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [diasAtraso, setDiasAtraso] = useState('')
  const [multaPercent, setMultaPercent] = useState('2')
  const [jurosDiario, setJurosDiario] = useState('0,033')
  const [result, setResult] = useState<ReturnType<typeof calcularMultaAtraso> | null>(null)

  function handleCalcular() {
    setResult(calcularMultaAtraso({
      valor: parseBRNumber(valor),
      diasAtraso: parseInt(diasAtraso) || 0,
      multaPercent: parseBRNumber(multaPercent),
      jurosDiario: parseBRNumber(jurosDiario),
    }))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(diasAtraso) > 0

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
          label={t.labelDiasAtraso} 
          id="diasAtraso" 
          value={diasAtraso} 
          onChange={(v) => setDiasAtraso(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderDiasAtraso} 
        />
        <Input 
          label={t.labelMultaPercent} 
          id="multaPercent" 
          value={multaPercent} 
          onChange={(v) => setMultaPercent(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderMulta} 
          suffix="%" 
        />
        <Input 
          label={t.labelJurosDiario} 
          id="jurosDiario" 
          value={jurosDiario} 
          onChange={(v) => setJurosDiario(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderJuros} 
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
          mainValue={formatCurrency(result.valorTotal)}
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemValorOriginal, value: formatCurrency(result.valorOriginal) },
            { label: t.itemDiasAtraso, value: `${result.diasAtraso} ${t.labelDias}` },
            { label: `${t.itemMulta} (${multaPercent}%)`, value: formatCurrency(result.multa), highlight: true },
            { label: t.itemJuros, value: formatCurrency(result.juros), highlight: true },
            { label: t.itemTotal, value: formatCurrency(result.valorTotal), highlight: true },
          ]}
        />
      )}
    </>
  )
}
