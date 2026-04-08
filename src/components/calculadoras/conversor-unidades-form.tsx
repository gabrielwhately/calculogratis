'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { converterUnidade, getUnidades, getNomeUnidade } from '@/lib/calculadoras/conversor-unidades'

type Categoria = 'comprimento' | 'peso' | 'temperatura' | 'volume'

const CATEGORIAS = [
  { value: 'comprimento', label: 'Comprimento' },
  { value: 'peso', label: 'Peso / Massa' },
  { value: 'temperatura', label: 'Temperatura' },
  { value: 'volume', label: 'Volume' },
]

export function ConversorUnidadesForm() {
  const [categoria, setCategoria] = useState<Categoria>('comprimento')
  const [de, setDe] = useState('m')
  const [para, setPara] = useState('km')
  const [valor, setValor] = useState('')
  const [result, setResult] = useState<number | null>(null)

  function handleCategoriaChange(cat: string) {
    const newCat = cat as Categoria
    setCategoria(newCat)
    const unidades = getUnidades(newCat)
    setDe(unidades[0]?.value || '')
    setPara(unidades[1]?.value || '')
    setResult(null)
  }

  function handleCalcular() {
    const num = parseFloat(valor.replace(',', '.'))
    if (isNaN(num)) return
    setResult(converterUnidade(num, de, para, categoria))
  }

  const unidades = getUnidades(categoria)
  const isValid = valor.trim().length > 0 && !isNaN(parseFloat(valor.replace(',', '.')))

  function formatResult(n: number): string {
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-4 && n !== 0)) {
      return n.toExponential(6)
    }
    const s = parseFloat(n.toPrecision(10)).toString()
    return s
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select
          label="Categoria"
          id="categoria"
          value={categoria}
          onChange={handleCategoriaChange}
          options={CATEGORIAS}
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="De"
            id="de"
            value={de}
            onChange={(v) => { setDe(v); setResult(null) }}
            options={unidades}
          />
          <Select
            label="Para"
            id="para"
            value={para}
            onChange={(v) => { setPara(v); setResult(null) }}
            options={unidades}
          />
        </div>
        <Input
          label="Valor"
          id="valor"
          value={valor}
          onChange={(v) => { setValor(v); setResult(null) }}
          inputMode="decimal"
          placeholder="Ex: 100"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Converter</Button>
      </div>

      {result !== null && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300">Resultado da conversao</p>
          <p className="mt-1 text-3xl font-bold font-mono break-all">{formatResult(result)}</p>
          <p className="mt-1 text-slate-300 text-sm">{getNomeUnidade(para)}</p>
          <div className="mt-4 border-t border-white/20 pt-4 text-sm text-slate-300">
            {parseFloat(valor.replace(',', '.')).toLocaleString('pt-BR')} {getNomeUnidade(de)} = {formatResult(result)} {getNomeUnidade(para)}
          </div>
        </div>
      )}
    </>
  )
}
