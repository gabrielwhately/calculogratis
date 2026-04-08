import { INSS_FAIXAS, IRRF_FAIXAS, IRRF_DEDUCAO_DEPENDENTE } from '@/lib/constants/tabelas-2026'

interface IRRFInput {
  salarioBruto: number
  dependentes: number
  pensaoAlimenticia: number
  outrasDeducoes: number
}

interface IRRFResult {
  salarioBruto: number
  inss: number
  baseCalculo: number
  irrf: number
  aliquotaEfetiva: number
  faixa: string
}

function calcularINSS(salario: number): number {
  let inss = 0
  let anterior = 0
  for (const faixa of INSS_FAIXAS) {
    const base = Math.min(salario, faixa.ate) - anterior
    if (base <= 0) break
    inss += base * faixa.aliquota
    anterior = faixa.ate
  }
  return inss
}

export function calcularIRRF(input: IRRFInput): IRRFResult {
  const inss = calcularINSS(input.salarioBruto)
  const deducaoDependentes = input.dependentes * IRRF_DEDUCAO_DEPENDENTE
  const baseCalculo = input.salarioBruto - inss - deducaoDependentes - input.pensaoAlimenticia - input.outrasDeducoes

  let irrf = 0
  let faixa = 'Isento'

  if (baseCalculo > 0) {
    for (const f of IRRF_FAIXAS) {
      if (baseCalculo <= f.ate) {
        irrf = Math.max(0, baseCalculo * f.aliquota - f.deducao)
        if (f.aliquota > 0) faixa = `${(f.aliquota * 100).toFixed(1)}%`
        break
      }
    }
  }

  const aliquotaEfetiva = input.salarioBruto > 0 ? irrf / input.salarioBruto : 0

  return { salarioBruto: input.salarioBruto, inss, baseCalculo: Math.max(0, baseCalculo), irrf, aliquotaEfetiva, faixa }
}
