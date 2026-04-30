'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { validarCPF } from '@/lib/calculadoras/validador-cpf'

const I18N = {
  pt: {
    labelCpf: 'CPF',
    placeholder: '000.000.000-00',
    buttonCalcular: 'Validar',
    resultValido: 'CPF Válido',
    resultInvalido: 'CPF Inválido',
  },
  es: {
    labelCpf: 'CPF',
    placeholder: '000.000.000-00',
    buttonCalcular: 'Validar',
    resultValido: 'CPF Válido',
    resultInvalido: 'CPF Inválido',
  }
}

function maskCPFInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function ValidadorCPFForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [cpf, setCpf] = useState('')
  const [result, setResult] = useState<ReturnType<typeof validarCPF> | null>(null)

  function handleValidar() {
    setResult(validarCPF(cpf))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelCpf} 
          id="cpf" 
          value={cpf} 
          onChange={(v) => setCpf(maskCPFInput(v))} 
          inputMode="numeric" 
          placeholder={t.placeholder} 
        />
        <Button onClick={handleValidar} fullWidth disabled={cpf.replace(/\D/g, '').length !== 11}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <div className={`mt-6 rounded-xl p-6 text-white ${result.valido ? 'bg-green-600' : 'bg-red-600'}`} aria-live="polite">
          <p className="text-lg font-bold">{result.valido ? t.resultValido : t.resultInvalido}</p>
          <p className="mt-1 font-mono text-xl">{result.cpfFormatado}</p>
          <p className="mt-2 text-sm opacity-90">{result.motivo}</p>
        </div>
      )}
    </>
  )
}
