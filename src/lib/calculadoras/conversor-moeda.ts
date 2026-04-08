interface ConversorMoedaInput {
  valor: number
  taxa: number
}

interface ConversorMoedaResult {
  valorOriginal: number
  taxa: number
  valorConvertido: number
}

export function converterMoeda(input: ConversorMoedaInput): ConversorMoedaResult {
  const valorConvertido = input.valor / input.taxa
  return { valorOriginal: input.valor, taxa: input.taxa, valorConvertido }
}

export function converterMoedaInverso(input: ConversorMoedaInput): ConversorMoedaResult {
  const valorConvertido = input.valor * input.taxa
  return { valorOriginal: input.valor, taxa: input.taxa, valorConvertido }
}
