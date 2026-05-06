import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, converterCor } from '@/lib/calculadoras/conversor-cores'

describe('hexToRgb', () => {
  it('parses a standard 6-digit hex', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('parses without leading #', () => {
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 })
  })

  it('returns null for invalid hex', () => {
    expect(hexToRgb('#xyz')).toBeNull()
    expect(hexToRgb('')).toBeNull()
  })

  it('handles black and white', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })
})

describe('rgbToHex', () => {
  it('converts rgb to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
  })

  it('clamps values outside 0-255', () => {
    expect(rgbToHex(-10, 300, 0)).toBe('#00ff00')
  })

  it('rounds fractional values', () => {
    expect(rgbToHex(254.7, 0, 0)).toBe('#ff0000')
  })
})

describe('rgbToHsl', () => {
  it('converts red correctly', () => {
    const hsl = rgbToHsl(255, 0, 0)
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('returns s=0 for achromatic (grey)', () => {
    const hsl = rgbToHsl(128, 128, 128)
    expect(hsl.s).toBe(0)
  })
})

describe('hslToRgb', () => {
  it('converts red hsl back to rgb', () => {
    const rgb = hslToRgb(0, 100, 50)
    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
  })

  it('handles achromatic (s=0)', () => {
    const rgb = hslToRgb(0, 0, 50)
    expect(rgb.r).toBe(rgb.g)
    expect(rgb.g).toBe(rgb.b)
  })
})

describe('converterCor', () => {
  it('converts hex input', () => {
    const r = converterCor('#ff0000', 'hex')
    expect(r).not.toBeNull()
    expect(r!.hex).toBe('#ff0000')
    expect(r!.r).toBe(255)
  })

  it('converts rgb input', () => {
    const r = converterCor('255, 0, 0', 'rgb')
    expect(r).not.toBeNull()
    expect(r!.hex).toBe('#ff0000')
  })

  it('converts hsl input', () => {
    const r = converterCor('0, 100, 50', 'hsl')
    expect(r).not.toBeNull()
    expect(r!.r).toBe(255)
  })

  it('returns null for invalid hex', () => {
    expect(converterCor('notacolor', 'hex')).toBeNull()
  })

  it('returns null for invalid rgb string', () => {
    expect(converterCor('abc', 'rgb')).toBeNull()
  })

  it('roundtrips hex→rgb→hex', () => {
    const original = '#3a7bd5'
    const cor = converterCor(original, 'hex')!
    const back = rgbToHex(cor.r, cor.g, cor.b)
    expect(back).toBe(original)
  })
})
