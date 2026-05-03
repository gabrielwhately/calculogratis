'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { validarCPF } from '@/lib/calculadoras/validador-cpf'

const I18N = {
  pt: {
    labelCpf: 'CPF',
    placeholder: '000.000.000-00',
    buttonCalcular: 'Validar',
    resultTitle: 'Validação de CPF',
    resultValido: 'CPF Válido',
    resultInvalido: 'CPF Inválido',
    itemStatus: 'Status',
    itemFormatado: 'Número formatado',
  },
  es: {
    labelCpf: 'CPF',
    placeholder: '000.000.000-00',
    buttonCalcular: 'Validar',
    resultTitle: 'Validación de CPF',
    resultValido: 'CPF Válido',
    resultInvalido: 'CPF Inválido',
    itemStatus: 'Estado',
    itemFormatado: 'Número formateado',
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
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? (result.valido ? t.resultValido : t.resultInvalido) : ''}
        mainLabel={t.itemStatus}
        items={result ? [
          { label: t.itemFormatado, value: result.cpfFormatado },
          { label: t.itemStatus, value: result.valido ? 'OK' : 'ERR', highlight: true }
        ] : []}
      >
        {result && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className={`text-sm font-medium ${result.valido ? 'text-green-400' : 'text-red-400'}`}>
              {result.motivo}
            </p>
          </div>
        )}
      </ResultCard>
    </>
  )
}
