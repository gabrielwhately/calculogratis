import { describe, it, expect } from 'vitest'
import { calcularAguaDiaria } from '@/lib/calculadoras/agua-diaria'

describe('calcularAguaDiaria', () => {
  it('calculates 35ml per kg for sedentary', () => {
    const r = calcularAguaDiaria(70, 'sedentario')
    expect(r.mlPorDia).toBe(2450)
    expect(r.litrosPorDia).toBeCloseTo(2.45)
    expect(r.coposPorDia).toBe(10)
  })
  it('increases for active people', () => {
    const sed = calcularAguaDiaria(70, 'sedentario')
    const int = calcularAguaDiaria(70, 'intenso')
    expect(int.mlPorDia).toBeGreaterThan(sed.mlPorDia)
  })
})
