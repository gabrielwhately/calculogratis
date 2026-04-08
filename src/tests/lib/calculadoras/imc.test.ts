import { describe, it, expect } from 'vitest'
import { calcularIMC } from '@/lib/calculadoras/imc'

describe('calcularIMC', () => {
  it('calculates BMI correctly', () => {
    const r = calcularIMC({ peso: 70, altura: 1.75 })
    expect(r.imc).toBeCloseTo(22.86, 1)
  })
  it('classifies normal weight', () => {
    const r = calcularIMC({ peso: 70, altura: 1.75 })
    expect(r.classificacao).toBe('Peso normal')
  })
  it('classifies overweight', () => {
    const r = calcularIMC({ peso: 90, altura: 1.75 })
    expect(r.imc).toBeGreaterThan(25)
    expect(r.classificacao).toBe('Sobrepeso')
  })
})
