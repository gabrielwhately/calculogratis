import { describe, it, expect } from 'vitest'
import { calcularMarkup, calcularMarkupPorMargem, calcularMarkupPorPreco } from '@/lib/calculadoras/markup'

describe('calcularMarkup', () => {
  it('calculates price from cost and markup', () => {
    const r = calcularMarkup(50, 100)
    expect(r.precoVenda).toBeCloseTo(100)
    expect(r.lucro).toBeCloseTo(50)
    expect(r.margemLucro).toBeCloseTo(50)
  })
  it('handles zero markup', () => {
    const r = calcularMarkup(100, 0)
    expect(r.precoVenda).toBeCloseTo(100)
    expect(r.lucro).toBeCloseTo(0)
  })
})

describe('calcularMarkupPorMargem', () => {
  it('calculates price from desired margin', () => {
    const r = calcularMarkupPorMargem(50, 50)
    expect(r.precoVenda).toBeCloseTo(100)
    expect(r.markup).toBeCloseTo(100)
  })
})

describe('calcularMarkupPorPreco', () => {
  it('discovers markup from sale price', () => {
    const r = calcularMarkupPorPreco(50, 100)
    expect(r.markup).toBeCloseTo(100)
    expect(r.margemLucro).toBeCloseTo(50)
  })
})
