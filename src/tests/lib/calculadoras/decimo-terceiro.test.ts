import { describe, it, expect } from 'vitest'
import { calcularDecimoTerceiro } from '@/lib/calculadoras/decimo-terceiro'

describe('calcularDecimoTerceiro', () => {
  it('calculates full 13th salary for 12 months', () => {
    const r = calcularDecimoTerceiro({ salarioBruto: 3000, mesesTrabalhados: 12, dependentes: 0, outrasDeducoes: 0 })
    expect(r.valorBruto).toBeCloseTo(3000)
    expect(r.valorLiquido).toBeLessThan(3000)
  })
  it('calculates proportional 13th for 6 months', () => {
    const r = calcularDecimoTerceiro({ salarioBruto: 3000, mesesTrabalhados: 6, dependentes: 0, outrasDeducoes: 0 })
    expect(r.valorBruto).toBeCloseTo(1500)
  })
  it('deducts INSS and IRRF', () => {
    const r = calcularDecimoTerceiro({ salarioBruto: 5000, mesesTrabalhados: 12, dependentes: 0, outrasDeducoes: 0 })
    expect(r.inss).toBeGreaterThan(0)
    expect(r.valorLiquido).toBeLessThan(r.valorBruto)
  })
})
