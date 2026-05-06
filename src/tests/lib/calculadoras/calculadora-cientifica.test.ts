import { describe, it, expect } from 'vitest'
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'

describe('avaliarExpressao', () => {
  describe('basic arithmetic', () => {
    it('adds', () => expect(avaliarExpressao('2 + 3').resultado).toBeCloseTo(5))
    it('subtracts', () => expect(avaliarExpressao('10 - 4').resultado).toBeCloseTo(6))
    it('multiplies', () => expect(avaliarExpressao('3 * 7').resultado).toBeCloseTo(21))
    it('divides', () => expect(avaliarExpressao('20 / 4').resultado).toBeCloseTo(5))
    it('respects operator precedence', () => expect(avaliarExpressao('2 + 3 * 4').resultado).toBeCloseTo(14))
    it('handles parentheses', () => expect(avaliarExpressao('(2 + 3) * 4').resultado).toBeCloseTo(20))
  })

  describe('power', () => {
    it('calculates exponentiation', () => expect(avaliarExpressao('2^10').resultado).toBeCloseTo(1024))
    it('handles negative exponent', () => expect(avaliarExpressao('2^-1').resultado).toBeCloseTo(0.5))
  })

  describe('math functions', () => {
    it('sqrt', () => expect(avaliarExpressao('sqrt(16)').resultado).toBeCloseTo(4))
    it('abs of negative', () => expect(avaliarExpressao('abs(-5)').resultado).toBeCloseTo(5))
    it('sin(0)', () => expect(avaliarExpressao('sin(0)').resultado).toBeCloseTo(0))
    it('log(100)', () => expect(avaliarExpressao('log(100)').resultado).toBeCloseTo(2))
    it('ln(e)', () => expect(avaliarExpressao('ln(e)').resultado).toBeCloseTo(1))
  })

  describe('constants', () => {
    it('pi resolves to Math.PI', () => expect(avaliarExpressao('pi').resultado).toBeCloseTo(Math.PI))
    it('e resolves to Math.E', () => expect(avaliarExpressao('e').resultado).toBeCloseTo(Math.E))
  })

  describe('unary minus', () => {
    it('negates a number', () => expect(avaliarExpressao('-5 + 10').resultado).toBeCloseTo(5))
  })

  describe('error handling', () => {
    it('returns error for empty expression', () => {
      const r = avaliarExpressao('')
      expect(r.erro).toBeTruthy()
      expect(r.resultado).toBe(0)
    })

    it('returns error for invalid token', () => {
      const r = avaliarExpressao('foo(1)')
      // foo is not in FUNCS, parseFloat('foo(1)') yields NaN
      expect(r.erro).toBeTruthy()
    })

    it('returns error for division that yields Infinity', () => {
      // 1/0 in JS is Infinity which is caught by !isFinite check
      const r = avaliarExpressao('1/0')
      expect(r.erro).toBeTruthy()
    })

    it('handles sqrt of negative (NaN result)', () => {
      const r = avaliarExpressao('sqrt(-1)')
      expect(r.erro).toBeTruthy()
    })
  })

  describe('modulo', () => {
    it('calculates remainder', () => expect(avaliarExpressao('10 % 3').resultado).toBeCloseTo(1))
  })
})
