interface PrazoInput { dataInicio: Date; diasPrazo: number; tipo: 'uteis' | 'corridos' }
interface PrazoResult { dataInicio: Date; dataFim: Date; diasPrazo: number; tipo: string; diasCorridos: number }

function isWeekend(d: Date): boolean { const day = d.getDay(); return day === 0 || day === 6 }

export function calcularPrazoJudicial(input: PrazoInput): PrazoResult {
  const start = new Date(input.dataInicio)
  const result = new Date(start)

  if (input.tipo === 'corridos') {
    result.setDate(result.getDate() + input.diasPrazo)
  } else {
    let diasContados = 0
    while (diasContados < input.diasPrazo) {
      result.setDate(result.getDate() + 1)
      if (!isWeekend(result)) diasContados++
    }
  }

  const diffMs = result.getTime() - start.getTime()
  const diasCorridos = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  return { dataInicio: start, dataFim: result, diasPrazo: input.diasPrazo, tipo: input.tipo === 'uteis' ? 'Dias uteis' : 'Dias corridos', diasCorridos }
}
