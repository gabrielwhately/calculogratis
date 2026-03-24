import { describe, it, expect } from 'vitest'
import { calcularSeguroDesemprego } from '@/lib/calculadoras/seguro-desemprego'

describe('calcularSeguroDesemprego', () => {
  it('calculates for low salary', () => {
    const r = calcularSeguroDesemprego({ salarios: [1500, 1500, 1500], solicitacoes: 1 })
    expect(r.valorParcela).toBeGreaterThan(0)
    expect(r.numeroParcelas).toBe(4)
  })
  it('caps at max for high salary', () => {
    expect(calcularSeguroDesemprego({ salarios: [10000, 10000, 10000], solicitacoes: 1 }).valorParcela).toBeCloseTo(2313.74, 0)
  })
})
