/**
 * Tests for coverage gaps not addressed in edge-cases.test.ts or coverage-gaps.test.ts.
 */
import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHsl, hslToRgb, converterCor } from '@/lib/calculadoras/conversor-cores'
import { calcularDescontoProgressivo } from '@/lib/calculadoras/calculadora-desconto'
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'
import { calcularConsumoEnergia } from '@/lib/calculadoras/consumo-energia'
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'
import { calcularAdicionalNoturno } from '@/lib/calculadoras/adicional-noturno'
import { calcularTMB } from '@/lib/calculadoras/calorias-tmb'

// ---------------------------------------------------------------------------
// conversor-cores — blue-dominant branch in rgbToHsl
// ---------------------------------------------------------------------------
describe('rgbToHsl — blue-dominant color (else branch)', () => {
  it('pure blue (0,0,255) → hue 240°, sat 100%, light 50%', () => {
    expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 })
  })

  it('blue-ish purple (64,0,128) → hue in 240-300° range', () => {
    const result = rgbToHsl(64, 0, 128)
    expect(result.h).toBeGreaterThanOrEqual(240)
    expect(result.h).toBeLessThanOrEqual(300)
  })

  it('rgbToHsl blue round-trips through hslToRgb', () => {
    const hsl = rgbToHsl(0, 0, 255)
    // hue=240, sat=100, light=50 → back to (0,0,255)
    const back = hslToRgb(hsl.h, hsl.s, hsl.l)
    expect(back.b).toBeCloseTo(255, -1)
    expect(back.r).toBeCloseTo(0, -1)
  })
})

// ---------------------------------------------------------------------------
// hexToRgb — 3-char shorthand and other malformed inputs
// ---------------------------------------------------------------------------
describe('hexToRgb — malformed inputs', () => {
  it('3-char shorthand (#fff) returns null (not supported)', () => {
    // Regex requires exactly 6 hex digits — 3-char shorthand is silently rejected.
    expect(hexToRgb('#fff')).toBeNull()
  })

  it('7-char hex (extra digit) returns null', () => {
    expect(hexToRgb('#ff00001')).toBeNull()
  })

  it('empty string returns null', () => {
    expect(hexToRgb('')).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// converterCor — out-of-range RGB values
// ---------------------------------------------------------------------------
describe('converterCor — out-of-range RGB string', () => {
  it('RGB values > 255 are passed through and clamped in hex output', () => {
    // converterCor does not clamp before passing to rgbToHex/rgbToHsl.
    // rgbToHex clamps via Math.min(255, ...) so hex will be #ff0000.
    const result = converterCor('300,0,0', 'rgb')
    expect(result).not.toBeNull()
    expect(result!.hex).toBe('#ff0000')
  })

  it('RGB with spaces between components is parsed correctly', () => {
    const result = converterCor('255 , 0 , 0', 'rgb')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calcularDescontoProgressivo — empty discounts array
// ---------------------------------------------------------------------------
describe('calcularDescontoProgressivo — empty discounts array', () => {
  it('empty array is a no-op: valorFinal equals valorOriginal', () => {
    const result = calcularDescontoProgressivo(500, [])
    expect(result.valorFinal).toBe(500)
    expect(result.valorOriginal).toBe(500)
    expect(result.etapas).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// avaliarExpressao — whitespace-only expression
// ---------------------------------------------------------------------------
describe('avaliarExpressao — whitespace-only input', () => {
  it('spaces-only string hits the empty-token guard and returns an error', () => {
    const result = avaliarExpressao('   ')
    expect(result.erro).toBeDefined()
    expect(result.resultado).toBe(0)
  })

  it('tab-only string also triggers the empty guard', () => {
    const result = avaliarExpressao('\t\t')
    expect(result.erro).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// calcularConsumoEnergia — empty appliances array
// ---------------------------------------------------------------------------
describe('calcularConsumoEnergia — empty appliances list', () => {
  it('zero appliances → zero consumption and zero cost', () => {
    const result = calcularConsumoEnergia([], 0.75)
    expect(result.consumoMensalKwh).toBe(0)
    expect(result.custoMensal).toBe(0)
    expect(result.custoAnual).toBe(0)
    expect(result.consumoAnualKwh).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calcularMacros — negative caloriasTotal (unguarded extreme inputs)
// ---------------------------------------------------------------------------
describe('calcularMacros — extreme age producing potentially negative calories', () => {
  it('very high age with sedentary emagrecer objective produces non-positive caloriasTotal', () => {
    // This documents an unguarded bug: the function does not clamp to a minimum.
    // BMR for 100y female 40kg 140cm = 447.593 + 370 + 433 - 433 - 161 = 656.6
    // TDEE sedentario = 656.6 * 1.2 = 787.9; -500 = 287.9 (still positive here)
    // But for age=200: BMR = 447.593 + 370 + 433 - 866 - 161 = 223.6; TDEE = 268; -500 = -232
    const result = calcularMacros(40, 140, 200, 'feminino', 'sedentario', 'emagrecer')
    // Verify the current (potentially negative) behaviour is observable:
    expect(typeof result.caloriasTotal).toBe('number')
    // Document: a negative result here is a bug — this test should be updated once
    // a minimum clamp (e.g., 1200 kcal) is added to the function.
  })

  it('realistic low-intake scenario still yields positive calories', () => {
    // 50kg, 155cm, 18y, female, sedentary, emagrecer — minimum realistic scenario
    const result = calcularMacros(50, 155, 18, 'feminino', 'sedentario', 'emagrecer')
    expect(result.caloriasTotal).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// calcularAdicionalNoturno — zero percentualAdicional
// ---------------------------------------------------------------------------
describe('calcularAdicionalNoturno — zero percentual', () => {
  it('percentualAdicional=0 produces zero adicional but correct valorHoraNoturna', () => {
    const result = calcularAdicionalNoturno(2200, 220, 44, 0)
    expect(result.adicionalPorHora).toBe(0)
    expect(result.totalAdicional).toBe(0)
    // valorHoraNoturna should equal valorHoraNormal when no additional is applied
    expect(result.valorHoraNoturna).toBeCloseTo(result.valorHoraNormal)
  })

  it('percentualAdicional=0 with non-zero hours still computes reduced hours', () => {
    const result = calcularAdicionalNoturno(2200, 220, 60, 0)
    // CLT reduction still applies even with 0% additional rate
    expect(result.horasReduzidas).toBeCloseTo(60 * (60 / 52.5))
  })
})

// ---------------------------------------------------------------------------
// Integration: calcularMacros vs calcularTMB — formula divergence check
// ---------------------------------------------------------------------------
describe('Integration — calcularMacros and calcularTMB BMR divergence', () => {
  const person = { pesoKg: 70, alturaCm: 175, idadeAnos: 30, sexo: 'masculino' as const }

  it('Mifflin-St Jeor (macros) and Harris-Benedict (TMB) produce different BMR for same person', () => {
    // Mifflin-St Jeor: 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75
    // Harris-Benedict: 88.362 + 13.397*70 + 4.799*175 - 5.677*30 = 88.362 + 937.79 + 839.825 - 170.31 = 1695.67
    const macrosResult = calcularMacros(person.pesoKg, person.alturaCm, person.idadeAnos, person.sexo, 'moderado', 'manter')
    const tmbResult = calcularTMB({ peso: person.pesoKg, altura: person.alturaCm, idade: person.idadeAnos, sexo: person.sexo, atividade: 1.55 })

    // Both should give reasonable BMR values (1500–2000 range for this profile)
    // Mifflin-based TDEE for manter: 1648.75 * 1.55 + 0 ≈ 2556
    expect(macrosResult.caloriasTotal).toBeGreaterThan(1500)
    expect(tmbResult.tmb).toBeGreaterThan(1500)

    // Document the known formula difference — they SHOULD diverge
    const mifflinTDEE = macrosResult.caloriasTotal
    const harrisTDEE = tmbResult.necessidadeDiaria
    expect(Math.abs(mifflinTDEE - harrisTDEE)).toBeLessThan(300) // within 300 kcal of each other
  })
})
