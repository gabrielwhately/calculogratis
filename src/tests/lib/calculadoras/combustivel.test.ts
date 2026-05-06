import { describe, it, expect } from 'vitest'
import { calcularCombustivel } from '@/lib/calculadoras/combustivel'

describe('calcularCombustivel', () => {
  it('calculates fuel cost correctly', () => {
    const r = calcularCombustivel({ distancia: 200, consumo: 10, precoCombustivel: 5 })
    expect(r.litrosNecessarios).toBeCloseTo(20)
    expect(r.custoCombustivel).toBeCloseTo(100)
    expect(r.custoTotal).toBeCloseTo(100)
    expect(r.custoPorKm).toBeCloseTo(0.5)
  })

  it('adds pedagios to total cost', () => {
    const r = calcularCombustivel({ distancia: 100, consumo: 10, precoCombustivel: 6, pedagios: 20 })
    expect(r.custoTotal).toBeCloseTo(80)
    expect(r.pedagios).toBe(20)
  })

  it('defaults pedagios to 0 when omitted', () => {
    const r = calcularCombustivel({ distancia: 100, consumo: 10, precoCombustivel: 5 })
    expect(r.pedagios).toBe(0)
  })

  it('returns custoPorKm 0 when distancia is 0', () => {
    const r = calcularCombustivel({ distancia: 0, consumo: 10, precoCombustivel: 5 })
    expect(r.custoPorKm).toBe(0)
  })

  // Edge: consumo = 0 produces Infinity litros — no guard in source
  it('produces Infinity litros when consumo is 0', () => {
    const r = calcularCombustivel({ distancia: 100, consumo: 0, precoCombustivel: 5 })
    expect(r.litrosNecessarios).toBe(Infinity)
  })

  it('preserves input values in result', () => {
    const r = calcularCombustivel({ distancia: 350, consumo: 12, precoCombustivel: 5.5 })
    expect(r.distancia).toBe(350)
    expect(r.consumo).toBe(12)
  })
})
