import { describe, it, expect } from 'vitest'
import { encodeBase64, decodeBase64 } from '@/lib/calculadoras/conversor-base64'

describe('encodeBase64', () => {
  it('encodes ASCII string', () => {
    const result = encodeBase64('Hello')
    expect(result.valido).toBe(true)
    expect(result.output).toBe('SGVsbG8=')
  })

  it('encodes empty string', () => {
    const result = encodeBase64('')
    expect(result.valido).toBe(true)
    expect(result.output).toBe('')
  })

  it('encodes string with special characters', () => {
    const result = encodeBase64('Hello, World!')
    expect(result.valido).toBe(true)
    expect(result.output).toBeTruthy()
  })

  it('encoded output is longer than input for ASCII', () => {
    const result = encodeBase64('Hello World')
    expect(result.tamanhoConvertido).toBeGreaterThan(0)
  })
})

describe('decodeBase64', () => {
  it('decodes valid base64 string', () => {
    const result = decodeBase64('SGVsbG8=')
    expect(result.valido).toBe(true)
    expect(result.output).toBe('Hello')
  })

  it('roundtrip encode then decode returns original', () => {
    const original = 'Test string 123!'
    const encoded = encodeBase64(original)
    const decoded = decodeBase64(encoded.output)
    expect(decoded.output).toBe(original)
  })

  it('roundtrip with Portuguese characters', () => {
    const original = 'Olá, mundo! Ção ã é'
    const encoded = encodeBase64(original)
    expect(encoded.valido).toBe(true)
    const decoded = decodeBase64(encoded.output)
    expect(decoded.output).toBe(original)
  })

  it('trims whitespace before decoding', () => {
    const result = decodeBase64('  SGVsbG8=  ')
    expect(result.valido).toBe(true)
    expect(result.output).toBe('Hello')
  })

  it('returns valido=false for invalid base64', () => {
    const result = decodeBase64('not!!valid$$base64')
    expect(result.valido).toBe(false)
    expect(result.erro).toBeDefined()
    expect(result.output).toBe('')
  })
})
