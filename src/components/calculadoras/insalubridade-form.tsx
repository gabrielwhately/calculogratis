'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularInsalubridade, calcularPericulosidade } from '@/lib/calculadoras/insalubridade'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function InsalubridadeForm() {
  const [tipo, setTipo] = useState('insalubridade')
  const [salario, setSalario] = useState('')
  const [grau, setGrau] = useState('medio')
  const [result, setResult] = useState<{ items: { label: string; value: string; highlight?: boolean }[]; mainValue: string; mainLabel: string; title: string } | null>(null)

  function handleCalcular() {
    const sal = parseBRNumber(salario)
    if (tipo === 'periculosidade') {
      const r = calcularPericulosidade(sal)
      setResult({
        title: 'Periculosidade',
        mainValue: formatCurrency(r.salarioComAdicional),
        mainLabel: 'Salario com adicional',
        items: [
          { label: 'Salario bruto', value: formatCurrency(r.salarioBruto) },
          { label: 'Percentual', value: `${r.percentual}%` },
          { label: 'Valor adicional', value: formatCurrency(r.valorAdicional), highlight: true },
          { label: 'Salario total', value: formatCurrency(r.salarioComAdicional), highlight: true },
        ],
      })
    } else {
      const r = calcularInsalubridade(sal, grau as 'minimo' | 'medio' | 'maximo')
      setResult({
        title: 'Insalubridade',
        mainValue: formatCurrency(r.salarioComAdicional),
        mainLabel: 'Salario com adicional',
        items: [
          { label: 'Salario bruto', value: formatCurrency(r.salarioBruto) },
          { label: 'Base de calculo (SM)', value: formatCurrency(r.baseCalculo) },
          { label: 'Grau', value: r.grau },
          { label: 'Percentual', value: `${r.percentual}%` },
          { label: 'Valor adicional', value: formatCurrency(r.valorAdicional), highlight: true },
          { label: 'Salario total', value: formatCurrency(r.salarioComAdicional), highlight: true },
        ],
      })
    }
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label="Tipo de adicional" id="tipo" value={tipo} onChange={setTipo} options={[
          { value: 'insalubridade', label: 'Insalubridade' },
          { value: 'periculosidade', label: 'Periculosidade' },
        ]} />
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        {tipo === 'insalubridade' && (
          <Select label="Grau de insalubridade" id="grau" value={grau} onChange={setGrau} options={[
            { value: 'minimo', label: 'Minimo (10%)' },
            { value: 'medio', label: 'Medio (20%)' },
            { value: 'maximo', label: 'Maximo (40%)' },
          ]} />
        )}
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title={result?.title ?? ''} mainValue={result?.mainValue ?? ''} mainLabel={result?.mainLabel ?? ''} items={result?.items ?? []} />
    </>
  )
}
