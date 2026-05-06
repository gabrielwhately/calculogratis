import { describe, it, expect } from 'vitest'
import { converterFuso, FUSOS } from '@/lib/calculadoras/fuso-horario'

describe('FUSOS', () => {
  it('is a non-empty array', () => {
    expect(FUSOS.length).toBeGreaterThan(0)
  })

  it('each entry has a value and label', () => {
    FUSOS.forEach(f => {
      expect(typeof f.value).toBe('string')
      expect(typeof f.label).toBe('string')
      expect(f.value.length).toBeGreaterThan(0)
    })
  })

  it('includes Sao Paulo timezone', () => {
    expect(FUSOS.some(f => f.value === 'America/Sao_Paulo')).toBe(true)
  })
})

describe('converterFuso', () => {
  it('returns strings for horaOrigem and horaDestino', () => {
    const r = converterFuso('12:00', 'America/Sao_Paulo', 'Europe/London')
    expect(typeof r.horaOrigem).toBe('string')
    expect(typeof r.horaDestino).toBe('string')
  })

  it('returns same hora when origin and destination are equal', () => {
    const r = converterFuso('14:30', 'America/Sao_Paulo', 'America/Sao_Paulo')
    expect(r.horaOrigem).toBe(r.horaDestino)
    expect(r.diferenca).toBe('+0.0h')
  })

  it('diferenca string starts with + or -', () => {
    const r = converterFuso('10:00', 'America/Sao_Paulo', 'Europe/Paris')
    expect(r.diferenca).toMatch(/^[+-]\d/)
  })

  it('horaOrigem and horaDestino match HH:MM format', () => {
    const r = converterFuso('08:00', 'America/New_York', 'Asia/Tokyo')
    expect(r.horaOrigem).toMatch(/^\d{2}:\d{2}$/)
    expect(r.horaDestino).toMatch(/^\d{2}:\d{2}$/)
  })
})
