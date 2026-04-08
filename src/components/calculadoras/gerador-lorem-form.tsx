'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { gerarLorem } from '@/lib/calculadoras/gerador-lorem'

const tipoOptions = [
  { value: 'paragrafos', label: 'Paragrafos' },
  { value: 'frases', label: 'Frases' },
  { value: 'palavras', label: 'Palavras' },
]

export function GeradorLoremForm() {
  const [tipo, setTipo] = useState<'paragrafos' | 'frases' | 'palavras'>('paragrafos')
  const [quantidade, setQuantidade] = useState('3')
  const [resultado, setResultado] = useState<{ texto: string; palavras: number; caracteres: number } | null>(null)
  const [copiado, setCopiado] = useState(false)

  function handleGerar() {
    const qtd = Math.max(1, Math.min(50, parseInt(quantidade) || 1))
    const res = gerarLorem(tipo, qtd)
    setResultado(res)
    setCopiado(false)
  }

  function handleCopiar() {
    if (!resultado?.texto) return
    navigator.clipboard.writeText(resultado.texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select
          label="Tipo"
          id="tipo"
          value={tipo}
          onChange={(v) => setTipo(v as 'paragrafos' | 'frases' | 'palavras')}
          options={tipoOptions}
        />
        <Input
          label="Quantidade"
          id="quantidade"
          type="number"
          value={quantidade}
          onChange={setQuantidade}
          inputMode="numeric"
          placeholder="3"
        />
        <Button onClick={handleGerar} fullWidth>Gerar Lorem Ipsum</Button>
      </div>

      {resultado && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-4 text-sm text-slate-300">
              <span>{resultado.palavras} palavras</span>
              <span>{resultado.caracteres} caracteres</span>
            </div>
            <button
              onClick={handleCopiar}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              {copiado ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="rounded-lg bg-navy-light px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap">
            {resultado.texto}
          </div>
        </div>
      )}
    </>
  )
}
