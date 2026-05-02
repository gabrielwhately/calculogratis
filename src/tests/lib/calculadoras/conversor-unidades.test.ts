import { describe, it, expect } from 'vitest'
import { converterUnidade } from '@/lib/calculadoras/conversor-unidades'

describe('Conversor de Unidades', () => {
  describe('Comprimento', () => {
    it('deve converter metros para quilômetros', () => {
      expect(converterUnidade(1000, 'm', 'km', 'comprimento')).toBe(1)
    })
    it('deve converter quilômetros para metros', () => {
      expect(converterUnidade(1, 'km', 'm', 'comprimento')).toBe(1000)
    })
  })

  describe('Peso', () => {
    it('deve converter quilogramas para gramas', () => {
      expect(converterUnidade(1, 'kg', 'g', 'peso')).toBe(1000)
    })
  })

  describe('Temperatura', () => {
    it('deve converter Celsius para Fahrenheit', () => {
      expect(converterUnidade(0, 'C', 'F', 'temperatura')).toBe(32)
      expect(converterUnidade(100, 'C', 'F', 'temperatura')).toBe(212)
    })
    it('deve converter Celsius para Kelvin', () => {
      expect(converterUnidade(0, 'C', 'K', 'temperatura')).toBe(273.15)
    })
  })

  describe('Volume', () => {
    it('deve converter litros para mililitros', () => {
      expect(converterUnidade(1, 'l', 'ml', 'volume')).toBe(1000)
    })
  })
})
