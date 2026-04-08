interface EmprestimoInput {
  valor: number
  taxaMensal: number
  parcelas: number
}

interface EmprestimoResult {
  valorEmprestimo: number
  taxaMensal: number
  parcelas: number
  valorParcela: number
  totalPago: number
  totalJuros: number
  cet: number
}

export function calcularEmprestimo(input: EmprestimoInput): EmprestimoResult {
  const { valor, taxaMensal, parcelas } = input
  const taxa = taxaMensal / 100

  // Price (parcelas fixas)
  const valorParcela = valor * (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1)
  const totalPago = valorParcela * parcelas
  const totalJuros = totalPago - valor
  // CET anual: taxa efetiva anual equivalente à mensal
  const cet = (Math.pow(1 + taxa, 12) - 1) * 100

  return { valorEmprestimo: valor, taxaMensal: input.taxaMensal, parcelas, valorParcela, totalPago, totalJuros, cet }
}
