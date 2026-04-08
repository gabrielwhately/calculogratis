'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDecimoTerceiro } from '@/lib/calculadoras/decimo-terceiro'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function DecimoTerceiroForm() {
  const [salario, setSalario] = useState('')
  const [meses, setMeses] = useState('12')
  const [dependentes, setDependentes] = useState('0')
  const [deducoes, setDeducoes] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularDecimoTerceiro> | null>(null)

  function handleCalcular() {
    setResult(calcularDecimoTerceiro({ salarioBruto: parseBRNumber(salario), mesesTrabalhados: parseInt(meses) || 12, dependentes: parseInt(dependentes) || 0, outrasDeducoes: parseBRNumber(deducoes) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 5.000,00" />
        <Input label="Meses trabalhados no ano" id="meses" value={meses} onChange={(v) => setMeses(v.replace(/\D/g, '').slice(0, 2))} inputMode="numeric" placeholder="12" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" />
        <Input label="Outras deducoes (R$)" id="deducoes" value={deducoes} onChange={(v) => setDeducoes(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 0,00" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="13o Salario" mainValue={result ? formatCurrency(result.valorLiquido) : ''} mainLabel="Valor liquido do 13o"
        items={result ? [
          { label: 'Valor bruto', value: formatCurrency(result.valorBruto) },
          { label: `Meses trabalhados`, value: `${result.mesesTrabalhados}/12` },
          { label: 'INSS', value: `- ${formatCurrency(result.inss)}` },
          { label: 'IRRF', value: `- ${formatCurrency(result.irrf)}` },
          ...(result.deducoes > 0 ? [{ label: 'Outras deducoes', value: `- ${formatCurrency(result.deducoes)}` }] : []),
          { label: '1a parcela (nov)', value: formatCurrency(result.primeiraParcela) },
          { label: '2a parcela (dez)', value: formatCurrency(result.segundaParcela), highlight: true },
        ] : []} />
    </>
  )
}
