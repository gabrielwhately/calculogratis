'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { gerarCPF } from '@/lib/calculadoras/gerador-cpf'

export function GeradorCPFForm() {
  const [cpfs, setCpfs] = useState<string[]>([])

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Button onClick={() => setCpfs(Array.from({ length: 5 }, () => gerarCPF()))} fullWidth>Gerar CPFs</Button>
      </div>
      {cpfs.length > 0 && (
        <div className="mt-6 rounded-xl bg-navy p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-3">CPFs gerados (clique para copiar sem formatacao)</p>
          <div className="space-y-2">
            {cpfs.map((cpf, i) => (
              <button key={i} onClick={() => navigator.clipboard.writeText(cpf.replace(/\D/g, ''))}
                className="block w-full rounded-lg bg-navy-light px-4 py-3 text-left font-mono text-lg hover:bg-white/10 transition-colors">{cpf}</button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Numeros gerados aleatoriamente, validos apenas para testes e desenvolvimento.</p>
        </div>
      )}
    </>
  )
}
