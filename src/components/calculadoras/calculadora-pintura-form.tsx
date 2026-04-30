'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPintura } from '@/lib/calculadoras/calculadora-pintura'
import { parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelLargura: 'Largura do cômodo (m)',
    labelComprimento: 'Comprimento do cômodo (m)',
    labelPeDireito: 'Pé-direito / Altura (m)',
    labelPortas: 'Número de portas',
    labelJanelas: 'Número de janelas',
    labelDemaos: 'Demãos de tinta',
    labelRendimento: 'Rendimento da tinta (m²/litro)',
    placeholderLargura: 'Ex: 4',
    placeholderComprimento: 'Ex: 5',
    placeholderPeDireito: '2,80',
    placeholderPortas: '1',
    placeholderJanelas: '1',
    placeholderDemaos: '2',
    placeholderRendimento: '10',
    btnCalcular: 'Calcular Tinta',
    resTitle: 'Cálculo de Pintura',
    resMainLabel: 'Tinta necessária',
    itemAreaTotal: 'Área total das paredes',
    itemAreaUtil: 'Área útil (descontando portas/janelas)',
    itemDemaos: 'Demãos',
    itemLitros: 'Litros necessários',
    itemLatas09: 'Latas de 0,9L',
    itemGaloes36: 'Galões de 3,6L',
    itemGaloes18: 'Galões de 18L',
  },
  es: {
    labelLargura: 'Ancho de la habitación (m)',
    labelComprimento: 'Largo de la habitación (m)',
    labelPeDireito: 'Altura de la pared (m)',
    labelPortas: 'Número de puertas',
    labelJanelas: 'Número de ventanas',
    labelDemaos: 'Manos de pintura',
    labelRendimento: 'Rendimiento de la pintura (m²/litro)',
    placeholderLargura: 'Ej: 4',
    placeholderComprimento: 'Ej: 5',
    placeholderPeDireito: '2,80',
    placeholderPortas: '1',
    placeholderJanelas: '1',
    placeholderDemaos: '2',
    placeholderRendimento: '10',
    btnCalcular: 'Calcular Pintura',
    resTitle: 'Cálculo de Pintura',
    resMainLabel: 'Pintura necesaria',
    itemAreaTotal: 'Área total de las paredes',
    itemAreaUtil: 'Área útil (descontando puertas/ventanas)',
    itemDemaos: 'Manos',
    itemLitros: 'Litros necesarios',
    itemLatas09: 'Latas de 0,9L',
    itemGaloes36: 'Galones de 3,6L',
    itemGaloes18: 'Galones de 18L',
  }
}

export function CalculadoraPinturaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [largura, setLargura] = useState('')
  const [comprimento, setComprimento] = useState('')
  const [peDireito, setPeDireito] = useState('2,80')
  const [portas, setPortas] = useState('1')
  const [janelas, setJanelas] = useState('1')
  const [demaos, setDemaos] = useState('2')
  const [rendimento, setRendimento] = useState('10')
  const [result, setResult] = useState<ReturnType<typeof calcularPintura> | null>(null)

  function handleCalcular() {
    setResult(calcularPintura(
      parseBRNumber(largura), parseBRNumber(comprimento), parseBRNumber(peDireito),
      parseInt(portas) || 1, parseInt(janelas) || 1, parseInt(demaos) || 2, parseBRNumber(rendimento) || 10,
    ))
  }

  const isValid = parseBRNumber(largura) > 0 && parseBRNumber(comprimento) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label={t.labelLargura} id="largura" value={largura} onChange={(v) => setLargura(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder={t.placeholderLargura} />
        <Input label={t.labelComprimento} id="comprimento" value={comprimento} onChange={(v) => setComprimento(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder={t.placeholderComprimento} />
        <Input label={t.labelPeDireito} id="pe-direito" value={peDireito} onChange={(v) => setPeDireito(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder={t.placeholderPeDireito} />
        <Input label={t.labelPortas} id="portas" value={portas} onChange={(v) => setPortas(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderPortas} />
        <Input label={t.labelJanelas} id="janelas" value={janelas} onChange={(v) => setJanelas(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderJanelas} />
        <Input label={t.labelDemaos} id="demaos" value={demaos} onChange={(v) => setDemaos(v.replace(/\D/g, ''))} inputMode="numeric" placeholder={t.placeholderDemaos} />
        <Input label={t.labelRendimento} id="rendimento" value={rendimento} onChange={(v) => setRendimento(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder={t.placeholderRendimento} />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </div>
      <ResultCard visible={result !== null} title={t.resTitle} mainValue={result ? `${result.litrosNecessarios} litros`.replace('litros', isSpanish ? 'litros' : 'litros') : ''} mainLabel={t.resMainLabel}
        items={result ? [
          { label: t.itemAreaTotal, value: `${result.areaTotal.toFixed(1)} m²` },
          { label: t.itemAreaUtil, value: `${result.areaUtil.toFixed(1)} m²` },
          { label: t.itemDemaos, value: `${result.demaos}` },
          { label: t.itemLitros, value: `${result.litrosNecessarios} L`, highlight: true },
          { label: t.itemLatas09, value: `${result.latas09}` },
          { label: t.itemGaloes36, value: `${result.galoes36}` },
          { label: t.itemGaloes18, value: `${result.galoes18}` },
        ] : []} />
    </>
  )
}
