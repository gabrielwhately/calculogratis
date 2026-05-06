import { describe, it, expect } from 'vitest'
import { formatarJSON, minificarJSON } from '@/lib/calculadoras/formatador-json'

describe('formatarJSON', () => {
  it('formats valid JSON with 2-space indent by default', () => {
    const r = formatarJSON('{"a":1}')
    expect(r.valido).toBe(true)
    expect(r.formatado).toBe('{\n  "a": 1\n}')
    expect(r.linhas).toBe(3)
  })

  it('respects custom indent', () => {
    const r = formatarJSON('{"a":1}', 4)
    expect(r.formatado).toContain('    ')
  })

  it('returns valido=false for invalid JSON', () => {
    const r = formatarJSON('{invalid}')
    expect(r.valido).toBe(false)
    expect(r.erro).toBeTruthy()
    expect(r.linhas).toBe(0)
    expect(r.tamanho).toBe(0)
  })

  it('handles arrays', () => {
    const r = formatarJSON('[1,2,3]')
    expect(r.valido).toBe(true)
    expect(JSON.parse(r.formatado)).toEqual([1, 2, 3])
  })

  it('handles empty object', () => {
    const r = formatarJSON('{}')
    expect(r.valido).toBe(true)
  })

  it('handles nested objects', () => {
    const input = '{"a":{"b":{"c":1}}}'
    const r = formatarJSON(input)
    expect(r.valido).toBe(true)
    expect(JSON.parse(r.formatado)).toEqual({ a: { b: { c: 1 } } })
  })
})

describe('minificarJSON', () => {
  it('removes whitespace from formatted JSON', () => {
    const r = minificarJSON('{\n  "a": 1\n}')
    expect(r.valido).toBe(true)
    expect(r.formatado).toBe('{"a":1}')
    expect(r.linhas).toBe(1)
  })

  it('returns valido=false for invalid JSON', () => {
    const r = minificarJSON('not json')
    expect(r.valido).toBe(false)
    expect(r.erro).toBeTruthy()
  })
})
