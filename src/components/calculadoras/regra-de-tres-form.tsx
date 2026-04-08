'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { Select } from '@/components/ui/select'
import { calcularRegraDeTres } from '@/lib/calculadoras/regra-de-tres'
import { parseBRNumber } from '@/lib/formatters'

export function RegraDeTresForm() {
  const [tipo, setTipo] = useState<'direta' | 'inversa'>('direta')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularRegraDeTres> | null>(null)

  function handleCalcular() {
    setResult(calcularRegraDeTres(parseBRNumber(a), parseBRNumber(b), parseBRNumber(c), tipo))
  }

  const isValid = parseBRNumber(a) !== 0 && parseBRNumber(b) !== 0 && parseBRNumber(c) !== 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label="Tipo" id="tipo" value={tipo} onChange={(v) => { setTipo(v as 'direta' | 'inversa'); setResult(null) }} options={[{ value: 'direta', label: 'Diretamente proporcional' }, { value: 'inversa', label: 'Inversamente proporcional' }]} />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Input label="A" id="a" value={a} onChange={setA} inputMode="decimal" placeholder="Ex: 10" />
          <Input label="B" id="b" value={b} onChange={setB} inputMode="decimal" placeholder="Ex: 20" />
          <Input label="C" id="c" value={c} onChange={setC} inputMode="decimal" placeholder="Ex: 30" />
          <Input label="X (resultado)" id="x" value={result ? result.x.toFixed(4).replace('.', ',') : '?'} onChange={() => {}} inputMode="decimal" disabled />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {tipo === 'direta' ? 'A/B = C/X → X = (B × C) / A' : 'A × B = C × X → X = (A × B) / C'}
        </p>
        <div className="mt-4"><Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button></div>
      </div>
      <ResultCard visible={result !== null} title="Resultado" mainValue={result ? result.x.toLocaleString('pt-BR', { maximumFractionDigits: 4 }) : ''} mainLabel="Valor de X"
        items={result ? [{ label: 'A', value: result.a.toLocaleString('pt-BR') }, { label: 'B', value: result.b.toLocaleString('pt-BR') }, { label: 'C', value: result.c.toLocaleString('pt-BR') }, { label: 'X', value: result.x.toLocaleString('pt-BR', { maximumFractionDigits: 4 }), highlight: true }, { label: 'Tipo', value: result.tipo === 'direta' ? 'Diretamente proporcional' : 'Inversamente proporcional' }] : []} />
    </>
  )
}
