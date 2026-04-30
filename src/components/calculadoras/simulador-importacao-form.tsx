'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularImpostoImportacao } from '@/lib/calculadoras/simulador-importacao'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelProduto: 'Valor do produto (US$)',
    labelFrete: 'Frete internacional (US$)',
    labelDolar: 'Cotação do dólar (R$)',
    labelPrograma: 'Programa Remessa Conforme',
    placeholderProduto: 'Ex: 50,00',
    placeholderFrete: 'Ex: 15,00',
    placeholderDolar: 'Ex: 5,70',
    options: [
      { value: 'sim', label: 'Sim — Loja no Remessa Conforme (Shein, AliExpress, etc.)' },
      { value: 'nao', label: 'Não — Importação comum (60% de II)' },
    ],
    buttonSimular: 'Simular Impostos',
    resultTitle: 'Impostos de Importação',
    resultMainLabel: 'Valor total com impostos (R$)',
    itemProdutoBRL: 'Valor do produto (R$)',
    itemFreteBRL: 'Frete (R$)',
    itemBase: 'Base de cálculo',
    itemII: 'Imposto de Importação (II)',
    itemICMS: 'ICMS',
    itemTotalImpostos: 'Total de impostos',
  },
  es: {
    labelProduto: 'Valor del producto (US$)',
    labelFrete: 'Flete internacional (US$)',
    labelDolar: 'Cotización del dólar',
    labelPrograma: 'Programa Remessa Conforme',
    placeholderProduto: 'Ej: 50,00',
    placeholderFrete: 'Ej: 15,00',
    placeholderDolar: 'Ej: 5,70',
    options: [
      { value: 'sim', label: 'Sí — Tienda en Remessa Conforme (Shein, AliExpress, etc.)' },
      { value: 'nao', label: 'No — Importación común (60% de II)' },
    ],
    buttonSimular: 'Simular Impuestos',
    resultTitle: 'Impuestos de Importación',
    resultMainLabel: 'Valor total con impuestos (R$)',
    itemProdutoBRL: 'Valor del producto (R$)',
    itemFreteBRL: 'Flete (R$)',
    itemBase: 'Base de cálculo',
    itemII: 'Impuesto de Importación (II)',
    itemICMS: 'ICMS',
    itemTotalImpostos: 'Total de impuestos',
  }
}

export function SimuladorImportacaoForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valorProdutoUSD, setValorProdutoUSD] = useState('')
  const [frete, setFrete] = useState('')
  const [cotacaoDolar, setCotacaoDolar] = useState('5,70')
  const [remessaConforme, setRemessaConforme] = useState('sim')
  const [result, setResult] = useState<ReturnType<typeof calcularImpostoImportacao> | null>(null)

  function handleCalcular() {
    setResult(calcularImpostoImportacao({
      valorProdutoUSD: parseBRNumber(valorProdutoUSD),
      frete: parseBRNumber(frete),
      cotacaoDolar: parseBRNumber(cotacaoDolar),
      remessaConforme: remessaConforme === 'sim',
    }))
  }

  const isValid = parseBRNumber(valorProdutoUSD) > 0 && parseBRNumber(cotacaoDolar) > 0

  return (
    <>
      <FormCard>
        <Input
          label={t.labelProduto}
          id="valorProdutoUSD"
          value={valorProdutoUSD}
          onChange={(v) => setValorProdutoUSD(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderProduto}
        />
        <Input
          label={t.labelFrete}
          id="frete"
          value={frete}
          onChange={(v) => setFrete(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderFrete}
        />
        <Input
          label={t.labelDolar}
          id="cotacaoDolar"
          value={cotacaoDolar}
          onChange={(v) => setCotacaoDolar(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderDolar}
        />
        <Select
          label={t.labelPrograma}
          id="remessaConforme"
          value={remessaConforme}
          onChange={(v) => { setRemessaConforme(v); setResult(null) }}
          options={t.options}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.buttonSimular}</Button>
      </FormCard>
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.valorFinal) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemProdutoBRL, value: formatCurrency(result.valorProdutoBRL) },
          { label: t.itemFreteBRL, value: formatCurrency(result.freteBRL) },
          { label: t.itemBase, value: formatCurrency(result.baseCalculo) },
          { label: t.itemII, value: formatCurrency(result.impostoImportacao), highlight: true },
          { label: t.itemICMS, value: formatCurrency(result.icms), highlight: true },
          { label: t.itemTotalImpostos, value: formatCurrency(result.totalImpostos) },
        ] : []}
      />
    </>
  )
}
