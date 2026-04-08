'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularFrequenciaCardiaca } from '@/lib/calculadoras/frequencia-cardiaca'

export function FrequenciaCardiacaForm() {
  const [idade, setIdade] = useState('')
  const [fcRepouso, setFcRepouso] = useState('70')
  const [result, setResult] = useState<ReturnType<typeof calcularFrequenciaCardiaca> | null>(null)

  function handleCalcular() {
    setResult(calcularFrequenciaCardiaca(parseInt(idade) || 30, parseInt(fcRepouso) || 70))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Idade (anos)" id="idade" value={idade} onChange={(v) => setIdade(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 30" />
        <Input label="Frequencia cardiaca em repouso (bpm)" id="fc" value={fcRepouso} onChange={(v) => setFcRepouso(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 70" />
        <Button onClick={handleCalcular} fullWidth disabled={!idade || parseInt(idade) <= 0}>Calcular Zonas</Button>
      </div>
      {result && (
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm" aria-live="polite">
          <h3 className="text-lg font-bold text-navy dark:text-white mb-2">Resultado</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            FC Maxima: <strong className="text-navy dark:text-white">{result.fcMaxima} bpm</strong> (Tanaka)
          </p>
          <div className="space-y-3">
            {result.zonas.map((z, i) => {
              const colors = ['bg-blue-50 border-blue-200', 'bg-green-50 border-green-200', 'bg-yellow-50 border-yellow-200', 'bg-orange-50 border-orange-200', 'bg-red-50 border-red-200']
              return (
                <div key={i} className={`rounded-lg border p-3 ${colors[i]}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-navy">{z.nome}</span>
                    <span className="font-mono text-sm font-bold text-navy">{z.minBpm}–{z.maxBpm} bpm</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{z.descricao}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
