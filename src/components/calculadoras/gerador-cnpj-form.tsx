'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { gerarCNPJ } from '@/lib/calculadoras/gerador-cnpj'

const I18N = {
  pt: {
    btnGerar: 'Gerar CNPJs',
    resTitle: 'CNPJs gerados (clique para copiar sem formatação)',
    footer: 'Números gerados aleatoriamente, válidos apenas para testes e desenvolvimento.',
  },
  es: {
    btnGerar: 'Generar CNPJs',
    resTitle: 'CNPJs generados (clic para copiar sin formato)',
    footer: 'Números generados aleatoriamente, válidos solo para pruebas y desarrollo.',
  }
}

export function GeradorCNPJForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [cnpjs, setCnpjs] = useState<string[]>([])

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Button onClick={() => setCnpjs(Array.from({ length: 5 }, () => gerarCNPJ()))} fullWidth>{t.btnGerar}</Button>
      </div>
      {cnpjs.length > 0 && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-3">{t.resTitle}</p>
          <div className="space-y-2">
            {cnpjs.map((cnpj, i) => (
              <button key={i} onClick={() => navigator.clipboard.writeText(cnpj.replace(/\D/g, ''))}
                className="block w-full rounded-lg bg-white/5 px-4 py-3 text-left font-mono text-lg hover:bg-white/10 transition-colors">{cnpj}</button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">{t.footer}</p>
        </div>
      )}
    </>
  )
}
