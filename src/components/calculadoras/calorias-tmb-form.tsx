'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { calcularTMB } from '@/lib/calculadoras/calorias-tmb'
import { parseBRNumber, maskNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelPeso: 'Peso (kg)',
    labelAltura: 'Altura (cm)',
    labelIdade: 'Idade (anos)',
    labelSexo: 'Sexo',
    labelAtividade: 'Nível de atividade física',
    placeholderPeso: 'Ex: 70',
    placeholderAltura: 'Ex: 170',
    placeholderIdade: 'Ex: 30',
    btnCalcular: 'Calcular Calorias',
    resTitle: 'Necessidade Calórica Diária',
    resMainLabel: 'Calorias por dia para seu nível de atividade',
    itemSexo: 'Sexo',
    itemAtividade: 'Nível de atividade',
    itemTMB: 'TMB (Metabolismo Basal)',
    itemTotal: 'Necessidade diária total',
    sexoOptions: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Feminino' },
    ],
    atividadeOptions: [
      { value: '1.2', label: 'Sedentário (pouco ou nenhum exercício)' },
      { value: '1.375', label: 'Levemente ativo (exercício 1-3x/sem)' },
      { value: '1.55', label: 'Moderadamente ativo (exercício 3-5x/sem)' },
      { value: '1.725', label: 'Muito ativo (exercício 6-7x/sem)' },
      { value: '1.9', label: 'Extremamente ativo (2x ao dia)' },
    ]
  },
  es: {
    labelPeso: 'Peso (kg)',
    labelAltura: 'Altura (cm)',
    labelIdade: 'Edad (años)',
    labelSexo: 'Sexo',
    labelAtividade: 'Nivel de actividad física',
    placeholderPeso: 'Ej: 70',
    placeholderAltura: 'Ej: 170',
    placeholderIdade: 'Ej: 30',
    btnCalcular: 'Calcular Calorías',
    resTitle: 'Necesidad Calórica Diaria',
    resMainLabel: 'Calorías por día para su nivel de actividad',
    itemSexo: 'Sexo',
    itemAtividade: 'Nivel de actividad',
    itemTMB: 'TMB (Metabolismo Basal)',
    itemTotal: 'Necesidad diaria total',
    sexoOptions: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Femenino' },
    ],
    atividadeOptions: [
      { value: '1.2', label: 'Sedentario (poco o nada de ejercicio)' },
      { value: '1.375', label: 'Ligeramente activo (ejercicio 1-3x/sem)' },
      { value: '1.55', label: 'Moderadamente activo (ejercicio 3-5x/sem)' },
      { value: '1.725', label: 'Muy activo (ejercicio 6-7x/sem)' },
      { value: '1.9', label: 'Extremamente activo (2x al día)' },
    ]
  }
}

export function CaloriasTMBForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState<'masculino' | 'feminino'>('masculino')
  const [atividade, setAtividade] = useState('1.2')
  const [result, setResult] = useState<ReturnType<typeof calcularTMB> | null>(null)

  function handleCalcular() {
    const pesoNum = parseBRNumber(peso)
    const alturaNum = parseBRNumber(altura)
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
      <FormCard>
        <Input 
          label={t.labelPeso} 
          value={peso} 
          onChange={(v) => setPeso(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderPeso} 
        />
        <Input 
          label={t.labelAltura} 
          value={altura} 
          onChange={(v) => setAltura(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderAltura} 
        />
        <Input 
          label={t.labelIdade} 
          value={idade} 
          onChange={(v) => setIdade(maskNumber(v))} 
          inputMode="numeric" 
          placeholder={t.placeholderIdade} 
        />
        <Select
          label={t.labelSexo}
          value={sexo}
          onChange={(v) => setSexo(v as 'masculino' | 'feminino')}
          options={t.sexoOptions}
        />
        <Select
          label={t.labelAtividade}
          value={atividade}
          onChange={setAtividade}
          options={t.atividadeOptions}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </FormCard>

      <ResultCard
        visible={result !== null}
        title={t.resTitle}
        mainValue={result ? `${Math.round(result.necessidadeDiaria)} kcal` : ''}
        mainLabel={t.resMainLabel}
        items={result ? [
          { label: t.itemSexo, value: result.sexo === 'masculino' ? (isSpanish ? 'Masculino' : 'Masculino') : (isSpanish ? 'Femenino' : 'Feminino') },
          { label: t.itemAtividade, value: t.atividadeOptions.find(o => o.value === String(result.atividade))?.label || String(result.atividade) },
          { label: t.itemTMB, value: `${Math.round(result.tmb)} kcal`, highlight: true },
          { label: t.itemTotal, value: `${Math.round(result.necessidadeDiaria)} kcal`, highlight: true },
        ] : []}
      />
    </>
  )
}
