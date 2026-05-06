import { describe, it, expect } from 'vitest'
import { gerarUUID, gerarMultiplosUUID } from '@/lib/calculadoras/gerador-uuid'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('gerarUUID', () => {
  it('returns a valid v4 UUID format', () => {
    expect(gerarUUID()).toMatch(UUID_REGEX)
  })

  it('generates unique values on each call', () => {
    const a = gerarUUID()
    const b = gerarUUID()
    expect(a).not.toBe(b)
  })
})

describe('gerarMultiplosUUID', () => {
  it('returns the requested quantity', () => {
    const uuids = gerarMultiplosUUID(5)
    expect(uuids).toHaveLength(5)
  })

  it('all entries are valid v4 UUIDs', () => {
    gerarMultiplosUUID(10).forEach(uuid => expect(uuid).toMatch(UUID_REGEX))
  })

  it('returns empty array for quantity 0', () => {
    expect(gerarMultiplosUUID(0)).toEqual([])
  })

  it('all entries are unique', () => {
    const uuids = gerarMultiplosUUID(20)
    expect(new Set(uuids).size).toBe(20)
  })
})
