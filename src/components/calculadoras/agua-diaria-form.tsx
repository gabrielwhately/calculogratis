'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularAguaDiaria } from '@/lib/calculadoras/agua-diaria'
import { parseBRNumber } from '@/lib/formatters'

type NivelAtividade = 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso'

const I18N = {
  pt: {
    labelPeso: 'Peso (kg)',
    labelAtividade: 'Nível de atividade física',
    optSedentario: 'Sedentário (pouca ou nenhuma atividade)',
    optLeve: 'Leve (exercício 1-2x por semana)',
    optModerado: 'Moderado (exercício 3-5x por semana)',
    optIntenso: 'Intenso (exercício 6-7x por semana)',
    optMuitoIntenso: 'Muito intenso (atleta / trabalho físico)',
    placeholderPeso: 'Ex: 70',
    btnCalcular: 'Calcular',
    resTitle: 'Consumo de Água Diário',
    resMainLabel: 'Água recomendada por dia',
    resLitros: 'litros',
    resMl: 'ml',
    resCopos: 'copos',
    itemTotalMl: 'Total em ml',
    itemTotalLitros: 'Total em litros',
    itemCopos: 'Copos de 250ml',
    itemPorRefeicao: 'Por refeição (6x/dia)'
  },
  es: {
    labelPeso: 'Peso (kg)',
    labelAtividade: 'Nivel de actividad física',
    optSedentario: 'Sedentario (poca o ninguna actividad)',
    optLeve: 'Leve (ejercicio 1-2 veces por semana)',
    optModerado: 'Moderado (ejercicio 3-5 veces por semana)',
    optIntenso: 'Intenso (ejercicio 6-7 veces por semana)',
    optMuitoIntenso: 'Muy intenso (atleta / trabajo físico)',
    placeholderPeso: 'Ej: 70',
    btnCalcular: 'Calcular',
    resTitle: 'Consumo de Agua Diario',
    resMainLabel: 'Agua recomendada por día',
    resLitros: 'litros',
    resMl: 'ml',
    resCopos: 'vasos',
    itemTotalMl: 'Total en ml',
    itemTotalLitros: 'Total en litros',
    itemCopos: 'Vasos de 250ml',
    itemPorRefeicao: 'Por comida (6x/día)'
  }
}

export function AguaDiariaForm() {
  const pathname = usePathname()
  const t = pathname?.startsWith('/es') ? I18N.es : I18N.pt

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
        <Input label={t.labelPeso} id="peso" value={peso} onChange={(v) => setPeso(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder={t.placeholderPeso} />
        <Select label={t.labelAtividade} id="atividade" value={atividade} onChange={setAtividade} options={[
          { value: 'sedentario', label: t.optSedentario },
          { value: 'leve', label: t.optLeve },
          { value: 'moderado', label: t.optModerado },
          { value: 'intenso', label: t.optIntenso },
          { value: 'muito_intenso', label: t.optMuitoIntenso },
        ]} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </div>
      <ResultCard visible={result !== null} title={t.resTitle} mainValue={result ? `${result.litrosPorDia.toFixed(1)} ${t.resLitros}` : ''} mainLabel={t.resMainLabel}
        items={result ? [
          { label: t.itemTotalMl, value: `${result.mlPorDia} ${t.resMl}` },
          { label: t.itemTotalLitros, value: `${result.litrosPorDia.toFixed(1)} L` },
          { label: t.itemCopos, value: `${result.coposPorDia} ${t.resCopos}`, highlight: true },
          { label: t.itemPorRefeicao, value: `${result.mlPorRefeicao} ${t.resMl}` },
        ] : []} />
    </>
  )
}
