'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { formatarTempo } from '@/lib/calculadoras/cronometro'

export function CronometroForm() {
  const [elapsed, setElapsed] = useState(0)
  const [rodando, setRodando] = useState(false)
  const [voltas, setVoltas] = useState<{ numero: number; tempo: string; parcial: string }[]>([])
  const startTimeRef = useRef<number>(0)
  const elapsedAtPauseRef = useRef<number>(0)
  const lastVoltaRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  const tick = useCallback(() => {
    setElapsed(elapsedAtPauseRef.current + (Date.now() - startTimeRef.current))
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (rodando) {
      startTimeRef.current = Date.now()
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [rodando, tick])

  function handleIniciarPausar() {
    if (rodando) {
      elapsedAtPauseRef.current = elapsed
      setRodando(false)
    } else {
      setRodando(true)
    }
  }

  function handleZerar() {
    setRodando(false)
    setElapsed(0)
    elapsedAtPauseRef.current = 0
    lastVoltaRef.current = 0
    setVoltas([])
  }

  function handleVolta() {
    if (!rodando && elapsed === 0) return
    const parcialMs = elapsed - lastVoltaRef.current
    lastVoltaRef.current = elapsed
    setVoltas((prev) => [
      { numero: prev.length + 1, tempo: formatarTempo(elapsed), parcial: formatarTempo(parcialMs) },
      ...prev,
    ])
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <div className="text-center mb-8">
        <p className="font-mono text-6xl font-bold tracking-tight text-slate-800 dark:text-white" aria-live="off" role="timer">
          {formatarTempo(elapsed)}
        </p>
      </div>
      <div className="flex gap-3 mb-6">
        <button onClick={handleIniciarPausar} aria-label={rodando ? 'Pausar cronometro' : 'Iniciar cronometro'}
          className={`flex-1 rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${rodando ? 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300' : 'bg-accent text-white hover:bg-blue-600 focus:ring-blue-300'}`}>
          {rodando ? 'Pausar' : elapsed > 0 ? 'Continuar' : 'Iniciar'}
        </button>
        <button onClick={handleVolta} disabled={elapsed === 0} aria-label="Registrar volta"
          className="rounded-lg px-4 py-3 font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-gray-700 dark:text-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
          Volta
        </button>
        <button onClick={handleZerar} aria-label="Zerar cronometro"
          className="rounded-lg px-4 py-3 font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-gray-700 dark:text-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
          Zerar
        </button>
      </div>
      {voltas.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Voltas</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {voltas.map((v) => (
              <div key={v.numero} className="flex justify-between items-center rounded-lg bg-slate-50 dark:bg-gray-700 px-4 py-2.5 text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Volta {v.numero}</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">{v.parcial}</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-white">{v.tempo}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
