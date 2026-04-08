interface FrequenciaCardiacaResult {
  fcMaxima: number
  fcRepouso: number
  zonas: { nome: string; minBpm: number; maxBpm: number; descricao: string }[]
}

export function calcularFrequenciaCardiaca(
  idade: number,
  fcRepouso: number = 70,
): FrequenciaCardiacaResult {
  // Tanaka formula: FCmax = 208 - 0.7 * age (more accurate than 220-age)
  const fcMaxima = Math.round(208 - 0.7 * idade)
  const reserva = fcMaxima - fcRepouso

  // Karvonen formula for heart rate zones
  function zona(minPct: number, maxPct: number): { minBpm: number; maxBpm: number } {
    return {
      minBpm: Math.round(fcRepouso + reserva * (minPct / 100)),
      maxBpm: Math.round(fcRepouso + reserva * (maxPct / 100)),
    }
  }

  return {
    fcMaxima,
    fcRepouso,
    zonas: [
      { nome: 'Aquecimento', ...zona(50, 60), descricao: 'Recuperação ativa e aquecimento leve' },
      { nome: 'Queima de gordura', ...zona(60, 70), descricao: 'Maior proporção de gordura como combustível' },
      { nome: 'Aeróbico', ...zona(70, 80), descricao: 'Melhora da capacidade cardiovascular' },
      { nome: 'Anaeróbico', ...zona(80, 90), descricao: 'Aumento de resistência e limiar anaeróbico' },
      { nome: 'VO2 Máximo', ...zona(90, 100), descricao: 'Esforço máximo, sprints e intervalados' },
    ],
  }
}
