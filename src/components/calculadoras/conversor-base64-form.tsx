'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { encodeBase64, decodeBase64 } from '@/lib/calculadoras/conversor-base64'

const modoOptions = [
  { value: 'encode', label: 'Codificar (Texto → Base64)' },
  { value: 'decode', label: 'Decodificar (Base64 → Texto)' },
]

export function ConversorBase64Form() {
  const [input, setInput] = useState('')
  const [modo, setModo] = useState('encode')
  const [resultado, setResultado] = useState<{ output: string; valido: boolean; erro?: string; tamanhoOriginal: number; tamanhoConvertido: number } | null>(null)
  const [copiado, setCopiado] = useState(false)

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
        <Select label="Modo" id="modo" value={modo} onChange={(v) => { setModo(v); setResultado(null) }} options={modoOptions} />
        <div className="mb-4">
          <label htmlFor="base64-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {modo === 'encode' ? 'Texto de entrada' : 'Base64 de entrada'}
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={modo === 'encode' ? 'Digite ou cole o texto aqui...' : 'Cole o codigo Base64 aqui...'}
            rows={6}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
        <Button onClick={handleConverter} fullWidth>
          {modo === 'encode' ? 'Codificar em Base64' : 'Decodificar Base64'}
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
                  <span>Entrada: {formatarTamanho(resultado.tamanhoOriginal)}</span>
                  <span>Saida: {formatarTamanho(resultado.tamanhoConvertido)}</span>
                </div>
                <button
                  onClick={handleCopiar}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  {copiado ? 'Copiado!' : 'Copiar'}
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
