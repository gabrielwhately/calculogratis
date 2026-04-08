import { describe, it, expect } from 'vitest'
import { calcularConsorcio } from '@/lib/calculadoras/simulador-consorcio'

describe('calcularConsorcio', () => {
  it('calculates parcela and total cost', () => {
    const r = calcularConsorcio(100000, 60, 12, 1)
    expect(r.parcela).toBeGreaterThan(0)
    expect(r.totalComTaxas).toBeGreaterThan(100000)
    expect(r.custoAdminTotal).toBeGreaterThan(0)
  })
  it('total equals parcela * prazo', () => {
    const r = calcularConsorcio(100000, 60, 12, 1)
    expect(r.totalComTaxas).toBeCloseTo(r.parcela * 60, 0)
  })
  it('handles zero admin fee', () => {
    const r = calcularConsorcio(100000, 60, 0, 0)
    expect(r.parcela).toBeCloseTo(100000 / 60, 0)
  })
})
