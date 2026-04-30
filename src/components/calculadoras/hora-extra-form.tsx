'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularHoraExtra } from '@/lib/calculadoras/hora-extra'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelJornada: 'Jornada mensal (horas)',
    labelHe50: 'Horas extras 50% (qtd)',
    labelHe100: 'Horas extras 100% (qtd)',
    labelHen: 'Horas noturnas (qtd)',
    placeholderSalario: 'Ex: 3.000,00',
    placeholderJornada: '220',
    placeholderHe50: 'Ex: 10',
    placeholderHe100: 'Ex: 5',
    placeholderHen: 'Ex: 8',
    buttonCalcular: 'Calcular',
    resultTitle: 'Horas Extras',
    resultMainLabel: 'Total de extras',
    itemValorHoraNormal: 'Valor hora normal',
    itemValorHoraExtra50: 'Valor hora extra 50%',
    itemValorHoraExtra100: 'Valor hora extra 100%',
    itemTotalExtras50: 'Total extras 50%',
    itemTotalExtras100: 'Total extras 100%',
    itemAdicionalNoturno: 'Adicional noturno',
    itemTotal: 'Total',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelJornada: 'Jornada mensual (horas)',
    labelHe50: 'Horas extras 50% (cant)',
    labelHe100: 'Horas extras 100% (cant)',
    labelHen: 'Horas nocturnas (cant)',
    placeholderSalario: 'Ej: 3.000,00',
    placeholderJornada: '220',
    placeholderHe50: 'Ej: 10',
    placeholderHe100: 'Ej: 5',
    placeholderHen: 'Ej: 8',
    buttonCalcular: 'Calcular',
    resultTitle: 'Horas Extras',
    resultMainLabel: 'Total de extras',
    itemValorHoraNormal: 'Valor hora normal',
    itemValorHoraExtra50: 'Valor hora extra 50%',
    itemValorHoraExtra100: 'Valor hora extra 100%',
    itemTotalExtras50: 'Total extras 50%',
    itemTotalExtras100: 'Total extras 100%',
    itemAdicionalNoturno: 'Adicional nocturno',
    itemTotal: 'Total',
  }
}

export function HoraExtraForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [horasMensais, setHorasMensais] = useState('220')
  const [horas50, setHoras50] = useState('')
  const [horas100, setHoras100] = useState('')
  const [horasNoturnas, setHorasNoturnas] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularHoraExtra> | null>(null)

  function handleCalcular() {
    const hm = parseInt(horasMensais) || 220
    setResult(calcularHoraExtra({ 
      salarioBruto: parseBRNumber(salario), 
      horasMensais: hm > 0 ? hm : 220, 
      horasExtras50: parseBRNumber(horas50), 
      horasExtras100: parseBRNumber(horas100), 
      horasNoturnas: parseBRNumber(horasNoturnas) 
    }))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelSalario} 
          id="salario" 
          value={salario} 
          onChange={(v) => setSalario(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
        />
        <Input 
          label={t.labelJornada} 
          id="jornada" 
          value={horasMensais} 
          onChange={(v) => setHorasMensais(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderJornada} 
        />
        <Input 
          label={t.labelHe50} 
          id="he50" 
          value={horas50} 
          onChange={(v) => setHoras50(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderHe50} 
        />
        <Input 
          label={t.labelHe100} 
          id="he100" 
          value={horas100} 
          onChange={(v) => setHoras100(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderHe100} 
        />
        <Input 
          label={t.labelHen} 
          id="hen" 
          value={horasNoturnas} 
          onChange={(v) => setHorasNoturnas(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderHen} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={t.resultTitle} 
          mainValue={formatCurrency(result.totalExtras)} 
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemValorHoraNormal, value: formatCurrency(result.valorHoraNormal) },
            { label: t.itemValorHoraExtra50, value: formatCurrency(result.valorHoraExtra50) },
            { label: t.itemValorHoraExtra100, value: formatCurrency(result.valorHoraExtra100) },
            { label: t.itemTotalExtras50, value: formatCurrency(result.totalHorasExtras50) },
            { label: t.itemTotalExtras100, value: formatCurrency(result.totalHorasExtras100) },
            { label: t.itemAdicionalNoturno, value: formatCurrency(result.totalAdicionalNoturno) },
            { label: t.itemTotal, value: formatCurrency(result.totalExtras), highlight: true },
          ]} 
        />
      )}
    </>
  )
}
