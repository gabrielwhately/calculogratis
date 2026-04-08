import { describe, it, expect } from 'vitest'
import { calcularPjVsClt } from '@/lib/calculadoras/pj-vs-clt'

describe('calcularPjVsClt', () => {
  it('calculates CLT vs PJ comparison', () => {
    const r = calcularPjVsClt({ salarioBruto: 5000, dependentes: 0, custoContadorPJ: 200 })
    expect(r.pj.faturamento).toBe(5000)
    expect(r.pj.liquidoMensal).toBeGreaterThan(0)
    expect(r.clt.liquidoMensal).toBeGreaterThan(0)
  })
  it('CLT net is less than gross due to deductions', () => {
    const r = calcularPjVsClt({ salarioBruto: 5000, dependentes: 0, custoContadorPJ: 200 })
    expect(r.clt.liquidoMensal).toBeLessThan(5000)
  })
  it('PJ net differs from CLT net', () => {
    const r = calcularPjVsClt({ salarioBruto: 5000, dependentes: 0, custoContadorPJ: 200 })
    expect(r.diferencaMensal).not.toBe(0)
  })
})
