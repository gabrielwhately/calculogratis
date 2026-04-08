interface ImportacaoInput { valorProdutoUSD: number; frete: number; cotacaoDolar: number; remessaConforme: boolean }
interface ImportacaoResult { valorProdutoBRL: number; freteBRL: number; baseCalculo: number; impostoImportacao: number; icms: number; totalImpostos: number; valorFinal: number }

export function calcularImpostoImportacao(input: ImportacaoInput): ImportacaoResult {
  const valorBRL = input.valorProdutoUSD * input.cotacaoDolar
  const freteBRL = input.frete * input.cotacaoDolar
  const baseCalculo = valorBRL + freteBRL

  let impostoImportacao: number
  if (input.remessaConforme) {
    // Remessa Conforme (atualizado abril 2025):
    // Ate US$50: 20% de imposto de importacao
    // Acima de US$50: 60% de imposto de importacao (com deducao de US$20)
    if (input.valorProdutoUSD <= 50) {
      impostoImportacao = baseCalculo * 0.20
    } else {
      impostoImportacao = baseCalculo * 0.60 - (20 * input.cotacaoDolar)
    }
  } else {
    // Fora do programa: 60% de II sem deducao
    impostoImportacao = baseCalculo * 0.60
  }
  impostoImportacao = Math.max(0, impostoImportacao)

  // ICMS: 17% sobre (base + II) / (1 - 0.17) — calculo por dentro
  const baseICMS = (baseCalculo + impostoImportacao) / (1 - 0.17)
  const icms = baseICMS * 0.17

  const totalImpostos = impostoImportacao + icms
  return { valorProdutoBRL: valorBRL, freteBRL, baseCalculo, impostoImportacao, icms, totalImpostos, valorFinal: baseCalculo + totalImpostos }
}
