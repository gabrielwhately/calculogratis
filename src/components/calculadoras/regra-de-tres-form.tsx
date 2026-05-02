'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Select } from '@/components/ui/select'
import { calcularRegraDeTres } from '@/lib/calculadoras/regra-de-tres'
import { parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelTipo: 'Tipo',
    options: [
      { value: 'direta', label: 'Diretamente proporcional' },
      { value: 'inversa', label: 'Inversamente proporcional' }
    ],
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Valor de X',
    itemTipo: 'Tipo',
    placeholderX: '?',
    labelX: 'X (resultado)',
  },
  es: {
    labelTipo: 'Tipo',
    options: [
      { value: 'direta', label: 'Directamente proporcional' },
      { value: 'inversa', label: 'Inversamente proporcional' }
    ],
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Valor de X',
    itemTipo: 'Tipo',
    placeholderX: '?',
    labelX: 'X (resultado)',
  }
}

export function RegraDeTresForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [tipo, setTipo] = useState<'direta' | 'inversa'>('direta')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularRegraDeTres> | null>(null)

  function handleCalcular() {
    setResult(calcularRegraDeTres(parseBRNumber(a), parseBRNumber(b), parseBRNumber(c), tipo))
  }

  const isValid = parseBRNumber(a) !== 0 && parseBRNumber(b) !== 0 && parseBRNumber(c) !== 0

  return (
    <>
      <FormCard>
        <Select 
          label={t.labelTipo} 
          id="tipo" 
          value={tipo} 
          onChange={(v) => { setTipo(v as 'direta' | 'inversa'); setResult(null) }} 
          options={t.options} 
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Input label="A" id="a" value={a} onChange={setA} inputMode="decimal" placeholder="Ex: 10" />
          <Input label="B" id="b" value={b} onChange={setB} inputMode="decimal" placeholder="Ex: 20" />
          <Input label="C" id="c" value={c} onChange={setC} inputMode="decimal" placeholder="Ex: 30" />
          <Input 
            label={t.labelX} 
            id="x" 
            value={result ? result.x.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { maximumFractionDigits: 4 }) : t.placeholderX} 
            onChange={() => {}} 
            inputMode="decimal" 
            disabled 
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono text-center">
          {tipo === 'direta' ? 'A/B = C/X → X = (B × C) / A' : 'A × B = C × X → X = (A × B) / C'}
        </p>
        <div className="mt-4">
          <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
            {t.buttonCalcular}
          </Button>
        </div>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? result.x.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { maximumFractionDigits: 4 }) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: 'A', value: result.a.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR') }, 
          { label: 'B', value: result.b.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR') }, 
          { label: 'C', value: result.c.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR') }, 
          { label: 'X', value: result.x.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { maximumFractionDigits: 4 }), highlight: true }, 
          { label: t.itemTipo, value: result.tipo === 'direta' ? t.options[0].label : t.options[1].label }
        ] : []} 
      />
    </>
  )
}
