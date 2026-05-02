'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularConsumoAparelho } from '@/lib/calculadoras/consumo-energia'
import { formatCurrency, parseBRNumber, maskCurrency, maskNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelPotencia: 'Potência do aparelho (Watts)',
    labelHoras: 'Horas de uso por dia',
    labelDias: 'Dias de uso por mês',
    labelTarifa: 'Tarifa de energia (R$/kWh)',
    placeholderPotencia: 'Ex: 1500',
    placeholderHoras: 'Ex: 8',
    placeholderDias: '30',
    placeholderTarifa: 'Ex: 0,85',
    btnCalcular: 'Calcular Consumo',
    resTitle: 'Consumo de Energia',
    resMainLabel: 'Custo mensal estimado',
    itemConsumoMensal: 'Consumo mensal',
    itemCustoMensal: 'Custo mensal',
    itemConsumoAnual: 'Consumo anual',
    itemCustoAnual: 'Custo anual',
  },
  es: {
    labelPotencia: 'Potencia del aparato (Watts)',
    labelHoras: 'Horas de uso por día',
    labelDias: 'Días de uso por mes',
    labelTarifa: 'Tarifa de energía (kWh)',
    placeholderPotencia: 'Ej: 1500',
    placeholderHoras: 'Ej: 8',
    placeholderDias: '30',
    placeholderTarifa: 'Ej: 0,85',
    btnCalcular: 'Calcular Consumo',
    resTitle: 'Consumo de Energía',
    resMainLabel: 'Costo mensual estimado',
    itemConsumoMensal: 'Consumo mensual',
    itemCustoMensal: 'Costo mensual',
    itemConsumoAnual: 'Consumo anual',
    itemCustoAnual: 'Costo anual',
  }
}

export function ConsumoEnergiaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [potencia, setPotencia] = useState('')
  const [horas, setHoras] = useState('')
  const [dias, setDias] = useState('30')
  const [tarifa, setTarifa] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularConsumoAparelho> | null>(null)

  function handleCalcular() {
    setResult(calcularConsumoAparelho(
      parseBRNumber(potencia),
      parseBRNumber(horas),
      parseBRNumber(dias),
      parseBRNumber(tarifa),
    ))
  }

  const isValid = parseBRNumber(potencia) > 0 && parseBRNumber(horas) > 0 && parseBRNumber(tarifa) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelPotencia} 
          value={potencia} 
          onChange={(v) => setPotencia(maskNumber(v))} 
          inputMode="numeric" 
          placeholder={t.placeholderPotencia} 
        />
        <Input 
          label={t.labelHoras} 
          value={horas} 
          onChange={(v) => setHoras(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderHoras} 
        />
        <Input 
          label={t.labelDias} 
          value={dias} 
          onChange={(v) => setDias(maskNumber(v))} 
          inputMode="numeric" 
          placeholder={t.placeholderDias} 
        />
        <Input 
          label={t.labelTarifa} 
          value={tarifa} 
          onChange={(v) => setTarifa(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTarifa} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </FormCard>

      <ResultCard 
        visible={result !== null} 
        title={t.resTitle} 
        mainValue={result ? formatCurrency(result.custoMensal) : ''} 
        mainLabel={t.resMainLabel}
        items={result ? [
          { label: t.itemConsumoMensal, value: `${result.consumoMensalKwh.toFixed(1)} kWh` },
          { label: t.itemCustoMensal, value: formatCurrency(result.custoMensal), highlight: true },
          { label: t.itemConsumoAnual, value: `${result.consumoAnualKwh.toFixed(1)} kWh` },
          { label: t.itemCustoAnual, value: formatCurrency(result.custoAnual), highlight: true },
        ] : []} 
      />
    </>
  )
}
