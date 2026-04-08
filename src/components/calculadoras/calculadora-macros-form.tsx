'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'
import { parseBRNumber } from '@/lib/formatters'

export function CalculadoraMacrosForm() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState('masculino')
  const [atividade, setAtividade] = useState('moderado')
  const [objetivo, setObjetivo] = useState('manter')
  const [result, setResult] = useState<ReturnType<typeof calcularMacros> | null>(null)

  function handleCalcular() {
    setResult(calcularMacros(
      parseBRNumber(peso),
      parseBRNumber(altura),
      parseInt(idade) || 25,
      sexo as 'masculino' | 'feminino',
      atividade as 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso',
      objetivo as 'emagrecer' | 'manter' | 'ganhar_massa',
    ))
  }

  const isValid = parseBRNumber(peso) > 0 && parseBRNumber(altura) > 0 && parseInt(idade) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Peso (kg)" id="peso" value={peso} onChange={(v) => setPeso(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 70" />
        <Input label="Altura (cm)" id="altura" value={altura} onChange={(v) => setAltura(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 175" />
        <Input label="Idade (anos)" id="idade" value={idade} onChange={(v) => setIdade(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 30" />
        <Select label="Sexo" id="sexo" value={sexo} onChange={setSexo} options={[
          { value: 'masculino', label: 'Masculino' },
          { value: 'feminino', label: 'Feminino' },
        ]} />
        <Select label="Nivel de atividade" id="atividade" value={atividade} onChange={setAtividade} options={[
          { value: 'sedentario', label: 'Sedentario' },
          { value: 'leve', label: 'Leve (1-2x/semana)' },
          { value: 'moderado', label: 'Moderado (3-5x/semana)' },
          { value: 'intenso', label: 'Intenso (6-7x/semana)' },
          { value: 'muito_intenso', label: 'Muito intenso (atleta)' },
        ]} />
        <Select label="Objetivo" id="objetivo" value={objetivo} onChange={setObjetivo} options={[
          { value: 'emagrecer', label: 'Emagrecer (deficit calorico)' },
          { value: 'manter', label: 'Manter peso' },
          { value: 'ganhar_massa', label: 'Ganhar massa muscular' },
        ]} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Macros</Button>
      </div>
      <ResultCard visible={result !== null} title="Macronutrientes Diarios" mainValue={result ? `${result.caloriasTotal} kcal` : ''} mainLabel="Calorias diarias recomendadas"
        items={result ? [
          { label: 'Proteinas', value: `${result.proteinas.gramas}g (${result.proteinas.percentual}%)`, highlight: true },
          { label: 'Carboidratos', value: `${result.carboidratos.gramas}g (${result.carboidratos.percentual}%)`, highlight: true },
          { label: 'Gorduras', value: `${result.gorduras.gramas}g (${result.gorduras.percentual}%)`, highlight: true },
          { label: 'Calorias proteina', value: `${result.proteinas.calorias} kcal` },
          { label: 'Calorias carboidrato', value: `${result.carboidratos.calorias} kcal` },
          { label: 'Calorias gordura', value: `${result.gorduras.calorias} kcal` },
        ] : []} />
    </>
  )
}
