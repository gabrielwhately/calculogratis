'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calcularCombustivel } from '@/lib/calculadoras/combustivel'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelDistancia: 'Distância (km)',
    labelConsumo: 'Consumo médio (km/l)',
    labelPreco: 'Preço do combustível (R$/l)',
    labelPedagios: 'Pedágios (R$) - opcional',
    placeholderDistancia: 'Ex: 500',
    placeholderConsumo: 'Ex: 12',
    placeholderPreco: 'Ex: 5,89',
    placeholderPedagios: 'Ex: 50,00',
    btnCalcular: 'Calcular',
    resTitle: 'Custo da Viagem',
    resMainLabel: 'Custo total estimado',
    itemDistancia: 'Distância',
    itemLitros: 'Litros necessários',
    itemCustoCombustivel: 'Custo combustível',
    itemPedagios: 'Pedágios',
    itemCustoTotal: 'Custo total',
    itemCustoKm: 'Custo por km',
    unitKm: 'km',
    unitLitros: 'litros',
  },
  es: {
    labelDistancia: 'Distancia (km)',
    labelConsumo: 'Consumo promedio (km/l)',
    labelPreco: 'Precio del combustible',
    labelPedagios: 'Peajes - opcional',
    placeholderDistancia: 'Ej: 500',
    placeholderConsumo: 'Ej: 12',
    placeholderPreco: 'Ej: 5,89',
    placeholderPedagios: 'Ej: 50,00',
    btnCalcular: 'Calcular',
    resTitle: 'Costo del Viaje',
    resMainLabel: 'Costo total estimado',
    itemDistancia: 'Distancia',
    itemLitros: 'Litros necesarios',
    itemCustoCombustivel: 'Costo combustible',
    itemPedagios: 'Peajes',
    itemCustoTotal: 'Costo total',
    itemCustoKm: 'Costo por km',
    unitKm: 'km',
    unitLitros: 'litros',
  }
}

export function CombustivelForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [distancia, setDistancia] = useState('')
  const [consumo, setConsumo] = useState('')
  const [preco, setPreco] = useState('')
  const [pedagios, setPedagios] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularCombustivel> | null>(null)

  function handleCalcular() {
    setResult(calcularCombustivel({ 
      distancia: parseBRNumber(distancia), 
      consumo: parseBRNumber(consumo), 
      precoCombustivel: parseBRNumber(preco), 
      pedagios: parseBRNumber(pedagios) 
    }))
  }

  const isValid = parseBRNumber(distancia) > 0 && parseBRNumber(consumo) > 0 && parseBRNumber(preco) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelDistancia} 
          value={distancia} 
          onChange={(v) => setDistancia(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderDistancia} 
        />
        <Input 
          label={t.labelConsumo} 
          value={consumo} 
          onChange={(v) => setConsumo(v.replace(/[^\d,]/g, ''))} 
          inputMode="decimal" 
          placeholder={t.placeholderConsumo} 
        />
        <Input 
          label={t.labelPreco} 
          value={preco} 
          onChange={(v) => setPreco(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderPreco} 
        />
        <Input 
          label={t.labelPedagios} 
          value={pedagios} 
          onChange={(v) => setPedagios(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderPedagios} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </FormCard>

      <ResultCard 
        visible={result !== null} 
        title={t.resTitle} 
        mainValue={result ? formatCurrency(result.custoTotal) : ''} 
        mainLabel={t.resMainLabel}
        items={result ? [
          { label: t.itemDistancia, value: `${result.distancia.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR')} ${t.unitKm}` },
          { label: t.itemLitros, value: `${result.litrosNecessarios.toFixed(1)} ${t.unitLitros}` },
          { label: t.itemCustoCombustivel, value: formatCurrency(result.custoCombustivel) },
          ...(result.pedagios > 0 ? [{ label: t.itemPedagios, value: formatCurrency(result.pedagios) }] : []),
          { label: t.itemCustoTotal, value: formatCurrency(result.custoTotal), highlight: true },
          { label: t.itemCustoKm, value: formatCurrency(result.custoPorKm) },
        ] : []} 
      />
    </>
  )
}
