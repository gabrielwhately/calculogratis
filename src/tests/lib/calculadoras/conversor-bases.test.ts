import { describe, it, expect } from 'vitest'
import { converterBases } from '@/lib/calculadoras/conversor-bases'

describe('Conversor de Bases', () => {
  it('deve converter de decimal para outras bases', () => {
    const result = converterBases('255', 10)
    expect(result.binario).toBe('11111111')
    expect(result.hexadecimal).toBe('FF')
    expect(result.octal).toBe('377')
  })

  it('deve converter de hexadecimal para outras bases', () => {
    const result = converterBases('A', 16)
    expect(result.decimal).toBe('10')
    expect(result.binario).toBe('1010')
  })

  it('deve lidar com entradas inválidas', () => {
    const result = converterBases('XYZ', 10)
    expect(result.decimal).toBe('0')
  })
})
