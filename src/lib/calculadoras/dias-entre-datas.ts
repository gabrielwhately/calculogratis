interface DiasEntreDatasInput {
  dataInicio: string
  dataFim: string
}

interface DiasEntreDatasResult {
  diasCorridos: number
  diasUteis: number
  semanas: number
  meses: number
}

function parseData(str: string): Date | null {
  // Accept both dd/mm/yyyy and yyyy-mm-dd (HTML date input)
  if (str.includes('-')) {
    const d = new Date(str + 'T00:00:00')
    return isNaN(d.getTime()) ? null : d
  }
  const parts = str.split('/')
  if (parts.length !== 3) return null
  const [d, m, y] = parts.map(Number)
  if (!d || !m || !y) return null
  return new Date(y, m - 1, d)
}

function contarDiasUteis(inicio: Date, fim: Date): number {
  let count = 0
  const current = new Date(inicio)
  const direction = fim >= inicio ? 1 : -1

  if (direction === 1) {
    while (current < fim) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) count++
      current.setDate(current.getDate() + 1)
    }
  } else {
    while (current > fim) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) count++
      current.setDate(current.getDate() - 1)
    }
  }

  return count
}

export function calcularDiasEntreDatas(input: DiasEntreDatasInput): DiasEntreDatasResult | null {
  const inicio = parseData(input.dataInicio)
  const fim = parseData(input.dataFim)
  if (!inicio || !fim) return null

  const diffMs = Math.abs(fim.getTime() - inicio.getTime())
  const diasCorridos = Math.round(diffMs / 86400000)
  const diasUteis = contarDiasUteis(
    inicio < fim ? inicio : fim,
    inicio < fim ? fim : inicio
  )
  const semanas = Math.floor(diasCorridos / 7)
  const meses = Math.round((diasCorridos / 30.44) * 100) / 100

  return {
    diasCorridos,
    diasUteis,
    semanas,
    meses,
  }
}
