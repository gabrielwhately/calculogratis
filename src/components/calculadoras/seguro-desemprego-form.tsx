'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSeguroDesemprego } from '@/lib/calculadoras/seguro-desemprego'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

const SOLICITACOES_OPTIONS = [
  { value: '1', label: '1ª solicitação' },
  { value: '2', label: '2ª solicitação' },
  { value: '3', label: '3ª solicitação ou mais' },
]

export function SeguroDesempregoForm() {
  const [sal1, setSal1] = useState('')
  const [sal2, setSal2] = useState('')
  const [sal3, setSal3] = useState('')
  const [solicitacoes, setSolicitacoes] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularSeguroDesemprego> | null>(null)

  const sal1Num = parseBRNumber(sal1)
  const sal2Num = parseBRNumber(sal2)
  const sal3Num = parseBRNumber(sal3)

  function handleCalcular() {
    setResult(calcularSeguroDesemprego({ salarios: [sal1Num, sal2Num, sal3Num], solicitacoes: parseInt(solicitacoes) || 1 }))
  }

  return (
    <>
      <FormCard>
        <Input label="Último salário (R$)" id="sal1" value={sal1} onChange={setSal1} inputMode="decimal" placeholder="Ex: 2.500,00" />
        <Input label="Penúltimo salário (R$)" id="sal2" value={sal2} onChange={setSal2} inputMode="decimal" placeholder="Ex: 2.400,00" />
        <Input label="Antepenúltimo salário (R$)" id="sal3" value={sal3} onChange={setSal3} inputMode="decimal" placeholder="Ex: 2.300,00" />
        <Select label="Número de solicitações" id="solicitacoes" value={solicitacoes} onChange={setSolicitacoes} options={SOLICITACOES_OPTIONS} />
        <Button onClick={handleCalcular} fullWidth disabled={sal1Num <= 0 || sal2Num <= 0 || sal3Num <= 0}>Calcular</Button>
      </FormCard>
      <ResultCard visible={result !== null} title="Seguro Desemprego" mainValue={result ? formatCurrency(result.valorParcela) : ''} mainLabel="Valor de cada parcela"
        items={result ? [{ label: 'Media salarial', value: formatCurrency(result.mediaSalarial) }, { label: 'Numero de parcelas', value: `${result.numeroParcelas} parcelas` }, { label: 'Valor total', value: formatCurrency(result.valorTotal), highlight: true }] : []} />
    </>
  )
}
