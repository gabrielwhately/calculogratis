interface ConsorcioResult {
  valorBem: number
  prazoMeses: number
  taxaAdmin: number
  parcela: number
  totalPago: number
  custoAdminTotal: number
  fundoReserva: number
  totalComTaxas: number
}

export function calcularConsorcio(
  valorBem: number,
  prazoMeses: number,
  taxaAdminAnual: number,
  fundoReservaPercent: number = 1,
): ConsorcioResult {
  const meses = prazoMeses > 0 ? prazoMeses : 1
  const taxaAdminTotal = valorBem * (taxaAdminAnual / 100) * (meses / 12)
  const fundoReserva = valorBem * (fundoReservaPercent / 100)
  const totalComTaxas = valorBem + taxaAdminTotal + fundoReserva
  const parcela = totalComTaxas / meses

  return {
    valorBem,
    prazoMeses: meses,
    taxaAdmin: taxaAdminAnual,
    parcela,
    totalPago: totalComTaxas,
    custoAdminTotal: taxaAdminTotal,
    fundoReserva,
    totalComTaxas,
  }
}
