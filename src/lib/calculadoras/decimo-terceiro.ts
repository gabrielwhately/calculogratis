import { INSS_FAIXAS, IRRF_FAIXAS, IRRF_DEDUCAO_DEPENDENTE } from '@/lib/constants/tabelas-2026'

interface DecimoTerceiroInput {
  salarioBruto: number
  mesesTrabalhados: number
  dependentes: number
  outrasDeducoes: number
}

interface DecimoTerceiroResult {
  salarioBruto: number
  mesesTrabalhados: number
  valorBruto: number
  inss: number
  irrf: number
  deducoes: number
  valorLiquido: number
  primeiraParcela: number
  segundaParcela: number
}

function calcularINSS(base: number): number {
  let inss = 0
  let anterior = 0
  for (const faixa of INSS_FAIXAS) {
    const parcela = Math.min(base, faixa.ate) - anterior
    if (parcela <= 0) break
    inss += parcela * faixa.aliquota
    anterior = faixa.ate
  }
  return inss
}

function calcularIRRF(base: number, dependentes: number): number {
  const deducaoDep = dependentes * IRRF_DEDUCAO_DEPENDENTE
  const baseIR = base - deducaoDep
  if (baseIR <= 0) return 0
  for (const f of IRRF_FAIXAS) {
    if (baseIR <= f.ate) {
      return Math.max(0, baseIR * f.aliquota - f.deducao)
    }
  }
  return 0
}

export function calcularDecimoTerceiro(input: DecimoTerceiroInput): DecimoTerceiroResult {
  const meses = Math.min(Math.max(input.mesesTrabalhados, 1), 12)
  const valorBruto = (input.salarioBruto / 12) * meses

  const inss = calcularINSS(valorBruto)
  const baseIRRF = valorBruto - inss - input.outrasDeducoes
  const irrf = calcularIRRF(baseIRRF, input.dependentes)

  const primeiraParcela = valorBruto / 2
  const segundaParcela = valorBruto - inss - irrf - input.outrasDeducoes - primeiraParcela

  return {
    salarioBruto: input.salarioBruto,
    mesesTrabalhados: meses,
    valorBruto,
    inss,
    irrf,
    deducoes: input.outrasDeducoes,
    valorLiquido: valorBruto - inss - irrf - input.outrasDeducoes,
    primeiraParcela,
    segundaParcela: Math.max(0, segundaParcela),
  }
}
