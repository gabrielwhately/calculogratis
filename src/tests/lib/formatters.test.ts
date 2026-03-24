import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, parseBRNumber, formatDate } from '@/lib/formatters'

describe('formatCurrency', () => {
  it('formats positive values as BRL', () => { expect(formatCurrency(1234.56)).toBe('R$ 1.234,56') })
  it('formats zero', () => { expect(formatCurrency(0)).toBe('R$ 0,00') })
  it('formats negative values', () => { expect(formatCurrency(-500)).toContain('500,00') })
})

describe('formatPercent', () => {
  it('formats decimal as percent', () => { expect(formatPercent(0.125)).toBe('12,50%') })
})

describe('parseBRNumber', () => {
  it('parses BR format: 1.234,56', () => { expect(parseBRNumber('1.234,56')).toBe(1234.56) })
  it('parses plain number: 1234.56', () => { expect(parseBRNumber('1234.56')).toBe(1234.56) })
  it('parses comma decimal: 1234,56', () => { expect(parseBRNumber('1234,56')).toBe(1234.56) })
  it('returns 0 for empty string', () => { expect(parseBRNumber('')).toBe(0) })
  it('returns 0 for invalid input', () => { expect(parseBRNumber('abc')).toBe(0) })
})

describe('formatDate', () => {
  it('formats Date to DD/MM/AAAA', () => { expect(formatDate(new Date(2026, 2, 24))).toBe('24/03/2026') })
})
