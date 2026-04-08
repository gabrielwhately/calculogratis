'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPintura } from '@/lib/calculadoras/calculadora-pintura'
import { parseBRNumber } from '@/lib/formatters'

export function CalculadoraPinturaForm() {
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
        <Input label="Largura do comodo (m)" id="largura" value={largura} onChange={(v) => setLargura(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 4" />
        <Input label="Comprimento do comodo (m)" id="comprimento" value={comprimento} onChange={(v) => setComprimento(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="Ex: 5" />
        <Input label="Pe-direito / Altura (m)" id="pe-direito" value={peDireito} onChange={(v) => setPeDireito(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="2,80" />
        <Input label="Numero de portas" id="portas" value={portas} onChange={(v) => setPortas(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="1" />
        <Input label="Numero de janelas" id="janelas" value={janelas} onChange={(v) => setJanelas(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="1" />
        <Input label="Demaos de tinta" id="demaos" value={demaos} onChange={(v) => setDemaos(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="2" />
        <Input label="Rendimento da tinta (m²/litro)" id="rendimento" value={rendimento} onChange={(v) => setRendimento(v.replace(/[^\d,]/g, ''))} inputMode="decimal" placeholder="10" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular Tinta</Button>
      </div>
      <ResultCard visible={result !== null} title="Calculo de Pintura" mainValue={result ? `${result.litrosNecessarios} litros` : ''} mainLabel="Tinta necessaria"
        items={result ? [
          { label: 'Area total das paredes', value: `${result.areaTotal.toFixed(1)} m²` },
          { label: 'Area util (descontando portas/janelas)', value: `${result.areaUtil.toFixed(1)} m²` },
          { label: 'Demaos', value: `${result.demaos}` },
          { label: 'Litros necessarios', value: `${result.litrosNecessarios} L`, highlight: true },
          { label: 'Latas de 0,9L', value: `${result.latas09}` },
          { label: 'Galoes de 3,6L', value: `${result.galoes36}` },
          { label: 'Galoes de 18L', value: `${result.galoes18}` },
        ] : []} />
    </>
  )
}
