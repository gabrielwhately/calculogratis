'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'
import { parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelPeso: 'Peso (kg)',
    labelAltura: 'Altura (cm)',
    labelIdade: 'Idade (anos)',
    labelSexo: 'Sexo',
    labelAtividade: 'Nível de atividade',
    labelObjetivo: 'Objetivo',
    placeholderPeso: 'Ex: 70',
    placeholderAltura: 'Ex: 175',
    placeholderIdade: 'Ex: 30',
    btnCalcular: 'Calcular Macros',
    resTitle: 'Macronutrientes Diários',
    resMainLabel: 'Calorias diárias recomendadas',
    itemProteinas: 'Proteínas',
    itemCarboidratos: 'Carboidratos',
    itemGorduras: 'Gorduras',
    itemCalProteina: 'Calorias proteína',
    itemCalCarboidrato: 'Calorias carboidrato',
    itemCalGordura: 'Calorias gordura',
    sexoOptions: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Feminino' },
    ],
    atividadeOptions: [
      { value: 'sedentario', label: 'Sedentário' },
      { value: 'leve', label: 'Leve (1-2x/semana)' },
      { value: 'moderado', label: 'Moderado (3-5x/semana)' },
      { value: 'intenso', label: 'Intenso (6-7x/semana)' },
      { value: 'muito_intenso', label: 'Muito intenso (atleta)' },
    ],
    objetivoOptions: [
      { value: 'emagrecer', label: 'Emagrecer (déficit calórico)' },
      { value: 'manter', label: 'Manter peso' },
      { value: 'ganhar_massa', label: 'Ganhar massa muscular' },
    ]
  },
  es: {
    labelPeso: 'Peso (kg)',
    labelAltura: 'Altura (cm)',
    labelIdade: 'Edad (años)',
    labelSexo: 'Sexo',
    labelAtividade: 'Nivel de actividad',
    labelObjetivo: 'Objetivo',
    placeholderPeso: 'Ej: 70',
    placeholderAltura: 'Ej: 175',
    placeholderIdade: 'Ej: 30',
    btnCalcular: 'Calcular Macros',
    resTitle: 'Macronutrientes Diarios',
    resMainLabel: 'Calorías diarias recomendadas',
    itemProteinas: 'Proteínas',
    itemCarboidratos: 'Carbohidratos',
    itemGorduras: 'Grasas',
    itemCalProteina: 'Calorías proteína',
    itemCalCarboidrato: 'Calorías carbohidrato',
    itemCalGordura: 'Calorías grasa',
    sexoOptions: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Femenino' },
    ],
    atividadeOptions: [
      { value: 'sedentario', label: 'Sedentario' },
      { value: 'leve', label: 'Leve (1-2x/semana)' },
      { value: 'moderado', label: 'Moderado (3-5x/semana)' },
      { value: 'intenso', label: 'Intenso (6-7x/semana)' },
      { value: 'muito_intenso', label: 'Muy intenso (atleta)' },
    ],
    objetivoOptions: [
      { value: 'emagrecer', label: 'Adelgazar (déficit calórico)' },
      { value: 'manter', label: 'Mantener peso' },
      { value: 'ganhar_massa', label: 'Ganar masa muscular' },
    ]
  }
}

export function CalculadoraMacrosForm() {
  const pathname = usePathname()
  const t = pathname?.startsWith('/es') ? I18N.es : I18N.pt

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
        <Input label={t.labelPeso} id="peso" value={peso} onChange={(v) => setPeso(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder={t.placeholderPeso} />
        <Input label={t.labelAltura} id="altura" value={altura} onChange={(v) => setAltura(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderAltura} />
        <Input label={t.labelIdade} id="idade" value={idade} onChange={(v) => setIdade(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderIdade} />
        <Select label={t.labelSexo} id="sexo" value={sexo} onChange={setSexo} options={t.sexoOptions} />
        <Select label={t.labelAtividade} id="atividade" value={atividade} onChange={setAtividade} options={t.atividadeOptions} />
        <Select label={t.labelObjetivo} id="objetivo" value={objetivo} onChange={setObjetivo} options={t.objetivoOptions} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </div>
      <ResultCard visible={result !== null} title={t.resTitle} mainValue={result ? `${result.caloriasTotal} kcal` : ''} mainLabel={t.resMainLabel}
        items={result ? [
          { label: t.itemProteinas, value: `${result.proteinas.gramas}g (${result.proteinas.percentual}%)`, highlight: true },
          { label: t.itemCarboidratos, value: `${result.carboidratos.gramas}g (${result.carboidratos.percentual}%)`, highlight: true },
          { label: t.itemGorduras, value: `${result.gorduras.gramas}g (${result.gorduras.percentual}%)`, highlight: true },
          { label: t.itemCalProteina, value: `${result.proteinas.calorias} kcal` },
          { label: t.itemCalCarboidrato, value: `${result.carboidratos.calorias} kcal` },
          { label: t.itemCalGordura, value: `${result.gorduras.calorias} kcal` },
        ] : []} />
    </>
  )
}
