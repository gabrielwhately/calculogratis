import { describe, it, expect } from 'vitest'
import { validarCNPJ } from '@/lib/calculadoras/validador-cnpj'

describe('validarCNPJ', () => {
  describe('valid CNPJs', () => {
    it('accepts a known-valid formatted CNPJ', () => {
      // 11.222.333/0001-81 is a standard test CNPJ
      const r = validarCNPJ('11.222.333/0001-81')
      expect(r.valido).toBe(true)
    })

    it('accepts raw digits without formatting', () => {
      const r = validarCNPJ('11222333000181')
      expect(r.valido).toBe(true)
    })

    it('formats a raw CNPJ correctly', () => {
      const r = validarCNPJ('11222333000181')
      expect(r.cnpjFormatado).toBe('11.222.333/0001-81')
    })
  })

  describe('invalid CNPJs', () => {
    it('rejects CNPJ with fewer than 14 digits', () => {
      const r = validarCNPJ('1234567890123')
      expect(r.valido).toBe(false)
      expect(r.motivo).toMatch(/14 digitos/)
    })

    it('rejects CNPJ with more than 14 digits', () => {
      const r = validarCNPJ('123456789012345')
      expect(r.valido).toBe(false)
    })

    it('rejects all-same-digit CNPJs', () => {
      for (const d of '012345') {
        const r = validarCNPJ(d.repeat(14))
        expect(r.valido).toBe(false)
        expect(r.motivo).toMatch(/digitos iguais/)
      }
    })

    it('rejects CNPJ with wrong check digits', () => {
      // Modify last digit of a valid CNPJ
      const r = validarCNPJ('11222333000182')
      expect(r.valido).toBe(false)
      expect(r.motivo).toMatch(/verificadores/)
    })

    it('rejects empty string', () => {
      const r = validarCNPJ('')
      expect(r.valido).toBe(false)
    })
  })

  describe('input normalization', () => {
    it('strips punctuation before validating', () => {
      const formatted = validarCNPJ('11.222.333/0001-81')
      const raw = validarCNPJ('11222333000181')
      expect(formatted.valido).toBe(raw.valido)
    })

    it('cnpj field in result contains only digits', () => {
      const r = validarCNPJ('11.222.333/0001-81')
      expect(r.cnpj).toMatch(/^\d+$/)
    })
  })
})
