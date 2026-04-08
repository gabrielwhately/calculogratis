'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIdade } from '@/lib/calculadoras/calculadora-idade'
import { formatDate } from '@/lib/formatters'

export function CalculadoraIdadeForm() {
  const [dataNascimento, setDataNascimento] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIdade> | null>(null)

  function handleCalcular() {
    if (!dataNascimento) return
    const data = new Date(dataNascimento + 'T00:00:00')
    if (isNaN(data.getTime())) return
    setResult(calcularIdade(data))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="data-nascimento" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Data de nascimento
          </label>
          <input
            id="data-nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>
        <Button onClick={handleCalcular} fullWidth disabled={!dataNascimento}>
          Calcular Idade
        </Button>
      </div>

      <ResultCard
        visible={result !== null}
        title="Sua Idade"
        mainValue={result ? `${result.anos} anos` : ''}
        mainLabel={result ? `${result.meses} meses e ${result.dias} dias` : ''}
        items={result ? [
          { label: 'Anos completos', value: String(result.anos), highlight: true },
          { label: 'Meses completos', value: String(result.totalMeses) },
          { label: 'Semanas vividas', value: result.totalSemanas.toLocaleString('pt-BR') },
          { label: 'Dias vividos', value: result.totalDias.toLocaleString('pt-BR') },
          { label: 'Proximo aniversario', value: result ? formatDate(result.proximoAniversario) : '' },
          { label: 'Dias para aniversario', value: result ? `${result.diasParaAniversario} dias` : '', highlight: true },
        ] : []}
      />
    </>
  )
}
