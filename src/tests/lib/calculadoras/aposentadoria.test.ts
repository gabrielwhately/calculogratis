import { describe, it, expect } from 'vitest'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'

describe('calcularAposentadoria', () => {
  it('qualifies man at 66 with 25 years', () => {
    const r = calcularAposentadoria({ idade: 66, sexo: 'masculino', anosContribuicao: 25, mediaSalarios: 4000 })
    expect(r.podeAposentar).toBe(true)
    expect(r.anosRestantes).toBe(0)
  })
  it('calculates remaining years', () => {
    const r = calcularAposentadoria({ idade: 40, sexo: 'masculino', anosContribuicao: 10, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.anosRestantes).toBe(25)
  })
  it('uses women rules', () => {
    expect(calcularAposentadoria({ idade: 62, sexo: 'feminino', anosContribuicao: 15, mediaSalarios: 3000 }).podeAposentar).toBe(true)
  })
  it('calculates benefit percentage', () => {
    expect(calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 30, mediaSalarios: 5000 }).percentualBeneficio).toBeCloseTo(0.80)
  })
})
