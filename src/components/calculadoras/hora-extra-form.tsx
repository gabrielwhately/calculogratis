'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularHoraExtra } from '@/lib/calculadoras/hora-extra'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function HoraExtraForm() {
  const [salario, setSalario] = useState('')
  const [horasMensais, setHorasMensais] = useState('220')
  const [horas50, setHoras50] = useState('')
  const [horas100, setHoras100] = useState('')
  const [horasNoturnas, setHorasNoturnas] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularHoraExtra> | null>(null)

  function handleCalcular() {
    const hm = parseInt(horasMensais) || 220
    setResult(calcularHoraExtra({ salarioBruto: parseBRNumber(salario), horasMensais: hm > 0 ? hm : 220, horasExtras50: parseBRNumber(horas50), horasExtras100: parseBRNumber(horas100), horasNoturnas: parseBRNumber(horasNoturnas) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Input label="Jornada mensal (horas)" id="jornada" value={horasMensais} onChange={(v) => setHorasMensais(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="220" />
        <Input label="Horas extras 50% (qtd)" id="he50" value={horas50} onChange={(v) => setHoras50(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 10" />
        <Input label="Horas extras 100% (qtd)" id="he100" value={horas100} onChange={(v) => setHoras100(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 5" />
        <Input label="Horas noturnas (qtd)" id="hen" value={horasNoturnas} onChange={(v) => setHorasNoturnas(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 8" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Horas Extras" mainValue={result ? formatCurrency(result.totalExtras) : ''} mainLabel="Total de extras"
        items={result ? [
          { label: 'Valor hora normal', value: formatCurrency(result.valorHoraNormal) },
          { label: 'Valor hora extra 50%', value: formatCurrency(result.valorHoraExtra50) },
          { label: 'Valor hora extra 100%', value: formatCurrency(result.valorHoraExtra100) },
          { label: 'Total extras 50%', value: formatCurrency(result.totalHorasExtras50) },
          { label: 'Total extras 100%', value: formatCurrency(result.totalHorasExtras100) },
          { label: 'Adicional noturno', value: formatCurrency(result.totalAdicionalNoturno) },
          { label: 'Total', value: formatCurrency(result.totalExtras), highlight: true },
        ] : []} />
    </>
  )
}
