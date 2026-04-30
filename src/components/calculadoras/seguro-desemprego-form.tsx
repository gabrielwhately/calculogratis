'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSeguroDesemprego } from '@/lib/calculadoras/seguro-desemprego'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSal1: 'Último salário (R$)',
    labelSal2: 'Penúltimo salário (R$)',
    labelSal3: 'Antepenúltimo salário (R$)',
    labelSolicitacoes: 'Número de solicitações',
    placeholderSal: 'Ex: 2.500,00',
    options: [
      { value: '1', label: '1ª solicitação' },
      { value: '2', label: '2ª solicitação' },
      { value: '3', label: '3ª solicitação ou mais' },
    ],
    buttonCalcular: 'Calcular',
    resultTitle: 'Seguro Desemprego',
    resultMainLabel: 'Valor de cada parcela',
    itemMedia: 'Média salarial',
    itemParcelasLabel: 'Número de parcelas',
    itemTotal: 'Valor total',
    unitParcelas: 'parcelas',
  },
  es: {
    labelSal1: 'Último salario',
    labelSal2: 'Penúltimo salario',
    labelSal3: 'Antepenúltimo salario',
    labelSolicitacoes: 'Número de solicitudes',
    placeholderSal: 'Ej: 2.500,00',
    options: [
      { value: '1', label: '1ª solicitud' },
      { value: '2', label: '2ª solicitud' },
      { value: '3', label: '3ª solicitud o más' },
    ],
    buttonCalcular: 'Calcular',
    resultTitle: 'Seguro de Desempleo',
    resultMainLabel: 'Valor de cada cuota',
    itemMedia: 'Promedio salarial',
    itemParcelasLabel: 'Número de cuotas',
    itemTotal: 'Valor total',
    unitParcelas: 'cuotas',
  }
}

export function SeguroDesempregoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [sal1, setSal1] = useState('')
  const [sal2, setSal2] = useState('')
  const [sal3, setSal3] = useState('')
  const [solicitacoes, setSolicitacoes] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularSeguroDesemprego> | null>(null)

  const sal1Num = parseBRNumber(sal1)
  const sal2Num = parseBRNumber(sal2)
  const sal3Num = parseBRNumber(sal3)

  function handleCalcular() {
    setResult(calcularSeguroDesemprego({ 
      salarios: [sal1Num, sal2Num, sal3Num], 
      solicitacoes: parseInt(solicitacoes) || 1 
    }))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelSal1} 
          id="sal1" 
          value={sal1} 
          onChange={setSal1} 
          inputMode="decimal" 
          placeholder={t.placeholderSal} 
        />
        <Input 
          label={t.labelSal2} 
          id="sal2" 
          value={sal2} 
          onChange={setSal2} 
          inputMode="decimal" 
          placeholder={t.placeholderSal} 
        />
        <Input 
          label={t.labelSal3} 
          id="sal3" 
          value={sal3} 
          onChange={setSal3} 
          inputMode="decimal" 
          placeholder={t.placeholderSal} 
        />
        <Select 
          label={t.labelSolicitacoes} 
          id="solicitacoes" 
          value={solicitacoes} 
          onChange={setSolicitacoes} 
          options={t.options} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={sal1Num <= 0 || sal2Num <= 0 || sal3Num <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.valorParcela) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemMedia, value: formatCurrency(result.mediaSalarial) }, 
          { label: t.itemParcelasLabel, value: `${result.numeroParcelas} ${t.unitParcelas}` }, 
          { label: t.itemTotal, value: formatCurrency(result.valorTotal), highlight: true }
        ] : []} 
      />
    </>
  )
}
