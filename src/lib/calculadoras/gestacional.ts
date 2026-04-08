interface GestacionalInput { dum: Date }
interface GestacionalResult { dum: Date; dataParto: Date; semanasCompletas: number; dias: number; trimestre: number; idadeGestacional: string }

export function calcularGestacional(input: GestacionalInput): GestacionalResult {
  const dum = new Date(input.dum)
  const dataParto = new Date(dum)
  dataParto.setDate(dataParto.getDate() + 280) // 40 semanas

  const hoje = new Date()
  const diffMs = hoje.getTime() - dum.getTime()
  const diasTotais = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const semanas = Math.floor(diasTotais / 7)
  const dias = diasTotais % 7

  let trimestre = 1
  if (semanas >= 28) trimestre = 3
  else if (semanas >= 14) trimestre = 2

  return { dum, dataParto, semanasCompletas: Math.max(0, semanas), dias: Math.max(0, dias), trimestre, idadeGestacional: `${Math.max(0, semanas)} semanas e ${Math.max(0, dias)} dias` }
}
