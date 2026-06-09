import { describe, it, expect } from 'vitest'
import { calcularDesconto, calcularDescontoProgressivo } from '@/lib/calculadoras/calculadora-desconto'

describe('calcularDesconto', () => {
  it('calculates 20% discount correctly', () => {
    const result = calcularDesconto(100, 20)
    expect(result.valorOriginal).toBe(100)
    expect(result.desconto).toBe(20)
    expect(result.valorDesconto).toBe(20)
    expect(result.valorFinal).toBe(80)
    expect(result.economia).toBe(20)
  })

  it('returns original value with 0% discount', () => {
    const result = calcularDesconto(500, 0)
    expect(result.valorFinal).toBe(500)
    expect(result.valorDesconto).toBe(0)
  })

  it('returns 0 final value with 100% discount', () => {
    const result = calcularDesconto(200, 100)
    expect(result.valorFinal).toBe(0)
    expect(result.valorDesconto).toBe(200)
  })

  it('economia equals valorDesconto', () => {
    const result = calcularDesconto(350, 15)
    expect(result.economia).toBe(result.valorDesconto)
  })

  it('handles fractional discounts', () => {
    const result = calcularDesconto(99.99, 10)
    expect(result.valorFinal).toBeCloseTo(89.991)
  })
})

describe('calcularDescontoProgressivo', () => {
  it('applies single discount step', () => {
    const result = calcularDescontoProgressivo(100, [20])
    expect(result.etapas).toHaveLength(1)
    expect(result.valorFinal).toBeCloseTo(80)
  })

  it('applies two discount steps sequentially', () => {
    // 100 → 20% off = 80 → 10% off = 72
    const result = calcularDescontoProgressivo(100, [20, 10])
    expect(result.etapas[0].valorApos).toBeCloseTo(80)
    expect(result.etapas[1].valorApos).toBeCloseTo(72)
    expect(result.valorFinal).toBeCloseTo(72)
  })

  it('progressive is not the same as flat sum of discounts', () => {
    // 20% + 10% progressive ≠ 30% flat
    const progressive = calcularDescontoProgressivo(100, [20, 10])
    const flat = calcularDesconto(100, 30)
    expect(progressive.valorFinal).not.toBe(flat.valorFinal)
    // Progressive yields more expensive result
    expect(progressive.valorFinal).toBeGreaterThan(flat.valorFinal)
  })

  it('returns original value with empty discount list', () => {
    const result = calcularDescontoProgressivo(200, [])
    expect(result.valorFinal).toBe(200)
    expect(result.etapas).toHaveLength(0)
  })

  it('preserves valorOriginal', () => {
    const result = calcularDescontoProgressivo(500, [10, 5])
    expect(result.valorOriginal).toBe(500)
  })
})
