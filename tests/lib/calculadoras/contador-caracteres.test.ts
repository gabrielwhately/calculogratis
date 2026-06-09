import { describe, it, expect } from 'vitest'
import { contarCaracteres } from '@/lib/calculadoras/contador-caracteres'

describe('contarCaracteres', () => {
  it('returns all zeros for empty string', () => {
    const result = contarCaracteres({ texto: '' })
    expect(result).toEqual({ caracteres: 0, caracteresSemEspacos: 0, palavras: 0, frases: 0, paragrafos: 0, linhas: 0 })
  })

  it('returns all zeros for whitespace-only string', () => {
    const result = contarCaracteres({ texto: '   \n  ' })
    expect(result.palavras).toBe(0)
  })

  it('counts characters including spaces', () => {
    const result = contarCaracteres({ texto: 'hello world' })
    expect(result.caracteres).toBe(11)
  })

  it('counts characters excluding spaces', () => {
    const result = contarCaracteres({ texto: 'hello world' })
    expect(result.caracteresSemEspacos).toBe(10)
  })

  it('counts words split by whitespace', () => {
    const result = contarCaracteres({ texto: 'one two three' })
    expect(result.palavras).toBe(3)
  })

  it('counts words with multiple spaces between them', () => {
    const result = contarCaracteres({ texto: 'one  two   three' })
    expect(result.palavras).toBe(3)
  })

  it('counts sentences delimited by . ! ?', () => {
    const result = contarCaracteres({ texto: 'Hello. How are you? Fine!' })
    expect(result.frases).toBe(3)
  })

  it('counts paragraphs separated by blank lines', () => {
    const result = contarCaracteres({ texto: 'Para one.\n\nPara two.\n\nPara three.' })
    expect(result.paragrafos).toBe(3)
  })

  it('linhas equals newline count + 1', () => {
    const result = contarCaracteres({ texto: 'line1\nline2\nline3' })
    expect(result.linhas).toBe(3)
  })

  it('single line text has linhas = 1', () => {
    const result = contarCaracteres({ texto: 'no newlines here' })
    expect(result.linhas).toBe(1)
  })

  it('handles tabs as whitespace in word count', () => {
    const result = contarCaracteres({ texto: 'word1\tword2' })
    expect(result.palavras).toBe(2)
  })
})
