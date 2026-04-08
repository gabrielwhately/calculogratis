import { describe, it, expect } from 'vitest'
import { calcularRendimentoCDB } from '@/lib/calculadoras/rendimento-cdb'

describe('calcularRendimentoCDB', () => {
  it('calculates CDB return with 100% CDI for 12 months', () => {
    const r = calcularRendimentoCDB(10000, 14.25, 100, 12)
    expect(r.valorFinalBruto).toBeGreaterThan(11000)
    expect(r.rendimentoBruto).toBeGreaterThan(1000)
    expect(r.ir).toBeGreaterThan(0)
    expect(r.valorFinalLiquido).toBeLessThan(r.valorFinalBruto)
    expect(r.valorFinalLiquido).toBeGreaterThan(10000)
  })
  it('applies lower IR rate for longer terms', () => {
    const short = calcularRendimentoCDB(10000, 14.25, 100, 6)
    const long = calcularRendimentoCDB(10000, 14.25, 100, 36)
    // IR rate for 6m (180 days) = 22.5%, for 36m (1080 days) = 15%
    const shortIRRate = short.ir / short.rendimentoBruto
    const longIRRate = long.ir / long.rendimentoBruto
    expect(shortIRRate).toBeGreaterThan(longIRRate)
  })
  it('handles zero investment', () => {
    const r = calcularRendimentoCDB(0, 14.25, 100, 12)
    expect(r.valorFinalLiquido).toBe(0)
  })
})
