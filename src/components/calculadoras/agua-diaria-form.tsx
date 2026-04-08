'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularAguaDiaria } from '@/lib/calculadoras/agua-diaria'
import { parseBRNumber } from '@/lib/formatters'

type NivelAtividade = 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso'

export function AguaDiariaForm() {
  const [peso, setPeso] = useState('')
  const [atividade, setAtividade] = useState<string>('sedentario')
  const [result, setResult] = useState<ReturnType<typeof calcularAguaDiaria> | null>(null)

  function handleCalcular() {
    setResult(calcularAguaDiaria(parseBRNumber(peso), atividade as NivelAtividade))
  }

  const isValid = parseBRNumber(peso) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Peso (kg)" id="peso" value={peso} onChange={(v) => setPeso(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 70" />
        <Select label="Nivel de atividade fisica" id="atividade" value={atividade} onChange={setAtividade} options={[
          { value: 'sedentario', label: 'Sedentario (pouca ou nenhuma atividade)' },
          { value: 'leve', label: 'Leve (exercicio 1-2x por semana)' },
          { value: 'moderado', label: 'Moderado (exercicio 3-5x por semana)' },
          { value: 'intenso', label: 'Intenso (exercicio 6-7x por semana)' },
          { value: 'muito_intenso', label: 'Muito intenso (atleta / trabalho fisico)' },
        ]} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Consumo de Agua Diario" mainValue={result ? `${result.litrosPorDia.toFixed(1)} litros` : ''} mainLabel="Agua recomendada por dia"
        items={result ? [
          { label: 'Total em ml', value: `${result.mlPorDia} ml` },
          { label: 'Total em litros', value: `${result.litrosPorDia.toFixed(1)} L` },
          { label: 'Copos de 250ml', value: `${result.coposPorDia} copos`, highlight: true },
          { label: 'Por refeicao (6x/dia)', value: `${result.mlPorRefeicao} ml` },
        ] : []} />
    </>
  )
}
