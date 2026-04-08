interface AguaDiariaResult {
  mlPorDia: number
  litrosPorDia: number
  coposPorDia: number
  mlPorRefeicao: number
}

type NivelAtividade = 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso'

const FATOR_ATIVIDADE: Record<NivelAtividade, number> = {
  sedentario: 1.0,
  leve: 1.1,
  moderado: 1.2,
  intenso: 1.3,
  muito_intenso: 1.4,
}

export function calcularAguaDiaria(pesoKg: number, nivelAtividade: NivelAtividade): AguaDiariaResult {
  const mlBase = pesoKg * 35
  const fator = FATOR_ATIVIDADE[nivelAtividade] ?? 1.0
  const mlPorDia = Math.round(mlBase * fator)
  return {
    mlPorDia,
    litrosPorDia: mlPorDia / 1000,
    coposPorDia: Math.ceil(mlPorDia / 250),
    mlPorRefeicao: Math.round(mlPorDia / 6),
  }
}
