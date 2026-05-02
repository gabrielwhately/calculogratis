'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
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

const I18N = {
  pt: {
    labelTipo: 'Tipo de entrada',
    labelValor: 'Valor da cor',
    btnConverter: 'Converter',
    invalidValue: 'Formato inválido. Verifique o valor informado.',
    resultTitle: 'Valores da cor',
    resultMainLabel: 'Visualização da Cor',
    hex: 'HEX (Hexadecimal)',
    rgb: 'RGB',
    hsl: 'HSL',
    placeholderHex: 'Ex: #FF5733 ou FF5733',
    placeholderRgb: 'Ex: 255, 87, 51',
    placeholderHsl: 'Ex: 14, 100, 60',
  },
  es: {
    labelTipo: 'Tipo de entrada',
    labelValor: 'Valor del color',
    btnConverter: 'Convertir',
    invalidValue: 'Formato inválido. Verifique el valor informado.',
    resultTitle: 'Valores del color',
    resultMainLabel: 'Vista previa del color',
    hex: 'HEX (Hexadecimal)',
    rgb: 'RGB',
    hsl: 'HSL',
    placeholderHex: 'Ej: #FF5733 o FF5733',
    placeholderRgb: 'Ej: 255, 87, 51',
    placeholderHsl: 'Ej: 14, 100, 60',
  }
}

export function ConversorCoresForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [tipo, setTipo] = useState<TipoCor>('hex')
  const [valor, setValor] = useState('')
  const [result, setResult] = useState<CorResult | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const placeholders: Record<TipoCor, string> = {
    hex: t.placeholderHex,
    rgb: t.placeholderRgb,
    hsl: t.placeholderHsl,
  }

  function handleTipoChange(v: string) {
    setTipo(v as TipoCor)
    setValor('')
    setResult(null)
    setErro(null)
  }

  function handleCalcular() {
    if (!valor.trim()) return
    const res = converterCor(valor.trim(), tipo)
    if (!res) {
      setErro(t.invalidValue)
      setResult(null)
    } else {
      setErro(null)
      setResult(res)
    }
  }

  const isValid = valor.trim().length > 0

  const resultItems = result ? [
    { label: 'HEX', value: result.hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${result.r}, ${result.g}, ${result.b})` },
    { label: 'HSL', value: `hsl(${result.h}, ${result.s}%, ${result.l}%)` },
  ] : []

  return (
    <>
      <FormCard>
        <Select
          label={t.labelTipo}
          id="tipo"
          value={tipo}
          onChange={handleTipoChange}
          options={[
            { value: 'hex', label: t.hex },
            { value: 'rgb', label: t.rgb },
            { value: 'hsl', label: t.hsl },
          ]}
        />
        <Input
          label={t.labelValor}
          id="valor"
          value={valor}
          onChange={(v) => { setValor(v); setErro(null); setResult(null) }}
          placeholder={placeholders[tipo]}
        />
        {erro && <p className="mb-3 text-sm text-red-500">{erro}</p>}
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnConverter}</Button>
      </FormCard>

      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result?.hex.toUpperCase() || ''}
        mainLabel={t.resultMainLabel}
        items={resultItems}
      >
        {result && (
          <>
            <div
              className="mt-4 w-full h-20 rounded-lg border border-white/20"
              style={{ backgroundColor: result.hex }}
            />
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2 border-t border-white/20 pt-4">
              {[
                { label: 'R', value: result.r },
                { label: 'G', value: result.g },
                { label: 'B', value: result.b },
                { label: 'H', value: `${result.h}°` },
                { label: 'S', value: `${result.s}%` },
                { label: 'L', value: `${result.l}%` },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </ResultCard>
    </>
  )
}
