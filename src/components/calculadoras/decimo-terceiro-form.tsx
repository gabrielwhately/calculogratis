'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularDecimoTerceiro } from '@/lib/calculadoras/decimo-terceiro'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelMeses: 'Meses trabalhados no ano',
    labelDependentes: 'Dependentes',
    labelDeducoes: 'Outras deduções (R$)',
    placeholderSalario: 'Ex: 5.000,00',
    placeholderMeses: '12',
    placeholderDependentes: '0',
    placeholderDeducoes: 'Ex: 0,00',
    btnCalcular: 'Calcular',
    resultTitle: '13º Salário',
    resultMainLabel: 'Valor líquido do 13º',
    itemBruto: 'Valor bruto',
    itemMeses: 'Meses trabalhados',
    itemInss: 'INSS',
    itemIrrf: 'IRRF',
    itemDeducoes: 'Outras deduções',
    itemParcela1: '1ª parcela (nov)',
    itemParcela2: '2ª parcela (dez)',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelMeses: 'Meses trabajados en el año',
    labelDependentes: 'Dependientes',
    labelDeducoes: 'Otras deducciones',
    placeholderSalario: 'Ej: 5.000,00',
    placeholderMeses: '12',
    placeholderDependentes: '0',
    placeholderDeducoes: 'Ej: 0,00',
    btnCalcular: 'Calcular',
    resultTitle: '13º Salario (Aguinaldo)',
    resultMainLabel: 'Valor líquido del 13º',
    itemBruto: 'Valor bruto',
    itemMeses: 'Meses trabajados',
    itemInss: 'Seguridad Social',
    itemIrrf: 'Impuesto de renta',
    itemDeducoes: 'Otras deducciones',
    itemParcela1: '1ª cuota (nov)',
    itemParcela2: '2ª cuota (dic)',
  }
}

export function DecimoTerceiroForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [meses, setMeses] = useState('12')
  const [dependentes, setDependentes] = useState('0')
  const [deducoes, setDeducoes] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularDecimoTerceiro> | null>(null)

  function handleCalcular() {
    setResult(calcularDecimoTerceiro({ 
      salarioBruto: parseBRNumber(salario), 
      mesesTrabalhados: parseInt(meses) || 12, 
      dependentes: parseInt(dependentes) || 0, 
      outrasDeducoes: parseBRNumber(deducoes) 
    }))
  }

  return (
    <>
      <FormCard>
        <Input label={t.labelSalario} id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder={t.placeholderSalario} />
        <Input label={t.labelMeses} id="meses" value={meses} onChange={(v) => setMeses(v.replace(/\D/g, '').slice(0, 2))} inputMode="numeric" placeholder={t.placeholderMeses} />
        <Input label={t.labelDependentes} id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderDependentes} />
        <Input label={t.labelDeducoes} id="deducoes" value={deducoes} onChange={(v) => setDeducoes(maskCurrency(v))} inputMode="decimal" placeholder={t.placeholderDeducoes} />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>{t.btnCalcular}</Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.valorLiquido) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemBruto, value: formatCurrency(result.valorBruto) },
          { label: t.itemMeses, value: `${result.mesesTrabalhados}/12` },
          { label: t.itemInss, value: `- ${formatCurrency(result.inss)}` },
          { label: t.itemIrrf, value: `- ${formatCurrency(result.irrf)}` },
          ...(result.deducoes > 0 ? [{ label: t.itemDeducoes, value: `- ${formatCurrency(result.deducoes)}` }] : []),
          { label: t.itemParcela1, value: formatCurrency(result.primeiraParcela) },
          { label: t.itemParcela2, value: formatCurrency(result.segundaParcela), highlight: true },
        ] : []} 
      />
    </>
  )
}
