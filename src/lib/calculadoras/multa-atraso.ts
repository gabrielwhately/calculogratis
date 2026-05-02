interface MultaAtrasoInput { valor: number; diasAtraso: number; multaPercent: number; jurosDiario: number }
interface MultaAtrasoResult { valorOriginal: number; diasAtraso: number; multa: number; multaPercent: number; juros: number; jurosDiario: number; valorTotal: number }

export function calcularMultaAtraso(input: MultaAtrasoInput): MultaAtrasoResult {
  const multa = input.valor * (input.multaPercent / 100)
  const juros = input.valor * (input.jurosDiario / 100) * input.diasAtraso
  return { 
    valorOriginal: input.valor, 
    diasAtraso: input.diasAtraso, 
    multa, 
    multaPercent: input.multaPercent,
    juros, 
    jurosDiario: input.jurosDiario,
    valorTotal: input.valor + multa + juros 
  }
}
