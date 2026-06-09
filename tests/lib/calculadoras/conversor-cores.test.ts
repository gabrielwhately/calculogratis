import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, converterCor } from '@/lib/calculadoras/conversor-cores'

describe('hexToRgb', () => {
  it('converts #ffffff to white RGB', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('converts #000000 to black RGB', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('converts #ff0000 to red RGB', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('returns null for invalid hex', () => {
    expect(hexToRgb('notahex')).toBeNull()
    expect(hexToRgb('#gg0000')).toBeNull()
  })

  it('works without # prefix', () => {
    const result = hexToRgb('ff0000')
    expect(result).toEqual({ r: 255, g: 0, b: 0 })
  })
})

describe('rgbToHex', () => {
  it('converts white RGB to #ffffff', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
  })

  it('converts black RGB to #000000', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
  })

  it('clamps values above 255', () => {
    const result = rgbToHex(300, 0, 0)
    expect(result).toBe('#ff0000')
  })

  it('clamps values below 0', () => {
    const result = rgbToHex(-10, 0, 0)
    expect(result).toBe('#000000')
  })

  it('hexToRgb and rgbToHex are inverse operations', () => {
    const original = '#4a90d9'
    const rgb = hexToRgb(original)!
    expect(rgbToHex(rgb.r, rgb.g, rgb.b)).toBe(original)
  })
})

describe('rgbToHsl', () => {
  it('converts white to HSL (0, 0, 100)', () => {
    expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 })
  })

  it('converts black to HSL (0, 0, 0)', () => {
    expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 })
  })

  it('converts red to HSL (0, 100, 50)', () => {
    expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 })
  })

  it('converts green to HSL (120, 100, 50)', () => {
    expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 })
  })
})

describe('hslToRgb', () => {
  it('converts white HSL to RGB', () => {
    expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('converts black HSL to RGB', () => {
    expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('converts red HSL to RGB', () => {
    expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('rgbToHsl and hslToRgb are inverse operations', () => {
    const hsl = rgbToHsl(100, 149, 237)
    const back = hslToRgb(hsl.h, hsl.s, hsl.l)
    expect(back.r).toBeCloseTo(100, -1)
    expect(back.g).toBeCloseTo(149, -1)
    expect(back.b).toBeCloseTo(237, -1)
  })
})

describe('converterCor', () => {
  it('converts from hex type', () => {
    const result = converterCor('#ff0000', 'hex')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
    expect(result!.hex).toBe('#ff0000')
  })

  it('returns null for invalid hex input', () => {
    expect(converterCor('notvalid', 'hex')).toBeNull()
  })

  it('converts from rgb type string', () => {
    const result = converterCor('255,0,0', 'rgb')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
  })

  it('returns null for invalid rgb input', () => {
    expect(converterCor('invalid', 'rgb')).toBeNull()
  })

  it('converts from hsl type string', () => {
    const result = converterCor('0,100,50', 'hsl')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
  })

  it('returns null for invalid hsl input', () => {
    expect(converterCor('invalid', 'hsl')).toBeNull()
  })
})
