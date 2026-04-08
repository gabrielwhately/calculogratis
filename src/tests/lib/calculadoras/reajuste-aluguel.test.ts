import { describe, it, expect } from 'vitest'
import { calcularReajusteAluguel } from '@/lib/calculadoras/reajuste-aluguel'

describe('calcularReajusteAluguel', () => {
  it('applies index percentage to rent', () => {
    const r = calcularReajusteAluguel({ valorAtual: 2000, indicePercent: 5 })
    expect(r.valorReajustado).toBeCloseTo(2100)
    expect(r.diferenca).toBeCloseTo(100)
  })
  it('handles zero index', () => {
    const r = calcularReajusteAluguel({ valorAtual: 2000, indicePercent: 0 })
    expect(r.valorReajustado).toBeCloseTo(2000)
  })
})
