'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { gerarCNPJ } from '@/lib/calculadoras/gerador-cnpj'

const I18N = {
  pt: {
    btnGerar: 'Gerar CNPJs',
    resTitle: 'CNPJs gerados',
    copyHint: 'clique para copiar',
    footer: 'Números gerados aleatoriamente, válidos apenas para testes e desenvolvimento.',
    labelCopiado: 'Copiado!',
  },
  es: {
    btnGerar: 'Generar CNPJs',
    resTitle: 'CNPJs generados',
    copyHint: 'clic para copiar',
    footer: 'Números generados aleatoriamente, válidos solo para pruebas y desarrollo.',
    labelCopiado: '¡Copiado!',
  }
}

export function GeradorCNPJForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [cnpjs, setCnpjs] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  function handleGerar() {
    setCnpjs(Array.from({ length: 5 }, () => gerarCNPJ()))
    setCopiedIndex(null)
  }

  function handleCopiar(cnpj: string, index: number) {
    navigator.clipboard.writeText(cnpj.replace(/\D/g, ''))
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <>
      <FormCard>
        <Button onClick={handleGerar} fullWidth>{t.btnGerar}</Button>
      </FormCard>

      <ResultCard
        visible={cnpjs.length > 0}
        title={t.resTitle}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 space-y-2 pt-4 border-t border-white/20">
          {cnpjs.map((cnpj, i) => (
            <button
              key={i}
              onClick={() => handleCopiar(cnpj, i)}
              className="block w-full rounded-lg bg-white/10 px-4 py-3 text-left font-mono text-sm hover:bg-white/20 transition-all relative border border-white/5 active:scale-[0.99]"
            >
              {cnpj}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-normal italic">
                {copiedIndex === i ? t.labelCopiado : t.copyHint}
              </span>
            </button>
          ))}
          <p className="mt-4 text-center text-xs text-slate-400">{t.footer}</p>
        </div>
      </ResultCard>
    </>
  )
}
