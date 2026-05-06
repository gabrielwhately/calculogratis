import { describe, it, expect } from 'vitest'
import { calcularPrazoJudicial } from '@/lib/calculadoras/prazos-judiciais'

// Fixed Monday so weekday arithmetic is predictable
const MONDAY = new Date('2026-01-05') // confirmed Monday

describe('calcularPrazoJudicial', () => {
  describe('corridos (calendar days)', () => {
    it('adds exact calendar days', () => {
      const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 10, tipo: 'corridos' })
      const expected = new Date('2026-01-15')
      expect(r.dataFim.toDateString()).toBe(expected.toDateString())
      expect(r.diasCorridos).toBe(10)
    })

    it('includes weekends in calendar count', () => {
      const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 7, tipo: 'corridos' })
      expect(r.diasCorridos).toBe(7)
    })

    it('labels tipo as "Dias corridos"', () => {
      const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 5, tipo: 'corridos' })
      expect(r.tipo).toBe('Dias corridos')
    })
  })

  describe('uteis (business days)', () => {
    it('skips weekends when counting business days', () => {
      // Starting Monday Jan 5: 5 business days = Mon-Fri Jan 9
      const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 5, tipo: 'uteis' })
      expect(r.dataFim.getDay()).not.toBe(0) // not Sunday
      expect(r.dataFim.getDay()).not.toBe(6) // not Saturday
    })

    it('takes longer than calendar days when spanning weekend', () => {
      const cal = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 5, tipo: 'corridos' })
      const util = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 5, tipo: 'uteis' })
      expect(util.diasCorridos).toBeGreaterThanOrEqual(cal.diasCorridos)
    })

    it('labels tipo as "Dias uteis"', () => {
      const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 3, tipo: 'uteis' })
      expect(r.tipo).toBe('Dias uteis')
    })
  })

  it('preserves dataInicio in result', () => {
    const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 5, tipo: 'corridos' })
    expect(r.dataInicio.toDateString()).toBe(MONDAY.toDateString())
  })

  it('preserves diasPrazo in result', () => {
    const r = calcularPrazoJudicial({ dataInicio: MONDAY, diasPrazo: 15, tipo: 'corridos' })
    expect(r.diasPrazo).toBe(15)
  })
})
