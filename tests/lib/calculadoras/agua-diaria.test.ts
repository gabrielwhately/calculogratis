import { describe, it, expect } from 'vitest'
import { calcularAguaDiaria } from '@/lib/calculadoras/agua-diaria'

describe('calcularAguaDiaria', () => {
  it('calculates base intake for sedentary person', () => {
    const result = calcularAguaDiaria(70, 'sedentario')
    expect(result.mlPorDia).toBe(Math.round(70 * 35 * 1.0))
    expect(result.litrosPorDia).toBeCloseTo(result.mlPorDia / 1000)
    expect(result.coposPorDia).toBe(Math.ceil(result.mlPorDia / 250))
    expect(result.mlPorRefeicao).toBe(Math.round(result.mlPorDia / 6))
  })

  it('increases intake for more active levels', () => {
    const sed = calcularAguaDiaria(70, 'sedentario')
    const leve = calcularAguaDiaria(70, 'leve')
    const mod = calcularAguaDiaria(70, 'moderado')
    const int = calcularAguaDiaria(70, 'intenso')
    const muito = calcularAguaDiaria(70, 'muito_intenso')

    expect(leve.mlPorDia).toBeGreaterThan(sed.mlPorDia)
    expect(mod.mlPorDia).toBeGreaterThan(leve.mlPorDia)
    expect(int.mlPorDia).toBeGreaterThan(mod.mlPorDia)
    expect(muito.mlPorDia).toBeGreaterThan(int.mlPorDia)
  })

  it('scales linearly with weight', () => {
    const light = calcularAguaDiaria(50, 'sedentario')
    const heavy = calcularAguaDiaria(100, 'sedentario')
    expect(heavy.mlPorDia).toBeCloseTo(light.mlPorDia * 2, -1)
  })

  it('coposPorDia rounds up', () => {
    // 80kg * 35 = 2800ml / 250 = 11.2 → ceil = 12
    const result = calcularAguaDiaria(80, 'sedentario')
    expect(result.coposPorDia).toBe(Math.ceil(result.mlPorDia / 250))
  })

  it('muito_intenso factor is 1.4', () => {
    const result = calcularAguaDiaria(70, 'muito_intenso')
    expect(result.mlPorDia).toBe(Math.round(70 * 35 * 1.4))
  })
})
