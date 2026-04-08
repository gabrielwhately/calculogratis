interface InsalubridadeResult {
  salarioBruto: number
  baseCalculo: number
  grau: string
  percentual: number
  valorAdicional: number
  salarioComAdicional: number
}

type GrauInsalubridade = 'minimo' | 'medio' | 'maximo'

const PERCENTUAIS: Record<GrauInsalubridade, number> = {
  minimo: 10,
  medio: 20,
  maximo: 40,
}

const LABELS: Record<GrauInsalubridade, string> = {
  minimo: 'Mínimo',
  medio: 'Médio',
  maximo: 'Máximo',
}

// salarioMinimo is used as base when useSalarioMinimo is true (CLT default)
export function calcularInsalubridade(
  salarioBruto: number,
  grau: GrauInsalubridade,
  salarioMinimo: number = 1518,
  usarSalarioMinimo: boolean = true,
): InsalubridadeResult {
  const baseCalculo = usarSalarioMinimo ? salarioMinimo : salarioBruto
  const percentual = PERCENTUAIS[grau]
  const valorAdicional = baseCalculo * (percentual / 100)

  return {
    salarioBruto,
    baseCalculo,
    grau: LABELS[grau],
    percentual,
    valorAdicional,
    salarioComAdicional: salarioBruto + valorAdicional,
  }
}

interface PericulosidadeResult {
  salarioBruto: number
  percentual: number
  valorAdicional: number
  salarioComAdicional: number
}

export function calcularPericulosidade(salarioBruto: number): PericulosidadeResult {
  const percentual = 30
  const valorAdicional = salarioBruto * (percentual / 100)
  return {
    salarioBruto,
    percentual,
    valorAdicional,
    salarioComAdicional: salarioBruto + valorAdicional,
  }
}
