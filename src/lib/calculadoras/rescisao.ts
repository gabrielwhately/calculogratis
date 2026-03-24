import { FGTS_MULTA_SEM_JUSTA_CAUSA } from '@/lib/constants/tabelas-2026'
import { calcularINSS, calcularIRRF } from './salario-liquido'

export type TipoDemissao = 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo'

interface RescisaoInput { salario: number; dataAdmissao: Date; dataDemissao: Date; tipoDemissao: TipoDemissao; saldoFGTS: number; dependentes: number }
interface RescisaoResult {
  saldoSalario: number; avisoPrevio: number; feriasVencidas: number; feriasProporcionais: number
  tercoFerias: number; decimoTerceiro: number; multaFGTS: number; inss: number; irrf: number; total: number
  diasTrabalhados: number; mesesTrabalhados: number
}

function diffMeses(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

export function calcularRescisao(input: RescisaoInput): RescisaoResult {
  const meses = diffMeses(input.dataAdmissao, input.dataDemissao)
  const diasNoMes = input.dataDemissao.getDate()
  const salarioDia = input.salario / 30
  const saldoSalario = salarioDia * diasNoMes

  const anos = Math.floor(meses / 12)
  const diasAviso = input.tipoDemissao === 'sem_justa_causa' ? Math.min(30 + anos * 3, 120)
    : input.tipoDemissao === 'acordo' ? Math.min(30 + anos * 3, 120) / 2 : 0
  const avisoPrevio = salarioDia * diasAviso

  const mesesFerias = meses % 12
  const feriasVencidas = input.tipoDemissao !== 'justa_causa' && meses >= 12 ? input.salario : 0
  const feriasProporcionais = input.tipoDemissao !== 'justa_causa' ? (input.salario / 12) * mesesFerias : 0
  const tercoFerias = (feriasVencidas + feriasProporcionais) / 3

  const meses13 = input.dataDemissao.getMonth() + 1
  const decimoTerceiro = input.tipoDemissao !== 'justa_causa' ? (input.salario / 12) * meses13 : 0

  let multaFGTS = 0
  if (input.tipoDemissao === 'sem_justa_causa') multaFGTS = input.saldoFGTS * FGTS_MULTA_SEM_JUSTA_CAUSA
  else if (input.tipoDemissao === 'acordo') multaFGTS = input.saldoFGTS * 0.20

  const inss = calcularINSS(saldoSalario)
  const irrf = calcularIRRF(saldoSalario - inss)
  const total = saldoSalario + avisoPrevio + feriasVencidas + feriasProporcionais + tercoFerias + decimoTerceiro + multaFGTS - inss - irrf
  const diasTrabalhados = Math.floor((input.dataDemissao.getTime() - input.dataAdmissao.getTime()) / 86400000)

  return { saldoSalario, avisoPrevio, feriasVencidas, feriasProporcionais, tercoFerias, decimoTerceiro, multaFGTS, inss, irrf, total, diasTrabalhados, mesesTrabalhados: meses }
}
