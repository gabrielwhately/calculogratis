'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { gerarMultiplosUUID } from '@/lib/calculadoras/gerador-uuid'

const I18N = {
  pt: {
    labelQuantidade: 'Quantidade',
    quantidadeOptions: [
      { value: '1', label: '1 UUID' },
      { value: '5', label: '5 UUIDs' },
      { value: '10', label: '10 UUIDs' },
      { value: '20', label: '20 UUIDs' },
    ],
    buttonCalcular: 'Gerar UUIDs',
    resultTitle: 'UUIDs gerados (clique para copiar)',
    buttonCopiado: 'Copiado!',
    footer: 'UUIDs v4 gerados aleatoriamente usando crypto.randomUUID().',
  },
  es: {
    labelQuantidade: 'Cantidad',
    quantidadeOptions: [
      { value: '1', label: '1 UUID' },
      { value: '5', label: '5 UUIDs' },
      { value: '10', label: '10 UUIDs' },
      { value: '20', label: '20 UUIDs' },
    ],
    buttonCalcular: 'Generar UUIDs',
    resultTitle: 'UUIDs generados (clic para copiar)',
    buttonCopiado: '¡Copiado!',
    footer: 'UUIDs v4 generados aleatoriamente usando crypto.randomUUID().',
  }
}

export function GeradorUUIDForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [quantidade, setQuantidade] = useState('5')
  const [uuids, setUuids] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  function handleGerar() {
    setUuids(gerarMultiplosUUID(parseInt(quantidade)))
    setCopiedIndex(null)
  }

  function handleCopiar(uuid: string, index: number) {
    navigator.clipboard.writeText(uuid)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <>
      <FormCard>
        <Select 
          label={t.labelQuantidade} 
          id="quantidade" 
          value={quantidade} 
          onChange={setQuantidade} 
          options={t.quantidadeOptions} 
        />
        <Button onClick={handleGerar} fullWidth>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {uuids.length > 0 && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-3">{t.resultTitle}</p>
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <button
                key={i}
                onClick={() => handleCopiar(uuid, i)}
                className="block w-full rounded-lg bg-navy-light px-4 py-3 text-left font-mono text-sm hover:bg-white/10 transition-colors relative"
              >
                {uuid}
                {copiedIndex === i && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-400">{t.buttonCopiado}</span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">{t.footer}</p>
        </div>
      )}
    </>
  )
}
