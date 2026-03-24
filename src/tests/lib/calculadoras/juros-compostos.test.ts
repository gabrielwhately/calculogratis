import { describe, it, expect } from 'vitest'
import { calcularJurosCompostos } from '@/lib/calculadoras/juros-compostos'

describe('calcularJurosCompostos', () => {
  it('calculates without contributions', () => {
    const r = calcularJurosCompostos({ capital: 1000, taxaMensal: 1, meses: 12, aporteMensal: 0 })
    expect(r.montante).toBeCloseTo(1126.83, 0)
    expect(r.totalInvestido).toBe(1000)
  })
  it('calculates with contributions', () => {
    const r = calcularJurosCompostos({ capital: 1000, taxaMensal: 1, meses: 12, aporteMensal: 100 })
    expect(r.totalInvestido).toBeCloseTo(2200)
    expect(r.montante).toBeGreaterThan(2200)
  })
  it('zero rate', () => {
    expect(calcularJurosCompostos({ capital: 5000, taxaMensal: 0, meses: 12, aporteMensal: 0 }).montante).toBe(5000)
  })
})
