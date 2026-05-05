'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'
import { formatCurrency, formatPercent, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelDependentes: 'Número de dependentes',
    labelDescontos: 'Outros descontos (R$)',
    placeholderSalario: 'Ex: 5.000,00',
    placeholderDependentes: '0',
    placeholderDescontos: 'Ex: 200,00',
    infoSalario: 'O seu salário total antes de qualquer desconto (como INSS ou IRRF).',
    infoDependentes: 'Pessoas que dependem financeiramente de você (filhos, cônjuge). Cada dependente gera uma dedução no cálculo do IRRF.',
    infoDescontos: 'Informe outros descontos mensais, como vale-transporte, plano de saúde ou pensão alimentícia.',
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
    infoSalario: 'Su salario total antes de cualquier descuento (como Seguridad Social o Impuesto de Renta).',
    infoDependentes: 'Personas que dependen financieramente de usted (hijos, cónyuge). Cada dependiente genera una deducción en el cálculo del impuesto.',
    infoDescontos: 'Informe otros descuentos mensuales, como transporte, seguro médico o pensión alimenticia.',
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
          onChange={(v) => setSalario(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
          info={t.infoSalario}
        />
        <Input 
          label={t.labelDependentes} 
          id="dependentes" 
          value={dependentes} 
          onChange={(v) => setDependentes(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderDependentes} 
          info={t.infoDependentes}
        />
        <Input 
          label={t.labelDescontos} 
          id="descontos" 
          value={descontos} 
          onChange={(v) => setDescontos(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderDescontos} 
          info={t.infoDescontos}
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
