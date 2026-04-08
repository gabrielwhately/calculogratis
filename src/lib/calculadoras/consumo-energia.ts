interface ConsumoEnergiaResult {
  consumoMensalKwh: number
  custoMensal: number
  custoAnual: number
  consumoAnualKwh: number
}

interface AparelhoInput {
  potenciaWatts: number
  horasUsoDia: number
  diasUsoMes: number
}

export function calcularConsumoEnergia(aparelhos: AparelhoInput[], tarifaKwh: number): ConsumoEnergiaResult {
  const consumoMensalKwh = aparelhos.reduce((total, ap) => {
    return total + (ap.potenciaWatts * ap.horasUsoDia * ap.diasUsoMes) / 1000
  }, 0)
  const custoMensal = consumoMensalKwh * tarifaKwh
  return {
    consumoMensalKwh,
    custoMensal,
    custoAnual: custoMensal * 12,
    consumoAnualKwh: consumoMensalKwh * 12,
  }
}

export function calcularConsumoAparelho(potenciaWatts: number, horasUsoDia: number, diasUsoMes: number, tarifaKwh: number): ConsumoEnergiaResult {
  return calcularConsumoEnergia([{ potenciaWatts, horasUsoDia, diasUsoMes }], tarifaKwh)
}
