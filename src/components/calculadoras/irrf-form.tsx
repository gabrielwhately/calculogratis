'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIRRF } from '@/lib/calculadoras/irrf'
import { formatCurrency, formatPercent, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function IRRFForm() {
  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [pensao, setPensao] = useState('')
  const [deducoes, setDeducoes] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIRRF> | null>(null)

  function handleCalcular() {
    setResult(calcularIRRF({ salarioBruto: parseBRNumber(salario), dependentes: parseInt(dependentes) || 0, pensaoAlimenticia: parseBRNumber(pensao), outrasDeducoes: parseBRNumber(deducoes) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 5.000,00" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" />
        <Input label="Pensao alimenticia (R$)" id="pensao" value={pensao} onChange={(v) => setPensao(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 0,00" />
        <Input label="Outras deducoes (R$)" id="deducoes" value={deducoes} onChange={(v) => setDeducoes(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 0,00" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Imposto de Renda" mainValue={result ? formatCurrency(result.irrf) : ''} mainLabel="IRRF mensal"
        items={result ? [{ label: 'Salario bruto', value: formatCurrency(result.salarioBruto) }, { label: 'INSS', value: `- ${formatCurrency(result.inss)}` }, { label: 'Base de calculo', value: formatCurrency(result.baseCalculo) }, { label: 'Faixa', value: result.faixa }, { label: 'Aliquota efetiva', value: formatPercent(result.aliquotaEfetiva) }, { label: 'IRRF', value: formatCurrency(result.irrf), highlight: true }] : []} />
    </>
  )
}
