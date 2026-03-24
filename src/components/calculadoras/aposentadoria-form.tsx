'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'
import { formatCurrency, formatPercent, parseBRNumber } from '@/lib/formatters'

export function AposentadoriaForm() {
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState('masculino')
  const [anos, setAnos] = useState('')
  const [media, setMedia] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularAposentadoria> | null>(null)

  function handleCalcular() {
    setResult(calcularAposentadoria({ idade: parseInt(idade) || 0, sexo: sexo as 'masculino' | 'feminino', anosContribuicao: parseInt(anos) || 0, mediaSalarios: parseBRNumber(media) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Sua idade" id="idade" value={idade} onChange={setIdade} inputMode="numeric" placeholder="Ex: 55" />
        <Select label="Sexo" id="sexo" value={sexo} onChange={setSexo} options={[{ value: 'masculino', label: 'Masculino' }, { value: 'feminino', label: 'Feminino' }]} />
        <Input label="Anos de contribuicao" id="anos" value={anos} onChange={setAnos} inputMode="numeric" placeholder="Ex: 20" />
        <Input label="Media salarial (R$)" id="media" value={media} onChange={setMedia} inputMode="decimal" placeholder="Ex: 4.000,00" />
        <Button onClick={handleCalcular} fullWidth disabled={parseInt(idade) <= 0 || parseBRNumber(media) <= 0}>Simular Aposentadoria</Button>
      </div>
      <ResultCard visible={result !== null} title={result?.podeAposentar ? 'Voce pode se aposentar!' : 'Ainda nao pode se aposentar'} mainValue={result ? formatCurrency(result.valorEstimado) : ''} mainLabel="Valor estimado do beneficio"
        items={result ? [{ label: 'Situacao', value: result.podeAposentar ? 'Apto' : `Faltam ${result.anosRestantes} anos`, highlight: true }, { label: 'Idade minima', value: `${result.idadeMinima} anos` },
          { label: 'Tempo minimo', value: `${result.tempoMinimoContribuicao} anos` }, { label: 'Percentual', value: formatPercent(result.percentualBeneficio) },
          ...result.motivoNegativa.map(m => ({ label: 'Pendencia', value: m }))] : []} />
    </>
  )
}
