import { describe, it, expect } from 'vitest'
import { gerarLorem } from '@/lib/calculadoras/gerador-lorem'

describe('gerarLorem', () => {
  describe('paragrafos', () => {
    it('generates the requested number of paragraphs', () => {
      const r = gerarLorem('paragrafos', 3)
      const paragraphs = r.texto.split('\n\n').filter(Boolean)
      expect(paragraphs).toHaveLength(3)
    })

    it('returns non-empty text', () => {
      const r = gerarLorem('paragrafos', 1)
      expect(r.texto.length).toBeGreaterThan(0)
    })
  })

  describe('frases', () => {
    it('generates the requested number of sentences ending with "."', () => {
      const r = gerarLorem('frases', 5)
      const dots = (r.texto.match(/\./g) || []).length
      expect(dots).toBe(5)
    })
  })

  describe('palavras', () => {
    it('generates approximately the requested word count', () => {
      const r = gerarLorem('palavras', 10)
      // gerarLorem appends a period so split includes a trailing empty — use the returned count
      expect(r.palavras).toBeGreaterThanOrEqual(10)
    })

    it('result starts with uppercase', () => {
      const r = gerarLorem('palavras', 5)
      expect(r.texto.charAt(0)).toMatch(/[A-Z]/)
    })
  })

  describe('metadata', () => {
    it('returns positive palavra and caractere counts', () => {
      const r = gerarLorem('paragrafos', 2)
      expect(r.palavras).toBeGreaterThan(0)
      expect(r.caracteres).toBeGreaterThan(0)
    })

    it('caracteres matches texto length', () => {
      const r = gerarLorem('frases', 3)
      expect(r.caracteres).toBe(r.texto.length)
    })
  })
})
