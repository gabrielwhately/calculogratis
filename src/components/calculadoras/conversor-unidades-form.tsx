'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { converterUnidade, getUnidades, getNomeUnidade } from '@/lib/calculadoras/conversor-unidades'
import { parseBRNumber } from '@/lib/formatters'

type Categoria = 'comprimento' | 'peso' | 'temperatura' | 'volume'

const I18N = {
  pt: {
    labelCategoria: 'Categoria',
    labelDe: 'De',
    labelPara: 'Para',
    labelValor: 'Valor',
    btnConverter: 'Converter',
    resultTitle: 'Resultado da conversão',
    resultMainLabel: 'Valor convertido',
    catComprimento: 'Comprimento',
    catPeso: 'Peso / Massa',
    catTemperatura: 'Temperatura',
    catVolume: 'Volume',
    units: {
      m: 'Metros', km: 'Quilômetros', cm: 'Centímetros', mm: 'Milímetros', mi: 'Milhas', yd: 'Jardas', ft: 'Pés', in: 'Polegadas',
      kg: 'Quilogramas', g: 'Gramas', mg: 'Miligramas', t: 'Toneladas', lb: 'Libras', oz: 'Onças',
      l: 'Litros', ml: 'Mililitros', m3: 'Metros cúbicos', gal: 'Galões', qt: 'Quartos', cup: 'Xícaras',
      C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin',
    } as Record<string, string>
  },
  es: {
    labelCategoria: 'Categoría',
    labelDe: 'De',
    labelPara: 'Para',
    labelValor: 'Valor',
    btnConverter: 'Convertir',
    resultTitle: 'Resultado de la conversión',
    resultMainLabel: 'Valor convertido',
    catComprimento: 'Longitud',
    catPeso: 'Peso / Masa',
    catTemperatura: 'Temperatura',
    catVolume: 'Volumen',
    units: {
      m: 'Metros', km: 'Kilómetros', cm: 'Centímetros', mm: 'Milímetros', mi: 'Millas', yd: 'Yardas', ft: 'Pies', in: 'Pulgadas',
      kg: 'Kilogramos', g: 'Gramos', mg: 'Miligramos', t: 'Toneladas', lb: 'Libras', oz: 'Onzas',
      l: 'Litros', ml: 'Mililitros', m3: 'Metros cúbicos', gal: 'Galones', qt: 'Cuartos', cup: 'Tazas',
      C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin',
    } as Record<string, string>
  }
}

export function ConversorUnidadesForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [categoria, setCategoria] = useState<Categoria>('comprimento')
  const [de, setDe] = useState('m')
  const [para, setPara] = useState('km')
  const [valor, setValor] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const categorias = [
    { value: 'comprimento', label: t.catComprimento },
    { value: 'peso', label: t.catPeso },
    { value: 'temperatura', label: t.catTemperatura },
    { value: 'volume', label: t.catVolume },
  ]

  function handleCategoriaChange(cat: string) {
    const newCat = cat as Categoria
    setCategoria(newCat)
    const unidades = getUnidades(newCat)
    setDe(unidades[0]?.value || '')
    setPara(unidades[1]?.value || '')
    setResult(null)
  }

  function handleCalcular() {
    const num = parseBRNumber(valor)
    if (isNaN(num)) return
    setResult(converterUnidade(num, de, para, categoria))
  }

  const unidades = getUnidades(categoria).map(u => ({
    ...u,
    label: t.units[u.value] || u.label
  }))

  const isValid = valor.trim().length > 0 && !isNaN(parseBRNumber(valor))

  function formatResult(n: number): string {
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-4 && n !== 0)) {
      return n.toExponential(6)
    }
    const s = parseFloat(n.toPrecision(10)).toString()
    return s
  }

  const resultItems = result !== null ? [
    { 
      label: `${t.units[de] || getNomeUnidade(de)} → ${t.units[para] || getNomeUnidade(para)}`, 
      value: `${parseBRNumber(valor).toLocaleString(isSpanish ? 'es-ES' : 'pt-BR')} ${de} = ${formatResult(result)} ${para}` 
    }
  ] : []

  return (
    <>
      <FormCard>
        <Select
          label={t.labelCategoria}
          id="categoria"
          value={categoria}
          onChange={handleCategoriaChange}
          options={categorias}
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label={t.labelDe}
            id="de"
            value={de}
            onChange={(v) => { setDe(v); setResult(null) }}
            options={unidades}
          />
          <Select
            label={t.labelPara}
            id="para"
            value={para}
            onChange={(v) => { setPara(v); setResult(null) }}
            options={unidades}
          />
        </div>
        <Input
          label={t.labelValor}
          id="valor"
          value={valor}
          onChange={(v) => { setValor(v); setResult(null) }}
          inputMode="decimal"
          placeholder="Ex: 100"
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnConverter}</Button>
      </FormCard>

      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result !== null ? formatResult(result) : ''}
        mainLabel={t.units[para] || getNomeUnidade(para)}
        items={resultItems}
      />
    </>
  )
}
