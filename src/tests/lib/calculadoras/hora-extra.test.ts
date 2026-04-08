import { describe, it, expect } from 'vitest'
import { calcularHoraExtra } from '@/lib/calculadoras/hora-extra'

describe('calcularHoraExtra', () => {
  it('calculates overtime at 50% and 100%', () => {
    const r = calcularHoraExtra({ salarioBruto: 2200, horasMensais: 220, horasExtras50: 10, horasExtras100: 5, horasNoturnas: 0 })
    expect(r.valorHoraNormal).toBeCloseTo(10)
    expect(r.valorHoraExtra50).toBeCloseTo(15)
    expect(r.valorHoraExtra100).toBeCloseTo(20)
    expect(r.totalHorasExtras50).toBeCloseTo(150)
    expect(r.totalHorasExtras100).toBeCloseTo(100)
    expect(r.totalExtras).toBeCloseTo(250)
  })
  it('handles zero overtime', () => {
    const r = calcularHoraExtra({ salarioBruto: 3000, horasMensais: 220, horasExtras50: 0, horasExtras100: 0, horasNoturnas: 0 })
    expect(r.totalExtras).toBe(0)
  })
})
