'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { gerarCPF } from '@/lib/calculadoras/gerador-cpf'

const I18N = {
  pt: {
    btnGerar: 'Gerar CPFs',
    resTitle: 'CPFs gerados',
    copyHint: 'clique para copiar',
    footer: 'Números gerados aleatoriamente, válidos apenas para testes e desenvolvimento.',
    labelCopiado: 'Copiado!',
  },
  es: {
    btnGerar: 'Generar CPFs',
    resTitle: 'CPFs generados',
    copyHint: 'clic para copiar',
    footer: 'Números generados aleatoriamente, válidos solo para pruebas y desarrollo.',
    labelCopiado: '¡Copiado!',
  }
}

export function GeradorCPFForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [cpfs, setCpfs] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  function handleGerar() {
    setCpfs(Array.from({ length: 5 }, () => gerarCPF()))
    setCopiedIndex(null)
  }

  function handleCopiar(cpf: string, index: number) {
    navigator.clipboard.writeText(cpf.replace(/\D/g, ''))
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <>
      <FormCard>
        <Button onClick={handleGerar} fullWidth>{t.btnGerar}</Button>
      </FormCard>

      <ResultCard
        visible={cpfs.length > 0}
        title={t.resTitle}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 space-y-2 pt-4 border-t border-white/20">
          {cpfs.map((cpf, i) => (
            <button
              key={i}
              onClick={() => handleCopiar(cpf, i)}
              className="block w-full rounded-lg bg-white/10 px-4 py-3 text-left font-mono text-sm hover:bg-white/20 transition-all relative border border-white/5 active:scale-[0.99]"
            >
              {cpf}
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
