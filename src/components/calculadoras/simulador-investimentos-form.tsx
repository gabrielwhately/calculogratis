'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSimuladorInvestimentos } from '@/lib/calculadoras/simulador-investimentos'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValorInicial: 'Valor inicial (R$)',
    labelAporteMensal: 'Aporte mensal (R$)',
    labelTaxaAnual: 'Taxa anual (%)',
    labelPrazo: 'Período (meses)',
    placeholderValorInicial: 'Ex: 10.000,00',
    placeholderAporteMensal: 'Ex: 500,00',
    placeholderTaxaAnual: 'Ex: 12,0',
    placeholderPrazo: 'Ex: 60',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado do Investimento',
    resultMainLabel: 'Montante final',
    itemValorInicial: 'Valor inicial',
    itemTotalInvestido: 'Total investido',
    itemTotalJuros: 'Total em juros',
    itemRentabilidade: 'Rentabilidade',
  },
  es: {
    labelValorInicial: 'Valor inicial',
    labelAporteMensal: 'Aporte mensual',
    labelTaxaAnual: 'Tasa anual (%)',
    labelPrazo: 'Plazo (meses)',
    placeholderValorInicial: 'Ej: 10.000,00',
    placeholderAporteMensal: 'Ej: 500,00',
    placeholderTaxaAnual: 'Ej: 12,0',
    placeholderPrazo: 'Ej: 60',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado de la Inversión',
    resultMainLabel: 'Monto final',
    itemValorInicial: 'Valor inicial',
    itemTotalInvestido: 'Total invertido',
    itemTotalJuros: 'Total en intereses',
    itemRentabilidade: 'Rentabilidad',
  }
}

export function SimuladorInvestimentosForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valorInicial, setValorInicial] = useState('')
  const [aporteMensal, setAporteMensal] = useState('')
  const [taxaAnual, setTaxaAnual] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularSimuladorInvestimentos> | null>(null)

  function handleCalcular() {
    setResult(calcularSimuladorInvestimentos({
      valorInicial: parseBRNumber(valorInicial),
      aporteMensal: parseBRNumber(aporteMensal),
      taxaAnual: parseBRNumber(taxaAnual),
      meses: parseInt(meses) || 0,
    }))
  }

  const isValid = (parseBRNumber(valorInicial) > 0 || parseBRNumber(aporteMensal) > 0) && parseInt(meses) > 0 && parseBRNumber(taxaAnual) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelValorInicial} 
          id="valorInicial" 
          value={valorInicial} 
          onChange={(v) => setValorInicial(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValorInicial} 
        />
        <Input 
          label={t.labelAporteMensal} 
          id="aporteMensal" 
          value={aporteMensal} 
          onChange={(v) => setAporteMensal(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderAporteMensal} 
        />
        <Input 
          label={t.labelTaxaAnual} 
          id="taxaAnual" 
          value={taxaAnual} 
          onChange={(v) => setTaxaAnual(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxaAnual} 
          suffix="%" 
        />
        <Input 
          label={t.labelPrazo} 
          id="meses" 
          value={meses} 
          onChange={(v) => setMeses(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPrazo} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.montanteFinal) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValorInicial, value: formatCurrency(result.valorInicial) },
          { label: t.itemTotalInvestido, value: formatCurrency(result.totalInvestido) },
          { label: t.itemTotalJuros, value: formatCurrency(result.totalJuros), highlight: true },
          { label: t.itemRentabilidade, value: `${result.rentabilidadePercent.toFixed(2)}%` },
        ] : []} 
      />
    </>
  )
}
