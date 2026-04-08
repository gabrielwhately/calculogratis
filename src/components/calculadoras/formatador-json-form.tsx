'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formatarJSON, minificarJSON } from '@/lib/calculadoras/formatador-json'

const acaoOptions = [
  { value: 'formatar', label: 'Formatar (Pretty Print)' },
  { value: 'minificar', label: 'Minificar' },
]

const espacosOptions = [
  { value: '2', label: '2 espacos' },
  { value: '4', label: '4 espacos' },
]

export function FormatadorJSONForm() {
  const [input, setInput] = useState('')
  const [acao, setAcao] = useState('formatar')
  const [espacos, setEspacos] = useState('2')
  const [resultado, setResultado] = useState<{ formatado: string; valido: boolean; erro?: string; linhas: number; tamanho: number } | null>(null)
  const [copiado, setCopiado] = useState(false)

  function handleProcessar() {
    if (!input.trim()) return
    const res = acao === 'minificar'
      ? minificarJSON(input)
      : formatarJSON(input, parseInt(espacos))
    setResultado(res)
    setCopiado(false)
  }

  function handleCopiar() {
    if (!resultado?.formatado) return
    navigator.clipboard.writeText(resultado.formatado)
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
        <div className="mb-4">
          <label htmlFor="json-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            JSON de entrada
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'{\n  "exemplo": "cole seu JSON aqui"\n}'}
            rows={8}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Select label="Acao" id="acao" value={acao} onChange={setAcao} options={acaoOptions} />
          </div>
          {acao === 'formatar' && (
            <div className="flex-1">
              <Select label="Espacos" id="espacos" value={espacos} onChange={setEspacos} options={espacosOptions} />
            </div>
          )}
        </div>
        <Button onClick={handleProcessar} fullWidth>Processar JSON</Button>
      </div>

      {resultado && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          {resultado.erro ? (
            <p className="text-red-400 text-sm font-mono">{resultado.erro}</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4 text-sm text-slate-300">
                  <span>{resultado.linhas} linhas</span>
                  <span>{formatarTamanho(resultado.tamanho)}</span>
                </div>
                <button
                  onClick={handleCopiar}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  {copiado ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <pre className="rounded-lg bg-navy-light p-4 font-mono text-sm overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap break-all">
                <code>{resultado.formatado}</code>
              </pre>
            </>
          )}
        </div>
      )}
    </>
  )
}
