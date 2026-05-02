import { describe, it, expect } from 'vitest'
import { formatarTempo } from '@/lib/calculadoras/cronometro'

describe('Cronômetro', () => {
  it('deve formatar milissegundos corretamente', () => {
    expect(formatarTempo(0)).toBe('00:00.00')
    expect(formatarTempo(1000)).toBe('00:01.00')
    expect(formatarTempo(61000)).toBe('01:01.00')
    expect(formatarTempo(3661000)).toBe('01:01:01.00')
  })
})
