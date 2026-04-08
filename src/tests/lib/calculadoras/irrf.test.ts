import { describe, it, expect } from 'vitest'
import { calcularIRRF } from '@/lib/calculadoras/irrf'

describe('calcularIRRF', () => {
  it('calculates IRRF for a given salary', () => {
    const r = calcularIRRF({ salarioBruto: 5000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
    expect(r.inss).toBeGreaterThan(0)
    expect(r.irrf).toBeGreaterThan(0)
    expect(r.baseCalculo).toBeGreaterThan(0)
  })
  it('exempts low salary from IRRF', () => {
    const r = calcularIRRF({ salarioBruto: 2000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
    expect(r.irrf).toBe(0)
  })
  it('reduces IRRF with dependents', () => {
    const r0 = calcularIRRF({ salarioBruto: 5000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
    const r2 = calcularIRRF({ salarioBruto: 5000, dependentes: 2, pensaoAlimenticia: 0, outrasDeducoes: 0 })
    expect(r2.irrf).toBeLessThanOrEqual(r0.irrf)
  })
})
