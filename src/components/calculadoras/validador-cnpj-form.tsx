'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { validarCNPJ } from '@/lib/calculadoras/validador-cnpj'

const I18N = {
  pt: {
    labelCnpj: 'CNPJ',
    placeholder: '00.000.000/0000-00',
    buttonCalcular: 'Validar',
    resultValido: 'CNPJ Válido',
    resultInvalido: 'CNPJ Inválido',
  },
  es: {
    labelCnpj: 'CNPJ',
    placeholder: '00.000.000/0000-00',
    buttonCalcular: 'Validar',
    resultValido: 'CNPJ Válido',
    resultInvalido: 'CNPJ Inválido',
  }
}

function maskCNPJInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

export function ValidadorCNPJForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [cnpj, setCnpj] = useState('')
  const [result, setResult] = useState<ReturnType<typeof validarCNPJ> | null>(null)

  function handleValidar() {
    setResult(validarCNPJ(cnpj))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelCnpj} 
          id="cnpj" 
          value={cnpj} 
          onChange={(v) => setCnpj(maskCNPJInput(v))} 
          inputMode="numeric" 
          placeholder={t.placeholder} 
        />
        <Button onClick={handleValidar} fullWidth disabled={cnpj.replace(/\D/g, '').length !== 14}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <div className={`mt-6 rounded-xl p-6 text-white ${result.valido ? 'bg-green-600' : 'bg-red-600'}`} aria-live="polite">
          <p className="text-lg font-bold">{result.valido ? t.resultValido : t.resultInvalido}</p>
          <p className="mt-1 font-mono text-xl">{result.cnpjFormatado}</p>
          <p className="mt-2 text-sm opacity-90">{result.motivo}</p>
        </div>
      )}
    </>
  )
}
