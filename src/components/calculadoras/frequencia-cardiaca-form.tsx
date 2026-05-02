'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
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
      <FormCard>
        <Input label={t.labelIdade} id="idade" value={idade} onChange={(v) => setIdade(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderIdade} />
        <Input label={t.labelFCRepouso} id="fc" value={fcRepouso} onChange={(v) => setFcRepouso(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderFC} />
        <Button onClick={handleCalcular} fullWidth disabled={!idade || parseInt(idade) <= 0}>{t.btnCalcular}</Button>
      </FormCard>

      <ResultCard
        visible={result !== null}
        title={t.resTitle}
        mainValue={result ? `${result.fcMaxima}` : ''}
        mainLabel={`${t.resFCMaxima} (bpm)`}
      >
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="space-y-3">
            {result?.zonas.map((z, i) => {
              const colors = [
                'bg-blue-500/20 border-blue-500/30 text-blue-100', 
                'bg-green-500/20 border-green-500/30 text-green-100', 
                'bg-yellow-500/20 border-yellow-500/30 text-yellow-100', 
                'bg-orange-500/20 border-orange-500/30 text-orange-100', 
                'bg-red-500/20 border-red-500/30 text-red-100'
              ]
              return (
                <div key={i} className={`rounded-lg border p-3 ${colors[i]}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{z.nome}</span>
                    <span className="font-mono text-sm font-bold">{z.minBpm}–{z.maxBpm} bpm</span>
                  </div>
                  <p className="text-[10px] opacity-80 mt-1">{z.descricao}</p>
                </div>
              )
            })}
          </div>
        </div>
      </ResultCard>
    </>
  )
}
