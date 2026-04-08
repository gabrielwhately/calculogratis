'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { Select } from '@/components/ui/select'
import { calcularPorcentagemDe, calcularAumento, calcularDesconto, calcularVariacao, calcularRepresentacao } from '@/lib/calculadoras/porcentagem'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

type Modo = 'porcentagem_de' | 'aumento' | 'desconto' | 'variacao' | 'representacao'

const MODOS = [
  { value: 'porcentagem_de', label: 'Quanto e X% de Y?' },
  { value: 'aumento', label: 'Valor com aumento de X%' },
  { value: 'desconto', label: 'Valor com desconto de X%' },
  { value: 'variacao', label: 'Variacao percentual entre dois valores' },
  { value: 'representacao', label: 'X representa quantos % de Y?' },
]

export function PorcentagemForm() {
  const [modo, setModo] = useState<Modo>('porcentagem_de')
  const [valor1, setValor1] = useState('')
  const [valor2, setValor2] = useState('')
  const [result, setResult] = useState<{ label: string; value: string; items: { label: string; value: string; highlight?: boolean }[] } | null>(null)

  function handleCalcular() {
    const v1 = parseBRNumber(valor1)
    const v2 = parseBRNumber(valor2)
    let r
    switch (modo) {
      case 'porcentagem_de':
        r = calcularPorcentagemDe(v2, v1)
        setResult({ label: `${v1}% de ${formatCurrency(v2)}`, value: formatCurrency(r.resultado), items: [{ label: 'Valor original', value: formatCurrency(v2) }, { label: 'Porcentagem', value: `${v1}%` }, { label: 'Resultado', value: formatCurrency(r.resultado), highlight: true }] })
        break
      case 'aumento':
        r = calcularAumento(v2, v1)
        setResult({ label: `${formatCurrency(v2)} + ${v1}%`, value: formatCurrency(r.resultado), items: [{ label: 'Valor original', value: formatCurrency(v2) }, { label: 'Aumento', value: `${v1}% = ${formatCurrency(r.resultado - v2)}` }, { label: 'Valor final', value: formatCurrency(r.resultado), highlight: true }] })
        break
      case 'desconto':
        r = calcularDesconto(v2, v1)
        setResult({ label: `${formatCurrency(v2)} - ${v1}%`, value: formatCurrency(r.resultado), items: [{ label: 'Valor original', value: formatCurrency(v2) }, { label: 'Desconto', value: `${v1}% = ${formatCurrency(v2 - r.resultado)}` }, { label: 'Valor final', value: formatCurrency(r.resultado), highlight: true }] })
        break
      case 'variacao':
        r = calcularVariacao(v1, v2)
        setResult({ label: 'Variacao percentual', value: `${r.porcentagem.toFixed(2)}%`, items: [{ label: 'Valor inicial', value: formatCurrency(v1) }, { label: 'Valor final', value: formatCurrency(v2) }, { label: 'Variacao', value: `${r.porcentagem.toFixed(2)}%`, highlight: true }] })
        break
      case 'representacao':
        r = calcularRepresentacao(v1, v2)
        setResult({ label: 'Representacao', value: `${r.porcentagem.toFixed(2)}%`, items: [{ label: 'Parte', value: formatCurrency(v1) }, { label: 'Total', value: formatCurrency(v2) }, { label: 'Porcentagem', value: `${r.porcentagem.toFixed(2)}%`, highlight: true }] })
        break
    }
  }

  const labels = {
    porcentagem_de: { l1: 'Porcentagem (%)', l2: 'Valor (R$)', p1: 'Ex: 15', p2: 'Ex: 1.000,00' },
    aumento: { l1: 'Aumento (%)', l2: 'Valor original (R$)', p1: 'Ex: 10', p2: 'Ex: 1.000,00' },
    desconto: { l1: 'Desconto (%)', l2: 'Valor original (R$)', p1: 'Ex: 20', p2: 'Ex: 500,00' },
    variacao: { l1: 'Valor inicial (R$)', l2: 'Valor final (R$)', p1: 'Ex: 100,00', p2: 'Ex: 150,00' },
    representacao: { l1: 'Parte (R$)', l2: 'Total (R$)', p1: 'Ex: 250,00', p2: 'Ex: 1.000,00' },
  }

  const lab = labels[modo]
  const usePercent = modo === 'porcentagem_de' || modo === 'aumento' || modo === 'desconto'
  const isValid = parseBRNumber(valor1) !== 0 && parseBRNumber(valor2) !== 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select label="Tipo de calculo" id="modo" value={modo} onChange={(v) => { setModo(v as Modo); setResult(null) }} options={MODOS} />
        <Input label={lab.l1} id="valor1" value={valor1} onChange={(v) => setValor1(usePercent ? maskPercent(v) : maskCurrency(v))} inputMode="decimal" placeholder={lab.p1} suffix={usePercent ? '%' : undefined} />
        <Input label={lab.l2} id="valor2" value={valor2} onChange={(v) => setValor2(maskCurrency(v))} inputMode="decimal" placeholder={lab.p2} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado" mainValue={result?.value || ''} mainLabel={result?.label || ''} items={result?.items || []} />
    </>
  )
}
