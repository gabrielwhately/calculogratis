'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularCombustivel } from '@/lib/calculadoras/combustivel'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function CombustivelForm() {
  const [distancia, setDistancia] = useState('')
  const [consumo, setConsumo] = useState('')
  const [preco, setPreco] = useState('')
  const [pedagios, setPedagios] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularCombustivel> | null>(null)

  function handleCalcular() {
    setResult(calcularCombustivel({ distancia: parseBRNumber(distancia), consumo: parseBRNumber(consumo), precoCombustivel: parseBRNumber(preco), pedagios: parseBRNumber(pedagios) }))
  }

  const isValid = parseBRNumber(distancia) > 0 && parseBRNumber(consumo) > 0 && parseBRNumber(preco) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Distancia (km)" id="distancia" value={distancia} onChange={(v) => setDistancia(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 500" />
        <Input label="Consumo medio (km/l)" id="consumo" value={consumo} onChange={(v) => setConsumo(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 12" />
        <Input label="Preco do combustivel (R$/l)" id="preco" value={preco} onChange={(v) => setPreco(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 5,89" />
        <Input label="Pedagios (R$) - opcional" id="pedagios" value={pedagios} onChange={(v) => setPedagios(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 50,00" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Custo da Viagem" mainValue={result ? formatCurrency(result.custoTotal) : ''} mainLabel="Custo total estimado"
        items={result ? [
          { label: 'Distancia', value: `${result.distancia.toLocaleString('pt-BR')} km` },
          { label: 'Litros necessarios', value: `${result.litrosNecessarios.toFixed(1)} litros` },
          { label: 'Custo combustivel', value: formatCurrency(result.custoCombustivel) },
          ...(result.pedagios > 0 ? [{ label: 'Pedagios', value: formatCurrency(result.pedagios) }] : []),
          { label: 'Custo total', value: formatCurrency(result.custoTotal), highlight: true },
          { label: 'Custo por km', value: formatCurrency(result.custoPorKm) },
        ] : []} />
    </>
  )
}
