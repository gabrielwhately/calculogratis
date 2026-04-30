'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularJurosSimples } from '@/lib/calculadoras/juros-simples'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelCapital: 'Capital inicial (R$)',
    labelTaxa: 'Taxa mensal (%)',
    labelPeriodo: 'Período (meses)',
    placeholderCapital: 'Ex: 10.000,00',
    placeholderTaxa: 'Ex: 1,5',
    placeholderPeriodo: 'Ex: 12',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Montante final',
    itemCapital: 'Capital',
    itemJuros: 'Juros',
    itemTaxa: 'Taxa mensal',
    itemPeriodo: 'Período',
    unitMeses: 'meses',
  },
  es: {
    labelCapital: 'Capital inicial',
    labelTaxa: 'Tasa mensual (%)',
    labelPeriodo: 'Período (meses)',
    placeholderCapital: 'Ej: 10.000,00',
    placeholderTaxa: 'Ej: 1,5',
    placeholderPeriodo: 'Ej: 12',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Monto final',
    itemCapital: 'Capital',
    itemJuros: 'Intereses',
    itemTaxa: 'Tasa mensal',
    itemPeriodo: 'Período',
    unitMeses: 'meses',
  }
}

export function JurosSimplesForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularJurosSimples> | null>(null)

  function handleCalcular() {
    setResult(calcularJurosSimples({ 
      capital: parseBRNumber(capital), 
      taxaMensal: parseBRNumber(taxa), 
      meses: parseInt(meses) || 0 
    }))
  }

  const isValid = parseBRNumber(capital) > 0 && parseBRNumber(taxa) >= 0 && parseInt(meses) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelCapital} 
          id="capital" 
          value={capital} 
          onChange={setCapital} 
          inputMode="decimal" 
          placeholder={t.placeholderCapital} 
        />
        <Input 
          label={t.labelTaxa} 
          id="taxa" 
          value={taxa} 
          onChange={setTaxa} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxa} 
          suffix="%" 
        />
        <Input 
          label={t.labelPeriodo} 
          id="meses" 
          value={meses} 
          onChange={setMeses} 
          inputMode="numeric" 
          placeholder={t.placeholderPeriodo} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.montante) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemCapital, value: formatCurrency(result.capital) }, 
          { label: t.itemJuros, value: formatCurrency(result.juros), highlight: true }, 
          { label: t.itemTaxa, value: `${result.taxaMensal}%` }, 
          { label: t.itemPeriodo, value: `${result.meses} ${t.unitMeses}` }
        ] : []} 
      />
    </>
  )
}
