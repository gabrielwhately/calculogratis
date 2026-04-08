import { describe, it, expect } from 'vitest'
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'

describe('calcularMacros', () => {
  it('calculates maintenance macros for male', () => {
    const r = calcularMacros(80, 180, 30, 'masculino', 'moderado', 'manter')
    expect(r.caloriasTotal).toBeGreaterThan(2000)
    expect(r.proteinas.gramas).toBeGreaterThan(100)
    expect(r.carboidratos.gramas).toBeGreaterThan(0)
    expect(r.gorduras.gramas).toBeGreaterThan(0)
    // macros should sum to total calories
    const totalCal = r.proteinas.calorias + r.carboidratos.calorias + r.gorduras.calorias
    expect(totalCal).toBeCloseTo(r.caloriasTotal, -1)
  })
  it('creates deficit for emagrecer', () => {
    const manter = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'manter')
    const emagrecer = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'emagrecer')
    expect(emagrecer.caloriasTotal).toBeLessThan(manter.caloriasTotal)
  })
  it('creates surplus for ganhar_massa', () => {
    const manter = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'manter')
    const ganhar = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'ganhar_massa')
    expect(ganhar.caloriasTotal).toBeGreaterThan(manter.caloriasTotal)
  })
  it('calculates for female with different BMR', () => {
    const male = calcularMacros(70, 170, 30, 'masculino', 'sedentario', 'manter')
    const female = calcularMacros(70, 170, 30, 'feminino', 'sedentario', 'manter')
    expect(female.caloriasTotal).toBeLessThan(male.caloriasTotal)
  })
})
