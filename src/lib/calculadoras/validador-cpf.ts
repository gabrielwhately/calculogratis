interface ValidacaoCPFResult {
  cpf: string
  cpfFormatado: string
  valido: boolean
  motivo: string
}

export function validarCPF(cpfRaw: string): ValidacaoCPFResult {
  const cpf = cpfRaw.replace(/\D/g, '')
  const formatado = cpf.length === 11 ? `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}` : cpfRaw

  if (cpf.length !== 11) {
    return { cpf, cpfFormatado: formatado, valido: false, motivo: 'CPF deve conter 11 digitos.' }
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return { cpf, cpfFormatado: formatado, valido: false, motivo: 'CPF com todos os digitos iguais e invalido.' }
  }

  const calcDigito = (slice: string, pesoInicial: number): number => {
    let soma = 0
    for (let i = 0; i < slice.length; i++) {
      soma += parseInt(slice[i]) * (pesoInicial - i)
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const d1 = calcDigito(cpf.slice(0, 9), 10)
  const d2 = calcDigito(cpf.slice(0, 10), 11)

  if (d1 !== parseInt(cpf[9]) || d2 !== parseInt(cpf[10])) {
    return { cpf, cpfFormatado: formatado, valido: false, motivo: 'Digitos verificadores invalidos.' }
  }

  return { cpf, cpfFormatado: formatado, valido: true, motivo: 'CPF valido.' }
}
