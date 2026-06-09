import { describe, it, expect } from 'vitest'
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'

describe('calcularMacros', () => {
  it('produces positive calorie total for any valid input', () => {
    const result = calcularMacros(70, 175, 30, 'masculino', 'moderado', 'manter')
    expect(result.caloriasTotal).toBeGreaterThan(0)
  })

  it('male TMB is higher than female TMB for same inputs', () => {
    const male = calcularMacros(70, 175, 30, 'masculino', 'sedentario', 'manter')
    const female = calcularMacros(70, 175, 30, 'feminino', 'sedentario', 'manter')
    expect(male.caloriasTotal).toBeGreaterThan(female.caloriasTotal)
  })

  it('emagrecer yields fewer calories than manter', () => {
    const slim = calcularMacros(70, 175, 30, 'masculino', 'moderado', 'emagrecer')
    const maintain = calcularMacros(70, 175, 30, 'masculino', 'moderado', 'manter')
    expect(slim.caloriasTotal).toBeLessThan(maintain.caloriasTotal)
  })

  it('ganhar_massa yields more calories than manter', () => {
    const bulk = calcularMacros(70, 175, 30, 'masculino', 'moderado', 'ganhar_massa')
    const maintain = calcularMacros(70, 175, 30, 'masculino', 'moderado', 'manter')
    expect(bulk.caloriasTotal).toBeGreaterThan(maintain.caloriasTotal)
  })

  it('macro calories sum is close to total calories', () => {
    const result = calcularMacros(70, 175, 30, 'masculino', 'moderado', 'manter')
    const sum = result.proteinas.calorias + result.carboidratos.calorias + result.gorduras.calorias
    // Allow small rounding difference
    expect(Math.abs(sum - result.caloriasTotal)).toBeLessThanOrEqual(5)
  })

  it('percentages of macros add up to ~100%', () => {
    const result = calcularMacros(70, 175, 30, 'feminino', 'intenso', 'emagrecer')
    const total = result.proteinas.percentual + result.carboidratos.percentual + result.gorduras.percentual
    // Rounding can cause small drift
    expect(Math.abs(total - 100)).toBeLessThanOrEqual(5)
  })

  it('higher activity increases total calories', () => {
    const sedentary = calcularMacros(70, 175, 30, 'masculino', 'sedentario', 'manter')
    const veryActive = calcularMacros(70, 175, 30, 'masculino', 'muito_intenso', 'manter')
    expect(veryActive.caloriasTotal).toBeGreaterThan(sedentary.caloriasTotal)
  })

  it('proteinas.calorias equals gramas * 4', () => {
    const result = calcularMacros(80, 180, 25, 'masculino', 'moderado', 'ganhar_massa')
    expect(result.proteinas.calorias).toBe(result.proteinas.gramas * 4)
  })

  it('gorduras.calorias equals gramas * 9 (approx)', () => {
    const result = calcularMacros(80, 180, 25, 'masculino', 'moderado', 'ganhar_massa')
    expect(result.gorduras.calorias).toBeCloseTo(result.gorduras.gramas * 9, -1)
  })
})
