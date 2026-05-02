import { describe, it, expect } from 'vitest'
import { validarCNPJ } from '@/lib/calculadoras/validador-cnpj'

describe('Validador de CNPJ', () => {
  it('deve validar um CNPJ correto', () => {
    // CNPJ gerado para teste
    const result = validarCNPJ('12345678000195')
    expect(result.valido).toBe(true)
  })

  it('deve validar um CNPJ formatado correto', () => {
    const result = validarCNPJ('12.345.678/0001-95')
    expect(result.valido).toBe(true)
  })

  it('deve invalidar CNPJ com menos de 14 dígitos', () => {
    const result = validarCNPJ('123456780001')
    expect(result.valido).toBe(false)
  })

  it('deve invalidar CNPJ com todos os dígitos iguais', () => {
    const result = validarCNPJ('00000000000000')
    expect(result.valido).toBe(false)
  })

  it('deve invalidar CNPJ com dígitos verificadores errados', () => {
    const result = validarCNPJ('12345678000100')
    expect(result.valido).toBe(false)
  })
})
