interface SimuladorInvestimentosInput {
  valorInicial: number
  aporteMensal: number
  taxaAnual: number
  meses: number
}

interface MesEvolucao {
  mes: number
  saldo: number
  investido: number
  jurosAcumulado: number
}

interface SimuladorInvestimentosResult {
  valorInicial: number
  totalInvestido: number
  totalJuros: number
  montanteFinal: number
  rentabilidadePercent: number
  evolucao: MesEvolucao[]
}

export function calcularSimuladorInvestimentos(input: SimuladorInvestimentosInput): SimuladorInvestimentosResult {
  const taxaMensal = Math.pow(1 + input.taxaAnual / 100, 1 / 12) - 1
  let saldo = input.valorInicial
  let investido = input.valorInicial
  const evolucao: MesEvolucao[] = []
  
  evolucao.push({ mes: 0, saldo, investido, jurosAcumulado: 0 })

  for (let mes = 1; mes <= input.meses; mes++) {
    const jurosMes = saldo * taxaMensal
    saldo = saldo + jurosMes + input.aporteMensal
    investido = investido + input.aporteMensal
    evolucao.push({ mes, saldo, investido, jurosAcumulado: saldo - investido })
  }
  
  const totalInvestido = investido
  const totalJuros = saldo - totalInvestido
  const rentabilidadePercent = totalInvestido > 0 ? (totalJuros / totalInvestido) * 100 : 0
  
  return { 
    valorInicial: input.valorInicial, 
    totalInvestido, 
    totalJuros, 
    montanteFinal: saldo, 
    rentabilidadePercent,
    evolucao
  }
}
