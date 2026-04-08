import { FGTS_ALIQUOTA } from '@/lib/constants/tabelas-2026'

interface CustoCLTInput { salarioBruto: number; valeTransporte: number; valeRefeicao: number; planoSaude: number }
interface CustoCLTResult { salarioBruto: number; inssPatronal: number; fgts: number; provisao13: number; provisaoFerias: number; inssProvisoes: number; fgtsProvisoes: number; valeTransporte: number; valeRefeicao: number; planoSaude: number; custoTotal: number; custoPercentual: number }

export function calcularCustoCLT(input: CustoCLTInput): CustoCLTResult {
  const inssPatronal = input.salarioBruto * 0.20 // 20% patronal (simplificado sem RAT/terceiros)
  const fgts = input.salarioBruto * FGTS_ALIQUOTA
  const provisao13 = input.salarioBruto / 12
  const provisaoFerias = (input.salarioBruto / 12) * (4 / 3) // ferias + 1/3 constitucional
  // INSS e FGTS patronal tambem incidem sobre 13o e ferias
  const inssProvisoes = (provisao13 + provisaoFerias) * 0.20
  const fgtsProvisoes = (provisao13 + provisaoFerias) * FGTS_ALIQUOTA

  const custoTotal = input.salarioBruto + inssPatronal + fgts + provisao13 + provisaoFerias + inssProvisoes + fgtsProvisoes + input.valeTransporte + input.valeRefeicao + input.planoSaude
  const custoPercentual = input.salarioBruto > 0 ? ((custoTotal - input.salarioBruto) / input.salarioBruto) * 100 : 0

  return { salarioBruto: input.salarioBruto, inssPatronal, fgts, provisao13, provisaoFerias, inssProvisoes, fgtsProvisoes, valeTransporte: input.valeTransporte, valeRefeicao: input.valeRefeicao, planoSaude: input.planoSaude, custoTotal, custoPercentual }
}
