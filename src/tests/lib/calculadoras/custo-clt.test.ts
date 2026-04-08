import { describe, it, expect } from 'vitest'
import { calcularCustoCLT } from '@/lib/calculadoras/custo-clt'

describe('calcularCustoCLT', () => {
  it('calculates total CLT cost higher than gross salary', () => {
    const r = calcularCustoCLT({ salarioBruto: 3000, valeTransporte: 200, valeRefeicao: 500, planoSaude: 300 })
    expect(r.custoTotal).toBeGreaterThan(3000)
    expect(r.inssPatronal).toBeGreaterThan(0)
    expect(r.fgts).toBeGreaterThan(0)
  })
  it('includes provisioned 13th and vacation costs', () => {
    const r = calcularCustoCLT({ salarioBruto: 3000, valeTransporte: 0, valeRefeicao: 0, planoSaude: 0 })
    expect(r.provisao13).toBeGreaterThan(0)
    expect(r.provisaoFerias).toBeGreaterThan(0)
  })
})
