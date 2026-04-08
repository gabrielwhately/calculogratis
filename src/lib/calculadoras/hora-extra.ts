interface HoraExtraInput {
  salarioBruto: number
  horasMensais: number
  horasExtras50: number
  horasExtras100: number
  horasNoturnas: number
}

interface HoraExtraResult {
  valorHoraNormal: number
  valorHoraExtra50: number
  valorHoraExtra100: number
  valorAdicionalNoturno: number
  totalHorasExtras50: number
  totalHorasExtras100: number
  totalAdicionalNoturno: number
  totalExtras: number
}

export function calcularHoraExtra(input: HoraExtraInput): HoraExtraResult {
  const horasMensais = input.horasMensais || 220
  const valorHoraNormal = input.salarioBruto / horasMensais
  const valorHoraExtra50 = valorHoraNormal * 1.5
  const valorHoraExtra100 = valorHoraNormal * 2
  const valorAdicionalNoturno = valorHoraNormal * 0.2

  const totalHorasExtras50 = valorHoraExtra50 * input.horasExtras50
  const totalHorasExtras100 = valorHoraExtra100 * input.horasExtras100
  const totalAdicionalNoturno = valorAdicionalNoturno * input.horasNoturnas
  const totalExtras = totalHorasExtras50 + totalHorasExtras100 + totalAdicionalNoturno

  return {
    valorHoraNormal,
    valorHoraExtra50,
    valorHoraExtra100,
    valorAdicionalNoturno,
    totalHorasExtras50,
    totalHorasExtras100,
    totalAdicionalNoturno,
    totalExtras,
  }
}
