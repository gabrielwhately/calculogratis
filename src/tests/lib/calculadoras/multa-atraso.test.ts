import { describe, it, expect } from 'vitest'
import { calcularMultaAtraso } from '@/lib/calculadoras/multa-atraso'

describe('calcularMultaAtraso', () => {
  it('calculates fine and daily interest', () => {
    const r = calcularMultaAtraso({ valor: 1000, diasAtraso: 30, multaPercent: 2, jurosDiario: 0.033 })
    expect(r.multa).toBeCloseTo(20)
    expect(r.juros).toBeCloseTo(9.9, 0)
    expect(r.multaPercent).toBe(2)
    expect(r.jurosDiario).toBe(0.033)
    expect(r.valorTotal).toBeGreaterThan(1000)
  })
  it('no penalty for zero days late', () => {
    const r = calcularMultaAtraso({ valor: 1000, diasAtraso: 0, multaPercent: 2, jurosDiario: 0.033 })
    expect(r.juros).toBe(0)
  })
})
