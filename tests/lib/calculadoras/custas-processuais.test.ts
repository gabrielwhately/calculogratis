import { describe, it, expect } from 'vitest'
import { calcularCustasProcessuais } from '@/lib/calculadoras/custas-processuais'

describe('calcularCustasProcessuais', () => {
  it('applies 1% rate and returns it as percentual', () => {
    const result = calcularCustasProcessuais(10000)
    expect(result.percentual).toBe(1)
    expect(result.valorCausa).toBe(10000)
  })

  it('clamps to minimum R$150 for small causa values', () => {
    const result = calcularCustasProcessuais(5000)
    // 1% of 5000 = 50 → below minimum, should be 150
    expect(result.custasIniciais).toBe(150)
  })

  it('applies minimum even for zero valorCausa', () => {
    const result = calcularCustasProcessuais(0)
    expect(result.custasIniciais).toBe(150)
  })

  it('calculates 1% correctly for mid-range causa', () => {
    const result = calcularCustasProcessuais(20000)
    // 1% of 20000 = 200, above minimum, below maximum
    expect(result.custasIniciais).toBe(200)
  })

  it('clamps to maximum R$50000 for very large causa values', () => {
    const result = calcularCustasProcessuais(10_000_000)
    // 1% of 10M = 100000 → above maximum, should be 50000
    expect(result.custasIniciais).toBe(50000)
  })

  it('applies maximum exactly at the threshold (5M causa)', () => {
    const result = calcularCustasProcessuais(5_000_000)
    // 1% of 5M = 50000 → exactly at maximum
    expect(result.custasIniciais).toBe(50000)
  })

  it('does not exceed maximum for causa just above threshold', () => {
    const result = calcularCustasProcessuais(5_000_001)
    expect(result.custasIniciais).toBe(50000)
  })

  it('preserves valorCausa in result', () => {
    const result = calcularCustasProcessuais(30000)
    expect(result.valorCausa).toBe(30000)
  })

  it('returns result rounded to 2 decimal places', () => {
    // 1% of 15050 = 150.50
    const result = calcularCustasProcessuais(15050)
    expect(result.custasIniciais).toBe(150.50)
    expect(Number.isInteger(result.custasIniciais * 100)).toBe(true)
  })

  it('minimum boundary: causa of R$15000 gives exactly R$150', () => {
    // 1% of 15000 = exactly 150 (at the minimum boundary)
    const result = calcularCustasProcessuais(15000)
    expect(result.custasIniciais).toBe(150)
  })

  it('above minimum boundary: causa R$15001 gives more than R$150', () => {
    const result = calcularCustasProcessuais(15001)
    expect(result.custasIniciais).toBeGreaterThan(150)
  })
})
