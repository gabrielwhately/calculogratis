'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { converterTaxaMensalParaAnual, converterTaxaAnualParaMensal, converterTaxaDiariaParaMensal } from '@/lib/calculadoras/conversor-taxas'
import { parseBRNumber, maskPercent } from '@/lib/formatters'

type TipoConversao = 'mensal-anual' | 'anual-mensal' | 'diaria-mensal'

const I18N = {
  pt: {
    labelTipo: 'Tipo de conversão',
    options: [
      { value: 'mensal-anual', label: 'Mensal → Anual' },
      { value: 'anual-mensal', label: 'Anual → Mensal' },
      { value: 'diaria-mensal', label: 'Diária → Mensal e Anual' },
    ],
    labelMap: {
      'mensal-anual': 'Taxa mensal (%)',
      'anual-mensal': 'Taxa anual (%)',
      'diaria-mensal': 'Taxa diária (%)',
    },
    placeholderTaxa: 'Ex: 1,5',
    buttonConverter: 'Converter',
    resultTitle: 'Taxas Equivalentes',
    resultMainLabel: 'Taxa mensal',
    itemDiaria: 'Taxa diária',
    itemMensal: 'Taxa mensal',
    itemAnual: 'Taxa anual',
    unitDiaria: '% a.d.',
    unitMensal: '% a.m.',
    unitAnual: '% a.a.',
  },
  es: {
    labelTipo: 'Tipo de conversión',
    options: [
      { value: 'mensal-anual', label: 'Mensual → Anual' },
      { value: 'anual-mensal', label: 'Anual → Mensual' },
      { value: 'diaria-mensal', label: 'Diaria → Mensual y Anual' },
    ],
    labelMap: {
      'mensal-anual': 'Tasa mensual (%)',
      'anual-mensal': 'Tasa anual (%)',
      'diaria-mensal': 'Tasa diaria (%)',
    },
    placeholderTaxa: 'Ej: 1,5',
    buttonConverter: 'Convertir',
    resultTitle: 'Tasas Equivalentes',
    resultMainLabel: 'Tasa mensual',
    itemDiaria: 'Tasa diaria',
    itemMensal: 'Tasa mensual',
    itemAnual: 'Tasa anual',
    unitDiaria: '% a.d.',
    unitMensal: '% a.m.',
    unitAnual: '% a.a.',
  }
}

export function ConversorTaxasForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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

  return (
    <>
      <FormCard>
        <Select
          label={t.labelTipo}
          id="tipo"
          value={tipo}
          onChange={(v) => { setTipo(v as TipoConversao); setResult(null) }}
          options={t.options}
        />
        <Input
          label={t.labelMap[tipo]}
          id="taxa"
          value={taxa}
          onChange={(v) => setTaxa(maskPercent(v))}
          inputMode="decimal"
          placeholder={t.placeholderTaxa}
          suffix="%"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.buttonConverter}</Button>
      </FormCard>
      
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? `${result.mensal.toFixed(4).replace('.', ',')}${t.unitMensal}` : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemDiaria, value: `${result.diaria.toFixed(4).replace('.', ',')}${t.unitDiaria}` },
          { label: t.itemMensal, value: `${result.mensal.toFixed(4).replace('.', ',')}${t.unitMensal}` },
          { label: t.itemAnual, value: `${result.anual.toFixed(4).replace('.', ',')}${t.unitAnual}`, highlight: true },
        ] : []}
      />
    </>
  )
}
