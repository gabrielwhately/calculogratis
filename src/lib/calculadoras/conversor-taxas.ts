interface TaxaResult { mensal: number; anual: number; diaria: number }

export function converterTaxaMensalParaAnual(mensal: number): TaxaResult {
  const m = mensal / 100
  const anual = (Math.pow(1 + m, 12) - 1) * 100
  const diaria = (Math.pow(1 + m, 1 / 30) - 1) * 100
  return { mensal, anual, diaria }
}

export function converterTaxaAnualParaMensal(anual: number): TaxaResult {
  const a = anual / 100
  const mensal = (Math.pow(1 + a, 1 / 12) - 1) * 100
  const diaria = (Math.pow(1 + a, 1 / 365) - 1) * 100
  return { mensal, anual, diaria }
}

export function converterTaxaDiariaParaMensal(diaria: number): TaxaResult {
  const d = diaria / 100
  const mensal = (Math.pow(1 + d, 30) - 1) * 100
  const anual = (Math.pow(1 + d, 365) - 1) * 100
  return { mensal, anual, diaria }
}
