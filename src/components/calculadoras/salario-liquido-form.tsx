'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'
import { formatCurrency, formatPercent, parseBRNumber } from '@/lib/formatters'

export function SalarioLiquidoForm() {
  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [descontos, setDescontos] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularSalarioLiquido> | null>(null)

  function handleCalcular() {
    setResult(calcularSalarioLiquido({ salarioBruto: parseBRNumber(salario), dependentes: parseInt(dependentes) || 0, outrosDescontos: parseBRNumber(descontos) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={setSalario} inputMode="decimal" placeholder="Ex: 5.000,00" />
        <Input label="Numero de dependentes" id="dependentes" value={dependentes} onChange={setDependentes} inputMode="numeric" placeholder="0" />
        <Input label="Outros descontos (R$)" id="descontos" value={descontos} onChange={setDescontos} inputMode="decimal" placeholder="Ex: 200,00" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Salario Liquido" mainValue={result ? formatCurrency(result.salarioLiquido) : ''} mainLabel="Valor liquido mensal"
        items={result ? [{ label: 'Salario bruto', value: formatCurrency(result.salarioBruto) }, { label: `INSS (${formatPercent(result.aliquotaEfetivaINSS)})`, value: `- ${formatCurrency(result.inss)}` }, { label: `IRRF (${formatPercent(result.aliquotaEfetivaIRRF)})`, value: `- ${formatCurrency(result.irrf)}` },
          ...(result.outrosDescontos > 0 ? [{ label: 'Outros descontos', value: `- ${formatCurrency(result.outrosDescontos)}` }] : []), { label: 'Salario liquido', value: formatCurrency(result.salarioLiquido), highlight: true }] : []} />
    </>
  )
}
