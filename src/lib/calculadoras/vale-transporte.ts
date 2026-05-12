export interface ResultadoValeTransporte {
  descontoEmpregado: number
  custoEmpregador: number
  custoTotal: number
  percentualDesconto: number
}

/**
 * Calcula o Vale-Transporte conforme a CLT brasileira.
 * 
 * Regras:
 * - O desconto máximo do empregado é de 6% do seu salário base.
 * - O empregador paga a diferença entre o custo total do transporte e o desconto do empregado.
 * - Se o desconto de 6% for superior ao custo do transporte, o empregado paga apenas o valor do custo.
 */
export function calcularValeTransporte(salarioBase: number, custoMensal: number): ResultadoValeTransporte {
  const taxaDesconto = 0.06
  const descontoMaximo = salarioBase * taxaDesconto
  const descontoEfetivo = Math.min(descontoMaximo, custoMensal)
  const custoEmpregador = Math.max(0, custoMensal - descontoEfetivo)
  const percentualEfetivo = salarioBase > 0 ? (descontoEfetivo / salarioBase) * 100 : 0

  return {
    descontoEmpregado: Number(descontoEfetivo.toFixed(2)),
    custoEmpregador: Number(custoEmpregador.toFixed(2)),
    custoTotal: Number(custoMensal.toFixed(2)),
    percentualDesconto: Number(percentualEfetivo.toFixed(2))
  }
}
