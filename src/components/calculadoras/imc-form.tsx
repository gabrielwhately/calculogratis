'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularIMC } from '@/lib/calculadoras/imc'

function getClassificacaoCor(classificacao: string): string {
  switch (classificacao) {
    case 'Abaixo do peso': return 'bg-blue-500'
    case 'Peso normal': return 'bg-green-500'
    case 'Sobrepeso': return 'bg-yellow-500'
    case 'Obesidade grau I': return 'bg-orange-500'
    case 'Obesidade grau II': return 'bg-red-500'
    case 'Obesidade grau III': return 'bg-red-700'
    default: return 'bg-slate-500'
  }
}

export function IMCForm() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIMC> | null>(null)

  function handleCalcular() {
    const pesoNum = parseFloat(peso.replace(',', '.'))
    const alturaCm = parseFloat(altura.replace(',', '.'))
    if (!pesoNum || !alturaCm || pesoNum <= 0 || alturaCm <= 0) return
    setResult(calcularIMC({ peso: pesoNum, altura: alturaCm / 100 }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Peso (kg)" id="peso" value={peso} onChange={setPeso} inputMode="decimal" placeholder="Ex: 75" />
        <Input label="Altura (cm)" id="altura" value={altura} onChange={setAltura} inputMode="decimal" placeholder="Ex: 175" />
        <Button onClick={handleCalcular} fullWidth disabled={!peso || !altura}>Calcular IMC</Button>
      </div>
      {result && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300">Indice de Massa Corporal</p>
          <p className="mt-1 text-4xl font-bold">{result.imc.toFixed(2)}</p>
          <div className="mt-2">
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${getClassificacaoCor(result.classificacao)}`}>
              {result.classificacao}
            </span>
          </div>
          <div className="mt-4 space-y-2 border-t border-white/20 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Peso</span>
              <span className="text-slate-200">{result.peso} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Altura</span>
              <span className="text-slate-200">{(result.altura * 100).toFixed(0)} cm</span>
            </div>
          </div>
          <div className="mt-4 border-t border-white/20 pt-4">
            <p className="text-xs text-slate-400">Tabela de classificacao do IMC (OMS)</p>
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-slate-300">Abaixo do peso</span><span className="text-slate-400">&lt; 18,5</span></div>
              <div className="flex justify-between"><span className="text-slate-300">Peso normal</span><span className="text-slate-400">18,5 - 24,9</span></div>
              <div className="flex justify-between"><span className="text-slate-300">Sobrepeso</span><span className="text-slate-400">25,0 - 29,9</span></div>
              <div className="flex justify-between"><span className="text-slate-300">Obesidade grau I</span><span className="text-slate-400">30,0 - 34,9</span></div>
              <div className="flex justify-between"><span className="text-slate-300">Obesidade grau II</span><span className="text-slate-400">35,0 - 39,9</span></div>
              <div className="flex justify-between"><span className="text-slate-300">Obesidade grau III</span><span className="text-slate-400">&gt;= 40,0</span></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
