import { describe, it, expect } from 'vitest'
import { calcularFinanciamentoPrice, calcularFinanciamentoSAC } from '@/lib/calculadoras/financiamento'

describe('Price', () => {
  it('calculates Price table', () => {
    const r = calcularFinanciamentoPrice({ valorImovel: 300000, entrada: 60000, taxaAnual: 12, prazoMeses: 360 })
    expect(r.valorFinanciado).toBe(240000)
    expect(r.parcela).toBeGreaterThan(2000)
    expect(r.parcelas).toHaveLength(360)
    expect(r.parcelas[0].parcela).toBeCloseTo(r.parcelas[359].parcela, 0)
  })
  it('zero interest', () => {
    expect(calcularFinanciamentoPrice({ valorImovel: 100000, entrada: 0, taxaAnual: 0, prazoMeses: 100 }).parcela).toBeCloseTo(1000)
  })
})
describe('SAC', () => {
  it('calculates SAC table', () => {
    const r = calcularFinanciamentoSAC({ valorImovel: 300000, entrada: 60000, taxaAnual: 12, prazoMeses: 360 })
    expect(r.valorFinanciado).toBe(240000)
    expect(r.parcelas[0].parcela).toBeGreaterThan(r.parcelas[359].parcela)
    expect(r.parcelas[0].amortizacao).toBeCloseTo(r.parcelas[359].amortizacao, 2)
  })
})
