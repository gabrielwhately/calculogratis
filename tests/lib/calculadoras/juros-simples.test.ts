import { describe, it, expect } from 'vitest'
import { calcularJurosSimples } from '@/lib/calculadoras/juros-simples'

describe('calcularJurosSimples', () => {
  describe('happy path', () => {
    it('basic calculation: 1000 at 1%/month for 12 months', () => {
      const r = calcularJurosSimples({ capital: 1000, taxaMensal: 1, meses: 12 })
      expect(r.juros).toBeCloseTo(120)
      expect(r.montante).toBeCloseTo(1120)
    })

    it('zero rate produces zero interest', () => {
      const r = calcularJurosSimples({ capital: 5000, taxaMensal: 0, meses: 24 })
      expect(r.juros).toBe(0)
      expect(r.montante).toBe(5000)
    })

    it('one month at 2%', () => {
      const r = calcularJurosSimples({ capital: 2000, taxaMensal: 2, meses: 1 })
      expect(r.juros).toBeCloseTo(40)
      expect(r.montante).toBeCloseTo(2040)
    })

    it('result fields echo inputs', () => {
      const r = calcularJurosSimples({ capital: 1500, taxaMensal: 1.5, meses: 6 })
      expect(r.capital).toBe(1500)
      expect(r.taxaMensal).toBe(1.5)
      expect(r.meses).toBe(6)
    })
  })

  describe('edge cases', () => {
    it('zero capital yields zero interest regardless of rate', () => {
      const r = calcularJurosSimples({ capital: 0, taxaMensal: 5, meses: 12 })
      expect(r.juros).toBe(0)
      expect(r.montante).toBe(0)
    })

    it('zero months yields zero interest', () => {
      const r = calcularJurosSimples({ capital: 1000, taxaMensal: 2, meses: 0 })
      expect(r.juros).toBe(0)
      expect(r.montante).toBe(1000)
    })

    it('juros = capital * (taxaMensal/100) * meses always holds', () => {
      const inputs = [
        { capital: 3000, taxaMensal: 1.2, meses: 18 },
        { capital: 500, taxaMensal: 3, meses: 6 },
        { capital: 10000, taxaMensal: 0.5, meses: 36 },
      ]
      for (const input of inputs) {
        const r = calcularJurosSimples(input)
        expect(r.juros).toBeCloseTo(input.capital * (input.taxaMensal / 100) * input.meses, 6)
      }
    })

    it('montante is always capital + juros', () => {
      const r = calcularJurosSimples({ capital: 2500, taxaMensal: 1.5, meses: 24 })
      expect(r.montante).toBeCloseTo(r.capital + r.juros, 6)
    })
  })
})
