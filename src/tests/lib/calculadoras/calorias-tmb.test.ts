import { describe, it, expect } from 'vitest'
import { calcularTMB } from '@/lib/calculadoras/calorias-tmb'

describe('Calculadora de TMB (Calorias)', () => {
  it('deve calcular TMB para sexo masculino', () => {
    const input = {
      peso: 80,
      altura: 180,
      idade: 30,
      sexo: 'masculino' as const,
      atividade: 1.2
    }
    const result = calcularTMB(input)
    expect(result.tmb).toBeGreaterThan(1850)
    expect(result.necessidadeDiaria).toBeGreaterThan(2220)
  })

  it('deve calcular TMB para sexo feminino', () => {
    const input = {
      peso: 60,
      altura: 165,
      idade: 25,
      sexo: 'feminino' as const,
      atividade: 1.55
    }
    const result = calcularTMB(input)
    expect(result.tmb).toBeGreaterThan(1400)
    expect(result.necessidadeDiaria).toBeGreaterThan(2170)
  })
})
