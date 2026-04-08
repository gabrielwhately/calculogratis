'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPesoIdeal } from '@/lib/calculadoras/peso-ideal'

export function PesoIdealForm() {
  const [altura, setAltura] = useState('')
  const [sexo, setSexo] = useState<'masculino' | 'feminino'>('masculino')
  const [result, setResult] = useState<ReturnType<typeof calcularPesoIdeal> | null>(null)

  function handleCalcular() {
    const alturaNum = parseFloat(altura.replace(',', '.'))
    if (!alturaNum || alturaNum <= 0) return
    setResult(calcularPesoIdeal({ altura: alturaNum, sexo }))
  }

  const isValid = !!altura && parseFloat(altura.replace(',', '.')) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Altura (cm)" id="altura" value={altura} onChange={setAltura} inputMode="decimal" placeholder="Ex: 170" />
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
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Peso Ideal</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Peso Ideal"
        mainValue={result ? `${result.pesoMinimo.toFixed(1)} – ${result.pesoMaximo.toFixed(1)} kg` : ''}
        mainLabel="Faixa de peso saudável (IMC 18,5 – 24,9)"
        items={result ? [
          { label: 'Altura informada', value: `${result.altura} cm` },
          { label: 'IMC mínimo saudável', value: `${result.imcMinimo}` },
          { label: 'IMC máximo saudável', value: `${result.imcMaximo}` },
          { label: 'Peso mínimo (IMC 18,5)', value: `${result.pesoMinimo.toFixed(1)} kg` },
          { label: 'Peso máximo (IMC 24,9)', value: `${result.pesoMaximo.toFixed(1)} kg`, highlight: true },
          { label: 'Fórmula Devine', value: `${result.pesoIdealDevine.toFixed(1)} kg` },
          { label: 'Fórmula Robinson', value: `${result.pesoIdealRobinson.toFixed(1)} kg` },
          { label: 'Fórmula Miller', value: `${result.pesoIdealMiller.toFixed(1)} kg` },
        ] : []}
      />
    </>
  )
}
