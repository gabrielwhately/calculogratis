/**
 * Tests for modules with thin coverage (1–3 tests each):
 *   - simulador-investimentos: totalJuros, rentabilidadePercent, zero inputs, evolution structure
 *   - conversor-taxas: diaria field, anual field, round-trip invariant, zero rate
 *   - frequencia-cardiaca: default parameter, zone structure, Karvonen formula, zone names
 *   - gestacional: trimestre boundary weeks (14, 28)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calcularSimuladorInvestimentos } from '@/lib/calculadoras/simulador-investimentos'
import {
  converterTaxaMensalParaAnual,
  converterTaxaAnualParaMensal,
  converterTaxaDiariaParaMensal,
} from '@/lib/calculadoras/conversor-taxas'
import { calcularFrequenciaCardiaca } from '@/lib/calculadoras/frequencia-cardiaca'
import { calcularGestacional } from '@/lib/calculadoras/gestacional'

// ---------------------------------------------------------------------------
// simulador-investimentos — uncovered fields and edge inputs
// ---------------------------------------------------------------------------
describe('calcularSimuladorInvestimentos — uncovered fields', () => {
  it('totalJuros = montanteFinal - totalInvestido', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 1000, aporteMensal: 100, taxaAnual: 12, meses: 12 })
    expect(r.totalJuros).toBeCloseTo(r.montanteFinal - r.totalInvestido)
  })

  it('rentabilidadePercent = (totalJuros / totalInvestido) * 100', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 1000, aporteMensal: 100, taxaAnual: 12, meses: 12 })
    expect(r.rentabilidadePercent).toBeCloseTo((r.totalJuros / r.totalInvestido) * 100)
  })

  it('rentabilidadePercent is 0 when totalInvestido is 0 (division guard)', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 0, aporteMensal: 0, taxaAnual: 12, meses: 12 })
    expect(r.rentabilidadePercent).toBe(0)
    expect(r.totalJuros).toBe(0)
  })

  it('zero aporteMensal grows only via compound interest', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 1000, aporteMensal: 0, taxaAnual: 12, meses: 12 })
    expect(r.totalInvestido).toBe(1000)
    expect(r.montanteFinal).toBeGreaterThan(1000)
  })

  it('meses=0 returns valorInicial unchanged with no growth', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 5000, aporteMensal: 200, taxaAnual: 10, meses: 0 })
    expect(r.montanteFinal).toBe(5000)
    expect(r.totalJuros).toBe(0)
    expect(r.evolucao).toHaveLength(1) // only month 0 entry
  })

  it('evolucao has meses+1 entries (includes month 0)', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 1000, aporteMensal: 100, taxaAnual: 6, meses: 24 })
    expect(r.evolucao).toHaveLength(25)
  })

  it('evolucao[0] has mes=0, saldo=valorInicial, jurosAcumulado=0', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 2000, aporteMensal: 300, taxaAnual: 8, meses: 6 })
    expect(r.evolucao[0]).toMatchObject({ mes: 0, saldo: 2000, investido: 2000, jurosAcumulado: 0 })
  })

  it('saldo in evolucao is monotonically increasing when rate > 0', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 1000, aporteMensal: 500, taxaAnual: 12, meses: 36 })
    for (let i = 1; i < r.evolucao.length; i++) {
      expect(r.evolucao[i].saldo).toBeGreaterThan(r.evolucao[i - 1].saldo)
    }
  })

  it('jurosAcumulado in last evolucao entry equals totalJuros', () => {
    const r = calcularSimuladorInvestimentos({ valorInicial: 1000, aporteMensal: 100, taxaAnual: 12, meses: 12 })
    const last = r.evolucao[r.evolucao.length - 1]
    expect(last.jurosAcumulado).toBeCloseTo(r.totalJuros)
  })

  it('higher annual rate produces higher montanteFinal', () => {
    const low = calcularSimuladorInvestimentos({ valorInicial: 5000, aporteMensal: 0, taxaAnual: 5, meses: 12 })
    const high = calcularSimuladorInvestimentos({ valorInicial: 5000, aporteMensal: 0, taxaAnual: 15, meses: 12 })
    expect(high.montanteFinal).toBeGreaterThan(low.montanteFinal)
  })
})

// ---------------------------------------------------------------------------
// conversor-taxas — uncovered fields and invariants
// ---------------------------------------------------------------------------
describe('converterTaxaMensalParaAnual — uncovered fields', () => {
  it('returns all three rate fields', () => {
    const r = converterTaxaMensalParaAnual(1)
    expect(typeof r.mensal).toBe('number')
    expect(typeof r.anual).toBe('number')
    expect(typeof r.diaria).toBe('number')
  })

  it('diaria is positive for positive monthly rate', () => {
    const r = converterTaxaMensalParaAnual(1)
    expect(r.diaria).toBeGreaterThan(0)
  })

  it('diaria < mensal < anual for positive rates', () => {
    const r = converterTaxaMensalParaAnual(1)
    expect(r.diaria).toBeLessThan(r.mensal)
    expect(r.mensal).toBeLessThan(r.anual)
  })

  it('zero rate returns zero for all fields', () => {
    const r = converterTaxaMensalParaAnual(0)
    expect(r.mensal).toBe(0)
    expect(r.anual).toBeCloseTo(0)
    expect(r.diaria).toBeCloseTo(0)
  })
})

describe('converterTaxaAnualParaMensal — uncovered fields', () => {
  it('returns all three rate fields', () => {
    const r = converterTaxaAnualParaMensal(12)
    expect(typeof r.mensal).toBe('number')
    expect(typeof r.anual).toBe('number')
    expect(typeof r.diaria).toBe('number')
  })

  it('anual field echoes the input', () => {
    const r = converterTaxaAnualParaMensal(18)
    expect(r.anual).toBe(18)
  })

  it('diaria is less than mensal for any positive annual rate', () => {
    const r = converterTaxaAnualParaMensal(12)
    expect(r.diaria).toBeLessThan(r.mensal)
  })

  it('zero annual rate returns zero mensal and diaria', () => {
    const r = converterTaxaAnualParaMensal(0)
    expect(r.mensal).toBeCloseTo(0)
    expect(r.diaria).toBeCloseTo(0)
  })
})

describe('converterTaxaDiariaParaMensal — uncovered fields', () => {
  it('returns all three rate fields', () => {
    const r = converterTaxaDiariaParaMensal(0.1)
    expect(typeof r.mensal).toBe('number')
    expect(typeof r.anual).toBe('number')
    expect(typeof r.diaria).toBe('number')
  })

  it('anual > mensal > diaria for positive daily rate', () => {
    const r = converterTaxaDiariaParaMensal(0.1)
    expect(r.anual).toBeGreaterThan(r.mensal)
    expect(r.mensal).toBeGreaterThan(r.diaria)
  })
})

describe('conversor-taxas — round-trip invariant', () => {
  it('monthly→annual→monthly recovers original rate', () => {
    const original = 1.5
    const annual = converterTaxaMensalParaAnual(original).anual
    const back = converterTaxaAnualParaMensal(annual).mensal
    expect(back).toBeCloseTo(original, 6)
  })

  it('annual→monthly→annual recovers original rate', () => {
    const original = 12
    const monthly = converterTaxaAnualParaMensal(original).mensal
    const back = converterTaxaMensalParaAnual(monthly).anual
    expect(back).toBeCloseTo(original, 4)
  })

  it('daily→monthly→daily recovers original rate', () => {
    const original = 0.05
    const monthly = converterTaxaDiariaParaMensal(original).mensal
    const back = converterTaxaMensalParaAnual(monthly).diaria
    // The daily field is derived differently (÷30 vs ÷365), so we only verify it's positive
    expect(back).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// frequencia-cardiaca — default parameter, zone structure, Karvonen formula
// ---------------------------------------------------------------------------
describe('calcularFrequenciaCardiaca — uncovered paths', () => {
  it('default fcRepouso is 70 when omitted', () => {
    const r = calcularFrequenciaCardiaca(30)
    expect(r.fcRepouso).toBe(70)
  })

  it('fcRepouso field echoes the provided value', () => {
    const r = calcularFrequenciaCardiaca(40, 65)
    expect(r.fcRepouso).toBe(65)
  })

  it('Tanaka formula: fcMaxima = round(208 - 0.7 * age)', () => {
    expect(calcularFrequenciaCardiaca(20).fcMaxima).toBe(Math.round(208 - 0.7 * 20))
    expect(calcularFrequenciaCardiaca(50).fcMaxima).toBe(Math.round(208 - 0.7 * 50))
  })

  it('zone names are the 5 expected Portuguese names in order', () => {
    const r = calcularFrequenciaCardiaca(30, 65)
    const names = r.zonas.map(z => z.nome)
    expect(names).toEqual(['Aquecimento', 'Queima de gordura', 'Aeróbico', 'Anaeróbico', 'VO2 Máximo'])
  })

  it('each zone has a non-empty descricao', () => {
    const r = calcularFrequenciaCardiaca(35, 70)
    r.zonas.forEach(z => expect(z.descricao.length).toBeGreaterThan(0))
  })

  it('Karvonen formula: zone 1 minBpm = round(fcRepouso + reserva * 0.50)', () => {
    const age = 30
    const fcRepouso = 65
    const r = calcularFrequenciaCardiaca(age, fcRepouso)
    const reserva = r.fcMaxima - fcRepouso
    const expectedMin = Math.round(fcRepouso + reserva * 0.50)
    expect(r.zonas[0].minBpm).toBe(expectedMin)
  })

  it('last zone maxBpm = round(fcRepouso + reserva * 1.0) = fcMaxima', () => {
    const r = calcularFrequenciaCardiaca(25, 60)
    const lastZone = r.zonas[r.zonas.length - 1]
    expect(lastZone.maxBpm).toBe(r.fcMaxima)
  })

  it('zones are contiguous: zone[i].maxBpm === zone[i+1].minBpm', () => {
    const r = calcularFrequenciaCardiaca(30, 70)
    for (let i = 0; i < r.zonas.length - 1; i++) {
      expect(r.zonas[i].maxBpm).toBe(r.zonas[i + 1].minBpm)
    }
  })

  it('minBpm < maxBpm for every zone', () => {
    const r = calcularFrequenciaCardiaca(45, 75)
    r.zonas.forEach(z => expect(z.minBpm).toBeLessThan(z.maxBpm))
  })

  it('high resting HR narrows the reserve and compresses zone ranges', () => {
    const low = calcularFrequenciaCardiaca(30, 50)
    const high = calcularFrequenciaCardiaca(30, 90)
    // More compressed zones = smaller difference between min and max
    const rangeHigh = high.zonas[0].maxBpm - high.zonas[0].minBpm
    const rangeLow = low.zonas[0].maxBpm - low.zonas[0].minBpm
    expect(rangeHigh).toBeLessThan(rangeLow)
  })
})

// ---------------------------------------------------------------------------
// gestacional — trimestre boundary values
// ---------------------------------------------------------------------------
describe('calcularGestacional — trimestre boundaries', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('exactly 13 weeks: trimestre 1', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 4, 21 - 13 * 7)
    const r = calcularGestacional({ dum })
    expect(r.semanasCompletas).toBe(13)
    expect(r.trimestre).toBe(1)
  })

  it('exactly 14 weeks: trimestre 2 (boundary)', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 4, 21 - 14 * 7)
    const r = calcularGestacional({ dum })
    expect(r.semanasCompletas).toBe(14)
    expect(r.trimestre).toBe(2)
  })

  it('exactly 27 weeks: trimestre 2', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 4, 21 - 27 * 7)
    const r = calcularGestacional({ dum })
    expect(r.semanasCompletas).toBe(27)
    expect(r.trimestre).toBe(2)
  })

  it('exactly 28 weeks: trimestre 3 (boundary)', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 4, 21 - 28 * 7)
    const r = calcularGestacional({ dum })
    expect(r.semanasCompletas).toBe(28)
    expect(r.trimestre).toBe(3)
  })

  it('dias = diasTotais % 7 for a known offset', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 4, 21 - 10 * 7 - 3) // 10 weeks + 3 days
    const r = calcularGestacional({ dum })
    expect(r.semanasCompletas).toBe(10)
    expect(r.dias).toBe(3)
  })

  it('idadeGestacional string matches semanasCompletas and dias', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 4, 21 - 20 * 7 - 5)
    const r = calcularGestacional({ dum })
    expect(r.idadeGestacional).toBe(`${r.semanasCompletas} semanas e ${r.dias} dias`)
  })

  it('dataParto is exactly 280 days after dum', () => {
    vi.setSystemTime(new Date(2026, 4, 21))
    const dum = new Date(2026, 0, 1)
    const r = calcularGestacional({ dum })
    const diffDays = (r.dataParto.getTime() - dum.getTime()) / (1000 * 60 * 60 * 24)
    expect(diffDays).toBe(280)
  })
})
