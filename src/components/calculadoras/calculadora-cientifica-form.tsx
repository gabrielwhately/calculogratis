'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'

const I18N = {
  pt: {
    labelExpressao: 'Expressão',
    placeholderExpressao: 'Ex: 2 + sin(pi/2)',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Resultado final',
    errorInvalid: 'Expressão inválida',
  },
  es: {
    labelExpressao: 'Expresión',
    placeholderExpressao: 'Ej: 2 + sin(pi/2)',
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    resultMainLabel: 'Resultado final',
    errorInvalid: 'Expresión inválida',
  }
}

const BUTTONS = [
  ['sin(', 'cos(', 'tan(', 'sqrt('],
  ['log(', 'ln(', 'pi', 'e'],
  ['(', ')', '^', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', 'C', '=']
]

export function CalculadoraCientificaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [expressao, setExpressao] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalcular() {
    const r = avaliarExpressao(expressao)
    if (r.erro) {
      setError(t.errorInvalid)
      setResult(null)
    } else {
      setResult(r.resultado)
      setError(null)
    }
  }

  function handleClick(val: string) {
    if (val === '=') handleCalcular()
    else if (val === 'C') {
      setExpressao('')
      setResult(null)
      setError(null)
    } else {
      setExpressao(prev => prev + val)
    }
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelExpressao} 
          id="expressao" 
          value={expressao} 
          onChange={setExpressao} 
          placeholder={t.placeholderExpressao}
          error={error || undefined}
        />
        <div className="grid grid-cols-4 gap-2 mb-4">
          {BUTTONS.flat().map(b => (
            <button
              key={b}
              onClick={() => handleClick(b)}
              className="p-2 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-mono text-sm"
            >
              {b}
            </button>
          ))}
        </div>
        <Button onClick={handleCalcular} fullWidth>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result !== null && (
        <ResultCard
          visible={true}
          title={t.resultTitle}
          mainValue={result.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', { maximumFractionDigits: 8 })}
          mainLabel={t.resultMainLabel}
          items={[]}
        />
      )}
    </>
  )
}
