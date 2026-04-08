interface SimuladorInvestimentosInput {
  valorInicial: number
  aporteMensal: number
  taxaAnual: number
  meses: number
}

interface SimuladorInvestimentosResult {
  valorInicial: number
  totalInvestido: number
  totalJuros: number
  montanteFinal: number
  rentabilidadePercent: number
}

export function calcularSimuladorInvestimentos(input: SimuladorInvestimentosInput): SimuladorInvestimentosResult {
  const taxaMensal = Math.pow(1 + input.taxaAnual / 100, 1 / 12) - 1
  let saldo = input.valorInicial
  for (let mes = 1; mes <= input.meses; mes++) {
    saldo = saldo * (1 + taxaMensal) + input.aporteMensal
  }
  const totalInvestido = input.valorInicial + input.aporteMensal * input.meses
  const totalJuros = saldo - totalInvestido
  const rentabilidadePercent = totalInvestido > 0 ? (totalJuros / totalInvestido) * 100 : 0
  return { valorInicial: input.valorInicial, totalInvestido, totalJuros, montanteFinal: saldo, rentabilidadePercent }
}
