'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularFerias } from '@/lib/calculadoras/ferias'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const diasOptions = Array.from({ length: 21 }, (_, i) => ({
  value: String(30 - i),
  label: `${30 - i} dias`,
}))

export function FeriasForm() {
  const [salario, setSalario] = useState('')
  const [diasFerias, setDiasFerias] = useState('30')
  const [dependentes, setDependentes] = useState('0')
  const [vendeAbono, setVendeAbono] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof calcularFerias> | null>(null)

  function handleCalcular() {
    setResult(calcularFerias({
      salarioBruto: parseBRNumber(salario),
      diasFerias: parseInt(diasFerias),
      vendeAbono,
      dependentes: parseInt(dependentes) || 0,
    }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" optional />
        <Select label="Dias de ferias" id="dias-ferias" value={diasFerias} onChange={setDiasFerias} options={diasOptions} />
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={vendeAbono}
              onChange={(e) => setVendeAbono(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 dark:border-gray-600 text-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Vender 10 dias (abono pecuniario)</span>
          </label>
        </div>
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular Ferias</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Ferias Trabalhistas"
        mainValue={result ? formatCurrency(result.totalLiquido) : ''}
        mainLabel="Valor liquido das ferias"
        items={result ? [
          { label: 'Ferias base', value: formatCurrency(result.feriasBase) },
          { label: '1/3 constitucional', value: formatCurrency(result.tercoConstitucional) },
          ...(result.abonoPecuniario > 0 ? [{ label: 'Abono pecuniario', value: formatCurrency(result.abonoPecuniario) }] : []),
          { label: 'Total bruto', value: formatCurrency(result.totalBruto), highlight: true },
          { label: 'INSS', value: `- ${formatCurrency(result.descontoINSS)}` },
          { label: 'IRRF', value: `- ${formatCurrency(result.descontoIRRF)}` },
        ] : []}
      />
    </>
  )
}
