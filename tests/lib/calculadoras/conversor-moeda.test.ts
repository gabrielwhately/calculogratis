import { describe, it, expect } from 'vitest'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'

describe('converterMoeda', () => {
  it('converts BRL to USD by dividing by exchange rate', () => {
    // R$500 ÷ 5.0 = $100
    const result = converterMoeda({ valor: 500, taxa: 5.0 })
    expect(result.valorConvertido).toBe(100)
    expect(result.valorOriginal).toBe(500)
    expect(result.taxa).toBe(5.0)
  })

  it('handles decimal exchange rates', () => {
    const result = converterMoeda({ valor: 100, taxa: 4.75 })
    expect(result.valorConvertido).toBeCloseTo(100 / 4.75)
  })

  it('converts with rate of 1 (same currency)', () => {
    const result = converterMoeda({ valor: 250, taxa: 1 })
    expect(result.valorConvertido).toBe(250)
  })
})

describe('converterMoedaInverso', () => {
  it('converts USD to BRL by multiplying by exchange rate', () => {
    // $100 * 5.0 = R$500
    const result = converterMoedaInverso({ valor: 100, taxa: 5.0 })
    expect(result.valorConvertido).toBe(500)
  })

  it('converterMoeda and converterMoedaInverso are inverse operations', () => {
    const original = 1000
    const rate = 4.87
    const toUSD = converterMoeda({ valor: original, taxa: rate })
    const backToBRL = converterMoedaInverso({ valor: toUSD.valorConvertido, taxa: rate })
    expect(backToBRL.valorConvertido).toBeCloseTo(original)
  })

  it('handles decimal values', () => {
    const result = converterMoedaInverso({ valor: 50.5, taxa: 5.2 })
    expect(result.valorConvertido).toBeCloseTo(50.5 * 5.2)
  })
})
