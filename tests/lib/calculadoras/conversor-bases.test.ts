import { describe, it, expect } from 'vitest'
import { converterBases } from '@/lib/calculadoras/conversor-bases'

describe('converterBases', () => {
  it('converts decimal 255 to all bases', () => {
    const result = converterBases('255', 10)
    expect(result.decimal).toBe('255')
    expect(result.binario).toBe('11111111')
    expect(result.octal).toBe('377')
    expect(result.hexadecimal).toBe('FF')
  })

  it('converts binary to all bases', () => {
    const result = converterBases('1010', 2)
    expect(result.decimal).toBe('10')
    expect(result.octal).toBe('12')
    expect(result.hexadecimal).toBe('A')
  })

  it('converts hex to all bases', () => {
    const result = converterBases('FF', 16)
    expect(result.decimal).toBe('255')
    expect(result.binario).toBe('11111111')
    expect(result.octal).toBe('377')
  })

  it('converts octal to all bases', () => {
    const result = converterBases('17', 8)
    expect(result.decimal).toBe('15')
    expect(result.binario).toBe('1111')
    expect(result.hexadecimal).toBe('F')
  })

  it('returns zeros for invalid input', () => {
    const result = converterBases('xyz', 10)
    expect(result.decimal).toBe('0')
    expect(result.binario).toBe('0')
    expect(result.octal).toBe('0')
    expect(result.hexadecimal).toBe('0')
  })

  it('converts zero', () => {
    const result = converterBases('0', 10)
    expect(result.decimal).toBe('0')
    expect(result.binario).toBe('0')
    expect(result.octal).toBe('0')
    expect(result.hexadecimal).toBe('0')
  })

  it('hexadecimal output is uppercase', () => {
    const result = converterBases('255', 10)
    expect(result.hexadecimal).toBe(result.hexadecimal.toUpperCase())
  })
})
