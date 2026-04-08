interface DescontoResult { valorOriginal: number; desconto: number; valorDesconto: number; valorFinal: number; economia: number }

export function calcularDesconto(valor: number, desconto: number): DescontoResult {
  const valorDesconto = valor * (desconto / 100)
  return { valorOriginal: valor, desconto, valorDesconto, valorFinal: valor - valorDesconto, economia: valorDesconto }
}

export function calcularDescontoProgressivo(valor: number, descontos: number[]): { valorOriginal: number; etapas: { desconto: number; valorApos: number }[]; valorFinal: number } {
  let atual = valor
  const etapas = descontos.map(d => { atual = atual * (1 - d / 100); return { desconto: d, valorApos: atual } })
  return { valorOriginal: valor, etapas, valorFinal: atual }
}
