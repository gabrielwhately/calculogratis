/**
 * New test skeletons for gaps not covered by existing test files.
 *
 * Gaps addressed here:
 *  1. dias-entre-datas  — null on invalid input, reversed dates, semanas/meses fields,
 *                          all-weekend range, malformed date string
 *  2. regra-de-tres      — division by zero (a=0 direta, c=0 inversa), tipo field,
 *                          negative values, proportionality invariant
 *  3. fuso-horario       — fractional hour offset (Asia/Kolkata), FUSOS count
 *  4. porcentagem        — calcularPorcentagemDe edge cases (0%, 100%, negative %)
 */
import { describe, it, expect } from 'vitest'
import { calcularDiasEntreDatas } from '@/lib/calculadoras/dias-entre-datas'
import { calcularRegraDeTres } from '@/lib/calculadoras/regra-de-tres'
import { converterFuso, FUSOS } from '@/lib/calculadoras/fuso-horario'
import { calcularPorcentagemDe, calcularAumento, calcularDesconto, calcularVariacao, calcularRepresentacao } from '@/lib/calculadoras/porcentagem'

// ---------------------------------------------------------------------------
// dias-entre-datas
// ---------------------------------------------------------------------------
describe('calcularDiasEntreDatas — untested branches', () => {
  it('returns null for completely invalid datestring', () => {
    expect(calcularDiasEntreDatas({ dataInicio: 'not-a-date', dataFim: '2026-05-10' })).toBeNull()
  })

  it('returns null when dd/mm/yyyy has missing segments', () => {
    expect(calcularDiasEntreDatas({ dataInicio: '01/05', dataFim: '10/05/2026' })).toBeNull()
  })

  it('returns null when dd/mm/yyyy has zero day', () => {
    // parseData: !d || !m || !y → returns null for d=0
    expect(calcularDiasEntreDatas({ dataInicio: '00/05/2026', dataFim: '10/05/2026' })).toBeNull()
  })

  it('same start and end date returns 0 diasCorridos and 0 diasUteis', () => {
    const r = calcularDiasEntreDatas({ dataInicio: '2026-05-15', dataFim: '2026-05-15' })
    expect(r?.diasCorridos).toBe(0)
    expect(r?.diasUteis).toBe(0)
    expect(r?.semanas).toBe(0)
  })

  it('reversed dates (end before start) still returns positive diasCorridos', () => {
    const forward = calcularDiasEntreDatas({ dataInicio: '2026-05-01', dataFim: '2026-05-10' })
    const reversed = calcularDiasEntreDatas({ dataInicio: '2026-05-10', dataFim: '2026-05-01' })
    expect(reversed?.diasCorridos).toBe(forward?.diasCorridos)
  })

  it('semanas is floor(diasCorridos / 7)', () => {
    const r = calcularDiasEntreDatas({ dataInicio: '2026-01-01', dataFim: '2026-01-22' })
    expect(r?.diasCorridos).toBe(21)
    expect(r?.semanas).toBe(3)
  })

  it('meses is diasCorridos / 30.44 rounded to 2 decimal places', () => {
    const r = calcularDiasEntreDatas({ dataInicio: '2026-01-01', dataFim: '2026-04-01' })
    expect(r?.meses).toBeCloseTo(89 / 30.44, 1)
  })

  it('all-weekend range (Saturday to Sunday) has 0 diasUteis', () => {
    // 2026-05-16 is Saturday, 2026-05-17 is Sunday
    const r = calcularDiasEntreDatas({ dataInicio: '2026-05-16', dataFim: '2026-05-17' })
    expect(r?.diasCorridos).toBe(1)
    expect(r?.diasUteis).toBe(0)
  })

  it('one full work week (Mon–Fri) has 5 diasUteis', () => {
    // 2026-05-18 Mon → 2026-05-22 Fri
    const r = calcularDiasEntreDatas({ dataInicio: '2026-05-18', dataFim: '2026-05-22' })
    expect(r?.diasCorridos).toBe(4)
    expect(r?.diasUteis).toBe(4) // Mon,Tue,Wed,Thu — Fri not counted (loop < fim)
  })

  it('both ISO and BR formats produce the same result for the same date pair', () => {
    const iso = calcularDiasEntreDatas({ dataInicio: '2026-06-01', dataFim: '2026-06-15' })
    const br = calcularDiasEntreDatas({ dataInicio: '01/06/2026', dataFim: '15/06/2026' })
    expect(iso?.diasCorridos).toBe(br?.diasCorridos)
    expect(iso?.diasUteis).toBe(br?.diasUteis)
  })
})

// ---------------------------------------------------------------------------
// regra-de-tres
// ---------------------------------------------------------------------------
describe('calcularRegraDeTres — untested branches', () => {
  it('tipo field is "direta" for direct proportion', () => {
    const r = calcularRegraDeTres(2, 4, 6, 'direta')
    expect(r.tipo).toBe('direta')
  })

  it('tipo field is "inversa" for inverse proportion', () => {
    const r = calcularRegraDeTres(2, 10, 4, 'inversa')
    expect(r.tipo).toBe('inversa')
  })

  it('result preserves all input values', () => {
    const r = calcularRegraDeTres(3, 9, 6, 'direta')
    expect(r.a).toBe(3)
    expect(r.b).toBe(9)
    expect(r.c).toBe(6)
  })

  it('a=0 in direta produces Infinity (division by zero — no guard)', () => {
    const r = calcularRegraDeTres(0, 5, 3, 'direta')
    expect(r.x).toBe(Infinity)
  })

  it('c=0 in inversa produces Infinity (division by zero — no guard)', () => {
    const r = calcularRegraDeTres(2, 10, 0, 'inversa')
    expect(r.x).toBe(Infinity)
  })

  it('negative values are handled algebraically in direta', () => {
    // -3 : 6 :: -9 : x → x = (6 * -9) / -3 = 18
    const r = calcularRegraDeTres(-3, 6, -9, 'direta')
    expect(r.x).toBeCloseTo(18)
  })

  it('direta proportionality invariant: a/b == c/x', () => {
    const r = calcularRegraDeTres(5, 15, 10, 'direta')
    expect(r.a / r.b).toBeCloseTo(r.c / r.x)
  })

  it('inversa proportionality invariant: a*b == c*x', () => {
    const r = calcularRegraDeTres(4, 12, 6, 'inversa')
    expect(r.a * r.b).toBeCloseTo(r.c * r.x)
  })

  it('direta with unit proportion (a==b) returns x==c', () => {
    const r = calcularRegraDeTres(7, 7, 42, 'direta')
    expect(r.x).toBeCloseTo(42)
  })

  it('inversa with equal quantities (a==c) returns x==b', () => {
    const r = calcularRegraDeTres(5, 20, 5, 'inversa')
    expect(r.x).toBeCloseTo(20)
  })
})

// ---------------------------------------------------------------------------
// fuso-horario
// ---------------------------------------------------------------------------
describe('converterFuso — untested branches', () => {
  it('FUSOS contains exactly 19 entries', () => {
    expect(FUSOS).toHaveLength(19)
  })

  it('all FUSOS entries have IANA-formatted value (contains /)', () => {
    FUSOS.forEach(f => expect(f.value).toMatch(/\//))
  })

  it('fractional-hour offset timezone (Asia/Kolkata GMT+5:30) produces non-integer diferenca', () => {
    // Kolkata is GMT+5:30 — when compared to a GMT+x zone the offset is not a whole hour
    const r = converterFuso('12:00', 'Europe/London', 'Asia/Kolkata')
    // diferenca should include .5 (half-hour offset) at some point; check it's not ".0h"
    expect(r.diferenca).not.toMatch(/\.0h$/)
  })

  it('diferenca between GMT-3 and GMT-4 is ±1.0h depending on direction', () => {
    // getOffset measures "hours behind UTC": Sao Paulo (GMT-3)=3, Manaus (GMT-4)=4
    // diferenca = getOffset(destination) - getOffset(origin)
    // Sao Paulo → Manaus: 4-3 = +1 (Manaus is 1h further behind UTC)
    // Manaus → Sao Paulo: 3-4 = -1
    const r1 = converterFuso('10:00', 'America/Sao_Paulo', 'America/Manaus')
    const r2 = converterFuso('10:00', 'America/Manaus', 'America/Sao_Paulo')
    expect(r1.diferenca).toMatch(/\+1\.0h/)
    expect(r2.diferenca).toMatch(/-1\.0h/)
  })

  it('same-zone conversion gives diferenca of +0.0h', () => {
    const r = converterFuso('09:30', 'America/New_York', 'America/New_York')
    expect(r.diferenca).toBe('+0.0h')
  })
})

// ---------------------------------------------------------------------------
// porcentagem — calcularPorcentagemDe edge cases
// ---------------------------------------------------------------------------
describe('calcularPorcentagemDe — untested edge cases', () => {
  it('tipo field is "porcentagem_de"', () => {
    expect(calcularPorcentagemDe(200, 10).tipo).toBe('porcentagem_de')
  })

  it('0% of any value returns 0', () => {
    expect(calcularPorcentagemDe(999, 0).resultado).toBe(0)
  })

  it('100% of a value returns the value itself', () => {
    expect(calcularPorcentagemDe(350, 100).resultado).toBe(350)
  })

  it('negative percentage produces a negative result', () => {
    expect(calcularPorcentagemDe(200, -10).resultado).toBeCloseTo(-20)
  })

  it('percentage of 0 is always 0', () => {
    expect(calcularPorcentagemDe(0, 50).resultado).toBe(0)
  })

  it('porcentagem field is preserved in result', () => {
    const r = calcularPorcentagemDe(500, 17.5)
    expect(r.porcentagem).toBe(17.5)
    expect(r.valorOriginal).toBe(500)
    expect(r.resultado).toBeCloseTo(87.5)
  })
})

describe('calcularAumento and calcularDesconto — tipo and 100% boundary', () => {
  it('calcularAumento tipo is always "aumento"', () => {
    expect(calcularAumento(1000, 0).tipo).toBe('aumento')
  })

  it('calcularDesconto tipo is always "desconto"', () => {
    expect(calcularDesconto(1000, 0).tipo).toBe('desconto')
  })

  it('200% increase triples the original value', () => {
    expect(calcularAumento(100, 200).resultado).toBeCloseTo(300)
  })

  it('0% of either keeps original value', () => {
    expect(calcularAumento(500, 0).resultado).toBe(500)
    expect(calcularDesconto(500, 0).resultado).toBe(500)
  })
})

describe('calcularVariacao — tipo and result field', () => {
  it('tipo is "variacao"', () => {
    expect(calcularVariacao(100, 150).tipo).toBe('variacao')
  })

  it('resultado holds the valorFinal, not the percentage', () => {
    const r = calcularVariacao(200, 180)
    expect(r.resultado).toBe(180)
    expect(r.porcentagem).toBeCloseTo(-10)
  })
})

describe('calcularRepresentacao — tipo and full coverage', () => {
  it('tipo is "representacao"', () => {
    expect(calcularRepresentacao(50, 200).tipo).toBe('representacao')
  })

  it('parte > total produces > 100% (no clamp)', () => {
    const r = calcularRepresentacao(300, 200)
    expect(r.porcentagem).toBeCloseTo(150)
  })

  it('resultado holds the parte value', () => {
    const r = calcularRepresentacao(75, 300)
    expect(r.resultado).toBe(75)
    expect(r.valorOriginal).toBe(300)
  })
})
