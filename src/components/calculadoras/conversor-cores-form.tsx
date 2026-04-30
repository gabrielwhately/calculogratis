'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
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

const I18N = {
  pt: {
    labelTipo: 'Tipo de entrada',
    labelValor: 'Valor da cor',
    btnConverter: 'Converter',
    invalidValue: 'Formato inválido. Verifique o valor informado.',
    resultTitle: 'Valores da cor',
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

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
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
      </div>

      {result && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <div
            className="w-full h-20 rounded-lg mb-4 border border-white/20"
            style={{ backgroundColor: result.hex }}
          />

          <p className="text-sm text-slate-300 mb-3">{t.resultTitle}</p>
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
            {['R', 'G', 'B', 'H', 'S', 'L'].map((label, idx) => {
              const values = [result.r, result.g, result.b, result.h, result.s, result.l]
              const suffix = idx === 3 ? '°' : (idx > 3 ? '%' : '')
              return (
                <div key={label} className="flex-1 text-center">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-lg font-bold">{values[idx]}{suffix}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
