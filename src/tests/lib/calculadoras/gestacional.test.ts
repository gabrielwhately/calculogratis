import { describe, it, expect } from 'vitest'
import { calcularGestacional } from '@/lib/calculadoras/gestacional'

describe('calcularGestacional', () => {
  it('calculates parto date as dum + 280 days', () => {
    const dum = new Date('2026-01-01')
    const r = calcularGestacional({ dum })
    const expectedParto = new Date('2026-10-08') // 280 days after Jan 1
    expect(r.dataParto.toDateString()).toBe(expectedParto.toDateString())
  })

  it('clamps negative weeks to 0 for future DUM', () => {
    const futureDum = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week in future
    const r = calcularGestacional({ dum: futureDum })
    expect(r.semanasCompletas).toBe(0)
    expect(r.dias).toBe(0)
  })

  it('calculates trimester correctly', () => {
    const dumWeek6 = new Date(Date.now() - 6 * 7 * 24 * 60 * 60 * 1000)
    const r6 = calcularGestacional({ dum: dumWeek6 })
    expect(r6.trimestre).toBe(1)

    const dumWeek20 = new Date(Date.now() - 20 * 7 * 24 * 60 * 60 * 1000)
    const r20 = calcularGestacional({ dum: dumWeek20 })
    expect(r20.trimestre).toBe(2)

    const dumWeek30 = new Date(Date.now() - 30 * 7 * 24 * 60 * 60 * 1000)
    const r30 = calcularGestacional({ dum: dumWeek30 })
    expect(r30.trimestre).toBe(3)
  })

  it('formats idadeGestacional string correctly', () => {
    const dum = new Date(Date.now() - 10 * 7 * 24 * 60 * 60 * 1000) // ~10 weeks ago
    const r = calcularGestacional({ dum })
    expect(r.idadeGestacional).toMatch(/^\d+ semanas e \d+ dias$/)
  })

  it('returns the original dum in result', () => {
    const dum = new Date('2025-09-01')
    const r = calcularGestacional({ dum })
    expect(r.dum.toDateString()).toBe(dum.toDateString())
  })
})
