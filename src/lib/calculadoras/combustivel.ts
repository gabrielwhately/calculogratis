interface CombustivelInput {
  distancia: number
  consumo: number
  precoCombustivel: number
  pedagios?: number
}

interface CombustivelResult {
  distancia: number
  consumo: number
  litrosNecessarios: number
  custoCombustivel: number
  pedagios: number
  custoTotal: number
  custoPorKm: number
}

export function calcularCombustivel(input: CombustivelInput): CombustivelResult {
  const litrosNecessarios = input.distancia / input.consumo
  const custoCombustivel = litrosNecessarios * input.precoCombustivel
  const pedagios = input.pedagios || 0
  const custoTotal = custoCombustivel + pedagios
  const custoPorKm = input.distancia > 0 ? custoTotal / input.distancia : 0

  return {
    distancia: input.distancia,
    consumo: input.consumo,
    litrosNecessarios,
    custoCombustivel,
    pedagios,
    custoTotal,
    custoPorKm,
  }
}
