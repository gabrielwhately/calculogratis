import { describe, it, expect } from 'vitest'
import { calcularPesoIdeal } from '@/lib/calculadoras/peso-ideal'

describe('calcularPesoIdeal', () => {
  it('calculates healthy weight range from BMI 18.5–24.9', () => {
    const r = calcularPesoIdeal({ altura: 170, sexo: 'masculino' })
    expect(r.pesoMinimo).toBeCloseTo(18.5 * 1.7 * 1.7, 1)
    expect(r.pesoMaximo).toBeCloseTo(24.9 * 1.7 * 1.7, 1)
  })

  it('applies male formulas for masculine', () => {
    const r = calcularPesoIdeal({ altura: 175, sexo: 'masculino' })
    // 175cm = 68.9 inches; over60 = 8.9
    const over60 = (175 / 2.54) - 60
    expect(r.pesoIdealDevine).toBeCloseTo(50 + 2.3 * over60, 1)
    expect(r.pesoIdealRobinson).toBeCloseTo(52 + 1.9 * over60, 1)
    expect(r.pesoIdealMiller).toBeCloseTo(56.2 + 1.41 * over60, 1)
  })

  it('applies female formulas for feminino', () => {
    const r = calcularPesoIdeal({ altura: 160, sexo: 'feminino' })
    const over60 = (160 / 2.54) - 60
    expect(r.pesoIdealDevine).toBeCloseTo(45.5 + 2.3 * over60, 1)
    expect(r.pesoIdealRobinson).toBeCloseTo(49 + 1.7 * over60, 1)
    expect(r.pesoIdealMiller).toBeCloseTo(53.1 + 1.36 * over60, 1)
  })

  it('sets over60 to 0 for height exactly 60 inches (152.4cm)', () => {
    const r = calcularPesoIdeal({ altura: 152, sexo: 'masculino' })
    // over60 is clamped to >= 0
    expect(r.pesoIdealDevine).toBeGreaterThanOrEqual(50)
  })

  it('always returns imcMinimo=18.5 and imcMaximo=24.9', () => {
    const r = calcularPesoIdeal({ altura: 180, sexo: 'feminino' })
    expect(r.imcMinimo).toBe(18.5)
    expect(r.imcMaximo).toBe(24.9)
  })

  it('preserves altura in result', () => {
    const r = calcularPesoIdeal({ altura: 168, sexo: 'masculino' })
    expect(r.altura).toBe(168)
  })
})
