import { describe, it, expect } from 'vitest'
import { calcularPintura } from '@/lib/calculadoras/calculadora-pintura'

describe('calcularPintura', () => {
  it('calculates basic room without doors or windows', () => {
    // 4m x 5m room, 2.8m ceiling, no doors/windows
    const result = calcularPintura(4, 5, 2.8, 0, 0)
    const expectedArea = 2 * (4 + 5) * 2.8 // 50.4m²
    expect(result.areaTotal).toBeCloseTo(expectedArea)
    expect(result.areaUtil).toBeCloseTo(expectedArea)
  })

  it('subtracts door and window areas from areaUtil', () => {
    const result = calcularPintura(4, 5, 2.8, 1, 1)
    const totalWall = 2 * (4 + 5) * 2.8
    const doorArea = 0.8 * 2.1
    const windowArea = 1.2 * 1.0
    expect(result.areaUtil).toBeCloseTo(totalWall - doorArea - windowArea)
  })

  it('multiplies areaUtil by demaos to get painting area', () => {
    const result = calcularPintura(4, 5, 2.8, 0, 0, 3)
    const wallArea = 2 * (4 + 5) * 2.8
    // litros = (wallArea * 3) / rendimento
    expect(result.demaos).toBe(3)
    const expectedLitros = (wallArea * 3) / 10
    expect(result.litrosNecessarios).toBeCloseTo(Math.ceil(expectedLitros * 10) / 10)
  })

  it('returns 0 litros when rendimentoLitro is 0 (no division by zero)', () => {
    const result = calcularPintura(4, 5, 2.8, 0, 0, 2, 0)
    expect(result.litrosNecessarios).toBe(0)
  })

  it('galoes36 is ceiling of litros / 3.6', () => {
    const result = calcularPintura(4, 5, 2.8, 1, 2)
    const expectedGalao = Math.ceil(result.litrosNecessarios / 3.6)
    expect(result.galoes36).toBe(expectedGalao)
  })

  it('galoes18 is ceiling of litros / 18', () => {
    const result = calcularPintura(5, 6, 3.0, 2, 2)
    const expectedGalao18 = Math.ceil(result.litrosNecessarios / 18)
    expect(result.galoes18).toBe(expectedGalao18)
  })

  it('latas09 is ceiling of litros / 0.9', () => {
    const result = calcularPintura(4, 5, 2.8, 1, 1)
    const expectedLatas = Math.ceil(result.litrosNecessarios / 0.9)
    expect(result.latas09).toBe(expectedLatas)
  })

  it('areaUtil never goes below 0 when doors+windows exceed wall area', () => {
    // Extreme case: many large openings
    const result = calcularPintura(2, 2, 2.0, 100, 100)
    expect(result.areaUtil).toBeGreaterThanOrEqual(0)
  })
})
