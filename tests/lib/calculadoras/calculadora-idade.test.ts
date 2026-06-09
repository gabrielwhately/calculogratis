import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { calcularIdade } from '@/lib/calculadoras/calculadora-idade'

describe('calcularIdade', () => {
  beforeEach(() => {
    // Fix today's date so tests are deterministic
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calculates years, months, days for a known birthday', () => {
    // Born 1990-03-10, today 2025-06-15 → 35y 3m 5d
    const result = calcularIdade(new Date('1990-03-10'))
    expect(result.anos).toBe(35)
    expect(result.meses).toBe(3)
    expect(result.dias).toBe(5)
  })

  it('subtracts a month when day of month has not occurred yet', () => {
    // Born 1990-06-20, today 2025-06-15 → still in 34th year (not turned 35 yet this month)
    const result = calcularIdade(new Date('1990-06-20'))
    expect(result.anos).toBe(34)
  })

  it('calculates totalDias consistently with totalSemanas', () => {
    const result = calcularIdade(new Date('2000-01-01'))
    expect(result.totalSemanas).toBe(Math.floor(result.totalDias / 7))
  })

  it('totalMeses equals anos*12 + meses', () => {
    const result = calcularIdade(new Date('1985-04-20'))
    expect(result.totalMeses).toBe(result.anos * 12 + result.meses)
  })

  it('sets proximoAniversario to next year when birthday already passed', () => {
    // Born 1990-03-10, today 2025-06-15 → next birthday 2026-03-10
    const result = calcularIdade(new Date('1990-03-10'))
    expect(result.proximoAniversario.getFullYear()).toBe(2026)
    expect(result.proximoAniversario.getMonth()).toBe(2) // March
    expect(result.proximoAniversario.getDate()).toBe(10)
  })

  it('sets proximoAniversario to this year when birthday is upcoming', () => {
    // Born 1990-08-20, today 2025-06-15 → next birthday 2025-08-20
    const result = calcularIdade(new Date('1990-08-20'))
    expect(result.proximoAniversario.getFullYear()).toBe(2025)
  })

  it('diasParaAniversario is positive', () => {
    const result = calcularIdade(new Date('1990-03-10'))
    expect(result.diasParaAniversario).toBeGreaterThan(0)
  })
})
