'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { Checkbox } from '@/components/ui/checkbox'
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
      <FormCard>
        <Input label="Salário bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" optional />
        <Select label="Dias de férias" id="dias-ferias" value={diasFerias} onChange={setDiasFerias} options={diasOptions} />
        <Checkbox
          label="Vender 10 dias (abono pecuniário)"
          checked={vendeAbono}
          onChange={setVendeAbono}
        />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular Férias</Button>
      </FormCard>
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
