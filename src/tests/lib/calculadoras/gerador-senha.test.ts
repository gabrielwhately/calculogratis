import { describe, it, expect } from 'vitest'
import { gerarSenha, avaliarForcaSenha } from '@/lib/calculadoras/gerador-senha'

describe('gerarSenha', () => {
  it('generates a password of the requested length', () => {
    const s = gerarSenha({ tamanho: 16, maiusculas: true, minusculas: true, numeros: true, simbolos: false })
    expect(s).toHaveLength(16)
  })

  it('contains only uppercase when only maiusculas enabled', () => {
    const s = gerarSenha({ tamanho: 50, maiusculas: true, minusculas: false, numeros: false, simbolos: false })
    expect(s).toMatch(/^[A-Z]+$/)
  })

  it('contains only digits when only numeros enabled', () => {
    const s = gerarSenha({ tamanho: 30, maiusculas: false, minusculas: false, numeros: true, simbolos: false })
    expect(s).toMatch(/^[0-9]+$/)
  })

  it('falls back to alphanumeric when no option selected', () => {
    const s = gerarSenha({ tamanho: 20, maiusculas: false, minusculas: false, numeros: false, simbolos: false })
    expect(s).toHaveLength(20)
    expect(s).toMatch(/^[a-z0-9]+$/)
  })

  it('generates unique passwords on repeated calls', () => {
    const a = gerarSenha({ tamanho: 20, maiusculas: true, minusculas: true, numeros: true, simbolos: true })
    const b = gerarSenha({ tamanho: 20, maiusculas: true, minusculas: true, numeros: true, simbolos: true })
    expect(a).not.toBe(b)
  })
})

describe('avaliarForcaSenha', () => {
  it('labels a short simple password as Fraca', () => {
    const r = avaliarForcaSenha('abc')
    expect(r.label).toBe('Fraca')
    expect(r.cor).toBe('bg-red-500')
  })

  it('labels a mixed medium password as Media', () => {
    const r = avaliarForcaSenha('Abcd1234')
    expect(r.label).toBe('Media')
    expect(r.cor).toBe('bg-yellow-500')
  })

  it('labels a long complex password as Forte', () => {
    const r = avaliarForcaSenha('Abcd1234!@#$XYZ9')
    expect(r.label).toBe('Forte')
    expect(r.cor).toBe('bg-green-500')
  })

  it('returns numeric forca score', () => {
    const r = avaliarForcaSenha('Abcd1234!@')
    expect(typeof r.forca).toBe('number')
    expect(r.forca).toBeGreaterThanOrEqual(0)
  })
})
