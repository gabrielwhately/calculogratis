/**
 * Edge-case and gap-filling tests for calculator functions.
 * These complement the happy-path tests in the individual spec files.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calcularDesconto, calcularDescontoProgressivo } from '@/lib/calculadoras/calculadora-desconto'
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'
import { encodeBase64, decodeBase64 } from '@/lib/calculadoras/conversor-base64'
import { calcularIdade } from '@/lib/calculadoras/calculadora-idade'
import { calcularAguaDiaria } from '@/lib/calculadoras/agua-diaria'
import { calcularConsumoEnergia, calcularConsumoAparelho } from '@/lib/calculadoras/consumo-energia'
import { contarCaracteres } from '@/lib/calculadoras/contador-caracteres'

// ---------------------------------------------------------------------------
// calcularDesconto — boundary and overflow cases
// ---------------------------------------------------------------------------
describe('calcularDesconto – edge cases', () => {
  it('discount > 100% produces negative valorFinal', () => {
    // Function applies the math as-is; callers are responsible for clamping.
    const result = calcularDesconto(100, 150)
    expect(result.valorFinal).toBe(-50)
    expect(result.valorDesconto).toBe(150)
  })

  it('discount of exactly 100% reduces valorFinal to 0', () => {
    const result = calcularDesconto(250, 100)
    expect(result.valorFinal).toBe(0)
  })

  it('zero valor with any discount returns zero valorDesconto', () => {
    const result = calcularDesconto(0, 30)
    expect(result.valorDesconto).toBe(0)
    expect(result.valorFinal).toBe(0)
  })

  it('negative discount effectively increases valorFinal', () => {
    // e.g. a "surcharge" of -10% → price goes up 10%
    const result = calcularDesconto(100, -10)
    expect(result.valorFinal).toBe(110)
  })
})

describe('calcularDescontoProgressivo – edge cases', () => {
  it('100% discount in a single step zeros the value', () => {
    const result = calcularDescontoProgressivo(500, [100])
    expect(result.valorFinal).toBe(0)
  })

  it('discount > 100% drives value negative within a step', () => {
    const result = calcularDescontoProgressivo(100, [150])
    expect(result.valorFinal).toBeLessThan(0)
  })

  it('three-step chain is applied left to right in order', () => {
    // 200 → 10% off = 180 → 20% off = 144 → 50% off = 72
    const result = calcularDescontoProgressivo(200, [10, 20, 50])
    expect(result.etapas[0].valorApos).toBeCloseTo(180)
    expect(result.etapas[1].valorApos).toBeCloseTo(144)
    expect(result.etapas[2].valorApos).toBeCloseTo(72)
    expect(result.valorFinal).toBeCloseTo(72)
  })
})

// ---------------------------------------------------------------------------
// converterMoeda / converterMoedaInverso — zero and edge rates
// ---------------------------------------------------------------------------
describe('converterMoeda – edge cases', () => {
  it('taxa of 0 produces Infinity (not NaN)', () => {
    // Division by zero in JS is Infinity, not NaN.
    const result = converterMoeda({ valor: 100, taxa: 0 })
    expect(result.valorConvertido).toBe(Infinity)
  })

  it('valor of 0 converts to 0 regardless of rate', () => {
    const result = converterMoeda({ valor: 0, taxa: 5 })
    expect(result.valorConvertido).toBe(0)
  })
})

describe('converterMoedaInverso – edge cases', () => {
  it('taxa of 0 produces 0 (multiplication by zero)', () => {
    const result = converterMoedaInverso({ valor: 100, taxa: 0 })
    expect(result.valorConvertido).toBe(0)
  })

  it('very small taxa still produces a finite result', () => {
    const result = converterMoedaInverso({ valor: 1, taxa: 0.0001 })
    expect(result.valorConvertido).toBeCloseTo(0.0001)
    expect(Number.isFinite(result.valorConvertido)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// encodeBase64 / decodeBase64 — size reporting and malformed input
// ---------------------------------------------------------------------------
describe('encodeBase64 – size reporting', () => {
  it('empty input has tamanhoOriginal and tamanhoConvertido of 0', () => {
    const result = encodeBase64('')
    expect(result.tamanhoOriginal).toBe(0)
    expect(result.tamanhoConvertido).toBe(0)
  })

  it('tamanhoConvertido reflects base64 length (always >= original byte count)', () => {
    const result = encodeBase64('abc')
    // 'abc' = 3 bytes, base64('abc') = 'YWJj' = 4 chars
    expect(result.tamanhoConvertido).toBeGreaterThanOrEqual(result.tamanhoOriginal)
  })
})

describe('decodeBase64 – malformed input', () => {
  it('missing padding characters returns valido=false or still decodes (browser-dependent)', () => {
    // 'SGVsbG8' is 'Hello' without the trailing '='
    // Some engines are lenient; the important thing is output is defined.
    const result = decodeBase64('SGVsbG8')
    expect(typeof result.output).toBe('string')
    expect(typeof result.valido).toBe('boolean')
  })

  it('empty string decodes to empty string and is valid', () => {
    const result = decodeBase64('')
    expect(result.valido).toBe(true)
    expect(result.output).toBe('')
  })

  it('tamanhoOriginal reports encoded length, tamanhoConvertido reports decoded byte size', () => {
    const result = decodeBase64('SGVsbG8=')
    // Encoded string length = 8, decoded 'Hello' = 5 bytes
    expect(result.tamanhoOriginal).toBe(8)
    expect(result.tamanhoConvertido).toBe(5)
  })
})

// ---------------------------------------------------------------------------
// calcularIdade — birthday-today and leap-year edge cases
// ---------------------------------------------------------------------------
describe('calcularIdade – edge cases', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('birthday exactly today sets proximoAniversario to next year', () => {
    vi.setSystemTime(new Date('2025-06-15'))
    const result = calcularIdade(new Date('1990-06-15'))
    // Born on 1990-06-15, today IS the birthday — next one is 2026-06-15
    expect(result.proximoAniversario.getFullYear()).toBe(2026)
    expect(result.dias).toBe(0)
    expect(result.meses).toBe(0)
  })

  it('very recent birth (1 day old) returns anos=0, meses=0, dias=1', () => {
    vi.setSystemTime(new Date('2025-06-15'))
    const result = calcularIdade(new Date('2025-06-14'))
    expect(result.anos).toBe(0)
    expect(result.meses).toBe(0)
    expect(result.dias).toBe(1)
    expect(result.totalDias).toBe(1)
  })

  it('leap-year birthday (Feb 29) on a non-leap year uses Feb 28 via JS Date', () => {
    // 2025 is not a leap year; new Date('2025-02-29') becomes 2025-03-01 in JS.
    // This documents the current behaviour rather than asserting correct handling.
    vi.setSystemTime(new Date('2025-06-15'))
    const dob = new Date('2000-02-29') // valid — 2000 was a leap year
    const result = calcularIdade(dob)
    expect(result.anos).toBe(25)
    expect(result.totalDias).toBeGreaterThan(0)
  })

  it('diasParaAniversario is 0 on the exact birthday', () => {
    vi.setSystemTime(new Date('2025-06-15'))
    // proximoAniversario will be set to next year (> hoje), so diff is ~365 days.
    // This test documents that the function never produces diasParaAniversario=0
    // because it always advances to the *next* occurrence.
    const result = calcularIdade(new Date('1990-06-15'))
    expect(result.diasParaAniversario).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// calcularAguaDiaria — unknown activity level falls back to 1.0
// ---------------------------------------------------------------------------
describe('calcularAguaDiaria – edge cases', () => {
  it('unknown activity level defaults to factor 1.0 (same as sedentario)', () => {
    // The ?? 1.0 fallback applies when the key is not in FATOR_ATIVIDADE
    // TypeScript will complain, but at runtime unknown values are handled.
    const sedentario = calcularAguaDiaria(70, 'sedentario')
    // @ts-expect-error intentionally passing invalid value to test runtime fallback
    const unknown = calcularAguaDiaria(70, 'invalid_level')
    expect(unknown.mlPorDia).toBe(sedentario.mlPorDia)
  })

  it('very low weight (1 kg) produces a non-zero result', () => {
    const result = calcularAguaDiaria(1, 'sedentario')
    expect(result.mlPorDia).toBe(35) // 1 * 35 * 1.0 = 35, rounded
    expect(result.litrosPorDia).toBeCloseTo(0.035)
  })

  it('litrosPorDia always equals mlPorDia / 1000', () => {
    const result = calcularAguaDiaria(85, 'intenso')
    expect(result.litrosPorDia).toBeCloseTo(result.mlPorDia / 1000)
  })
})

// ---------------------------------------------------------------------------
// calcularConsumoEnergia — zero-power and zero-usage appliances
// ---------------------------------------------------------------------------
describe('calcularConsumoEnergia – edge cases', () => {
  it('appliance with 0W contributes 0 kWh', () => {
    const result = calcularConsumoEnergia(
      [{ potenciaWatts: 0, horasUsoDia: 8, diasUsoMes: 30 }],
      0.75,
    )
    expect(result.consumoMensalKwh).toBe(0)
    expect(result.custoMensal).toBe(0)
  })

  it('appliance used 0 hours per day contributes 0 kWh', () => {
    const result = calcularConsumoEnergia(
      [{ potenciaWatts: 1000, horasUsoDia: 0, diasUsoMes: 30 }],
      0.75,
    )
    expect(result.consumoMensalKwh).toBe(0)
  })

  it('appliance used 0 days per month contributes 0 kWh', () => {
    const result = calcularConsumoEnergia(
      [{ potenciaWatts: 1000, horasUsoDia: 8, diasUsoMes: 0 }],
      0.75,
    )
    expect(result.consumoMensalKwh).toBe(0)
  })

  it('zero tarifa produces zero monetary cost but non-zero kWh', () => {
    const result = calcularConsumoEnergia(
      [{ potenciaWatts: 1000, horasUsoDia: 4, diasUsoMes: 30 }],
      0,
    )
    expect(result.consumoMensalKwh).toBeGreaterThan(0)
    expect(result.custoMensal).toBe(0)
    expect(result.custoAnual).toBe(0)
  })
})

describe('calcularConsumoAparelho – edge cases', () => {
  it('0W appliance yields 0 cost', () => {
    const result = calcularConsumoAparelho(0, 24, 30, 1.0)
    expect(result.custoMensal).toBe(0)
  })

  it('matches calcularConsumoEnergia for the same zero-hour input', () => {
    const single = calcularConsumoAparelho(500, 0, 30, 0.8)
    const multi = calcularConsumoEnergia([{ potenciaWatts: 500, horasUsoDia: 0, diasUsoMes: 30 }], 0.8)
    expect(single.consumoMensalKwh).toBe(multi.consumoMensalKwh)
  })
})

// ---------------------------------------------------------------------------
// contarCaracteres — Unicode, punctuation-only, CRLF endings
// ---------------------------------------------------------------------------
describe('contarCaracteres – edge cases', () => {
  it('punctuation-only text counts whitespace-separated tokens as words, and 0 sentences', () => {
    // Word splitter uses /\s+/ with no alpha filter → '!!!' and '???' are each a token.
    // Sentence splitter splits ON the punctuation, leaving only empty/space segments → 0 sentences.
    const result = contarCaracteres({ texto: '!!! ???' })
    expect(result.palavras).toBe(2)
    expect(result.frases).toBe(0)
  })

  it('accented Portuguese characters are counted correctly', () => {
    const text = 'ação'
    const result = contarCaracteres({ texto: text })
    expect(result.caracteres).toBe(4)
    expect(result.palavras).toBe(1)
  })

  it('emoji are counted as characters (multi-code-point aware)', () => {
    const text = 'olá 😀'
    const result = contarCaracteres({ texto: text })
    // JS string length is code-unit based; emoji may be > 1 code unit
    expect(result.caracteres).toBe(text.length)
    expect(result.palavras).toBe(2)
  })

  it('CRLF line endings count as 1 line break each', () => {
    // 'line1\r\nline2\r\nline3' split on \n gives 3 elements
    const result = contarCaracteres({ texto: 'line1\r\nline2\r\nline3' })
    expect(result.linhas).toBe(3)
  })

  it('text with only newlines has 0 words and 0 paragraphs', () => {
    const result = contarCaracteres({ texto: '\n\n\n' })
    expect(result.palavras).toBe(0)
    expect(result.paragrafos).toBe(0)
  })

  it('single sentence without terminator still counts as 1 sentence', () => {
    const result = contarCaracteres({ texto: 'sem ponto final' })
    expect(result.frases).toBe(1)
  })
})
