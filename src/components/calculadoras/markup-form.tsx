'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularMarkup, calcularMarkupPorMargem, calcularMarkupPorPreco } from '@/lib/calculadoras/markup'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelModo: 'Modo de cálculo',
    labelCusto: 'Custo do produto (R$)',
    placeholderCusto: 'Ex: 50,00',
    options: [
      { value: 'markup', label: 'Calcular preço a partir do markup' },
      { value: 'margem', label: 'Calcular preço a partir da margem de lucro' },
      { value: 'preco', label: 'Descobrir markup a partir do preço de venda' },
    ],
    label2Map: {
      'markup': 'Markup (%)',
      'margem': 'Margem de lucro desejada (%)',
      'preco': 'Preço de venda (R$)',
    },
    placeholder2Map: {
      'markup': 'Ex: 50',
      'margem': 'Ex: 30',
      'preco': 'Ex: 100,00',
    },
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado do Markup',
    resultMainLabel: 'Preço de venda',
    itemCusto: 'Custo do produto',
    itemMarkup: 'Markup',
    itemMargem: 'Margem de lucro',
    itemLucro: 'Lucro por unidade',
  },
  es: {
    labelModo: 'Modo de cálculo',
    labelCusto: 'Costo del producto',
    placeholderCusto: 'Ej: 50,00',
    options: [
      { value: 'markup', label: 'Calcular precio a partir del markup' },
      { value: 'margem', label: 'Calcular precio a partir del margen de beneficio' },
      { value: 'preco', label: 'Descubrir markup a partir del precio de venta' },
    ],
    label2Map: {
      'markup': 'Markup (%)',
      'margem': 'Margen de beneficio deseado (%)',
      'preco': 'Precio de venta',
    },
    placeholder2Map: {
      'markup': 'Ej: 50',
      'margem': 'Ej: 30',
      'preco': 'Ej: 100,00',
    },
    buttonCalcular: 'Calcular',
    resultTitle: 'Resultado del Markup',
    resultMainLabel: 'Precio de venta',
    itemCusto: 'Costo del producto',
    itemMarkup: 'Markup',
    itemMargem: 'Margen de beneficio',
    itemLucro: 'Beneficio por unidad',
  }
}

export function MarkupForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [modo, setModo] = useState('markup')
  const [custo, setCusto] = useState('')
  const [valor2, setValor2] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularMarkup> | null>(null)

  function handleCalcular() {
    const c = parseBRNumber(custo)
    const v = parseBRNumber(valor2)
    if (modo === 'markup') setResult(calcularMarkup(c, v))
    else if (modo === 'margem') setResult(calcularMarkupPorMargem(c, v))
    else setResult(calcularMarkupPorPreco(c, v))
  }

  const label2 = t.label2Map[modo as keyof typeof t.label2Map]
  const isValid = parseBRNumber(custo) > 0 && parseBRNumber(valor2) > 0

  return (
    <>
      <FormCard>
        <Select 
          label={t.labelModo} 
          id="modo" 
          value={modo} 
          onChange={setModo} 
          options={t.options} 
        />
        <Input 
          label={t.labelCusto} 
          id="custo" 
          value={custo} 
          onChange={(v) => setCusto(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderCusto} 
        />
        <Input 
          label={label2} 
          id="valor2" 
          value={valor2}
          onChange={(v) => setValor2(modo === 'preco' ? maskCurrency(v) : maskPercent(v))}
          inputMode="decimal" 
          placeholder={t.placeholder2Map[modo as keyof typeof t.placeholder2Map]}
          suffix={modo === 'preco' ? undefined : '%'} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.resultTitle} 
        mainValue={result ? formatCurrency(result.precoVenda) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemCusto, value: formatCurrency(result.custoProduto) },
          { label: t.itemMarkup, value: `${result.markup.toFixed(2)}%` },
          { label: t.itemMargem, value: `${result.margemLucro.toFixed(2)}%` },
          { label: t.itemLucro, value: formatCurrency(result.lucro), highlight: true },
        ] : []} 
      />
    </>
  )
}
