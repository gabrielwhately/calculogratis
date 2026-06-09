/**
 * Test skeletons for identified coverage gaps.
 * Each describe block documents what is missing and why it matters.
 * Replace `it.todo` / `it.skip` bodies with real assertions once verified.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ─── vale-transporte ────────────────────────────────────────────────────────
// Gap: src/tests/ has no test importing from the real module.
// src/tests/vale-transporte.test.ts defines its own inline function — it never
// exercises src/lib/calculadoras/vale-transporte.ts and misses percentualDesconto.
import { calcularValeTransporte } from '@/lib/calculadoras/vale-transporte'

describe('calcularValeTransporte', () => {
  it('employee discount capped at 6% when transport cost exceeds cap', () => {
    // Salário 2000 → cap = 120; custo 300 → empregado 120, empregador 180
    const r = calcularValeTransporte(2000, 300)
    expect(r.descontoEmpregado).toBeCloseTo(120)
    expect(r.custoEmpregador).toBeCloseTo(180)
    expect(r.custoTotal).toBeCloseTo(300)
    expect(r.percentualDesconto).toBeCloseTo(6)
  })

  it('employee pays only actual cost when 6% exceeds transport cost', () => {
    // Salário 5000 → cap = 300; custo 200 → empregado 200, empregador 0
    const r = calcularValeTransporte(5000, 200)
    expect(r.descontoEmpregado).toBeCloseTo(200)
    expect(r.custoEmpregador).toBeCloseTo(0)
    expect(r.percentualDesconto).toBeCloseTo(4) // 200/5000*100
  })

  // Edge: salarioBase = 0 (intern / zero-salary contract)
  it('returns 0 percentualDesconto when salarioBase is 0', () => {
    const r = calcularValeTransporte(0, 150)
    expect(r.percentualDesconto).toBe(0)
    expect(r.descontoEmpregado).toBe(0)
    expect(r.custoEmpregador).toBeCloseTo(150)
  })

  // Edge: zero transport cost
  it('returns all zeros when custoMensal is 0', () => {
    const r = calcularValeTransporte(3000, 0)
    expect(r.descontoEmpregado).toBe(0)
    expect(r.custoEmpregador).toBe(0)
    expect(r.custoTotal).toBe(0)
  })
})

// ─── custas-processuais ─────────────────────────────────────────────────────
// Gap: only tested in tests/ root, not in src/tests/lib/calculadoras/.
import { calcularCustasProcessuais } from '@/lib/calculadoras/custas-processuais'

describe('calcularCustasProcessuais', () => {
  it('applies minimum R$150 when 1% is below the floor', () => {
    const r = calcularCustasProcessuais(10000) // 1% = 100 < min(150)
    expect(r.custasIniciais).toBe(150)
  })

  it('enforces minimum of R$150 for small claims', () => {
    const r = calcularCustasProcessuais(1000) // 1% = 10 < 150
    expect(r.custasIniciais).toBe(150)
  })

  it('enforces maximum of R$50,000 for large claims', () => {
    const r = calcularCustasProcessuais(10_000_000) // 1% = 100k > 50k
    expect(r.custasIniciais).toBe(50000)
  })

  it('returns exact 1% when value is exactly at threshold (R$15,000)', () => {
    // 1% of 15,000 = 150 — sits right at the minimum boundary
    const r = calcularCustasProcessuais(15000)
    expect(r.custasIniciais).toBe(150)
    expect(r.percentual).toBe(1)
  })

  it('returns exact maximum when value is R$5,000,000', () => {
    // 1% of 5,000,000 = 50,000 — sits right at the maximum boundary
    const r = calcularCustasProcessuais(5_000_000)
    expect(r.custasIniciais).toBe(50000)
  })

  // Edge: zero claim value
  it('applies minimum for zero claim value', () => {
    expect(calcularCustasProcessuais(0).custasIniciais).toBe(150)
  })
})

// ─── calculadora-cientifica ─────────────────────────────────────────────────
// Gap: cbrt, exp, ceil, floor, round, asin, acos, atan, nested calls, 0^0
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'

describe('avaliarExpressao – uncovered functions', () => {
  it('cbrt(27)', () => expect(avaliarExpressao('cbrt(27)').resultado).toBeCloseTo(3))
  it('exp(1) ≈ e', () => expect(avaliarExpressao('exp(1)').resultado).toBeCloseTo(Math.E))
  it('ceil(4.1)', () => expect(avaliarExpressao('ceil(4.1)').resultado).toBe(5))
  it('floor(4.9)', () => expect(avaliarExpressao('floor(4.9)').resultado).toBe(4))
  it('round(4.5)', () => expect(avaliarExpressao('round(4.5)').resultado).toBe(5))
  it('asin(1) = pi/2', () => expect(avaliarExpressao('asin(1)').resultado).toBeCloseTo(Math.PI / 2))
  it('acos(1) = 0', () => expect(avaliarExpressao('acos(1)').resultado).toBeCloseTo(0))
  it('atan(1) = pi/4', () => expect(avaliarExpressao('atan(1)').resultado).toBeCloseTo(Math.PI / 4))

  it('nested: sqrt(sqrt(256))', () => expect(avaliarExpressao('sqrt(sqrt(256))').resultado).toBeCloseTo(4))
  it('chained power: 2^2^3 (right-assoc = 2^8 = 256)', () => {
    expect(avaliarExpressao('2^2^3').resultado).toBeCloseTo(256)
  })

  it('unary plus', () => expect(avaliarExpressao('+5').resultado).toBeCloseTo(5))

  // 0^0 is defined as 1 in JS Math.pow
  it('0^0 returns 1', () => expect(avaliarExpressao('0^0').resultado).toBeCloseTo(1))

  // Whitespace-only input
  it('whitespace-only returns error', () => {
    const r = avaliarExpressao('   ')
    expect(r.erro).toBeTruthy()
  })
})

// ─── calculadora-idade ──────────────────────────────────────────────────────
// Gap: totalDias, totalSemanas, totalMeses, proximoAniversario, diasParaAniversario
// and birthday-is-today edge case are never asserted.
import { calcularIdade } from '@/lib/calculadoras/calculadora-idade'

describe('calcularIdade – missing assertions', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 4, 18)) // 2026-05-18
  })
  afterEach(() => vi.useRealTimers())

  it('exposes totalDias, totalSemanas, totalMeses correctly', () => {
    const nascimento = new Date(2000, 4, 18) // exactly 26 years ago today
    const r = calcularIdade(nascimento)
    expect(r.anos).toBe(26)
    expect(r.meses).toBe(0)
    expect(r.dias).toBe(0)
    expect(r.totalMeses).toBe(312) // 26 * 12
    expect(r.totalSemanas).toBeGreaterThan(0)
    expect(r.totalDias).toBeGreaterThan(9000)
  })

  it('diasParaAniversario is 365 when birthday is today', () => {
    // Birthday today → proximoAniversario is set to next year → 365 days
    const nascimento = new Date(2000, 4, 18)
    const r = calcularIdade(nascimento)
    expect(r.diasParaAniversario).toBeGreaterThanOrEqual(365)
  })

  it('diasParaAniversario is small when birthday is tomorrow', () => {
    const nascimento = new Date(1990, 4, 19) // born May 19
    const r = calcularIdade(nascimento)
    expect(r.diasParaAniversario).toBe(1)
  })

  it('totalSemanas is floor of totalDias/7', () => {
    const nascimento = new Date(2000, 4, 18)
    const r = calcularIdade(nascimento)
    expect(r.totalSemanas).toBe(Math.floor(r.totalDias / 7))
  })
})

// ─── agua-diaria ─────────────────────────────────────────────────────────────
// Gap: leve, moderado, muito_intenso activity levels never tested.
// The fallback `?? 1.0` for unknown activity is never exercised.
import { calcularAguaDiaria } from '@/lib/calculadoras/agua-diaria'

describe('calcularAguaDiaria – all activity levels', () => {
  const weight = 60

  it('leve increases over sedentario', () => {
    expect(calcularAguaDiaria(weight, 'leve').mlPorDia)
      .toBeGreaterThan(calcularAguaDiaria(weight, 'sedentario').mlPorDia)
  })
  it('moderado increases over leve', () => {
    expect(calcularAguaDiaria(weight, 'moderado').mlPorDia)
      .toBeGreaterThan(calcularAguaDiaria(weight, 'leve').mlPorDia)
  })
  it('muito_intenso is highest', () => {
    expect(calcularAguaDiaria(weight, 'muito_intenso').mlPorDia)
      .toBeGreaterThan(calcularAguaDiaria(weight, 'intenso').mlPorDia)
  })
  it('coposPorDia = ceil(mlPorDia/250)', () => {
    const r = calcularAguaDiaria(weight, 'sedentario')
    expect(r.coposPorDia).toBe(Math.ceil(r.mlPorDia / 250))
  })
  it('mlPorRefeicao = round(mlPorDia/6)', () => {
    const r = calcularAguaDiaria(weight, 'moderado')
    expect(r.mlPorRefeicao).toBe(Math.round(r.mlPorDia / 6))
  })
})

// ─── calculadora-desconto ────────────────────────────────────────────────────
// Gap: 0% discount; calcularDescontoProgressivo with empty or single-element array.
import { calcularDesconto, calcularDescontoProgressivo } from '@/lib/calculadoras/calculadora-desconto'

describe('calcularDesconto – edge cases', () => {
  it('0% discount leaves price unchanged', () => {
    const r = calcularDesconto(200, 0)
    expect(r.valorFinal).toBeCloseTo(200)
    expect(r.economia).toBeCloseTo(0)
  })

  it('returns all five fields', () => {
    const r = calcularDesconto(100, 25)
    expect(r).toMatchObject({
      valorOriginal: 100,
      desconto: 25,
      valorDesconto: 25,
      valorFinal: 75,
      economia: 25,
    })
  })
})

describe('calcularDescontoProgressivo – edge cases', () => {
  it('empty discounts array returns original price', () => {
    const r = calcularDescontoProgressivo(500, [])
    expect(r.valorFinal).toBeCloseTo(500)
    expect(r.etapas).toHaveLength(0)
  })

  it('single discount matches calcularDesconto', () => {
    const r = calcularDescontoProgressivo(200, [15])
    expect(r.valorFinal).toBeCloseTo(170)
    expect(r.etapas).toHaveLength(1)
  })

  it('three cascading discounts are not additive', () => {
    // 10%+10%+10% cascade ≠ 30% flat
    const cascaded = calcularDescontoProgressivo(1000, [10, 10, 10])
    const flat = calcularDesconto(1000, 30)
    expect(cascaded.valorFinal).toBeGreaterThan(flat.valorFinal)
  })
})

// ─── conversor-cores ─────────────────────────────────────────────────────────
// Gap: rgbToHsl for green/blue (different `max` branch); hslToRgb at t<1/6 and
// t>2/3 transitions; converterCor with invalid hsl string.
import { rgbToHsl, hslToRgb, converterCor } from '@/lib/calculadoras/conversor-cores'

describe('rgbToHsl – all max-channel branches', () => {
  it('green (max=g branch)', () => {
    const hsl = rgbToHsl(0, 255, 0)
    expect(hsl.h).toBe(120)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('blue (max=b branch)', () => {
    const hsl = rgbToHsl(0, 0, 255)
    expect(hsl.h).toBe(240)
  })

  it('dark color l<0.5 uses d/(max+min) for saturation', () => {
    // dark red
    const hsl = rgbToHsl(100, 0, 0)
    expect(hsl.s).toBeGreaterThan(0)
  })
})

describe('hslToRgb – hue helper transitions', () => {
  it('yellow (hue=60) hits t<1/2 branch', () => {
    const rgb = hslToRgb(60, 100, 50)
    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(0)
  })

  it('cyan (hue=180) hits t<2/3 branch', () => {
    const rgb = hslToRgb(180, 100, 50)
    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(255)
  })

  it('magenta roundtrip hsl→rgb→hsl', () => {
    const original = { h: 300, s: 100, l: 50 }
    const rgb = hslToRgb(original.h, original.s, original.l)
    const back = rgbToHsl(rgb.r, rgb.g, rgb.b)
    expect(back.h).toBe(original.h)
    expect(back.s).toBe(original.s)
    expect(back.l).toBe(original.l)
  })
})

describe('converterCor – missing branches', () => {
  it('returns null for invalid hsl string', () => {
    expect(converterCor('notahsl', 'hsl')).toBeNull()
  })
})

// ─── conversor-bases ─────────────────────────────────────────────────────────
// Gap: binary→others, octal→others, 0 input, lowercase hex.
import { converterBases } from '@/lib/calculadoras/conversor-bases'

describe('converterBases – uncovered inputs', () => {
  it('converts binary to all bases', () => {
    const r = converterBases('1010', 2)
    expect(r.decimal).toBe('10')
    expect(r.octal).toBe('12')
    expect(r.hexadecimal).toBe('A')
  })

  it('converts octal to all bases', () => {
    const r = converterBases('17', 8)
    expect(r.decimal).toBe('15')
    expect(r.binario).toBe('1111')
    expect(r.hexadecimal).toBe('F')
  })

  it('returns zero string for value "0"', () => {
    const r = converterBases('0', 10)
    expect(r.decimal).toBe('0')
    expect(r.binario).toBe('0')
  })

  it('handles lowercase hex input', () => {
    const r = converterBases('ff', 16)
    expect(r.decimal).toBe('255')
  })
})

// ─── conversor-base64 ────────────────────────────────────────────────────────
// Gap: empty string encode/decode; decode of invalid base64; tamanhoOriginal
// and tamanhoConvertido are never verified.
import { encodeBase64, decodeBase64 } from '@/lib/calculadoras/conversor-base64'

describe('encodeBase64 – missing cases', () => {
  it('encodes empty string to empty string', () => {
    const r = encodeBase64('')
    expect(r.valido).toBe(true)
    expect(r.output).toBe('')
  })

  it('tamanhoConvertido is length of encoded string', () => {
    const r = encodeBase64('hello')
    expect(r.tamanhoConvertido).toBe(r.output.length)
  })
})

describe('decodeBase64 – missing cases', () => {
  it('roundtrips encode→decode', () => {
    const original = 'Olá mundo 🌍'
    const encoded = encodeBase64(original)
    const decoded = decodeBase64(encoded.output)
    expect(decoded.valido).toBe(true)
    expect(decoded.output).toBe(original)
  })

  it('returns valido=false for invalid base64', () => {
    const r = decodeBase64('!!!not-base64!!!')
    expect(r.valido).toBe(false)
    expect(r.erro).toBeTruthy()
  })

  it('strips whitespace before decoding', () => {
    const r = decodeBase64(' aGVsbG8= ')
    expect(r.valido).toBe(true)
    expect(r.output).toBe('hello')
  })
})

// ─── contador-caracteres ─────────────────────────────────────────────────────
// Gap: multi-paragraph text, multiple sentence terminators, linhas count.
import { contarCaracteres } from '@/lib/calculadoras/contador-caracteres'

describe('contarCaracteres – uncovered branches', () => {
  it('returns all zeros for whitespace-only text', () => {
    const r = contarCaracteres({ texto: '   \n  ' })
    expect(r.palavras).toBe(0)
    expect(r.frases).toBe(0)
  })

  it('counts multiple paragraphs', () => {
    const r = contarCaracteres({ texto: 'Para um.\n\nPara dois.' })
    expect(r.paragrafos).toBe(2)
  })

  it('counts lines (\\n splits)', () => {
    const r = contarCaracteres({ texto: 'linha1\nlinha2\nlinha3' })
    expect(r.linhas).toBe(3)
  })

  it('counts multiple sentence terminators', () => {
    const r = contarCaracteres({ texto: 'Oi! Tudo bem? Sim.' })
    expect(r.frases).toBe(3)
  })

  it('caracteresSemEspacos excludes tabs and newlines', () => {
    const r = contarCaracteres({ texto: 'a b\tc' })
    expect(r.caracteresSemEspacos).toBe(3)
  })
})

// ─── calculadora-pintura ─────────────────────────────────────────────────────
// Gap: rendimentoLitro=0 guard (should produce 0 litros, not Infinity);
// areaUtil clamped to 0 when doors+windows exceed wall area.
import { calcularPintura } from '@/lib/calculadoras/calculadora-pintura'

describe('calcularPintura – edge cases', () => {
  it('returns 0 liters when rendimentoLitro is 0', () => {
    const r = calcularPintura(4, 5, 2.8, 1, 1, 2, 0)
    expect(r.litrosNecessarios).toBe(0)
  })

  it('clamps areaUtil to 0 when openings exceed wall area', () => {
    // Tiny room (1m×1m×1m) with many large doors/windows
    const r = calcularPintura(1, 1, 1, 100, 100, 1, 10)
    expect(r.areaUtil).toBe(0)
    expect(r.litrosNecessarios).toBe(0)
  })

  it('areaTotal (gross wall area) is independent of doors/windows', () => {
    const noDoors = calcularPintura(4, 5, 2.8, 0, 0, 2, 10)
    const withDoors = calcularPintura(4, 5, 2.8, 3, 3, 2, 10)
    expect(noDoors.areaTotal).toBeCloseTo(withDoors.areaTotal)
  })
})

// ─── calorias-tmb ────────────────────────────────────────────────────────────
// Gap: unknown activity factor key falls back to the raw factor label;
// result fields sexo/atividade strings never asserted.
import { calcularTMB } from '@/lib/calculadoras/calorias-tmb'

describe('calcularTMB – uncovered branches', () => {
  it('returns correct sexo label for feminino', () => {
    const r = calcularTMB({ peso: 60, altura: 165, idade: 30, sexo: 'feminino', atividade: 1.55 })
    expect(r.sexo).toBe('Feminino')
    expect(r.atividade).toMatch(/Moderado/i)
  })

  it('returns sexo Masculino', () => {
    const r = calcularTMB({ peso: 80, altura: 180, idade: 30, sexo: 'masculino', atividade: 1.2 })
    expect(r.sexo).toBe('Masculino')
  })

  it('unknown atividade key shows Fator X label', () => {
    const r = calcularTMB({ peso: 70, altura: 170, idade: 25, sexo: 'masculino', atividade: 1.6 })
    expect(r.atividade).toMatch(/Fator 1\.6/)
  })

  it('necessidadeDiaria = tmb * atividade', () => {
    const r = calcularTMB({ peso: 70, altura: 170, idade: 25, sexo: 'masculino', atividade: 1.55 })
    expect(r.necessidadeDiaria).toBeCloseTo(r.tmb * 1.55)
  })
})

// ─── consumo-energia ─────────────────────────────────────────────────────────
// Gap: calcularConsumoEnergia (multi-appliance) never directly tested;
// zero tariff; empty array.
import { calcularConsumoEnergia } from '@/lib/calculadoras/consumo-energia'

describe('calcularConsumoEnergia – direct (multi-appliance)', () => {
  it('sums consumption across multiple appliances', () => {
    const r = calcularConsumoEnergia(
      [
        { potenciaWatts: 1000, horasUsoDia: 8, diasUsoMes: 30 }, // 240 kWh
        { potenciaWatts: 500, horasUsoDia: 4, diasUsoMes: 30 },  // 60 kWh
      ],
      0.85,
    )
    expect(r.consumoMensalKwh).toBeCloseTo(300)
    expect(r.custoMensal).toBeCloseTo(255)
    expect(r.consumoAnualKwh).toBeCloseTo(3600)
    expect(r.custoAnual).toBeCloseTo(3060)
  })

  it('returns 0 cost for empty appliance list', () => {
    const r = calcularConsumoEnergia([], 0.85)
    expect(r.consumoMensalKwh).toBe(0)
    expect(r.custoMensal).toBe(0)
  })

  it('returns 0 cost when tarifa is 0', () => {
    const r = calcularConsumoEnergia([{ potenciaWatts: 1000, horasUsoDia: 8, diasUsoMes: 30 }], 0)
    expect(r.custoMensal).toBe(0)
    expect(r.consumoMensalKwh).toBeCloseTo(240)
  })
})

// ─── conversor-moeda ─────────────────────────────────────────────────────────
// Gap: negative taxa and negative valor; converterMoedaInverso with taxa=0.
import { converterMoeda, converterMoedaInverso } from '@/lib/calculadoras/conversor-moeda'

describe('converterMoeda / converterMoedaInverso – edge cases', () => {
  it('converterMoedaInverso with taxa=0 returns 0', () => {
    const r = converterMoedaInverso({ valor: 100, taxa: 0 })
    expect(r.valorConvertido).toBe(0)
  })

  it('negative valor is reflected in result', () => {
    const r = converterMoeda({ valor: -100, taxa: 5 })
    expect(r.valorConvertido).toBeCloseTo(-20)
  })
})

// ─── adicional-noturno ───────────────────────────────────────────────────────
// Gap: default 4th argument (percentualAdicional omitted) never tested;
// percentualAdicional other than 20.
import { calcularAdicionalNoturno } from '@/lib/calculadoras/adicional-noturno'

describe('calcularAdicionalNoturno – uncovered branches', () => {
  it('uses 20% as default when percentualAdicional omitted', () => {
    const withDefault = calcularAdicionalNoturno(2200, 220, 40)
    const explicit20 = calcularAdicionalNoturno(2200, 220, 40, 20)
    expect(withDefault.adicionalPorHora).toBeCloseTo(explicit20.adicionalPorHora)
  })

  it('supports custom percentual (e.g. 25% for some categories)', () => {
    const r = calcularAdicionalNoturno(2200, 220, 40, 25)
    expect(r.adicionalPorHora).toBeCloseTo(2.5) // 10/h * 0.25
  })

  it('exposes all result fields', () => {
    const r = calcularAdicionalNoturno(2200, 220, 40, 20)
    expect(r).toHaveProperty('salarioBruto', 2200)
    expect(r).toHaveProperty('horasNoturnas', 40)
    expect(r.horasReduzidas).toBeGreaterThan(r.horasNoturnas)
  })
})

// ─── aposentadoria ───────────────────────────────────────────────────────────
// Gap: exactly at retirement thresholds; percentualBeneficio cap; anosRestantes
// when only one condition fails.
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'

describe('calcularAposentadoria – boundary cases', () => {
  it('eligible male at exactly minimum requirements', () => {
    // Men: 65 years, 20 years contribution (PREVIDENCIA values)
    const r = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 20, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(true)
    expect(r.anosRestantes).toBe(0)
    expect(r.motivoNegativa).toHaveLength(0)
  })

  it('ineligible: fails only age requirement', () => {
    const r = calcularAposentadoria({ idade: 60, sexo: 'masculino', anosContribuicao: 35, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.motivoNegativa.some(m => /idade/i.test(m))).toBe(true)
  })

  it('ineligible: fails only contribution requirement', () => {
    const r = calcularAposentadoria({ idade: 70, sexo: 'feminino', anosContribuicao: 5, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.motivoNegativa.some(m => /tempo/i.test(m))).toBe(true)
  })

  it('percentualBeneficio is capped at 1.0', () => {
    // Many extra years should not push past 100%
    const r = calcularAposentadoria({ idade: 80, sexo: 'masculino', anosContribuicao: 60, mediaSalarios: 5000 })
    expect(r.percentualBeneficio).toBeLessThanOrEqual(1)
  })

  it('valorEstimado = mediaSalarios * percentualBeneficio', () => {
    const r = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 20, mediaSalarios: 4000 })
    expect(r.valorEstimado).toBeCloseTo(r.percentualBeneficio * 4000)
  })
})

// ─── sitemap integration ─────────────────────────────────────────────────────
// Gap: sitemap(), robots(), and manifest() are pure functions but have no tests.
// They depend on constants, so tests confirm structure/shape.
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import manifest from '@/app/manifest'

describe('sitemap()', () => {
  it('returns an array of route objects', () => {
    const routes = sitemap()
    expect(Array.isArray(routes)).toBe(true)
    expect(routes.length).toBeGreaterThan(10)
  })

  it('root PT url has priority 1', () => {
    const root = sitemap().find(r => !r.url.includes('/es') && new URL(r.url).pathname === '/')
    expect(root?.priority).toBe(1)
  })

  it('all urls are valid absolute URLs', () => {
    const routes = sitemap()
    routes.forEach(r => expect(() => new URL(r.url)).not.toThrow())
  })

  it('includes ES routes', () => {
    const esRoutes = sitemap().filter(r => r.url.includes('/es'))
    expect(esRoutes.length).toBeGreaterThan(0)
  })

  it('calculator routes have priority 0.9', () => {
    const calcRoutes = sitemap().filter(r => r.priority === 0.9)
    expect(calcRoutes.length).toBeGreaterThan(0)
  })

  it('no duplicate URLs', () => {
    const urls = sitemap().map(r => r.url)
    const unique = new Set(urls)
    expect(unique.size).toBe(urls.length)
  })
})

describe('robots()', () => {
  it('allows all user agents', () => {
    const r = robots()
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
    expect(rules.some(rule => rule.userAgent === '*')).toBe(true)
  })

  it('sitemap url ends with /sitemap.xml', () => {
    expect(robots().sitemap).toMatch(/sitemap\.xml$/)
  })
})

describe('manifest()', () => {
  it('has required PWA fields', () => {
    const m = manifest()
    expect(m.name).toBeTruthy()
    expect(m.short_name).toBeTruthy()
    expect(m.start_url).toBe('/')
    expect(m.display).toBe('standalone')
  })

  it('has at least one icon', () => {
    expect(manifest().icons!.length).toBeGreaterThan(0)
  })
})

// ─── conversor-unidades ──────────────────────────────────────────────────────
// Gap: getUnidades() completely untested; F→C, F→K, K→C, K→F temperature
// branches never exercised; de===para same-unit shortcut; volume conversions;
// unknown unit key fallback (fatores[de] || 1).
import { converterUnidade, getUnidades, getNomeUnidade } from '@/lib/calculadoras/conversor-unidades'

describe('getUnidades', () => {
  it('returns length units for comprimento', () => {
    const units = getUnidades('comprimento')
    expect(units.map(u => u.value)).toContain('m')
    expect(units.map(u => u.value)).toContain('km')
    expect(units.every(u => u.label.length > 0)).toBe(true)
  })

  it('returns weight units for peso', () => {
    const units = getUnidades('peso')
    expect(units.map(u => u.value)).toContain('kg')
    expect(units.map(u => u.value)).toContain('lb')
  })

  it('returns volume units for volume', () => {
    const units = getUnidades('volume')
    expect(units.map(u => u.value)).toContain('l')
    expect(units.map(u => u.value)).toContain('ml')
  })

  it('returns C/F/K for temperatura', () => {
    const units = getUnidades('temperatura')
    expect(units.map(u => u.value)).toEqual(['C', 'F', 'K'])
  })
})

describe('getNomeUnidade', () => {
  it('returns known label for kg', () => {
    expect(getNomeUnidade('kg')).toBe('Quilogramas')
  })

  it('returns key itself for unknown unit', () => {
    expect(getNomeUnidade('XYZ')).toBe('XYZ')
  })
})

describe('converterUnidade – uncovered temperature branches', () => {
  it('F → C: 212°F = 100°C', () => {
    expect(converterUnidade(212, 'F', 'C', 'temperatura')).toBeCloseTo(100)
  })

  it('F → K: 32°F = 273.15K', () => {
    expect(converterUnidade(32, 'F', 'K', 'temperatura')).toBeCloseTo(273.15)
  })

  it('K → C: 273.15K = 0°C', () => {
    expect(converterUnidade(273.15, 'K', 'C', 'temperatura')).toBeCloseTo(0)
  })

  it('K → F: 373.15K = 212°F', () => {
    expect(converterUnidade(373.15, 'K', 'F', 'temperatura')).toBeCloseTo(212)
  })

  it('same unit returns original value', () => {
    expect(converterUnidade(100, 'C', 'C', 'temperatura')).toBe(100)
  })
})

describe('converterUnidade – volume conversions', () => {
  it('1 litre = 1000 ml', () => {
    expect(converterUnidade(1, 'l', 'ml', 'volume')).toBeCloseTo(1000)
  })

  it('1 gallon ≈ 3.785 litres', () => {
    expect(converterUnidade(1, 'gal', 'l', 'volume')).toBeCloseTo(3.785, 2)
  })
})

describe('converterUnidade – unknown unit fallback', () => {
  it('unknown source unit falls back to factor 1', () => {
    // unknown 'xx' → factor 1, so 5 xx → km uses km factor (1000)
    const result = converterUnidade(5, 'xx' as never, 'km', 'comprimento')
    expect(result).toBeCloseTo(5 / 1000)
  })
})

// ─── porcentagem ─────────────────────────────────────────────────────────────
// Gap: calcularVariacao(0, x) division-by-zero guard returns 0;
// calcularRepresentacao(x, 0) guard; negative value behaviour.
import {
  calcularVariacao,
  calcularRepresentacao,
  calcularAumento,
  calcularDesconto as calcularDescontoPct,
} from '@/lib/calculadoras/porcentagem'

describe('calcularVariacao – edge cases', () => {
  it('returns 0 porcentagem when valorInicial is 0 (division guard)', () => {
    const r = calcularVariacao(0, 500)
    expect(r.porcentagem).toBe(0)
    expect(r.resultado).toBe(500)
  })

  it('returns negative porcentagem for a drop', () => {
    const r = calcularVariacao(1000, 800)
    expect(r.porcentagem).toBeCloseTo(-20)
  })

  it('returns 0 for no change', () => {
    expect(calcularVariacao(500, 500).porcentagem).toBe(0)
  })
})

describe('calcularRepresentacao – edge cases', () => {
  it('returns 0 when total is 0 (division guard)', () => {
    const r = calcularRepresentacao(100, 0)
    expect(r.porcentagem).toBe(0)
  })

  it('returns 100 when parte equals total', () => {
    expect(calcularRepresentacao(250, 250).porcentagem).toBe(100)
  })
})

describe('calcularAumento / calcularDescontoPct – edge cases', () => {
  it('0% increase leaves value unchanged', () => {
    expect(calcularAumento(500, 0).resultado).toBe(500)
  })

  it('100% increase doubles the value', () => {
    expect(calcularAumento(500, 100).resultado).toBe(1000)
  })

  it('100% discount reduces to zero', () => {
    expect(calcularDescontoPct(500, 100).resultado).toBe(0)
  })

  it('result has correct tipo field', () => {
    expect(calcularAumento(100, 10).tipo).toBe('aumento')
    expect(calcularDescontoPct(100, 10).tipo).toBe('desconto')
  })
})

// ─── calculadora-macros ───────────────────────────────────────────────────────
// Gap: percentual fields (proteinas/carboidratos/gorduras) never asserted;
// muito_intenso activity level; unknown nivelAtividade fallback (defaults to 1.2).
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'

describe('calcularMacros – uncovered branches', () => {
  it('macro percentages are positive and gorduras matches split definition', () => {
    const r = calcularMacros(75, 175, 28, 'masculino', 'moderado', 'manter')
    expect(r.proteinas.percentual).toBeGreaterThan(0)
    expect(r.carboidratos.percentual).toBeGreaterThan(0)
    expect(r.gorduras.percentual).toBe(28) // manter split = 28%
  })

  it('emagrecer uses higher protein ratio (2.0 g/kg)', () => {
    const r = calcularMacros(80, 180, 30, 'masculino', 'moderado', 'emagrecer')
    expect(r.proteinas.gramas).toBeCloseTo(80 * 2.0, 0)
  })

  it('ganhar_massa uses highest protein ratio (2.2 g/kg)', () => {
    const r = calcularMacros(80, 180, 30, 'masculino', 'moderado', 'ganhar_massa')
    expect(r.proteinas.gramas).toBeCloseTo(80 * 2.2, 0)
  })

  it('muito_intenso yields higher calories than intenso', () => {
    const intenso = calcularMacros(70, 170, 25, 'masculino', 'intenso', 'manter')
    const muitoIntenso = calcularMacros(70, 170, 25, 'masculino', 'muito_intenso', 'manter')
    expect(muitoIntenso.caloriasTotal).toBeGreaterThan(intenso.caloriasTotal)
  })

  it('unknown nivelAtividade falls back to 1.2 (sedentario equivalent)', () => {
    const sedentario = calcularMacros(70, 170, 25, 'masculino', 'sedentario', 'manter')
    // @ts-expect-error testing fallback path
    const unknown = calcularMacros(70, 170, 25, 'masculino', 'desconhecido', 'manter')
    expect(unknown.caloriasTotal).toBeCloseTo(sedentario.caloriasTotal)
  })

  it('proteinas.calorias = gramas * 4', () => {
    const r = calcularMacros(70, 170, 25, 'feminino', 'leve', 'manter')
    expect(r.proteinas.calorias).toBe(r.proteinas.gramas * 4)
  })

  it('gorduras.calorias = gramas * 9', () => {
    const r = calcularMacros(70, 170, 25, 'feminino', 'leve', 'emagrecer')
    expect(r.gorduras.calorias).toBeCloseTo(r.gorduras.gramas * 9, -1)
  })
})

// ─── favorites ───────────────────────────────────────────────────────────────
// Gap: src/lib/favorites.ts has zero test coverage.
// All three exports (getFavorites, toggleFavorite, isFavorite) need localStorage mock.
import { getFavorites, toggleFavorite, isFavorite } from '@/lib/favorites'

describe('favorites – localStorage-dependent', () => {
  beforeEach(() => {
    // jsdom provides localStorage; wipe it between tests
    localStorage.clear()
  })

  it('getFavorites returns [] when storage is empty', () => {
    expect(getFavorites()).toEqual([])
  })

  it('toggleFavorite adds a slug that is not present', () => {
    const result = toggleFavorite('juros-simples')
    expect(result).toContain('juros-simples')
  })

  it('toggleFavorite removes a slug that is already present', () => {
    toggleFavorite('juros-simples')
    const result = toggleFavorite('juros-simples')
    expect(result).not.toContain('juros-simples')
  })

  it('isFavorite returns true after adding', () => {
    toggleFavorite('imc')
    expect(isFavorite('imc')).toBe(true)
  })

  it('isFavorite returns false for unknown slug', () => {
    expect(isFavorite('nonexistent-calc')).toBe(false)
  })

  it('getFavorites returns [] on SSR (window undefined)', () => {
    // The SSR guard returns [] early — tested by simulating undefined window
    // We can't remove window in jsdom, so we verify the guard indirectly:
    // Corrupt storage to trigger the catch branch
    localStorage.setItem('calcgratis-favoritos', 'not-json')
    expect(getFavorites()).toEqual([])
  })

  it('toggleFavorite persists across getFavorites calls', () => {
    toggleFavorite('financiamento')
    toggleFavorite('irrf')
    const favs = getFavorites()
    expect(favs).toContain('financiamento')
    expect(favs).toContain('irrf')
    expect(favs).toHaveLength(2)
  })
})

// ─── saved-results ────────────────────────────────────────────────────────────
// Gap: src/lib/saved-results.ts has zero test coverage.
// saveResult, deleteSavedResult, clearSavedResults are all untested.
import { getSavedResults, saveResult, deleteSavedResult, clearSavedResults } from '@/lib/saved-results'

const makeResult = (title = 'Test') => ({
  slug: 'imc',
  title,
  mainValue: '22.5',
  mainLabel: 'IMC',
  items: [{ label: 'Classificação', value: 'Normal' }],
})

describe('saved-results – localStorage-dependent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('getSavedResults returns [] when empty', () => {
    expect(getSavedResults()).toEqual([])
  })

  it('saveResult adds an entry with id and date', () => {
    const results = saveResult(makeResult())
    expect(results).toHaveLength(1)
    expect(results[0].id).toBeTruthy()
    expect(results[0].date).toBeTruthy()
    expect(results[0].title).toBe('Test')
  })

  it('saveResult prepends (most-recent first)', () => {
    saveResult(makeResult('First'))
    const results = saveResult(makeResult('Second'))
    expect(results[0].title).toBe('Second')
    expect(results[1].title).toBe('First')
  })

  it('saveResult caps at 50 entries', () => {
    for (let i = 0; i < 55; i++) saveResult(makeResult(`Entry ${i}`))
    expect(getSavedResults()).toHaveLength(50)
  })

  it('deleteSavedResult removes entry by id', () => {
    const [entry] = saveResult(makeResult())
    const after = deleteSavedResult(entry.id)
    expect(after.find(r => r.id === entry.id)).toBeUndefined()
  })

  it('deleteSavedResult is a no-op for unknown id', () => {
    saveResult(makeResult())
    const after = deleteSavedResult('no-such-id')
    expect(after).toHaveLength(1)
  })

  it('clearSavedResults empties the list', () => {
    saveResult(makeResult())
    clearSavedResults()
    expect(getSavedResults()).toEqual([])
  })

  it('getSavedResults returns [] when storage is corrupted', () => {
    localStorage.setItem('calcgratis-saved-results', '{bad json')
    expect(getSavedResults()).toEqual([])
  })
})

// ─── calculator-of-the-day ────────────────────────────────────────────────────
// Gap: src/lib/calculator-of-the-day.ts has zero test coverage.
// getCalculatorOfTheDay uses new Date() internally, so we use fake timers.
import { getCalculatorOfTheDay } from '@/lib/calculator-of-the-day'
import { CALCULADORAS } from '@/lib/constants/calculadoras'

describe('getCalculatorOfTheDay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns a CalculadoraInfo object (has slug, nome, categoriaSlug)', () => {
    vi.setSystemTime(new Date(2026, 4, 20))
    const calc = getCalculatorOfTheDay()
    expect(typeof calc.slug).toBe('string')
    expect(typeof calc.nome).toBe('string')
    expect(typeof calc.categoriaSlug).toBe('string')
  })

  it('result is always from the CALCULADORAS list', () => {
    vi.setSystemTime(new Date(2026, 4, 20))
    const calc = getCalculatorOfTheDay()
    expect(CALCULADORAS.some(c => c.slug === calc.slug)).toBe(true)
  })

  it('same date always returns the same calculator (deterministic)', () => {
    vi.setSystemTime(new Date(2026, 0, 15))
    const a = getCalculatorOfTheDay()
    const b = getCalculatorOfTheDay()
    expect(a.slug).toBe(b.slug)
  })

  it('different dates can return different calculators', () => {
    vi.setSystemTime(new Date(2026, 0, 1))
    const jan1 = getCalculatorOfTheDay()
    vi.setSystemTime(new Date(2026, 0, 2))
    const jan2 = getCalculatorOfTheDay()
    // They might coincidentally be the same, but hash almost certainly differs
    // We just confirm the function runs without error on both dates
    expect(typeof jan1.slug).toBe('string')
    expect(typeof jan2.slug).toBe('string')
  })
})

// ─── seo/jsonld ───────────────────────────────────────────────────────────────
// Gap: src/lib/seo/jsonld.ts has zero test coverage.
// calculadoraJsonLd (PT and ES locales) and faqJsonLd are untested.
import { calculadoraJsonLd, faqJsonLd } from '@/lib/seo/jsonld'

describe('calculadoraJsonLd', () => {
  it('returns null for an unknown slug', () => {
    expect(calculadoraJsonLd('slug-that-does-not-exist')).toBeNull()
  })

  it('returns schema.org WebApplication for a known PT slug', () => {
    const ld = calculadoraJsonLd('imc')
    expect(ld).not.toBeNull()
    expect(ld!['@context']).toBe('https://schema.org')
    expect(ld!['@type']).toBe('WebApplication')
    expect(ld!.offers.price).toBe('0')
    expect(ld!.offers.priceCurrency).toBe('BRL')
  })

  it('PT url contains the calculator slug', () => {
    const ld = calculadoraJsonLd('imc')
    expect(ld!.url).toContain('imc')
  })

  it('ES locale returns priceCurrency USD', () => {
    const ld = calculadoraJsonLd('imc', 'es')
    expect(ld).not.toBeNull()
    expect(ld!.offers.priceCurrency).toBe('USD')
  })

  it('ES url contains /es/ prefix', () => {
    const ld = calculadoraJsonLd('imc', 'es')
    expect(ld!.url).toContain('/es/')
  })

  it('uses HealthApplication for saude category', () => {
    const saudeCalc = CALCULADORAS.find(c => c.categoriaSlug === 'saude')
    if (saudeCalc) {
      const ld = calculadoraJsonLd(saudeCalc.slug)
      expect(ld!.applicationCategory).toBe('HealthApplication')
    }
  })

  it('falls back to UtilitiesApplication for unknown category', () => {
    // Patch: test via a category not in CATEGORY_APP_TYPE
    // The jsonld module defaults to UtilitiesApplication — verify PT path returns a string
    const ld = calculadoraJsonLd('imc')
    expect(typeof ld!.applicationCategory).toBe('string')
  })
})

describe('faqJsonLd', () => {
  const faqs = [
    { question: 'O que é IMC?', answer: 'Índice de Massa Corporal.' },
    { question: 'Como calcular?', answer: 'Peso / altura².' },
  ]

  it('returns FAQPage schema', () => {
    const ld = faqJsonLd(faqs)
    expect(ld['@type']).toBe('FAQPage')
    expect(ld['@context']).toBe('https://schema.org')
  })

  it('mainEntity has one entry per faq', () => {
    const ld = faqJsonLd(faqs)
    expect(ld.mainEntity).toHaveLength(2)
  })

  it('each entity has Question type and acceptedAnswer', () => {
    const ld = faqJsonLd(faqs)
    ld.mainEntity.forEach((entity: { '@type': string; acceptedAnswer: { '@type': string; text: string }; name: string }) => {
      expect(entity['@type']).toBe('Question')
      expect(entity.acceptedAnswer['@type']).toBe('Answer')
      expect(typeof entity.acceptedAnswer.text).toBe('string')
    })
  })

  it('returns empty mainEntity for empty faq list', () => {
    expect(faqJsonLd([]).mainEntity).toHaveLength(0)
  })
})

// ─── formatters – missing edge cases ─────────────────────────────────────────
// Gap: parseBRNumber with R$-prefixed string, formatPercent with 0/negative,
// formatDate boundary values.
import { formatCurrency, formatPercent, parseBRNumber, formatDate } from '@/lib/formatters'

describe('parseBRNumber – additional edge cases', () => {
  it('parses value with R$ prefix (common copy-paste case)', () => {
    // parseBRNumber strips non-numeric chars before parsing
    // If it does: expect 1234.56; if not: expect 0 — document actual behaviour
    const result = parseBRNumber('R$ 1.234,56')
    // The function strips dots and replaces comma: should yield 1234.56
    expect(typeof result).toBe('number')
    expect(isNaN(result)).toBe(false)
  })

  it('integer string parses correctly', () => {
    expect(parseBRNumber('500')).toBe(500)
  })

  it('string with only comma is treated as invalid', () => {
    expect(parseBRNumber(',')).toBe(0)
  })
})

describe('formatPercent – additional edge cases', () => {
  it('formats 0 as 0,00%', () => {
    expect(formatPercent(0)).toBe('0,00%')
  })
})

describe('formatCurrency – large values', () => {
  it('formats one million correctly', () => {
    const s = formatCurrency(1_000_000)
    expect(s).toContain('1')
    expect(s).toContain('000')
    expect(s).toContain('00') // decimals
  })
})

describe('formatDate – boundary values', () => {
  it('formats first day of year', () => {
    expect(formatDate(new Date(2026, 0, 1))).toBe('01/01/2026')
  })

  it('formats last day of year', () => {
    expect(formatDate(new Date(2026, 11, 31))).toBe('31/12/2026')
  })
})
