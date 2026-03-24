interface JurosCompostosInput { capital: number; taxaMensal: number; meses: number; aporteMensal: number }
interface MesEvolucao { mes: number; saldo: number; aporte: number; juros: number }
interface JurosCompostosResult { capital: number; montante: number; juros: number; totalInvestido: number; taxaMensal: number; meses: number; evolucao: MesEvolucao[] }

export function calcularJurosCompostos(input: JurosCompostosInput): JurosCompostosResult {
  const taxa = input.taxaMensal / 100
  const evolucao: MesEvolucao[] = []
  let saldo = input.capital
  for (let mes = 1; mes <= input.meses; mes++) {
    const jurosMes = saldo * taxa
    saldo = saldo + jurosMes + input.aporteMensal
    evolucao.push({ mes, saldo, aporte: input.aporteMensal, juros: jurosMes })
  }
  const totalInvestido = input.capital + input.aporteMensal * input.meses
  return { capital: input.capital, montante: saldo, juros: saldo - totalInvestido, totalInvestido, taxaMensal: input.taxaMensal, meses: input.meses, evolucao }
}
