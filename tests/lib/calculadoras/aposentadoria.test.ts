import { describe, it, expect } from 'vitest'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'

describe('calcularAposentadoria', () => {
  it('approves male who meets all requirements', () => {
    const result = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 20, mediaSalarios: 3000 })
    expect(result.podeAposentar).toBe(true)
    expect(result.motivoNegativa).toHaveLength(0)
    expect(result.anosRestantes).toBe(0)
  })

  it('approves female who meets all requirements', () => {
    const result = calcularAposentadoria({ idade: 62, sexo: 'feminino', anosContribuicao: 15, mediaSalarios: 2500 })
    expect(result.podeAposentar).toBe(true)
    expect(result.motivoNegativa).toHaveLength(0)
  })

  it('rejects male who is too young', () => {
    const result = calcularAposentadoria({ idade: 60, sexo: 'masculino', anosContribuicao: 25, mediaSalarios: 3000 })
    expect(result.podeAposentar).toBe(false)
    expect(result.motivoNegativa).toHaveLength(1)
    expect(result.anosRestantes).toBe(5)
  })

  it('rejects male with insufficient contribution years', () => {
    const result = calcularAposentadoria({ idade: 67, sexo: 'masculino', anosContribuicao: 15, mediaSalarios: 3000 })
    expect(result.podeAposentar).toBe(false)
    expect(result.motivoNegativa).toHaveLength(1)
    expect(result.anosRestantes).toBe(5)
  })

  it('rejects when both conditions fail', () => {
    const result = calcularAposentadoria({ idade: 50, sexo: 'masculino', anosContribuicao: 10, mediaSalarios: 3000 })
    expect(result.podeAposentar).toBe(false)
    expect(result.motivoNegativa).toHaveLength(2)
    // anosRestantes = max(15 missing age, 10 missing contribution) = 15
    expect(result.anosRestantes).toBe(15)
  })

  it('calculates base benefit (aliquota_base = 0.6) with no extra years', () => {
    const result = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 20, mediaSalarios: 5000 })
    expect(result.percentualBeneficio).toBe(0.6)
    expect(result.valorEstimado).toBe(5000 * 0.6)
  })

  it('adds 2% per extra year of contribution beyond minimum', () => {
    const result = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 25, mediaSalarios: 5000 })
    // 5 extra years * 2% = 10% extra → 0.70
    expect(result.percentualBeneficio).toBeCloseTo(0.70)
    expect(result.valorEstimado).toBeCloseTo(5000 * 0.70)
  })

  it('caps benefit at 100%', () => {
    const result = calcularAposentadoria({ idade: 70, sexo: 'masculino', anosContribuicao: 60, mediaSalarios: 3000 })
    expect(result.percentualBeneficio).toBe(1)
  })

  it('returns correct minimum ages per sex', () => {
    const m = calcularAposentadoria({ idade: 30, sexo: 'masculino', anosContribuicao: 20, mediaSalarios: 1000 })
    const f = calcularAposentadoria({ idade: 30, sexo: 'feminino', anosContribuicao: 15, mediaSalarios: 1000 })
    expect(m.idadeMinima).toBe(65)
    expect(f.idadeMinima).toBe(62)
    expect(m.tempoMinimoContribuicao).toBe(20)
    expect(f.tempoMinimoContribuicao).toBe(15)
  })
})
