import { describe, it, expect } from 'vitest'
import { contarCaracteres } from '@/lib/calculadoras/contador-caracteres'

describe('Contador de Caracteres', () => {
  it('deve contar caracteres, palavras e linhas corretamente', () => {
    const texto = 'Olá mundo.\nSegunda linha.'
    const result = contarCaracteres({ texto })
    expect(result.caracteres).toBe(texto.length)
    expect(result.palavras).toBe(4)
    expect(result.linhas).toBe(2)
    expect(result.caracteresSemEspacos).toBe(22)
  })

  it('deve lidar com texto vazio', () => {
    const result = contarCaracteres({ texto: '' })
    expect(result.caracteres).toBe(0)
    expect(result.palavras).toBe(0)
  })
})
