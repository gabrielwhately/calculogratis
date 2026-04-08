'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function RealDolarForm() {
  const [valor, setValor] = useState('')
  const [cotacao, setCotacao] = useState('')
  const [direcao, setDirecao] = useState('real-dolar')
  const [result, setResult] = useState<{ valorOriginal: number; taxa: number; valorConvertido: number } | null>(null)

  function handleCalcular() {
    const input = { valor: parseBRNumber(valor), taxa: parseBRNumber(cotacao) }
    if (direcao === 'real-dolar') {
      setResult(converterMoeda(input))
    } else {
      setResult(converterMoedaInverso(input))
    }
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(cotacao) > 0

  const labelValor = direcao === 'real-dolar' ? 'Valor em Reais (R$)' : 'Valor em Dolares (US$)'
  const labelResultado = direcao === 'real-dolar' ? 'Valor em Dolares' : 'Valor em Reais'
  const prefixo = direcao === 'real-dolar' ? 'US$' : 'R$'

  function formatResultado(v: number): string {
    return `${prefixo} ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label="Direcao da conversao" id="direcao" value={direcao} onChange={setDirecao} options={[
          { value: 'real-dolar', label: 'Real para Dolar' },
          { value: 'dolar-real', label: 'Dolar para Real' },
        ]} />
        <Input label={labelValor} id="valor" value={valor} onChange={(v) => setValor(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 1.000,00" />
        <Input label="Cotacao do Dolar (R$)" id="cotacao" value={cotacao} onChange={(v) => setCotacao(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 5,85" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Converter</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado da Conversao" mainValue={result ? formatResultado(result.valorConvertido) : ''} mainLabel={labelResultado}
        items={result ? [
          { label: 'Valor original', value: direcao === 'real-dolar' ? formatCurrency(result.valorOriginal) : `US$ ${result.valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Cotacao utilizada', value: `R$ ${result.taxa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}` },
          { label: labelResultado, value: formatResultado(result.valorConvertido), highlight: true },
        ] : []} />
    </>
  )
}
