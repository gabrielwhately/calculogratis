import { INSS_FAIXAS, IRRF_FAIXAS, IRRF_DEDUCAO_DEPENDENTE, FGTS_ALIQUOTA } from '@/lib/constants/tabelas-2026'

interface PjVsCltInput {
  salarioBruto: number
  dependentes: number
  custoContadorPJ: number
}

interface LadoCLT {
  salarioBruto: number
  inss: number
  irrf: number
  fgts: number
  decimoTerceiro: number
  feriasMaisUmTerco: number
  custoAnualEmpregador: number
  liquidoMensal: number
  beneficioEfetivoMensal: number
}

interface LadoPJ {
  faturamento: number
  impostoSimples: number
  custoContador: number
  liquidoMensal: number
}

interface PjVsCltResult {
  clt: LadoCLT
  pj: LadoPJ
  diferencaMensal: number
}

function calcularINSSProgressivo(salario: number): number {
  let inss = 0
  let anterior = 0
  for (const faixa of INSS_FAIXAS) {
    if (salario <= anterior) break
    inss += (Math.min(salario, faixa.ate) - anterior) * faixa.aliquota
    anterior = faixa.ate
  }
  return inss
}

function calcularIRRFBase(baseCalculo: number): number {
  for (const faixa of IRRF_FAIXAS) {
    if (baseCalculo <= faixa.ate) return Math.max(0, baseCalculo * faixa.aliquota - faixa.deducao)
  }
  return 0
}

export function calcularPjVsClt(input: PjVsCltInput): PjVsCltResult {
  const bruto = input.salarioBruto

  // --- CLT ---
  const inss = calcularINSSProgressivo(bruto)
  const baseIRRF = bruto - inss - (input.dependentes * IRRF_DEDUCAO_DEPENDENTE)
  const irrf = calcularIRRFBase(baseIRRF)
  const fgts = bruto * FGTS_ALIQUOTA
  const decimoTerceiro = bruto
  const feriasMaisUmTerco = bruto * (4 / 3)

  const liquidoMensalCLT = bruto - inss - irrf
  // Beneficio efetivo mensal = (liquido anual + FGTS anual + 13o liquido + ferias liquido) / 12
  const salarioAnualLiquido = liquidoMensalCLT * 12
  const fgtsAnual = fgts * 12
  // 13o e ferias tambem sofrem INSS/IRRF (simplificacao: mesmas aliquotas)
  const inss13 = calcularINSSProgressivo(decimoTerceiro)
  const irrf13 = calcularIRRFBase(decimoTerceiro - inss13 - (input.dependentes * IRRF_DEDUCAO_DEPENDENTE))
  const liquido13 = decimoTerceiro - inss13 - irrf13

  const inssFerias = calcularINSSProgressivo(feriasMaisUmTerco)
  const irrfFerias = calcularIRRFBase(feriasMaisUmTerco - inssFerias - (input.dependentes * IRRF_DEDUCAO_DEPENDENTE))
  const liquidoFerias = feriasMaisUmTerco - inssFerias - irrfFerias

  const beneficioAnual = salarioAnualLiquido + fgtsAnual + liquido13 + liquidoFerias
  const beneficioEfetivoMensal = beneficioAnual / 12

  const custoAnualEmpregador = bruto * 12 + fgtsAnual + decimoTerceiro + feriasMaisUmTerco

  // --- PJ (Simples Nacional - Anexo III, faixa 1 ~6%) ---
  const faturamentoPJ = bruto
  const impostoSimples = faturamentoPJ * 0.06
  const custoContador = input.custoContadorPJ
  const liquidoMensalPJ = faturamentoPJ - impostoSimples - custoContador

  return {
    clt: {
      salarioBruto: bruto,
      inss,
      irrf,
      fgts,
      decimoTerceiro,
      feriasMaisUmTerco,
      custoAnualEmpregador,
      liquidoMensal: liquidoMensalCLT,
      beneficioEfetivoMensal,
    },
    pj: {
      faturamento: faturamentoPJ,
      impostoSimples,
      custoContador,
      liquidoMensal: liquidoMensalPJ,
    },
    diferencaMensal: liquidoMensalPJ - beneficioEfetivoMensal,
  }
}
