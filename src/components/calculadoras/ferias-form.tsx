'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { Checkbox } from '@/components/ui/checkbox'
import { ResultCard } from '@/components/ui/result-card'
import { calcularFerias } from '@/lib/calculadoras/ferias'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelDependentes: 'Dependentes',
    labelDiasFerias: 'Dias de férias',
    labelVendeAbono: 'Vender 10 dias (abono pecuniário)',
    placeholderSalario: 'Ex: 3.000,00',
    buttonCalcular: 'Calcular Férias',
    resultTitle: 'Ferias Trabalhistas',
    mainLabel: 'Valor liquido das ferias',
    labelFeriasBase: 'Ferias base',
    labelTerco: '1/3 constitucional',
    labelAbono: 'Abono pecuniario',
    labelTotalBruto: 'Total bruto',
    labelInss: 'INSS',
    labelIrrf: 'IRRF',
    daysSuffix: 'dias'
  },
  es: {
    labelSalario: 'Salario bruto',
    labelDependentes: 'Dependientes',
    labelDiasFerias: 'Días de vacaciones',
    labelVendeAbono: 'Vender 10 días (bono vacacional)',
    placeholderSalario: 'Ej: 3.000,00',
    buttonCalcular: 'Calcular vacaciones',
    resultTitle: 'Vacaciones laborales',
    mainLabel: 'Valor líquido de las vacaciones',
    labelFeriasBase: 'Vacaciones base',
    labelTerco: '1/3 constitucional',
    labelAbono: 'Bono pecuniario',
    labelTotalBruto: 'Total bruto',
    labelInss: 'INSS',
    labelIrrf: 'IRRF',
    daysSuffix: 'días'
  }
}

export function FeriasForm() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/es') ? 'es' : 'pt'
  const t = I18N[locale]

  const [salario, setSalario] = useState('')
  const [diasFerias, setDiasFerias] = useState('30')
  const [dependentes, setDependentes] = useState('0')
  const [vendeAbono, setVendeAbono] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof calcularFerias> | null>(null)

  const diasOptions = Array.from({ length: 21 }, (_, i) => ({
    value: String(30 - i),
    label: `${30 - i} ${t.daysSuffix}`,
  }))

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
        <Input label={t.labelSalario} id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder={t.placeholderSalario} />
        <Input label={t.labelDependentes} id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" optional />
        <Select label={t.labelDiasFerias} id="dias-ferias" value={diasFerias} onChange={setDiasFerias} options={diasOptions} />
        <Checkbox
          label={t.labelVendeAbono}
          checked={vendeAbono}
          onChange={setVendeAbono}
        />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.totalLiquido) : ''}
        mainLabel={t.mainLabel}
        items={result ? [
          { label: t.labelFeriasBase, value: formatCurrency(result.feriasBase) },
          { label: t.labelTerco, value: formatCurrency(result.tercoConstitucional) },
          ...(result.abonoPecuniario > 0 ? [{ label: t.labelAbono, value: formatCurrency(result.abonoPecuniario) }] : []),
          { label: t.labelTotalBruto, value: formatCurrency(result.totalBruto), highlight: true },
          { label: t.labelInss, value: `- ${formatCurrency(result.descontoINSS)}` },
          { label: t.labelIrrf, value: `- ${formatCurrency(result.descontoIRRF)}` },
        ] : []}
      />
    </>
  )
}
