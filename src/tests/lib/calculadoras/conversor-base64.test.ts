import { describe, it, expect } from 'vitest'
import { encodeBase64, decodeBase64 } from '@/lib/calculadoras/conversor-base64'

describe('Conversor Base64', () => {
  it('deve codificar texto para base64', () => {
    const text = 'Cálculo Grátis'
    const result = encodeBase64(text)
    expect(result.valido).toBe(true)
    expect(result.output).toBe(btoa(unescape(encodeURIComponent(text))))
  })

  it('deve decodificar base64 para texto', () => {
    const encoded = 'Q8OhbGN1bG8gR3LDoXRpcw==' // Cálculo Grátis
    const result = decodeBase64(encoded)
    expect(result.valido).toBe(true)
    expect(result.output).toBe('Cálculo Grátis')
  })
})
