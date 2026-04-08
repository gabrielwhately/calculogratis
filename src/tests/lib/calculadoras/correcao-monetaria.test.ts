import { describe, it, expect } from 'vitest'
import { calcularCorrecaoMonetaria } from '@/lib/calculadoras/correcao-monetaria'

describe('calcularCorrecaoMonetaria', () => {
  it('corrects value by index variation', () => {
    const r = calcularCorrecaoMonetaria({ valorOriginal: 1000, indiceInicial: 100, indiceFinal: 110, juros: 0, meses: 0 })
    expect(r.valorCorrigido).toBeCloseTo(1100)
    expect(r.fatorCorrecao).toBeCloseTo(1.1)
  })
  it('adds interest when specified', () => {
    const r = calcularCorrecaoMonetaria({ valorOriginal: 1000, indiceInicial: 100, indiceFinal: 100, juros: 1, meses: 12 })
    expect(r.valorTotal).toBeGreaterThan(1000)
  })
})
