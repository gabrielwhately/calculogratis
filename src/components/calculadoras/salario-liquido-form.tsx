'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'
import { formatCurrency, formatPercent, parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelDependentes: 'Número de dependentes',
    labelDescontos: 'Outros descontos (R$)',
    placeholderSalario: 'Ex: 5.000,00',
    placeholderDependentes: '0',
    placeholderDescontos: 'Ex: 200,00',
    buttonCalcular: 'Calcular',
    resultTitle: 'Salário Líquido',
    resultMainLabel: 'Valor líquido mensal',
    itemBruto: 'Salário bruto',
    itemINSS: 'INSS',
    itemIRRF: 'IRRF',
    itemOutros: 'Outros descontos',
    itemLiquido: 'Salário líquido',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelDependentes: 'Número de dependientes',
    labelDescontos: 'Otros descuentos',
    placeholderSalario: 'Ej: 5.000,00',
    placeholderDependentes: '0',
    placeholderDescontos: 'Ej: 200,00',
    buttonCalcular: 'Calcular',
    resultTitle: 'Salario Neto',
    resultMainLabel: 'Valor neto mensual',
    itemBruto: 'Salario bruto',
    itemINSS: 'INSS',
    itemIRRF: 'Impuesto de Renta',
    itemOutros: 'Otros descuentos',
    itemLiquido: 'Salario neto',
  }
}

export function SalarioLiquidoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [descontos, setDescontos] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularSalarioLiquido> | null>(null)

  function handleCalcular() {
    setResult(calcularSalarioLiquido({ 
      salarioBruto: parseBRNumber(salario), 
      dependentes: parseInt(dependentes) || 0, 
      outrosDescontos: parseBRNumber(descontos) 
    }))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelSalario} 
          id="salario" 
          value={salario} 
          onChange={setSalario} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
        />
        <Input 
          label={t.labelDependentes} 
          id="dependentes" 
          value={dependentes} 
          onChange={setDependentes} 
          inputMode="numeric" 
          placeholder={t.placeholderDependentes} 
        />
        <Input 
          label={t.labelDescontos} 
          id="descontos" 
          value={descontos} 
          onChange={setDescontos} 
          inputMode="decimal" 
          placeholder={t.placeholderDescontos} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.salarioLiquido) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemBruto, value: formatCurrency(result.salarioBruto) }, 
          { label: `${t.itemINSS} (${formatPercent(result.aliquotaEfetivaINSS)})`, value: `- ${formatCurrency(result.inss)}` }, 
          { label: `${t.itemIRRF} (${formatPercent(result.aliquotaEfetivaIRRF)})`, value: `- ${formatCurrency(result.irrf)}` },
          ...(result.outrosDescontos > 0 ? [{ label: t.itemOutros, value: `- ${formatCurrency(result.outrosDescontos)}` }] : []), 
          { label: t.itemLiquido, value: formatCurrency(result.salarioLiquido), highlight: true }
        ] : []} 
      />
    </>
  )
}
