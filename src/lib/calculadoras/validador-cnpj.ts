interface ValidacaoCNPJResult {
  cnpj: string
  cnpjFormatado: string
  valido: boolean
  motivo: string
}

export function validarCNPJ(cnpjRaw: string): ValidacaoCNPJResult {
  const cnpj = cnpjRaw.replace(/\D/g, '')
  const formatado = cnpj.length === 14 ? `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}` : cnpjRaw

  if (cnpj.length !== 14) {
    return { cnpj, cnpjFormatado: formatado, valido: false, motivo: 'CNPJ deve conter 14 digitos.' }
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return { cnpj, cnpjFormatado: formatado, valido: false, motivo: 'CNPJ com todos os digitos iguais e invalido.' }
  }

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const calcDigito = (slice: string, pesos: number[]): number => {
    let soma = 0
    for (let i = 0; i < slice.length; i++) {
      soma += parseInt(slice[i]) * pesos[i]
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const d1 = calcDigito(cnpj.slice(0, 12), pesos1)
  const d2 = calcDigito(cnpj.slice(0, 13), pesos2)

  if (d1 !== parseInt(cnpj[12]) || d2 !== parseInt(cnpj[13])) {
    return { cnpj, cnpjFormatado: formatado, valido: false, motivo: 'Digitos verificadores invalidos.' }
  }

  return { cnpj, cnpjFormatado: formatado, valido: true, motivo: 'CNPJ valido.' }
}
