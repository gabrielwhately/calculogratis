import { calcularINSS, calcularIRRF } from './salario-liquido'
import { IRRF_DEDUCAO_DEPENDENTE } from '@/lib/constants/tabelas-2026'

interface FeriasInput {
  salarioBruto: number
  diasFerias: number
  vendeAbono: boolean
  dependentes: number
}

interface FeriasResult {
  salarioBruto: number
  feriasBase: number
  tercoConstitucional: number
  abonoPecuniario: number
  totalBruto: number
  descontoINSS: number
  descontoIRRF: number
  totalLiquido: number
}

export function calcularFerias(input: FeriasInput): FeriasResult {
  const { salarioBruto, diasFerias, vendeAbono } = input

  // Ferias proporcionais aos dias
  const feriasBase = salarioBruto * diasFerias / 30

  // 1/3 constitucional sobre as ferias
  const tercoConstitucional = feriasBase / 3

  // Abono pecuniario: venda de 10 dias + 1/3 sobre o abono
  let abonoPecuniario = 0
  if (vendeAbono) {
    const abonoBase = salarioBruto * 10 / 30
    abonoPecuniario = abonoBase + abonoBase / 3
  }

  const totalBruto = feriasBase + tercoConstitucional + abonoPecuniario

  // INSS e IRRF incidem sobre ferias + terco (abono pecuniario e isento)
  const baseDesconto = feriasBase + tercoConstitucional
  const descontoINSS = calcularINSS(baseDesconto)
  const baseIRRF = baseDesconto - descontoINSS - ((input.dependentes || 0) * IRRF_DEDUCAO_DEPENDENTE)
  const descontoIRRF = calcularIRRF(Math.max(0, baseIRRF))

  const totalLiquido = totalBruto - descontoINSS - descontoIRRF

  return {
    salarioBruto,
    feriasBase,
    tercoConstitucional,
    abonoPecuniario,
    totalBruto,
    descontoINSS,
    descontoIRRF,
    totalLiquido,
  }
}
