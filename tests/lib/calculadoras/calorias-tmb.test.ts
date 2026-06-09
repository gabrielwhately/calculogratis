import { describe, it, expect } from 'vitest'
import { calcularTMB } from '@/lib/calculadoras/calorias-tmb'

describe('calcularTMB', () => {
  it('calculates male TMB using Harris-Benedict revised formula', () => {
    // 88.362 + (13.397 * 70) + (4.799 * 175) - (5.677 * 30) = 1695.67
    const result = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.2 })
    const expected = 88.362 + 13.397 * 70 + 4.799 * 175 - 5.677 * 30
    expect(result.tmb).toBeCloseTo(expected)
  })

  it('calculates female TMB using Harris-Benedict revised formula', () => {
    // 447.593 + (9.247 * 60) + (3.098 * 165) - (4.330 * 28)
    const result = calcularTMB({ peso: 60, altura: 165, idade: 28, sexo: 'feminino', atividade: 1.375 })
    const expected = 447.593 + 9.247 * 60 + 3.098 * 165 - 4.330 * 28
    expect(result.tmb).toBeCloseTo(expected)
  })

  it('necessidadeDiaria equals tmb * atividade', () => {
    const result = calcularTMB({ peso: 75, altura: 180, idade: 35, sexo: 'masculino', atividade: 1.55 })
    expect(result.necessidadeDiaria).toBeCloseTo(result.tmb * 1.55)
  })

  it('male has higher TMB than female for same measurements', () => {
    const male = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.2 })
    const female = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'feminino', atividade: 1.2 })
    expect(male.tmb).toBeGreaterThan(female.tmb)
  })

  it('returns correct sexo label', () => {
    const male = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.2 })
    const female = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'feminino', atividade: 1.2 })
    expect(male.sexo).toBe('Masculino')
    expect(female.sexo).toBe('Feminino')
  })

  it('returns known atividade label for common factors', () => {
    const result = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.55 })
    expect(result.atividade).toContain('Moderado')
  })

  it('returns fallback atividade label for custom factor', () => {
    const result = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.6 })
    expect(result.atividade).toContain('1.6')
  })

  it('higher activity factor yields higher daily need', () => {
    const sedentary = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.2 })
    const active = calcularTMB({ peso: 70, altura: 175, idade: 30, sexo: 'masculino', atividade: 1.9 })
    expect(active.necessidadeDiaria).toBeGreaterThan(sedentary.necessidadeDiaria)
  })
})
