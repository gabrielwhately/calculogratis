'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { encodeBase64, decodeBase64 } from '@/lib/calculadoras/conversor-base64'

const I18N = {
  pt: {
    labelModo: 'Modo',
    modoEncode: 'Codificar (Texto → Base64)',
    modoDecode: 'Decodificar (Base64 → Texto)',
    labelInputEncode: 'Texto de entrada',
    labelInputDecode: 'Base64 de entrada',
    placeholderEncode: 'Digite ou cole o texto aqui...',
    placeholderDecode: 'Cole o código Base64 aqui...',
    btnEncode: 'Codificar em Base64',
    btnDecode: 'Decodificar Base64',
    labelEntrada: 'Entrada',
    labelSaida: 'Saída',
    btnCopiar: 'Copiar',
    btnCopiado: 'Copiado!',
  },
  es: {
    labelModo: 'Modo',
    modoEncode: 'Codificar (Texto → Base64)',
    modoDecode: 'Decodificar (Base64 → Texto)',
    labelInputEncode: 'Texto de entrada',
    labelInputDecode: 'Base64 de entrada',
    placeholderEncode: 'Escribe o pega el texto aquí...',
    placeholderDecode: 'Pega el código Base64 aquí...',
    btnEncode: 'Codificar en Base64',
    btnDecode: 'Decodificar Base64',
    labelEntrada: 'Entrada',
    labelSaida: 'Salida',
    btnCopiar: 'Copiar',
    btnCopiado: '¡Copiado!',
  }
}

export function ConversorBase64Form() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [input, setInput] = useState('')
  const [modo, setModo] = useState('encode')
  const [resultado, setResultado] = useState<{ output: string; valido: boolean; erro?: string; tamanhoOriginal: number; tamanhoConvertido: number } | null>(null)
  const [copiado, setCopiado] = useState(false)

  const modoOptions = [
    { value: 'encode', label: t.modoEncode },
    { value: 'decode', label: t.modoDecode },
  ]

  function handleConverter() {
    if (!input.trim()) return
    const res = modo === 'encode' ? encodeBase64(input) : decodeBase64(input)
    setResultado(res)
    setCopiado(false)
  }

  function handleCopiar() {
    if (!resultado?.output) return
    navigator.clipboard.writeText(resultado.output)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }

  function formatarTamanho(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label={t.labelModo} id="modo" value={modo} onChange={(v) => { setModo(v); setResultado(null) }} options={modoOptions} />
        <div className="mb-4">
          <label htmlFor="base64-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {modo === 'encode' ? t.labelInputEncode : t.labelInputDecode}
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={modo === 'encode' ? t.placeholderEncode : t.placeholderDecode}
            rows={6}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
        <Button onClick={handleConverter} fullWidth>
          {modo === 'encode' ? t.btnEncode : t.btnDecode}
        </Button>
      </div>

      {resultado && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          {resultado.erro ? (
            <p className="text-red-400 text-sm">{resultado.erro}</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4 text-sm text-slate-300">
                  <span>{t.labelEntrada}: {formatarTamanho(resultado.tamanhoOriginal)}</span>
                  <span>{t.labelSaida}: {formatarTamanho(resultado.tamanhoConvertido)}</span>
                </div>
                <button
                  onClick={handleCopiar}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  {copiado ? t.btnCopiado : t.btnCopiar}
                </button>
              </div>
              <textarea
                readOnly
                value={resultado.output}
                rows={6}
                className="w-full rounded-lg bg-navy-light px-4 py-3 font-mono text-sm text-white resize-y outline-none"
              />
            </>
          )}
        </div>
      )}
    </>
  )
}
