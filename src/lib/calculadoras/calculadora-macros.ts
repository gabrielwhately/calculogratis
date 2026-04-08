interface MacrosResult {
  caloriasTotal: number
  proteinas: { gramas: number; calorias: number; percentual: number }
  carboidratos: { gramas: number; calorias: number; percentual: number }
  gorduras: { gramas: number; calorias: number; percentual: number }
}

type Objetivo = 'emagrecer' | 'manter' | 'ganhar_massa'
type NivelAtividade = 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso'

const FATOR_ATIVIDADE: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muito_intenso: 1.9,
}

const AJUSTE_OBJETIVO: Record<Objetivo, number> = {
  emagrecer: -500,
  manter: 0,
  ganhar_massa: 300,
}

// Macros split by objective (protein g/kg, carb %, fat %)
const MACRO_SPLIT: Record<Objetivo, { proteinaGKg: number; gorduraPercent: number }> = {
  emagrecer: { proteinaGKg: 2.0, gorduraPercent: 25 },
  manter: { proteinaGKg: 1.6, gorduraPercent: 28 },
  ganhar_massa: { proteinaGKg: 2.2, gorduraPercent: 22 },
}

export function calcularMacros(
  pesoKg: number,
  alturaCm: number,
  idadeAnos: number,
  sexo: 'masculino' | 'feminino',
  nivelAtividade: NivelAtividade,
  objetivo: Objetivo,
): MacrosResult {
  // Mifflin-St Jeor equation for BMR
  const tmb = sexo === 'masculino'
    ? 10 * pesoKg + 6.25 * alturaCm - 5 * idadeAnos + 5
    : 10 * pesoKg + 6.25 * alturaCm - 5 * idadeAnos - 161

  const fator = FATOR_ATIVIDADE[nivelAtividade] ?? 1.2
  const caloriasTotal = Math.round(tmb * fator + AJUSTE_OBJETIVO[objetivo])

  const split = MACRO_SPLIT[objetivo]
  const proteinaGramas = Math.round(pesoKg * split.proteinaGKg)
  const proteinaCalorias = proteinaGramas * 4
  const gorduraCalorias = Math.round(caloriasTotal * (split.gorduraPercent / 100))
  const gorduraGramas = Math.round(gorduraCalorias / 9)
  const carbCalorias = caloriasTotal - proteinaCalorias - gorduraCalorias
  const carbGramas = Math.round(carbCalorias / 4)

  return {
    caloriasTotal,
    proteinas: { gramas: proteinaGramas, calorias: proteinaCalorias, percentual: Math.round((proteinaCalorias / caloriasTotal) * 100) },
    carboidratos: { gramas: carbGramas, calorias: carbCalorias, percentual: Math.round((carbCalorias / caloriasTotal) * 100) },
    gorduras: { gramas: gorduraGramas, calorias: gorduraCalorias, percentual: split.gorduraPercent },
  }
}
