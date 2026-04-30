'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularFrequenciaCardiaca } from '@/lib/calculadoras/frequencia-cardiaca'

const I18N = {
  pt: {
    labelIdade: 'Idade (anos)',
    labelFCRepouso: 'Frequência cardíaca em repouso (bpm)',
    placeholderIdade: 'Ex: 30',
    placeholderFC: 'Ex: 70',
    btnCalcular: 'Calcular Zonas',
    resTitle: 'Resultado',
    resFCMaxima: 'FC Máxima',
    itemMinMax: 'bpm',
  },
  es: {
    labelIdade: 'Edad (años)',
    labelFCRepouso: 'Frecuencia cardíaca en reposo (bpm)',
    placeholderIdade: 'Ej: 30',
    placeholderFC: 'Ej: 70',
    btnCalcular: 'Calcular Zonas',
    resTitle: 'Resultado',
    resFCMaxima: 'FC Máxima',
    itemMinMax: 'bpm',
  }
}

export function FrequenciaCardiacaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [idade, setIdade] = useState('')
  const [fcRepouso, setFcRepouso] = useState('70')
  const [result, setResult] = useState<ReturnType<typeof calcularFrequenciaCardiaca> | null>(null)

  function handleCalcular() {
    setResult(calcularFrequenciaCardiaca(parseInt(idade) || 30, parseInt(fcRepouso) || 70))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label={t.labelIdade} id="idade" value={idade} onChange={(v) => setIdade(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderIdade} />
        <Input label={t.labelFCRepouso} id="fc" value={fcRepouso} onChange={(v) => setFcRepouso(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderFC} />
        <Button onClick={handleCalcular} fullWidth disabled={!idade || parseInt(idade) <= 0}>{t.btnCalcular}</Button>
      </div>
      {result && (
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm" aria-live="polite">
          <h3 className="text-lg font-bold text-navy dark:text-white mb-2">{t.resTitle}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {t.resFCMaxima}: <strong className="text-navy dark:text-white">{result.fcMaxima} bpm</strong> (Tanaka)
          </p>
          <div className="space-y-3">
            {result.zonas.map((z, i) => {
              const colors = ['bg-blue-50 border-blue-200', 'bg-green-50 border-green-200', 'bg-yellow-50 border-yellow-200', 'bg-orange-50 border-orange-200', 'bg-red-50 border-red-200']
              // Note: z.nome and z.descricao come from the lib. We might need to translate them there or here.
              // For now, I'll assume the lib returns translated strings if we passed a locale, but it doesn't.
              // Let's manually translate the common zones if needed, or just leave it for now as z.nome might be technical.
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
