interface CorrecaoInput { valorOriginal: number; indiceInicial: number; indiceFinal: number; juros: number; meses: number }
interface CorrecaoResult { valorOriginal: number; fatorCorrecao: number; valorCorrigido: number; juros: number; valorJuros: number; valorTotal: number }

export function calcularCorrecaoMonetaria(input: CorrecaoInput): CorrecaoResult {
  const fator = input.indiceFinal / input.indiceInicial
  const valorCorrigido = input.valorOriginal * fator
  const taxaMensal = input.juros / 100
  const valorJuros = valorCorrigido * taxaMensal * input.meses
  return { valorOriginal: input.valorOriginal, fatorCorrecao: fator, valorCorrigido, juros: input.juros, valorJuros, valorTotal: valorCorrigido + valorJuros }
}
