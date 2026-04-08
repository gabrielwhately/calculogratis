import { describe, it, expect } from 'vitest'
import { converterTaxaMensalParaAnual, converterTaxaAnualParaMensal, converterTaxaDiariaParaMensal } from '@/lib/calculadoras/conversor-taxas'

describe('conversor-taxas', () => {
  it('converts monthly to annual correctly', () => {
    const r = converterTaxaMensalParaAnual(1)
    expect(r.anual).toBeCloseTo(12.68, 1)
    expect(r.mensal).toBeCloseTo(1)
  })
  it('converts annual to monthly', () => {
    const r = converterTaxaAnualParaMensal(12)
    expect(r.mensal).toBeLessThan(1)
  })
  it('converts daily to monthly', () => {
    const r = converterTaxaDiariaParaMensal(0.1)
    expect(r.mensal).toBeGreaterThan(0)
  })
})
