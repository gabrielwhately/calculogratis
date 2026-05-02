import { describe, it, expect } from 'vitest'
import { calcularRegraDeTres } from '@/lib/calculadoras/regra-de-tres'

describe('Regra de Três', () => {
  it('deve calcular regra de três direta', () => {
    // Se 2 está para 4, então 4 está para X (X=8)
    const result = calcularRegraDeTres(2, 4, 4, 'direta')
    expect(result.x).toBe(8)
  })

  it('deve calcular regra de três inversa', () => {
    // Se 2 operários levam 10 horas, 4 operários levam X (X=5)
    const result = calcularRegraDeTres(2, 10, 4, 'inversa')
    expect(result.x).toBe(5)
  })
})
