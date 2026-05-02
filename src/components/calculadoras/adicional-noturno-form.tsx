'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularAdicionalNoturno } from '@/lib/calculadoras/adicional-noturno'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelJornada: 'Jornada mensal (horas)',
    labelHorasNoturnas: 'Horas noturnas no mês (22h-5h)',
    labelPercentual: 'Percentual adicional (%)',
    placeholderSalario: 'Ex: 3.000,00',
    placeholderJornada: '220',
    placeholderHorasNoturnas: 'Ex: 40',
    placeholderPercentual: '20',
    buttonCalcular: 'Calcular',
    resultTitle: 'Adicional Noturno',
    resultMainLabel: 'Total do adicional noturno',
    itemValorHoraNormal: 'Valor hora normal',
    itemValorHoraNoturna: 'Valor hora noturna',
    itemAdicionalPorHora: 'Adicional por hora',
    itemHorasNoturnas: 'Horas noturnas',
    itemHorasReduzidas: 'Horas reduzidas (CLT)',
    itemTotalAdicional: 'Total adicional',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelJornada: 'Jornada mensual (horas)',
    labelHorasNoturnas: 'Horas nocturnas por mes (22h-5h)',
    labelPercentual: 'Porcentaje adicional (%)',
    placeholderSalario: 'Ej: 3.000,00',
    placeholderJornada: '220',
    placeholderHorasNoturnas: 'Ej: 40',
    placeholderPercentual: '20',
    buttonCalcular: 'Calcular',
    resultTitle: 'Adicional Nocturno',
    resultMainLabel: 'Total del adicional nocturno',
    itemValorHoraNormal: 'Valor hora normal',
    itemValorHoraNoturna: 'Valor hora nocturna',
    itemAdicionalPorHora: 'Adicional por hora',
    itemHorasNoturnas: 'Horas nocturnas',
    itemHorasReduzidas: 'Horas reducidas (CLT)',
    itemTotalAdicional: 'Total adicional',
  }
}

export function AdicionalNoturnoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [horasMensais, setHorasMensais] = useState('220')
  const [horasNoturnas, setHorasNoturnas] = useState('')
  const [percentual, setPercentual] = useState('20')
  const [result, setResult] = useState<ReturnType<typeof calcularAdicionalNoturno> | null>(null)

  function handleCalcular() {
    const hm = parseInt(horasMensais) || 220
    setResult(calcularAdicionalNoturno(
      parseBRNumber(salario), 
      hm > 0 ? hm : 220, 
      parseBRNumber(horasNoturnas), 
      parseInt(percentual) || 20
    ))
  }

  const isValid = parseBRNumber(salario) > 0 && parseBRNumber(horasNoturnas) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelSalario} 
          value={salario} 
          onChange={(v) => setSalario(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
        />
        <Input 
          label={t.labelJornada} 
          value={horasMensais} 
          onChange={(v) => setHorasMensais(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderJornada} 
        />
        <Input 
          label={t.labelHorasNoturnas} 
          value={horasNoturnas} 
          onChange={(v) => setHorasNoturnas(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderHorasNoturnas} 
        />
        <Input 
          label={t.labelPercentual} 
          value={percentual} 
          onChange={(v) => setPercentual(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPercentual} 
          suffix="%" 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>

      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.totalAdicional) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValorHoraNormal, value: formatCurrency(result.valorHoraNormal) },
          { label: t.itemValorHoraNoturna, value: formatCurrency(result.valorHoraNoturna) },
          { label: t.itemAdicionalPorHora, value: formatCurrency(result.adicionalPorHora) },
          { label: t.itemHorasNoturnas, value: `${result.horasNoturnas}h` },
          { label: t.itemHorasReduzidas, value: `${result.horasReduzidas.toFixed(1)}h` },
          { label: t.itemTotalAdicional, value: formatCurrency(result.totalAdicional), highlight: true },
        ] : []} 
      />
    </>
  )
}
