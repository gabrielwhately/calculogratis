'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { validarCNPJ } from '@/lib/calculadoras/validador-cnpj'

function maskCNPJInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

export function ValidadorCNPJForm() {
  const [cnpj, setCnpj] = useState('')
  const [result, setResult] = useState<ReturnType<typeof validarCNPJ> | null>(null)

  function handleValidar() {
    setResult(validarCNPJ(cnpj))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="CNPJ" id="cnpj" value={cnpj} onChange={(v) => setCnpj(maskCNPJInput(v))} inputMode="numeric" placeholder="00.000.000/0000-00" />
        <Button onClick={handleValidar} fullWidth disabled={cnpj.replace(/\D/g, '').length !== 14}>Validar</Button>
      </div>
      {result && (
        <div className={`mt-6 rounded-xl p-6 text-white ${result.valido ? 'bg-green-600' : 'bg-red-600'}`} aria-live="polite">
          <p className="text-lg font-bold">{result.valido ? 'CNPJ Valido' : 'CNPJ Invalido'}</p>
          <p className="mt-1 font-mono text-xl">{result.cnpjFormatado}</p>
          <p className="mt-2 text-sm opacity-90">{result.motivo}</p>
        </div>
      )}
    </>
  )
}
