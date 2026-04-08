'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function RealBitcoinForm() {
  const [valor, setValor] = useState('')
  const [cotacao, setCotacao] = useState('')
  const [direcao, setDirecao] = useState('real-btc')
  const [result, setResult] = useState<{ valorOriginal: number; taxa: number; valorConvertido: number } | null>(null)

  function handleCalcular() {
    const input = { valor: parseBRNumber(valor), taxa: parseBRNumber(cotacao) }
    if (direcao === 'real-btc') {
      setResult(converterMoeda(input))
    } else {
      setResult(converterMoedaInverso(input))
    }
  }

  const isValid = parseBRNumber(valor) > 0 && parseBRNumber(cotacao) > 0

  const labelValor = direcao === 'real-btc' ? 'Valor em Reais (R$)' : 'Valor em Bitcoin (BTC)'
  const labelResultado = direcao === 'real-btc' ? 'Valor em Bitcoin' : 'Valor em Reais'

  function formatBTC(v: number): string {
    return `BTC ${v.toLocaleString('pt-BR', { minimumFractionDigits: 8, maximumFractionDigits: 8 })}`
  }

  function formatResultado(v: number): string {
    if (direcao === 'real-btc') return formatBTC(v)
    return formatCurrency(v)
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label="Direcao da conversao" id="direcao" value={direcao} onChange={setDirecao} options={[
          { value: 'real-btc', label: 'Real para Bitcoin' },
          { value: 'btc-real', label: 'Bitcoin para Real' },
        ]} />
        <Input label={labelValor} id="valor" value={valor} onChange={(v) => setValor(direcao === 'real-btc' ? maskCurrency(v) : maskPercent(v))} inputMode="decimal" placeholder={direcao === 'real-btc' ? 'Ex: 1.000,00' : 'Ex: 0,005'} />
        <Input label="Cotacao do Bitcoin (R$)" id="cotacao" value={cotacao} onChange={(v) => setCotacao(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 500.000,00" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Converter</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado da Conversao" mainValue={result ? formatResultado(result.valorConvertido) : ''} mainLabel={labelResultado}
        items={result ? [
          { label: 'Valor original', value: direcao === 'real-btc' ? formatCurrency(result.valorOriginal) : formatBTC(result.valorOriginal) },
          { label: 'Cotacao utilizada', value: formatCurrency(result.taxa) },
          { label: labelResultado, value: formatResultado(result.valorConvertido), highlight: true },
        ] : []} />
    </>
  )
}
