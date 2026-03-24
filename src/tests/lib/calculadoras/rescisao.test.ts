import { describe, it, expect } from 'vitest'
import { calcularRescisao, TipoDemissao } from '@/lib/calculadoras/rescisao'

describe('calcularRescisao', () => {
  const base = { salario: 3000, dataAdmissao: new Date(2020, 0, 1), dataDemissao: new Date(2026, 2, 24), tipoDemissao: 'sem_justa_causa' as TipoDemissao, saldoFGTS: 15000, dependentes: 0 }

  it('calculates sem justa causa', () => {
    const r = calcularRescisao(base)
    expect(r.saldoSalario).toBeGreaterThan(0)
    expect(r.multaFGTS).toBeGreaterThan(0)
    expect(r.total).toBeGreaterThan(0)
  })
  it('no FGTS penalty for justa causa', () => {
    const r = calcularRescisao({ ...base, tipoDemissao: 'justa_causa' })
    expect(r.multaFGTS).toBe(0)
    expect(r.avisoPrevio).toBe(0)
  })
  it('acordo gives 20% FGTS', () => {
    expect(calcularRescisao({ ...base, tipoDemissao: 'acordo' }).multaFGTS).toBeCloseTo(15000 * 0.20, 0)
  })
})
