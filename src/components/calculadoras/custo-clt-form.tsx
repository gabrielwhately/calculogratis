'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularCustoCLT } from '@/lib/calculadoras/custo-clt'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function CustoCLTForm() {
  const [salarioBruto, setSalarioBruto] = useState('')
  const [valeTransporte, setValeTransporte] = useState('')
  const [valeRefeicao, setValeRefeicao] = useState('')
  const [planoSaude, setPlanoSaude] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularCustoCLT> | null>(null)

  function handleCalcular() {
    setResult(calcularCustoCLT({
      salarioBruto: parseBRNumber(salarioBruto),
      valeTransporte: parseBRNumber(valeTransporte),
      valeRefeicao: parseBRNumber(valeRefeicao),
      planoSaude: parseBRNumber(planoSaude),
    }))
  }

  const isValid = parseBRNumber(salarioBruto) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input
          label="Salário bruto (R$)"
          id="salarioBruto"
          value={salarioBruto}
          onChange={(v) => setSalarioBruto(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 5.000,00"
        />
        <Input
          label="Vale-transporte mensal (R$)"
          id="valeTransporte"
          value={valeTransporte}
          onChange={(v) => setValeTransporte(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 220,00"
        />
        <Input
          label="Vale-refeição mensal (R$)"
          id="valeRefeicao"
          value={valeRefeicao}
          onChange={(v) => setValeRefeicao(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 600,00"
        />
        <Input
          label="Plano de saúde mensal (R$)"
          id="planoSaude"
          value={planoSaude}
          onChange={(v) => setPlanoSaude(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 350,00"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Custo</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Custo Total do Funcionário CLT"
        mainValue={result ? formatCurrency(result.custoTotal) : ''}
        mainLabel="Custo mensal total para a empresa"
        items={result ? [
          { label: 'Salário bruto', value: formatCurrency(result.salarioBruto) },
          { label: 'INSS patronal (20%)', value: formatCurrency(result.inssPatronal), highlight: true },
          { label: 'FGTS (8%)', value: formatCurrency(result.fgts) },
          { label: 'Provisão 13º', value: formatCurrency(result.provisao13) },
          { label: 'Provisao ferias + 1/3', value: formatCurrency(result.provisaoFerias) },
          { label: 'INSS s/ provisoes', value: formatCurrency(result.inssProvisoes) },
          { label: 'FGTS s/ provisoes', value: formatCurrency(result.fgtsProvisoes) },
          { label: 'Vale-transporte', value: formatCurrency(result.valeTransporte) },
          { label: 'Vale-refeição', value: formatCurrency(result.valeRefeicao) },
          { label: 'Plano de saúde', value: formatCurrency(result.planoSaude) },
          { label: 'Custo sobre salário', value: `+${result.custoPercentual.toFixed(1).replace('.', ',')}%`, highlight: true },
        ] : []}
      />
    </>
  )
}
