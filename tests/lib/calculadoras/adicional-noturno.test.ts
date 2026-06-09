import { describe, it, expect } from 'vitest'
import { calcularAdicionalNoturno } from '@/lib/calculadoras/adicional-noturno'

describe('calcularAdicionalNoturno', () => {
  it('calculates basic nocturnal additional with defaults', () => {
    const result = calcularAdicionalNoturno(2200, 220, 44)
    expect(result.salarioBruto).toBe(2200)
    expect(result.valorHoraNormal).toBeCloseTo(10)
    expect(result.adicionalPorHora).toBeCloseTo(2)
    expect(result.valorHoraNoturna).toBeCloseTo(12)
    expect(result.horasNoturnas).toBe(44)
  })

  it('uses 220 as default when horasMensais is 0', () => {
    const withZero = calcularAdicionalNoturno(2200, 0, 44)
    const withDefault = calcularAdicionalNoturno(2200, 220, 44)
    expect(withZero.valorHoraNormal).toBe(withDefault.valorHoraNormal)
  })

  it('computes reduced hours (CLT 52min30s rule)', () => {
    const result = calcularAdicionalNoturno(2200, 220, 60)
    // 60 hours * (60 / 52.5) ≈ 68.57 reduced hours
    expect(result.horasReduzidas).toBeCloseTo(60 * (60 / 52.5))
  })

  it('applies custom percentual', () => {
    const result25 = calcularAdicionalNoturno(2200, 220, 44, 25)
    const result20 = calcularAdicionalNoturno(2200, 220, 44, 20)
    expect(result25.adicionalPorHora).toBeGreaterThan(result20.adicionalPorHora)
    expect(result25.adicionalPorHora).toBeCloseTo(10 * 0.25)
  })

  it('returns zero totalAdicional for zero nocturnal hours', () => {
    const result = calcularAdicionalNoturno(2200, 220, 0)
    expect(result.totalAdicional).toBe(0)
    expect(result.horasReduzidas).toBe(0)
  })

  it('totalAdicional equals adicionalPorHora * horasReduzidas', () => {
    const result = calcularAdicionalNoturno(3000, 180, 30)
    expect(result.totalAdicional).toBeCloseTo(result.adicionalPorHora * result.horasReduzidas)
  })
})
