'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { formatarTempo } from '@/lib/calculadoras/cronometro'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Button } from '@/components/ui/button'

const I18N = {
  pt: {
    btnPausar: 'Pausar',
    btnContinuar: 'Continuar',
    btnIniciar: 'Iniciar',
    btnVolta: 'Volta',
    btnZerar: 'Zerar',
    labelVoltas: 'Voltas',
    ariaPausar: 'Pausar cronômetro',
    ariaIniciar: 'Iniciar cronômetro',
    ariaVolta: 'Registrar volta',
    ariaZerar: 'Zerar cronômetro',
    resultTitle: 'Cronômetro',
    resultMainLabel: 'Tempo decorrido',
  },
  es: {
    btnPausar: 'Pausar',
    btnContinuar: 'Continuar',
    btnIniciar: 'Iniciar',
    btnVolta: 'Vuelta',
    btnZerar: 'Reiniciar',
    labelVoltas: 'Vueltas',
    ariaPausar: 'Pausar cronómetro',
    ariaIniciar: 'Iniciar cronómetro',
    ariaVolta: 'Registrar vuelta',
    ariaZerar: 'Reiniciar cronómetro',
    resultTitle: 'Cronómetro',
    resultMainLabel: 'Tiempo transcurrido',
  }
}

export function CronometroForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
    <>
      <FormCard>
        <div className="flex gap-3">
          <Button 
            onClick={handleIniciarPausar} 
            className="flex-1"
            variant={rodando ? 'warning' : 'default'}
          >
            {rodando ? t.btnPausar : elapsed > 0 ? t.btnContinuar : t.btnIniciar}
          </Button>
          <Button 
            onClick={handleVolta} 
            disabled={elapsed === 0}
            variant="outline"
          >
            {t.btnVolta}
          </Button>
          <Button 
            onClick={handleZerar}
            variant="outline"
          >
            {t.btnZerar}
          </Button>
        </div>
      </FormCard>

      <ResultCard
        visible={elapsed > 0 || rodando}
        title={t.resultTitle}
        mainValue={formatarTempo(elapsed)}
        mainLabel={t.resultMainLabel}
      >
        {voltas.length > 0 && (
          <div className="mt-6 border-t border-white/20 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{t.labelVoltas}</p>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {voltas.map((v) => (
                <div key={v.numero} className="flex justify-between items-center rounded-lg bg-white/5 px-4 py-2.5 text-sm">
                  <span className="text-slate-400 font-medium">{t.btnVolta} {v.numero}</span>
                  <span className="font-mono text-slate-400">{v.parcial}</span>
                  <span className="font-mono font-semibold text-white">{v.tempo}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </ResultCard>
    </>
  )
}
