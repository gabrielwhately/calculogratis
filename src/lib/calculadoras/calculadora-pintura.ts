interface PinturaResult {
  areaTotal: number
  areaUtil: number
  litrosNecessarios: number
  galoes36: number
  galoes18: number
  latas09: number
  demaos: number
  rendimentoPorLitro: number
}

export function calcularPintura(
  largura: number,
  comprimento: number,
  peEDireito: number,
  numPortas: number = 1,
  numJanelas: number = 1,
  demaos: number = 2,
  rendimentoLitro: number = 10,
): PinturaResult {
  const areaParedes = 2 * (largura + comprimento) * peEDireito
  const areaPortas = numPortas * (0.8 * 2.1) // porta padrão 80cm x 210cm
  const areaJanelas = numJanelas * (1.2 * 1.0) // janela padrão 120cm x 100cm
  const areaUtil = Math.max(0, areaParedes - areaPortas - areaJanelas)
  const areaTotal = areaUtil * demaos
  const litros = rendimentoLitro > 0 ? areaTotal / rendimentoLitro : 0

  return {
    areaTotal: areaParedes,
    areaUtil,
    litrosNecessarios: Math.ceil(litros * 10) / 10,
    galoes36: Math.ceil(litros / 3.6),
    galoes18: Math.ceil(litros / 18),
    latas09: Math.ceil(litros / 0.9),
    demaos,
    rendimentoPorLitro: rendimentoLitro,
  }
}
