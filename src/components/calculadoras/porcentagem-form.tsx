'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Select } from '@/components/ui/select'
import { calcularPorcentagemDe, calcularAumento, calcularDesconto, calcularVariacao, calcularRepresentacao } from '@/lib/calculadoras/porcentagem'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

type Modo = 'porcentagem_de' | 'aumento' | 'desconto' | 'variacao' | 'representacao'

const I18N = {
  pt: {
    labelTipo: 'Tipo de cálculo',
    modos: [
      { value: 'porcentagem_de', label: 'Quanto é X% de Y?' },
      { value: 'aumento', label: 'Valor com aumento de X%' },
      { value: 'desconto', label: 'Valor com desconto de X%' },
      { value: 'variacao', label: 'Variação percentual entre dois valores' },
      { value: 'representacao', label: 'X representa quantos % de Y?' },
    ],
    labels: {
      porcentagem_de: { l1: 'Porcentagem (%)', l2: 'Valor (R$)', p1: 'Ex: 15', p2: 'Ex: 1.000,00' },
      aumento: { l1: 'Aumento (%)', l2: 'Valor original (R$)', p1: 'Ex: 10', p2: 'Ex: 1.000,00' },
      desconto: { l1: 'Desconto (%)', l2: 'Valor original (R$)', p1: 'Ex: 20', p2: 'Ex: 500,00' },
      variacao: { l1: 'Valor inicial (R$)', l2: 'Valor final (R$)', p1: 'Ex: 100,00', p2: 'Ex: 150,00' },
      representacao: { l1: 'Parte (R$)', l2: 'Total (R$)', p1: 'Ex: 250,00', p2: 'Ex: 1.000,00' },
    },
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    itemOriginal: 'Valor original',
    itemPorcentagem: 'Porcentagem',
    itemResultado: 'Resultado',
    itemAumento: 'Aumento',
    itemDesconto: 'Desconto',
    itemFinal: 'Valor final',
    itemInicial: 'Valor inicial',
    itemVariacao: 'Variação',
    itemParte: 'Parte',
    itemTotal: 'Total',
    labelVariacao: 'Variação percentual',
    labelRepresentacao: 'Representação',
  },
  es: {
    labelTipo: 'Tipo de cálculo',
    modos: [
      { value: 'porcentagem_de', label: '¿Cuánto es X% de Y?' },
      { value: 'aumento', label: 'Valor con aumento de X%' },
      { value: 'desconto', label: 'Valor con descuento de X%' },
      { value: 'variacao', label: 'Variación porcentual entre dos valores' },
      { value: 'representacao', label: '¿X representa qué % de Y?' },
    ],
    labels: {
      porcentagem_de: { l1: 'Porcentaje (%)', l2: 'Valor', p1: 'Ej: 15', p2: 'Ej: 1.000,00' },
      aumento: { l1: 'Aumento (%)', l2: 'Valor original', p1: 'Ej: 10', p2: 'Ej: 1.000,00' },
      desconto: { l1: 'Descuento (%)', l2: 'Valor original', p1: 'Ej: 20', p2: 'Ej: 500,00' },
      variacao: { l1: 'Valor inicial', l2: 'Valor final', p1: 'Ej: 100,00', p2: 'Ej: 150,00' },
      representacao: { l1: 'Parte', l2: 'Total', p1: 'Ej: 250,00', p2: 'Ej: 1.000,00' },
    },
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado',
    itemOriginal: 'Valor original',
    itemPorcentagem: 'Porcentaje',
    itemResultado: 'Resultado',
    itemAumento: 'Aumento',
    itemDesconto: 'Descuento',
    itemFinal: 'Valor final',
    itemInicial: 'Valor inicial',
    itemVariacao: 'Variación',
    itemParte: 'Parte',
    itemTotal: 'Total',
    labelVariacao: 'Variación porcentual',
    labelRepresentacao: 'Representación',
  }
}

export function PorcentagemForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
        setResult({ 
          label: `${v1}% de ${formatCurrency(v2)}`, 
          value: formatCurrency(r.resultado), 
          items: [
            { label: t.itemOriginal, value: formatCurrency(v2) }, 
            { label: t.itemPorcentagem, value: `${v1}%` }, 
            { label: t.itemResultado, value: formatCurrency(r.resultado), highlight: true }
          ] 
        })
        break
      case 'aumento':
        r = calcularAumento(v2, v1)
        setResult({ 
          label: `${formatCurrency(v2)} + ${v1}%`, 
          value: formatCurrency(r.resultado), 
          items: [
            { label: t.itemOriginal, value: formatCurrency(v2) }, 
            { label: t.itemAumento, value: `${v1}% = ${formatCurrency(r.resultado - v2)}` }, 
            { label: t.itemFinal, value: formatCurrency(r.resultado), highlight: true }
          ] 
        })
        break
      case 'desconto':
        r = calcularDesconto(v2, v1)
        setResult({ 
          label: `${formatCurrency(v2)} - ${v1}%`, 
          value: formatCurrency(r.resultado), 
          items: [
            { label: t.itemOriginal, value: formatCurrency(v2) }, 
            { label: t.itemDesconto, value: `${v1}% = ${formatCurrency(v2 - r.resultado)}` }, 
            { label: t.itemFinal, value: formatCurrency(r.resultado), highlight: true }
          ] 
        })
        break
      case 'variacao':
        r = calcularVariacao(v1, v2)
        setResult({ 
          label: t.labelVariacao, 
          value: `${r.porcentagem.toFixed(2)}%`, 
          items: [
            { label: t.itemInicial, value: formatCurrency(v1) }, 
            { label: t.itemFinal, value: formatCurrency(v2) }, 
            { label: t.itemVariacao, value: `${r.porcentagem.toFixed(2)}%`, highlight: true }
          ] 
        })
        break
      case 'representacao':
        r = calcularRepresentacao(v1, v2)
        setResult({ 
          label: t.labelRepresentacao, 
          value: `${r.porcentagem.toFixed(2)}%`, 
          items: [
            { label: t.itemParte, value: formatCurrency(v1) }, 
            { label: t.itemTotal, value: formatCurrency(v2) }, 
            { label: t.itemPorcentagem, value: `${r.porcentagem.toFixed(2)}%`, highlight: true }
          ] 
        })
        break
    }
  }

  const lab = t.labels[modo]
  const usePercent = modo === 'porcentagem_de' || modo === 'aumento' || modo === 'desconto'
  const isValid = parseBRNumber(valor1) !== 0 && parseBRNumber(valor2) !== 0

  return (
    <>
      <FormCard>
        <Select 
          label={t.labelTipo} 
          id="modo" 
          value={modo} 
          onChange={(v) => { setModo(v as Modo); setResult(null) }} 
          options={t.modos} 
        />
        <Input 
          label={lab.l1} 
          id="valor1" 
          value={valor1} 
          onChange={(v) => setValor1(usePercent ? maskPercent(v) : maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={lab.p1} 
          suffix={usePercent ? '%' : undefined} 
        />
        <Input 
          label={lab.l2} 
          id="valor2" 
          value={valor2} 
          onChange={(v) => setValor2(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={lab.p2} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={t.resultTitle} 
          mainValue={result.value} 
          mainLabel={result.label} 
          items={result.items} 
        />
      )}
    </>
  )
}
