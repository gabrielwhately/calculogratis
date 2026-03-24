import { describe, it, expect } from 'vitest'
import { calcularJurosSimples } from '@/lib/calculadoras/juros-simples'

describe('calcularJurosSimples', () => {
  it('calculates simple interest correctly', () => {
    const r = calcularJurosSimples({ capital: 1000, taxaMensal: 1, meses: 12 })
    expect(r.juros).toBeCloseTo(120)
    expect(r.montante).toBeCloseTo(1120)
  })
  it('returns zero for zero capital', () => {
    expect(calcularJurosSimples({ capital: 0, taxaMensal: 5, meses: 10 }).juros).toBe(0)
  })
  it('handles large values', () => {
    expect(calcularJurosSimples({ capital: 100000, taxaMensal: 2, meses: 24 }).juros).toBeCloseTo(48000)
  })
})
