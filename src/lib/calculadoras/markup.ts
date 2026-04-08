interface MarkupResult {
  custoProduto: number
  markup: number
  precoVenda: number
  lucro: number
  margemLucro: number
}

export function calcularMarkup(custo: number, markupPercent: number): MarkupResult {
  const precoVenda = custo * (1 + markupPercent / 100)
  const lucro = precoVenda - custo
  const margemLucro = precoVenda > 0 ? (lucro / precoVenda) * 100 : 0
  return { custoProduto: custo, markup: markupPercent, precoVenda, lucro, margemLucro }
}

export function calcularMarkupPorMargem(custo: number, margemDesejada: number): MarkupResult {
  const precoVenda = margemDesejada >= 100 ? custo : custo / (1 - margemDesejada / 100)
  const lucro = precoVenda - custo
  const markup = custo > 0 ? (lucro / custo) * 100 : 0
  return { custoProduto: custo, markup, precoVenda, lucro, margemLucro: margemDesejada }
}

export function calcularMarkupPorPreco(custo: number, precoVenda: number): MarkupResult {
  const lucro = precoVenda - custo
  const markup = custo > 0 ? (lucro / custo) * 100 : 0
  const margemLucro = precoVenda > 0 ? (lucro / precoVenda) * 100 : 0
  return { custoProduto: custo, markup, precoVenda, lucro, margemLucro }
}
