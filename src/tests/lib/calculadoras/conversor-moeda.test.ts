import { describe, it, expect } from 'vitest'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'

describe('converterMoeda', () => {
  it('divides valor by taxa', () => {
    const r = converterMoeda({ valor: 100, taxa: 5 })
    expect(r.valorConvertido).toBeCloseTo(20)
    expect(r.valorOriginal).toBe(100)
    expect(r.taxa).toBe(5)
  })

  it('handles taxa of 1 (same currency)', () => {
    expect(converterMoeda({ valor: 250, taxa: 1 }).valorConvertido).toBeCloseTo(250)
  })

  it('handles fractional taxa', () => {
    const r = converterMoeda({ valor: 100, taxa: 0.5 })
    expect(r.valorConvertido).toBeCloseTo(200)
  })

  // Edge case: division by zero produces Infinity — no guard in source
  it('returns Infinity when taxa is 0', () => {
    const r = converterMoeda({ valor: 100, taxa: 0 })
    expect(r.valorConvertido).toBe(Infinity)
  })
})

describe('converterMoedaInverso', () => {
  it('multiplies valor by taxa', () => {
    const r = converterMoedaInverso({ valor: 100, taxa: 5 })
    expect(r.valorConvertido).toBeCloseTo(500)
  })

  it('handles zero valor', () => {
    expect(converterMoedaInverso({ valor: 0, taxa: 5 }).valorConvertido).toBe(0)
  })
})
