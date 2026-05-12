import { describe, it, expect } from 'vitest'

export function calcularValeTransporte(salarioBase: number, custoMensal: number) {
  const descontoMaximo = salarioBase * 0.06
  const descontoEfetivo = Math.min(descontoMaximo, custoMensal)
  const custoEmpregador = Math.max(0, custoMensal - descontoEfetivo)

  return {
    descontoEmpregado: Number(descontoEfetivo.toFixed(2)),
    custoEmpregador: Number(custoEmpregador.toFixed(2)),
    custoTotal: Number(custoMensal.toFixed(2))
  }
}

describe('Lógica Vale-Transporte', () => {
  it('deve calcular corretamente quando o desconto de 6% é menor que o custo total', () => {
    // Salário: 2000, 6% = 120. Custo: 300.
    // Empregado paga 120, Empregador paga 180.
    const resultado = calcularValeTransporte(2000, 300)
    expect(resultado.descontoEmpregado).toBe(120)
    expect(resultado.custoEmpregador).toBe(180)
  })

  it('deve calcular corretamente quando o desconto de 6% é maior que o custo total', () => {
    // Salário: 5000, 6% = 300. Custo: 200.
    // Empregado paga 200, Empregador paga 0.
    const resultado = calcularValeTransporte(5000, 200)
    expect(resultado.descontoEmpregado).toBe(200)
    expect(resultado.custoEmpregador).toBe(0)
  })
})
