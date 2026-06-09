import { describe, it, expect } from 'vitest'
import { calcularConsumoEnergia, calcularConsumoAparelho } from '@/lib/calculadoras/consumo-energia'

describe('calcularConsumoEnergia', () => {
  it('calculates monthly consumption for a single appliance', () => {
    // 1000W, 4h/day, 30 days → 120 kWh
    const result = calcularConsumoEnergia([{ potenciaWatts: 1000, horasUsoDia: 4, diasUsoMes: 30 }], 0.75)
    expect(result.consumoMensalKwh).toBeCloseTo(120)
    expect(result.custoMensal).toBeCloseTo(90)
    expect(result.custoAnual).toBeCloseTo(1080)
    expect(result.consumoAnualKwh).toBeCloseTo(1440)
  })

  it('sums consumption across multiple appliances', () => {
    const appliances = [
      { potenciaWatts: 1000, horasUsoDia: 4, diasUsoMes: 30 }, // 120 kWh
      { potenciaWatts: 500, horasUsoDia: 2, diasUsoMes: 30 },  // 30 kWh
    ]
    const result = calcularConsumoEnergia(appliances, 1.0)
    expect(result.consumoMensalKwh).toBeCloseTo(150)
  })

  it('returns 0 for empty appliance list', () => {
    const result = calcularConsumoEnergia([], 0.75)
    expect(result.consumoMensalKwh).toBe(0)
    expect(result.custoMensal).toBe(0)
  })

  it('custoAnual equals custoMensal * 12', () => {
    const result = calcularConsumoEnergia([{ potenciaWatts: 200, horasUsoDia: 8, diasUsoMes: 25 }], 0.9)
    expect(result.custoAnual).toBeCloseTo(result.custoMensal * 12)
  })

  it('consumoAnualKwh equals consumoMensalKwh * 12', () => {
    const result = calcularConsumoEnergia([{ potenciaWatts: 300, horasUsoDia: 6, diasUsoMes: 20 }], 0.8)
    expect(result.consumoAnualKwh).toBeCloseTo(result.consumoMensalKwh * 12)
  })
})

describe('calcularConsumoAparelho', () => {
  it('is equivalent to calling calcularConsumoEnergia with a single appliance', () => {
    const single = calcularConsumoAparelho(1000, 4, 30, 0.75)
    const multi = calcularConsumoEnergia([{ potenciaWatts: 1000, horasUsoDia: 4, diasUsoMes: 30 }], 0.75)
    expect(single.consumoMensalKwh).toBe(multi.consumoMensalKwh)
    expect(single.custoMensal).toBe(multi.custoMensal)
  })
})
