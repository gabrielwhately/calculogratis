'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularAdicionalNoturno } from '@/lib/calculadoras/adicional-noturno'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function AdicionalNoturnoForm() {
  const [salario, setSalario] = useState('')
  const [horasMensais, setHorasMensais] = useState('220')
  const [horasNoturnas, setHorasNoturnas] = useState('')
  const [percentual, setPercentual] = useState('20')
  const [result, setResult] = useState<ReturnType<typeof calcularAdicionalNoturno> | null>(null)

  function handleCalcular() {
    const hm = parseInt(horasMensais) || 220
    setResult(calcularAdicionalNoturno(parseBRNumber(salario), hm > 0 ? hm : 220, parseBRNumber(horasNoturnas), parseInt(percentual) || 20))
  }

  const isValid = parseBRNumber(salario) > 0 && parseBRNumber(horasNoturnas) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Input label="Jornada mensal (horas)" id="jornada" value={horasMensais} onChange={(v) => setHorasMensais(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="220" />
        <Input label="Horas noturnas no mes (22h-5h)" id="noturnas" value={horasNoturnas} onChange={(v) => setHorasNoturnas(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 40" />
        <Input label="Percentual adicional (%)" id="percentual" value={percentual} onChange={(v) => setPercentual(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="20" suffix="%" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Adicional Noturno" mainValue={result ? formatCurrency(result.totalAdicional) : ''} mainLabel="Total do adicional noturno"
        items={result ? [
          { label: 'Valor hora normal', value: formatCurrency(result.valorHoraNormal) },
          { label: 'Valor hora noturna', value: formatCurrency(result.valorHoraNoturna) },
          { label: 'Adicional por hora', value: formatCurrency(result.adicionalPorHora) },
          { label: 'Horas noturnas', value: `${result.horasNoturnas}h` },
          { label: 'Horas reduzidas (CLT)', value: `${result.horasReduzidas.toFixed(1)}h` },
          { label: 'Total adicional', value: formatCurrency(result.totalAdicional), highlight: true },
        ] : []} />
    </>
  )
}
