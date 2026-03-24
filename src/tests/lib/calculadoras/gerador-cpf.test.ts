import { describe, it, expect } from 'vitest'
import { gerarCPF, validarCPF } from '@/lib/calculadoras/gerador-cpf'

describe('gerarCPF', () => {
  it('generates formatted CPF', () => { expect(gerarCPF()).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) })
  it('generates valid CPFs', () => { for (let i = 0; i < 20; i++) expect(validarCPF(gerarCPF())).toBe(true) })
})
describe('validarCPF', () => {
  it('rejects all-same-digit', () => { expect(validarCPF('111.111.111-11')).toBe(false) })
  it('rejects invalid', () => { expect(validarCPF('123.456.789-00')).toBe(false) })
})
