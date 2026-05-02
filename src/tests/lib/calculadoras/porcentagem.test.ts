import { describe, it, expect } from 'vitest'
import { 
  calcularPorcentagemDe, 
  calcularAumento, 
  calcularDesconto, 
  calcularVariacao, 
  calcularRepresentacao 
} from '@/lib/calculadoras/porcentagem'

describe('Calculadora de Porcentagem', () => {
  it('deve calcular porcentagem de um valor', () => {
    const result = calcularPorcentagemDe(1000, 15)
    expect(result.resultado).toBe(150)
  })

  it('deve calcular aumento percentual', () => {
    const result = calcularAumento(1000, 15)
    expect(result.resultado).toBe(1150)
  })

  it('deve calcular desconto percentual', () => {
    const result = calcularDesconto(1000, 15)
    expect(result.resultado).toBe(850)
  })

  it('deve calcular variação percentual entre dois valores', () => {
    const result = calcularVariacao(1000, 1200)
    expect(result.porcentagem).toBe(20)
  })

  it('deve calcular quanto uma parte representa do total', () => {
    const result = calcularRepresentacao(250, 1000)
    expect(result.porcentagem).toBe(25)
  })
})
