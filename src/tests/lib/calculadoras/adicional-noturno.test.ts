import { describe, it, expect } from 'vitest'
import { calcularAdicionalNoturno } from '@/lib/calculadoras/adicional-noturno'

describe('calcularAdicionalNoturno', () => {
  it('calculates night premium at 20%', () => {
    const r = calcularAdicionalNoturno(2200, 220, 40, 20)
    expect(r.valorHoraNormal).toBeCloseTo(10)
    expect(r.adicionalPorHora).toBeCloseTo(2)
    expect(r.valorHoraNoturna).toBeCloseTo(12)
    expect(r.totalAdicional).toBeGreaterThan(0)
  })
  it('applies reduced hour factor (60/52.5)', () => {
    const r = calcularAdicionalNoturno(2200, 220, 7, 20)
    expect(r.horasReduzidas).toBeCloseTo(8, 0)
  })
  it('defaults to 220 hours when zero provided', () => {
    const r = calcularAdicionalNoturno(2200, 0, 10, 20)
    expect(r.valorHoraNormal).toBeCloseTo(10)
  })
})
