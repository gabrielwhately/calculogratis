interface ReajusteAluguelInput {
  valorAtual: number
  indicePercent: number
}

interface ReajusteAluguelResult {
  valorAtual: number
  indicePercent: number
  valorReajustado: number
  diferenca: number
}

export function calcularReajusteAluguel(input: ReajusteAluguelInput): ReajusteAluguelResult {
  const valorReajustado = input.valorAtual * (1 + input.indicePercent / 100)
  const diferenca = valorReajustado - input.valorAtual
  return { valorAtual: input.valorAtual, indicePercent: input.indicePercent, valorReajustado, diferenca }
}
