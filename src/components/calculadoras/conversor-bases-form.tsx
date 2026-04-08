'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { converterBases } from '@/lib/calculadoras/conversor-bases'

type Base = 2 | 8 | 10 | 16

interface ResultadoBases {
  decimal: string
  binario: string
  octal: string
  hexadecimal: string
}

export function ConversorBasesForm() {
  const [valor, setValor] = useState('')
  const [base, setBase] = useState<string>('10')
  const [result, setResult] = useState<ResultadoBases | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  function handleCalcular() {
    if (!valor.trim()) return
    const baseNum = parseInt(base) as Base
    const chars: Record<Base, RegExp> = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^\d+$/,
      16: /^[0-9a-fA-F]+$/,
    }
    if (!chars[baseNum].test(valor.trim())) {
      setErro(`Valor invalido para base ${base}`)
      setResult(null)
      return
    }
    setErro(null)
    setResult(converterBases(valor.trim(), baseNum))
  }

  const isValid = valor.trim().length > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select
          label="Base de origem"
          id="base"
          value={base}
          onChange={setBase}
          options={[
            { value: '2', label: 'Binario (Base 2)' },
            { value: '8', label: 'Octal (Base 8)' },
            { value: '10', label: 'Decimal (Base 10)' },
            { value: '16', label: 'Hexadecimal (Base 16)' },
          ]}
        />
        <Input
          label="Valor"
          id="valor"
          value={valor}
          onChange={(v) => { setValor(v); setErro(null); setResult(null) }}
          placeholder={base === '2' ? 'Ex: 1010' : base === '8' ? 'Ex: 17' : base === '16' ? 'Ex: FF' : 'Ex: 255'}
        />
        {erro && <p className="mb-3 text-sm text-red-500">{erro}</p>}
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Converter</Button>
      </div>

      {result && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-4">Resultado da conversao</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">Decimal (Base 10)</span>
              <span className="font-mono font-bold text-lg">{result.decimal}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">Binario (Base 2)</span>
              <span className="font-mono font-bold text-lg break-all text-right max-w-[60%]">{result.binario}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">Octal (Base 8)</span>
              <span className="font-mono font-bold text-lg">{result.octal}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
              <span className="text-slate-300 text-sm">Hexadecimal (Base 16)</span>
              <span className="font-mono font-bold text-lg">{result.hexadecimal}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
