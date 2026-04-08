import { describe, it, expect } from 'vitest'
import { calcularConsumoAparelho } from '@/lib/calculadoras/consumo-energia'

describe('calcularConsumoAparelho', () => {
  it('calculates monthly consumption', () => {
    // 1000W x 8h x 30 days = 240 kWh
    const r = calcularConsumoAparelho(1000, 8, 30, 0.85)
    expect(r.consumoMensalKwh).toBeCloseTo(240)
    expect(r.custoMensal).toBeCloseTo(204)
    expect(r.consumoAnualKwh).toBeCloseTo(2880)
  })
  it('handles zero potencia', () => {
    const r = calcularConsumoAparelho(0, 8, 30, 0.85)
    expect(r.custoMensal).toBe(0)
  })
})
