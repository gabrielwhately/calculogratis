import { describe, it, expect } from 'vitest'
import { calcularEmprestimo } from '@/lib/calculadoras/emprestimo'

describe('calcularEmprestimo', () => {
  it('calculates monthly payment and total interest', () => {
    const r = calcularEmprestimo({ valor: 10000, taxaMensal: 2, parcelas: 12 })
    expect(r.valorParcela).toBeGreaterThan(0)
    expect(r.totalPago).toBeGreaterThan(10000)
    expect(r.totalJuros).toBeGreaterThan(0)
  })
  it('total paid equals parcela times parcelas', () => {
    const r = calcularEmprestimo({ valor: 10000, taxaMensal: 1.5, parcelas: 24 })
    expect(r.totalPago).toBeCloseTo(r.valorParcela * 24, 0)
  })
})
