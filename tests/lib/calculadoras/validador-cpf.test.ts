import { describe, it, expect } from 'vitest'
import { validarCPF } from '@/lib/calculadoras/validador-cpf'

describe('validarCPF', () => {
  describe('valid CPFs', () => {
    it('accepts a known-valid formatted CPF', () => {
      // 529.982.247-25 is a standard test CPF
      const r = validarCPF('529.982.247-25')
      expect(r.valido).toBe(true)
      expect(r.cpfFormatado).toBe('529.982.247-25')
    })

    it('accepts raw digits without formatting', () => {
      const r = validarCPF('52998224725')
      expect(r.valido).toBe(true)
    })

    it('formats a raw CPF correctly', () => {
      const r = validarCPF('52998224725')
      expect(r.cpfFormatado).toBe('529.982.247-25')
    })
  })

  describe('invalid CPFs', () => {
    it('rejects CPF with fewer than 11 digits', () => {
      const r = validarCPF('123456789')
      expect(r.valido).toBe(false)
      expect(r.motivo).toMatch(/11 digitos/)
    })

    it('rejects CPF with more than 11 digits', () => {
      const r = validarCPF('123456789012')
      expect(r.valido).toBe(false)
    })

    it('rejects all-same-digit CPFs (000...000)', () => {
      for (const d of '0123456789') {
        const r = validarCPF(d.repeat(11))
        expect(r.valido).toBe(false)
        expect(r.motivo).toMatch(/digitos iguais/)
      }
    })

    it('rejects CPF with wrong first check digit', () => {
      // Flip the 10th digit of a valid CPF
      const r = validarCPF('52998224715') // last two changed to 15
      expect(r.valido).toBe(false)
      expect(r.motivo).toMatch(/verificadores/)
    })

    it('rejects CPF with wrong second check digit', () => {
      const r = validarCPF('52998224724') // only last digit changed
      expect(r.valido).toBe(false)
    })

    it('rejects empty string', () => {
      const r = validarCPF('')
      expect(r.valido).toBe(false)
    })
  })

  describe('input normalization', () => {
    it('strips dots and dashes before validating', () => {
      const formatted = validarCPF('529.982.247-25')
      const raw = validarCPF('52998224725')
      expect(formatted.valido).toBe(raw.valido)
      expect(formatted.cpf).toBe(raw.cpf)
    })

    it('cpf field in result contains only digits', () => {
      const r = validarCPF('529.982.247-25')
      expect(r.cpf).toMatch(/^\d+$/)
    })
  })
})
