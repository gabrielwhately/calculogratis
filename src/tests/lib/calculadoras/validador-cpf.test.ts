import { describe, it, expect } from 'vitest'
import { validarCPF } from '@/lib/calculadoras/validador-cpf'

describe('Validador de CPF', () => {
  it('deve validar um CPF correto', () => {
    // CPF gerado para teste
    const result = validarCPF('12345678909')
    expect(result.valido).toBe(true)
  })

  it('deve validar um CPF formatado correto', () => {
    const result = validarCPF('123.456.789-09')
    expect(result.valido).toBe(true)
  })

  it('deve invalidar CPF com menos de 11 dígitos', () => {
    const result = validarCPF('123456789')
    expect(result.valido).toBe(false)
    expect(result.motivo).toContain('11 digitos')
  })

  it('deve invalidar CPF com todos os dígitos iguais', () => {
    const result = validarCPF('11111111111')
    expect(result.valido).toBe(false)
    expect(result.motivo).toContain('iguais')
  })

  it('deve invalidar CPF com dígitos verificadores errados', () => {
    const result = validarCPF('12345678900')
    expect(result.valido).toBe(false)
    expect(result.motivo).toContain('verificadores')
  })
})
