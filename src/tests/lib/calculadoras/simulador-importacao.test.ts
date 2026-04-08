import { describe, it, expect } from 'vitest'
import { calcularImpostoImportacao } from '@/lib/calculadoras/simulador-importacao'

describe('calcularImpostoImportacao', () => {
  it('calculates total import cost', () => {
    const r = calcularImpostoImportacao({ valorProdutoUSD: 100, frete: 20, cotacaoDolar: 5.5, remessaConforme: true })
    expect(r.valorProdutoBRL).toBeGreaterThan(0)
    expect(r.valorFinal).toBeGreaterThan(r.valorProdutoBRL)
  })
  it('charges higher tax when not remessa conforme', () => {
    const conforme = calcularImpostoImportacao({ valorProdutoUSD: 100, frete: 20, cotacaoDolar: 5.5, remessaConforme: true })
    const nao = calcularImpostoImportacao({ valorProdutoUSD: 100, frete: 20, cotacaoDolar: 5.5, remessaConforme: false })
    expect(nao.valorFinal).toBeGreaterThanOrEqual(conforme.valorFinal)
  })
})
