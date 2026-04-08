interface IMCInput {
  peso: number
  altura: number
}

interface IMCResult {
  peso: number
  altura: number
  imc: number
  classificacao: string
}

function getClassificacao(imc: number): string {
  if (imc < 18.5) return 'Abaixo do peso'
  if (imc < 25) return 'Peso normal'
  if (imc < 30) return 'Sobrepeso'
  if (imc < 35) return 'Obesidade grau I'
  if (imc < 40) return 'Obesidade grau II'
  return 'Obesidade grau III'
}

export function calcularIMC(input: IMCInput): IMCResult {
  const { peso, altura } = input
  const imc = peso / (altura * altura)

  return {
    peso,
    altura,
    imc: Math.round(imc * 100) / 100,
    classificacao: getClassificacao(imc),
  }
}
