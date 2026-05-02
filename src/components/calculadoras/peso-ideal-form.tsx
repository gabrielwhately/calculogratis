'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPesoIdeal } from '@/lib/calculadoras/peso-ideal'
import { parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelAltura: 'Altura (cm)',
    labelSexo: 'Sexo',
    optionMasculino: 'Masculino',
    optionFeminino: 'Feminino',
    placeholderAltura: 'Ex: 170',
    buttonCalcular: 'Calcular Peso Ideal',
    resultTitle: 'Peso Ideal',
    resultMainLabel: 'Faixa de peso saudável (IMC 18,5 – 24,9)',
    itemAltura: 'Altura informada',
    itemImcMin: 'IMC mínimo saudável',
    itemImcMax: 'IMC máximo saudável',
    itemPesoMin: 'Peso mínimo (IMC 18,5)',
    itemPesoMax: 'Peso máximo (IMC 24,9)',
    itemFormulaDevine: 'Fórmula Devine',
    itemFormulaRobinson: 'Fórmula Robinson',
    itemFormulaMiller: 'Fórmula Miller',
  },
  es: {
    labelAltura: 'Altura (cm)',
    labelSexo: 'Sexo',
    optionMasculino: 'Masculino',
    optionFeminino: 'Femenino',
    placeholderAltura: 'Ej: 170',
    buttonCalcular: 'Calcular Peso Ideal',
    resultTitle: 'Peso Ideal',
    resultMainLabel: 'Rango de peso saludable (IMC 18,5 – 24,9)',
    itemAltura: 'Altura informada',
    itemImcMin: 'IMC mínimo saludable',
    itemImcMax: 'IMC máximo saludable',
    itemPesoMin: 'Peso mínimo (IMC 18,5)',
    itemPesoMax: 'Peso máximo (IMC 24,9)',
    itemFormulaDevine: 'Fórmula Devine',
    itemFormulaRobinson: 'Fórmula Robinson',
    itemFormulaMiller: 'Fórmula Miller',
  }
}

export function PesoIdealForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [altura, setAltura] = useState('')
  const [sexo, setSexo] = useState<'masculino' | 'feminino'>('masculino')
  const [result, setResult] = useState<ReturnType<typeof calcularPesoIdeal> | null>(null)

  function handleCalcular() {
    const alturaNum = parseBRNumber(altura)
    if (!alturaNum || alturaNum <= 0) return
    setResult(calcularPesoIdeal({ altura: alturaNum, sexo }))
  }

  const isValid = parseBRNumber(altura) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelAltura} 
          id="altura" 
          value={altura} 
          onChange={setAltura} 
          inputMode="decimal" 
          placeholder={t.placeholderAltura} 
        />
        <Select
          label={t.labelSexo}
          id="sexo"
          value={sexo}
          onChange={(v) => setSexo(v as 'masculino' | 'feminino')}
          options={[
            { value: 'masculino', label: t.optionMasculino },
            { value: 'feminino', label: t.optionFeminino },
          ]}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? `${result.pesoMinimo.toFixed(1)} – ${result.pesoMaximo.toFixed(1)} kg` : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemAltura, value: `${result.altura} cm` },
          { label: t.itemImcMin, value: `${result.imcMinimo}` },
          { label: t.itemImcMax, value: `${result.imcMaximo}` },
          { label: t.itemPesoMin, value: `${result.pesoMinimo.toFixed(1)} kg` },
          { label: t.itemPesoMax, value: `${result.pesoMaximo.toFixed(1)} kg`, highlight: true },
          { label: t.itemFormulaDevine, value: `${result.pesoIdealDevine.toFixed(1)} kg` },
          { label: t.itemFormulaRobinson, value: `${result.pesoIdealRobinson.toFixed(1)} kg` },
          { label: t.itemFormulaMiller, value: `${result.pesoIdealMiller.toFixed(1)} kg` },
        ] : []}
      />
    </>
  )
}
