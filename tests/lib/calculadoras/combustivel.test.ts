import { describe, it, expect } from 'vitest'
import { calcularCombustivel } from '@/lib/calculadoras/combustivel'

describe('calcularCombustivel', () => {
  it('calculates fuel cost for a simple trip', () => {
    // 300km, 10km/L, R$5.00/L → 30L → R$150
    const result = calcularCombustivel({ distancia: 300, consumo: 10, precoCombustivel: 5.0 })
    expect(result.litrosNecessarios).toBe(30)
    expect(result.custoCombustivel).toBe(150)
    expect(result.custoTotal).toBe(150)
    expect(result.custoPorKm).toBeCloseTo(0.5)
  })

  it('includes toll costs in total', () => {
    const result = calcularCombustivel({ distancia: 300, consumo: 10, precoCombustivel: 5.0, pedagios: 25 })
    expect(result.custoTotal).toBe(175)
    expect(result.pedagios).toBe(25)
  })

  it('defaults pedagios to 0 when not provided', () => {
    const result = calcularCombustivel({ distancia: 100, consumo: 12, precoCombustivel: 6 })
    expect(result.pedagios).toBe(0)
  })

  it('custoPorKm is 0 when distance is 0', () => {
    const result = calcularCombustivel({ distancia: 0, consumo: 10, precoCombustivel: 5 })
    expect(result.custoPorKm).toBe(0)
  })

  it('custoPorKm accounts for toll costs', () => {
    const result = calcularCombustivel({ distancia: 200, consumo: 10, precoCombustivel: 4, pedagios: 20 })
    expect(result.custoPorKm).toBeCloseTo(result.custoTotal / 200)
  })

  it('preserves input values in result', () => {
    const input = { distancia: 500, consumo: 15, precoCombustivel: 5.5 }
    const result = calcularCombustivel(input)
    expect(result.distancia).toBe(500)
    expect(result.consumo).toBe(15)
  })
})
