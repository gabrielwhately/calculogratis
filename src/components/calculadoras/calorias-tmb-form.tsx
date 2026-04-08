'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ResultCard } from '@/components/ui/result-card'
import { calcularTMB } from '@/lib/calculadoras/calorias-tmb'

export function CaloriasTMBForm() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState<'masculino' | 'feminino'>('masculino')
  const [atividade, setAtividade] = useState('1.2')
  const [result, setResult] = useState<ReturnType<typeof calcularTMB> | null>(null)

  function handleCalcular() {
    const pesoNum = parseFloat(peso.replace(',', '.'))
    const alturaNum = parseFloat(altura.replace(',', '.'))
    const idadeNum = parseInt(idade) || 0
    if (!pesoNum || !alturaNum || !idadeNum) return
    setResult(calcularTMB({
      peso: pesoNum,
      altura: alturaNum,
      idade: idadeNum,
      sexo,
      atividade: parseFloat(atividade),
    }))
  }

  const isValid = !!peso && !!altura && parseInt(idade) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Peso (kg)" id="peso" value={peso} onChange={setPeso} inputMode="decimal" placeholder="Ex: 70" />
        <Input label="Altura (cm)" id="altura" value={altura} onChange={setAltura} inputMode="decimal" placeholder="Ex: 170" />
        <Input label="Idade (anos)" id="idade" value={idade} onChange={(v) => setIdade(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex: 30" />
        <Select
          label="Sexo"
          id="sexo"
          value={sexo}
          onChange={(v) => setSexo(v as 'masculino' | 'feminino')}
          options={[
            { value: 'masculino', label: 'Masculino' },
            { value: 'feminino', label: 'Feminino' },
          ]}
        />
        <Select
          label="Nível de atividade física"
          id="atividade"
          value={atividade}
          onChange={setAtividade}
          options={[
            { value: '1.2', label: 'Sedentário (pouco ou nenhum exercício)' },
            { value: '1.375', label: 'Levemente ativo (exercício 1-3x/sem)' },
            { value: '1.55', label: 'Moderadamente ativo (exercício 3-5x/sem)' },
            { value: '1.725', label: 'Muito ativo (exercício 6-7x/sem)' },
            { value: '1.9', label: 'Extremamente ativo (2x ao dia)' },
          ]}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Calorias</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Necessidade Calórica Diária"
        mainValue={result ? `${Math.round(result.necessidadeDiaria)} kcal` : ''}
        mainLabel="Calorias por dia para seu nível de atividade"
        items={result ? [
          { label: 'Sexo', value: result.sexo },
          { label: 'Nível de atividade', value: result.atividade },
          { label: 'TMB (Metabolismo Basal)', value: `${Math.round(result.tmb)} kcal`, highlight: true },
          { label: 'Necessidade diária total', value: `${Math.round(result.necessidadeDiaria)} kcal`, highlight: true },
        ] : []}
      />
    </>
  )
}
