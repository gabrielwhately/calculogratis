interface BasesResult { decimal: string; binario: string; octal: string; hexadecimal: string }

export function converterBases(valor: string, baseOrigem: 2 | 8 | 10 | 16): BasesResult {
  const decimal = parseInt(valor, baseOrigem)
  if (isNaN(decimal)) return { decimal: '0', binario: '0', octal: '0', hexadecimal: '0' }
  return {
    decimal: decimal.toString(10),
    binario: decimal.toString(2),
    octal: decimal.toString(8),
    hexadecimal: decimal.toString(16).toUpperCase(),
  }
}
