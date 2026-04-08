'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { converterFuso, FUSOS } from '@/lib/calculadoras/fuso-horario'

const fusoOptions = FUSOS.map((f) => ({ value: f.value, label: f.label }))

export function FusoHorarioForm() {
  const [hora, setHora] = useState('')
  const [fusoOrigem, setFusoOrigem] = useState('America/Sao_Paulo')
  const [fusoDestino, setFusoDestino] = useState('Europe/London')
  const [result, setResult] = useState<ReturnType<typeof converterFuso> | null>(null)

  function handleConverter() {
    if (!hora || !/^\d{2}:\d{2}$/.test(hora)) return
    setResult(converterFuso(hora, fusoOrigem, fusoDestino))
  }

  const origemLabel = FUSOS.find((f) => f.value === fusoOrigem)?.label ?? fusoOrigem
  const destinoLabel = FUSOS.find((f) => f.value === fusoDestino)?.label ?? fusoDestino

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="hora-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Hora (formato HH:MM)
          </label>
          <input
            id="hora-input"
            type="text"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            placeholder="Ex: 14:30"
            maxLength={5}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>
        <Select
          label="Fuso de origem"
          id="fuso-origem"
          value={fusoOrigem}
          onChange={setFusoOrigem}
          options={fusoOptions}
        />
        <Select
          label="Fuso de destino"
          id="fuso-destino"
          value={fusoDestino}
          onChange={setFusoDestino}
          options={fusoOptions}
        />
        <Button onClick={handleConverter} fullWidth disabled={!hora}>
          Converter Horario
        </Button>
      </div>

      {result && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-4">Resultado da conversao</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{result.horaOrigem}</p>
              <p className="text-xs text-slate-300 mt-1 truncate">{origemLabel.split('(')[0].trim()}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{result.horaDestino}</p>
              <p className="text-xs text-slate-300 mt-1 truncate">{destinoLabel.split('(')[0].trim()}</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 flex justify-between text-sm">
            <span className="text-slate-300">Diferenca de fuso</span>
            <span className="font-semibold">{result.diferenca}</span>
          </div>
        </div>
      )}
    </>
  )
}
