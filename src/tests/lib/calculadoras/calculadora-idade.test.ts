import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calcularIdade } from '@/lib/calculadoras/calculadora-idade'

describe('Calculadora de Idade', () => {
  beforeEach(() => {
    // Mock data para 2026-05-02
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 4, 2)) // 2 de maio (mês 4 é maio em JS)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve calcular a idade corretamente', () => {
    const nascimento = new Date(1990, 0, 1) // 1 de jan de 1990
    const result = calcularIdade(nascimento)
    expect(result.anos).toBe(36)
    expect(result.meses).toBe(4)
    expect(result.dias).toBe(1)
  })

  it('deve calcular corretamente se ainda não fez aniversário no ano', () => {
    const nascimento = new Date(1990, 5, 10) // 10 de jun de 1990
    const result = calcularIdade(nascimento)
    expect(result.anos).toBe(35)
  })
})
