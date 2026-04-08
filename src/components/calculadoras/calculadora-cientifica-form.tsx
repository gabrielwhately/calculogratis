'use client'

import { useState } from 'react'
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'

const BUTTONS = [
  ['sin(', 'cos(', 'tan(', 'sqrt('],
  ['log(', 'ln(', 'pi', 'e'],
  ['(', ')', '^', '%'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
]

const BTN_BASE = 'flex items-center justify-center rounded-lg text-sm font-medium h-11 transition-colors focus:outline-none focus:ring-2 focus:ring-accent'
const BTN_NUMBER = `${BTN_BASE} bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-navy dark:text-white hover:bg-slate-50 dark:hover:bg-gray-600`
const BTN_OP = `${BTN_BASE} bg-slate-100 dark:bg-gray-600 border border-slate-200 dark:border-gray-500 text-navy dark:text-white hover:bg-slate-200 dark:hover:bg-gray-500`
const BTN_FUNC = `${BTN_BASE} bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50`
const BTN_EQUALS = `${BTN_BASE} bg-accent text-white hover:bg-accent/90`
const BTN_CLEAR = `${BTN_BASE} bg-red-500 text-white hover:bg-red-600`
const BTN_BACK = `${BTN_BASE} bg-orange-400 text-white hover:bg-orange-500`

function getBtnClass(label: string) {
  if (label === '=') return BTN_EQUALS
  if (['+', '-', '*', '/', '^', '%'].includes(label)) return BTN_OP
  if (/^[0-9.]$/.test(label) || label === '(' || label === ')') return BTN_NUMBER
  return BTN_FUNC
}

export function CalculadoraCientificaForm() {
  const [expr, setExpr] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  function handleBtn(label: string) {
    if (label === '=') {
      calcular()
      return
    }
    setExpr(prev => prev + label)
    setResultado(null)
    setErro(null)
  }

  function calcular() {
    if (!expr.trim()) return
    const res = avaliarExpressao(expr)
    if (res.erro) {
      setErro(res.erro)
      setResultado(null)
    } else {
      const formatted = Number.isInteger(res.resultado)
        ? res.resultado.toString()
        : parseFloat(res.resultado.toPrecision(12)).toString()
      setResultado(formatted)
      setErro(null)
    }
  }

  function handleClear() {
    setExpr('')
    setResultado(null)
    setErro(null)
  }

  function handleBack() {
    setExpr(prev => prev.slice(0, -1))
    setResultado(null)
    setErro(null)
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
      {/* Display */}
      <div className="mb-4 rounded-lg bg-slate-900 dark:bg-gray-900 p-4 min-h-[80px]">
        <div className="font-mono text-slate-400 dark:text-slate-500 text-sm min-h-[20px] break-all">
          {expr || <span className="opacity-40">0</span>}
        </div>
        {resultado !== null && (
          <div className="font-mono text-2xl font-bold text-white mt-1 break-all">
            = {resultado}
          </div>
        )}
        {erro && (
          <div className="font-mono text-red-400 text-sm mt-1">{erro}</div>
        )}
      </div>

      {/* Clear + Backspace */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button className={BTN_CLEAR} onClick={handleClear}>C</button>
        <button className={BTN_BACK} onClick={handleBack}>&#9003;</button>
      </div>

      {/* Main buttons */}
      <div className="space-y-2">
        {BUTTONS.map((row, ri) => (
          <div key={ri} className="grid grid-cols-4 gap-2">
            {row.map((label) => (
              <button
                key={label}
                className={getBtnClass(label)}
                onClick={() => handleBtn(label)}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
        Use sin(, cos(, tan(, sqrt(, log(, ln( — ex: sin(3.14159)
      </p>
    </div>
  )
}
