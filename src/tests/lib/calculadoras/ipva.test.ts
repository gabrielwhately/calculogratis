import { describe, it, expect } from 'vitest'
import { calcularIPVA } from '@/lib/calculadoras/ipva'

describe('calcularIPVA', () => {
  it('calculates IPVA for SP (4%)', () => {
    const r = calcularIPVA({ valorVenal: 50000, estado: 'SP' })
    expect(r.valorIPVA).toBeCloseTo(2000)
    expect(r.aliquota).toBe(4)
  })
  it('calculates IPVA for MG (4%)', () => {
    const r = calcularIPVA({ valorVenal: 30000, estado: 'MG' })
    expect(r.valorIPVA).toBeGreaterThan(0)
  })
})
