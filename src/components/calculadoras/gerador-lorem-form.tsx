'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { gerarLorem } from '@/lib/calculadoras/gerador-lorem'

const I18N = {
  pt: {
    labelTipo: 'Tipo',
    tipoOptions: [
      { value: 'paragrafos', label: 'Parágrafos' },
      { value: 'frases', label: 'Frases' },
      { value: 'palavras', label: 'Palavras' },
    ],
    labelQuantidade: 'Quantidade',
    buttonCalcular: 'Gerar Lorem Ipsum',
    labelPalavras: 'palavras',
    labelCaracteres: 'caracteres',
    buttonCopiar: 'Copiar',
    buttonCopiado: 'Copiado!',
  },
  es: {
    labelTipo: 'Tipo',
    tipoOptions: [
      { value: 'paragrafos', label: 'Párrafos' },
      { value: 'frases', label: 'Frases' },
      { value: 'palavras', label: 'Palabras' },
    ],
    labelQuantidade: 'Cantidad',
    buttonCalcular: 'Generar Lorem Ipsum',
    labelPalavras: 'palabras',
    labelCaracteres: 'caracteres',
    buttonCopiar: 'Copiar',
    buttonCopiado: '¡Copiado!',
  }
}

export function GeradorLoremForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      <FormCard>
        <Select
          label={t.labelTipo}
          id="tipo"
          value={tipo}
          onChange={(v) => setTipo(v as 'paragrafos' | 'frases' | 'palavras')}
          options={t.tipoOptions}
        />
        <Input
          label={t.labelQuantidade}
          id="quantidade"
          type="number"
          value={quantidade}
          onChange={setQuantidade}
          inputMode="numeric"
          placeholder="3"
        />
        <Button onClick={handleGerar} fullWidth>
          {t.buttonCalcular}
        </Button>
      </FormCard>

      {resultado && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-4 text-sm text-slate-300">
              <span>{resultado.palavras} {t.labelPalavras}</span>
              <span>{resultado.caracteres} {t.labelCaracteres}</span>
            </div>
            <button
              onClick={handleCopiar}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              {copiado ? t.buttonCopiado : t.buttonCopiar}
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
