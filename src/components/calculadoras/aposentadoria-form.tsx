'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'
import { formatCurrency, formatPercent, parseBRNumber } from '@/lib/formatters'

const I18N = {
  pt: {
    labelIdade: 'Sua idade',
    labelSexo: 'Sexo',
    labelAnos: 'Anos de contribuição',
    labelMedia: 'Média salarial (R$)',
    placeholderIdade: 'Ex: 55',
    placeholderAnos: 'Ex: 20',
    placeholderMedia: 'Ex: 4.000,00',
    sexoMasc: 'Masculino',
    sexoFem: 'Feminino',
    buttonSimular: 'Simular Aposentadoria',
    resultTitlePode: 'Você pode se aposentar!',
    resultTitleNaoPode: 'Ainda não pode se aposentar',
    resultMainLabel: 'Valor estimado do benefício',
    labelSituacao: 'Situação',
    labelIdadeMinima: 'Idade mínima',
    labelTempoMinimo: 'Tempo mínimo',
    labelPercentual: 'Percentual',
    labelPendencia: 'Pendência',
    valueApto: 'Apto',
    valueFaltam: 'Faltam',
    unitAnos: 'anos'
  },
  es: {
    labelIdade: 'Su edad',
    labelSexo: 'Sexo',
    labelAnos: 'Años de contribución',
    labelMedia: 'Promedio salarial',
    placeholderIdade: 'Ej: 55',
    placeholderAnos: 'Ej: 20',
    placeholderMedia: 'Ej: 4.000,00',
    sexoMasc: 'Masculino',
    sexoFem: 'Femenino',
    buttonSimular: 'Simular Jubilación',
    resultTitlePode: '¡Usted puede jubilarse!',
    resultTitleNaoPode: 'Aún no puede jubilarse',
    resultMainLabel: 'Valor estimado del beneficio',
    labelSituacao: 'Situación',
    labelIdadeMinima: 'Edad mínima',
    labelTempoMinimo: 'Tiempo mínimo',
    labelPercentual: 'Porcentaje',
    labelPendencia: 'Pendencia',
    valueApto: 'Apto',
    valueFaltam: 'Faltan',
    unitAnos: 'años'
  }
}

export function AposentadoriaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState('masculino')
  const [anos, setAnos] = useState('')
  const [media, setMedia] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularAposentadoria> | null>(null)

  function handleCalcular() {
    setResult(calcularAposentadoria({ 
      idade: parseInt(idade) || 0, 
      sexo: sexo as 'masculino' | 'feminino', 
      anosContribuicao: parseInt(anos) || 0, 
      mediaSalarios: parseBRNumber(media) 
    }))
  }

  return (
    <>
      <FormCard>
        <Input label={t.labelIdade} id="idade" value={idade} onChange={setIdade} inputMode="numeric" placeholder={t.placeholderIdade} />
        <Select 
          label={t.labelSexo} 
          id="sexo" 
          value={sexo} 
          onChange={setSexo} 
          options={[{ value: 'masculino', label: t.sexoMasc }, { value: 'feminino', label: t.sexoFem }]} 
        />
        <Input label={t.labelAnos} id="anos" value={anos} onChange={setAnos} inputMode="numeric" placeholder={t.placeholderAnos} />
        <Input label={t.labelMedia} id="media" value={media} onChange={setMedia} inputMode="decimal" placeholder={t.placeholderMedia} />
        <Button onClick={handleCalcular} fullWidth disabled={parseInt(idade) <= 0 || parseBRNumber(media) <= 0}>
          {t.buttonSimular}
        </Button>
      </FormCard>
      <ResultCard 
        visible={result !== null} 
        title={result?.podeAposentar ? t.resultTitlePode : t.resultTitleNaoPode} 
        mainValue={result ? formatCurrency(result.valorEstimado) : ''} 
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.labelSituacao, value: result.podeAposentar ? t.valueApto : `${t.valueFaltam} ${result.anosRestantes} ${t.unitAnos}`, highlight: true }, 
          { label: t.labelIdadeMinima, value: `${result.idadeMinima} ${t.unitAnos}` },
          { label: t.labelTempoMinimo, value: `${result.tempoMinimoContribuicao} ${t.unitAnos}` }, 
          { label: t.labelPercentual, value: formatPercent(result.percentualBeneficio) },
          ...result.motivoNegativa.map(m => ({ label: t.labelPendencia, value: m }))
        ] : []} 
      />
    </>
  )
}
