interface AdicionalNoturnoResult {
  salarioBruto: number
  valorHoraNormal: number
  valorHoraNoturna: number
  adicionalPorHora: number
  totalAdicional: number
  horasNoturnas: number
  horasReduzidas: number
}

export function calcularAdicionalNoturno(
  salarioBruto: number,
  horasMensais: number,
  horasNoturnas: number,
  percentualAdicional: number = 20,
): AdicionalNoturnoResult {
  const hm = horasMensais > 0 ? horasMensais : 220
  const valorHoraNormal = salarioBruto / hm
  const adicionalPorHora = valorHoraNormal * (percentualAdicional / 100)
  const valorHoraNoturna = valorHoraNormal + adicionalPorHora
  // CLT: hora noturna reduzida = 52min30s, então 7h noturnas = 8h normais
  const horasReduzidas = horasNoturnas * (60 / 52.5)
  const totalAdicional = adicionalPorHora * horasReduzidas

  return {
    salarioBruto,
    valorHoraNormal,
    valorHoraNoturna,
    adicionalPorHora,
    totalAdicional,
    horasNoturnas,
    horasReduzidas,
  }
}
