'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularEmprestimo } from '@/lib/calculadoras/emprestimo'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor do empréstimo (R$)',
    labelTaxa: 'Taxa de juros mensal (%)',
    labelParcelas: 'Número de parcelas',
    placeholderValor: 'Ex: 10.000,00',
    placeholderTaxa: 'Ex: 1,99',
    placeholderParcelas: 'Ex: 24',
    buttonSimular: 'Simular',
    resultTitle: 'Simulação de Empréstimo',
    resultMainLabel: 'Valor da parcela',
    itemValor: 'Valor emprestado',
    itemTaxa: 'Taxa mensal',
    itemParcelas: 'Parcelas',
    itemTotal: 'Total pago',
    itemJuros: 'Total de juros',
    itemCet: 'CET anual estimado',
  },
  es: {
    labelValor: 'Valor del préstamo',
    labelTaxa: 'Tasa de interés mensual (%)',
    labelParcelas: 'Número de cuotas',
    placeholderValor: 'Ej: 10.000,00',
    placeholderTaxa: 'Ej: 1,99',
    placeholderParcelas: 'Ej: 24',
    buttonSimular: 'Simular',
    resultTitle: 'Simulación de Préstamo',
    resultMainLabel: 'Valor de la cuota',
    itemValor: 'Valor prestado',
    itemTaxa: 'Tasa mensual',
    itemParcelas: 'Cuotas',
    itemTotal: 'Total pagado',
    itemJuros: 'Total de intereses',
    itemCet: 'CET anual estimado',
  }
}

export function EmprestimoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [taxa, setTaxa] = useState('')
  const [parcelas, setParcelas] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularEmprestimo> | null>(null)

  function handleCalcular() {
    setResult(calcularEmprestimo({ 
      valor: parseBRNumber(valor), 
      taxaMensal: parseBRNumber(taxa), 
      parcelas: parseInt(parcelas) || 0 
    }))
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(taxa) > 0 && parseInt(parcelas) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelValor} 
          id="valor" 
          value={valor} 
          onChange={(v) => setValor(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
        />
        <Input 
          label={t.labelTaxa} 
          id="taxa" 
          value={taxa} 
          onChange={(v) => setTaxa(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxa} 
          suffix="%" 
        />
        <Input 
          label={t.labelParcelas} 
          id="parcelas" 
          value={parcelas} 
          onChange={(v) => setParcelas(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderParcelas} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonSimular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.valorParcela) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValor, value: formatCurrency(result.valorEmprestimo) },
          { label: t.itemTaxa, value: `${result.taxaMensal}%` },
          { label: t.itemParcelas, value: `${result.parcelas}x` },
          { label: t.resultMainLabel, value: formatCurrency(result.valorParcela) },
          { label: t.itemTotal, value: formatCurrency(result.totalPago) },
          { label: t.itemJuros, value: formatCurrency(result.totalJuros), highlight: true },
          { label: t.itemCet, value: `${result.cet.toFixed(2)}%` },
        ] : []} 
      />
    </>
  )
}
