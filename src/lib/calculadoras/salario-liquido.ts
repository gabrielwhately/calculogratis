import { INSS_FAIXAS, IRRF_FAIXAS, IRRF_DEDUCAO_DEPENDENTE } from '@/lib/constants/tabelas-2026'

interface SalarioLiquidoInput { salarioBruto: number; dependentes: number; outrosDescontos: number }
interface SalarioLiquidoResult {
  salarioBruto: number; inss: number; baseIRRF: number; irrf: number
  outrosDescontos: number; salarioLiquido: number; aliquotaEfetivaINSS: number; aliquotaEfetivaIRRF: number
}

export function calcularINSS(salarioBruto: number): number {
  let inss = 0, anterior = 0
  for (const faixa of INSS_FAIXAS) {
    if (salarioBruto <= anterior) break
    inss += (Math.min(salarioBruto, faixa.ate) - anterior) * faixa.aliquota
    anterior = faixa.ate
  }
  return inss
}

export function calcularIRRF(baseCalculo: number): number {
  for (const faixa of IRRF_FAIXAS) {
    if (baseCalculo <= faixa.ate) return Math.max(0, baseCalculo * faixa.aliquota - faixa.deducao)
  }
  return 0
}

export function calcularSalarioLiquido(input: SalarioLiquidoInput): SalarioLiquidoResult {
  const inss = calcularINSS(input.salarioBruto)
  const baseIRRF = input.salarioBruto - inss - (input.dependentes * IRRF_DEDUCAO_DEPENDENTE)
  const irrf = calcularIRRF(baseIRRF)
  const salarioLiquido = input.salarioBruto - inss - irrf - input.outrosDescontos
  return {
    salarioBruto: input.salarioBruto, inss, baseIRRF, irrf, outrosDescontos: input.outrosDescontos, salarioLiquido,
    aliquotaEfetivaINSS: input.salarioBruto > 0 ? inss / input.salarioBruto : 0,
    aliquotaEfetivaIRRF: baseIRRF > 0 ? irrf / baseIRRF : 0,
  }
}
