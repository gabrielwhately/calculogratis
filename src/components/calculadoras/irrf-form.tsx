'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIRRF } from '@/lib/calculadoras/irrf'
import { formatCurrency, formatPercent, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelDependentes: 'Dependentes',
    labelPensao: 'Pensão alimentícia (R$)',
    labelDeducoes: 'Outras deduções (R$)',
    placeholderSalario: 'Ex: 5.000,00',
    placeholderZero: '0',
    buttonCalcular: 'Calcular',
    resultTitle: 'Imposto de Renda',
    resultMainLabel: 'IRRF mensal',
    itemBruto: 'Salário bruto',
    itemINSS: 'INSS',
    itemBase: 'Base de cálculo',
    itemFaixa: 'Faixa',
    itemAliquota: 'Alíquota efetiva',
    itemIRRF: 'IRRF',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelDependentes: 'Dependientes',
    labelPensao: 'Pensión alimenticia',
    labelDeducoes: 'Otras deducciones',
    placeholderSalario: 'Ej: 5.000,00',
    placeholderZero: '0',
    buttonCalcular: 'Calcular',
    resultTitle: 'Impuesto de Renta',
    resultMainLabel: 'IRRF mensual',
    itemBruto: 'Salario bruto',
    itemINSS: 'INSS',
    itemBase: 'Base de cálculo',
    itemFaixa: 'Tramo',
    itemAliquota: 'Alíquota efectiva',
    itemIRRF: 'IRRF',
  }
}

export function IRRFForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [pensao, setPensao] = useState('')
  const [deducoes, setDeducoes] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIRRF> | null>(null)

  function handleCalcular() {
    setResult(calcularIRRF({ 
      salarioBruto: parseBRNumber(salario), 
      dependentes: parseInt(dependentes) || 0, 
      pensaoAlimenticia: parseBRNumber(pensao), 
      outrasDeducoes: parseBRNumber(deducoes) 
    }))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelSalario} 
          id="salario" 
          value={salario} 
          onChange={(v) => setSalario(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
        />
        <Input 
          label={t.labelDependentes} 
          id="dependentes" 
          value={dependentes} 
          onChange={(v) => setDependentes(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderZero} 
        />
        <Input 
          label={t.labelPensao} 
          id="pensao" 
          value={pensao} 
          onChange={(v) => setPensao(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderZero} 
        />
        <Input 
          label={t.labelDeducoes} 
          id="deducoes" 
          value={deducoes} 
          onChange={(v) => setDeducoes(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderZero} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.irrf) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemBruto, value: formatCurrency(result.salarioBruto) }, 
          { label: t.itemINSS, value: `- ${formatCurrency(result.inss)}` }, 
          { label: t.itemBase, value: formatCurrency(result.baseCalculo) }, 
          { label: t.itemFaixa, value: result.faixa }, 
          { label: t.itemAliquota, value: formatPercent(result.aliquotaEfetiva) }, 
          { label: t.itemIRRF, value: formatCurrency(result.irrf), highlight: true }
        ] : []} 
      />
    </>
  )
}
