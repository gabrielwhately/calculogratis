import { describe, it, expect } from 'vitest'
import { calcularSimuladorInvestimentos } from '@/lib/calculadoras/simulador-investimentos'

describe('Simulador de Investimentos', () => {
  it('deve calcular o rendimento corretamente', () => {
    const input = {
      valorInicial: 1000,
      aporteMensal: 100,
      taxaAnual: 12,
      meses: 12
    }
    const result = calcularSimuladorInvestimentos(input)
    expect(result.montanteFinal).toBeGreaterThan(2200)
    expect(result.totalInvestido).toBe(2200)
    expect(result.evolucao.length).toBe(13) // mes 0 ao 12
  })
})
