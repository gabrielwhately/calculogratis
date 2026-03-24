import { describe, it, expect } from 'vitest'
import { gerarCNPJ, validarCNPJ } from '@/lib/calculadoras/gerador-cnpj'

describe('gerarCNPJ', () => {
  it('generates formatted CNPJ', () => { expect(gerarCNPJ()).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/) })
  it('generates valid CNPJs', () => { for (let i = 0; i < 20; i++) expect(validarCNPJ(gerarCNPJ())).toBe(true) })
})
