'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSeguroDesemprego } from '@/lib/calculadoras/seguro-desemprego'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

export function SeguroDesempregoForm() {
  const [sal1, setSal1] = useState('')
  const [sal2, setSal2] = useState('')
  const [sal3, setSal3] = useState('')
  const [solicitacoes, setSolicitacoes] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularSeguroDesemprego> | null>(null)

  function handleCalcular() {
    setResult(calcularSeguroDesemprego({ salarios: [parseBRNumber(sal1), parseBRNumber(sal2), parseBRNumber(sal3)], solicitacoes: parseInt(solicitacoes) || 1 }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Ultimo salario (R$)" id="sal1" value={sal1} onChange={setSal1} inputMode="decimal" placeholder="Ex: 2.500,00" />
        <Input label="Penultimo salario (R$)" id="sal2" value={sal2} onChange={setSal2} inputMode="decimal" placeholder="Ex: 2.400,00" />
        <Input label="Antepenultimo salario (R$)" id="sal3" value={sal3} onChange={setSal3} inputMode="decimal" placeholder="Ex: 2.300,00" />
        <Select label="Numero de solicitacoes" id="solicitacoes" value={solicitacoes} onChange={setSolicitacoes} options={[
          { value: '1', label: '1a solicitacao' }, { value: '2', label: '2a solicitacao' }, { value: '3', label: '3a solicitacao ou mais' }]} />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(sal1) <= 0 || parseBRNumber(sal2) <= 0 || parseBRNumber(sal3) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Seguro Desemprego" mainValue={result ? formatCurrency(result.valorParcela) : ''} mainLabel="Valor de cada parcela"
        items={result ? [{ label: 'Media salarial', value: formatCurrency(result.mediaSalarial) }, { label: 'Numero de parcelas', value: `${result.numeroParcelas} parcelas` }, { label: 'Valor total', value: formatCurrency(result.valorTotal), highlight: true }] : []} />
    </>
  )
}
