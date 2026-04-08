'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { converterCor } from '@/lib/calculadoras/conversor-cores'

type TipoCor = 'hex' | 'rgb' | 'hsl'

interface CorResult {
  hex: string
  r: number
  g: number
  b: number
  h: number
  s: number
  l: number
}

const PLACEHOLDERS: Record<TipoCor, string> = {
  hex: 'Ex: #FF5733 ou FF5733',
  rgb: 'Ex: 255, 87, 51',
  hsl: 'Ex: 14, 100, 60',
}

export function ConversorCoresForm() {
  const [tipo, setTipo] = useState<TipoCor>('hex')
  const [valor, setValor] = useState('')
  const [result, setResult] = useState<CorResult | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  function handleTipoChange(t: string) {
    setTipo(t as TipoCor)
    setValor('')
    setResult(null)
    setErro(null)
  }

  function handleCalcular() {
    if (!valor.trim()) return
    const res = converterCor(valor.trim(), tipo)
    if (!res) {
      setErro('Formato invalido. Verifique o valor informado.')
      setResult(null)
    } else {
      setErro(null)
      setResult(res)
    }
  }

  const isValid = valor.trim().length > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select
          label="Tipo de entrada"
          id="tipo"
          value={tipo}
          onChange={handleTipoChange}
          options={[
            { value: 'hex', label: 'HEX (Hexadecimal)' },
            { value: 'rgb', label: 'RGB' },
            { value: 'hsl', label: 'HSL' },
          ]}
        />
        <Input
          label="Valor da cor"
          id="valor"
          value={valor}
          onChange={(v) => { setValor(v); setErro(null); setResult(null) }}
          placeholder={PLACEHOLDERS[tipo]}
        />
        {erro && <p className="mb-3 text-sm text-red-500">{erro}</p>}
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Converter</Button>
      </div>

      {result && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          {/* Color preview */}
          <div
            className="w-full h-20 rounded-lg mb-4 border border-white/20"
            style={{ backgroundColor: result.hex }}
          />

          <p className="text-sm text-slate-300 mb-3">Valores da cor</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">HEX</span>
              <span className="font-mono font-bold text-lg uppercase">{result.hex}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">RGB</span>
              <span className="font-mono font-bold text-lg">rgb({result.r}, {result.g}, {result.b})</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">HSL</span>
              <span className="font-mono font-bold text-lg">hsl({result.h}, {result.s}%, {result.l}%)</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 border-t border-white/20 pt-4">
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">R</p>
              <p className="text-lg font-bold">{result.r}</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">G</p>
              <p className="text-lg font-bold">{result.g}</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">B</p>
              <p className="text-lg font-bold">{result.b}</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">H</p>
              <p className="text-lg font-bold">{result.h}&deg;</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">S</p>
              <p className="text-lg font-bold">{result.s}%</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-400">L</p>
              <p className="text-lg font-bold">{result.l}%</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
