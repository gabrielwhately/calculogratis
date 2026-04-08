interface IdadeResult { anos: number; meses: number; dias: number; totalDias: number; totalSemanas: number; totalMeses: number; proximoAniversario: Date; diasParaAniversario: number }

export function calcularIdade(dataNascimento: Date): IdadeResult {
  const hoje = new Date()
  let anos = hoje.getFullYear() - dataNascimento.getFullYear()
  let meses = hoje.getMonth() - dataNascimento.getMonth()
  let dias = hoje.getDate() - dataNascimento.getDate()

  if (dias < 0) {
    meses--
    const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0)
    dias += mesAnterior.getDate()
  }
  if (meses < 0) { anos--; meses += 12 }

  const diffMs = hoje.getTime() - dataNascimento.getTime()
  const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalSemanas = Math.floor(totalDias / 7)
  const totalMeses = anos * 12 + meses

  const proximoAniversario = new Date(hoje.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate())
  if (proximoAniversario <= hoje) proximoAniversario.setFullYear(proximoAniversario.getFullYear() + 1)
  const diasParaAniversario = Math.ceil((proximoAniversario.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

  return { anos, meses, dias, totalDias, totalSemanas, totalMeses, proximoAniversario, diasParaAniversario }
}
