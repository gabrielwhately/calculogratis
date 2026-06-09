/**
 * Test skeletons covering identified coverage gaps.
 * Each describe block targets a specific untested function or edge case.
 */
import { describe, it, expect } from 'vitest'
import { converterUnidade, getUnidades, getNomeUnidade } from '@/lib/calculadoras/conversor-unidades'
import { calcularPintura } from '@/lib/calculadoras/calculadora-pintura'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'
import { calcularConsorcio } from '@/lib/calculadoras/simulador-consorcio'
import { avaliarExpressao } from '@/lib/calculadoras/calculadora-cientifica'
import { converterBases } from '@/lib/calculadoras/conversor-bases'
import { calcularMacros } from '@/lib/calculadoras/calculadora-macros'

// ---------------------------------------------------------------------------
// conversor-unidades — getUnidades (completely untested)
// ---------------------------------------------------------------------------
describe('getUnidades', () => {
  it('returns length units for comprimento category', () => {
    const units = getUnidades('comprimento')
    const values = units.map((u) => u.value)
    expect(values).toContain('m')
    expect(values).toContain('km')
    expect(values).toContain('mi')
    expect(values).toContain('ft')
  })

  it('returns weight units for peso category', () => {
    const units = getUnidades('peso')
    const values = units.map((u) => u.value)
    expect(values).toContain('kg')
    expect(values).toContain('lb')
    expect(values).toContain('oz')
  })

  it('returns volume units including culinary ones', () => {
    const units = getUnidades('volume')
    const values = units.map((u) => u.value)
    expect(values).toContain('l')
    expect(values).toContain('ml')
    expect(values).toContain('cup')
    expect(values).toContain('colher-sopa')
    expect(values).toContain('colher-cha')
  })

  it('returns exactly 3 temperature units', () => {
    const units = getUnidades('temperatura')
    expect(units).toHaveLength(3)
    const values = units.map((u) => u.value)
    expect(values).toContain('C')
    expect(values).toContain('F')
    expect(values).toContain('K')
  })

  it('every unit has a non-empty label', () => {
    for (const cat of ['comprimento', 'peso', 'volume', 'temperatura'] as const) {
      getUnidades(cat).forEach((u) => {
        expect(u.label.length).toBeGreaterThan(0)
      })
    }
  })
})

// ---------------------------------------------------------------------------
// conversor-unidades — getNomeUnidade (completely untested)
// ---------------------------------------------------------------------------
describe('getNomeUnidade', () => {
  it('returns human-readable name for known keys', () => {
    expect(getNomeUnidade('kg')).toBe('Quilogramas')
    expect(getNomeUnidade('m')).toBe('Metros')
    expect(getNomeUnidade('C')).toBe('Celsius')
  })

  it('returns the key itself for unknown keys', () => {
    expect(getNomeUnidade('xyz')).toBe('xyz')
  })

  it('returns name for culinary volume units', () => {
    expect(getNomeUnidade('colher-sopa')).toBe('Colheres de Sopa')
    expect(getNomeUnidade('colher-cha')).toBe('Colheres de Cha')
  })
})

// ---------------------------------------------------------------------------
// conversor-unidades — converterUnidade missing paths
// ---------------------------------------------------------------------------
describe('converterUnidade — uncovered conversion paths', () => {
  describe('temperature', () => {
    it('F → C: 32°F = 0°C', () => {
      expect(converterUnidade(32, 'F', 'C', 'temperatura')).toBeCloseTo(0)
    })

    it('F → C: 212°F = 100°C', () => {
      expect(converterUnidade(212, 'F', 'C', 'temperatura')).toBeCloseTo(100)
    })

    it('F → K: 32°F = 273.15 K', () => {
      expect(converterUnidade(32, 'F', 'K', 'temperatura')).toBeCloseTo(273.15)
    })

    it('K → C: 273.15 K = 0°C', () => {
      expect(converterUnidade(273.15, 'K', 'C', 'temperatura')).toBeCloseTo(0)
    })

    it('K → F: 273.15 K = 32°F', () => {
      expect(converterUnidade(273.15, 'K', 'F', 'temperatura')).toBeCloseTo(32)
    })

    it('same-unit returns the value unchanged', () => {
      expect(converterUnidade(100, 'C', 'C', 'temperatura')).toBe(100)
    })
  })

  describe('imperial length', () => {
    it('1 mile = 1609.344 meters', () => {
      expect(converterUnidade(1, 'mi', 'm', 'comprimento')).toBeCloseTo(1609.344)
    })

    it('1 foot = 0.3048 meters', () => {
      expect(converterUnidade(1, 'ft', 'm', 'comprimento')).toBeCloseTo(0.3048)
    })

    it('1 inch = 0.0254 meters', () => {
      expect(converterUnidade(1, 'in', 'm', 'comprimento')).toBeCloseTo(0.0254)
    })

    it('1 yard = 0.9144 meters', () => {
      expect(converterUnidade(1, 'yd', 'm', 'comprimento')).toBeCloseTo(0.9144)
    })
  })

  describe('imperial weight', () => {
    it('1 pound = 0.453592 kg', () => {
      expect(converterUnidade(1, 'lb', 'kg', 'peso')).toBeCloseTo(0.453592)
    })

    it('1 ounce = 0.0283495 kg', () => {
      expect(converterUnidade(1, 'oz', 'kg', 'peso')).toBeCloseTo(0.0283495)
    })
  })

  describe('culinary volume', () => {
    it('1 gallon = 3.78541 liters', () => {
      expect(converterUnidade(1, 'gal', 'l', 'volume')).toBeCloseTo(3.78541)
    })

    it('1 cup = 240 ml', () => {
      expect(converterUnidade(1, 'cup', 'ml', 'volume')).toBeCloseTo(240)
    })

    it('1 tablespoon = 15 ml', () => {
      expect(converterUnidade(1, 'colher-sopa', 'ml', 'volume')).toBeCloseTo(15)
    })

    it('1 teaspoon = 5 ml', () => {
      expect(converterUnidade(1, 'colher-cha', 'ml', 'volume')).toBeCloseTo(5)
    })
  })

  describe('unknown unit fallback', () => {
    it('falls back to factor 1 for unknown unit keys', () => {
      // unknown keys use factor 1 so the result equals the raw base value
      const result = converterUnidade(100, 'm', 'unknown_unit', 'comprimento')
      // base = 100 * 1 (m factor) = 100; / 1 (unknown fallback) = 100
      expect(result).toBe(100)
    })
  })
})

// ---------------------------------------------------------------------------
// calculadora-pintura — uncovered edge cases
// ---------------------------------------------------------------------------
describe('calcularPintura — edge cases', () => {
  it('zero rendimentoLitro returns 0 litros (guarded division)', () => {
    const r = calcularPintura(4, 5, 2.8, 1, 1, 2, 0)
    expect(r.litrosNecessarios).toBe(0)
  })

  it('enough doors/windows to zero out areaUtil', () => {
    // Wall area = 2*(3+4)*2 = 28m². Each door = 0.8×2.1 = 1.68m².
    // 17 doors × 1.68 = 28.56m² > 28m² → areaUtil = max(0, 28 - 28.56) = 0
    const r = calcularPintura(3, 4, 2, 17, 0, 2, 10)
    expect(r.areaUtil).toBe(0)
    expect(r.litrosNecessarios).toBe(0)
  })

  it('uses default parameters when omitted', () => {
    // Called with only required params; defaults: 1 door, 1 window, 2 coats, 10 l/m²
    const withDefaults = calcularPintura(4, 5, 2.8)
    const explicit = calcularPintura(4, 5, 2.8, 1, 1, 2, 10)
    expect(withDefaults.litrosNecessarios).toBe(explicit.litrosNecessarios)
    expect(withDefaults.demaos).toBe(2)
    expect(withDefaults.rendimentoPorLitro).toBe(10)
  })

  it('galoes18 and latas09 are always >= 0', () => {
    const r = calcularPintura(4, 5, 2.8, 1, 1, 2, 10)
    expect(r.galoes18).toBeGreaterThanOrEqual(0)
    expect(r.latas09).toBeGreaterThanOrEqual(0)
  })

  it('latas09 >= galoes36 >= galoes18 for any non-trivial room', () => {
    const r = calcularPintura(5, 6, 3, 2, 3, 2, 10)
    // 0.9L < 3.6L < 18L → more small units needed than large
    expect(r.latas09).toBeGreaterThanOrEqual(r.galoes36)
    expect(r.galoes36).toBeGreaterThanOrEqual(r.galoes18)
  })

  it('areaTotal reflects raw wall area (before deductions)', () => {
    const r = calcularPintura(4, 5, 2.8, 0, 0, 1, 10)
    // 2*(4+5)*2.8 = 50.4
    expect(r.areaTotal).toBeCloseTo(50.4)
    // With no doors/windows, areaUtil equals areaTotal
    expect(r.areaUtil).toBeCloseTo(50.4)
  })
})

// ---------------------------------------------------------------------------
// aposentadoria — uncovered scenarios
// ---------------------------------------------------------------------------
describe('calcularAposentadoria — edge cases', () => {
  it('benefit is capped at 100% for extreme contribution years', () => {
    const r = calcularAposentadoria({ idade: 70, sexo: 'masculino', anosContribuicao: 60, mediaSalarios: 5000 })
    expect(r.percentualBeneficio).toBeLessThanOrEqual(1)
  })

  it('valorEstimado equals mediaSalarios * percentualBeneficio', () => {
    const r = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 25, mediaSalarios: 4000 })
    expect(r.valorEstimado).toBeCloseTo(r.mediaSalarios ?? 4000 * r.percentualBeneficio)
  })

  it('motivoNegativa has two entries when both age and contribution are below minimum', () => {
    const r = calcularAposentadoria({ idade: 40, sexo: 'masculino', anosContribuicao: 5, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.motivoNegativa).toHaveLength(2)
  })

  it('motivoNegativa has one entry when only age is insufficient', () => {
    const r = calcularAposentadoria({ idade: 50, sexo: 'masculino', anosContribuicao: 25, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.motivoNegativa).toHaveLength(1)
    expect(r.motivoNegativa[0]).toMatch(/[Ii]dade/)
  })

  it('motivoNegativa has one entry when only contribution is insufficient', () => {
    const r = calcularAposentadoria({ idade: 68, sexo: 'masculino', anosContribuicao: 5, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.motivoNegativa).toHaveLength(1)
    expect(r.motivoNegativa[0]).toMatch(/[Tt]empo/)
  })

  it('anosRestantes reflects the larger of the two gaps', () => {
    // Age gap: 65-40=25, contribution gap: 20-5=15 → max=25
    const r = calcularAposentadoria({ idade: 40, sexo: 'masculino', anosContribuicao: 5, mediaSalarios: 3000 })
    expect(r.anosRestantes).toBe(25)
  })

  it('applies female retirement rules (lower minimums)', () => {
    const female = calcularAposentadoria({ idade: 62, sexo: 'feminino', anosContribuicao: 15, mediaSalarios: 2500 })
    expect(female.podeAposentar).toBe(true)
    expect(female.idadeMinima).toBeLessThan(65)
  })
})

// ---------------------------------------------------------------------------
// simulador-consorcio — uncovered scenarios
// ---------------------------------------------------------------------------
describe('calcularConsorcio — edge cases', () => {
  it('prazoMeses = 0 falls back to 1 month (guard clause)', () => {
    const r = calcularConsorcio(50000, 0, 10, 1)
    expect(r.prazoMeses).toBe(1)
    expect(r.parcela).toBeCloseTo(r.totalComTaxas)
  })

  it('default fundoReservaPercent of 1% is applied when omitted', () => {
    const explicit = calcularConsorcio(100000, 60, 12, 1)
    const withDefault = calcularConsorcio(100000, 60, 12)
    expect(withDefault.fundoReserva).toBe(explicit.fundoReserva)
  })

  it('fundoReserva equals valorBem * fundoReservaPercent / 100', () => {
    const r = calcularConsorcio(100000, 60, 12, 2)
    expect(r.fundoReserva).toBeCloseTo(100000 * 0.02)
  })

  it('totalPago and totalComTaxas are the same field', () => {
    const r = calcularConsorcio(80000, 48, 10, 1)
    expect(r.totalPago).toBe(r.totalComTaxas)
  })

  it('custoAdminTotal grows with longer prazo at the same annual rate', () => {
    const short = calcularConsorcio(100000, 12, 10, 0)
    const long = calcularConsorcio(100000, 60, 10, 0)
    expect(long.custoAdminTotal).toBeGreaterThan(short.custoAdminTotal)
  })
})

// ---------------------------------------------------------------------------
// calculadora-cientifica — untested FUNCS
// ---------------------------------------------------------------------------
describe('avaliarExpressao — untested built-in functions', () => {
  it('tan(0) = 0', () => {
    expect(avaliarExpressao('tan(0)').resultado).toBeCloseTo(0)
  })

  it('cbrt(27) = 3', () => {
    expect(avaliarExpressao('cbrt(27)').resultado).toBeCloseTo(3)
  })

  it('exp(0) = 1', () => {
    expect(avaliarExpressao('exp(0)').resultado).toBeCloseTo(1)
  })

  it('exp(1) = e', () => {
    expect(avaliarExpressao('exp(1)').resultado).toBeCloseTo(Math.E)
  })

  it('asin(0) = 0', () => {
    expect(avaliarExpressao('asin(0)').resultado).toBeCloseTo(0)
  })

  it('acos(1) = 0', () => {
    expect(avaliarExpressao('acos(1)').resultado).toBeCloseTo(0)
  })

  it('atan(0) = 0', () => {
    expect(avaliarExpressao('atan(0)').resultado).toBeCloseTo(0)
  })

  it('nested function calls: sqrt(abs(-9)) = 3', () => {
    expect(avaliarExpressao('sqrt(abs(-9))').resultado).toBeCloseTo(3)
  })

  it('function composed with arithmetic: log(100) + 1 = 3', () => {
    expect(avaliarExpressao('log(100)+1').resultado).toBeCloseTo(3)
  })
})

// ---------------------------------------------------------------------------
// conversor-bases — missing input bases
// ---------------------------------------------------------------------------
describe('converterBases — missing input bases', () => {
  it('converts from binary (base 2)', () => {
    const r = converterBases('1010', 2)
    expect(r.decimal).toBe('10')
    expect(r.hexadecimal).toBe('A')
    expect(r.octal).toBe('12')
  })

  it('converts from octal (base 8)', () => {
    const r = converterBases('17', 8)
    expect(r.decimal).toBe('15')
    expect(r.binario).toBe('1111')
    expect(r.hexadecimal).toBe('F')
  })

  it('converts zero from any base', () => {
    expect(converterBases('0', 10).decimal).toBe('0')
    expect(converterBases('0', 2).binario).toBe('0')
    expect(converterBases('0', 16).hexadecimal).toBe('0')
  })

  it('converts large decimal number', () => {
    const r = converterBases('65535', 10)
    expect(r.hexadecimal).toBe('FFFF')
    expect(r.binario).toBe('1111111111111111')
  })

  it('handles lowercase hex input (parseInt is case-insensitive)', () => {
    const lower = converterBases('ff', 16)
    const upper = converterBases('FF', 16)
    expect(lower.decimal).toBe(upper.decimal)
    expect(lower.decimal).toBe('255')
  })
})

// ---------------------------------------------------------------------------
// calculadora-macros — uncovered scenarios
// ---------------------------------------------------------------------------
describe('calcularMacros — edge cases', () => {
  it('muito_intenso activity level produces the highest calories', () => {
    const intenso = calcularMacros(80, 180, 30, 'masculino', 'intenso', 'manter')
    const muitoIntenso = calcularMacros(80, 180, 30, 'masculino', 'muito_intenso', 'manter')
    expect(muitoIntenso.caloriasTotal).toBeGreaterThan(intenso.caloriasTotal)
  })

  it('macro percentages sum to approximately 100%', () => {
    const r = calcularMacros(75, 175, 28, 'feminino', 'moderado', 'emagrecer')
    const total = r.proteinas.percentual + r.carboidratos.percentual + r.gorduras.percentual
    // Allow ±2% rounding tolerance from Math.round
    expect(total).toBeGreaterThanOrEqual(98)
    expect(total).toBeLessThanOrEqual(102)
  })

  it('protein grams scale with body weight', () => {
    const light = calcularMacros(60, 170, 25, 'masculino', 'moderado', 'ganhar_massa')
    const heavy = calcularMacros(100, 170, 25, 'masculino', 'moderado', 'ganhar_massa')
    expect(heavy.proteinas.gramas).toBeGreaterThan(light.proteinas.gramas)
  })

  it('fat percentual matches the MACRO_SPLIT definition for each objective', () => {
    const emagrecer = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'emagrecer')
    const manter = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'manter')
    const ganhar = calcularMacros(70, 175, 25, 'masculino', 'moderado', 'ganhar_massa')
    expect(emagrecer.gorduras.percentual).toBe(25)
    expect(manter.gorduras.percentual).toBe(28)
    expect(ganhar.gorduras.percentual).toBe(22)
  })

  it('caloriasTotal is positive even with 500 kcal deficit applied', () => {
    // 50kg, 155cm, 20y, female, sedentary, emagrecer: BMR≈1384, TDEE≈1661, -500 = ~1161
    // Verify the result is a positive number (not negative or zero)
    const r = calcularMacros(50, 155, 20, 'feminino', 'sedentario', 'emagrecer')
    expect(r.caloriasTotal).toBeGreaterThan(0)
  })
})
