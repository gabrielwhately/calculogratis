'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPjVsClt } from '@/lib/calculadoras/pj-vs-clt'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function PjVsCltForm() {
  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [custoContador, setCustoContador] = useState('200,00')
  const [result, setResult] = useState<ReturnType<typeof calcularPjVsClt> | null>(null)

  function handleCalcular() {
    setResult(calcularPjVsClt({
      salarioBruto: parseBRNumber(salario),
      dependentes: parseInt(dependentes) || 0,
      custoContadorPJ: parseBRNumber(custoContador),
    }))
  }

  const isValid = parseBRNumber(salario) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Salario bruto / Faturamento PJ (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Dependentes (para IRRF CLT)" id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" />
        <Input label="Custo contador PJ (R$/mes)" id="custoContador" value={custoContador} onChange={(v) => setCustoContador(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 200,00" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Comparar</Button>
      </div>
      <ResultCard visible={result !== null} title="Regime CLT" mainValue={result ? formatCurrency(result.clt.beneficioEfetivoMensal) : ''} mainLabel="Beneficio efetivo mensal (com FGTS, 13o, ferias)"
        items={result ? [
          { label: 'Salario bruto', value: formatCurrency(result.clt.salarioBruto) },
          { label: 'INSS', value: `- ${formatCurrency(result.clt.inss)}` },
          { label: 'IRRF', value: `- ${formatCurrency(result.clt.irrf)}` },
          { label: 'Liquido mensal', value: formatCurrency(result.clt.liquidoMensal) },
          { label: 'FGTS (8%)', value: `+ ${formatCurrency(result.clt.fgts)}` },
          { label: '13o salario bruto', value: formatCurrency(result.clt.decimoTerceiro) },
          { label: 'Ferias + 1/3 bruto', value: formatCurrency(result.clt.feriasMaisUmTerco) },
        ] : []} />
      <ResultCard visible={result !== null} title="Regime PJ (Simples Nacional)" mainValue={result ? formatCurrency(result.pj.liquidoMensal) : ''} mainLabel="Liquido mensal PJ"
        items={result ? [
          { label: 'Faturamento', value: formatCurrency(result.pj.faturamento) },
          { label: 'Imposto Simples (~6%)', value: `- ${formatCurrency(result.pj.impostoSimples)}` },
          { label: 'Contador', value: `- ${formatCurrency(result.pj.custoContador)}` },
          { label: 'Liquido PJ', value: formatCurrency(result.pj.liquidoMensal), highlight: true },
          { label: 'Diferenca (PJ - CLT efetivo)', value: `${result.diferencaMensal >= 0 ? '+' : '-'} ${formatCurrency(Math.abs(result.diferencaMensal))}`, highlight: true },
        ] : []} />
    </>
  )
}
