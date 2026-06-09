import { describe, it, expect } from 'vitest'
import { calcularIRRF } from '@/lib/calculadoras/irrf'

describe('calcularIRRF', () => {
  describe('happy path', () => {
    it('low salary is exempt from IRRF', () => {
      const r = calcularIRRF({ salarioBruto: 2000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      expect(r.faixa).toBe('Isento')
      expect(r.irrf).toBe(0)
    })

    it('medium salary falls into 7.5% bracket', () => {
      // bruto=3000, inss progressive, baseCalculo ~2650ish → 7.5% bracket
      const r = calcularIRRF({ salarioBruto: 3000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      expect(r.irrf).toBeGreaterThan(0)
      expect(r.aliquotaEfetiva).toBeGreaterThan(0)
      expect(r.aliquotaEfetiva).toBeLessThan(0.15)
    })

    it('high salary produces non-zero IRRF in 27.5% bracket', () => {
      const r = calcularIRRF({ salarioBruto: 15000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      expect(r.irrf).toBeGreaterThan(0)
      expect(r.faixa).toBe('27.5%')
    })

    it('each dependent reduces INSS base by R$189.59', () => {
      const without = calcularIRRF({ salarioBruto: 5000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      const with2 = calcularIRRF({ salarioBruto: 5000, dependentes: 2, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      expect(with2.baseCalculo).toBeCloseTo(without.baseCalculo - 2 * 189.59, 1)
      expect(with2.irrf).toBeLessThanOrEqual(without.irrf)
    })

    it('pensaoAlimenticia deducts fully from baseCalculo', () => {
      const without = calcularIRRF({ salarioBruto: 5000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      const with500 = calcularIRRF({ salarioBruto: 5000, dependentes: 0, pensaoAlimenticia: 500, outrasDeducoes: 0 })
      expect(with500.baseCalculo).toBeCloseTo(without.baseCalculo - 500, 1)
    })

    it('outrasDeducoes reduce baseCalculo', () => {
      const base = calcularIRRF({ salarioBruto: 6000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      const withExtra = calcularIRRF({ salarioBruto: 6000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 1000 })
      expect(withExtra.baseCalculo).toBeCloseTo(base.baseCalculo - 1000, 1)
    })
  })

  describe('edge cases', () => {
    it('zero salary produces zero irrf and zero aliquotaEfetiva', () => {
      const r = calcularIRRF({ salarioBruto: 0, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      expect(r.irrf).toBe(0)
      expect(r.aliquotaEfetiva).toBe(0)
    })

    it('deductions exceeding salary clamp baseCalculo to 0', () => {
      const r = calcularIRRF({ salarioBruto: 1000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 5000 })
      expect(r.baseCalculo).toBe(0)
      expect(r.irrf).toBe(0)
    })

    it('aliquotaEfetiva is always between 0 and 1', () => {
      const salaries = [1500, 3000, 5000, 10000, 20000]
      for (const s of salaries) {
        const r = calcularIRRF({ salarioBruto: s, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
        expect(r.aliquotaEfetiva).toBeGreaterThanOrEqual(0)
        expect(r.aliquotaEfetiva).toBeLessThanOrEqual(1)
      }
    })

    it('inss is always positive for positive salary', () => {
      const r = calcularIRRF({ salarioBruto: 3000, dependentes: 0, pensaoAlimenticia: 0, outrasDeducoes: 0 })
      expect(r.inss).toBeGreaterThan(0)
    })
  })
})
