import { describe, it, expect } from 'vitest'
import { calcularINSS, calcularIRRF, calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'

describe('calcularINSS', () => {
  it('salary in first bracket uses 7.5% flat', () => {
    // R$1412 * 0.075 = 105.90
    expect(calcularINSS(1412)).toBeCloseTo(105.90, 1)
  })

  it('salary spanning multiple brackets applies progressive rates', () => {
    const inss = calcularINSS(5000)
    // Manual: 1412*0.075 + (2666.68-1412)*0.09 + (4000.03-2666.68)*0.12 + (5000-4000.03)*0.14
    const expected =
      1412 * 0.075 +
      (2666.68 - 1412) * 0.09 +
      (4000.03 - 2666.68) * 0.12 +
      (5000 - 4000.03) * 0.14
    expect(inss).toBeCloseTo(expected, 1)
  })

  it('salary above ceiling (R$7786.02) is capped at maximum INSS', () => {
    const atCeiling = calcularINSS(7786.02)
    const aboveCeiling = calcularINSS(20000)
    expect(aboveCeiling).toBeCloseTo(atCeiling, 2)
  })

  it('zero salary yields zero INSS', () => {
    expect(calcularINSS(0)).toBe(0)
  })
})

describe('calcularIRRF (from salario-liquido)', () => {
  it('base below exemption threshold returns 0', () => {
    expect(calcularIRRF(2000)).toBe(0)
  })

  it('base at exactly exemption ceiling (2259.20) returns 0', () => {
    expect(calcularIRRF(2259.20)).toBe(0)
  })

  it('base just above exemption applies 7.5% bracket', () => {
    // 2300 * 0.075 - 169.44 = 172.5 - 169.44 = 3.06
    expect(calcularIRRF(2300)).toBeCloseTo(2300 * 0.075 - 169.44, 1)
  })

  it('base in top bracket applies 27.5%', () => {
    const irrf = calcularIRRF(10000)
    expect(irrf).toBeCloseTo(10000 * 0.275 - 896, 1)
  })

  it('returns 0 for negative base (over-deducted)', () => {
    expect(calcularIRRF(-100)).toBe(0)
  })
})

describe('calcularSalarioLiquido', () => {
  it('minimum salary worker near minimum has near-zero IRRF', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 1412, dependentes: 0, outrosDescontos: 0 })
    expect(r.irrf).toBe(0)
    expect(r.inss).toBeGreaterThan(0)
    expect(r.salarioLiquido).toBeGreaterThan(0)
    expect(r.salarioLiquido).toBeLessThan(1412)
  })

  it('salarioLiquido = bruto - inss - irrf - outrosDescontos', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 1, outrosDescontos: 200 })
    expect(r.salarioLiquido).toBeCloseTo(r.salarioBruto - r.inss - r.irrf - r.outrosDescontos, 2)
  })

  it('aliquotaEfetivaINSS equals inss / salarioBruto', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 0, outrosDescontos: 0 })
    expect(r.aliquotaEfetivaINSS).toBeCloseTo(r.inss / r.salarioBruto, 6)
  })

  it('more dependents reduces IRRF', () => {
    const no_dep = calcularSalarioLiquido({ salarioBruto: 4000, dependentes: 0, outrosDescontos: 0 })
    const with_dep = calcularSalarioLiquido({ salarioBruto: 4000, dependentes: 2, outrosDescontos: 0 })
    expect(with_dep.irrf).toBeLessThanOrEqual(no_dep.irrf)
    expect(with_dep.salarioLiquido).toBeGreaterThanOrEqual(no_dep.salarioLiquido)
  })

  it('zero salary returns all-zero result', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 0, dependentes: 0, outrosDescontos: 0 })
    expect(r.inss).toBe(0)
    expect(r.irrf).toBe(0)
    expect(r.salarioLiquido).toBe(0)
    expect(r.aliquotaEfetivaINSS).toBe(0)
    expect(r.aliquotaEfetivaIRRF).toBe(0)
  })
})
