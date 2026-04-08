'use client'

import { useState } from 'react'
import { contarCaracteres } from '@/lib/calculadoras/contador-caracteres'

export function ContadorCaracteresForm() {
  const [texto, setTexto] = useState('')

  const result = contarCaracteres({ texto })

  const stats = [
    { label: 'Caracteres', value: result.caracteres },
    { label: 'Sem espacos', value: result.caracteresSemEspacos },
    { label: 'Palavras', value: result.palavras },
    { label: 'Frases', value: result.frases },
    { label: 'Paragrafos', value: result.paragrafos },
    { label: 'Linhas', value: result.linhas },
  ]

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="texto" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Digite ou cole seu texto
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Cole ou digite seu texto aqui..."
            rows={8}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-4 text-center text-white">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-slate-300 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  )
}
