import { describe, it, expect } from 'vitest'
import { calcularInsalubridade, calcularPericulosidade } from '@/lib/calculadoras/insalubridade'

describe('calcularInsalubridade', () => {
  it('calculates minimum degree (10%)', () => {
    const r = calcularInsalubridade(3000, 'minimo', 1518)
    expect(r.valorAdicional).toBeCloseTo(151.8)
    expect(r.salarioComAdicional).toBeCloseTo(3151.8)
  })
  it('calculates medium degree (20%)', () => {
    const r = calcularInsalubridade(3000, 'medio', 1518)
    expect(r.valorAdicional).toBeCloseTo(303.6)
  })
  it('calculates maximum degree (40%)', () => {
    const r = calcularInsalubridade(3000, 'maximo', 1518)
    expect(r.valorAdicional).toBeCloseTo(607.2)
  })
  it('uses salario minimo as base by default', () => {
    const r = calcularInsalubridade(5000, 'medio', 1518)
    expect(r.baseCalculo).toBe(1518)
  })
})

describe('calcularPericulosidade', () => {
  it('calculates 30% over gross salary', () => {
    const r = calcularPericulosidade(3000)
    expect(r.valorAdicional).toBeCloseTo(900)
    expect(r.salarioComAdicional).toBeCloseTo(3900)
  })
})
