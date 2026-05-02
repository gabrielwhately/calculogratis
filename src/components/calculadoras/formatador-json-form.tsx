'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { formatarJSON, minificarJSON } from '@/lib/calculadoras/formatador-json'

const I18N = {
  pt: {
    labelInput: 'JSON de entrada',
    placeholder: '{\n  "exemplo": "cole seu JSON aqui"\n}',
    labelAcao: 'Ação',
    labelEspacos: 'Espaços',
    btnProcessar: 'Processar JSON',
    itemLinhas: 'linhas',
    btnCopiar: 'Copiar',
    btnCopiado: 'Copiado!',
    acaoOptions: [
      { value: 'formatar', label: 'Formatar (Pretty Print)' },
      { value: 'minificar', label: 'Minificar' },
    ],
    espacosOptions: [
      { value: '2', label: '2 espaços' },
      { value: '4', label: '4 espaços' },
    ]
  },
  es: {
    labelInput: 'JSON de entrada',
    placeholder: '{\n  "ejemplo": "pegue su JSON aquí"\n}',
    labelAcao: 'Acción',
    labelEspacos: 'Espacios',
    btnProcessar: 'Procesar JSON',
    itemLinhas: 'líneas',
    btnCopiar: 'Copiar',
    btnCopiado: '¡Copiado!',
    acaoOptions: [
      { value: 'formatar', label: 'Formatear (Pretty Print)' },
      { value: 'minificar', label: 'Minificar' },
    ],
    espacosOptions: [
      { value: '2', label: '2 espacios' },
      { value: '4', label: '4 espacios' },
    ]
  }
}

export function FormatadorJSONForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      <FormCard>
        <div className="mb-4">
          <label htmlFor="json-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelInput}
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            rows={8}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Select label={t.labelAcao} id="acao" value={acao} onChange={setAcao} options={t.acaoOptions} />
          </div>
          {acao === 'formatar' && (
            <div className="flex-1">
              <Select label={t.labelEspacos} id="espacos" value={espacos} onChange={setEspacos} options={t.espacosOptions} />
            </div>
          )}
        </div>
        <Button onClick={handleProcessar} fullWidth>{t.btnProcessar}</Button>
      </FormCard>

      <ResultCard
        visible={!!resultado}
        title={t.btnProcessar}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 pt-4 border-t border-white/20">
          {resultado?.erro ? (
            <p className="text-red-400 text-sm font-mono">{resultado.erro}</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4 text-xs text-slate-300">
                  <span className="px-2 py-1 rounded bg-white/10">{resultado?.linhas} {t.itemLinhas}</span>
                  <span className="px-2 py-1 rounded bg-white/10">{resultado ? formatarTamanho(resultado.tamanho) : ''}</span>
                </div>
                <button
                  onClick={handleCopiar}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition-colors border border-white/10"
                >
                  {copiado ? t.btnCopiado : t.btnCopiar}
                </button>
              </div>
              <pre className="rounded-lg bg-black/20 p-4 font-mono text-xs sm:text-sm overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap break-all shadow-inner border border-white/5">
                <code>{resultado?.formatado}</code>
              </pre>
            </>
          )}
        </div>
      </ResultCard>
    </>
  )
}
