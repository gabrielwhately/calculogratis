import { describe, it, expect } from 'vitest'
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'

describe('avaliarExpressao', () => {
  describe('basic arithmetic', () => {
    it('adds two numbers', () => expect(avaliarExpressao('2+3').resultado).toBe(5))
    it('subtracts', () => expect(avaliarExpressao('10-4').resultado).toBe(6))
    it('multiplies', () => expect(avaliarExpressao('3*4').resultado).toBe(12))
    it('divides', () => expect(avaliarExpressao('10/2').resultado).toBe(5))
    it('modulo', () => expect(avaliarExpressao('10%3').resultado).toBe(1))
    it('handles operator precedence (mul before add)', () => {
      expect(avaliarExpressao('2+3*4').resultado).toBe(14)
    })
  })

  describe('power operator', () => {
    it('raises to power', () => expect(avaliarExpressao('2^10').resultado).toBe(1024))
    it('power is right-associative', () => {
      // 2^3^2 = 2^(3^2) = 2^9 = 512
      expect(avaliarExpressao('2^3^2').resultado).toBe(512)
    })
  })

  describe('parentheses', () => {
    it('overrides operator precedence', () => {
      expect(avaliarExpressao('(2+3)*4').resultado).toBe(20)
    })
    it('handles nested parentheses', () => {
      expect(avaliarExpressao('((2+3)*2)+1').resultado).toBe(11)
    })
  })

  describe('unary operators', () => {
    it('handles unary negative', () => expect(avaliarExpressao('-5+10').resultado).toBe(5))
    it('handles unary positive', () => expect(avaliarExpressao('+5').resultado).toBe(5))
  })

  describe('constants', () => {
    it('resolves pi', () => expect(avaliarExpressao('pi').resultado).toBeCloseTo(Math.PI))
    it('resolves e', () => expect(avaliarExpressao('e').resultado).toBeCloseTo(Math.E))
    it('uses pi in expression', () => {
      expect(avaliarExpressao('2*pi').resultado).toBeCloseTo(2 * Math.PI)
    })
  })

  describe('math functions', () => {
    it('sin(0) = 0', () => expect(avaliarExpressao('sin(0)').resultado).toBeCloseTo(0))
    it('cos(0) = 1', () => expect(avaliarExpressao('cos(0)').resultado).toBeCloseTo(1))
    it('sqrt(9) = 3', () => expect(avaliarExpressao('sqrt(9)').resultado).toBeCloseTo(3))
    it('abs(-5) = 5', () => expect(avaliarExpressao('abs(-5)').resultado).toBe(5))
    it('log(100) = 2 (base 10)', () => expect(avaliarExpressao('log(100)').resultado).toBeCloseTo(2))
    it('ln(e) = 1', () => expect(avaliarExpressao('ln(e)').resultado).toBeCloseTo(1))
    it('ceil(1.2) = 2', () => expect(avaliarExpressao('ceil(1.2)').resultado).toBe(2))
    it('floor(1.9) = 1', () => expect(avaliarExpressao('floor(1.9)').resultado).toBe(1))
    it('round(1.5) = 2', () => expect(avaliarExpressao('round(1.5)').resultado).toBe(2))
  })

  describe('error handling', () => {
    it('returns error for empty expression', () => {
      const result = avaliarExpressao('')
      expect(result.erro).toBeDefined()
      expect(result.resultado).toBe(0)
    })

    it('returns error for unknown identifier (not a number or function)', () => {
      // unknown token resolves to NaN → 'Resultado invalido'
      const result = avaliarExpressao('foo')
      expect(result.erro).toBeDefined()
      expect(result.resultado).toBe(0)
    })

    it('returns error for division producing NaN', () => {
      // sqrt(-1) = NaN
      const result = avaliarExpressao('sqrt(-1)')
      expect(result.erro).toBeDefined()
    })

    it('returns error for division by zero (Infinity)', () => {
      const result = avaliarExpressao('1/0')
      expect(result.erro).toBeDefined()
      expect(result.resultado).toBe(0)
    })
  })

  describe('whitespace handling', () => {
    it('ignores spaces in expression', () => {
      expect(avaliarExpressao('2 + 3').resultado).toBe(5)
    })
  })

  describe('decimal numbers', () => {
    it('parses decimal numbers', () => {
      expect(avaliarExpressao('1.5+1.5').resultado).toBe(3)
    })
  })
})
