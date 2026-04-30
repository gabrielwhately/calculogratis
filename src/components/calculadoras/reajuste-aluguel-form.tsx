'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularReajusteAluguel } from '@/lib/calculadoras/reajuste-aluguel'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor atual do aluguel (R$)',
    labelIndice: 'Índice de reajuste',
    labelTaxa: 'Taxa de reajuste (%)',
    placeholderValor: 'Ex: 2.000,00',
    placeholderTaxa: 'Ex: 4,50',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado do Reajuste',
    resultMainLabel: 'Novo valor do aluguel',
    itemValorAtual: 'Valor atual',
    itemIndice: 'Índice aplicado',
    itemDiferenca: 'Diferença',
    options: [
      { value: 'igpm', label: 'IGP-M' },
      { value: 'ipca', label: 'IPCA' },
      { value: 'personalizado', label: 'Personalizado' },
    ]
  },
  es: {
    labelValor: 'Valor actual del alquiler',
    labelIndice: 'Índice de reajuste',
    labelTaxa: 'Tasa de reajuste (%)',
    placeholderValor: 'Ej: 2.000,00',
    placeholderTaxa: 'Ej: 4,50',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado del Reajuste',
    resultMainLabel: 'Nuevo valor del alquiler',
    itemValorAtual: 'Valor actual',
    itemIndice: 'Índice aplicado',
    itemDiferenca: 'Diferencia',
    options: [
      { value: 'igpm', label: 'IGP-M' },
      { value: 'ipca', label: 'IPCA' },
      { value: 'personalizado', label: 'Personalizado' },
    ]
  }
}

export function ReajusteAluguelForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valorAtual, setValorAtual] = useState('')
  const [indice, setIndice] = useState('personalizado')
  const [taxa, setTaxa] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularReajusteAluguel> | null>(null)

  function handleIndiceChange(value: string) {
    setIndice(value)
    if (value === 'igpm') setTaxa('3,89')
    else if (value === 'ipca') setTaxa('4,50')
    else setTaxa('')
  }

  function handleCalcular() {
    setResult(calcularReajusteAluguel({
      valorAtual: parseBRNumber(valorAtual),
      indicePercent: parseBRNumber(taxa),
    }))
  }

  const isValid = parseBRNumber(valorAtual) > 0 && parseBRNumber(taxa) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelValor} 
          id="valorAtual" 
          value={valorAtual} 
          onChange={(v) => setValorAtual(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
        />
        <Select 
          label={t.labelIndice} 
          id="indice" 
          value={indice} 
          onChange={handleIndiceChange} 
          options={t.options} 
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
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.valorReajustado) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemValorAtual, value: formatCurrency(result.valorAtual) },
          { label: t.itemIndice, value: `${result.indicePercent.toFixed(2)}%` },
          { label: t.itemDiferenca, value: `+ ${formatCurrency(result.diferenca)}`, highlight: true },
        ] : []} 
      />
    </>
  )
}
