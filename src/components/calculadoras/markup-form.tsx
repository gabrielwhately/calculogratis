'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularMarkup, calcularMarkupPorMargem, calcularMarkupPorPreco } from '@/lib/calculadoras/markup'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

export function MarkupForm() {
  const [modo, setModo] = useState('markup')
  const [custo, setCusto] = useState('')
  const [valor2, setValor2] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularMarkup> | null>(null)

  function handleCalcular() {
    const c = parseBRNumber(custo)
    const v = parseBRNumber(valor2)
    if (modo === 'markup') setResult(calcularMarkup(c, v))
    else if (modo === 'margem') setResult(calcularMarkupPorMargem(c, v))
    else setResult(calcularMarkupPorPreco(c, v))
  }

  const label2 = modo === 'markup' ? 'Markup (%)' : modo === 'margem' ? 'Margem de lucro desejada (%)' : 'Preco de venda (R$)'
  const isValid = parseBRNumber(custo) > 0 && parseBRNumber(valor2) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label="Modo de calculo" id="modo" value={modo} onChange={setModo} options={[
          { value: 'markup', label: 'Calcular preco a partir do markup' },
          { value: 'margem', label: 'Calcular preco a partir da margem de lucro' },
          { value: 'preco', label: 'Descobrir markup a partir do preco de venda' },
        ]} />
        <Input label="Custo do produto (R$)" id="custo" value={custo} onChange={(v) => setCusto(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 50,00" />
        <Input label={label2} id="valor2" value={valor2}
          onChange={(v) => setValor2(modo === 'preco' ? maskCurrency(v) : maskPercent(v))}
          inputMode="decimal" placeholder={modo === 'preco' ? 'Ex: 100,00' : 'Ex: 50'}
          suffix={modo === 'preco' ? undefined : '%'} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado do Markup" mainValue={result ? formatCurrency(result.precoVenda) : ''} mainLabel="Preco de venda"
        items={result ? [
          { label: 'Custo do produto', value: formatCurrency(result.custoProduto) },
          { label: 'Markup', value: `${result.markup.toFixed(2)}%` },
          { label: 'Margem de lucro', value: `${result.margemLucro.toFixed(2)}%` },
          { label: 'Lucro por unidade', value: formatCurrency(result.lucro), highlight: true },
        ] : []} />
    </>
  )
}
