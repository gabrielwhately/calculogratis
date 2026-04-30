'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularConsorcio } from '@/lib/calculadoras/simulador-consorcio'
import { formatCurrency, parseBRNumber, maskCurrency, maskPercent } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValor: 'Valor do bem (R$)',
    labelPrazo: 'Prazo (meses)',
    labelTaxa: 'Taxa de administração anual (%)',
    labelFundo: 'Fundo de reserva (%)',
    placeholderValor: 'Ex: 150.000,00',
    placeholderPrazo: 'Ex: 60',
    placeholderTaxa: 'Ex: 12',
    placeholderFundo: 'Ex: 1',
    buttonCalcular: 'Simular Consórcio',
    resultTitle: 'Simulação de Consórcio',
    resultMainLabel: 'Valor da parcela',
    itemValorBem: 'Valor do bem',
    itemPrazo: 'Prazo',
    itemTaxaTotal: 'Taxa de administração total',
    itemFundo: 'Fundo de reserva',
    itemTotal: 'Total pago',
    itemCustoAcima: 'Custo acima do bem',
    labelMeses: 'meses',
  },
  es: {
    labelValor: 'Valor del bien',
    labelPrazo: 'Plazo (meses)',
    labelTaxa: 'Tasa de administración anual (%)',
    labelFundo: 'Fondo de reserva (%)',
    placeholderValor: 'Ej: 150.000,00',
    placeholderPrazo: 'Ej: 60',
    placeholderTaxa: 'Ej: 12',
    placeholderFundo: 'Ej: 1',
    buttonCalcular: 'Simular Consorcio',
    resultTitle: 'Simulación de Consorcio',
    resultMainLabel: 'Valor de la cuota',
    itemValorBem: 'Valor del bien',
    itemPrazo: 'Plazo',
    itemTaxaTotal: 'Tasa de administración total',
    itemFundo: 'Fondo de reserva',
    itemTotal: 'Total pagado',
    itemCustoAcima: 'Costo por encima del bien',
    labelMeses: 'meses',
  }
}

export function SimuladorConsorcioForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [valor, setValor] = useState('')
  const [prazo, setPrazo] = useState('60')
  const [taxa, setTaxa] = useState('12')
  const [fundo, setFundo] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularConsorcio> | null>(null)

  function handleCalcular() {
    setResult(calcularConsorcio(parseBRNumber(valor), parseInt(prazo) || 60, parseBRNumber(taxa), parseBRNumber(fundo)))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(prazo) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelValor} 
          id="valor" 
          value={valor} 
          onChange={(v) => setValor(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderValor} 
        />
        <Input 
          label={t.labelPrazo} 
          id="prazo" 
          value={prazo} 
          onChange={(v) => setPrazo(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderPrazo} 
        />
        <Input 
          label={t.labelTaxa} 
          id="taxa" 
          value={taxa} 
          onChange={(v) => setTaxa(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderTaxa} 
          suffix="%" 
        />
        <Input 
          label={t.labelFundo} 
          id="fundo" 
          value={fundo} 
          onChange={(v) => setFundo(maskPercent(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderFundo} 
          suffix="%" 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={t.resultTitle} 
          mainValue={formatCurrency(result.parcela)} 
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemValorBem, value: formatCurrency(result.valorBem) },
            { label: t.itemPrazo, value: `${result.prazoMeses} ${t.labelMeses}` },
            { label: t.itemTaxaTotal, value: formatCurrency(result.custoAdminTotal) },
            { label: t.itemFundo, value: formatCurrency(result.fundoReserva) },
            { label: t.itemTotal, value: formatCurrency(result.totalComTaxas), highlight: true },
            { label: t.itemCustoAcima, value: formatCurrency(result.totalComTaxas - result.valorBem), highlight: true },
          ]} 
        />
      )}
    </>
  )
}
