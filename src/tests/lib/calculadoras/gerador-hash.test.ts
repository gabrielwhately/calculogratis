import { describe, it, expect } from 'vitest'
import { gerarHash, gerarMD5 } from '@/lib/calculadoras/gerador-hash'

describe('gerarHash (async, Web Crypto)', () => {
  it('produces a 64-char hex string for SHA-256', async () => {
    const hash = await gerarHash('hello', 'SHA-256')
    expect(hash).toHaveLength(64)
    expect(hash).toMatch(/^[0-9a-f]+$/)
  })

  it('SHA-256 of "hello" matches known value', async () => {
    const hash = await gerarHash('hello', 'SHA-256')
    expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
  })

  it('produces a 40-char hex string for SHA-1', async () => {
    const hash = await gerarHash('hello', 'SHA-1')
    expect(hash).toHaveLength(40)
  })

  it('produces a 96-char hex string for SHA-384', async () => {
    const hash = await gerarHash('hello', 'SHA-384')
    expect(hash).toHaveLength(96)
  })

  it('produces a 128-char hex string for SHA-512', async () => {
    const hash = await gerarHash('hello', 'SHA-512')
    expect(hash).toHaveLength(128)
  })

  it('empty string produces a deterministic hash', async () => {
    const a = await gerarHash('', 'SHA-256')
    const b = await gerarHash('', 'SHA-256')
    expect(a).toBe(b)
  })
})

describe('gerarMD5 (sync)', () => {
  it('MD5 of "hello" matches known value', () => {
    expect(gerarMD5('hello')).toBe('5d41402abc4b2a76b9719d911017c592')
  })

  it('MD5 of empty string matches known value', () => {
    expect(gerarMD5('')).toBe('d41d8cd98f00b204e9800998ecf8427e')
  })

  it('different inputs produce different hashes', () => {
    expect(gerarMD5('foo')).not.toBe(gerarMD5('bar'))
  })

  it('returns a 32-char hex string', () => {
    const h = gerarMD5('test')
    expect(h).toHaveLength(32)
    expect(h).toMatch(/^[0-9a-f]+$/)
  })
})
