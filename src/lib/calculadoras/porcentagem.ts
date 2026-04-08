interface PorcentagemResult {
  tipo: string
  valorOriginal: number
  porcentagem: number
  resultado: number
}

export function calcularPorcentagemDe(valor: number, porcentagem: number): PorcentagemResult {
  return { tipo: 'porcentagem_de', valorOriginal: valor, porcentagem, resultado: (valor * porcentagem) / 100 }
}

export function calcularAumento(valor: number, porcentagem: number): PorcentagemResult {
  const aumento = (valor * porcentagem) / 100
  return { tipo: 'aumento', valorOriginal: valor, porcentagem, resultado: valor + aumento }
}

export function calcularDesconto(valor: number, porcentagem: number): PorcentagemResult {
  const desconto = (valor * porcentagem) / 100
  return { tipo: 'desconto', valorOriginal: valor, porcentagem, resultado: valor - desconto }
}

export function calcularVariacao(valorInicial: number, valorFinal: number): PorcentagemResult {
  const variacao = valorInicial !== 0 ? ((valorFinal - valorInicial) / valorInicial) * 100 : 0
  return { tipo: 'variacao', valorOriginal: valorInicial, porcentagem: variacao, resultado: valorFinal }
}

export function calcularRepresentacao(parte: number, total: number): PorcentagemResult {
  const porcentagem = total !== 0 ? (parte / total) * 100 : 0
  return { tipo: 'representacao', valorOriginal: total, porcentagem, resultado: parte }
}
