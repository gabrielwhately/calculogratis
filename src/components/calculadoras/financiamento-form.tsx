'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularFinanciamentoPrice, calcularFinanciamentoSAC } from '@/lib/calculadoras/financiamento'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

type Sistema = 'price' | 'sac'

export function FinanciamentoForm() {
  const [valor, setValor] = useState('')
  const [entrada, setEntrada] = useState('')
  const [taxa, setTaxa] = useState('')
  const [prazo, setPrazo] = useState('')
  const [sistema, setSistema] = useState<Sistema>('price')
  const [result, setResult] = useState<ReturnType<typeof calcularFinanciamentoPrice> | null>(null)

  function handleCalcular() {
    const input = { valorImovel: parseBRNumber(valor), entrada: parseBRNumber(entrada), taxaAnual: parseBRNumber(taxa), prazoMeses: parseInt(prazo) || 0 }
    setResult(sistema === 'price' ? calcularFinanciamentoPrice(input) : calcularFinanciamentoSAC(input))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(prazo) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex rounded-lg bg-slate-100 p-1">
          <button onClick={() => { setSistema('price'); setResult(null) }} className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${sistema === 'price' ? 'bg-white text-navy shadow-sm' : 'text-slate-600'}`}>Tabela Price</button>
          <button onClick={() => { setSistema('sac'); setResult(null) }} className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${sistema === 'sac' ? 'bg-white text-navy shadow-sm' : 'text-slate-600'}`}>Tabela SAC</button>
        </div>
        <Input label="Valor do imovel (R$)" id="valor" value={valor} onChange={setValor} inputMode="decimal" placeholder="Ex: 300.000,00" />
        <Input label="Entrada (R$)" id="entrada" value={entrada} onChange={setEntrada} inputMode="decimal" placeholder="Ex: 60.000,00" />
        <Input label="Taxa anual (%)" id="taxa" value={taxa} onChange={setTaxa} inputMode="decimal" placeholder="Ex: 10,5" suffix="% a.a." />
        <Input label="Prazo (meses)" id="prazo" value={prazo} onChange={setPrazo} inputMode="numeric" placeholder="Ex: 360" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Simular</Button>
      </div>
      <ResultCard visible={result !== null} title={`Financiamento ${sistema === 'price' ? 'Price' : 'SAC'}`} mainValue={result ? formatCurrency(result.parcela) : ''} mainLabel={sistema === 'price' ? 'Parcela fixa' : 'Primeira parcela'}
        items={result ? [{ label: 'Valor financiado', value: formatCurrency(result.valorFinanciado) }, { label: 'Total de juros', value: formatCurrency(result.totalJuros), highlight: true }, { label: 'Total pago', value: formatCurrency(result.totalPago) },
          ...(sistema === 'sac' && result.parcelas.length > 0 ? [{ label: 'Ultima parcela', value: formatCurrency(result.parcelas[result.parcelas.length - 1].parcela) }] : [])] : []} />
    </>
  )
}
