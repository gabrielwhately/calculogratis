'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularInsalubridade, calcularPericulosidade } from '@/lib/calculadoras/insalubridade'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelTipo: 'Tipo de adicional',
    optionInsalubridade: 'Insalubridade',
    optionPericulosidade: 'Periculosidade',
    labelSalario: 'Salário bruto (R$)',
    placeholderSalario: 'Ex: 3.000,00',
    labelGrau: 'Grau de insalubridade',
    optionMinimo: 'Mínimo (10%)',
    optionMedio: 'Médio (20%)',
    optionMaximo: 'Máximo (40%)',
    buttonCalcular: 'Calcular',
    resultMainLabel: 'Salário com adicional',
    itemSalarioBruto: 'Salário bruto',
    itemPercentual: 'Percentual',
    itemValorAdicional: 'Valor adicional',
    itemSalarioTotal: 'Salário total',
    itemBaseCalculo: 'Base de cálculo (SM)',
    itemGrau: 'Grau',
    graus: {
      minimo: 'Mínimo',
      medio: 'Médio',
      maximo: 'Máximo'
    }
  },
  es: {
    labelTipo: 'Tipo de adicional',
    optionInsalubridade: 'Insalubridad',
    optionPericulosidade: 'Peligrosidad',
    labelSalario: 'Salario bruto',
    placeholderSalario: 'Ej: 3.000,00',
    labelGrau: 'Grado de insalubridad',
    optionMinimo: 'Mínimo (10%)',
    optionMedio: 'Medio (20%)',
    optionMaximo: 'Máximo (40%)',
    buttonCalcular: 'Calcular',
    resultMainLabel: 'Salario con adicional',
    itemSalarioBruto: 'Salario bruto',
    itemPercentual: 'Porcentaje',
    itemValorAdicional: 'Valor adicional',
    itemSalarioTotal: 'Salario total',
    itemBaseCalculo: 'Base de cálculo (SM)',
    itemGrau: 'Grado',
    graus: {
      minimo: 'Mínimo',
      medio: 'Medio',
      maximo: 'Máximo'
    }
  }
}

export function InsalubridadeForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [tipo, setTipo] = useState('insalubridade')
  const [salario, setSalario] = useState('')
  const [grau, setGrau] = useState('medio')
  const [result, setResult] = useState<{ items: { label: string; value: string; highlight?: boolean }[]; mainValue: string; mainLabel: string; title: string } | null>(null)

  function handleCalcular() {
    const sal = parseBRNumber(salario)
    if (tipo === 'periculosidade') {
      const r = calcularPericulosidade(sal)
      setResult({
        title: t.optionPericulosidade,
        mainValue: formatCurrency(r.salarioComAdicional),
        mainLabel: t.resultMainLabel,
        items: [
          { label: t.itemSalarioBruto, value: formatCurrency(r.salarioBruto) },
          { label: t.itemPercentual, value: `${r.percentual}%` },
          { label: t.itemValorAdicional, value: formatCurrency(r.valorAdicional), highlight: true },
          { label: t.itemSalarioTotal, value: formatCurrency(r.salarioComAdicional), highlight: true },
        ],
      })
    } else {
      const r = calcularInsalubridade(sal, grau as 'minimo' | 'medio' | 'maximo')
      setResult({
        title: t.optionInsalubridade,
        mainValue: formatCurrency(r.salarioComAdicional),
        mainLabel: t.resultMainLabel,
        items: [
          { label: t.itemSalarioBruto, value: formatCurrency(r.salarioBruto) },
          { label: t.itemBaseCalculo, value: formatCurrency(r.baseCalculo) },
          { label: t.itemGrau, value: t.graus[r.grau as keyof typeof t.graus] || r.grau },
          { label: t.itemPercentual, value: `${r.percentual}%` },
          { label: t.itemValorAdicional, value: formatCurrency(r.valorAdicional), highlight: true },
          { label: t.itemSalarioTotal, value: formatCurrency(r.salarioComAdicional), highlight: true },
        ],
      })
    }
  }

  return (
    <>
      <FormCard>
        <Select 
          label={t.labelTipo} 
          id="tipo" 
          value={tipo} 
          onChange={setTipo} 
          options={[
            { value: 'insalubridade', label: t.optionInsalubridade },
            { value: 'periculosidade', label: t.optionPericulosidade },
          ]} 
        />
        <Input 
          label={t.labelSalario} 
          id="salario" 
          value={salario} 
          onChange={(v) => setSalario(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
        />
        {tipo === 'insalubridade' && (
          <Select 
            label={t.labelGrau} 
            id="grau" 
            value={grau} 
            onChange={setGrau} 
            options={[
              { value: 'minimo', label: t.optionMinimo },
              { value: 'medio', label: t.optionMedio },
              { value: 'maximo', label: t.optionMaximo },
            ]} 
          />
        )}
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={result.title} 
          mainValue={result.mainValue} 
          mainLabel={result.mainLabel} 
          items={result.items} 
        />
      )}
    </>
  )
}
