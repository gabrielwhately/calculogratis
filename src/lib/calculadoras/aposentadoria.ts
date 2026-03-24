import { PREVIDENCIA } from '@/lib/constants/tabelas-2026'

interface AposInput { idade: number; sexo: 'masculino' | 'feminino'; anosContribuicao: number; mediaSalarios: number }
interface AposResult {
  podeAposentar: boolean; idadeMinima: number; tempoMinimoContribuicao: number
  anosRestantes: number; percentualBeneficio: number; valorEstimado: number; motivoNegativa: string[]
}

export function calcularAposentadoria(input: AposInput): AposResult {
  const idadeMin = input.sexo === 'masculino' ? PREVIDENCIA.idade_minima_homem : PREVIDENCIA.idade_minima_mulher
  const tempoMin = input.sexo === 'masculino' ? PREVIDENCIA.tempo_contribuicao_minimo_homem : PREVIDENCIA.tempo_contribuicao_minimo_mulher
  const motivos: string[] = []
  if (input.idade < idadeMin) motivos.push(`Idade minima: ${idadeMin} anos (faltam ${idadeMin - input.idade})`)
  if (input.anosContribuicao < tempoMin) motivos.push(`Tempo minimo: ${tempoMin} anos (faltam ${tempoMin - input.anosContribuicao})`)
  const anosRestantes = Math.max(Math.max(0, idadeMin - input.idade), Math.max(0, tempoMin - input.anosContribuicao))
  const anosExtra = Math.max(0, input.anosContribuicao - tempoMin)
  const pct = Math.min(PREVIDENCIA.aliquota_base + anosExtra * PREVIDENCIA.acrescimo_por_ano_extra, 1)
  return { podeAposentar: motivos.length === 0, idadeMinima: idadeMin, tempoMinimoContribuicao: tempoMin, anosRestantes, percentualBeneficio: pct, valorEstimado: input.mediaSalarios * pct, motivoNegativa: motivos }
}
