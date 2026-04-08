interface RendimentoCDBResult {
  valorInicial: number
  taxaCDI: number
  percentualCDI: number
  prazoMeses: number
  rendimentoBruto: number
  ir: number
  iof: number
  rendimentoLiquido: number
  valorFinalBruto: number
  valorFinalLiquido: number
  rentabilidadeEfetiva: number
}

function aliquotaIR(dias: number): number {
  if (dias <= 180) return 0.225
  if (dias <= 360) return 0.20
  if (dias <= 720) return 0.175
  return 0.15
}

export function calcularRendimentoCDB(
  valorInicial: number,
  taxaCDIAnual: number,
  percentualCDI: number,
  prazoMeses: number,
): RendimentoCDBResult {
  const taxaEfetivaAnual = (taxaCDIAnual / 100) * (percentualCDI / 100)
  const taxaMensal = Math.pow(1 + taxaEfetivaAnual, 1 / 12) - 1
  const valorFinalBruto = valorInicial * Math.pow(1 + taxaMensal, prazoMeses)
  const rendimentoBruto = valorFinalBruto - valorInicial
  const dias = prazoMeses * 30
  const ir = rendimentoBruto * aliquotaIR(dias)
  const rendimentoLiquido = rendimentoBruto - ir
  const valorFinalLiquido = valorInicial + rendimentoLiquido
  const rentabilidadeEfetiva = valorInicial > 0 ? (rendimentoLiquido / valorInicial) * 100 : 0

  return {
    valorInicial,
    taxaCDI: taxaCDIAnual,
    percentualCDI,
    prazoMeses,
    rendimentoBruto,
    ir,
    iof: 0,
    rendimentoLiquido,
    valorFinalBruto,
    valorFinalLiquido,
    rentabilidadeEfetiva,
  }
}
