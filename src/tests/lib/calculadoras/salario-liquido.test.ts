import { describe, it, expect } from 'vitest'
import { calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'

describe('calcularSalarioLiquido', () => {
  it('calculates for minimum wage', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 1412, dependentes: 0, outrosDescontos: 0 })
    expect(r.inss).toBeGreaterThan(0)
    expect(r.irrf).toBe(0)
    expect(r.salarioLiquido).toBeLessThan(1412)
  })
  it('calculates IRRF for higher salary', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 0, outrosDescontos: 0 })
    expect(r.irrf).toBeGreaterThan(0)
  })
  it('deducts dependents from IRRF base', () => {
    const withDep = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 2, outrosDescontos: 0 })
    const noDep = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 0, outrosDescontos: 0 })
    expect(withDep.irrf).toBeLessThan(noDep.irrf)
  })
})
