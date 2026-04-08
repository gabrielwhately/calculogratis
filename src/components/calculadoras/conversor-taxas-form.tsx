'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { converterTaxaMensalParaAnual, converterTaxaAnualParaMensal, converterTaxaDiariaParaMensal } from '@/lib/calculadoras/conversor-taxas'
import { parseBRNumber, maskPercent } from '@/lib/formatters'

type TipoConversao = 'mensal-anual' | 'anual-mensal' | 'diaria-mensal'

export function ConversorTaxasForm() {
  const [tipo, setTipo] = useState<TipoConversao>('mensal-anual')
  const [taxa, setTaxa] = useState('')
  const [result, setResult] = useState<{ mensal: number; anual: number; diaria: number } | null>(null)

  function handleCalcular() {
    const valor = parseBRNumber(taxa)
    if (tipo === 'mensal-anual') setResult(converterTaxaMensalParaAnual(valor))
    else if (tipo === 'anual-mensal') setResult(converterTaxaAnualParaMensal(valor))
    else setResult(converterTaxaDiariaParaMensal(valor))
  }

  const isValid = parseBRNumber(taxa) > 0

  const labelMap: Record<TipoConversao, string> = {
    'mensal-anual': 'Taxa mensal (%)',
    'anual-mensal': 'Taxa anual (%)',
    'diaria-mensal': 'Taxa diária (%)',
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Select
          label="Tipo de conversão"
          id="tipo"
          value={tipo}
          onChange={(v) => { setTipo(v as TipoConversao); setResult(null) }}
          options={[
            { value: 'mensal-anual', label: 'Mensal → Anual' },
            { value: 'anual-mensal', label: 'Anual → Mensal' },
            { value: 'diaria-mensal', label: 'Diária → Mensal e Anual' },
          ]}
        />
        <Input
          label={labelMap[tipo]}
          id="taxa"
          value={taxa}
          onChange={(v) => setTaxa(maskPercent(v))}
          inputMode="decimal"
          placeholder="Ex: 1,5"
          suffix="%"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Converter</Button>
      </div>
      <ResultCard
        visible={result !== null}
        title="Taxas Equivalentes"
        mainValue={result ? `${result.mensal.toFixed(4).replace('.', ',')}% a.m.` : ''}
        mainLabel="Taxa mensal"
        items={result ? [
          { label: 'Taxa diária', value: `${result.diaria.toFixed(4).replace('.', ',')}% a.d.` },
          { label: 'Taxa mensal', value: `${result.mensal.toFixed(4).replace('.', ',')}% a.m.` },
          { label: 'Taxa anual', value: `${result.anual.toFixed(4).replace('.', ',')}% a.a.`, highlight: true },
        ] : []}
      />
    </>
  )
}
