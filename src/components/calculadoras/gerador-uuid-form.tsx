'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
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
    buttonGerar: 'Gerar UUIDs',
    resultTitle: 'UUIDs gerados (clique para copiar)',
    labelCopiado: 'Copiado!',
    footerNote: 'UUIDs v4 gerados aleatoriamente usando crypto.randomUUID().',
  },
  es: {
    labelQuantidade: 'Cantidad',
    quantidadeOptions: [
      { value: '1', label: '1 UUID' },
      { value: '5', label: '5 UUIDs' },
      { value: '10', label: '10 UUIDs' },
      { value: '20', label: '20 UUIDs' },
    ],
    buttonGerar: 'Generar UUIDs',
    resultTitle: 'UUIDs generados (haga clic para copiar)',
    labelCopiado: '¡Copiado!',
    footerNote: 'UUIDs v4 generados aleatoriamente usando crypto.randomUUID().',
  }
}

export function GeradorUUIDForm() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/es') ? 'es' : 'pt'
  const t = I18N[locale]

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
        <Select label={t.labelQuantidade} id="quantidade" value={quantidade} onChange={setQuantidade} options={t.quantidadeOptions} />
        <Button onClick={handleGerar} fullWidth>{t.buttonGerar}</Button>
      </FormCard>

      <ResultCard
        visible={uuids.length > 0}
        title={t.resultTitle}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 space-y-2 pt-4 border-t border-white/20">
          {uuids.map((uuid, i) => (
            <button
              key={i}
              onClick={() => handleCopiar(uuid, i)}
              className="block w-full rounded-lg bg-white/10 px-4 py-3 text-left font-mono text-sm hover:bg-white/20 transition-all relative border border-white/5 active:scale-[0.99]"
            >
              {uuid}
              {copiedIndex === i && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-400 font-bold">{t.labelCopiado}</span>
              )}
            </button>
          ))}
          <p className="mt-4 text-center text-xs text-slate-400">{t.footerNote}</p>
        </div>
      </ResultCard>
    </>
  )
}
