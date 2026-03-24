interface JurosSimplesInput { capital: number; taxaMensal: number; meses: number }
interface JurosSimplesResult { capital: number; juros: number; montante: number; taxaMensal: number; meses: number }

export function calcularJurosSimples(input: JurosSimplesInput): JurosSimplesResult {
  const taxa = input.taxaMensal / 100
  const juros = input.capital * taxa * input.meses
  return { capital: input.capital, juros, montante: input.capital + juros, taxaMensal: input.taxaMensal, meses: input.meses }
}
