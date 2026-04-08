'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularImpostoImportacao } from '@/lib/calculadoras/simulador-importacao'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

export function SimuladorImportacaoForm() {
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
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input
          label="Valor do produto (US$)"
          id="valorProdutoUSD"
          value={valorProdutoUSD}
          onChange={(v) => setValorProdutoUSD(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 50,00"
        />
        <Input
          label="Frete internacional (US$)"
          id="frete"
          value={frete}
          onChange={(v) => setFrete(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 15,00"
        />
        <Input
          label="Cotação do dólar (R$)"
          id="cotacaoDolar"
          value={cotacaoDolar}
          onChange={(v) => setCotacaoDolar(maskCurrency(v))}
          inputMode="decimal"
          placeholder="Ex: 5,70"
        />
        <Select
          label="Programa Remessa Conforme"
          id="remessaConforme"
          value={remessaConforme}
          onChange={(v) => { setRemessaConforme(v); setResult(null) }}
          options={[
            { value: 'sim', label: 'Sim — Loja no Remessa Conforme (Shein, AliExpress, etc.)' },
            { value: 'nao', label: 'Não — Importação comum (60% de II)' },
          ]}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Simular Impostos</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Impostos de Importação"
        mainValue={result ? formatCurrency(result.valorFinal) : ''}
        mainLabel="Valor total com impostos (R$)"
        items={result ? [
          { label: 'Valor do produto (R$)', value: formatCurrency(result.valorProdutoBRL) },
          { label: 'Frete (R$)', value: formatCurrency(result.freteBRL) },
          { label: 'Base de cálculo', value: formatCurrency(result.baseCalculo) },
          { label: 'Imposto de Importação (II)', value: formatCurrency(result.impostoImportacao), highlight: true },
          { label: 'ICMS', value: formatCurrency(result.icms), highlight: true },
          { label: 'Total de impostos', value: formatCurrency(result.totalImpostos) },
        ] : []}
      />
    </>
  )
}
