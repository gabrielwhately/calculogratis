export interface ResultadoCustasProcessuais {
  custasIniciais: number
  percentual: number
  valorCausa: number
}

/**
 * Calcula as custas processuais iniciais estimadas.
 * 
 * Baseado em um modelo genérico comum em tribunais brasileiros:
 * - 1% do valor da causa
 * - Valor mínimo: R$ 150,00
 * - Valor máximo: R$ 50.000,00
 */
export function calcularCustasProcessuais(valorCausa: number): ResultadoCustasProcessuais {
  const percentual = 0.01 // 1%
  let custas = valorCausa * percentual

  // Limites (exemplo baseado em TJs brasileiros)
  const MINIMO = 150.00
  const MAXIMO = 50000.00

  if (custas < MINIMO) custas = MINIMO
  if (custas > MAXIMO) custas = MAXIMO

  return {
    custasIniciais: Number(custas.toFixed(2)),
    percentual: percentual * 100,
    valorCausa: valorCausa
  }
}
