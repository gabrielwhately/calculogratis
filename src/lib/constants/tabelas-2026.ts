export const INSS_FAIXAS = [
  { ate: 1412.00, aliquota: 0.075 },
  { ate: 2666.68, aliquota: 0.09 },
  { ate: 4000.03, aliquota: 0.12 },
  { ate: 7786.02, aliquota: 0.14 },
] as const

export const IRRF_FAIXAS = [
  { ate: 2259.20, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.00 },
] as const

export const IRRF_DEDUCAO_DEPENDENTE = 189.59
export const FGTS_ALIQUOTA = 0.08
export const FGTS_MULTA_SEM_JUSTA_CAUSA = 0.40

export const SEGURO_DESEMPREGO_FAIXAS = [
  { ate: 2041.39, multiplicador: 0.8 },
  { ate: 3402.65, multiplicador: 0.5, base: 1633.11 },
  { ate: Infinity, valor_fixo: 2313.74 },
] as const

export const SALARIO_MINIMO = 1412.00

export const PREVIDENCIA = {
  idade_minima_homem: 65,
  idade_minima_mulher: 62,
  tempo_contribuicao_minimo_homem: 20,
  tempo_contribuicao_minimo_mulher: 15,
  aliquota_base: 0.6,
  acrescimo_por_ano_extra: 0.02,
} as const
