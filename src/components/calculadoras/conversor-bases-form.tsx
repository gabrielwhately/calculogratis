'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { converterBases } from '@/lib/calculadoras/conversor-bases'

type Base = 2 | 8 | 10 | 16

interface ResultadoBases {
  decimal: string
  binario: string
  octal: string
  hexadecimal: string
}

const I18N = {
  pt: {
    labelBase: 'Base de origem',
    labelValor: 'Valor',
    btnConverter: 'Converter',
    resultTitle: 'Resultado da conversão',
    resultMainLabel: 'Valor na base selecionada',
    invalidValue: 'Valor inválido para base',
    base2: 'Binário (Base 2)',
    base8: 'Octal (Base 8)',
    base10: 'Decimal (Base 10)',
    base16: 'Hexadecimal (Base 16)',
  },
  es: {
    labelBase: 'Base de origen',
    labelValor: 'Valor',
    btnConverter: 'Convertir',
    resultTitle: 'Resultado de la conversión',
    resultMainLabel: 'Valor en la base seleccionada',
    invalidValue: 'Valor inválido para base',
    base2: 'Binario (Base 2)',
    base8: 'Octal (Base 8)',
    base10: 'Decimal (Base 10)',
    base16: 'Hexadecimal (Base 16)',
  }
}

export function ConversorBasesForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      setErro(`${t.invalidValue} ${base}`)
      setResult(null)
      return
    }
    setErro(null)
    setResult(converterBases(valor.trim(), baseNum))
  }

  const isValid = valor.trim().length > 0

  const resultItems = result ? [
    { label: t.base10, value: result.decimal },
    { label: t.base2, value: result.binario },
    { label: t.base8, value: result.octal },
    { label: t.base16, value: result.hexadecimal },
  ] : []

  return (
    <>
      <FormCard>
        <Select
          label={t.labelBase}
          id="base"
          value={base}
          onChange={setBase}
          options={[
            { value: '2', label: t.base2 },
            { value: '8', label: t.base8 },
            { value: '10', label: t.base10 },
            { value: '16', label: t.base16 },
          ]}
        />
        <Input
          label={t.labelValor}
          id="valor"
          value={valor}
          onChange={(v) => { setValor(v); setErro(null); setResult(null) }}
          placeholder={base === '2' ? 'Ex: 1010' : base === '8' ? 'Ex: 17' : base === '16' ? 'Ex: FF' : 'Ex: 255'}
        />
        {erro && <p className="mb-3 text-sm text-red-500">{erro}</p>}
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnConverter}</Button>
      </FormCard>

      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={valor}
        mainLabel={t.resultMainLabel}
        items={resultItems}
      />
    </>
  )
}
