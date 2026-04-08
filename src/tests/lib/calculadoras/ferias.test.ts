import { describe, it, expect } from 'vitest'
import { calcularFerias } from '@/lib/calculadoras/ferias'

describe('calcularFerias', () => {
  it('calculates 30-day vacation with 1/3 bonus', () => {
    const r = calcularFerias({ salarioBruto: 3000, diasFerias: 30, vendeAbono: false, dependentes: 0 })
    expect(r.feriasBase).toBeCloseTo(3000)
    expect(r.tercoConstitucional).toBeCloseTo(1000)
    expect(r.totalBruto).toBeCloseTo(4000)
    expect(r.totalLiquido).toBeLessThan(r.totalBruto)
  })
  it('calculates proportional vacation for fewer days', () => {
    const r30 = calcularFerias({ salarioBruto: 3000, diasFerias: 30, vendeAbono: false, dependentes: 0 })
    const r20 = calcularFerias({ salarioBruto: 3000, diasFerias: 20, vendeAbono: false, dependentes: 0 })
    expect(r20.feriasBase).toBeLessThan(r30.feriasBase)
  })
  it('includes abono pecuniario when selling days', () => {
    const r = calcularFerias({ salarioBruto: 3000, diasFerias: 30, vendeAbono: true, dependentes: 0 })
    expect(r.abonoPecuniario).toBeGreaterThan(0)
  })
})
