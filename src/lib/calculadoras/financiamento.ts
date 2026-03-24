interface FinanciamentoInput { valorImovel: number; entrada: number; taxaAnual: number; prazoMeses: number }
interface ParcelaInfo { numero: number; parcela: number; amortizacao: number; juros: number; saldoDevedor: number }
interface FinanciamentoResult { valorFinanciado: number; parcela: number; totalPago: number; totalJuros: number; parcelas: ParcelaInfo[] }

export function calcularFinanciamentoPrice(input: FinanciamentoInput): FinanciamentoResult {
  const vf = input.valorImovel - input.entrada
  const tm = input.taxaAnual / 100 / 12
  const parcela = tm === 0 ? vf / input.prazoMeses : vf * (tm * Math.pow(1 + tm, input.prazoMeses)) / (Math.pow(1 + tm, input.prazoMeses) - 1)
  const parcelas: ParcelaInfo[] = []
  let saldo = vf
  for (let i = 1; i <= input.prazoMeses; i++) {
    const juros = saldo * tm
    const amort = parcela - juros
    saldo -= amort
    parcelas.push({ numero: i, parcela, amortizacao: amort, juros, saldoDevedor: Math.max(0, saldo) })
  }
  return { valorFinanciado: vf, parcela, totalPago: parcela * input.prazoMeses, totalJuros: parcela * input.prazoMeses - vf, parcelas }
}

export function calcularFinanciamentoSAC(input: FinanciamentoInput): FinanciamentoResult {
  const vf = input.valorImovel - input.entrada
  const tm = input.taxaAnual / 100 / 12
  const amort = vf / input.prazoMeses
  const parcelas: ParcelaInfo[] = []
  let saldo = vf, totalPago = 0
  for (let i = 1; i <= input.prazoMeses; i++) {
    const juros = saldo * tm
    const parcela = amort + juros
    saldo -= amort
    totalPago += parcela
    parcelas.push({ numero: i, parcela, amortizacao: amort, juros, saldoDevedor: Math.max(0, saldo) })
  }
  return { valorFinanciado: vf, parcela: parcelas[0].parcela, totalPago, totalJuros: totalPago - vf, parcelas }
}
