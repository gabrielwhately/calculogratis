import { describe, it, expect } from 'vitest'
import { calcularPintura } from '@/lib/calculadoras/calculadora-pintura'

describe('calcularPintura', () => {
  it('calculates liters needed for a room', () => {
    const r = calcularPintura(4, 5, 2.8, 1, 1, 2, 10)
    expect(r.areaTotal).toBeCloseTo(50.4) // 2*(4+5)*2.8
    expect(r.litrosNecessarios).toBeGreaterThan(0)
    expect(r.galoes36).toBeGreaterThan(0)
  })
  it('deducts doors and windows', () => {
    const noDoors = calcularPintura(4, 5, 2.8, 0, 0, 2, 10)
    const withDoors = calcularPintura(4, 5, 2.8, 2, 3, 2, 10)
    expect(withDoors.areaUtil).toBeLessThan(noDoors.areaUtil)
    expect(withDoors.litrosNecessarios).toBeLessThan(noDoors.litrosNecessarios)
  })
  it('more coats need more paint', () => {
    const twoCoats = calcularPintura(4, 5, 2.8, 1, 1, 2, 10)
    const threeCoats = calcularPintura(4, 5, 2.8, 1, 1, 3, 10)
    expect(threeCoats.litrosNecessarios).toBeGreaterThan(twoCoats.litrosNecessarios)
  })
})
