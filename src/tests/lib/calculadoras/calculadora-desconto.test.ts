import { describe, it, expect } from 'vitest'
import { calcularDesconto, calcularDescontoProgressivo } from '@/lib/calculadoras/calculadora-desconto'

describe('calcularDesconto', () => {
  it('applies percentage discount correctly', () => {
    const r = calcularDesconto(200, 15)
    expect(r.valorFinal).toBeCloseTo(170)
    expect(r.valorDesconto).toBeCloseTo(30)
    expect(r.economia).toBeCloseTo(30)
  })
  it('handles 100% discount', () => {
    expect(calcularDesconto(100, 100).valorFinal).toBeCloseTo(0)
  })
})

describe('calcularDescontoProgressivo', () => {
  it('applies cascading discounts', () => {
    const r = calcularDescontoProgressivo(500, [10, 10])
    expect(r.valorFinal).toBeCloseTo(405)
  })
})
