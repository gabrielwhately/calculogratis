import { describe, it, expect } from 'vitest'
import { calcularFrequenciaCardiaca } from '@/lib/calculadoras/frequencia-cardiaca'

describe('calcularFrequenciaCardiaca', () => {
  it('calculates FCmax using Tanaka formula', () => {
    const r = calcularFrequenciaCardiaca(30, 70)
    expect(r.fcMaxima).toBe(187) // 208 - 0.7*30
    expect(r.zonas).toHaveLength(5)
  })
  it('zones increase in bpm ranges', () => {
    const r = calcularFrequenciaCardiaca(30, 60)
    for (let i = 1; i < r.zonas.length; i++) {
      expect(r.zonas[i].minBpm).toBeGreaterThanOrEqual(r.zonas[i - 1].minBpm)
    }
  })
  it('older age yields lower FCmax', () => {
    const young = calcularFrequenciaCardiaca(25, 70)
    const old = calcularFrequenciaCardiaca(60, 70)
    expect(old.fcMaxima).toBeLessThan(young.fcMaxima)
  })
})
